
<script>
import headerBack from '../../components/common/headerBack.vue'
import {checkCollectedStore} from '../../service/getData'
import '../../utils/common.js'

export default {
	data:function(){
		return{
			curpage:1,
			page:100,
			todayData:[]
		}
	},
	computed:{
		params(){
			return{
				curpage:this.curpage,
				page:this.page,
				key:common.getCookie('key')
			}
		}
	},
	created(){
		this.getShops()
	},
	methods:{
		async getShops(){
            var result = await checkCollectedStore(this.params);
            console.log(result)
            if(result.code==444){
            	this.$router.push('/login')
            }else if(result.code==200){
            	this.todayData = Object.assign([],this.todayData,result.datas.favorites_list)
            }
        },
	},
	components:{
		'headerBack':headerBack
	}
}
</script>
<template>
<div class="wrapper">
<headerBack headTitle='Saved Shops'></headerBack>
	<ul class="todayList">
		<router-link v-for="good in todayData" :key="key" :to="'store/'+good.store_id" class="v-link" tag="li">
			<div class="imgWrapper" :style="'background:url('+good.store_avatar_url+') 0% 0% / contain no-repeat;'">
			</div>
			<div class="infoWrapper">
				<p>{{good.store_name}}</p>
				<ul class="infoList">
					<li>Goods Qty:{{good.goods_count}}</li>
					<li>No. of Saved:{{good.store_collect}}</li>
					<li>Saved Time:{{good.fav_time_text}}</li>
				</ul>
			</div>
		</router-link>
	</ul>
	<div class="emptyshop" v-if="todayData.length==0">You haven't collect any shop yet</div>

</div>
</template>

<style lang="less" scoped>
.wrapper{
	*{
    	box-sizing: border-box;
	}
}
.emptyshop{
	margin-top: 8.33rem;
	font-size: 0.444rem;
	text-align: center;
}
.todayList{
	margin-top: 1.333rem;
	>li{
		height:3.6rem;
		background: #fff;
		margin-bottom:0.056rem;
		padding:0.15rem;
		font-size: 0.389rem;
	}
	.imgWrapper{
		height:3.3rem;
		float: left;
		width:3.3rem;
	}
	.infoWrapper{
		height:3.3rem;
		float: left;
		margin-left: 0.3rem;
		width:6rem;
		p{
			margin:0.288rem 0 0.19rem 0;
		}
	}
}
.infoList{
	li{
		color:#959393;
		line-height: 0.722rem;
	}
}

</style>
