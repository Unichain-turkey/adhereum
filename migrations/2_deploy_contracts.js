
var sponsorFactory=artifacts.require("./FactorySponsor.sol");
var sponsor=artifacts.require("./Sponsor.sol");


module.exports = function(deployer) {

    deployer.deploy(sponsorFactory,10,1).then(function() {
        deployer.deploy(sponsor,"Test","Test1","Test2",6);
    }).then(function() {});


};