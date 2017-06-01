<script>
import {getTodayDeal} from '../../service/getData'

export default {
	data:function(){
		return{
			todayData:[],
			curpage:1
		}
	},
	created(){
		this.initData()
	},
	methods:{
		async initData(){
			var data = {
				curpage:this.curpage,
				page:10
			}
			
	        var newData  = (await getTodayDeal(data)).datas.goods_list;

	        console.log(newData)

	        this.todayData = Object.assign([],this.todayData,newData)
    	},
	},
	computed:{

	}
}
</script>
<template>
<div>
	<ul class="todayList">
		<li v-for="good in todayData">
			<img :src="good.goods_image_url" alt="">
			<p>{{good.goods_jingle}}</p>
			<div>
				<span>Ksh</span>
				<em>{{good.goods_price}}</em>
				<i :class="{fbk:isActive,text-danger: !isActive }"></i>
			</div>
			<h4>
				{{good.store_name}}
			</h4>
		</li>
	</ul>
</div>
</template>

<style lang="less" scoped>
.todayList{
	display:flex;
	flex-wrap:wrap;
	justify-content:space-between;
	li{
		width:4.97rem;
		height:4rem;
		background:#fff;
		margin-bottom: 0.06rem;
		p{
			font-size: 0.444rem;
		    line-height: .6rem;
		    height: 1.2rem;
		    overflow: hidden;
		}
	}
	div{
		position:relative;
		span{
			color:#ec5464;
			font-size: 0.361rem;
		}
		em{
			font-size: 0.472rem;
			color:#ec5464;
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
	}
	h4{
		color: #999;
		line-height: 0.944rem;
	}
}
</style>
