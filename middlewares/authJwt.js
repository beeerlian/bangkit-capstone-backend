const jwt = require("jsonwebtoken");
const response = require("../models/response.model");
const config = require("../configs/auth.config.js");
const db = require("../database/user.db")

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"].split(' ')[1];
  if (!token) {
    return response.noAccessTokenResponse(res)
  }
  //verify sended tokens
  jwt.verify(token, config.secret, async (err, decodedToken) => {
    if (err) {
      return response.unauthorizedResponse(res);
    }
    req.userId = decodedToken.id;
    //user will get new token when he's logged in, so i will check is sended token's is newest or not 
    // const userLastloginTime = (await db.getUserById(req.userId)).lastLoggedIn;
    // if (userLastloginTime > decodedToken.created) {
    //   return response.expiringTokenResponse(res);
    // }
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;