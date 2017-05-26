import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	home_page:{},
	cartGoods:0,
	cartList:{},//加入购物车商品列表
	flashSales:{},
	pjltest:'KKKKK'
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
