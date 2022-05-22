const pairDb = require("../database/pair.db");
const userDb = require("../database/user.db");
const notifDb = require("../database/notification.db");
const response = require("../models/response.model");
const Notification = require("../models/notification.model");
const User = require("../models/user.model");
const PairRequest = require("../models/pairRequest.model");

exports.sendPairRequest = async function (req, res) {
       try {
              let cam, client
              if (req.userId == req.query.reciever) {
                     throw new Error("youre cant send request to yourself")
              }
              const sender = await userDb.getUserById(req.userId)
              if (!sender) {
                     throw new Error("error when get sender data")
              }
              const reciever = await userDb.getUserById(req.query.reciever)
              if (!reciever) {
                     response.errorResponse(res, "error when get reciever data");
              }
              if (sender.role == "CAM") {
                     cam = sender;
                     client = reciever;
              } else {
                     cam = reciever;
                     client = sender;
              }
              const pairRequest = new PairRequest({
                     id: `${cam.id}_${client.id}`,
                     senderId: sender.id,
                     recieverId: reciever.id,
                     camDetail: cam.toObjSensored(),
                     clientDetail: client.toObjSensored(),
                     time: new Date().getTime()
              });
              //check if pair request already exist
              const duplicate = await pairDb.getPairRequestById(pairRequest.id)
              if (duplicate.result) {
                     throw new Error("document already exist");
              }
              if (duplicate.error) {
                     throw new Error(duplicate.error.message);
              }
              const { result, error } = await pairDb.savePairRequest(pairRequest.toObj());
              if (error) {
                     response.errorResponse(res, error);
              }
              else {
                     response.successResponse(res, "success send pairing request", result.toObj());
              }
       } catch (error) {
              console.log(error);
              response.errorResponse(res, error.message);
       }
}

exports.getPairingInbox = async function (req, res) {
       try {
              const { result, error } = await pairDb.getPairRequestInbox(req.userId);
              if (error) {
                     throw new Error(error.message);
              }
              response.successResponse(res, "success get pairing request data", result);
       } catch (error) {
              console.log(error);
              response.errorResponse(res, error.message);
       }
}


exports.acceptPairingRequest = async function (req, res) {
       let reciever;
       try {
              console.log(req)
              const { result, error } = await pairDb.getPairRequestById(req.query.id);
              if (error) {
                     throw new Error(error.message);
              }
              if (!result) {
                     throw new Error("couldnt find request");
              }
              if (result.recieverId != req.userId) {
                     throw new Error("youre'nt the request reciever");
              }
              await pairDb.updatePairRequest(req.query.id, { accepted: true });
              if (req.userId == result.camDetail.id) {
                     reciever = result.camDetail;
              } else {
                     reciever = result.clientDetail;
              }
              const notif = new Notification({
                     id: this.id,
                     message: `${reciever.username} accept your pairing request`,
                     from: result.recieverId,
                     to: result.senderId,
                     imagePath: null,
                     time: new Date().getTime(),
              })
              await notifDb.saveNotification(notif.toObj());
              response.successResponse(res, "success accept pairing request");
       } catch (error) {
              console.log(error);
              response.errorResponse(res, error.message);
       }
}