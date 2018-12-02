import Vue from 'vue'
import Vuex from 'vuex'

import {web3, ipfs} from '../common/interface.js'
import factoryContract from '../../../build/contracts/FactorySponsor'


Vue.use(Vuex)

const common = {
  state: {
    successFlag: false,
    successMessage: '',
    errorFlag: false,
    errorMessage: '',

  },
  mutations: {
    succes(state, msg) {
      state.errorFlag = false
      state.successFlag = true
      state.successMessage = msg
    },
    error(state, msg) {
      state.successFlag = false
      state.errorFlag = true
      state.errorMessage = msg
      this.reset(state)
    },
    reset(state) {
      setTimeout(() => {
        state.successFlag = false
        state.errorFlag = false
      }, 3000);
    }

  },
  getters: {
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
    jsonSponsor: factoryContract,
    addressSponsor: '0x17608e57f7b9d993cdbebfcb6f4d8cf2e82383b0',
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
}


export default new Vuex.Store({
  modules: {
    main: main,
    common: common
  }
})
