const PairRequest = require("../models/pairRequest.model");
const db = require("./firestore")

const pairRequestRef = db.collection('requests');


/**
* save pair request data to database
* doc id wil be combination between sender id and reciever id separate by underscore "<senderId>_<recieverId>"
*
* @param PairRequest object.
* @return A PairRequest obj if successed, An error message if failed.
*/
exports.savePairRequest = async function (pairRequest) {
       let result;
       try {
              await pairRequestRef.doc(pairRequest.id).create(pairRequest);
              result = new PairRequest(pairRequest);
              return { result };
       } catch (error) {
              return { error }
       }
}

/**
* get pair request data by id
*
* @param PairRequestId.
* @return A PairRequest obj if successed, An error message if failed.
*/
exports.getPairRequestById = async function (id) {
       let result;
       try {
              const res = await pairRequestRef.doc(id).get();
              if (res.exists) {
                     result = new PairRequest(res.data())
              }
              return { result };
       } catch (error) {
              return { error }
       }
}

/**
* get all pairing request to this user
*
* @param string:userId.
* @return List Of PairRequest if successed, An error message if failed.
*/
exports.getPairRequestInbox = async function (id) {
       let result = [];
       try {
              const res = await pairRequestRef
                     .where('recieverId', "==", id)
                     .get();
              if (!res.empty) {
                     res.docs.forEach(pairRequest => {
                            result.push(new PairRequest(pairRequest.data()))
                     }
                     );
              }
              return { result };
       } catch (error) {
              return { error }
       }
}


/**
* get all sent pairing request to this user
*
* @param string:userId.
* @return List Of PairRequest if successed, An error message if failed.
*/
exports.getPairRequestOutbox = async function (id) {
       console.log(id)
       let result = [];
       try {
              const res = await pairRequestRef
                     .where('senderId', "==", id)
                     .get();
              if (!res.empty) {
                     res.docs.forEach(pairRequest => {
                            result.push(new PairRequest(pairRequest.data()))
                     }
                     );
              }
              return { result };
       } catch (error) {
              return { error }
       }
}

/**
* A function to delete pairing request, 
*
* @param string:pairingRequestId.
* @return success/error message.
*/
exports.deletePairRequest = async function (id) {
       let result;
       try {
              await pairRequestRef
                     .doc(id)
                     .delete();
              result = "success delete request"
              return { result };
       } catch (error) {
              return { error }
       }
}

/**
* A function to update pairing request, 
*
* @param string:pairingRequestId.
* @return success/error message.
*/
exports.updatePairRequest = async function (id, data) {
       let result;
       try {
              await pairRequestRef
                     .doc(id)
                     .update(data);
              result = "success update request"
              return { result };
       } catch (error) {
              return { error }
       }
}

