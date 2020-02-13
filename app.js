/* eslint-env node */
//these imports will only work if you use the self specified server start "npm start"
import ServerConst from "./lib/utils/ServerConst.js";

var express = require("express"),
    app = express();

app.use(express.static("app/resources"));
app.use(express.static("node_modules/codemirror"));
app.set("view engine", "ejs");
app.set("views", "app/views");

//serve the home page on the main route
app.get("/", function (req, res) {
    res.render("index");
});

//if the user connects on a valid code then he will be given the needed information for taking part in a survey
//the code is representative for the id of the study participant
app.get("/:code", function (req, res) {
    res.render("survey-viewer");
});

app.listen(ServerConst.port, function () {
    console.log("Serving homepage on http://localhost:" + ServerConst.port + "/");
});