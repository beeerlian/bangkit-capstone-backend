const authJwt = require("./authJwt");
const verifyRegister = require("./verifyRegister");
const multerMiddleware = require("./multerMiddleware")

module.exports = {
       authJwt,
       verifyRegister,
       multerMiddleware
};