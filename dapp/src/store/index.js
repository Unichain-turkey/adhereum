import Vue from 'vue'
import Vuex from 'vuex'

import { ipfs ,web3Instance, contractInstance } from '@/common/coreinterface.js'

var NETWORKS= {
  1: 'Main Net',
  2: 'Deprecated Morden test network',
  3: 'Ropsten test network',
  4: 'Rinkeby test network',
  42: 'Kovan test network',
  4447: 'Truffle Develop Network',
  5777: 'Ganache Blockchain'
};
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isInjected: false,
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    error: null,
    contractInstance: null,
    ipfsApi: null,
    networkName:"",
    sponsorCount: 0,
    pendingCount: 0,
    limit: 0,
    balanceSponsor: 0
  },
  strict: true,
  mutations: {
    CREATEWEB3 (state, result) {
      state.balance = result.balance
      state.coinbase = result.coinbase[0]
      state.networkId = result.networkId
      state.networkName = NETWORKS[result.networkId]
      state.isInjected = result.injectedWeb3
      state.web3Instance = result.web3
    },
    SETCONTRACTINSTANCE (state, result) {
      state.contractInstance = () => result
    },
    SETINFORMATION (state, result) {
      console.log("in storage :",result)
      state.sponsorCount = result['0']
      state.pendingCount = result['1']
      state.limit = result['2']
      state.balanceSponsor = result['3']
    },
    SETIPFS (state, result) {
      state.ipfsApi = result
    },
  },
  actions: {
    async  createWeb3 ({ commit }) {
      let result = await web3Instance;
      commit('CREATEWEB3', result)

    },
    async setContract ({ commit }) {
      let result = await contractInstance;
      commit('SETCONTRACTINSTANCE', result)
    },
    ipfsSet ({ commit }) {
      commit('SETIPFS',ipfs)
    },
    setInfo ({ commit }, result) {
      commit('SETINFORMATION', result)
    },
  },
  getters: {
    web3: state => {
      return state.web3Instance()
    },
    balance: state => {
      return (state.balance / 1000000000000000000).toFixed(4)
    },
    currentAddress: state => {
      if ((state.coinbase) !== null) {
        return state.coinbase
      } else {
        return 'Null'
      }
    },
    network: state => {
      return state.NETWORKS[state.networkId]
    },
    contractInstance: state => {
      return state.contractInstance
    },
    sponsorCount: state => {
      return state.sponsorCount
    },
    pendingCount: state => {
      return state.pendingCount
    },
    limit: state => {
      return state.limit
    },
    balanceSponsor: state => {
      return (state.balanceSponsor / 1000000000000000000).toFixed(4)
    },
    getIpfs: state => {
      return state.ipfsApi
    }

  }
})
