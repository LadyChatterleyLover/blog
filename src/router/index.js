import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/home'
import login from '../page/login'
import err from '../page/error'
import logout from '../page/logout'
import visitor from '../page/visitor'
import create from '../page/create'
import detail from '../page/detail'
import check from '../page/check'
import statistics from '../page/statistics'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: statistics
    },
    {
      path: '/check',
      name: 'check',
      component: check
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/create',
      name: 'create',
      component: create
    },
    {
      path: '/visitor',
      name: 'visitor',
      component: visitor
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/logout',
      name: 'logout',
      component: logout
    },
    {
      path: '*',
      name: '404',
      component: err
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.user ? true : false
  if (to.path === '/login') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})



export default router
