const db = require("./firestore.db")
const User = require("../models/user.model")

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
const updateUser = async (userData) => {
       userRef.doc(userData.id).set(userData, function (error) {
              if (error) {
                     return error
              }
       })
}

const findUserByUsernameOrEmail = async (user) => {
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
       const result = User({
              id: snapshot.docs[0].id,
              username: snapshot.docs[0].data().username,
              email: snapshot.docs[0].data().email,
              password: snapshot.docs[0].data().password,
       })
       return result;

}


module.exports = {
       getUsers,
       saveUser,
       findUserByUsernameOrEmail,
       updateUser
}