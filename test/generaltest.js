var sponsorFactory=artifacts.require("./FactorySponsor.sol");
var sponsor=artifacts.require("./Sponsor.sol");


var sponsor=[
    ["Finartz","www.finartz.com","QmV8aySCTTvkpHPS4RjBpMnPhuTbt6EdmMhrBVPFPRAZSb",1,true],
    ["Apple","www.apple.com","QmdLPh8Wk9aCHQTgPotkPG9Gbbc6Z7hUdrcdKUcfZ7nFTu*",2,true],
    ["Inoix","www.inoix.com","QmZQAZd9M7W7vj7HdzAifLBNZTnapZbD32LmcqM1Fj1h2h",3,true],
    ["Instagram","www.google.com","QmdLS83tKTBsAQQ3wGSqRUfrY3eKZcr5WWinDAJMv1GfNv",200,false],
    ["ConsenSys","https://new.consensys.net","QmaQUfuFuF4uGtoj4o6LdvPJu9DJE99bra7zk3eCYyDhEt",2,true],
    ["BKM","https://bkm.com.tr/","QmcoMVbowwHkwyQtySyVbL5vknU7UZ6ojP1vszZdfoNgmh",2,true],

];


const isRevertError = (error) => {
    const invalidOpcode = error.message.search('invalid opcode') >= 0;
    const outOfGas = error.message.search('out of gas') >= 0;
    const revert = error.message.search('revert') >= 0;
    return invalidOpcode || outOfGas || revert;
}



contract("Sponsor",function(accounts){
    let factoryContract;
    let price;

    before(async () => {
        factoryContract = await sponsorFactory.deployed();
        assert.notEqual(typeof(factoryContract),"undefined","deploying of contract is failed");
    }),
    it('Check limit of sponsor ',async () => {
        const result=await  factoryContract.getLimit();
        assert.equal(result.c[0],20,"Limit of sponsors is not correct");

    });
    it('Get Price ',async () => {
        const result=await  factoryContract.getPrice();
        price=result.c[0]
        assert.equal(result.c[0],3,"Failed getting price");


    });
    describe('Sponsor requests is adding', function(){
        sponsor.forEach(function(item,index) {
            it(item[0]+' being ofsponsor is received: ',async () => {
                const result=await  factoryContract.beSponsor(item[0],item[1],item[2],item[3],{value:web3.toWei(price,'finney') * item[3] ,from:accounts[index]});
                assert.equal(result.logs[0].event,'pendedList',"being of sponsor is failed");

            });
        });

    });
    describe('Confirm of being sponsors', function(){
        let countofConfirmation=0;
        sponsor.forEach(function(item,index) {
            if (item[4])
            {
                it(item[0]+' sponsorships is confirmed ',async () => {
                    const result=await  factoryContract.confirm(index,{from:accounts[0]});
                    assert.equal(result.logs[0].event,'beenSponsor',"confirmation of sponsorship is failed");
                    countofConfirmation++;
                });
            }
            else {
                it(item[0]+' sponsorships is refused ',async () => {
                    const result=await  factoryContract.deny(index,{from:accounts[0]});
                    assert.equal(result.logs[0].event,'denySponsor',"rejection of sponsorship is failed");
                });
            }

        });

        it('Number of sponsorships is okey ',async () => {
            const count=await  factoryContract.getSponsorCount();
            assert.equal(count.c[0],countofConfirmation,"Number of sponsorships  is failed");

        });


    });



});


