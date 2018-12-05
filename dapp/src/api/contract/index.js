import sponsor from '../../../../build/contracts/Sponsor'

import store from '../../store/index'
import web3 from "web3";


function getContract(address) {
  const Web3 = (store.getters.web3)();
  return (new Web3.eth.Contract(sponsor.abi, address));
}


export default {
  requestSponsor: (name, url, filehash, type, duration, callback) => {

    let _base = store.getters.currentAddress
    let contract = store.getters.contractOne
    const temp = contract.methods.requestBeingSponsor(name, url, filehash, type, duration)
      .send(
        {value: web3.utils.toWei('1', 'finney') * (3 - type) * duration, from: _base})

    temp.then(function (value) {
      store.commit('success', 'Successfully your request delivered');
    }).catch((e) => {
      store.commit('error', e);
    }).finally(function () {
      callback()
    });
  },
  readEvents: (contract, callback) => {

    contract.getPastEvents('beenSponsor', {fromBlock: 0, toBlock: 'latest'}, function (error, events) {
      callback(events);
    })

  },

  getSponsorList: (events, callback) => {

    const addresses = events.map(e => e.returnValues[0]);
    addresses.forEach((address) => {
      let contract = getContract(address)
      contract.methods.getSponsor().call().then(function (val) {
        console.log(val)

      })
    })
  }


}
