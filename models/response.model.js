
exports.errorResponse = (res, message) => {
       res.status(404).send(
              {
                     success: false,
                     message: message,
              }
       );

}

exports.successResponse = (res, message, data) => {
       res.status(200).send(
              {
                     success: true,
                     message: message,
                     data: data || null
              }
       );

}

exports.serverErrorResponse = (res, message, data) => {
       res.status(500).send(
              {
                     success: false,
                     message: "Internal server error",
              }
       );

}

exports.noAccessTokenResponse = (res) => {
       return res.status(401).send({
              success: false,
              message: "Cannot access without access token"
       });
}
exports.unauthorizedResponse = (res) => {
       return res.status(401).send({
              success: false,
              message: "you`re unautorized"
       });
}
exports.expiringTokenResponse = (res) => {
       return res.status(401).send({
              success: false,
              message: "token is expired"
       });
}
