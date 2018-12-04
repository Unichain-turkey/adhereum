import sponsor from '../../../../build/contracts/Sponsor'

import store from '../../store/index'

export default {

  readEvents: (contract, callback) => {
    contract.getPastEvents('beenSponsor', {fromBlock: 0, toBlock: 'latest'}, function (error, events) {
      console.log(events);
    })
      .then(function (events) {
        console.log(events)
      });
  },
  getSponsorContract: (address) => {
    const Web3 = (store.getters.web3)();
    return (new Web3.eth.Contract(sponsor.abi, address));
  },
  getSponsorList: (events, callback) => {
    console.log(events)
    /*
    events.forEach((element) => {
      var address = element.returnValues[0]
      const Web3 = (store.getters.web3)();
      let contract = new Web3.eth.Contract(sponsor.abi, address);
      /*
      contract.methods.getSponsor().call().then(function (val) {
        console.log(val)
      })


    });
*/
  }


}
