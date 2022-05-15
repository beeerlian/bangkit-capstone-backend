const authJwt = require("../middlewares/authJwt");
const notifController = require("../controllers/notification.controller")
const multerMiddleware = require("../middlewares/multerMiddleware")

module.exports = function (app) {
       app.use(function (req, res, next) {
              res.header(
                     "Access-Control-Allow-Headers",
                     "x-access-token, Origin, Content-Type, Accept"
              );
              next();
       });
       app.post(
              "/api/notification/send",
              [
                     multerMiddleware.single('image'),
                     authJwt.verifyToken
              ],
              notifController.sendNotication
       );
};