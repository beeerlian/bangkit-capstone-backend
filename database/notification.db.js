
const db = require("./firestore")
const notificationReference = db.collection('notifications');

exports.saveNotification = async (data) => {
       const res = await notificationReference.add(data);
       return res.id;
}

exports.updateNotification = async (notif) => {
       notificationReference.doc(notif.id).update(notif).then(function (data) {
       }, function (error) {
              throw error;
       });
}
