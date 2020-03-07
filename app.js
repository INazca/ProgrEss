/* eslint-env node */
//these imports will only work if you use the self specified server start "npm start"
import ServerConst from "./lib/utils/ServerConst.js";

var express = require("express"),
    app = express(),
    fs = require("fs");

app.use(express.static("app/resources"));
app.use(express.static("node_modules/codemirror"));
app.use(express.static("node_modules/ejs"));
app.set("view engine", "ejs");
app.set("views", "app/views");

//serve the home page on the main route
app.get("/", function (req, res) {
    res.render("index", { title: "ProgrEss", validIDs: JSON.stringify(ServerConst.validIDs) });
});

//setup blank page for including the logs in the localStorage
app.get("/log", function (req, res) {
    res.render("log");
});

//if the user connects on a valid code then he will be given the needed information for taking part in a survey
//the code is representative for the id of the study participant
app.get("/:code", function (req, res) {
    fs.readFile("./data/" + req.params.code + ".json", function (err, data) {
        if(err) {
            res.send("Ooops. An error occured.\n" + err);
        } else {
            let survey = JSON.parse(data.toString());

            res.render("survey-viewer", { title: survey.surveyName, taskList: JSON.stringify(survey.taskList)});
        }
    });
});

app.listen(ServerConst.port, function () {
    console.log("Serving homepage on http://localhost:" + ServerConst.port + "/");
});