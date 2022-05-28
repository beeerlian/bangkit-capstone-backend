
const db = require("./firestore")
const Notification = require("../models/notification.model");
const notificationReference = db.collection('notifications');

exports.saveNotification = async (data) => {
       try {
              const res = await notificationReference.add(data);
              let notification = new Notification(data);
              notification.id = res.id;
              await updateNotification(notification.toObj());
              return { notification };
       } catch (error) {
              return { error };
       }
}

exports.updateNotification = async (notif) => {
       notificationReference.doc(notif.id).update(notif).then(function (data) {
       }, function (error) {
              throw error;
       });
}

