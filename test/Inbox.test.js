// contract test code will go here

const assert = require("assert");
const ganache = require("ganache-cli");

// note here Web3 's W is uppercase becuase this is a constructor function
// and we use this to create instances of the web3 library
const Web3 = require("web3");

// this is an instance of the Web3 library
// here the provider is the communication layer between our js app and
// the local blockchain network that is created by ganache
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require("../compile.js");

// GANACHE automatically creates accounts as well for us ... on the local network
// and we even don't need any keys(public or private keys) to run them

// before testing we have to deploy our contract
let accounts;
let inbox;
let INITIAL_MESSAGE = "Hi there!";
beforeEach(async () => {
  // Get a list of all accounts that ganache provides us
  // remember we use web3 to communicate with our network (here our local test network created by ganache)

  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  // interface is in json format so to convert it into javascript object we parse it
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox test", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    // the parentheses of the method (here 'message') takes arguments
    // required for the method
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_MESSAGE);
  });

  it("can change the message", async () => {
    // the parentheses of the method (here 'message') takes arguments
    // required for the method
    // and the parentheses of send takes the things when we have a transaction
    // (like we need to modify the contract)
    // remember to a function to modify a contract value involves a transaction
    const MODIFIED_MESSAGE = "Bye there";
    const message = await inbox.methods
      .setMessage(MODIFIED_MESSAGE)
      .send({ from: accounts[0] });
    const message2 = await inbox.methods.message().call();
    assert.equal(message2, MODIFIED_MESSAGE);
  });
});
