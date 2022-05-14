const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config.js");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return "No token provided!"
    
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;