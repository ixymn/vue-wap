<template>
	<div class="order-box">
		<HEADBACK headTitle="Order" @goBackEvent="goBack" :isDiyBack="1"></HEADBACK>
		<ul class="order-nav clearfix">
	        <li :class="{focus:(orderTabIndex==1)}" style="width:33%;padding:0.44rem 0;line-height:0.44rem;" @click="linkTab(1)">Pending Payment<b v-show="parseInt(stateType.state_new_count)">{{parseInt(stateType.state_new_count)>99?'..':stateType.state_new_count}}</b></li>
	       	<li :class="{focus:(orderTabIndex==2)}" style="width:33%;" @click="linkTab(2)">In Transit<b v-show="parseInt(stateType.state_order_pay_count)">{{parseInt(stateType.state_order_pay_count)>99?'..':stateType.state_order_pay_count}}</b></li>
	       
	       	<li :class="{focus:(orderTabIndex==4)}" style="width:33%;" @click="linkTab(4)">Completed<b v-show="parseInt(stateType.state_complete)">{{parseInt(stateType.state_complete)>99?'..':stateType.state_complete}}</b></li>
	     </ul>
		<div class="order-main">
		     <mt-loadmore :top-method="loadTop" :topDistance="100" @top-status-change="handleTopChange" ref="loadmore">
		     	<div slot="top" class="mint-loadmore-top">
		     		<div class="mint-loadmore-pull-box clearfix">
		     			<em v-show="topStatus !== 'loading'" class="em-pull-load-ico" :class="{ 'loadmore-ico-rotate': topStatus === 'drop' }"></em>
		     			<mt-spinner class="em-loading-ico" type="snake" v-show="topStatus == 'loading'" :size="28"></mt-spinner>
		     			<dl class="em-pull-load-msg">
		     				<dd>{{topStatus !== 'loading'?'Release to refresh':'loadding...'}}</dd>
		     				<dd>Update:{{updateLoadDate}}</dd>
		     			</dl>
		     		</div>
			    </div>
				<div v-infinite-scroll="scrollMore" infinite-scroll-disabled="loadScroll" infinite-scroll-distance="10">
					<div v-show="orderTabIndex ==1" class="order-item"  v-for="item in orderArr">
						<div class="order-pic-box" @click="viewDetailPay(item.pay_sn)">
							<ul class="clearfix">

								<li v-for="item1 in item.goods_image_url"><em class="em-ico order-pic" :style="'background-image:url('+item1+')'"></em></li>
							</ul>
							<p>{{item.goods_image_url.length}} items</p>
						</div>
						<div class="order-msg" @click="viewDetailPay(item.pay_sn)">
							<dl>
								<dt>Order SN</dt>
								<dd>{{item.order_sn}}</dd>
							</dl>
							<dl>
								<dt>Order Time</dt>
								<dd>{{item.add_date}}</dd>
							</dl>
						</div>
						<div class="order-pay clearfix">
							<div class="order-pay-btn" @click="payOnline(item.pay_sn)">
								Pay Now
							</div>
							<div class="order-pay-msg">
								<dl>
									<dt>Paid</dt>
									<dd style="color:#E4C187;font-weight:bold;">{{item.receive_amount}} {{currencyUnit}}</dd>
								</dl>
								<dl>
									<dt>Due</dt>
									<dd>{{item.pay_amount}} {{currencyUnit}}</dd>
								</dl>
							</div>
						</div>
					</div>
					<div v-show="orderTabIndex !=1" class="order-item1"  v-for="item1 in orderArr1">
						<dl class="order-item1-time clearfix">
							<dt>Order Time: {{item1.add_date}}</dt>
							<dd>{{(item1.order_list[0].order_state =="30")?'In Transit':(item1.order_list[0].order_state =="20")?'Pending Dispatch':(item1.order_list[0].order_state =="40")?'Completed':''}}</dd>
						</dl>
						<dl class="order-item1-no">
							<dt>Order No.: {{item1.order_list[0].order_sn}}  {{item1.order_list[0].store_name}}</dt>
						</dl>
						<dl class="order-item1-msg" v-for="goodItem in item1.order_list[0].extend_order_goods" @click="viewDetail(item1.order_list[0].order_id)">
							<dt class="clearfix" >
								<em class="em-ico order-item1-image" :style="'background-image:url('+goodItem.goods_image_url+')'"></em>
								<p>
									<span class="order-item1-name">{{goodItem.goods_name}}</span>
									<span class="order-item1-amount"><b>{{currencyUnit}} {{goodItem.goods_price}}</b>&nbsp;&nbsp;X {{goodItem.goods_num}}</span>
								</p>
							</dt>
						</dl>
						
						<dl class="order-item1-git-box" v-show="item1.order_list[0].zengpin_list.length">
							<dd>
								<p v-for="gitItem in item1.order_list[0].zengpin_list">
									<em class="em-ico order-item1-git-ico"></em>
									<span class="order-item1-git">{{gitItem.goods_name}}</span>
						 		</p>
							</dd>
						</dl>
						
						<div class="order-item1-bot">
							<p><span class="order-item1-bot-name">Shipping Free</span><span class="order-item1-bot-value">{{item1.order_list[0].shipping_fee!=0?item1.order_list[0].shipping_fee:"Free"}}</span></p>
							<p><span class="order-item1-bot-name">Total Amount</span><span class="order-item1-bot-value" style="color:#F87622">{{currencyUnit}} {{item1.order_list[0].order_amount}}</span></p>
							<div v-show="orderTabIndex != 3" class="order-item1-bot-btn" @click="viewDetail(item1.order_list[0].order_id)">View</div>
							<div v-show="orderTabIndex == 3" class="order-item1-bot-btn" @click="">Feedback</div>
						</div>
					</div>
					<SCROLLLOAD v-show="loadScroll&&hasMore"/>
				</div>


			</mt-loadmore>
		</div>
	</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {getOrder} from '../../service/getData';
