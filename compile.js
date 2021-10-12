// compile code will go here

const path = require("path");
const fs = require("fs");
// solidity compiler
const solc = require("solc");

// we can't *require* the file, reason being require works good only for js files
// and we want a solidity file
const inboxpath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxpath, "utf8");

// this compiled thing that we are returning has many properties
// of which 2 are important
// 1. byte code (raw compiled contract)
// 2. interface (javascript abi)
// the parameter '1' is the number of contracts to compile (may be ... not sure)
module.exports = solc.compile(source, 1).contracts[":Inbox"];
