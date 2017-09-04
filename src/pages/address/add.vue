<template>
	<div class="addr-edit-box">
		<HEADBACK headTitle="Add Address" @goBackEvent="goBack" :isDiyBack="1">

		</HEADBACK>
		<div class="addredt-main">
			<input type="number" class="addredt-input" placeholder="Your phone no. eg. 0742000111" v-model="addrItem.mob_phone">
			<input type="text" class="addredt-input" placeholder="Enter your name" v-model="addrItem.true_name">
			<router-link to="/addressAdd/province" class="v-link">
				<div class="addredt-select">
					<span>{{provName}}</span>
					<em class="em-ico"></em>
				</div>
			</router-link>

			<div class="addredt-select" @click="chooseCity">
				<span>{{cityName}}</span>
				<em class="em-ico"></em>
			</div>
			<div v-show="hasDeliver">
				<div class="addredt-btn-box clearfix" v-show="this.addrItem.area_door == 1 && isPickup">
					<div class="addredt-deliver-btn" :class="{'focus':(tabDeliver == 1)}" @click="showDeliver(1)">Pickup Station</div>
					<div class="addredt-deliver-btn" @click="showDeliver(2)" :class="{'focus':(tabDeliver == 2)}" style="float:right">Deliver to Doorstep</div>
				</div>
				<router-link to="/addressAdd/pickup" class="v-link">
					<div class="addredt-select" v-show="(tabDeliver == 1) && isPickup">
						<span>{{address}}</span>
						<em class="em-ico"></em>
					</div>
				</router-link>
				<div class="addredt-select" v-show="(tabDeliver == 2) && (this.addrItem.area_door == 1)" style="padding:0 0.28rem;">
					<span style="margin:0;font-size:0.33rem;">Address:</span>
					<input type="text" class="addredt-input" style="width:80%;margin-bottom:0;" v-model="addrItem.deliver_address" />
				</div>

			</div>

			<div class="addredt-submit" @click="submitAddr">
				Submit
			</div>
		</div>
		<transition name="router-addr" mode="out-in">
	      <router-view ></router-view>
	    </transition>
	</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {getPickup,addAddr} from '../../service/getData'
import Head from '../../components/common/headerBack.vue'

