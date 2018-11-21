import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../components/MainPage'
import ipfs from '../components/IpfsUpload'
import Admin from '../components/sponsor/Admin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/ipfs',
      name: 'ipfs',
      component: ipfs
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {path: '*', redirect: '/admin'}
  ]
})
