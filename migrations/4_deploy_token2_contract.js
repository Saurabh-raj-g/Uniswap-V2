var Token2 = artifacts.require("./TokenB.sol");

module.exports = function(deployer) {
  deployer.deploy(Token2, 100000);
};