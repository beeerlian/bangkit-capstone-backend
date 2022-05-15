require('dotenv').config();
const app = require("./firebase")

const storage = app.storage().bucket(process.env.BUCKET_NAME)
module.exports = storage;
