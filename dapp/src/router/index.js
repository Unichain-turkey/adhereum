import Vue from 'vue'
import Router from 'vue-router'
import App from '../components/Main'
import demo1 from '../components/demos/Demo-1'
import Admin1 from '../components/demos/Demo-1-Admin'
import demo2 from '../components/demos/Demo-2'
import store from '../store/index'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: App
    },
    {
      path: '/demo1',
      name: 'Demo-1',
      component: demo1,
    },
    {
      path: '/demo1/admin',
      component: Admin1,
    },
    {
      path: '/demo2',
      name: 'Demo-2',
      component: demo2
    },
  ]
})

router.beforeEach((to, from, next) => {

  if (store.getters.web3 !== null) {
    (store.getters.web3)().eth.getAccounts()
      .then((result) => {
        store.commit('SETCOINBASE', result[0])
      })
  }

  next();
})

export default router