import Head from '../../components/common/headerBack.vue';
import ScrollLoad from '../../components/common/scrollLoadIco.vue';

export default {
	data:function(){
		return({
			tabParam:["state_new","state_order_pay","not_evaluated","state_complete"],
			topStatus:'',
			updateLoadDate:'',
			curPage:1,
			hasMore:true,
			loadScroll:false,
			stateType:{},
			orderArr:[],
			orderArr1:[],
		});
	},
	mounted:function(){
		if(!common.getCookie("key")){
			common.goLogin(this.$router);
			return;
		}
		
		this.scrollMore();
	},
	computed:{
		...mapState(['orderTabIndex','backOrder']),
		currencyUnit:function(){
			return this.$store.state.site.currency;
		}
	},
	components:{
		"HEADBACK":Head,
		"SCROLLLOAD":ScrollLoad,
	},
	methods:{
		...mapMutations(['PAY_SN','ORDER_TAB_INDEX']),
		goBack:function(){
			this.ORDER_TAB_INDEX(1);
			if(this.backOrder){
				this.$router.push(this.backOrder);
			}else{
				this.$router.push('/usercenter');
			}
			
		},
		
		scrollMore:async function(){
			this.loadScroll=true;
			if(this.hasMore){
				let params={
					"key":common.getCookie("key"),
					"state_type":this.tabParam[this.orderTabIndex-1],
				};
				let res=await getOrder(params,this.curPage);
				if(res.code == "200"){
					if(res.datas.order_group_list.length){
						this.stateType=res.datas.state_order_count;
						if(this.orderTabIndex == 1){
							let newArr=this.orderArr.concat(res.datas.order_group_list);
							this.orderArr=newArr;
						}else{
							let newArr1=this.orderArr1.concat(res.datas.order_group_list);
							this.orderArr1=newArr1;
						}
						
						this.curPage=this.curPage+1;
						this.hasMore=res.hasmore;
						this.loadScroll=false;
					}else{
						this.hasMore=false;
					}
					
				}else if(res.code == "444"){
					this.$toast(res.datas.error);
				}else{
					this.$toast("get data is failed");
				}
			}
		},
		linkTab:function(index){
			this.ORDER_TAB_INDEX(index);
			this.curPage=1;
			this.hasMore=true;
			this.loadScroll=false;
			this.orderArr=[];
			this.orderArr1=[];
			this.scrollMore();
		},
		loadTop:async function(){
			let params={
				"key":common.getCookie("key"),
				"state_type":this.tabParam[this.orderTabIndex-1],
			};
			let res=await getOrder(params,1);
			if(res.code == "200"){
				this.stateType=res.datas.state_order_count;
				if(this.orderTabIndex == 1){
					this.orderArr=res.datas.order_group_list;
				}else{
					this.orderArr1=res.datas.order_group_list;
				}	
			}
			this.$refs.loadmore.onTopLoaded();
		},
		handleTopChange:function(status){
			this.updateLoadDate=new Date().toLocaleString();
			this.topStatus = status;
		},
		payOnline:function(paySn){
			this.PAY_SN(paySn);
			this.$router.push("/iframePay/order");
		},
		viewDetailPay:function(paysn){
			this.$router.push("/orderDetailPay/"+paysn);
		},
		viewDetail:function(orderid){
			this.$router.push("/orderDetail/"+orderid);
		},

	},
	
}
  
</script>

