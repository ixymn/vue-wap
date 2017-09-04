import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index'
import entry from '../entry'

const home = r => require.ensure([], () => r(require('../pages/index/children/home')), 'home')
const lifestyle = r => require.ensure([], () => r(require('../pages/LifeStyle/lifestyle')), 'lifestyle')
const usercenter = r => require.ensure([], () => r(require('../pages/index/children/usercenter')), 'usercenter')
const goods = r => require.ensure([], () => r(require('../pages/goods/goods')), 'goods')

const goodsDetail = r => require.ensure([], () => r(require('../pages/goods/goodsDetail')), 'goodsDetail')
const cart = r => require.ensure([], () => r(require('../pages/cart/cart')), 'cart')//购物车
const orderConfirm = r => require.ensure([], () => r(require('../pages/cart/orderConfirm')), 'orderConfirm')//购物车下单页
const iframePay = r => require.ensure([], () => r(require('../pages/cart/iframePay')), 'iframePay')//支付lipapayframe
const order = r => require.ensure([], () => r(require('../pages/order/order')), 'order')//订单列表
const orderDetail = r => require.ensure([], () => r(require('../pages/order/orderDetail')), 'orderDetail')//订单详情
const orderDetailPay = r => require.ensure([], () => r(require('../pages/order/orderDetailPay')), 'orderDetailPay')//未付款订单详情

const cashRewards = r => require.ensure([], () => r(require('../pages/cashRewards/cashRewards')), 'cashRewards')//cash rewards
const cashRewardsLog = r => require.ensure([], () => r(require('../pages/cashRewards/cashRewardsLog')), 'cashRewardsLog')//cash rewards Log

const address = r => require.ensure([], () => r(require('../pages/address/address')), 'address')//地址信息
const addressEdit = r => require.ensure([], () => r(require('../pages/address/edit')), 'addressEdit')//地址信息修改
const addressAdd = r => require.ensure([], () => r(require('../pages/address/add')), 'addressAdd')//地址信息修改
const province = r => require.ensure([], () => r(require('../pages/address/children/province')), 'province')//地址信息修改
const city = r => require.ensure([], () => r(require('../pages/address/children/city')), 'city')//地址信息修改
const pickup = r => require.ensure([], () => r(require('../pages/address/children/pickup')), 'pickup')//自提点

const invitFriends = r => require.ensure([], () => r(require('../pages/invitFriends/invitFriends')), 'invitFriends')//邀请朋友分享码
const invitFriendsShare = r => require.ensure([], () => r(require('../pages/invitFriends/invitFriendsShare')), 'invitFriendsShare')//邀请朋友分享码
const lifestyleDetail = r => require.ensure([], () => r(require('../pages/LifeStyle/lifestyleDetail')), 'lifestyleDetail')
const newShare = r => require.ensure([], () => r(require('../pages/LifeStyle/newShare')), 'newShare')
const fav = r => require.ensure([], () => r(require('../pages/fav/fav')), 'fav')
const history = r => require.ensure([], () => r(require('../pages/fav/history')), 'history')
const flashSale = r => require.ensure([], () => r(require('../pages/flashSale/flashSale')), 'flashSale')

const help = r => require.ensure([], () => r(require('../pages/help/help')), 'help')
const helpII = r => require.ensure([], () => r(require('../pages/help/helpII')), 'helpII')
const helpIII = r => require.ensure([], () => r(require('../pages/help/helpIII')), 'helpIII')

const category = r => require.ensure([], () => r(require('../pages/category/category')), 'category')
const categoryII = r => require.ensure([], () => r(require('../pages/category/categoryII')), 'categoryII')
const todayDeal = r => require.ensure([], () => r(require('../pages/todayDeal/todayDeal')), 'todayDeal')


const changeCountry = r => require.ensure([], () => r(require('../pages/settings/changeCountry')), 'changeCountry')
const searchPage = r => require.ensure([], () => r(require('../pages/search/search')), 'searchPage')
const categorySearch  = r => require.ensure([], () => r(require('../pages/search/searchCategory')), 'categorySearch')
const login  = r => require.ensure([], () => r(require('../pages/login/login')), 'login')

const emailSignUp  = r => require.ensure([], () => r(require('../pages/login/emailSignUp')), 'emailSignUp')
const mobileSignUp  = r => require.ensure([], () => r(require('../pages/login/mobileSignUp')), 'mobileSignUp')
const signUpSuc  = r => require.ensure([], () => r(require('../pages/login/signUpSuc')), 'signUpSuc')
const fpEmail  = r => require.ensure([], () => r(require('../pages/login/fpEmail')), 'fpEmail')
const verifyPhone  = r => require.ensure([], () => r(require('../pages/login/verifyPhone')), 'verifyPhone')
const fpMobile  = r => require.ensure([], () => r(require('../pages/login/fpMobile')), 'fpMobile')
const store  = r => require.ensure([], () => r(require('../pages/store/store')), 'store')

const special  = r => require.ensure([], () => r(require('../pages/special/special')), 'special')
const goStoreSearch  = r => require.ensure([], () => r(require('../pages/store/goStoreSearch')), 'goStoreSearch')
const setting  = r => require.ensure([], () => r(require('../pages/settings/setting')), 'setting')
const savedShops  = r => require.ensure([], () => r(require('../pages/store/savedShops')), 'savedShops')

