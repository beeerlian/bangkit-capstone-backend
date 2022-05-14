const db = require("../database/firestore.db")
const response = require("../models/response.model")
checkDuplicateUsernameOrEmail = async (req, res, next) => {
       console.log("checkDuplicateUsernameOrEmail...");
       let snapshot = await db.collection("users").where('username', '==', req.body.username).get();
       if (snapshot.empty) {
              snapshot = await db.collection("users").where('email', '==', req.body.email).get();
              if (snapshot.empty) {
                     next();
              } else {
                     response.errorResponse(res, "Username and email already taken");
              }
       }
       else {
              response.errorResponse(res, "Username and email already taken");
       }
};

const verifyRegister = {
       checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};
module.exports = verifyRegister;