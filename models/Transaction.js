const mongoose = require("mongoose");

//SCHEMA
var TransactionSchema = new mongoose.Schema({
  from: String,
  to: String,
  amount: Number
});

//MODEL -> instanciation of a schema needed for queries. third param is collection
var TransactionModel = mongoose.model(
  "Transaction",
  TransactionSchema,
  "transaction"
);

module.exports = TransactionModel;
