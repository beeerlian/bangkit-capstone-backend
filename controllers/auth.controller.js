const db = require("../database/user.db");
const config = require("../configs/auth.config");
const response = require("../models/response.model")
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = require("../models/user.model")


exports.signup = async (req, res) => {
       console.log("Register .....")
       const user = new User(req.body)
       user.password = bcrypt.hashSync(user.password, 8)
       const { error, userResultId } = await db.saveUser(user.toObj());
       if (error) {
              return response.errorResponse(res, err);
       }
       user.id = userResultId;
       db.updateUser(user.toObj());
       return response.successResponse(res, "user was registered successfully!", user);

};
exports.signin = async (req, res) => {
       req.user = new User(req.body);
       const { user, error } = await db.findUserByUsernameOrEmail(req.user);
       if (error) {
              return response.errorResponse(res, error);
       }
       console.log(user)
       var passwordIsValid = bcrypt.compareSync(
              req.body.password,
              user.password
       );
       if (!passwordIsValid) {
              return response.errorResponse(res, "password doesnt match");
       }
       user.lastLoggedIn = new Date().getTime();
       var token = jwt.sign({
              id: user.id,
              created: user.lastLoggedIn
       }, config.secret, {
              expiresIn: 86400,
       });
       user.tokenExpired = 86400;
       db.updateUser(user.toObj());
       user.accessToken = token;
       return response.successResponse(res, "logged in successfully", user);

};