const userDb = require("../database/user.db")
const response = require("../models/response.model")
const User = require("../models/user.model")

exports.findUserByUsernameOrEmail = async function (req, res) {

       const result = await userDb.findUserByUsernameOrEmail(req.params);
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