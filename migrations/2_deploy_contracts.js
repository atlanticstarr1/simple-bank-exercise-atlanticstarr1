var Lighthouse = artifacts.require("./Lighthouse.sol");
var SimpleBank = artifacts.require("./SimpleBank.sol");

module.exports = function(deployer, network) {
  if (network == "rinkeby") {
    //var address = "0x4A4eB913FA69a7a4c065bD04119d99E9b2728667"; // lighthouse for rate of ten cents of USD in ETH (1x per day)
    var address = "0x613D2159db9ca2fBB15670286900aD6c1C79cC9a"; //address of RNG lighthouse on rinkeby
    deployer.deploy(SimpleBank, address);
  } else {
    // for local testing
    deployer.deploy(Lighthouse).then(function() {
      return deployer.deploy(SimpleBank, Lighthouse.address);
    });
  }
};
