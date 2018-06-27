// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import web3 from 'web3'

import App from './App'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)


Vue.filter('toWei', function (value) {
  return web3.utils.toWei(value, 'ether')
})

;(async () => {
  try {
    await store.dispatch('setContract')
    await store.dispatch('createWeb3')
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
