import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'

const home = r => require.ensure([], () => r(require('../pages/index/home')), 'home')
const lifestyle = r => require.ensure([], () => r(require('../pages/index/lifestyle')), 'lifestyle')
const usercenter = r => require.ensure([], () => r(require('../pages/index/usercenter')), 'usercenter')
const goods = r => require.ensure([], () => r(require('../pages/goods')), 'goods')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      redirect:"/home",
      children: [
        {
          path:'/home',
          component:home
        },
        {
          path:'/lifestyle',
          component:lifestyle
        },
        {
          path:'/usercenter',
          component:usercenter
        }
      ]
    },
    {
      path: '/goods',
      component: goods,
    }
  ]


})
