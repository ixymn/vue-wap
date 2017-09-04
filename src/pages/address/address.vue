<template>
	<div class="address-box">
		<HEADBACK headTitle="Shopping Address" @goBackEvent="goBack" :isDiyBack="1">
			<div slot="header-action"><router-link to="/addressAdd"><div class="addr-add-btn">Add</div></router-link></div>
		</HEADBACK>
		<div class="addr-main">
			<ADDRITEM v-for="(item,index) in addrList" :key='index' :addrItem="item" @removeAddrEvent="removeAddr(index,item.address_id)"/>

		</div>

	</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {getAddr,delAddr} from '../../service/getData'
import Head from '../../components/common/headerBack.vue'
import AddrItem from '../../components/address/addrItem.vue'

export default {
	data:function(){
		return ({
			addrList:'',
		});
	},
	components:{
		"HEADBACK":Head,
		"ADDRITEM":AddrItem,
	},
	computed:{
		...mapState(['backCartAddr']),
	},
	mounted:function(){
		if(!common.getCookie("key")){
			common.goLogin(this.$router);
			return;
		}
		this.initData();
	},
	methods:{
		...mapMutations(['BACK_CART_ADDR']),
		goBack:function(){
			if(this.backCartAddr){
				let backUrl=this.backCartAddr;
				this.BACK_CART_ADDR("");
				this.$router.push(backUrl);
			}else{
				this.$router.go(-1);
			}

		},
		initData:async function(){
			this.$indicator.open();
			let res = await getAddr({"key":common.getCookie('key')});
			let addrListTmp=[];
			this.$indicator.close();
			if(res.code == "200"){
				for(let i in res.datas.address_list){
					addrListTmp.push(res.datas.address_list[i]);
				}

				this.addrList= [...addrListTmp];
			}else if(res.code == "444"){
				this.$toast(res.datas.error);
			}else{
				this.$toast("error");
			}
		
		},
		removeAddr:function(indexAddr,addrId){
			var _this=this;
			this.$messagebox({
				message:'Are you sure to remove it?',
				title:"",
				showConfirmButton:true,
				confirmButtonText:"Yes",
				cancelButtonText:"No",
				showCancelButton:true,
			}).then(function(action){
				if(action == "confirm"){
					_this.deleteAddr(indexAddr,addrId);
				}

			});
		},
		deleteAddr:async function(indexAddr,addrId){
			
			let params={
				"key":common.getCookie('key'),
				"address_id":addrId,
			};
			let res = await delAddr(params);
			if(res.code == "200"){
				
				this.addrList.splice(indexAddr,1);
				this.$toast({
				  message: 'Deleted',
				  position: 'bottom',
				  duration: 5000
				});
			}
		}
	}
}

</script>

<style lang="less">
.address-box{
	.addr-main{
		margin-top: 1.33rem;
	}
	.addr-add-btn{
		position: absolute;
		font-size: 0.44rem;
	    top: 50%;
	    right: 1.7rem;
	    color: white;
		-webkit-transform: translate(0,-50%);
    	transform: translate(0,-50%);
	}
}
</style>
