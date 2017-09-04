<script>
import {getTodayDeal} from '../../service/getData'
import headerBack from '../../components/common/headerBack.vue'
import { Indicator,Toast } from 'mint-ui';

export default {
	data:function(){
		return{
			todayData:[],
			curpage:1,
			windowH:document.documentElement.clientHeight,
			turnOn:true,
			whetherDetail:false,
			title:"Today's Deal"

		}
	},
	computed:{
		todayListLength(){
			return Math.ceil(this.todayData.length/2)
		},
		DetailWord(){
			if(this.whetherDetail){
				return 'Hide Detail'
			}else{
				return 'View Detail'
			}
		},
		gsShipping(){
			if(this.$route.query.global==1){
				return true
			}else{
				return false
			}
		},
		currency(){
			return this.$store.state.site.currency;
		}
	},
	created(){
		Indicator.open({
            text: 'Process...',
            spinnerType: 'fading-circle'
        });
		this.initData(this.curpage).then();


		window.addEventListener('scroll', this.handleScroll);
	},
	beforeRouteLeave (to, from, next) {
		window.removeEventListener('scroll', this.handleScroll);
		next()
	},
	components:{
		'headerBack':headerBack
	},
	methods:{
		async initData(curpage){
			console.log(this.$route.query.global);
			var isGS = this.$route.query.global;

			if(isGS == 1){
				this.title= "Global Shopping";
				var data = {
					curpage:curpage,
					page:10,
					global:1,
				}
			}else{
				var data = {
					curpage:curpage,
					page:10
				}
			}
			var newData = (await getTodayDeal(data)).datas.goods_list;

			if(curpage>1){
				this.todayData = this.todayData.concat(newData);
			}else{
				this.todayData = Object.assign([],this.todayData,newData)
			}

			if(curpage==1){
				Indicator.close();
			}

			this.turnOn = true;

    	},
    	handleScroll(){
    		var todayLi = document.querySelectorAll('.todayList li')[0];

    		// console.log(document.body.scrollTop+this.windowH,this.todayListLength*todayLi.offsetHeight);

    		if(document.body.scrollTop+this.windowH>this.todayListLength*todayLi.offsetHeight-118){

				if(this.turnOn){
					this.turnOn = false;
	    			this.initData(++this.curpage);
	    		}

    		}

    	}

	}
}
</script>
<template>
<div class="wrapper">
	<headerBack :headTitle="title"></headerBack>
	<div class="gsShipping" v-show="gsShipping">
		<img src="../../assets/images/shippingbanner.jpg" alt="">
		<div class="gsTitle">
			<i class="global"></i>
			<p>Terms and Conditions for Global Shopping</p>
		</div>
		<div class="viewDetail" @click="whetherDetail=!whetherDetail">{{DetailWord}}</div>
		<div class="detailBox" v-show="whetherDetail">
			<p class="detailWord">1, If a Seller fails to send an already paid Global Shopping order Item within 7 days, a buyer can initiate the
	        return/refund process.</p>
	        <p class="detailWord">2, A Buyer can apply for a full refund if an already dispatched Global Shopping order Item fails to show up
	        after 40 days in transit.</p>
	        <p class="detailWord">3, Upon receiving a package, if an item has quality issues, broken,missing some parts, or different from its
	        original online description, a Buyer can apply for a full refund. A proof provided by the courier employee will
	        be required for items that arrived while broken.</p>
	        <p class="detailWord">4, The Return policy for Global Shopping Item orders are limited to certain conditions.(*terms and Conditions
	        apply).</p>
		</div>
	</div>
	<ul class="todayList">
		<li v-for="good in todayData">
			<router-link :to="'goods/'+good.goods_id" class="v-link">
				<div class="todayImgWrapper" :style="'background:url('+good.goods_image_url+') 0% 0% / contain no-repeat;'">
				</div>
				<p>{{good.goods_name}}</p>
				<div>
					<span>{{currency}}</span>
					<em>{{parseInt(good.xianshi_price)}}</em>
					<i :class="{drop:good.goods_logistics_type==0,fbk:good.goods_logistics_type==1,global:good.goods_logistics_type==2,}"></i>
				</div>
				<h4>
					<router-link :to="'/store/'+good.store_id">
					{{good.store_name}}
					</router-link>
				</h4>
			</router-link>
		</li>
	</ul>
</div>
</template>

<style lang="less" scoped>
#app{padding-top: 1.36rem;}
.viewDetail{
	width:2.778rem;
	text-align: center;
	color: #6c309a;
	text-decoration: underline;
}
.detailBox{padding:0 .32rem;}
.detailWord{
	font-size: 0.314rem;
	font-weight: bold;
	margin: 0.389rem 0;
}
.gsTitle{
	height:1.222rem;
	line-height: 1.222rem;
	position:relative;
	i{
		display:inline-block;
		width:0.556rem;
		height:0.556rem;
		position:absolute;
		left:0.083rem;
		top:0.306rem;
		background:url(../../assets/images/global.png);
		background-size: contain;
	}
	p{
		text-indent: 0.778rem;
		font-size: 0.361rem;
		font-weight: bold;
	}
}
.gsShipping{
	img{
		width:100%;
	}
}
.wrapper *{
	box-sizing: border-box;
}
.todayList{
	margin-top: 1.333rem;
	display:flex;
	flex-wrap:wrap;
	justify-content:space-between;
	li{
		width:49.8%;
		background:#fff;
		margin-bottom: 0.06rem;
		padding:0 0.2rem;
		p{
			font-size: 0.389rem;
		    line-height: .6rem;
		    height: 1.2rem;
		    overflow: hidden;
		}
		img{
			width:100%;
		}
		.todayImgWrapper{
			margin:0.4rem;
			height:3.4rem;
		}
	}
	div{
		position:relative;
		span{
			color:#f87622;
			font-size: 0.361rem;
		}
		em{
			margin-left: .12rem;
			font-size: 0.42rem;
			color:#f87622;
			position:relative;
			top:0.028rem;
			// font-weight: bold;
		}
		i{
			display:inline-block;
			width:0.556rem;
			height:0.556rem;
			position:absolute;
			right:0.222rem;
			top:0.111rem;
		}
		.fbk{
			background:url(../../assets/images/fulfil.png);
			background-size: contain;
		}
		.global{
			background:url(../../assets/images/global.png);
			background-size: contain;
		}
		.drop{
			background:url(../../assets/images/drop.png);
			background-size: contain;
		}
	}
	h4{
		color: #999;
		line-height: 0.944rem;
		height: 0.944rem;
		overflow:hidden;
	}
}
</style>
