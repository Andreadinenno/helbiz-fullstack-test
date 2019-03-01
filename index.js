const path = require("path");
const express = require("express");
var mongoose = require("mongoose"); //mongodb
const bodyParser = require("body-parser");
const mongoUri = "mongodb://andrea:andr3a@ds139251.mlab.com:39251/hellbiz";
mongoose.connect(mongoUri);
const db = mongoose.connection;
db.on("error", function() {
  console.log("error");
});
db.once("open", function() {
  console.log("connected");
});

const app = express(); //create an express application
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json()); //body parser for incoming request

//API ROUTES -> express
require("./routes")(app); //will call immediately the route file function passing app as argument

//get runtime configuration of port which will be specified by heroku , default 5000
const PORT = process.env.PORT || 5000;
//node will listen to port 5000
app.listen(PORT);
