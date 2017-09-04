<template>
	<div class="province-box">
		<HEADBACK headTitle="Province"></HEADBACK>
		<div class="prov-main">
			<ul>
				<li v-for="item in provList" @click="focusProvince(item.area_id,item.area_name)">
					{{item.area_name}}
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {getArea} from '../../../service/getData'
import Head from '../../../components/common/headerBack.vue'

export default {
	data:function(){
		return ({
			provList:'',
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
				"area_id":'',
			};
			let res = await getArea(params);
			this.provList=res.datas.area_list;
		},
		focusProvince:function(id,name){
			this.addrInfo.area_id=id;
			this.addrInfo.province_name=name;
			this.addrInfo.city_name='';
			this.ADD_ADDR(this.addrInfo);
			this.$router.go(-1);
		}
	},
}

</script>

<style lang="less">
.province-box{
	position:absolute;
	right: 0;
	left: 0;
	top: 0;
	bottom: 0;
	z-index: 99;
	background-color: #f3f5f9;
	.prov-main{
		margin-top: 1.33rem;
		li{
			display: inline-block;
			width: 100%;
			background-color: white;
			height: 1.11rem;
			line-height: 1.11rem;
			padding:0 0.56rem;
			font-size: 0.39rem;
			border-bottom: 1px solid  #DDDFE4;
		}
	}
	
}
</style>
