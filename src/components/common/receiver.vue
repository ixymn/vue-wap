<template>
	<div class="coms-recive">
		<div class="coms-recive-person">
			<em class="em-ico"></em>
			<span class="coms-recive-name">{{cartAddrTmp.true_name}}</span>
			<span class="coms-recive-tel"> {{cartAddrTmp.mob_phone}}</span>
			<span class="coms-recive-default" v-show="cartAddrTmp.is_default">[Default]</span>
		</div>
		<div class="coms-recive-addr">
			<em class="em-ico"></em>
			<span>{{cartAddrTmp.address}}</span>
			<div style="clear:both;"></div>
		</div>
	</div>
</template>
<script>
import {mapState} from "vuex"
export default {
  computed:{
  	...mapState(['cartAddr']),
  	cartAddrTmp:function(){
  		return this.cartAddr;
  	},
  }
}
</script>
<style lang="less">
.coms-recive{
	padding: 0.39rem 0.56rem;
	font-size: 0.39rem;
	color: #150000;
	.coms-recive-person{
		font-weight: bold;
		margin-bottom: 0.28rem;
		em{
			width:0.44rem;
			height: 0.56rem;
			background-image: url(../../assets/images/ordcfr-person.png);
			vertical-align: middle;
			margin-right: 0.22rem;
		}
		.coms-recive-default{
			font-weight: normal;
			color: #E4C187;
			float: right;
		}
	}
	.coms-recive-addr{
		line-height: 0.5rem;
		em{
			width:0.44rem;
			height: 0.53rem;
			background-image: url(../../assets/images/ordcfr-addr.png);
			vertical-align: middle;
			margin-right: 0.22rem;
			position: absolute;
		}
		span{
			display: inline-block;
			margin-left: 0.7rem;
			float: left;
			word-wrap: break-word;
		}
	}
}
</style>

