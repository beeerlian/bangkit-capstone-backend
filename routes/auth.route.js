const controller = require("../controllers/auth.controller")
const auth = require("../middlewares/middleware");

module.exports = function (app) {
       console.log('auth route has been initialized')
       app.use(function (req, res, next) {
              res.header(
                     "Access-Control-Allow-Headers",
                     "x-access-token, Origin, Content-Type, Accept"
              );
              next();
       });
       app.post(
              "/api/auth/login",
              controller.signin
       );
       app.post(
              "/api/auth/register", [
              auth.verifyRegister.checkDuplicateUsernameOrEmail
       ],
              controller.signup
       );
};