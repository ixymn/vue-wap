<template>
	<div class="cart-box">
		<HEADBACK headTitle="Shopping Cart" @goBackEvent="goBack" :isDiyBack="1">
			<div slot="header-action">
				<div class="cart-edit-btn" @click="editCart">{{isEdit?'Finish':'Edit'}}</div>
			</div>
		</HEADBACK>
		<div class="cart-main">
			<div @click="linkAddr" v-if="cartAddr.true_name">
				<div class="cart-addr-title">
		    		<span>Shipping Information</span>
		    		<em class="em-ico"></em>
		    	</div>
		    	<div class="cart-addr-recive">
		    		<em class="em-ico"></em>
		    		{{trueName}}&nbsp;&nbsp;{{areaInfo}}
		    	</div>
	    	</div>
	    	<div v-else @click="linkAddr" style="background-color:#fdf3ec;height:0.83rem;line-height:0.83rem; color: #7f7c79;padding-left:0.56rem;font-size:0.33rem;
"><em class="em-ico address-not-found"></em>Postage decided by your shipping address. Fill now.</div>
			<template v-for="(item,store_id) in cartArr">
				<section class="store-box">
					<div class="store-title">
						<em class="check-ico" @click="checkMethod('1',store_id)" :class="{'checked-ico':item.check}"></em>
						{{item.store_name}}
					</div>
					<GOODITEM v-for="(good,index) in item.goods_list" :key='index' :storeId="store_id" :cartGoodInfo="good" :isEdit="isEdit" @checkMethodEvent="checkMethod" @plusPCSEvent="plusPCS" @minusPCSEvent="minusPCS" @delCartEvent="delCartFunc"/>
					<div class="store-descr clearfix">

						<div v-if="item.goods_logistics_type == 1">
							<img src="../../assets/images/ic_express_fbk.png">
							Shipped by Kilimall
						</div>
						<div v-else-if="item.goods_logistics_type == 0">
							<img src="../../assets/images/ic_express_ds.png">
							Shipped by local seller
						</div>
						<div v-else-if="item.goods_logistics_type == 2">
							<img src="../../assets/images/ic_express_gs.png">
							Shipped from overseas
						</div>
						<div v-show="item.pay_on_deliver">
							<img src="../../assets/images/goods-delivery.png">
							Pay on delivery
						</div>
					</div>
					<div class="store-price" v-show="key">
						Postage:<span>{{item.postage_money}} {{currencyUnit}}</span>
					</div>
				</section>
			</template>

		</div>

		<div class="check-foot clearfix">
			<div class="cart-total-price"><em class="check-ico" :class="{'checked-ico':cartCheckAll}" @click="checkMethod('0')"></em>{{currencyUnit}} {{totalAmout}}</div>
			<div class="cart-btn" @click="popupOrder">Check Out</div>
		</div>

		<transition name="slide" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {getUnLoginCart,addUnlogToCart,getlogCart,changeCartPCS,delCart} from '../../service/getData'

import Head from '../../components/common/headerBack.vue';
import cartGood from '../../components/cart/cartGood.vue'

