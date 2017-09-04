<template>
	<div class="cash-reward">
		<HEADBACK headTitle="Cash Rewards"></HEADBACK>
		<div class="csrs-main">
			<div class="cash_top">
				<div class="cash_top_box">
					<div class="cash_total_amount">
						<span>{{currencyUnit}} {{total}}</span>
					</div>
					<div class="cash_amount_detail">
						<p>Available</p>
						<p><router-link to="/cashRewardsLog"><a href="">Cash Rewards Details</a></router-link></p>
						<div class="cash_amount_box">
							<div class="cash_amount_left">
								<p>{{currencyUnit}} {{celect}}</p>
								<p class="cash_amount_kind">Collected Total</p>
							</div>
							<div class="cash_amount_right">
								<p>{{currencyUnit}} {{celect-total}}</p>
								<p class="cash_amount_kind">Used</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="cash_msg">
				<ul>
					<li v-for="(item,index) in qaList" @click="focusQ(index)">
						<div class="cash_msg_title" :class="{dropped:showList[index].show}">
							<p>{{item.Q}}<em></em></p>
						</div>
						<div class="cash_msg_cont" v-html="item.A" v-show="showList[index].show" >
							
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import {getCashRewards,getCashFQ} from '../../service/getData'
import Head from '../../components/common/headerBack.vue';
import '../../utils/common'

export default {
	data:function(){
		return ({
			qaList:[
				{"Q":"What is  Kilimall Cash Rewards?","A":"Kilimall Cash Rewards is a bonus reward to appreciate our loyal users who have given us a long-standing support, to encourage them and get them involved more actively on our various activities."},
				{"Q":"Can Kilimall Cash Rewards grow?","A":"Yes, it may be accumulated over time as one gets more. It's usage has a time limit however. Kilimall reserves the right to define and interpret the terms of use."},
				{"Q":"What can Kilimall Cash Rewards be used for?","A":"Kilimall Cash Rewards is a platform based cash that can be used within the Kilimall platform. It can only be used for shopping and can be deducted during checkout. It however can not be withdrawn, transferred, purchase call time or other virtual items."},
				{"Q":"Why is it that I can't redeem Cash Rewards on my checkout?","A":""},
			],
			showList:[
				{"show":false},
				{"show":false},
				{"show":false},
				{"show":false},
			],
			celect:0,
			spend:0,
			total:0,
			fromPath:'y'
		});
	},
	components:{
		"HEADBACK":Head,
	},
	computed:{
		currencyUnit:function(){
	        return this.$store.state.site.currency;
	    },
	},
	beforeRouteEnter(to, from, next) {

		if(!common.getCookie("key")){
			if(from.path.split('/')[2]=='login'){
				common.setCookie('whetherLogin','login')
			}
		}
		next()
	},
	mounted:function(){

		if(!common.getCookie("key")){
			if(common.getCookie('whetherLogin')=='login'){
				common.delCookie('whetherLogin')
				this.$router.push('/home')
			}else{
				this.$router.push('/login')
			}

		}

		this.initData();
	},
	methods:{
		focusQ:function(i){
			this.showList[i].show=!this.showList[i].show;
		},
		initData:async function(){
			let res=await getCashRewards({"key":common.getCookie("key")});
			if(res.code == "200"){
				this.celect=res.datas.celect;
				this.spend=res.datas.spend;
				this.total=res.datas.total;
				let res1=await getCashFQ({"key":common.getCookie("key")});

				if(res1.code == "200"){
					this.qaList[3].A='Cash Rewards has set terms and conditions for its usage at checkout. The current conditions are as follows:<br/>\
					The minimum amount allowed during each checkout: '+this.currencyUnit+' '+res1.datas.min+'<br/>\
					The maximum amount allowed during each checkout: '+this.currencyUnit+' '+res1.datas.max+'<br/>\
					The Order Value Discounted: '+res1.datas.order_rate+'%<br/>\
					Your Available Amount: '+this.currencyUnit+' '+res1.datas.member_balance+'<br/>\
					When you earn more Cash Rewards or change the order value, you can get to use more of your Cash Rewards as discount.';
				}
			}else if(res.code == "444"){
				this.$toast(res.datas.error);
			}else{
				this.$toast("error");
			}

		},
		
	}
	
}
  
</script>

<style lang="less">
.csrs-main{
	margin-top: 1.33rem;
}
.cash_top{
	height: 5.08rem;
	background: #150000;
	position: relative;
}
.cash_top_box{
	position: absolute;
	width: 8.89rem;
	height: 4.92rem;
	top: 0.81rem;
	left: 0.56rem;
	background-color: #fff;
	border-radius: 0.2rem;
	overflow: hidden;
}
.cash_total_amount{
	height: 1rem;
	border-left: 0.25rem solid #F87622;
	box-sizing: border-box;
	font-size: 0.5rem;
	color: #F87622;
	text-align: center;
	vertical-align: bottom;
}
.cash_total_amount>span{
	margin-left: -0.25rem;
	margin-top: 0.56rem;
	display: inline-block;
}
.cash_amount_detail{
	height: 3.92rem;
	border-left: 0.25rem solid #424040;
	box-sizing: border-box;
}
.cash_amount_detail{
	text-align: center;
}
.cash_amount_detail>p:nth-child(1){
	margin-left: -0.25rem;
	font-size: 0.39rem;
	line-height: 0.8rem;
	color: #AFB1B7;
}
.cash_amount_detail>p:nth-child(2){
	margin-left: -0.25rem;
	font-size: 0.39rem;
	
	letter-spacing: -0.01rem;
	line-height: 0.67rem;
}
.cash_amount_detail>p:nth-child(2)>a{
	text-decoration: underline;
	color: #424040;
}
.cash_amount_box{
	width: 6.08rem;
	border: 0.03rem dashed  #DDDFE4;
	color: #AFB1B7;
	font-size: 0.44rem;
	margin: 0.28rem auto 0 auto;
}
.cash_amount_left{
	width: 50%;
	float: left;
	padding-top: 0.56rem;
	text-align: left;
}
.cash_amount_right{
	width: 50%;
	float: right;
	padding-top: 0.56rem;
	text-align: left;
	padding-left: 0.56rem;
	box-sizing: border-box;
}
.cash_amount_kind{
	font-size: 0.33rem;
}
.cash_msg{
	margin-top: 0.92rem;
}
.cash_msg_title{
	background-color: #fff;
	padding-left:0.42rem; 
}
.cash_msg_title>p{
    display: block;
    border-bottom: 0.03rem solid #DDE0E4;
    font-size: 0.39rem;
    position: relative;
	padding-right: 1rem;
	padding-top: 0.42rem;
	padding-bottom: 0.42rem;
}
.cash_msg_title>p>em{
    display: inline-block;
    width: 0.61rem;
    height: 0.61rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    float: right;
    margin: 0.31rem 0.42rem;
    position: absolute;
    top: 50%;
    margin-top: -0.31rem;
    right: 0;
	background-image: url(../../assets/images/cashRewards/drop_up.png);
}
.cash_msg .dropped>p>em{
	background-image: url(../../assets/images/cashRewards/drop_down.png);
}
.cash_msg_cont{
	padding: 0.42rem 0.69rem;
	font-size: 0.39rem;
	color: #999999;
	line-height: 0.56rem;
}

</style>
