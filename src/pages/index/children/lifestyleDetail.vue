<script>
export default {
	name: 'AAAAAA',
	data:function(){
		return{
			OtherLists:[0,1]
		}
	}

}
</script>
<template>
<div>

	<div class="ShareWrapper">
		<div class="ShareBody">
			<div class="infoHead">
				<div class="infoLeft">
					<p class="articleT">A nice weekend</p>
					<p>
						<div class="ShareTime">5 mins ago</div>
						<div class="SharerName">Garons</div>
					</p>
				</div>
				<div class="infoRight">+Follow</div>
			</div>
			<div class="infoBody">
				<div class="articleBody">
					<p class="articleB">Betty and I and other members of the family spend a nice weekend together at Fanling Lodge. </p>
					<img class="infoBodyImg" src="../../../assets/images/lifeStyle/1.png" alt="">
					<p class="articleB">Betty and I and other members of the family spend a nice weekend together at Fanling Lodge. </p>
				</div>
				<div class="goodsBuyNow">
					<div class="goodsPicWrapper">
						<img src="../../../assets/images/lifeStyle/2.png" alt="">
					</div>
					<p class="goodsTitle">Mikita sunglasses Farfetch</p>
					<p class="goodsPrice">
						<span>Ksh</span>
						<span>4,490</span>
					</p>
					<div class="clickBuyNow">Buy Now</div>
				</div>
			</div>
		</div>
		<ul class="infFooter clearfix">
			<li class="Igolook"><i></i>233</li>
			<li class="Icollect"><i></i>233</li>
			<li class="Ishare"><i></i>Share</li>
		</ul>
	</div>
	<div class="relatedShare">RELATED SHARE</div>
	<ul class="OtherLists">
		<li v-for="other in OtherLists">
			<img src="../../../assets/images/lifeStyle/1.png" alt="">
			<p class="articleT2">A nice weekend</p>
			<p class="articleB2">Betty and I and other members of the family spend a nice weekend together at Fanling Lodge. </p>
		</li>
	</ul>
</div>
</template>

<style lang="less" scoped>
.OtherLists{
	background:#FFF;
	li{
		padding:0.278rem;
		border-bottom: 1px solid #f3f4f6;
		.articleT2{
			font-size: 16px;
			font-weight: bold;
			color:#000;
			margin:2px 0 3px 0;
		}
		.articleB2{
			color:#999999;
		}
	}
}
.relatedShare{
	height:1.111rem;
	line-height: 1.111rem;
	font-size: 16px;
	font-weight: bold;
	color:#150000;
	padding:0 0.278rem; 
}
.ShareWrapper{
	background: #fff;
}
.articleBody{
	padding-bottom: 0.278rem;
}
.goodsTitle{
	margin:0.278rem 0 0 2.778rem;
	font-size: 14px;
	color:#7E7E7E;
}
.goodsPrice{
	font-size: 14px;
	color:#7E7E7E;
	margin:0.1rem 0 0 2.778rem;

}
.goodsBuyNow{
	height:80px;
	padding-top: 1px;
	position:relative;
	background:#f9fafc;
}
.clickBuyNow{
	border: 1px solid #E4C187;
	color:#E4C187;
	position: absolute;
	top:1.111rem;
	right:0.282rem;
	width:2.033rem;
	line-height: 0.611rem;
	height:0.611rem;
	text-align: center;
}
.goodsPicWrapper{
	width:90px;
	height:80px;
	position:absolute;
	left:0;
	top:0;
	img{
		height:100%;
	}
}
.infoLeft{
	padding-top: 1px;
}
.ShareList{
	li{
		background:#fff;
	}
}
.infoHead{
	padding-left: 0.42rem;
	height:80px;
	position:relative;
	border-bottom:1px solid #f3f4f6;
}
.infoRight{
	width:2.097rem;
	height:0.722rem;
	line-height: 0.722rem;
	text-align: center;
	color:#E4C187;
	border:1px solid #E4C187;
	right:20px;
	top:17px;
	position:absolute;
	font-size: 13px;

}
.SharerName{
	color:#000;
	font-size: 14px;
	float:left;
	margin-left: 9px;
}
.ShareTime{
	font-size: 14px;
	float:left;
	color:#999999;
}
.articleT{
	margin: 14px 0 8px;
	font-size: 19px;
	font-weight: bold;
	color:#000;
}
.articleB{
	color:#150000;
	font-size: 14px;
}
.infFooter{
	li{
		height:1.0rem;
		line-height: 1.0rem;
		width:33.3%;
		float:left;
		text-align: center;
		color:#999999;
		i{
			display:inline-block;
			width:14px;
			height:14px;
		}
	}
	.Igolook i{
		background:url(../../../assets/images/lifestyle/golook.png) no-repeat 0 4px;
		background-size: contain;
	}
	.Icollect i{
		background:url(../../../assets/images/lifestyle/weizan.png) no-repeat 0 4px;
		background-size: contain;
	}
	.Ishare i{
		background:url(../../../assets/images/lifestyle/share.png) no-repeat;
		position:relative;
		top:1px;
		margin-right: 4px;
		background-size: contain;
	}
}
.infoBody{
	padding:0 0.278rem;
	background: #fff;
}
.infoBodyImg{
	width:100%;
}
.swipeChange{
	position: relative;
	overflow: auto;
	height: 5rem;
}
.content{
	z-index: 999;
	width: 300vw;
	position: absolute;
	height: 3rem;
	li{
		width:5.139rem;
		height:2.639rem;
		float: left;
		margin-right: 0.278rem;
		img{
			width:100%;
		}
	}
}
.swipeChangeWrapper{
	padding-left: 0.278rem;
	height: 3rem;
	background:#fff;
	overflow: hidden;
}

.topicTtile{
	padding:0 0.278rem;
	font-size: 16px;
	font-weight: bold;
	height:40px;
	line-height: 40px;
	background:#fff;
}
.lifestyle-page{
	background:#f3f5f9;
}

.titleGroupChange{
	position:relative;
	overflow:auto;
	height:80px;
}
.titleGroupWrapper{
	margin-top: 0.278rem;
	height:1.389rem;
	overflow:hidden;
}
.titleGroup{
	background:#fff;
	width:150vw;
	li{
		padding:0 0.375rem;
		font-size: 14px;
		float:left;
		color:#7E7E7E;
		span{
			padding:0.319rem 0 0.403rem;
			display:inline-block;
		}
	}
	li.active{
		font-weight: bold;
		color:#000;
		span{
			border-bottom: 2px solid #e4c187;
		}
	}
}
.LifeDetail{
	width:100vw;
	height:100vh;
	background:#FFF;
}
.addGoods{
  height: 10rem;
  background: red;
}

</style>
