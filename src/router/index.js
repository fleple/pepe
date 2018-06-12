import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Signin from '@/components/Signin'
import Login from '@/components/Login'
import User from '@/components/User'
import Coin from '@/components/Coin'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/coins/:coin',
      name: 'Coin',
      component: Coin
    }
  ]
});
