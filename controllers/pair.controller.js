const pairDb = require("../database/pair.db");
const userDb = require("../database/user.db");
const notifDb = require("../database/notification.db");
const connectionDb = require("../database/connection.db");
const response = require("../models/response.model");
const Notification = require("../models/notification.model");
const User = require("../models/user.model");
const PairRequest = require("../models/pairRequest.model");
const Connection = require("../models/connection.model")

exports.sendPairRequest = async function (req, res) {
       try {
              let cam, client
              if (req.userId == req.query.reciever) {
                     throw new Error("you're cant send request to yourself")
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
                     id: `${cam.id}-${client.id}-${new Date().getTime()}`,
                     senderId: sender.id,
                     recieverId: reciever.id,
                     camDetail: cam.toNotificationObj(),
                     clientDetail: client.toNotificationObj(),
                     status: "PENDING",
                     time: new Date().getTime()
              });
              //check if pair request already exist
              const duplicate = await pairDb.getPairRequestById(pairRequest.id)
              if (duplicate.result) {
                     if (duplicate.result.status != "ACCEPTED") {
                            throw new Error("document already exist");
                     }
              }
              if (duplicate.error) {
                     throw new Error("Error : " + duplicate.error.message);
              }
              const { result, error } = await pairDb.savePairRequest(pairRequest.toObj());
              if (error) {
                     response.errorResponse(res, "Error Saving Request : " + error);
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
              const pairingRequest = [];
              for (const pairing of result) {
                     console.log(pairing)
                     if (pairing.status == 'PENDING') {
                            pairingRequest.push(pairing)
                     }
              }
              return response.successResponse(res, "success get pairing request data", pairingRequest);
              console.log("Done")
       } catch (error) {
              console.log(error);
              response.errorResponse(res, error.message);
       }
}

exports.getPairingOutbox = async function (req, res) {
       try {
              const { result, error } = await pairDb.getPairRequestOutbox(req.userId);
              if (error) {
                     throw new Error(error.message);
              }
              const pairingRequest = []

              for (const pairing of result) {
                     if (pairing.status == 'PENDING') {
                            pairingRequest.push(pairing)
                     }
              }
              response.successResponse(res, "success get pairing request data", pairingRequest);
       } catch (error) {
              console.log(error);
              response.errorResponse(res, error.message);
       }
}

exports.acceptPairingRequest = async function (req, res) {
       let reciever;
       try {
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
              if (result.status != "PENDING") {
                     throw new Error("youre already connected");
              }
              await pairDb.updatePairRequest(req.query.id, { status: "ACCEPTED" });
              if (req.userId == result.camDetail.id) {
                     reciever = result.camDetail;
              } else {
                     reciever = result.clientDetail;
              }
              await addConnection(result.camDetail, result.clientDetail);
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

exports.rejectPairingRequest = async function (req, res) {
       let reciever;
       try {
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
              if (result.status != "PENDING") {
                     throw new Error("youre already connected/reject this request");
              }
              await pairDb.updatePairRequest(req.query.id, { status: "REJECTED" });
              if (req.userId == result.camDetail.id) {
                     reciever = result.camDetail;
              } else {
                     reciever = result.clientDetail;
              }
              await addConnection(result.camDetail, result.clientDetail);
              const notif = new Notification({
                     message: `${reciever.username} reject your pairing request`,
                     from: result.recieverId,
                     to: result.senderId,
                     imagePath: null,
                     time: new Date().getTime(),
              })
              await notifDb.saveNotification(notif.toObj());
              response.successResponse(res, "success reject pairing request");
       } catch (error) {
              console.log(error);
              response.errorResponse(res, error.message);
       }
}

const addConnection = async function (cam, client) {
       let connection = new Connection({
              user: cam,
              time: new Date().getTime()
       })
       let err = await connectionDb.saveConnection(connection.toObj(), client.id);
       if (err) {
              throw Error(err.message)
       }
       connection.user = client;
       err = await connectionDb.saveConnection(connection.toObj(), cam.id);
       if (err) {
              throw Error(err.message)
       }
}