const controller = require("../controllers/user.controller")
const { authJwt } = require("../middlewares/middleware");
const connController = require("../controllers/connection.controller")

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
       app.get(
              "/api/user/search",
              [authJwt.verifyToken],
              controller.searchUser
       );
       app.get(
              "/api/user/connections",
              [authJwt.verifyToken],
              connController.getAllConnection
       );
       app.post(
              "/api/user/connection/delete",
              [authJwt.verifyToken],
              connController.deleteConnection
       );
};