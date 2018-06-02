import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Signin from '@/components/Signin'

Vue.use(Router);

export default new Router({
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
    }
  ]
});
