const axios = require("axios");
const JSON = require("circular-json");
module.exports = app => {
  //route
  app.post("/api/wallets", function(req, res) {
    axios
      .get(
        "http://hbz-listen-test.us-west-2.elasticbeanstalk.com/api/wallets",
        {
          headers: {
            Authorization: "Bearer HBZ90468f48ff6136f1"
          },
          params: { filter: req.body.filter },
          json: true
        }
      )
      .then(response => {
        res.send({ wallets: response.data.wallets });
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err.message);
      });
  });
};
