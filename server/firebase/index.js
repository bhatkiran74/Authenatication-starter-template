
var admin = require("firebase-admin");

var serviceAccount = require('../config/fbServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mart-28d8b.firebaseio.com"
});

module.exports = admin