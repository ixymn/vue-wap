<template>
	<div class="cash-reward-log">
		<HEADBACK headTitle="Cash Rewards Log"></HEADBACK>
		<div class="crl-main">
			<ul class="log_list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<li v-for="logItem in logArr">
		            <div class="log_item_top">
		            	<span>{{logItem.log_type_name}}</span>
		            	<span :style="logItem.zf?'color:#F87622':''">{{logItem.log_amount}}</span>
		            </div>
		            <div class="log_item_bot">
		            	<span>{{logItem.zf?'Earned':'Spent'}}</span>
		            	<span>{{logItem.log_time}}</span>
		            </div>
		        </li>
        	</ul>
        	<SCROLLLOAD v-show="!loading"/>
		</div>
	</div>
</template>

<script>
import {getCashLog} from '../../service/getData'
import Head from '../../components/common/headerBack.vue';
import ScrollLoad from '../../components/common/scrollLoadIco.vue';

export default {
	data:function(){
		return({
			logArr:[],
			curPage:1,
			loading:false,
		});
	},
	components:{
		"HEADBACK":Head,
		"SCROLLLOAD":ScrollLoad,
	},
	mounted:function(){
		if(!common.getCookie("key")){
			common.goLogin(this.$router);
			return;
		}
		
		this.loadMore();
	},
	methods:{
		loadMore:async function(){
			this.loading=true;
			let res= await getCashLog({"key":common.getCookie("key"),"curpage":this.curPage,"page":10});
			if(res.code == "200"){
				
				if(res.datas.list.length){
					let newArr=this.logArr.concat(res.datas.list)
					this.logArr=newArr;
					this.loading=false;
					this.curPage=this.curPage+1;
				}
			}else if(res.code == "444"){
				this.$toast(res.datas.error);
			}else{
				this.$toast("error");
			}
		}
	}
	
}
  
</script>

<style lang="less">
.cash-reward-log{
	.crl-main{
		margin-top: 1.33rem;
		.log_list>li{
			/* height: 1.11rem; */
			padding: 0.44rem;
			background-color: #fff;
			border-bottom: 0.03rem solid #DDE0E4;
		}
		.log_item_top{
			display: inline-block;
			width: 100%;
		}
		.log_item_top>span{
			display: inline-block;
			line-height: 0.47rem;
			overflow: hidden;
		}
		.log_item_top>span:nth-child(1){
			float: left;
			width: 65%;
			font-size: 0.39rem;
			color: #150000;
		}
		.log_item_top>span:nth-child(2){
			float: right;
			width: 30%;
			font-size: 0.44rem;
			color: #150000;
			text-align: right;
		}
		.log_item_bot{
			margin-top: 0.19rem;
			height: 0.47rem;
		}
		.log_item_bot>span{
			display: inline-block;
			line-height: 0.47rem;
			color: #AFB1B7;
			font-size: 0.39rem;
			overflow: hidden;
		}
		.log_item_bot>span:nth-child(1){
			float: left;
			width: 65%;
		}
		.log_item_bot>span:nth-child(2){
			float: right;
			width: 30%;
			text-align: right;
		}
	}
}
</style>
