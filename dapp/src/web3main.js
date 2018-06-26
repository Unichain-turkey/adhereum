import Web3 from 'web3'
import sponsorContract from '../../build/contracts/FactorySponsor.json'
var sponsorContractAddress = '0xe1995ed193da7c21766109bb96690f0c2d42ee44'

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

let web3Instance = new Promise(function (resolve, reject) {
  // Check for injected web3 (mist/metamask)
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
      // Retrieve coinbase
      result.web3().eth.getAccounts((err, coinbase) => {
        if (err) {
          reject(new Error('Unable to retrieve coinbase'))
        } else {
          result = Object.assign({}, result, { coinbase })
          resolve(result)
        }
      })
    })
  })

export {web3Instance, contractInstance}
