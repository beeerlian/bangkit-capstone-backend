const db = require("./firestore")

const connectionRef = db.collection('connections');



/**
* save status pair request data into connection
* doc id wil be user id and the data will be connected user data
*
* @param Connection object, userid.
* @return None if successed, An error message if failed.
*/
exports.saveConnection = async function (connection, id) {
       let result;
       try {
              await connectionRef.doc(id).collection("connection").doc(connection.user.id).create(connection);
              return;
       } catch (error) {
              return error;
       }
}


/**
* get list of connected user by searcher id
*
* @param Sserid.
* @return List of Connection if successed, An error message if failed.
*/
exports.getAllConnections = async function (id) {
       const connections = [];
       try {
              const res = await connectionRef.doc(id).collection("connection").get();
              res.docs.forEach(conn => {
                     connections.push(conn.data())
              });
              return { connections };
       } catch (error) {
              return { error };
       }
}

/**
* get connected user by searcher id, and connected user id
*
* @param userid and connected user id.
* @return A Connection if successed, An error message if failed.
*/
exports.getConnection = async function (searcherId, targetId) {
       let connection;
       try {
              const res = await connectionRef.doc(searcherId).collection("connection").doc(targetId).get();
              connection = res.data()
              return { connection };
       } catch (error) {
              return { error };
       }
}