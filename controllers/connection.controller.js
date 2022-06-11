const connDb = require("../database/connection.db")
const notifDb = require("../database/notification.db")
const response = require("../models/response.model")

exports.getAllConnection = async (req, res) => {
       try {
              const conns = await connDb.getAllConnections(req.userId)
              if (conns.error) {
                     throw new Error(conns.error.message)
              }
              response.successResponse(res, "success get all connections", conns.connections)
       } catch (error) {
              console.log(`Error : ${error}`);
              response.errorResponse(res, error.message)
       }
}

exports.deleteConnection = async (req, res) => {
       try {
              const userRes = await connDb.deleteConnection(req.userId, req.body.connectionId)
              const connectionRes = await connDb.deleteConnection(req.body.connectionId, req.userId)
              if (userRes.error || connectionRes.error) {
                     throw new Error(conns.error.message)
              }
              response.successResponse(res, "success delete connection", conns.connections)
              let notif = new Notification({
                     message: `you're deleted from ${req.userId} connection`,
                     from: req.userId,
                     to: req.body.connectionId,
              });
              let { notification, error } = await notifdb.saveNotification(notif.toObj());
       } catch (error) {
              console.log(`Error : ${error}`);
              response.errorResponse(res, error.message)
       }
}