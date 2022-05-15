const controller = require("../controllers/user.controller")
const { authJwt } = require("../middlewares/middleware");

module.exports = function (app) {
       app.use(function (req, res, next) {
              
              res.header(
                     "Access-Control-Allow-Headers",
                     "x-access-token, Origin, Content-Type, Accept, Authorization"
              );
              next();
       });
       app.get(
              "/api/user/all",
              [authJwt.verifyToken],
              controller.getUsers
       );
};