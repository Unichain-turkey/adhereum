var sponsorFactory = artifacts.require("./FactorySponsor.sol");

module.exports = function (deployer) {
    deployer.deploy(sponsorFactory, 15, 3, 2, 1);
};
