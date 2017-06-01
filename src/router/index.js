import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index'
import App from '../App'
 
const home = r => require.ensure([], () => r(require('../pages/index/children/home')), 'home')
const lifestyle = r => require.ensure([], () => r(require('../pages/LifeStyle/lifestyle')), 'lifestyle')
const usercenter = r => require.ensure([], () => r(require('../pages/index/children/usercenter')), 'usercenter')
const goods = r => require.ensure([], () => r(require('../pages/goods/goods')), 'goods')
const goodsDetail = r => require.ensure([], () => r(require('../pages/goods/goodsDetail')), 'goodsDetail')
const cart = r => require.ensure([], () => r(require('../pages/cart/cart')), 'cart')//购物车
const lifestyleDetail = r => require.ensure([], () => r(require('../pages/LifeStyle/lifestyleDetail')), 'lifestyleDetail')
const newShare = r => require.ensure([], () => r(require('../pages/LifeStyle/newShare')), 'newShare')

const category = r => require.ensure([], () => r(require('../pages/category/category')), 'category')

const categoryII = r => require.ensure([], () => r(require('../pages/category/categoryII')), 'categoryII')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component:index,
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
      path: '/goods/:goodsid',
      component: goods,
    },
    {
      path: '/goodsDetail/:goodsid',
      component:goodsDetail,
    },
    {
      path: '/cart',
      component:cart,
    },
    {
      path: '/lifestyleDetail',
      component:lifestyleDetail,
    },
    {
      path: '/newShare',
      component:newShare,
    },
    {
      path: '/category',
      component:category,
    },
    {
      path: '/categoryII/:id',
      component:categoryII,
    }
  ]
})
