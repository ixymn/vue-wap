<template>
	<div class="goods-item">
		<em class="check-ico"></em>
		<div class="goods-con">
			<div class="goods-img"></div>
			<div class="goods-info">
				<p class="goods-name">{{goodsName}}</p>
				<p class="cart-goods-price"><span>KSh</span><span>4,499</span></p>
				<div class="clearfix">
					<div class="goods-spex">BLue,M</div>
					<div class="goods-pcs">
						<em class="goods-minus"></em>
						<span>1</span>
						<em class="goods-plus"></em>
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
	props:["cartGoodInfo"],
	computed:{
		goodsName:function(){
			let str=this.cartGoodInfo.goods_name;
			if(str.length>25){
				return str.substr(0,25)+"...";
			}
			return str;
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
	}
	.goods-con{
		background-color:#F9FAFC;
		padding-right:0.56rem;
		margin-left: 0.95rem;
		position: relative;
		.goods-img{
			width: 2.53rem;
			height: 2.19rem;
			background-image: url(http://cn.vuejs.org/images/logo.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center center;
			margin-right: 0.28rem;
			position: absolute;
			top: 0;
			left: 0;
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
