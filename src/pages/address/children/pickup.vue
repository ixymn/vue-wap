<template>
	<div class="pickup-box">
		<HEADBACK headTitle="Pickup Station"></HEADBACK>
		<div class="pickup-main">
			<ul>
				<li v-for="item in dataList" @click="focusPickup(item.id,item.addressD)">
					{{item.addressD}}
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {getPickup} from '../../../service/getData'
import Head from '../../../components/common/headerBack.vue'

export default {
	data:function(){
		return ({
			dataList:'',
		});
	},
	computed:{
		...mapState(['addrInfo']),
	},
	components:{
		"HEADBACK":Head,
	},
	mounted:function(){
		if(!common.getCookie("key")){
			common.goLogin(this.$router);
			return;
		}
		this.initData();
	},
	methods:{
		...mapMutations(['ADD_ADDR']),
		initData:async function(){
			let params={
				"key":common.getCookie('key'),
				"area_id":this.addrInfo.city_id,
			};
			let res = await getPickup(params);
			this.dataList=res.datas;
		},
		focusPickup:function(id,name){
			this.addrInfo.dlyp_id=id;
			this.addrInfo.pickup_address=name;
			this.ADD_ADDR(this.addrInfo);
			this.$router.go(-1);
		}
	},
}

</script>

<style lang="less">
.pickup-box{
	position:absolute;
	right: 0;
	left: 0;
	top: 0;
	bottom: 0;
	z-index: 99;
	background-color: #f3f5f9;
	.pickup-main{
		margin-top: 1.33rem;
		li{
			margin: 0 0.28rem 0.28rem 0.28rem;
			background-color: white;
			padding:0.28rem 0.56rem;
			font-size: 0.33rem;
			border-bottom: 1px solid  #DDDFE4;
		}
	}
	
}
</style>
