const db = require("./firestore")
const User = require("../models/user.model")

const userRef = db.collection('users');
const pairRequestRef = db.collection('pairs');

exports.getUsers = async () => {
       const result = await userRef.get();
       let error = "cannot read users data, something went wrong"
       if (result) {
              userData = [];
              result.docs.forEach(element => {
                     userData.push({
                            id: element.id,
                            user: element.data()
                     });
              });
              return { userData };

       }
       return { error };
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
       let result = await userRef.add(userData, function (error) {
              if (error) {
                     return { error };
              }
       });
       userResultId = result.id
       return { userResultId }
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

exports.findUserByUsernameOrEmail = async (userData) => {
       let snapshot, error, user;
       if (userData.username) {
              snapshot = await userRef.where('username', '==', userData.username).get();
              if (snapshot.empty && !userData.email) {
                     error = "user not found ";
                     return { error };
              }
       }
       if (userData.email) {
              snapshot = await userRef.where('email', '==', userData.email).get();
              if (snapshot.empty) {
                     error = "user not found ";
                     return { error };
              }
       }

       user = new User(snapshot.docs[0].data())

       return { user };

}

exports.searchUserByUsernameOrEmail = async (target) => {
       let snapshot, error;
       const userResults = [];
       try {
              if (target.username) {
                     snapshot = await userRef
                            .where('username', '>=', target.username)
                            .where('username', '<=', target.username + '\uf8ff')
                            .get();
                     if (snapshot.empty) {
                            error = "user not found ";
                            return { error };
                     }
              }
              else if (target.email) {
                     snapshot = await userRef
                            .where('email', '>=', target.email)
                            .where('email', '<=', target.email + '\uf8ff')
                            .get();
                     if (snapshot.empty) {
                            error = "user not found ";
                            return { error };
                     }
              }
              snapshot.docs.forEach(element => {
                     const user = new User(element.data())
                     if (user.role != target.role) {
                            userResults.push(user);
                     }
              });
              return { userResults };
       } catch (error) {
              return {error}
       }



}


