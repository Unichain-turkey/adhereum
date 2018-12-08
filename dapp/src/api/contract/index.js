import sponsor from '../../../../build/contracts/Sponsor'

import store from '../../store/index'
import web3 from "web3";
import ValidationUtil from "../../common/util";


function getContract(address) {
  const Web3 = (store.getters.web3)();
  return (new Web3.eth.Contract(sponsor.abi, address));
}


export default {

  requestSponsor: (name, url, filehash, type, duration, callback) => {

    let value = web3.utils.toWei('1', 'finney') * (3 - type) * duration

    url = ValidationUtil.validateLink(url)
    let contract = store.getters.contractOne

    const temp = contract.methods.requestBeingSponsor(name, url, filehash, type, duration)
      .send(
        {value: value, from: store.getters.coinbase})

    temp.then(function (value) {
      store.commit('success', 'Successfully your request delivered');
    }).catch((e) => {
      console.log(e)
      store.commit('error', e);
    }).finally(function () {
      callback("Done")
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
        callback(val)

      })
    })
  }


}
