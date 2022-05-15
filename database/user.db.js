const db = require("./firestore")
const User = require("../models/user.model")

const userRef = db.collection('users');

exports.getUsers = async () => {
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

exports.getUserById = async (userId) => {
       const result = await userRef.doc(userId).get();
       if (result) {
              const userData = new User(result.data())
              return userData;
       }
       return;
}

exports.saveUser = async (userData) => {
       userRef.add(userData, function (error) {
              if (error) {
                     return error;
              }
       })
}
exports.updateUser = async (userData) => {
       userRef.doc(userData.id).update(userData).then(
              function (data) {
                     console.log("success update user data " + data.writeTime);
              },
              function (error) {
                     if (error) {
                            console.log(error);
                            return error
                     }
              }
       );
}

exports.findUserByUsernameOrEmail = async (user) => {
       let snapshot
       if (!user.username && !user.email) {
              return;
       }
       if (user.username) {
              snapshot = await userRef.where('username', '==', user.username).get();
              if (snapshot.empty && !user.email) {
                     return;
              }
       }
       if (user.email) {
              snapshot = await userRef.where('email', '==', user.email).get();
              if (snapshot.empty) {
                     return;
              }
       }
       const result = new User({
              id: snapshot.docs[0].id,
              username: snapshot.docs[0].data().username,
              email: snapshot.docs[0].data().email,
              password: snapshot.docs[0].data().password,
       })
       return result;

}
