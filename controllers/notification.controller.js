const Notification = require("../models/notification.model")
const response = require("../models/response.model")
const storage = require("../database/storage.db")
const db = require("../database/notification.db")


exports.sendNotication = async (req, res) => {
       let notif = new Notification(req.body);
       notif.from = req.userId
       try {
              notif.id = await db.saveNotification(notif.toObj());
              notif.imagePath = await storage.saveImage(req.file);
              await db.updateNotification(notif.toObj());
              return response.successResponse(res, "notification sent", notif.toObj())
       } catch (error) {
              console.log(error);
              return response.errorResponse(res, `failed to send notification`)
       }



}
