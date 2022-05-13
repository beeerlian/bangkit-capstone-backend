const userDb = require("../database/user.db")
const response = require("../models/response.model")

const user = {
       "firstName": "Bang",
       "lastName": "Cruise",
       "email": "tomcruise@gmail.com",
       "photo": "https://pbs.twimg.com/profile_images/735509975649378305/B81JwLT7.jpg"
}

exports.saveUser = async function (req, res) {
       const err = await userDb.saveUser(user);
       if (err) {
              response.errorResponse(res, err);
       }
       else {
              response.successResponse(res, undefined, user);
       }
}

exports.getUsers = async function (req, res) {
       const result = await userDb.getUsers();
       console.log(result)
       if (!result) {
              response.errorResponse(res, "Failed to fetch data");
       }
       else {
              response.successResponse(res, undefined, result);
       }
}