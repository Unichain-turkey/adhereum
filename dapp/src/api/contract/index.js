import sponsor from '../../../../build/contracts/Sponsor'

import store from '../../store/index'
import web3 from "web3";


function getContract(address) {
  const Web3 = (store.getters.web3)();
  return (new Web3.eth.Contract(sponsor.abi, address));
}


export default {
  /*
  let _base = this.$store.getters.currentAddress
        this.txLoader = true;
        const temp = this.contract.methods.requestBeingSponsor(
          this.name, this.url, this.fileHash, this.type, this.duration).send({
          value: this.$options.filters.toWei('1') * (3 - this.type) * this.duration,
          from: _base
        })
        let that = this;
        temp.then(function (value) {
          console.log(value)
          that.txLoader = false;
          store.commit('success', 'Successfully your request delivered');
          this.dialog = false
        }).catch((e) => {
          console.log(e)
          that.$store.commit('error', e);
          that.txLoader = false;

        });

   */
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