<style lang="less">
.mint-loadmore-pull-box{
	display: inline-block;
}
.mint-loadmore-top{
    height: 1rem;
    line-height: 1rem;
    margin-top: -1rem;
}
.em-pull-load-ico{
  display: inline-block;
  background-size: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  width: 0.69rem;
  height: 1.06rem;
  background-image: url(../../assets/images/xlistview_arrow.png);
  float: left;
}
.em-loading-ico{
	display: inline-block;
	float: left;
}
.em-pull-load-msg{
	float: left;
	font-size: 0.33rem;
	line-height: 0.44rem;
	height: 1.06rem;
	margin-left: 0.28rem;
}
.em-pull-load-msg>dd:nth-child(1){
	font-size: 0.39rem;
	margin-bottom: 0.14rem;
}
.loadmore-ico-rotate{
	display:inline-block;
	transform:rotate(180deg);
	-ms-transform:rotate(180deg); /* Internet Explorer */
	-moz-transform:rotate(180deg); /* Firefox */
	-webkit-transform:rotate(180deg); /* Safari 和 Chrome */
	-o-transform:rotate(180deg); /* Opera */
}
ul.order-nav{
	    z-index: 2;
		position: fixed;
		top: 1.33rem;
		right: 0;
		left: 0;
		padding: 0 0.42rem;
		border-bottom: 1px solid #DDDFE4;
		background-color: white;
		li{
			display: inline-block;
			text-align: center;
			font-size: 0.39rem;
			height: 1.78rem;
			line-height: 1.78rem;
			color: #7E7E7E;
			float: left;
			border-bottom: 2px solid transparent;
			box-sizing: border-box;
			position: relative;
			b{
				position: absolute;
				right: -0.14rem;
				top: 0.2rem;
				font-size: 0.28rem;
				font-weight: normal;
				width: 0.5rem;
				height: 0.5rem;
				background-color: #F87622;
				border-radius: 50%;
				color: white;
				line-height: 0.5rem;
				text-align: center;
			}
			b:after{
				display:inline-block;
		        width:0;
		        height:100%;
		        vertical-align:middle;
		        content:"";
			}
		}
		li.focus{
			color: #150000;
			border-bottom-color: #F87622; 
		}
	}
.order-main{
	    margin-top: 3rem;
	
	.order-item1{
		margin: 0.28rem 0;
		background-color: white;
		dl{
			font-size: 0.33rem;
			border-bottom: 1px solid #DDDFE4; 
			padding: 0.33rem;
		}
		.order-item1-time{
			color: #7E7E7E;
			dt{
				width: 70%;
				float: left;
			}
			dd{
				float: right;
			}
		}
		.order-item1-no{
			color: #7E7E7E;
		}
		.order-item1-msg{
			dt{
				position: relative;
				em.order-item1-image{
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
					.order-item1-name{
						font-size: 0.35rem;
						color: black;
						margin-bottom: 0.28rem;
					}
					.order-item1-amount{
						text-align: right;
						b{
							font-size: 0.44rem;
						}
					}
				}
			}
			
			
		}
		.order-item1-git-box{
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
		.order-item1-bot{
			padding:0.33rem;
			p{
				margin-bottom: 0.28rem;
				display: inline-block;
				width: 100%;
				span{
					width: 50%;
					display: inline-block;
					font-size: 0.39rem;
					text-align: right;
					color:#7E7E7E;
				}
			}
			.order-item1-bot-btn{
				margin-top: 0.28rem;
				width: 100%;
				height: 1.11rem;
				background: #F87622;
				color: white;
				font-size: 0.5rem;
				text-align: center;
				line-height: 1.11rem;

			}
		}
	}
	.order-item{
		margin: 0.28rem 0;
		background-color: white;
		.order-pic-box{
			border-bottom: 1px solid #DDDFE4;
			padding:0.42rem 0.28rem 0 0.28rem;
			li{
				display: inline-block;
				float: left;
				.order-pic{
					width: 2.5rem;
					height: 2.22rem;
					margin: 0 0.14rem;
					background-size: contain;
					background-position: center center;
					background-repeat: no-repeat;
				}
				.order-more{
					width: 0.61rem;
					height: 0.61rem;
					background-image: url(../../assets/images/order-pic-more.png);
					margin:0.81rem 0 0.81rem 0.28rem;
				}
			}
			p{
				color: #C4C8D2;
				font-size: 0.33rem;
				padding: 0.22rem 0 0.28rem 0.14rem;
			}
			
		}
		.order-msg{
			background-color: #F9FAFC;
			font-size: 0.33rem;
			padding: 0.28rem 0.42rem;
			dl{
				line-height: 0.39rem;
				display: table-row;
    			word-break: break-word;
				dt{
					display: table-cell;
					padding:0.22rem 0 ;
					color: #150000;
					text-align: left;
					width: 2.94rem;
				}
				dd{
					display: table-cell;
					padding:0.22rem 0 ;
					color: #AFB1B7;
					text-align: left;
					
				}
			}
		}
		.order-pay{
			padding: 0.42rem;
			border-bottom: 1px solid #DDDFE4;
			.order-pay-msg{
				float: right;
				text-align: right;
				dl{

					dt{
						color: #AFB1B7;
						display: table-cell;
						padding-right: 0.28rem;
						font-size: 0.33rem;
						padding-bottom: 0.05rem;
					}
					dd{
						display: table-cell;
						color: #150000;
						font-size: 0.39rem;
						padding-bottom: 0.05rem;
					}
				}
			}
			.order-pay-btn{
				float: right;
				background: #F87622;
				border-radius: 0.03rem;
				width: 3.22rem;
				height: 1.11rem;
				line-height: 1.11rem;
				text-align: center;
				font-size: 0.39rem;
				font-weight: bold;
				color: white;
				margin-left: 0.42rem;
			}
		}
	}
}

</style>
