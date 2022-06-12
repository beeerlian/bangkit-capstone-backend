const authJwt = require("../middlewares/authJwt");
const notifController = require("../controllers/notification.controller")
const multerMiddleware = require("../middlewares/multerMiddleware")
const ai = require("../controllers/ai.controller")


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
       app.get(
              "/api/notification/all",
              [
                     authJwt.verifyToken
              ],
              notifController.getNotification
       );

       app.post(
              "/api/ai/predict",
              [
                     authJwt.verifyToken,
                     // multerMiddleware.single('image')
              ],
              ai.predictImage
       )
       app.post(
              "/api/ai/predict-simulation",
              [
                     authJwt.verifyToken,
                     // multerMiddleware.single('image')
              ],
              ai.predictImageSimulation
       )

};