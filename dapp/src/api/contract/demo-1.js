/*
myContract.getPastEvents('MyEvent', {
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0,
    toBlock: 'latest'
}, function(error, events){ console.log(events); })
.then(function(events){
    console.log(events) // same results as the optional callback above
});
 */
export default {

  readEvents: (contract, callback) => {
    contract.getPastEvents('beenSponsor', {fromBlock: 0, toBlock: 'latest'}, function (error, events) {
      console.log(events);
    })
      .then(function (events) {
        console.log(events)
      });
  },


}
