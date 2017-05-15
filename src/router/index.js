import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index'
import App from '../App'

const home = r => require.ensure([], () => r(require('../pages/index/children/home')), 'home')
const lifestyle = r => require.ensure([], () => r(require('../pages/index/children/lifestyle')), 'lifestyle')
const usercenter = r => require.ensure([], () => r(require('../pages/index/children/usercenter')), 'usercenter')
const goods = r => require.ensure([], () => r(require('../pages/goods/goods')), 'goods')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path:'',
          redirect:"/home"
        },
        {
          path:'/index',
          component:index,
          children:[
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
    }
  ]
})
