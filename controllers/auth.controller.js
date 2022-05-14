const db = require("../database/user.db");
const config = require("../configs/auth.config");
const response = require("../models/response.model")
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = async (req, res) => {
       const user = {
              username: req.body.username,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 8)
       }
       const err = await db.saveUser(user);
       if (err) {
              response.errorResponse(res, err);
       }
       else {
              response.successResponse(res, "User was registered successfully!", user);
       }
};
exports.signin = async (req, res) => {
       const user = {
              username: req.body.username,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 8)
       }
       const userRegistered = await db.findUserByUsernameOrEmail(user);
       if (!userRegistered) {
              response.errorResponse(res, "User not found");
       }
       var passwordIsValid = bcrypt.compareSync(
              req.body.password,
              userRegistered.password
       );
       if (!passwordIsValid) {
              return response.errorResponse(res, "Password doesnt match");
       }
       var token = jwt.sign({ id: userRegistered.id }, config.secret, {
              expiresIn: 86400
       });
       userRegistered.accessToken = token;
       userRegistered.tokenExpired = 86400;
       db.updateUser(userRegistered)
       return response.successResponse(res, "Logged in successfully", userRegistered);

};