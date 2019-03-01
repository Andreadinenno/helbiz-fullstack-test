const mongoose = require("mongoose");

//SCHEMA
var UserSchema = new mongoose.Schema({
  pk: String,
  plusMinus: Number
});

//MODEL -> instanciation of a schema needed for queries. third param is collection
var UserModel = mongoose.model("User", UserSchema, "user");

module.exports = UserModel;
