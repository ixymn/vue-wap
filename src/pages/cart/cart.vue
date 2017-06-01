<template>
	<div class="cart-box">
		<HEADBACK headTitle="Shopping Cart"></HEADBACK>
		<div class="cart-main">
			<template v-for="(item,index) in cartList">
				<section class="store-box">
					<div class="store-title">
						<em class="check-ico"></em>{{shopList[index].store_name}}
					</div>
					<GOODITEM v-for="(item1,goodsid) in item" :cartGoodInfo="item1"/>
					<div class="store-descr clearfix">

						<div>
							<img src="../../assets/images/store-desc-ico1.png">
							Shipped by Kilimall
						</div>
						<div>
							<img src="../../assets/images/store-desc-ico2.png">
							Shipped by Kilimall
						</div>
					</div>
					<div class="store-price">
						Postage:<span>11 Ksh</span>
					</div>
				</section>
			</template>
			
			<div class="cart-msg">
				<p>Item Total:<span>399,000 Ksh</span></p>
				<p>Postage:<span>399,000 Ksh</span></p>
				<p>2  Products, 5  items you selected. </p>
			</div>
		</div>

		<div class="check-foot clearfix">
			<div class="cart-total-price">Ksh 2,239</div>
			<div class="cart-btn" @click="popupOrder">Check Out</div>
		</div>
		<mt-popup style="width:100%;"v-model="popupVisible" position="bottom" popup-transition="popup-fade">
     		
    	</mt-popup>
	</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import Head from '../../components/common/headerBack.vue';
import cartGood from '../../components/cart/cartGood.vue'

export default {
	data:function(){
		return({
			popupVisible:false,
		});
	},
	components:{
		"HEADBACK":Head,
		"GOODITEM":cartGood,
	},
	computed:{
	  	...mapState(['cartList','shopList']),
	},
	methods:{
		popupOrder:function(){
			this.popupVisible=true;
		}
	}
}
  
</script>

<style lang="less">
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
.cart-main{
	margin-top: 1.33rem;
	
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
		font-size: 0.5rem;
		text-align: center;
		color: #F87622;
		width: 43%;
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
