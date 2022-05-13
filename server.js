const express = require("express");
const cors = require("cors");
const app = express();
const controller = require("./controllers/user.controller");
// var corsOptions = {
//        origin: "http://localhost:8080"
// };
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
       extended: true
}));

app.post("/api/user/register", controller.saveUser);
app.get("/api/user/all", controller.getUsers);
const port = 8080;

app.listen(port, () => {
       console.log("server running in port ${port}");
});