const paymentStatus  = r => require.ensure([], () => r(require('../pages/payment/status')), 'savedShops')
const modifyPassword  = r => require.ensure([], () => r(require('../pages/login/modifyPassword')), 'modifyPassword')


const credit  = r => require.ensure([], () => r(require('../pages/user/credit')), 'credit')

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/changeCountry',
      component: changeCountry
    },
    {
      path: '/:country?',
      component:entry,
      redirect:'/:country?/home',
      children: [
        { path:"/:country?/index",
          component:index,
          children:[
            {
              path:'/:country?/home',
              component:home
            },
            {
              path:'/:country?/lifestyle',
              component:lifestyle
            },
            {
              path:'/:country?/usercenter',
              component:usercenter
            },
            {
              path: '/:country?/category',
              component:category,
            },
            {
              path: '/:country?/category/:id',
              component:categoryII,
            },
          ],
        },
        {
          path: '/:country?/goods/:goodsid',
          component: goods,
        },
        {
          path: '/:country?/goodsDetail/:goodsid/:tabindex',
          component:goodsDetail,
        },
        {
          path: '/:country?/goodsDetail/:goodsid',
          component:goodsDetail,
        },
        {
          path: '/:country?/cart',
          component:cart,
        },
        {
          path: '/:country?/orderConfirm',
          component:orderConfirm,
        },
        {
          path: '/:country?/iframePay/:backUrl',
          component:iframePay,
        },
        {
          path: '/:country?/order',
          component: order,
        },
        {
          path: '/:country?/fav',
          component: fav,
        },
        {
          path: '/:country?/history',
          component: history,
        },
        {
          path: '/:country?/flashSale',
          component: flashSale,
        },
        {
          path: '/:country?/help',
          component: help,
        },
        {
          path: '/:country?/helpII/:id',
          component: helpII,
        },
        {
          path: '/:country?/helpIII/:id',
          component: helpIII,
        },
        {
          path: '/:country?/orderDetailPay/:paysn',
          component: orderDetailPay,
        },
        {
          path: '/:country?/orderDetail/:orderid',
          component: orderDetail,
        },
        // {
        //   path:'/lifestyle',
        //   component:lifestyle
        // },
        {
          path: '/:country?/category',
          component:category,
        },
        {
          path: '/:country?/category/:id',
          component:categoryII,
        },
        {
          path: '/:country?/cashRewards',
          component: cashRewards,
        },
        {
          path: '/:country?/cashRewardsLog',
          component: cashRewardsLog,
        },
        {
          path: '/:country?/invitFriends',
          component: invitFriends,
        },
        {
          path: '/:country?/invitFriendsShare/:code',
          component: invitFriendsShare,
        },
        {
          path: '/:country?/address',
          component: address,
        },
        {
          path:'/:country?/addressEdit',
          component:addressEdit,
          children:[
            {
              path:'province',
              component:province,
            },
            {
              path:'city',
              component:city,
            },
            {
              path:'pickup',
              component:pickup,
            },
          ],
        },
        {
          path:'/:country?/addressAdd',
          component:addressAdd,
          children:[
            {
              path:'province',
              component:province,
            },
            {
              path:'city',
              component:city,
            },
            {
              path:'pickup',
              component:pickup,
            },
          ],
        },
        {
          path: '/:country?/lifestyleDetail',
          component:lifestyleDetail,
        },
        {
          path: '/:country?/newShare',
          component:newShare,
        },
        {
          path: '/:country?/changeCountry',
          component: changeCountry
        },
        {
          path: '/:country?/promotion',
          component:todayDeal,
        },
        {
          path: '/:country?/search',
          component:searchPage
        },
        {
          path: '/:country?/search/:searchItem',
          component:searchPage
        },
        {
          path:'/:country?/categorySearch/:gc_id',
          component:categorySearch
        },
        {
          path:'/:country?/login',
          component:login
        },
        {
          path:'/:country?/emailSignUp',
          component:emailSignUp
        },
        {
          path:'/:country?/mobileSignUp',
          component:mobileSignUp
        },
        {
          path:'/:country?/signUpSuc',
          component:signUpSuc
        },
        {
          path:'/:country?/fpEmail',
          component:fpEmail
        },
        {
          path:'/:country?/fpMobile',
          component:fpMobile
        },
        {
          path:'/:country?/special/:id',
          component:special
        },
        {
          path:'/:country?/store/:id',
          component:store
        },
        {
          path:'/:country?/goStoreSearch/:info',
          component:goStoreSearch
        },
        {
          path:'/:country?/setting',
          component:setting
        },
        {
          path:'/:country?/verifyPhone',
          component:verifyPhone
        },
        {
          path:'/:country?/savedShops',
          component:savedShops
        },
        {
          path:'/:country?/paymentStatus',
          component:paymentStatus
        },
        {
          path:'/:country?/credit',
          component:credit
        },
        {
          path:'/:country?/modifyPassword',
          component:modifyPassword
        },
      ]

    }
  ]
})
