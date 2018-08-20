// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import web3 from 'web3'
import App from './App'
import router from './router'
import store from './store'
import VueCarousel from 'vue-carousel';
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"


Vue.use(BootstrapVue)
Vue.use(VueCarousel);

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
