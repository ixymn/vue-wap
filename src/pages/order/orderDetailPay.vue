<template>
	<div class="ordDtl-box">
		<HEADBACK headTitle="Order Details"></HEADBACK>
		<div class="ordDtl-main" :style="'margin-bottom:'+(showPayBtn?'3.06':'1.39')+'rem;'">
			<div class="ordDtl-title">
				<p>Personal Details</p>
				<div class="ordDtl-reciver">
					<RECEIVER v-if="cartAddr"/> 
				</div>
			</div>
			<div class="ordDtl-msg">
				<div class="ordDtl-msg-top">
					<dl>
						<dt>Order No.</dt>
						<dd>{{orderInfo.order_sn}}</dd>
					</dl>
					<dl>
						<dt>Order Time</dt>
						<dd>{{orderInfo.add_time}}</dd>
					</dl>
					<dl>
						<dt>Order Total</dt>
						<dd style="color: #E4C187;font-size:0.39rem;">{{orderInfo.order_amount}} {{currencyUnit}}</dd>
					</dl>
				</div>
				<div class="ordDtl-msg-bot">
					<dl>
						<dt>Postage</dt>
						<dd>{{orderInfo.postage_amount}} {{currencyUnit}}</dd>
					</dl>
					<dl>
						<dt>Item Total</dt>
						<dd>{{orderInfo.goods_amount}} {{currencyUnit}}</dd>
					</dl>
					<dl>
						<dt>Paid</dt>
						<dd>{{orderInfo.receive_amount}} {{currencyUnit}}</dd>
					</dl>
					<dl>
						<dt>Pay Amount</dt>
						<dd style="color: #E4C187;font-weight:bold;">{{orderInfo.pay_amount}} {{currencyUnit}}</dd>
					</dl>
				</div>
			</div>
			<div class="ordDtl-txt">
				<p v-for="info in orderInfo.order_tips">
					{{info}}
				</p>
			</div>
			<div class="ordDtl-goods">
				<div class="ordDtl-goods-item" v-for="goodItem in orderGoods">
					<router-link :to="'/goods/'+goodItem.goods_id">
					<div class="ordDtl-goods-box">
						<div class="ordDtl-goods-img" :style="'background-image:url('+goodItem.goods_image+')'"></div>
						<div class="ordDtl-goods-info">
							<p class="ordDtl-goods-name">{{goodItem.goods_name.length>25?goodItem.goods_name.substr(0,25)+'...':goodItem.goods_name}}</p>
							<p class="ordDtl-goods-price">{{goodItem.goods_price}} {{currencyUnit}}</p>
						</div>
					</div>
					</router-link>
				</div>
			</div>
		</div>
		<div class="ordDtl-foot">
			<div class="ordDtl-foot-msg">
				<div class="ordDtl-foot-cancel-btn" v-show="showPayBtn" @click="cancelOrder(paySn)">Cancel</div>
				<p>Pay Amount: <span>{{orderInfo.pay_amount}}  {{currencyUnit}}</span></p>
			</div>
			<div v-show="showPayBtn" class="ordDtl-foot-btn" @click="payOnline(paySn)">
				Pay Now
			</div>
		</div>
	</div>
</template>

<script>

import {mapState,mapMutations} from "vuex"
import {getOrderDetailPay,cancelOrder} from '../../service/getData';
import Head from '../../components/common/headerBack.vue';
import Receiver from '../../components/common/receiver.vue';

export default {
	data:function(){
		return({
			tabIndex:1,
			paySn:'',
			orderInfo:{},
			orderGoods:null,
			showPayBtn:true,
		});
	},
	components:{
		"HEADBACK":Head,
		"RECEIVER":Receiver,
	},
	computed:{
		...mapState(['cartAddr']),
		currencyUnit:function(){
			return this.$store.state.site.currency;
		}
	},
	mounted:function(){
		if(!common.getCookie("key")){
			common.goLogin(this.$router);
			return;
		}
		this.initData();
	},
	methods:{
		...mapMutations(['FOCUS_CART_ADDR','PAY_SN']),
		initData:async function(){
			this.$indicator.open();
			let params={
				"key":common.getCookie("key"),
				"pay_sn":this.$route.params.paysn,
			};
			let res = await getOrderDetailPay(params);
			this.$indicator.close();
			if(res.code == "200"){
				this.FOCUS_CART_ADDR(res.datas.receiver_info);
				this.orderInfo={
					"order_sn":res.datas.order_group_list.order_sn,
					"add_time":res.datas.order_group_list.add_time,
					"order_amount":res.datas.order_group_list.order_amount,
					"postage_amount":res.datas.order_group_list.postage_amount,
					"goods_amount":res.datas.order_group_list.goods_amount,
					"receive_amount":res.datas.order_group_list.receive_amount,
					"pay_amount":res.datas.order_group_list.pay_amount,
					"order_tips":res.datas.order_group_list.order_tips,
				};
				this.orderGoods=res.datas.order_group_list.goods_list;
				this.paySn=res.datas.order_group_list.pay_sn;
			}else if(res.code == "444"){
				this.$toast(res.datas.error);
			}else{
				this.$toast("error");
			}

		},
		payOnline:function(paySn){
			if(paySn&&common.getCookie("key")){
				this.PAY_SN(paySn);
				this.$router.push("/iframePay/order");
			}
		},
		cancelOrder:function(paySn){
			if(paySn&&common.getCookie("key")){
				this.$messagebox({
					"title":"",
					"message":"Are you sure to cancel the order?",
					"showConfirmButton":true,
					"showCancelButton":true,
					"confirmButtonText":"Yes",
					"cancelButtonText":"No",
				}).then(action =>{
					if(action=="confirm"){
						this.cancelOrderApi(paySn);
					};
				});
			}
		},
		cancelOrderApi:async function(paySn){
			let param={
				"pay_sn":paySn,
				"key":common.getCookie("key"),
			};
			let res= await cancelOrder(param);
			if(res.code == "200"){
				this.showPayBtn=false;
				this.$toast("operation success");
			}else if(res.code == "444"){
				this.$toast(res.datas.error);
			}else{
				this.$toast("error");
			}
		},
	},
	
}
  
