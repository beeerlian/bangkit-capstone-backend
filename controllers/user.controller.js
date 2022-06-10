const db = require("../database/firestore");
const userDb = require("../database/user.db")
const connectionDb = require("../database/connection.db")
const response = require("../models/response.model")
const User = require("../models/user.model")
const PairRequest = require("../models/pairRequest.model")

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
       const { userData, error } = await userDb.getUsers();
       if (error) {
              response.errorResponse(res, "Failed to fetch data");
       }
       else {
              response.successResponse(res, undefined, userData);
       }
}

exports.searchUser = async function (req, res) {

       try {
              const query = new User(req.query);
              const searcher = await userDb.getUserById(req.userId)
              if (!searcher) {
                     response.errorResponse(res, "error when get searcher data");
              }
              query.role = searcher.role;
              const { userResults, error } = await userDb.searchUserByUsernameOrEmail(query);

              if (error) {
                     throw Error(error.message)
              }
              const conn = await connectionDb.getAllConnections(req.userId);
              if (conn.error) {
                     throw Error(error.message);
              }
              //chech pairing status from search result;
              for (const user of userResults) {
                     user.password = undefined;
                     user.connection = undefined;
                     user.fcm = undefined;
                     for (const con of conn.connections) {
                            if (user.id == con.user.id) {
                                   user.paired = true;
                            }
                            else {
                                   user.paired = false;
                            }
                     }
              }
              response.successResponse(res, undefined, userResults);

       } catch (error) {
              console.log(error)
              response.errorResponse(res, error);
       }

}

