import Web3 from 'web3'
import ipfsAPI from 'ipfs-api'


let web3 = new Promise(function (resolve, reject) {
  if (window.web3) {
    var web3 = new Web3(window.web3.currentProvider)
    resolve({
      injectedWeb3: true,
      web3() {
        return web3
      }
    })
  } else {
    let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')) // GANACHE FALLBACK
    resolve({
      injectedWeb3: false,
      web3() {
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
          result = Object.assign({}, result, {coinbase})
          resolve(result)
        }
      })
    })
  })
const ipfs = ipfsAPI('46.101.182.159', '5001', {protocol: 'http'})

export {web3, ipfs}
