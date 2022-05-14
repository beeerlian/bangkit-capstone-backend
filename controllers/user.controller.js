const userDb = require("../database/user.db")
const response = require("../models/response.model")

const user = {
       "firstName": "Bang",
       "lastName": "Cruise",
       "email": "tomcruise@gmail.com",
       "photo": "https://pbs.twimg.com/profile_images/735509975649378305/B81JwLT7.jpg"
}

exports.findUserByUsernameOrEmail = async function (req, res) {
       const result = await userDb.getUsers();
       if (!result) {
              response.errorResponse(res, "Failed to fetch data");
       }
       else {
              response.successResponse(res, undefined, result);
       }
}

exports.getUsers = async function (req, res) {
       const result = await userDb.getUsers();
       if (!result) {
              response.errorResponse(res, "Failed to fetch data");
       }
       else {
              response.successResponse(res, undefined, result);
       }
}