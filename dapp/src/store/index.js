import Vue from 'vue'
import Vuex from 'vuex'

import { ipfs ,web3Instance, contractInstance } from '../common/web3main.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: {
      isInjected: false,
      web3Instance: null,
      networkId: null,
      coinbase: null,
      balance: null,
      error: null
    },
    contractInstance: null,
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
    sponsorCount: 0,
    activeSponsorCount: 0,
    totalValue: 0
  },
  strict: true, // don't leave it true on production
  mutations: {
    CREATEWEB3 (state, result) {
      state.web3.balance = result.balance
      state.web3.coinbase = result.coinbase
      state.web3.networkId = result.networkId
      state.web3.isInjected = result.isInjected
      state.web3.web3Instance = result.web3
    },
    SETCONTRACTINSTANCE (state, result) {
      state.contractInstance = () => result
    },
    SETSPONSORCOUNT (state, result) {
      state.sponsorCount = result
    },
    SETIPFS (state, result) {
      state.ipfsApi = result
    },
    SETACTIVESPONSORCOUNT (state, result) {
      state.activeSponsorCount = result
    },
    SETTOTALVALUE (state, result) {
      state.totalValue = result
    }
  },
  actions: {
    createWeb3 ({ commit }) {
      web3Instance.then(value => {
        commit('CREATEWEB3', value)
      }, reason => {
        console.log(reason)
      })
    },
    setContract ({ commit }) {
      contractInstance.then(value => {
        commit('SETCONTRACTINSTANCE', value)
      }, reason => {
        console.log(reason)
      })
    },
    ipfsSet ({ commit }) {
      commit('SETIPFS',ipfs)
    },
    setSponsorCount ({ commit }, result) {
      commit('SETSPONSORCOUNT', result)
    },

    setActiveSponsorCount ({ commit }, result) {
      commit('SETACTIVESPONSORCOUNT', result)
    },
    setTotalValue ({ commit }, result) {
      commit('SETTOTALVALUE', result)
    }
  },
  getters: {
    web3state: state => {
      return state.web3
    },
    web3InstanceGetter: state => {
      return state.web3.web3Instance
    },
    balance: state => {
      return (state.web3.balance / 1000000000000000000).toFixed(4)
    },
    currentAddress: state => {
      if ((state.web3.coinbase) !== null) {
        return state.web3.coinbase[0]
      } else {
        return 'Null'
      }
    },
    network: state => {
      return state.NETWORKS[state.web3.networkId]
    },
    contractInstance: state => {
      return state.contractInstance
    },
    sponsorCount: state => {
      return state.sponsorCount
    },
    activeSponsorCount: state => {
      return state.activeSponsorCount
    },
    totalValue: state => {
      return state.totalValue
    },
    getIpfs: state => {
      return state.ipfsApi
    }

  }
})
