// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import web3 from 'web3'
import App from './App'
import router from './router'
import store from './store'

import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

Vue.filter('toWei', function (value) {
  return web3.utils.toWei(value, 'finney')
})

;(async () => {
  try {
    await store.dispatch('setContract')
    await store.dispatch('createWeb3')
    await store.dispatch('ipfsSet')
  } catch (e) {
    console.log('uff', e)
  } finally {
    new Vue({
      el: '#app',
      store,
      router,
      components: { App },
      template: '<App/>'
    })
  }
})()
