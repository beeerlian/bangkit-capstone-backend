require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth.route")
const userRoute = require("./routes/user.route")
const notificationRoute = require("./routes/notification.route")
const pairRoute = require("./routes/pair.route")

var corsOptions = {
       origin: "https://securitycam.herokuapp.com"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
       extended: true
}));


app.get('/', (req, res, next) => {
       res.status(200).json({
              status: 'success',
              data: {
                     name: 'securitycam API',
                     version: '0.1.0'
              }
       });

});


authRoute(app)
userRoute(app)
notificationRoute(app)
pairRoute(app)

const port = process.env.PORT || 8080;

app.listen(port, () => {
       console.log(`server running in port ${port}`);
});