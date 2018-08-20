import Web3 from 'web3'
import ipfsAPI from 'ipfs-api'

import sponsorContract from '../../../build/contracts/FactorySponsor.json'
var sponsorContractAddress = '0x7a7415603787d2a7705492032ad671f29f8daf39'
//rinkeby network


const contractInstance = new Promise(function (resolve, reject) {
  let web3 = window.web3
  let contract = null
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
    contract = new web3.eth.Contract(sponsorContract.abi, sponsorContractAddress)
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    contract = new web3.eth.Contract(sponsorContract.abi, sponsorContractAddress)
  }
  resolve(contract)
})

const web3Instance = new Promise(function (resolve, reject) {
  var web3js = window.web3
  if (typeof web3js !== 'undefined') {
    var web3 = new Web3(web3js.currentProvider)
    resolve({
      injectedWeb3: true,
      web3 () {
        return web3
      }
    })
  } else {
    let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')) // GANACHE FALLBACK
    resolve({
      injectedWeb3: false,
      web3 () {
        return web3
      }
    })
  }
})
  .then(result => {
    return new Promise(function (resolve, reject) {
      result.web3().eth.getAccounts((err, coinbase) => {
        if (err) {
          reject(new Error('Unable to retrieve coinbase'))
        } else {
          result = Object.assign({}, result, { coinbase })
          resolve(result)
        }
      })
    })
  }).then(result => {
    return new Promise(function (resolve, reject) {
      result.web3().eth.getBalance(result.coinbase[0],(err, balance) => {
        if (err) {
          reject(new Error('Unable to retrieve balleng'))
        } else {
          result = Object.assign({}, result, { balance })
          resolve(result)
        }
      })
    });
  }).
  then(result => {
    return new Promise(function (resolve, reject) {
      result.web3().eth.net.getId((err, networkId) => {
        if (err) {
          reject(new Error('Unable to retrieve balleng'))
        } else {
          result = Object.assign({}, result, { networkId })
          resolve(result)
        }
      })
    });
  })

const ipfs = ipfsAPI('46.101.182.159', '5001', {protocol: 'http'})

export {web3Instance, contractInstance,ipfs}
