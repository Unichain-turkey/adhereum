var sponsorFactory = artifacts.require("./SponsorFactory.sol");
var adsFactory = artifacts.require("./AdsFactory.sol");

module.exports = function (deployer) {
    deployer.deploy(sponsorFactory, 15, 3, 2, 1);
    deployer.deploy(adsFactory, 10, 5);
};
