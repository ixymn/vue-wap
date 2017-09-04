<template>
    <div class="order-confirm-mask">
    	<div class="ordcfr-box">
	        <div class="ordcfr-head">
	            Order Confirm<em @click="closePopup"></em>
	        </div>
	        <div class="ordcfr-main">
	        	<img src="../../assets/images/ordcfr-line.png">
	        	<div style="clear:both;"></div>
	        	<div class="ordcfr-title"  @click="linkAddr">
	        		<span>{{cartAddr.address_id?'Shipping Information':'You have not added shipping address'}}</span>
	        		<em class="em-ico"></em>
	        	</div>
	        	<div class="ordcfr-recive" @click="linkAddr" v-show="cartAddr.address_id">
	        		<RECEIVER/>
	        	</div>

	        	<div class="payment">
	        		<div class="payment-part">
	        			<em class="em-ico" :class="{'checked':orderStep.pay_kind==1}" @click="payCheck(1)"></em>
	        			<div class="payment-box">
	        				<p class="ordcfr-part-title">Online Payment</p>
	        				<p class="payment-delivery-msg" v-show="orderStep.postage_payment_message">{{orderStep.postage_payment_message}}</p>
	        			</div>
	        		</div>
	        		<div class="payment-part">
	        			<em class="em-ico" :class="{'checked':orderStep.pay_kind==2}" @click="payCheck(2)" v-if="orderStep.cod_info.status>0"></em>
	        			<em class="em-ico" v-else></em>
	        			<div class="payment-box">
	        				<p class="ordcfr-part-title" :class="{'unValible':(orderStep.cod_info.status<=0)}">Pay on delivery</p>
	        				<p class="payment-delivery-msg" v-show="(orderStep.cod_info.status<=0)">{{orderStep.cod_info.status_tips}}</p>
	        				<div v-show="orderStep.cod_info.status==0">
	        					<div class="ordcfr-input-box">
		        					<input class="ordcfr-input" placeholder="Input phone no. e.g.0712654618" v-model="phone" type="text" >
		        					<div class="ordcfr-btn ordcfr-btn-grey" @click="send">Send</div>
		        				</div>
		        				<div class="ordcfr-input-box">
		        					<input style="width:3.61rem;" class="ordcfr-input" placeholder="Verification code" v-model="code" type="text">
		        					<div class="ordcfr-btn ordcfr-btn-orange" @click="verify">Verify</div>
		        				</div>
	        				</div>
	        			</div>
	        		</div>
	        		<!-- <div class="payment-part" v-show="orderStep.cash_rewards_info.status == 1">
	        			<p class="cashrwd-title">Cash Rewards discount</p>
	        			<p class="cashrwd-title cashrwd-color">Cash Rewards Available <span> {{currencyUnit}} {{orderStep.member_balance}}</span></p>
	        			<div>
	        				<em class="em-ico" :class="{'checked':orderStep.is_check_cash}" @click="checkCash" v-if="orderStep.cash_rewards_info.use_status == 1"></em>
	        				<em class="em-ico" v-else></em>
	        				<div class="payment-box">
	        					<p class="cashrwd-title" style="margin-bottom:0.28rem;">
	        						{{orderStep.cash_rewards_info.use_status_tips}}<b v-show="orderStep.cash_rewards_info.use_status != 1" @click="showCashTip" class="em-ico cashrwd-ques-ico"></b>
	        					</p>
	        					<p v-show="isShowCashTip" class="cashrwd-title" style="background-color:rgba(253, 221, 200,0.5);display:inline-block;
	        					padding:0.06rem;color:#696d77;font-size:0.33rem;">{{orderStep.cash_rewards_info.not_use_status_tips}}</p>
	        				</div>
	        			</div>
	        		</div> -->
	        	</div>
	        	<div class="ordcfr-foot">
	        		<div class="ordcfr-foot-btn" @click="payFunc">Pay Now</div>
	        		<input id="fbInfo" type="hidden" :value="facebookInfo">
	        		<div class="ordcfr-foot-left">
	        			<p class="ordcfr-foot-postage" v-show="(orderStep.pay_kind==1)&&orderStep.postage_payment_money">Postage:  -<span>{{currencyUnit}} {{orderStep.postage_payment_money}}</span></p>
	        			<p class="ordcfr-foot-total" :style="(orderStep.postage_payment_money==0)||(orderStep.pay_kind!=1)?'margin-top: 0.2rem;':''">Total <span>{{currencyUnit}} {{(orderStep.pay_kind==1)?(orderStep.order_amount-orderStep.postage_payment_money):orderStep.order_amount}}</span></p>
	        		</div>

	        	</div>
	        </div>
	    </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import {orderStepOne,orderStepTwo,sendCodePhone,verifyCodePhone,payOnline} from '../../service/getData'
