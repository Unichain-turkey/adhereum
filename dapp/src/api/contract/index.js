import sponsor from '../../../../build/contracts/Sponsor'
import ads from '../../../../build/contracts/Ads'

import store from '../../store/index'
import web3 from "web3";
import ValidationUtil from "../../common/util";


function getSponsorContract(address) {
  const Web3 = (store.getters.web3)();
  return (new Web3.eth.Contract(sponsor.abi, address));
}

function getAdsContract(address) {
  const Web3 = (store.getters.web3)();
  return (new Web3.eth.Contract(ads.abi, address));
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
  requestAds: (name, filehash, type, duration, callback) => {

    let value = web3.utils.toWei('1', 'finney') * 5 * duration
    let contract = store.getters.contractTwo
    const temp = contract.methods.requestAdvertisement(name, filehash, type, duration)
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
  readEvents: (contract, eventName, callback) => {

    contract.getPastEvents(eventName, {fromBlock: 0, toBlock: 'latest'}, function (error, events) {
      callback(events);
    })

  },

  getAdsList: (events, callback) => {
    const addresses = events.map(e => e.returnValues[0]);
    addresses.forEach((address) => {
      let contract = getAdsContract(address)
      contract.methods.getAds().call().then(function (val) {
        callback(val)

      })
    })
  },
  getSponsorList: (events, callback) => {
    const addresses = events.map(e => e.returnValues[0]);
    addresses.forEach((address) => {
      let contract = getSponsorContract(address)
      contract.methods.getSponsor().call().then(function (val) {
        callback(val)

      })
    })
  }

}