export default {
	data:function(){
		return({
			totalAmout:0,
			cartArr:null,
			key:"",
			cartIdStr:"",
			isEdit:false,
		});
	},
	created:function(){
		this.key=common.getCookie('key');
		this.INIT_CART();
	},
	components:{
		"HEADBACK":Head,
		"GOODITEM":cartGood,
	},
	computed:{
	  	...mapState(['cartAddr','cartAddrTmp','cartList','cartAllList','backCart','isCartAddr','cartCheckAll']),
	  	trueName:function(){

				//检查是否有选择过地址，如果有选择过地址，显示上一次选择的地址，否则显示服务器返回的默认地址
				let address  = this.cartAddrTmp || this.cartAddr;
	  		return address?address.true_name:"";
	  	},
	  	areaInfo:function(){
				let address  = this.cartAddrTmp || this.cartAddr;
	  		return address?address.area_info:"";
	  	},
	  	currencyUnit:function(){
	        return this.$store.state.site.currency;
	    },
	},
	watch:{
		cartArr:{
			handler: function(newVal,oldVal){
				let totalAmoutTmp=0;
				for(var i in newVal){
					let hasPost=false;
					for(var j in newVal[i].goods_list){
						if(newVal[i].goods_list[j].check){
							hasPost=true;
							totalAmoutTmp+=parseFloat(newVal[i].goods_list[j].goods_promotion_price)*parseFloat(newVal[i].goods_list[j].num);
						}
					}
					if(hasPost && common.getCookie("key"))
						totalAmoutTmp+=parseFloat(newVal[i].postage_money);
				}

				this.SAVE_CART(newVal);
				this.totalAmout=totalAmoutTmp;
			},
      		deep: true,
		},
		cartList:{
			handler:function(val){
				if(common.getCookie("key")){
					this.cartArr=this.cartList;
				}
			},
			deep:true,
		}
	},
	mounted:function(){

		if(this.key){//已登录
			if(this.isCartAddr){
				this.refreshCart("");
				this.IS_CART_ADDR(false);
				this.FOCUS_CART_ADDR(this.cartAddrTmp);
			}else{
				this.initDataLog();
			}
		}else{//未登录
			this.initDataUnlog();
		}

	},
	methods:{
		...mapMutations(['INIT_CART',"DEL_CART_LOCAL",'REMOVE_LOCAL_CART','FOCUS_CART_ADDR','BACK_CART_ADDR',"IS_CART_ADDR",'SAVE_CART',"CART_CHECK_ALL","FOCUS_CART_ADDR",'BACK_CART','SAVE_ORDCFRM']),
		goBack:function(){
			if(this.backCart){
				let backUrl=this.backCart;
				this.BACK_CART("");
				this.$router.push(backUrl);
			}else{
				this.$router.push("/usercenter");
			}

		},
		getApiParam:function(arr){
			let goodsStr="";
			for(var i in arr){
				goodsStr+=i+"|"+arr[i].num+",";
			}
			if(!goodsStr) return;
			goodsStr = goodsStr.substr(0,goodsStr.length-1);
			return goodsStr;
		},
		editCart:function(){
			this.isEdit=!this.isEdit;
		},

		buildCartData:function(cartListTmp){
			let newCartArr={},allCheck=true;
			if(cartListTmp.length > 0){

				for(var i in cartListTmp){

					let newGoodItem={},newType="",storeCheck=true;
					for(var j in cartListTmp[i].goods_list){
						newType=cartListTmp[i].goods_list[j].goods_logistics_type;

						if(cartListTmp[i].goods_list[j].selected=="0"){

							storeCheck=false;
						}

						let checkTmp=true;
						if(cartListTmp[i].goods_list[j].selected!=undefined){

							checkTmp=cartListTmp[i].goods_list[j].selected==1?true:false;
						}

						newGoodItem[cartListTmp[i].goods_list[j].goods_id]={
							"goods_name":cartListTmp[i].goods_list[j].goods_name,
							"goods_id":cartListTmp[i].goods_list[j].goods_id,
							"cart_id":cartListTmp[i].goods_list[j].cart_id,
							"check":checkTmp,
							"num":cartListTmp[i].goods_list[j].goods_num?cartListTmp[i].goods_list[j].goods_num:cartListTmp[i].goods_list[j].num,
							"goods_promotion_price":cartListTmp[i].goods_list[j].goods_promotion_price,
							"goods_storage":cartListTmp[i].goods_list[j].goods_storage,
							"goods_image":cartListTmp[i].goods_list[j].goods_image,
							"goods_spec":cartListTmp[i].goods_list[j].goods_spec,
							"goods_state":cartListTmp[i].goods_list[j].goods_state,
						};
					}

					newCartArr[cartListTmp[i].store_id]={
						"store_name":cartListTmp[i].store_name,
						"check":storeCheck,
						"goods_list":newGoodItem,
						"pay_on_deliver":cartListTmp[i].pay_on_deliver,
						"goods_logistics_type":newType,
						"postage_money":cartListTmp[i].postage_money
					};
					if(!storeCheck){
						allCheck=false;
					}
				}
			}
			this.cartArr={...newCartArr};
			this.CART_CHECK_ALL(allCheck);
		},
		refreshCart:async function(cartIds){
			this.$indicator.open();
			let params={"key":this.key,"cart_id":cartIds};
			if(this.cartAddrTmp){
				  params.address_id = this.cartAddrTmp.address_id;
			}
			let resCart=await getlogCart(params);
			this.buildCartData(resCart.datas.store_cart_list);
			this.$indicator.close();
		},
		initDataLog:async function(){
			this.$indicator.open();
			if(JSON.stringify(this.cartList) != "{}"){
				let params=this.getApiParam(this.cartList);
				if(params != undefined){
					let res=await addUnlogToCart(params,this.key);
					this.REMOVE_LOCAL_CART();
				}

			}

			let resCart=await getlogCart({"key":this.key});

			if(resCart.code == "200"){
				this.totalAmount = resCart.datas.cart_goods_total;
				console.log(resCart.datas.address_info);

				if(resCart.datas.address_info){

					// 如果客户端有选择地址，则不显示服务器返回的默认地址
					if(!this.cartAddrTmp){
					  this.FOCUS_CART_ADDR(resCart.datas.address_info);
					}else{
					  this.FOCUS_CART_ADDR(this.cartAddrTmp);
					}
				}

				this.buildCartData(resCart.datas.store_cart_list);
			}
			this.$indicator.close();
		},
		initDataUnlog:async function(){
			if(this.cartList){
				let params=this.getApiParam(this.cartList);
				if(params){
					let res = await getUnLoginCart(params);
					this.totalAmout = parseFloat(res.datas.cart_goods_total);
					this.buildCartData(res.datas.store_cart_list);
				}else{
					this.totalAmout = 0;
					this.buildCartData({});
				}

			}
		},
		getApiParamCheck:function(arr){
			let goodsStr="";
			for(let m in arr){
				for(let i in arr[m].goods_list){
					if(arr[m].goods_list[i].check){
						goodsStr+=arr[m].goods_list[i].cart_id+"|"+arr[m].goods_list[i].num+",";
					}
				}
			}

			if(!goodsStr) return;
			goodsStr = goodsStr.substr(0,goodsStr.length-1);
			return goodsStr;
		},
		popupOrder:function(){
			if(this.key){
				if(this.totalAmout){
					this.SAVE_ORDCFRM({
						"cartIds":this.getApiParamCheck(this.cartAllList),
						"ifCart":1,
						"backUrl":"/cart",
						"addrId":this.cartAddr.address_id,
						"flashBuy":0
					});
					this.$router.push('/orderConfirm');
				}else{
					this.$toast({
					  message: "you didn't select any items",
					  position: 'bottom',
					  duration: 5000,
					});
				}
			}else{
				common.goLogin(this.$router);
			}

		},
		linkAddr:function(){
			this.IS_CART_ADDR(true);
			this.BACK_CART_ADDR("/cart");
			this.$router.push("/address");
		},
		checkMethod:function(type,storeid,goodid){

			if(common.getCookie("key")){
				//商店
				if(type == "1"){
					let cartIds='';
					for(let i in this.cartArr){
						if(i == storeid){
							if(!this.cartArr[i].check){
								for(let j in this.cartArr[i].goods_list){
									cartIds+= +this.cartArr[i].goods_list[j].cart_id+",";
								}
							}
						}else{
							for(let j in this.cartArr[i].goods_list){
								if(this.cartArr[i].goods_list[j].check){
									cartIds+= +this.cartArr[i].goods_list[j].cart_id+",";
								}
							}
						}
					}
					cartIds=cartIds.substr(0,cartIds.length-1);
					this.cartIdStr=cartIds;
					this.refreshCart(cartIds);
				//商品
				}else if(type == "2"){
					let cartIds='';
					for(let i in this.cartArr){
						for(let j in this.cartArr[i].goods_list){
							if(this.cartArr[storeid].goods_list[goodid].cart_id==this.cartArr[i].goods_list[j].cart_id){
								if(!this.cartArr[i].goods_list[j].check){
									cartIds+= +this.cartArr[i].goods_list[j].cart_id+",";
								}
							}else{
								if(this.cartArr[i].goods_list[j].check){
									cartIds+= +this.cartArr[i].goods_list[j].cart_id+",";
								}
							}
						}
					}
					cartIds=cartIds.substr(0,cartIds.length-1);
					this.cartIdStr=cartIds;
					this.refreshCart(cartIds);

				//全选
				}else if(type == "0"){

					if(this.cartCheckAll){
						this.refreshCart("");
					}else{
						let cartIds='';
						for(let i in this.cartArr){
							for(let j in this.cartArr[i].goods_list){
								cartIds+= +this.cartArr[i].goods_list[j].cart_id+",";
							}
						}
						cartIds=cartIds.substr(0,cartIds.length-1);
						this.cartIdStr=cartIds;
						this.refreshCart(cartIds);
					}

				}
			}else{
				if(type == "1"){
					this.cartArr[storeid].check=!this.cartArr[storeid].check;

					for(let j in this.cartArr[storeid].goods_list){
						this.cartArr[storeid].goods_list[j].check=this.cartArr[storeid].check;
					}

					let isStoreAll=true;
					for(let i in this.cartArr){
						if(this.cartArr[storeid].check != this.cartArr[i].check){
							isStoreAll=false;
						}
					}
					if(isStoreAll){
						this.CART_CHECK_ALL(this.cartArr[storeid].check);
					}

					if(this.cartArr[storeid].check == false){
						this.CART_CHECK_ALL(false);
					}

				}else if(type == "2"){

					this.cartArr[storeid].goods_list[goodid].check=!this.cartArr[storeid].goods_list[goodid].check;

					if(this.cartArr[storeid].goods_list[goodid].check){
						let isStoreAll=true;
						for(let i in this.cartArr[storeid].goods_list){
							if(this.cartArr[storeid].goods_list[i].check==false){
								isStoreAll=false;
							}
						}
						if(isStoreAll){
							this.cartArr[storeid].check=true;
						}
						let isAll=true;
						for(let j in this.cartArr){
							if(this.cartArr[j].check == false){
								isAll=false;
							}
						}
						if(isAll){
							this.CART_CHECK_ALL(true);
						}
					}else{
						this.cartArr[storeid].check=false;
						this.CART_CHECK_ALL(false);
					}

				}else if(type == "0"){
					this.CART_CHECK_ALL(!this.cartCheckAll);
					for(let i in this.cartArr){
						this.cartArr[i].check=this.cartCheckAll;
						for(let j in this.cartArr[i].goods_list){
							this.cartArr[i].goods_list[j].check=this.cartCheckAll;
						}
					}

				}
			}

		},

		plusPCS:function(tmpData){
			if(common.getCookie("key")){
				let cartid=tmpData[0],num=parseInt(tmpData[1])+1,goodid=tmpData[2],storeid=tmpData[3];

				//if(this.cartArr[storeid].goods_list[goodid].goods_storage>=num){
					this.changePCSApi(cartid,num,true,storeid,goodid);
				//}
			}else{

				let num=parseInt(tmpData[1])+1,goodid=tmpData[2],storeid=tmpData[3];
				if(this.cartArr[storeid].goods_list[goodid].goods_storage>=num){
					this.cartArr[storeid].goods_list[goodid].num=num;
				}

			}
		},
		minusPCS:function(tmpData){
			if(common.getCookie("key")){
				if(tmpData[1] > 1){
					let cartid=tmpData[0],num=parseInt(tmpData[1])-1,goodid=tmpData[2],storeid=tmpData[3];
					this.changePCSApi(cartid,num,true,storeid,goodid);
				}
			}else{
				if(tmpData[1] > 1){
					let num=parseInt(tmpData[1])-1,goodid=tmpData[2],storeid=tmpData[3];
					this.cartArr[storeid].goods_list[goodid].num=num;
				}
			}
        },
        delCartFunc:async function(tmpData){
        	if(common.getCookie("key")){
        		let cartId=tmpData[0];
	        	await delCart({
	        		"key":common.getCookie("key"),
	        		"cart_id":cartId,
	        	});
				this.refreshCart(this.cartIdStr);
        	}else{
        		let goodid=tmpData[1],storeid=tmpData[2];
        		this.DEL_CART_LOCAL(goodid);

        		this.initDataUnlog();
        	}
        },
        changePCSApi:async function(cartid,num,bkind,storeid,goodid){
        	this.$indicator.open();
    		let params={
    			"key":common.getCookie("key"),
    			"cart_id":cartid,
				"quantity":num,
    		};
    		let res=await changeCartPCS(params);
    		this.$indicator.close();
    		if(res.code == "200"){
    			console.log(this.cartArr[storeid].goods_list[goodid]);
    			console.log("111")
    			this.cartArr[storeid].goods_list[goodid].num=num;
    			//this.refreshCart();
    		}else if(res.code == "444"){
    			this.$toast(res.datas.error);
    		}else{
    			this.$toast("error");
    		}
        }
	}
}

