const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
       origin: "https://securitycam.herokuapp.com"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
       extended: true
}));

require("./routes/auth.route")(app)
require("./routes/user.route")(app)
require("./routes/notification.route")(app)

const port = process.env.PORT || 8080;

app.listen(port, () => {
       console.log("server running in port ${port}");
});