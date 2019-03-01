const axios = require("axios");
const JSON = require("circular-json");
const User = require("../models/User");
var web3 = require("../web3");

module.exports = app => {
  //route
  app.post("/api/showWallet", async (req, res) => {
    let balanceEth;
    try {
      balanceEth = await web3.eth.getBalance(req.body.pk);
    } catch (err) {
      console.log(err);
    }
    let plusMinus = 0;
    User.findOne({ pk: req.body.pk }, (err, user) => {
      if (err) console.log(err);
      if (user != null) plusMinus = user.plusMinus;
    });

    axios
      .get(
        "http://hbz-listen-test.us-west-2.elasticbeanstalk.com/api/wallets/show",
        {
          headers: {
            Authorization: "Bearer HBZ90468f48ff6136f1"
          },
          params: { _id: req.body.id },
          json: true
        }
      )
      .then(response => {
        res.send({
          info: response.data,
          balance: response.data.balance_hbz + plusMinus,
          balanceEth: balanceEth
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err.message);
      });
  });
};
