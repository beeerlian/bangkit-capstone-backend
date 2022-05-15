
const app = require("./firebase")

// const gcs = getStorage(app).bucket();
const storage = app.storage().bucket(process.env.BUCKET_NAME || "gs://securitycam-954ab.appspot.com")

module.exports = storage;
