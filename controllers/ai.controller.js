const storage = require("../database/storage.db")
const connDb = require("../database/connection.db")
const notifdb = require("../database/notification.db")
const fetch = require('node-fetch')
const resHelper = require("../models/response.model")
const Notification = require("../models/notification.model")


exports.predictImageSimulation = async (req, res) => {
       try {
              console.log(req.file)
              data = Buffer.from(req.file.buffer).toString('base64')
              // const data = await storage.saveImage(req.file);
              body = JSON.stringify({
                     image: data
              })
              var random_boolean = Math.random() < 0.3;

              if (random_boolean) {
                     resHelper.successResponse(res, "predict success", "Object detected, sending notification to client")
                     sendNotification(req, {
                            description: `Object detected`,
                            data: "Open this image to see the capture"
                     })
              } else {
                     resHelper.successResponse(res, "predict success", "No object detected")
              }

              // await db.updateNotification(notif.toObj());


       } catch (error) {
              console.log(`[error] ${error.message}`)
              return resHelper.errorResponse(res, error)
       }

}

exports.predictImage = async (req, res) => {
       try {
              data = Buffer.from(req.file.buffer).toString('base64')
              // const data = await storage.saveImage(req.file);
              // data = "https://storage.googleapis.com/securicam-351906.appspot.com/1654502187174_03-pizza-dad.jpeg"
              body = JSON.stringify({
                     image: data
              })
              const response = await fetch('https://flask-server-qaxw3k7pja-uc.a.run.app/predict/',
                     {
                            method: 'POST',
                            body: body,
                            // form: body,
                            // headers: { 'Content-Type': 'multipart/form-data' }
                            headers: { 'Content-Type': 'application/json' }
                     })
              const jsonRest = await response.json()
              console.log(jsonRest)
              if (response.status != 200) {
                     throw Error(jsonRest)
              }

              if (!jsonRest['data'] || !jsonRest['success']) {
                     return resHelper.successResponse(res, "predict failed")

              } else {
                     resHelper.successResponse(res, "predict success", jsonRest)
              }
              sendNotification(req, {
                     description: `Object detected`,
                     data: jsonRest['data']
              })
              // await db.updateNotification(notif.toObj());


       } catch (error) {
              console.log(`[error] ${error.message}`)
              return resHelper.errorResponse(res, error)
       }

}

const sendNotification = async (req, message) => {
       const conns = await connDb.getAllConnections(req.userId)
       if (conns.error) {
              throw new Error(conns.error.message)
       }
       const imagePath = "https://storage.googleapis.com/securicam-351906.appspot.com/1654502187174_03-pizza-dad.jpeg"
       let notif = new Notification({
              message: message,
              from: req.userId,
              imagePath: imagePath,
       });
       for (const conn of conns.connections) {
              notif.to = conn.user.id
              let { notification, error } = await notifdb.saveNotification(notif.toObj());
       }
}

// const predict = async (file) => {
//        // [START aiplatform_predict_image_classification_sample]
//        /**
//         * TODO(developer): Uncomment these variables before running the sample.\
//         * (Not necessary if passing values as arguments)
//         */
//        const filename = "YOUR_PREDICTION_FILE_NAME";
//        const endpointId = "2072948854264692736";
//        const project = 'sodium-lore-352006';
//        const location = 'us-central1';
//        const aiplatform = require('@google-cloud/aiplatform');
//        const { instance, params, prediction } =
//               aiplatform.protos.google.cloud.aiplatform.v1.schema.predict;

//        // Imports the Google Cloud Prediction Service Client library
//        const { PredictionServiceClient } = aiplatform.v1;

//        // Specifies the location of the api endpoint
//        const clientOptions = {
//               apiEndpoint: 'us-central1-aiplatform.googleapis.com',
//               // keyFilename: './utils/ai-platform-service-account.json',
//               credentials: require('../utils/vertex-ai-user.json')
//        };

//        console.log('create client ...');
//        // Instantiates a client
//        const predictionServiceClient = new PredictionServiceClient(clientOptions);
//        console.log('success ...');
//        console.log('predict image ...');

//        // Configure the endpoint resource
//        const endpoint = `projects/${project}/locations/${location}/endpoints/${endpointId}`;

//        const parametersObj = new params.ImageClassificationPredictionParams({
//               confidenceThreshold: 0.5,
//               maxPredictions: 5,
//        });

//        const parameters = parametersObj.toValue();

//        // const res = await axios.get(file, { responseType: 'arraybuffer' })
//        // const image = Buffer.from(res.data, "base64")
//        const fs = require("fs")
//        const image = fs.readFileSync("./utils/03-pizza-dad.jpeg", 'base64');
//        const instanceObj = new instance.ImageClassificationPredictionInstance({
//               content: file,
//        });
//        console.log(instanceObj.toJSON())
//        const instanceValue = instanceObj.toValue();
//        const instances = [instanceValue];
//        const request = {
//               endpoint,
//               instances,
//               parameters,
//        };

//        // Predict request
//        console.log('Predict request ...');

//        const [response] = await predictionServiceClient.predict(request)
//        console.log(`response : ${response}  `);

//        console.log(`success ...  `);
//        console.log('Predict image classification response');
//        console.log(`\tDeployed model id : ${response.deployedModelId}`);
//        const predictions = response.predictions;
//        console.log('\tPredictions :');
//        for (const predictionValue of predictions) {
//               const predictionResultObj =
//                      prediction.ClassificationPredictionResult.fromValue(predictionValue);
//               for (const [i, label] of predictionResultObj.displayNames.entries()) {
//                      console.log(`\tDisplay name: ${label}`);
//                      console.log(`\tConfidences: ${predictionResultObj.confidences[i]}`);
//                      console.log(`\tIDs: ${predictionResultObj.ids[i]}\n\n`);
//               }
//        }

//        return predictions;
//        // await predictImageClassification();
//        // [END aiplatform_predict_image_classification_sample]
// }

// const toTensor = function (image) {

// }