<template>
	<div class="goods-item">
		<em class="check-ico" :class="{'checked-ico':cartGoodInfo.check}" @click="checkGoodMethod(storeId,cartGoodInfo.goods_id)"></em>
		<div class="goods-con">
			<div class="goods-img" :style="goodsImg" :class="{'good-with-out':parseInt(cartGoodInfo.goods_state) != 1,'good-sale-out':cartGoodInfo.goods_storage==0}" @click="linkGood(cartGoodInfo.goods_id)"></div>
			<div class="goods-info">
				<p class="goods-name">{{goodsName}}</p>
				<p class="cart-goods-price"><span>{{currencyUnit}}</span><span style="margin-left:0.22rem;">{{cartGoodInfo.goods_promotion_price}}</span></p>
				<div class="clearfix">
					<div class="goods-remove" v-if="isEdit" @click="delCartFunc(cartGoodInfo.cart_id,cartGoodInfo.goods_id,storeId)">REMOVE</div>
					<div class="goods-spex" v-else>{{specValue}}</div>
					
					<div class="goods-pcs">
						<em class="goods-minus" @click="minusPCS(cartGoodInfo.cart_id,cartGoodInfo.num,cartGoodInfo.goods_id,storeId)"></em>
						<span>{{cartGoodInfo.num}}</span>
						<em class="goods-plus" @click="plusPCS(cartGoodInfo.cart_id,cartGoodInfo.num,cartGoodInfo.goods_id,storeId)"></em>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data:function(){
		return ({

		});
	},
	props:["cartGoodInfo","storeId","isEdit"],
	computed:{
		goodsName:function(){
			let str=this.cartGoodInfo.goods_name;
			if(str.length>25){
				return str.substr(0,25)+"...";
			}
			return str;
		},
		currencyUnit:function(){
          return this.$store.state.site.currency;
        },
		specValue:function(){
			let strSpec=this.cartGoodInfo.goods_spec;
			if(strSpec.length>20){
				return strSpec.substr(0,16)+"...";
			}
			return strSpec;
		},
		goodsImg:function(){
			if(this.cartGoodInfo.goods_storage){
				return "background-image:url("+this.cartGoodInfo.goods_image+");";
			}
			
		},
	},
	methods:{
		linkGood:function(goodsId){
			this.$router.push("/goods/"+goodsId);
		},
		delCartFunc:function(cartId,goodsId,storeId){
			this.$emit("delCartEvent",[cartId,goodsId,storeId]);
		},
		plusPCS:function(cartId,num,goodsId,storeId){
          this.$emit("plusPCSEvent",[cartId,num,goodsId,storeId]);
        },
        minusPCS:function(cartId,num,goodsId,storeId){
          this.$emit("minusPCSEvent",[cartId,num,goodsId,storeId]);
        },
        checkGoodMethod:function(storeId,goodsId){
        	this.$emit('checkMethodEvent',['2'],[storeId],[goodsId]);
        },
	},
}
</script>
<style lang="less">
.goods-item{
	padding: 0.42rem 0 0.42rem 0.44rem;
	border-bottom:1px solid #DDDFE4;
	position: relative;
	.check-ico{
		position: absolute;
		top: 50%;
		margin-top: -0.28rem;
		left: 0.44rem;
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
	.goods-con{
		background-color:#F9FAFC;
		padding-right:0.56rem;
		margin-left: 0.95rem;
		position: relative;
		.goods-img{
			width: 2.53rem;
			height: 2.19rem;
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center center;
			margin-right: 0.28rem;
			position: absolute;
			top: 0;
			left: 0;
		}
		.good-sale-out{
			background-image:url(../../assets/images/goods/ic_soldout.png);
		}
		.good-with-out{
			background-image:url(../../assets/images/goods/ic_withdraw.png);
		}
		.goods-info{
			padding-left:2.81rem;
			min-height: 2.19rem;
			.goods-name{
				font-size: 0.39rem;
				color: #150000;
				height: 0.83rem;
				line-height: 0.83rem;
				overflow: hidden;
			}
			.cart-goods-price{
				font-size: 0.39rem;
				color: #E4C187;
				line-height: 0.39rem;
			}
			div{
				.goods-spex{
					float: left;
					word-break: break-word;
					margin:0.28rem 0;
					font-size: 0.33rem;
					color: #7E7E7E;
					line-height: 0.39rem;
				}
				.goods-remove{
					float: left;
					word-break: break-word;
					margin:0.28rem 0;
					font-size: 0.39rem;
					color: #F87622;
					line-height: 0.39rem;
				}
				.goods-pcs{
					float: right;
					margin-bottom: 0.33rem;
					.goods-minus{
						float: left;
						width: 0.67rem;
						height: 0.67rem;
						display: inline-block;
						background-image: url(../../assets/images/pcs-minus.png);
						background-size: 100% 100%;
					}
					span{
						display: inline-block;
						float: left;
						line-height: 0.67rem;
						padding:0 0.22rem;
						font-size: 0.39rem;
						color: #150000;
					}
					.goods-plus{
						float: left;
						width: 0.67rem;
						height: 0.67rem;
						display: inline-block;
						background-image: url(../../assets/images/pcs-plus.png);
						background-size: 100% 100%;
					}
				}
			}
		}
	}
}

</style>
