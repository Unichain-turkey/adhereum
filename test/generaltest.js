var sponsorFactory=artifacts.require("./FactorySponsor.sol");
var sponsor=artifacts.require("./Sponsor.sol");

var hash='QmNvSDNj7Rv56m6Xo7aLkTAstCx3awXEmspSiH4rN6AiLk'

var sponsor=[["a","a","a",10],  //8 ether
    ["a","a","a",10],
    ["a","a","a",10],
    ["a","a","a",10],
    ["a","a","a",10],
];
var sponsorAddress=[];


const isRevertError = (error) => {
    const invalidOpcode = error.message.search('invalid opcode') >= 0;
    const outOfGas = error.message.search('out of gas') >= 0;
    const revert = error.message.search('revert') >= 0;
    return invalidOpcode || outOfGas || revert;
}



contract("Sponsor",function(accounts){
    let _contract;


    sponsor.forEach(function(item,index) {
        it('Add: '+item[0],async () => {
            _contract = await sponsorFactory.deployed();
            console.log("Adress",_contract.address)
            const result=await  _contract.beSponsor(item[0],item[1],item[2],item[3],{value:web3.toWei(1,'finney'),from:accounts[0]});
            //console.log(result.logs[0])
        });

    });


});