import Vue from 'vue'
import Vuex from 'vuex'

import {ipfs, web3} from '../common/interface.js'
import sponsorFactory from '../../../build/contracts/SponsorFactory'
import adsFactory from '../../../build/contracts/AdsFactory'

import config from '../config'


Vue.use(Vuex)

const common = {
  state: {
    loader: false,
    successFlag: false,
    successMessage: '',
    errorFlag: false,
    errorMessage: '',

  },
  mutations: {
    success(state, msg) {
      state.errorFlag = false
      state.successFlag = true
      state.successMessage = msg
    },
    error(state, msg) {
      state.successFlag = false
      state.errorFlag = true
      state.errorMessage = msg
    },
    reset(state) {
      state.successFlag = false
      state.errorFlag = false
    },
    setLoader(state, value) {
      state.loader = value
    },

  },
  getters: {
    loader: state => {
      return state.loader
    },
    successFlag: state => {
      return state.successFlag
    },
    successMessage: state => {
      return state.successMessage
    },
    errorFlag: state => {
      return state.errorFlag
    },
    errorMessage: state => {
      return state.errorMessage
    },
  }
}

const main = {
  state: {
    abiDemoOne: sponsorFactory,
    abiDemoTwo: adsFactory,
    addressDemoOne: config.addressDemoOne,
    addressDemoTwo: config.addressDemoTwo,
    contractOne: null,
    contractTwo: null,
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
      state.coinbase = result.coinbase[0]
      state.networkId = result.networkId
      state.isInjected = result.isInjected
      state.web3 = result.web3
    },
    SETIPFS(state, result) {
      state.ipfsApi = result
    },
    SETCONTRACTONE(state, contract) {
      state.contractOne = contract
    },
    SETCONTRACTTWO(state, contract) {
      state.contractTwo = contract
    },
    SETCOINBASE(state, coinbase) {
      state.coinbase = coinbase
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
    contractTwo: state => {
      return state.contractTwo
    },
    contractOne: state => {
      return state.contractOne
    },
    abiDemoOne: state => {
      return state.abiDemoOne
    },
    addressDemoOne: state => {
      return state.addressDemoOne
    },
    addressDemoTwo: state => {
      return state.addressDemoTwo
    },
    web3: state => {
      return state.web3
    },
    balance: state => {
      return (state.balance / 1000000000000000000).toFixed(4)
    },
    coinbase: state => {
      return state.coinbase;
    },
    network: state => {
      return state.NETWORKS[state.networkId]
    },
    getIpfs: state => {
      return state.ipfsApi
    },

  }
}

export default new Vuex.Store({
  modules: {
    main: main,
    common: common
  }
})
