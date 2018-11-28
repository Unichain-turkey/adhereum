// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.component('icon', Icon)
import Vuetify from 'vuetify'

Vue.use(Vuetify)

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@fortawesome/fontawesome-free/css/all.css'


Vue.config.productionTip = false;


;(async () => {
  try {
    //store.dispatch('createWeb3')
    //store.dispatch('setContract')
    store.dispatch('ipfsSet')
  } catch (e) {
    console.log('uff', e)
  } finally {
    new Vue({
      el: '#app',
      store,
      router,
      components: {App},
      template: '<App/>'
    })
  }
})()
