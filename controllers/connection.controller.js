const connDb = require("../database/connection.db")
const response = require("../models/response.model")

exports.getAllConnection = async (req, res) => {
       try {
              const conns = await connDb.getAllConnections(req.userId)
              if (conns.error) {
                     throw new Error(conns.error.message)
              }
              response.successResponse(res, "success get all connections", conns.connections)
       } catch (error) {
              console.log(`Error : ${error}`);
              response.errorResponse(res, error.message)
       }
}