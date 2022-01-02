var Token1 = artifacts.require("./TokenA.sol");

module.exports = function(deployer) {
  deployer.deploy(Token1, 100000);
};