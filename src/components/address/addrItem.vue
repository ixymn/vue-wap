<template>
	<div class="addr-item" >
       <div class="addr-item-tag" :class="{'addr-pick':(addrItem.dlyp_id >0),'addr-deliver':(addrItem.dlyp_id == 0)}">{{(addrItem.dlyp_id>0)?'PICK UP':'Doorstep Delivery'}}</div>
       <div @click="focusAddr">
	       <div class="addr-phone-name clearfix" >
	       		<section class="addr-item-name">{{addrItem.true_name}}</section>
	       		<section class="addr-item-phone"><em class="em-ico"></em>{{addrItem.mob_phone}}</section>
	       </div>
	       <div class="addr-item-addrinfo" >
	       		{{addrItem.address}}
	       </div>
       </div>
       <div class="addr-item-bot clearfix">
       		<span class="addr-bot-left" @click="focusAddr">USE</span>
       		<span class="addr-bot-right" @click="editAddr(addrItem.address_id)">EDIT</span>
       		<span class="addr-bot-right" @click="removeAddr(addrItem.address_id)">REMOVE</span>
       </div>
	</div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'

export default {
	computed:{
		...mapState(['addrInfo','isCartAddr',"backCartAddr"]),
	},
	props:['addrItem'],
	methods:{
		...mapMutations(['ADD_ADDR','FOCUS_CART_ADDR_TMP']),
		removeAddr:function(addrId){
			this.$emit('removeAddrEvent',[this.indexAddr],[addrId]);
		},
		editAddr:function(addrId){

			this.ADD_ADDR(this.addrItem);
			this.$router.push("/addressEdit");
		},
		focusAddr:function(){
			if(this.isCartAddr){
				this.FOCUS_CART_ADDR_TMP(this.addrItem);
				this.$router.push(this.backCartAddr);
			}
		},
	}
}
</script>
<style lang="less">
.addr-item{
	margin-bottom: 0.28rem;
	background-color: white;
	.addr-item-tag{
		font-size: 0.33rem;
		background-size: 40% 120%;
		background-repeat: no-repeat;
		padding: 0.1rem 0.42rem;
	}
	.addr-pick{
		background-image: url(../../assets/images/address/addr-pickup.png);
	}
	.addr-deliver{
		background-image: url(../../assets/images/address/addr-deliver.png);
	}
	.addr-phone-name{
		font-size: 0.44rem;
		padding:0.28rem 0.42rem 0 0.42rem;
		.addr-item-name{
			float: left;
		}
		.addr-item-phone{
			float: right;
			em{
				float: left;
				width: 0.67rem;
				height: 0.67rem;
				background-image: url(../../assets/images/address/addr-phone-cio.png);
			}
		}
	}
	.addr-item-addrinfo{
		color:#999;
		font-size: 0.39rem;
		padding: 0 0.42rem 0.22rem 0.42rem;
		line-height: 0.44rem;
	}
	.addr-item-bot{
		margin: 0 0.42rem;
		padding: 0.14rem 0;
		font-size: 0.39rem;
		border-top: 1px solid #DDDFE4;
		.addr-bot-left{
			float: left;
		}
		.addr-bot-right{
			float: right;
			margin-left: 0.28rem;
		}
	}
}
</style>

