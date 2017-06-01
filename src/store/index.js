import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  site:{},
  sites:{
    "kenya":{
      country:"Kenya",
      currency:"KSh",
      apiUrl:"//mobile.kilimall.co.ke/",
    },
    "nigeria":{
      country:"Nigeria",
      currency:"₦",
      apiUrl:"//mobile.kilimall.co.ng/",
    },
    "uganda":{
      country:"Uganda",
      currency:"UGX",
      apiUrl:"//mobile.kilimall.co.ug/",
    },
    "test":{
      country:"test",
      currency:"UGX",
      apiUrl:"//mobile.kili.co/",
    },
    "local":{
      country:"local",
      currency:"UGX",
      apiUrl:"//mobile.kili.com/",
    },
  },
  home_page:{},
  cartGoods:0,
  cartList:{},//加入购物车商品列表
  shopList:{},//购物车 商品详情的店铺信息
  flashSales:{}
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
