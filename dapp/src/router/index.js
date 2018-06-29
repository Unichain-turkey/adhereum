import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import ipfs from '@/components/IpfsUpload'

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
    { path: '*', redirect: '/' }
  ]
})
