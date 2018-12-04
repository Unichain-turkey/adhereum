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
  }


}