import Receiver from '../../components/common/receiver.vue';
export default {
	data:function(){
		return ({
			phone:'',
			code:'',
			isShowCashTip:false,
			goodsList_collect:[],
		});
	},
	computed:{
		...mapState(['orderCfrmData',"cartAddr","cartAddrTmp","isCartAddr","orderStep",'cartAllList']),

		currencyUnit:function(){
	        return this.$store.state.site.currency;
	    },
	    facebookInfo(){
	    	let a = (this.orderStep.pay_kind==1)?(this.orderStep.order_amount-this.orderStep.postage_payment_money):this.orderStep.order_amount;
	    	let obj = {
		        content_ids:this.goodsList_collect,
		        content_type: 'product',
		        value:a,
		        currency: this.$store.state.site.currency
	    	}
	    	return JSON.stringify(obj)
	    }
	},
	components:{
		"RECEIVER":Receiver,
	},
	mounted:function(){

		this.facebookCollect();

		if(!common.getCookie("key")){
			common.goLogin(this.$router);
			return;
		}
		if(this.orderCfrmData){
			this.getOdrFirm();
		}

	},
	methods:{
		...mapMutations(['ORDER_STEP','IS_CART_ADDR','BACK_CART_ADDR','FOCUS_CART_ADDR','PAY_SN']),
		payCheck:function(index){
			this.orderStep.pay_kind=index;
			this.ORDER_STEP(this.orderStep);
		},
		checkCash:function(){
			this.orderStep.is_check_cash=!this.orderStep.is_check_cash;
			if(this.orderStep.is_check_cash){
				this.orderStep.order_amount=this.orderStep.order_amount-this.orderStep.cash_rewards_info.max;
			}else{
				this.orderStep.order_amount=this.orderStep.order_amount+this.orderStep.cash_rewards_info.max;
			}

			this.ORDER_STEP(this.orderStep);
		},
		facebookCollect(){
			for(let i in this.cartAllList){
	    		for(let j in this.cartAllList[i].goods_list){
	    			if(this.cartAllList[i].goods_list[j].check){
	    				this.goodsList_collect.push(
		    				{
		    					goodsId:this.cartAllList[i].goods_list[j].goods_id,
		    					buyNum:this.cartAllList[i].goods_list[j].num
		    				}
	    				)
	    			}
	    		}
	    	}
		},
		showCashTip:function(){
			this.isShowCashTip=true;
			let _this=this;
			setTimeout(function(){
				_this.isShowCashTip=false;
			},3000);
		},
		linkAddr:function(){
			this.IS_CART_ADDR(true);
			this.BACK_CART_ADDR("/orderConfirm");
			this.$router.push("/address");
		},
		closePopup:function(){
			this.$router.push(this.orderCfrmData.backUrl);
		},
		send:async function(){
			if(!this.phone){
				this.$toast({
					message:'please input phone',
					position:'bottom',
				});
				return false;
			}
			let res = await sendCodePhone({
				"key":common.getCookie("key"),
				"phone":this.phone,
			});
			if(res.code=="200"){
				this.$toast({
					message:"send success",
					position:'bottom',
				});
			}else{
				this.$toast({
					message:res.datas.error,
					position:'bottom',
				});
			}

		},
		verify:async function(){
			if(!this.phone){
				this.$toast({
					message:'please input phone',
					position:'bottom',
				});
				return false;
			}
			if(!this.code){
				this.$toast({
					message:'please input code',
					position:'bottom',
				});
				return false;
			}
			let param={
				"key":common.getCookie("key"),
				"code":this.code,
				"phone":this.phone,
			};
			let res = await verifyCodePhone(param);
			if(res.code=="200"){
        if(this.orderStep.cod_info){
          this.orderStep.cod_info.status=1;
        }
				this.ORDER_STEP(this.orderStep);
				this.$toast({
					message:"verify success",
					position:'bottom',
				});
			}else{
				this.$toast({
					message:res.datas.error,
					position:'bottom',
				});
			}

		},
		getApiParam:function(arr){
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
		getOdrFirm:async function(){
			this.$indicator.open();
			let param={
				"key":common.getCookie('key'),
				"cart_id":this.orderCfrmData.cartIds,
				"ifcart":this.orderCfrmData.ifCart,
				"address_id":this.orderCfrmData.addrId,
				"flash_buy":this.orderCfrmData.flashBuy,
			};

			let res=await orderStepOne(param);
			this.$indicator.close();
			if(res){
				//res={"code":"444","datas":{"error":"123456"}}
				if(res.code == "200"){
					let dataTmp={
						"pay_kind":1,
						"is_check_cash":false,
            //cod开关
						"cod_info":res.datas.cod_status?res.datas.cod_info:{},
						"cash_rewards_info":res.datas.cash_rewards_info,
						"order_amount":res.datas.order_amount,
						"member_balance":res.datas.member_balance,
						"vat_hash":res.datas.vat_hash,
						"postage_payment_message":res.datas.postage_payment_message,
						"postage_payment_money":res.datas.postage_payment_money,
					};
					if(this.isCartAddr){
						this.IS_CART_ADDR(false);
						this.FOCUS_CART_ADDR(this.cartAddrTmp);
					}
					this.ORDER_STEP(dataTmp);

					this.buildGA(res.datas);
				}else{
					this.$toast(res.datas.error);
					if(this.isCartAddr){
						this.IS_CART_ADDR(false);
					}else{
						this.$router.go(-1);
					}
				}

			}else{
				this.$toast("refresh");
				this.$indicator.close();
			}
		},
		buildGA:function(data){
			// 支持 Google Analytics
			var gaObject={nameArray: [],
						  priceArray: [],
						  quantArr: [],
						  idArray: [],
						  sn_Array: [],
						  storeArray: [],
						  categoryArray: [],
						  specArray: [],
						  brandArray: [],
						  shippingfeeArray: {},
						  store_name: {},
						  orderCount: '',};
	        for (let key in data.address_api.content) {
	          let freight = data.address_api.content[key];
	          gaObject.shippingfeeArray[key.split("_")[0]] = freight;
	        }
	        for (let t in data.store_cart_list) {
	          let productList = data.store_cart_list[t].goods_list;
	          for (let ti = 0; ti < productList.length; ti++) {
	            gaObject.idArray.push(productList[ti].goods_id);
	            gaObject.nameArray.push(productList[ti].goods_name);
	            gaObject.priceArray.push(productList[ti].goods_price);
	            gaObject.quantArr.push(productList[ti].goods_num);
	            gaObject.storeArray.push(productList[ti].store_name);
	            gaObject.categoryArray.push(productList[ti].category_name);
	            gaObject.specArray.push(productList[ti].goods_spec);
	            gaObject.brandArray.push(productList[ti].brand_name);
	            gaObject.store_name[productList[ti].store_id] = productList[ti].store_name;
	          }
	        }

	        common.setCookie("GA",JSON.stringify(gaObject));
		},
		payFunc:async function(){
			this.$indicator.open();
			let params={
				"key":common.getCookie("key"),
				"ifcart":this.orderCfrmData.ifCart,
				"cart_id":this.orderCfrmData.cartIds,
				"address_id":this.cartAddr.address_id,
				"vat_hash":this.orderStep.vat_hash,
				"pay_name":this.orderStep.pay_kind==1?"online":"offline",
				"cash_rewards":this.orderStep.is_check_cash?this.orderStep.cash_rewards_info.max:0,
        		"kilimall_af_id": Ad.afId,
        		"flash_buy":this.orderCfrmData.flashBuy,
			};

			let res = await orderStepTwo(params);
			this.$indicator.close();
			if(res.code=="200"){
				var sn_list = res.datas.order_sn;
				let tmpGA=JSON.parse(common.getCookie("GA"));
				tmpGA.orderCount=res.datas.member_order_count;
        var ad = "";
        Ad.totalCost = 0;
        Ad.shoogloo_o = null;
				for (var ii = 0; ii < sn_list.length; ii++) {
		          tmpGA.sn_Array.push(sn_list[ii].order_sn + "|" + sn_list[ii].order_amount + "|" + tmpGA.store_name[sn_list[ii].store_id] + "|" + tmpGA.shippingfeeArray[sn_list[ii].store_id]);
              // start end utm 统计信息
              if (Ad.afId) {

                sn = sn_list[ii].order_sn;
                if (Ad.utmSource == 'clickwise') {
                  Ad.totalCost = Number(sn_list[ii].goods_pay_price);
                  Ad.ActionCode = sn_list[ii].action_code;
                  Ad.Campaignid = sn_list[ii].campaignid;
                  Ad.ApiKey = sn_list[ii].apikey;
                  Ad.orderId = sn + String(sn_list[ii].goods_id);
                  Ad.AdTypeHtml();
                  ad = Ad.adHtml;
                } else {
                  Ad.totalCost = Number(Ad.totalCost) + Number(sn_list[ii].order_amount);
                  Ad.orderId = sn.substring(0, sn.length - 2);
                }

              }
              if (Ad.utmSource == 'KMPAP') {
                PostAffTracker.setAccountId('default1');
                sale = PostAffTracker.createAction(sn_list[ii].kmpap_code);
                sale.setTotalCost(Number(sn_list[ii].goods_pay_price));
                sale.setOrderID(sn);
                sale.setProductID(Number(sn_list[ii].goods_id));
                PostAffTracker.register();
              }

              // end utm 统计信息
		        }
            //发送广告联盟统计代码
        if (Ad.afId && Ad.utmSource != 'clickwise') {
          Ad.AdTypeHtml();
          ad = Ad.adHtml;
        }
        var adNode = document.createElement("div");
        adNode.setAttribute("id", "adnode");
        document.body.appendChild(adNode);
        document.getElementById("adnode").innerHTML = ad;
        Ad.AdRefDump();
        //广告联盟统计代码end

				common.setCookie("GA",JSON.stringify(tmpGA));

				this.runGA();
				if(this.orderStep.pay_kind==1){
					this.PAY_SN(res.datas.pay_sn);
					this.$router.replace("/iframePay/order");
				}else{
					this.$toast({
						message:"order success",
						duration:3000,
					});
					this.$router.push("/order");
				}

			}else if(res.code == "444"){
				this.$toast({
					message:res.datas.error,
					duration:3000,
				});
			}
		},
		runGA:function(){

			// Analytics Code Start
	        var s = document.createElement('script');
	        s.type = 'text/javascript';
	        s.async = false;
	        s.src = './GA.js';
	        var x = document.getElementsByTagName('script')[0];
	        x.parentNode.insertBefore(s, x);

	        // Analytics Code End
		}
	}

}
</script>
<style lang="less">
.order-confirm-mask{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 2;
	.ordcfr-box{
		position: fixed;
	    bottom: 0;
	}
}

.ordcfr-head{
	padding: 0.39rem 0;
	text-align: center;
	font-size: 0.44rem;
	color: #FFFFFF;
	line-height: 0.56rem;
	em{
		display: inline-block;
		background-image: url(../../assets/images/ordcfr-close.png);
		width: 0.56rem;
		height: 0.56rem;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		vertical-align: middle;
		margin-left: 0.67rem;
	}
 }
 .ordcfr-main{
 	background-color: white;
 	margin-bottom: 1.94rem;
 	img{
 		height: 0.14rem;
 		float: left
 	}
 	.ordcfr-title{
 		font-size: 0.33rem;
 		color: #7E7E7E;
 		height: 1.11rem;
 		line-height: 1.11rem;
 		padding: 0 0.56rem;
 		em{
 			float: right;
 			width: 0.61rem;
 			height: 0.61rem;
 			background-image: url(../../assets/images/help-arrow-right.png);
 			margin-top: 0.25rem;
 		}
 	}
 	.ordcfr-recive{
 		background-color:#F3F5F9;
 	}
 	.ordcfr-foot{
 		padding: 0.42rem 0.28rem;
 		box-shadow: 0 -0.06rem 0.22rem 0 rgba(0,0,0,0.11);
 		position: fixed;
 		bottom: 0;
 		right: 0;
 		left: 0;
 		background: white;
 		.ordcfr-foot-btn{
 			width: 4rem;
 			height: 1.11rem;
 			background: #F87622;
			border-radius: 0.03rem;
			text-align: center;
			color: white;
			font-weight: bold;
			font-size: 0.44rem;
			float: right;
			line-height: 1.11rem;
 		}
 		.ordcfr-foot-left{
 			float: right;
 			font-size: 0.33rem;
 			color: #C4C8D2;
 			margin-right: 0.28rem;

 			.ordcfr-foot-total{
 				text-align: right;
 				span{
	 				font-size: 0.5rem;
					color: #F87622;
					margin-left: 0.1rem;
	 			}
 			}
 			.ordcfr-foot-postage{
 				text-align: right;
 				span{
	 			}
 			}
 		}
 	}
 	.payment{
		.payment-part{
			padding: 0.42rem 0.56rem;
			position: relative;
			em{
				width: 0.56rem;
				height: 0.56rem;
				background-color: #F3F5F9;
				border: 1px solid #DDDFE4;
				border-radius: 50%;
				box-sizing: border-box;
				position: absolute;
			}
			em.checked{
				background-image:url(../../assets/images/checked-ico.png);
			}
			.cashrwd-title{
				font-size: 0.39rem;
			    color: #C4C8D2;
			    margin-bottom: 0.42rem;
			    word-break: break-word;
			    b.cashrwd-ques-ico{
			    	width: 0.44rem;
			    	height:0.44rem;
			    	margin-left: 0.28rem;
					background-image: url('../../assets/images/goods-express-link.png');
				}
			}
			.cashrwd-color{
				color: #88888a;
				padding-left: 0.56rem;
				span{
					color: black;
				}
			}
			.payment-box{
				margin-left: 0.83rem;
				.ordcfr-part-title{
					font-size: 0.39rem;
					color: #150000;
					margin-bottom: 0.19rem;

				}
				.unValible{
					color:#C4C8D2;
				}
				.payment-delivery-msg{
					font-size: 0.33rem;
					color: #C4C8D2;
				}
				.ordcfr-input-box{
					margin-top: 0.42rem;
					.ordcfr-input{
						border: none;
						height: 0.94rem;
						line-height: 0.94rem;
						background: #F3F5F9;
						border:1px solid #9FA5B1;
						border-radius: 0.03rem;
						padding: 0 0.36rem;
						color: #150000;
						box-sizing: border-box;
					}
					.ordcfr-btn{
						display: inline-block;
						padding: 0 0.56rem;
						height: 0.94rem;
						text-align: center;
						font-size: 0.39rem;
						color: #FFFFFF;
						line-height: 0.94rem;
						border-radius: 0.03rem;
					}
					.ordcfr-btn-grey{
						background-color: #D0D3D9;
					}
					.ordcfr-btn-orange{
						background-color:  #EBD0A8;
					}
				}
			}
		}
 	}

 }

</style>