export default {
	data:function(){
		return({
			tabDeliver:1,
			hasDeliver:false,
			isPickup:false,
			addrItem:{
				"true_name":'',
				"mob_phone":'',
				"area_id":'',
				"province_name":'',
				"city_id":'',
				"city_name":'',
				"dlyp_id":'',
				"pickup_address":'',
				"deliver_address":'',
				"area_door":'',
			},
		});
	},
	computed:{
		...mapState(['addrInfo']),
		provName:function(){
			if(this.addrItem.province_name){
				return this.addrItem.province_name;
			}else{
				return "Province";
			}
		},
		cityName:function(){
			if(this.addrItem.city_name){
				this.tabDeliver=1;
				this.hasDeliver=true;
				this.getPickupData(this.addrItem.city_id);
				return this.addrItem.city_name;
			}else{
				this.hasDeliver=false;
				return "City";
			}
		},
		address:function(){
			if(this.addrItem.pickup_address){
				return this.addrItem.pickup_address;
			}else{
				return "Choose Pickup Station";
			}
		},
	},
	watch:{
		addrInfo:{
			handler:function(val,oldVal){
				this.addrItem.area_id=val.area_id;
				this.addrItem.province_name=val.province_name;
				this.addrItem.city_id=val.city_id;
				this.addrItem.city_name=val.city_name;
				this.addrItem.dlyp_id=val.dlyp_id;
				this.addrItem.pickup_address=val.pickup_address;
				this.addrItem.deliver_address=val.deliver_address;
				this.addrItem.area_door=val.area_door;
			},
			deep:true
		}
	},
	components:{
		"HEADBACK":Head,
	},
	mounted:function(){

		if(!common.getCookie("key")){
			common.goLogin(this.$router);
			return;
		}
		this.ADD_ADDR(this.addrItem);
	},
	methods:{
		...mapMutations(['ADD_ADDR']),
		goBack:function(){
			this.$router.push("/address");
		},
		getPickupData:async function(city_id){
			let res=await getPickup({
				"key":common.getCookie("key"),
				"area_id":city_id
			});

			if(res.code == "200" ){
				if(res.datas.length){
					this.isPickup=true;
				}else{
					this.isPickup=false;
					this.tabDeliver=2;
				}
			}
		},
		showDeliver:function(index){
			this.tabDeliver=index;
		},
		chooseCity:function(){
			if(!this.addrItem.province_name){
				this.$toast({
					message:"Please select a province",
					duration:5000,
				});
				return;
			}else{
				this.$router.push("/addressAdd/city");
			}
		},
		submitAddr:async function(){
			if(this.addrItem.mob_phone == ""){
				this.$toast({
					message:"The phone number can not be empty",
					duration:5000,
				});
				return;
			}else if(!this.addrItem.true_name){
				this.$toast({
					message:"Name can not be empty",
					duration:5000,
				});
				return;
			}else if(!this.addrItem.province_name){
				this.$toast({
					message:"City information can not be empty",
					duration:5000,
				});
				return;
			}else if(this.addrItem.city_name == ""){
				this.$toast({
					message:"City information can not be empty",
					duration:5000,
				});
				return;
			}
			let addressTmp=(this.tabDeliver == 1)?this.addrItem.pickup_address:this.addrItem.deliver_address;
			if(addressTmp == ""){
				this.$toast({
					message:"City information can not be empty",
					duration:2000,
				});
				return;
			}
			let params={
				"key":common.getCookie('key'),
				"address_id":this.addrItem.address_id,
				"true_name":this.addrItem.true_name,
				"area_id":this.addrItem.area_id,
				"city_id":this.addrItem.city_id,
				"dlyp_id":(this.tabDeliver == 1)?this.addrItem.dlyp_id:0,
				"area_info":this.addrItem.province_name+" "+this.addrItem.city_name,
				"address":addressTmp,
				"mob_phone":this.addrItem.mob_phone,
			};
			this.$indicator.open();
			let res=await addAddr(params);
			this.$indicator.close();
			if(res.code == "200"){
				this.$toast({
					message:"Saved",
					duration:5000,
				});
				this.$router.push("/address");
			}else if(res.code == "444"){
				this.$toast({
					message:res.datas.error,
					duration:5000,
				});
			}else{
				this.$toast({
					message:"error",
					duration:5000,
				});
			}
		}
	}
}

</script>

<style lang="less">
.addr-edit-box{
	.addredt-main{
		margin-top: 1.33rem;
		font-size: 0.39rem;
		.addredt-input{
			border:none;
			width: 100%;
			height:1.22rem;
			line-height: 1.11rem;
			padding: 0 0.28rem;
			box-sizing: border-box;
			margin-bottom: 0.2rem;
		}
		.addredt-btn-box{
			padding: 0 0.28rem;
			margin-bottom: 0.2rem;
			.addredt-deliver-btn{
				width: 48%;
				height: 0.97rem;
				line-height: 0.97rem;
				float: left;
				text-align: center;
				border:1px solid #E86D1E;
				color: #E86D1E;
				font-size: 0.33rem;
				background-color: white;
			}
			.focus{
				background-color: #E86D1E;
				color: white;
			}
		}
		.addredt-select{
			width: 100%;
			background-color: white;
			margin-bottom: 0.2rem;
			padding:0.39rem 0.28rem;
			box-sizing: border-box;
			line-height: 0.44rem;
			color: #333333;
			position: relative;
			span{
				display: inline-block;
				margin-right: 1rem;
			}
			em{
				position: absolute;
				top: 50%;
				margin-top: -0.34rem;
				right: 0.56rem;
				width: 0.44rem;
				height: 0.67rem;
				background-size: 60%;
				background-image: url(../../assets/images/spec-arrow.png);
			}
		}
		.addredt-submit{
			text-align: center;
			margin: 0.56rem 0.28rem;
			height: 1.22rem;
			line-height: 1.22rem;
			font-size: 0.39rem;
			background-color: #E86D1E;
			color: white;
			box-shadow: 0 0.06rem 0.22rem 0 rgba(0, 0, 0, 0.11)
		}
	}
}
.v-link {display: block;}
.router-addr-enter-active, .router-addr-leave-active {transition: all .4s;}
.router-addr-enter, .router-addr-leave-active {transform: translate3d(2rem, 0, 0);opacity: 0;}
</style>
