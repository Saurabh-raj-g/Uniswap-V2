const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const private_keys =[ 
  '70989e6471e6b67264e90b37907cc88d858557cbf26e3eb33ea572455c16a076',
  '8a11d9b2ff2d457d49df052de7ed825ddbbcdcae0550aadfdefc9fd80ffb96cf'
]
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    // development: {
    //   host: "127.0.0.1",
    //   port: 7545,
    //   network_id: "*" // Match any network id
    // }
    ropsten: {
      provider: () => new HDWalletProvider({
        privateKeys : private_keys,
        providerOrUrl : "https://ropsten.infura.io/v3/ea158dea03c6442e8ce868c081c97b88",
        numberOfAddresses : 2
 
      }),
      network_id : 3,  // Ropsten's Id
      gas : 5500000,
      confirmations : 1,
      timeoutBlocks: 200,
      skipDryRun: true,
      networkCheckTimeout: 1000000000
 
    },

 },

  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};

//  truffle test --network ropsten
//  truffle deploy --network ropsten

/*
simpleStorage contract address-->  0xDbA816d0D283ddc5eB8C237B39830E670C12DB44

TokenA contract address-->  0xb33EDD6448eC2F93d0728DB8223EDc8Bb3cF2E6c

TokenB contract address-->  0x2E2582e7aA28fa9374c2b32890C1CFF066f86028

swap contract address-->  0xcc45f8D62B57d5032ce570c6c13760b81dF74ab0

liquidity contract address-->   0xC6Ab1f5431D8dE95bC956574Dc7CF43331fD2fE3



*/

