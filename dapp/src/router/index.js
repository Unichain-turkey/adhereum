import Vue from 'vue'
import Router from 'vue-router'
import App from '../components/Main'
import demo1 from '../components/demos/Demo-1'
import Admin1 from '../components/demos/Demo-1-Admin'
import demo2 from '../components/demos/Demo-2'
import demo3 from '../components/demos/Demo-3'


Vue.use(Router)

export default new Router({
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
    {
      path: '/demo3',
      name: 'Demo-3',
      component: demo3
    },

  ]
})
