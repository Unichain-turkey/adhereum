import Vue from 'vue'
import Vuex from 'vuex'

import {web3, ipfs} from '../common/interface.js'
import sponsorContract from '../../../build/contracts/FactorySponsor.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jsonSponsor: sponsorContract,
    addressSponsor: '0x764d831961f15bd3092d6eab7674d414047643b2',
    contract: null,
    isInjected: false,
    web3: null,
    networkId: null,
    coinbase: null,
    balance: null,
    ipfsApi: null,
    NETWORKS: {
      '1': 'Main Net',
      '2': 'Deprecated Morden test network',
      '3': 'Ropsten test network',
      '4': 'Rinkeby test network',
      '42': 'Kovan test network',
      '4447': 'Truffle Develop Network',
      '5777': 'Ganache Blockchain'
    },
  },
  mutations: {
    CREATEWEB3(state, result) {
      state.balance = result.balance
      state.coinbase = result.coinbase
      state.networkId = result.networkId
      state.isInjected = result.isInjected
      state.web3 = result.web3
    },
    SETIPFS(state, result) {
      state.ipfsApi = result
    },
    SETCONTRACT(state, contract) {
      state.contract = contract
    },
  },
  actions: {
    initWeb3({commit}) {
      web3.then(value => {
        commit('CREATEWEB3', value)
      }, reason => {
        console.log(reason)
      })
    },
    ipfsSet({commit}) {
      commit('SETIPFS', ipfs)
    }
  },
  getters: {
    jsonSponsor: state => {
      return state.jsonSponsor
    },
    addressSponsor: state => {
      return state.addressSponsor
    },
    web3: state => {
      return state.web3
    },
    balance: state => {
      return (state.balance / 1000000000000000000).toFixed(4)
    },
    currentAddress: state => {
      if ((state.coinbase) !== null) {
        return state.coinbase[0]
      } else {
        return 'Null'
      }
    },
    network: state => {
      return state.NETWORKS[state.networkId]
    },
    getIpfs: state => {
      return state.ipfsApi
    },
    getContract: state => {
      return state.contract
    }

  }
})
