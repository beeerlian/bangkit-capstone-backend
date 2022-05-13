const fs = require('firebase-admin');
const serviceAccount = require("../utils/securitycam-service-account.json");

fs.initializeApp({
       credential: fs.credential.cert(serviceAccount)
});

let db = fs.firestore();
const userRef = db.collection('users');

const getUsers = async () => {
       const result = await userRef.get();
       if (result) {
              userData = [];
              result.docs.forEach(element => {
                     userData.push({
                            id: element.id,
                            user: element.data()
                     });
              });
              return userData;

       }
}

const saveUser = async (userData) => {
       userRef.add(userData, function (error) {
              if (error) {
                     return error
              }
       })
}

module.exports = {
       getUsers,
       saveUser
}