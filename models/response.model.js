
const errorResponse = (res, message) => {
       res.status(404).send(
              {
                     success: false,
                     message: message,
              }
       );

}

const successResponse = (res, message, data) => {
       res.status(200).send(
              {
                     success: true,
                     message: message,
                     data: data || null
              }
       );

}

const serverErrorResponse = (res, message, data) => {
       res.status(500).send(
              {
                     success: false,
                     message: "Internal server error",
              }
       );

}

module.exports = { errorResponse, successResponse, serverErrorResponse }