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
					<img class="infoBodyImg" src="../../assets/images/lifeStyle/1.png" alt="">
					<p class="articleB">Betty and I and other members of the family spend a nice weekend together at Fanling Lodge. </p>
				</div>
				<div class="goodsBuyNow">
					<div class="goodsPicWrapper">
						<img src="../../assets/images/lifeStyle/2.png" alt="">
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
			<img src="../../assets/images/lifeStyle/1.png" alt="">
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
			font-size: 0.444rem;
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
	font-size: 0.444rem;
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
	font-size: 0.389rem;
	color:#7E7E7E;
}
.goodsPrice{
	font-size: 0.389rem;
	color:#7E7E7E;
	margin:0.1rem 0 0 2.778rem;

}
.goodsBuyNow{
	height:2.222rem;
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
	width:2.5rem;
	height:2.222rem;
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
	height:2.222rem;
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
	right:0.556rem;
	top:0.472rem;
	position:absolute;
	font-size: 0.361rem;

}
.SharerName{
	color:#000;
	font-size: 0.389rem;
	float:left;
	margin-left: 0.25rem;
}
.ShareTime{
	font-size: 0.389rem;
	float:left;
	color:#999999;
}
.articleT{
	margin: 0.389rem 0 8px;
	font-size: 0.528rem;
	font-weight: bold;
	color:#000;
}
.articleB{
	color:#150000;
	font-size: 0.389rem;
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
			width:0.389rem;
			height:0.389rem;
			position:relative;
			top:0.083rem;
		}
	}
	.Igolook i{
		background:url(../../assets/images/lifestyle/golook.png) no-repeat 0 4px;
		background-size: contain;
	}
	.Icollect i{
		background:url(../../assets/images/lifestyle/weizan.png) no-repeat 0 4px;
		background-size: contain;
	}
	.Ishare i{
		background:url(../../assets/images/lifestyle/share.png) no-repeat;
		position:relative;
		top:0.056rem;
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
	font-size: 0.444rem;
	font-weight: bold;
	height:1.111rem;
	line-height: 1.111rem;
	background:#fff;
}
.lifestyle-page{
	background:#f3f5f9;
}

.titleGroupChange{
	position:relative;
	overflow:auto;
	height:2.222rem;
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
		font-size: 0.389rem;
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
