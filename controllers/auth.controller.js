const db = require("../database/user.db");
const config = require("../configs/auth.config");
const response = require("../models/response.model")
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = async (req, res) => {
       console.log("Register .....")
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
              response.successResponse(res, "user was registered successfully!", user);
       }
};
exports.signin = async (req, res) => {
       console.log("Login .....");
       const user = {
              username: req.body.username,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 8)
       }
       const userRegistered = await db.findUserByUsernameOrEmail(user);
       if (!userRegistered) {
              response.errorResponse(res, "username/email not found");
       }
       var passwordIsValid = bcrypt.compareSync(
              req.body.password,
              userRegistered.password
       );
       if (!passwordIsValid) {
              return response.errorResponse(res, "password doesnt match");
       }
       userRegistered.lastLoggedIn = new Date().getTime();

       var token = jwt.sign({
              id: userRegistered.id,
              created: userRegistered.lastLoggedIn
       }, config.secret, {
              expiresIn: 86400,
       });
       userRegistered.tokenExpired = 86400;
       db.updateUser(userRegistered.toObj());
       userRegistered.accessToken = token;
       return response.successResponse(res, "logged in successfully", userRegistered);

};