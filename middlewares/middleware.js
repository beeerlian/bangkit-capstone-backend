const authJwt = require("./authJwt");
const verifyRegister = require("./verifyRegister");
const multerMiddleware = require("./multerMiddleware")
const fileUploadMiddleware = require("./fileUploadMiddleware")

module.exports = {
       authJwt,
       verifyRegister,
       multerMiddleware,
       fileUploadMiddleware
};