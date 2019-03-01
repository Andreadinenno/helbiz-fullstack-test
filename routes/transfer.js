const axios = require("axios");
const JSON = require("circular-json");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

module.exports = app => {
  app.post("/api/transfer", function(req, res) {
    let error = false;

    //update sender plusminus
    User.findOneAndUpdate(
      { pk: req.body.from },
      { $inc: { plusMinus: -req.body.value } },
      { upsert: true },
      function(err, user) {
        if (err) {
          console.log("err1: " + err.message);
          error = true;
        }
      }
    );

    //update receiver plusminus
    User.findOneAndUpdate(
      { pk: req.body.to },
      { $inc: { plusMinus: req.body.value } },
      { upsert: true },
      function(err, user) {
        if (err) {
          console.log("err2: " + err.message);
          error = true;
        }
      }
    );

    //persist the transaction
    Transaction.create(
      {
        from: req.body.from,
        to: req.body.to,
        amount: req.body.value
      },
      (err, transaction) => {
        if (err) {
          console.log("err3: " + err.message);
          error = true;
        }
      }
    );

    if (error) res.status(400).send("Error");
    else res.status(200).send("Transfer went through");
  });
};
