const fs = require('firebase-admin');
const serviceAccount = require("../utils/securitycam-service-account.json");

fs.initializeApp({
       credential: fs.credential.cert(serviceAccount)
});

module.exports = fs