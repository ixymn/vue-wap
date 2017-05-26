import {
	STORE_HOME_INFO,
	ADD_TO_CART,
	ADD_CART,
	FLASH_SALE,
	MUTATION_TEST
} from './mutation-types.js'

import {
	setStore,
	getStore,
} from '../utils/mUtils'

export default {

	[STORE_HOME_INFO](state, home_page_info) {
		state.home_page = home_page_info;
	},
	[ADD_TO_CART](state, Goods) {
		state.cartGoods += 1;
	},
	[ADD_CART](state,{storeId,goodsId,goodsName,pcs,storeInfo}){
		let cart = state.cartList;
		let store = cart[storeId] = (cart[storeId] || {}); 
		
		if(store[goodsId]){
			store[goodsId]['num']+=pcs;
		}else{
			store[goodsId] = {
				"num":pcs,
				"goods_id":goodsId,
				"goods_name":goodsName,
			};
		}
		store={...store,...storeInfo};
		
		state.cartList = {...cart};
		//存入localstorage
		setStore('buyCart',state.cartList);
	},
	[FLASH_SALE](state,flash){
		state.flashSales = flash
	},
	[MUTATION_TEST](state,test){
		state.pjltest = test
	}

}
