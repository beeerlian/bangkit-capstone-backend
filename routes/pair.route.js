const controller = require("../controllers/pair.controller")
const { authJwt } = require("../middlewares/middleware");

module.exports = function (app) {
       app.use(function (req, res, next) {

              res.header(
                     "Access-Control-Allow-Headers",
                     "x-access-token, Origin, Content-Type, Accept, Authorization"
              );
              next();
       });

       app.post(
              "/api/pair/send",
              [authJwt.verifyToken],
              controller.sendPairRequest
       );
       app.post(
              "/api/pair/reject",
              [authJwt.verifyToken],
              controller.rejectPairingRequest
       );

       app.get(
              "/api/pair/inbox",
              [authJwt.verifyToken],
              controller.getPairingInbox
       );
       app.get(
              "/api/pair/outbox",
              [authJwt.verifyToken],
              controller.getPairingOutbox
       );
       app.post(
              "/api/pair/accept",
              [authJwt.verifyToken],
              controller.acceptPairingRequest
       );
};