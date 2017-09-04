<template>
	<div class="ordDtl-box" v-show="orderGoods">
		<HEADBACK headTitle="Order Details"></HEADBACK>
		<div class="ordDtl-main" >
			<div class="ordDtl-time">
				{{orderInfo.add_time}}
			</div>
			<div class="ordDtl-title">
				<p>Shipping information</p>
				<div class="ordDtl-reciver">
					<RECEIVER/> 
				</div>
			</div>
			<div class="ordDtl-item1" >
				<dl class="ordDtl-item1-store">
					{{orderInfo.store_name}}
				</dl>
				<dl class="ordDtl-item1-msg" v-for="goodItem in orderGoods">
					<router-link :to="'/goods/'+goodItem.goods_id">
					<dt class="clearfix" >
						<em class="em-ico ordDtl-item1-image" :style="'background-image:url('+goodItem.goods_image_url+')'"></em>
						<p>
							<span class="ordDtl-item1-name">{{goodItem.goods_name.length>50?goodItem.goods_name.substr(0,48)+'...':goodItem.goods_name}}</span>
							<span class="ordDtl-item1-amount"><b>{{currencyUnit}} {{goodItem.goods_price}}</b>&nbsp;&nbsp;X {{goodItem.goods_num}}</span>
						</p>
					</dt>
					</router-link>
				</dl>
				
				<dl class="ordDtl-item1-git-box">
					<dd>
						<p v-for="gitItem in orderGit">
							<em class="em-ico ordDtl-item1-git-ico"></em>
							<span class="ordDtl-item1-git">{{gitItem.goods_name.length>40?(gitItem.goods_name.substr(0,38)+'...'):gitItem.goods_name}}</span>
				 		</p>
				 		
					</dd>
				</dl>
			</div>
			<div class="ordDtl-msg">
				<dl class="clearfix">
					<dt>Order Time:</dt>
					<dd>{{orderInfo.add_time}}</dd>
				</dl>
				<dl class="clearfix">
					<dt>Payment Time:</dt>
					<dd>{{orderInfo.payment_time}}</dd>
				</dl>
				<dl class="clearfix">
					<dt>Payment Method:</dt>
					<dd>{{orderInfo.payment_name}}</dd>
				</dl>
				<dl class="clearfix">
					<dt>Postage Voucher:</dt>
					<dd>{{orderInfo.credits_postage_amount}}</dd>
				</dl>
				<div class="ordDtl-msg-amount">Pay Amount: <span> {{currencyUnit}} {{orderInfo.pay_amount}}</span></div>
			</div>

		</div>
		
	</div>
</template>

<script>

import {mapMutations} from "vuex"
import {getOrderDetail} from '../../service/getData';
import Head from '../../components/common/headerBack.vue';
import Receiver from '../../components/common/receiver.vue';

export default {
	data:function(){
		return({
			tabIndex:1,
			orderInfo:{
					"add_time":'',
					"payment_time":'',
					"payment_name":'',
					"credits_postage_amount":'',
					"pay_amount":'',
					"store_name":'',
				},
			orderGoods:null,
			orderGit:null,
		});
	},
	components:{
		"HEADBACK":Head,
		"RECEIVER":Receiver,
	},
	computed:{
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
				"order_id":this.$route.params.orderid,
			};
			let res = await getOrderDetail(params);
			this.$indicator.close();
			if(res.code == "200"){
				this.FOCUS_CART_ADDR(res.datas.order_info.extend_order_common.reciver_info);
				this.orderGoods=res.datas.order_info.extend_order_goods;
				this.orderGit=res.datas.order_info.zengpin_list;
				this.orderInfo={
					"add_time":res.datas.order_info.add_time,
					"payment_time":res.datas.order_info.payment_time,
					"payment_name":res.datas.order_info.payment_name,
					"credits_postage_amount":res.datas.order_info.credits_postage_amount?('-'+this.currencyUnit+' '+res.datas.order_info.credits_postage_amount):(this.currencyUnit+' 0'),
					"pay_amount":res.datas.order_info.pay_amount,
					"store_name":res.datas.order_info.store_name,
				}
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
	margin-bottom: 0.28rem;
	.ordDtl-time{
		padding: 0.3rem 0.42rem;
		font-size: 0.39rem;
		background-color: white;
		margin-bottom: 0.28rem;
	}
	.ordDtl-title{
		margin-bottom: 0.28rem;
		background-color: white;
		p{
			font-size: 0.39rem;
			padding: 0.2rem 0.42rem;
			color: #150000;
			border-bottom: 1px solid #DDDFE4;
		}
		
	}
	.ordDtl-item1{
		margin: 0.28rem 0;
		background-color: white;
		dl{
			font-size: 0.33rem;
			border-bottom: 1px solid #DDDFE4; 
			padding: 0.33rem;
		}
		.ordDtl-item1-store{
			font-size: 0.39rem;
			color: #999;
		}
		.ordDtl-item1-msg{
			dt{
				position: relative;
				em.ordDtl-item1-image{
					width: 2.5rem;
	    			height: 2.22rem;
	    			position: absolute;
	    			top: 0;
	    			left: 0;
	    			background-size: contain;
					background-position: center center;
					background-repeat: no-repeat;
				}
				p{
					padding-left: 2.78rem;
					width: 100%;
					min-height: 2.22rem;
					box-sizing: border-box;
					span{
						display:block;
					}
					.ordDtl-item1-name{
						font-size: 0.35rem;
						color: black;
						margin-bottom: 0.28rem;
					}
					.ordDtl-item1-amount{
						text-align: right;
						b{
							font-size: 0.44rem;
						}
					}
				}
			}
			
			
		}
		.ordDtl-item1-git-box{
			padding: 0.17rem 0.33rem;
			dd{
				p{
					padding: 0.17rem 0;
					em{
						width: 0.67rem;
						height: 0.67rem;
						background-image: url(../../assets/images/order/git.png);
						float: left;
					}
					span{
						display: inline-block;
						line-height: 0.67rem;
						height:0.67rem;
						margin-left: 0.14rem;
						color: #aaaaaa;
					}
				}
			}
		}
		
	}
	.ordDtl-msg{
		background-color: white;
		padding: 0.28rem 0.33rem 0 0.33rem;
		dl{
			line-height: 0.5rem;
			width: 100%;
			display: inline-block;
			dt{
				float: left;
				font-size: 0.33rem;
			}
			dd{
				float: right;
			}
		}
		div.ordDtl-msg-amount{
			padding: 0.28rem 0;
			font-size: 0.39rem;
			border-top: 1px solid #DDDFE4;
			span{
				color: #F87622;
			}
		}
	}
	
}

</style>
