const Notification = require("../models/notification.model")
const response = require("../models/response.model")
const storage = require("../database/storage.db")
const db = require("../database/notification.db")


exports.sendNotication = async (req, res) => {
       let notif = new Notification(req.body);
       notif.from = req.userId
       try {
              let { notification, error } = await db.saveNotification(notif.toObj());
              if (error) {
                     throw new Error(error.message)
              }

              if (req.file) {
                     notif.imagePath = await storage.saveImage(req.file);
                     await db.updateNotification(notif.toObj());
              }
              return response.successResponse(res, "notification sent", notification.toObj())
       } catch (error) {
              console.log(error);
              return response.errorResponse(res, `failed to send notification`)
       }



}

exports.getNotification = async (req, res) => {
       const notifications = await db.getAllNotification(req.userId)
       try {
              return response.successResponse(res, "youre notifications", notifications)
       } catch (error) {
              return response.errorResponse(res, `failed to get notifications`)
       }
}
