var Web3 = require("web3");
var PrivateKeyProvider = require("truffle-privatekey-provider");
var privateKey =
  "76F6EC7EACC0F19FCA5CCB1D689A60B229327BF0C038119EE2BDFA2293236AFD";

var provider = new PrivateKeyProvider(
  privateKey,
  "https://mainnet.infura.io/'"
);
var web3 = new Web3(provider);
web3.eth.setProvider(provider);

module.exports = web3;
