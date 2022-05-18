require("dotenv").config();
const fs = require('firebase-admin');
let buff = new Buffer.from(process.env.SERVICE_ACCOUNT, 'base64');
const serviceAccount = JSON.parse(buff.toString('utf-8'));

fs.initializeApp({
       credential: fs.credential.cert(serviceAccount)
});

module.exports = fs