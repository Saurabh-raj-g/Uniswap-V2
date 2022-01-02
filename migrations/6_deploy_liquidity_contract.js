var Liquidity = artifacts.require("./Liquidity.sol");

module.exports = function(deployer) {
  deployer.deploy(Liquidity);
};
