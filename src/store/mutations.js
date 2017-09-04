import {
	STORE_HOME_INFO,
	SET_GOOD_INFO,
	ADD_TO_CART,
	ADD_CART,
	DEL_CART_LOCAL,
	ADD_ADDR,
	INIT_CART,
	REMOVE_LOCAL_CART,
	FOCUS_CART_ADDR,
	FOCUS_CART_ADDR_TMP,
	IS_CART_ADDR,
	PAY_SN,
	CART_CHECK_ALL,
	BACK_CART_ADDR,
	BACK_CART,
	BACK_ORDER,
	ORDER_STEP,
	SAVE_CART,
	SAVE_ORDCFRM,
	ORDER_TAB_INDEX,
	SAVE_CONFIRM_POPUP,
	FLASH_SALE,
	SET_SITES,
  STORE_SEARCH_RECOMMAND,
  STORE_LOGIN_INFO,
} from './mutation-types.js'

import {
	setStore,
	getStore,
	removeStore,
} from '../utils/mUtils'

export default {

	[STORE_HOME_INFO](state, home_page_info) {
		state.home_page = home_page_info;
	},
	[SET_GOOD_INFO](state, Goods) {
		state.goodInfo=Goods;
	},
	[ADD_TO_CART](state, Goods) {
		state.cartGoods += 1;
	},
	[ADD_CART](state,{goodId,pcs}){
		let cart = state.cartList?state.cartList:{};
		if(cart[goodId]){
			cart[goodId]['num']+=pcs;
		}else{
			cart[goodId] = {
				"num":pcs,
			};
		}
		state.cartList = {...cart};
		//存入localstorage
		setStore('buyCart',state.cartList);
	},
	[DEL_CART_LOCAL](state,goodId){
		let cart = {};
		for(let i in state.cartList){
			if(i!=goodId){
				cart[i]=state.cartList[i];
			}
		}
		
		state.cartList = {...cart};
		console.log(state.cartList);
		//存入localstorage
		if(state.cartList){
			console.log("avdf");
			setStore('buyCart',state.cartList);
		}else{
			console.log("12454");
		}
	},
	[INIT_CART](state){
		let initCart = getStore("buyCart");
		
		if(initCart){
			state.cartList = JSON.parse(initCart);
		}
	},
	[REMOVE_LOCAL_CART](state){
		removeStore("buyCart");
		state.cartList={};
	},
	[FOCUS_CART_ADDR](state,obj){
		state.cartAddr = {
			"address_id":obj.address_id,
			"true_name":obj.true_name,
			"mob_phone":obj.mob_phone,
			"area_info":obj.area_info,
			"address":obj.address,
		}
	},
	[FOCUS_CART_ADDR_TMP](state,obj){
		state.cartAddrTmp = {
			"address_id":obj.address_id,
			"true_name":obj.true_name,
			"mob_phone":obj.mob_phone,
			"area_info":obj.area_info,
			"address":obj.address,
		}
	},
	[IS_CART_ADDR](state,val){
		state.isCartAddr=val;
	},
	[PAY_SN](state,val){
		state.paySn=val;
	},
	[CART_CHECK_ALL](state,val){
		state.cartCheckAll=val;
	},
	[BACK_CART_ADDR](state,val){
		state.backCartAddr=val;
	},
	[BACK_CART](state,val){
		state.backCart=val;
	},
	[BACK_ORDER](state,val){
		state.backOrder=val;
	},
	[ORDER_STEP](state,obj){
		state.orderStep=obj;
	},
	[SAVE_CART](state,obj){
		state.cartAllList=obj;
	},
	[SAVE_ORDCFRM](state,obj){
		state.orderCfrmData=obj;
	},
	[ADD_ADDR](state,obj){
		state.addrInfo = obj;
	},
	[ORDER_TAB_INDEX](state,val){
		state.orderTabIndex = val;
	},
	[FLASH_SALE](state,flash){
		state.flashSales = flash
	},
  	[SET_SITES](state,country){
    	state.site = state.sites[country];
  	},
  [STORE_SEARCH_RECOMMAND](state,recommond){
    state.searchRecommands = recommond;
  },
  [STORE_LOGIN_INFO](state,login){
    state.loginInfo = login;
  },
}