</script>

<style lang="less">
.ordDtl-main{
	margin-top: 1.33rem;
	.ordDtl-title{
		margin-bottom: 0.28rem;
		background-color: white;
		p{
			font-size: 0.39rem;
			padding: 0.44rem 0.42rem;
			color: #150000;
			border-bottom: 1px solid #DDDFE4;
		}
		
	}
	.ordDtl-msg{
		border-bottom: 1px solid #DDDFE4;
		background-color: white;
		padding: 0.28rem 0.42rem;
		margin-bottom: 0.42rem;
		.ordDtl-msg-top{
			dl{
				font-size: 0.33rem;
				display: table-row;
				dt{
					width: 2.9rem;
					display: table-cell;
					color: #150000;
					padding: 0.19rem 0.28rem 0.19rem 0;
				}
				dd{
					display: table-cell;
					color: #AFB1B7;
					padding: 0.19rem 0.28rem 0.19rem 0;
				}
			}
		}
		.ordDtl-msg-bot{
			display: inline-block;
			border-top:1px solid #DDDFE4;
			dl{
				font-size: 0.33rem;
				display: table-row;
				dt{
					text-align: right;
					width: 2.9rem;
					display: table-cell;
					color:  #AFB1B7;
					padding: 0.19rem 0.28rem 0.19rem 0;
				}
				dd{
					display: table-cell;
					color: #150000;
					padding: 0.19rem 0.28rem 0.19rem 0;
					font-size: 0.39rem;
				}
			}
		}
	}
	.ordDtl-txt{
		padding: 0 0.42rem;
		font-size: 0.33rem;
		color: #AFB1B7;
		word-wrap: break-word;
		margin-bottom: 0.42rem;
	}
	.ordDtl-goods{
		background-color: white;
		.ordDtl-goods-item{
			padding:0.42rem;
			border-bottom: 1px solid #DDDFE4;
			.ordDtl-goods-box{
				background: #F9FAFC;
				position: relative;
				.ordDtl-goods-img{
					width: 2.78rem;
					height: 2.42rem;
					position: absolute;
					top: 0;
					left: 0;
					background-size: contain;
					background-position: center center;
					background-repeat: no-repeat;
				}
				.ordDtl-goods-info{
					min-height: 2.42rem;
					margin-left: 3.06rem;
					.ordDtl-goods-name{
						font-size: 0.39rem;
						color: #150000;
						padding:0.28rem 0 0.1rem 0;
					}
					.ordDtl-goods-price{
						color: #E4C187;
						font-size: 0.39rem;
						padding: 0.1rem 0;
					}
					.ordDtl-goods-spec{
						font-size: 0.33rem;
						color: #7E7E7E;
						padding: 0.1rem 0;
					}
					p{
						word-wrap: break-word;
					}
				}
			}
		}
	}
}
.ordDtl-foot{
	box-shadow: 0 -0.06rem 0.22rem 0 rgba(0, 0, 0, 0.11);
	background-color: white;
	position: fixed;
	bottom:0;
	right: 0;
	left: 0;
	.ordDtl-foot-msg{
		padding: 0.42rem;
		font-size: 0.39rem;
		position: relative;
		border-bottom: 1px solid #DDDFE4;
		.ordDtl-foot-cancel-btn{
			color: #4b7ad4;
			text-decoration: underline;
			position: absolute;
			top:0.42rem;
			left: 0.42rem;
		}
		p{
			padding-left: 1.6rem;
			text-align: center;
			span{
				font-size: 0.44rem;
				color:#e4c187;
				font-weight: bold;
			}
		}
	}
	.ordDtl-foot-btn{
		
		height: 1.11rem;
		background-color: #E86D1E;
		color:white;
		text-align: center;
		line-height: 1.11rem;
		margin: 0.28rem 0.42rem;
		font-size: 0.44rem;
	}
}
</style>
