import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  site:{},
  sites:{

    },
  },
  home_page:{},
  cartGoods:0,
  cartList:null,//加入购物车商品列表
  shopList:{},//购物车 商品详情的店铺信息
  addrInfo:{},//地址新增、编辑信息
  cartAddr:{},//购物车选中地址
  cartAddrTmp:null,//购物车选中地址
  isCartAddr:false,//是否是对购物车内的地址操作
  orderStep:{},
  orderCfrmData:null,
  backCartAddr:null,
  backCart:null,
  backOrder:null,
  flashSales:{},
  searchRecommands:{},
  searchResult:{},
  loginInfo:{},
  goodInfo:{},
  cartAllList:null,//购物车所有数据
  cartCheckAll:false,//购物车所有数据都选中。
  paySn:null,//支付的paysn信息
  orderTabIndex:1,
  newApiConfig:'',
  isAndroid:navigator.userAgent.indexOf("kilimall")>1?true:false,

}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