</script>

<style lang="less" scoped>
.cart-edit-btn{
	position: absolute;
	font-size: 0.44rem;
    top: 50%;
    right: 1.25rem;
    color: white;
	-webkit-transform: translate(0,-50%);
	transform: translate(0,-50%);
}
.check-ico{
	display: inline-block;
	width: 0.56rem;
	height: 0.56rem;
	border: 1px solid #DDDFE4;
	box-sizing: border-box;
	border-radius: 50%;
	vertical-align: middle;
	margin-right: 0.39rem;
}
.checked-ico{
	border:none;
	background-image: url(../../assets/images/checked-ico.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
.cart-main{
	margin-top: 1.33rem;
	margin-bottom: 1.58rem;
	.address-not-found{
		width: 0.56rem;
		height: 0.56rem;
		background-image: url(../../assets/images/goods/ic_tips.png);
		margin-top: 0.14rem;
		float: left;
		margin-right: 0.28rem;
	}
	.cart-addr-title{
		font-size: 0.33rem;
 		color: #7E7E7E;
 		height: 1.11rem;
 		line-height: 1.11rem;
 		padding: 0 0.56rem;
 		background-color: white;
 		em{
 			float: right;
 			width: 0.61rem;
 			height: 0.61rem;
 			background-image: url(../../assets/images/help-arrow-right.png);
 			margin-top: 0.25rem;
 		}
	}
	.cart-addr-recive{
		padding-left: 1.12rem;
		font-size: 0.39rem;
		margin:0.28rem 0;
		margin-right: 0.56rem;
		height: 0.56rem;
		line-height: 0.56rem;
		overflow: hidden;
		position: relative;
		em{
			position: absolute;
			left: 0.56rem;
			width:0.44rem;
			height: 0.56rem;
			background-image: url(../../assets/images/ordcfr-person.png);
			background-size: 90%;
			vertical-align: middle;
			margin-right: 0.1rem;
		}

	}
	.store-box{
		background-color: white;
		margin-bottom: 10px;
		.store-title{
			height: 1.28rem;
			border-bottom:1px solid #DDDFE4;
			font-weight: bold;
			font-size: 0.39rem;
			color: #150000;
			line-height: 1.28rem;
			padding:0 0.44rem;
		}

		.store-descr{
			padding: 0.22rem 0.44rem;
			border-bottom:1px solid #DDDFE4;
			div{
				width: 50%;
				float: left;
				line-height: 0.67rem;
				font-size: 0.33rem;
				color: #9B9B9B;
				img{
					width: 0.67rem;
					height: 0.67rem;
					float: left;
					margin-right: 0.19rem;
				}
			}
		}
		.store-price{
			padding:0.28rem 0.56rem;
			text-align: right;
			border-bottom:1px solid #DDDFE4;
			color: #7E7E7E;
			font-size: 0.33rem;
			span{
				font-size: 0.39rem;
				color: #E4C28A;
				padding:0 0.22rem;
			}
		}
	}
	.cart-msg{
		padding: 0.28rem 0.44rem;
		background: #ECEFF5;
		border-top:1px solid #DDDFE4;
		margin-bottom: 1.61rem;
		p{
			padding:0.17rem 0;
			font-size: 0.39rem;
			color: #7E7E7E;
			line-height: 0.44rem;
			span{
				color: #150000;
				margin-left: 0.17rem;
			}
		}
	}
}
.check-foot{
	height: 1.11rem;
	padding: 0.25rem 0.28rem;
	background-color: white;
	box-shadow: 0 -0.06rem 0.22rem 0 rgba(0,0,0,0.11);
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	line-height: 1.11rem;
	.cart-total-price{
		float: left;
		font-size: 0.45rem;
		text-align: left;
		color: #F87622;
		width: 43%;
		padding-left: 0.16rem;
		box-sizing: border-box;
	}
	.cart-btn{
		float: right;
		width: 57%;
		background: #E86D1E;
		border-radius: 1px;
		text-align: center;
		font-size: 0.44rem;
		color: #FFFFFF;
		letter-spacing: 0.02rem;
		font-weight: bold;
		height: 1.11rem;

	}
}

</style>
