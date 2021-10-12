// deploy code will go here

// https://rinkeby.infura.io/v3/2ebe05084fbd4e648a470fa4689b3120
// measure favorite object raw castle absurd rack sock breeze sister slogan antenna

const Web3 = require("web3");
const { interface, bytecode } = require("./compile.js");

// truffle helps you in deployment of your contract to real networks
const HDWalletProvider = require("truffle-hdwallet-provider");

const provider = new HDWalletProvider(
  "measure favorite object raw castle absurd rack sock breeze sister slogan antenna",
  "https://rinkeby.infura.io/v3/2ebe05084fbd4e648a470fa4689b3120"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy using account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ gas: "1000000", gasPrice: "5000000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};

deploy();
