<script>

export default {
	data:function(){
		return{
			showornot:true,
		}
	},
	computed:{

	},
	created(){
		var ua = navigator.userAgent;
		if(ua.indexOf("iPhone")>0){
			this.showornot = false;
		}
	},
	methods:{

	}
}
</script>
<template>

<div class="appAdZone" v-show="showornot">
	<div class="mengblack"></div>
	<div class="logoZone"></div>
	<div class="clickCloseAd" @click="showornot=false">
		<i></i>
	</div>
	<p class="adWords">Shopping with Kilimall App, better experience and More Cash Rewards</p>
	<a target="_blank" href="https://play.google.com/store/apps/details?id=net.kilimall.shop" class="downLoadZone"></a>
</div>

</template>

<style lang="less" scoped>

.clickCloseAd{
  position:absolute;
  right:0.278rem;
  top:0;
  width:0.722rem;
  height:0.722rem;
}
.clickCloseAd i{
	position:absolute;
	right:0;
	top:0.139rem;
	display:inline-block;
	width:0.444rem;
	height:0.444rem;
	background:url(../assets/images/appad/close.png)0 0 no-repeat;
  	background-size: contain;

}
.appAdZone{
	width:100%;
	position:fixed;
	bottom:0;
	height:2.083rem;
	z-index: 999;
}
.adWords{
	line-height: 0.472rem;
	font-size: 0.361rem;
	color:#fff;
	position:absolute;
	left:2.389rem;
	top:0.333rem;
}
@media only screen and (min-width: 300px){
	.adWords{
		width:40%;
		font-size: 0.333rem;
	}
}
@media only screen and (min-width: 356px){
	.adWords{
		width:48%;
	}
}
@media only screen and (min-width: 365px){
	.adWords{
		width:42%;
	}
}

.mengblack{
	width:100%;
	height:100%;
	position:absolute;
	left:0;
	top:0;
	z-index: -1;
	background:#000;
	opacity:0.7;
}
.logoZone{
	position:absolute;
	width:1.528rem;
	height:1.528rem;
	left:0.417rem;
	top:0.278rem;
	background:url(../assets/images/appad/logo.png)0 0 no-repeat;
 	background-size: contain;

}
.downLoadZone{
	position:absolute;
	width:2.778rem;
	height:1.111rem;
	right:0.306rem;
	top:0.778rem;
	background:url(../assets/images/appad/button.png)0 0 no-repeat;
 	background-size: contain;

}
</style>
