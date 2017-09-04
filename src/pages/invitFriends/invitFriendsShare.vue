<template>
	<div class="invite-friends">
		
		<div class="cash_main" :class="{'cash_main1':!isShow}">
	        <div class="inviteF_top" id="cash_code_box" style="height: auto;">
	            <div class="inviteF_code1">
	            </div>
	            <div class="inviteF_code_text">
	                <p >Referral Code</p>
	                <p id="inviteF_code_p">{{invitCode}}</p>
	            </div>
	        </div>

	        <div class="inviteF_msg" >
	            
	            <div class="inviteF_msg_wt1000">
	                <div class="inviteF_msg_title">
	                    Use the referral code to join Kilimall and get Kilimall's Cash Rewards.
	                </div>
	                <div class="inviteF_msg_txt">
	                    <p>The procedure is as follows:</p>

	                    <p><span>1.</span> <span>Download and install Kilimall APP.</span></p>
	                    <p><span>2.</span> <span>Sign up for a Kilimall account.</span></p>
	                    <p><span>3.</span> <span>Verify your phone no. and input the referral code.</span></p>
	                    <p><span>4.</span> <span>Once you have registered and verified your phone number, you will get Kilimall Cash Rewards.</span></p>
	                    <p><span>5.</span> <span>You will have your own referral code created with your account, which you can share to your friends, enabling both you & them get Kilimall Cash Rewards.</span></p>
	                    <p><span>6.</span> <span>Kilimall reserves the right to file lawsuits for any illegal or malicious means used to defraud Kilimall cash rewards.</span></p>
	                </div>
	            </div>
	        </div>
	       
		</div>
	    <div class="inviteF_bot" v-show="isShow">
	        <div class="inviteF_bot_bg"></div>
	        <em class="inviteF_bot_close" @click="closeBotMask"></em>
	        <div class="inviteF_bot_con">
	            <div class="inviteF_bot_left">
	                <div class="inviteF_app_logo"></div>
	                <p>Download APP to get Cash Rewards now</p>
	            </div>
	            <div class="inviteF_bot_right">
	                <em @click="linkDownUrl(googleUrl)"></em>
	                <em @click="linkDownUrl(palmUrl)"></em>
	            </div>
	        </div>
	    </div>
	</div>
		
</template>

<script>

export default {
	data:function(){
		return({
			invitCode:'',
			isShow:true,
			googleUrl:'https://play.google.com/store/apps/details?id=net.kilimall.shop',
			palmUrl:'https://goo.gl/wKOFa9',
		});
	},
	
	mounted:function(){
		
		this.invitCode=this.$route.params.code;
	},
	methods:{
		closeBotMask:function(){
			this.isShow=false;
		},
		linkDownUrl:function(url){
			window.open(url);
		},
	},
}
</script>
<style>

.inviteF_top{
	position: relative;
	height:4.39rem;
	background-color: #fff;
	overflow: auto;
}
.cash_main{
	background-color: #f5f5f5;
	margin-bottom: 3.33rem;
}
.cash_main1{
	margin-bottom: 0;
}
.inviteF_msg{
	padding:0.56rem 0.5rem;
	margin-top: 0.28rem;
	background-color: #fff;
	position: relative;
}
.inviteF_msg_title{
	font-size: 0.39rem;
	color: #150000;
	line-height: 0.5rem;
}
.inviteF_msg_txt{
	margin: 0.36rem auto 0 auto;
	font-size: 0.39rem;
	line-height: 0.54rem;
	color: #999999;
}
.inviteF_code_text{
	text-align: center;
	position: absolute;
	top: 1.5rem;
	left: 0;
	bottom: 0;
	right: 0;
}
.inviteF_code_text>p:nth-child(1){
	font-size: 0.33rem;
	color: #150000;
}
.inviteF_code_text>p:nth-child(2){
	font-size:0.5rem;
	color:#F87622;
	letter-spacing: -0.01rem;
	font-weight: bold;
	margin-top: 0.2rem;
}
/*ivite friends share*/
.inviteF_code1{
	position: relative;
	width: 5.11rem;
	height: 1.81rem;
	padding-top: 0.97rem;
	margin:0.44rem auto;
	background-image: url(../../assets/images/cashRewards/code_bg_share.png);
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
}
.inviteF_bot{
	position: fixed;
	bottom: 0;
	width: 100%;
	height:3.33rem;
	background-color: #3f3f3f;
	text-align: center;
}
.inviteF_bot_bg{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 2.89rem;
	height: 2.78rem;
	background-image: url(../../assets/images/cashRewards/invite_bot_bg.png);
	background-repeat: no-repeat;
	background-position: center;
	background-size: 100% 100%;
}
.inviteF_bot_con{
	display: inline-block;
	margin: 0.58rem auto;
}
.inviteF_bot_left{
	float: left;
}
.inviteF_app_logo{
	width: 1.67rem;
	height: 1.67rem;
	margin: auto;
	background-image: url(../../assets/images/cashRewards/app_logo.png);
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.inviteF_bot_left>p{
	display: inline-block;
	width: 3.42rem;
	color: white;
	line-height: 0.36rem;
	font-size: 0.33rem;
	margin-top: 0.17rem;
	text-align: left;
}
.inviteF_bot_right{
	float: right;
	margin-left: 0.2rem;
}
.inviteF_bot_right>em{
	display: block;
	width: 2.97rem;
	height: 0.89rem;
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
.inviteF_bot_right>em:first-child{
	background-image: url(../../assets/images/cashRewards/app_store_google.png);
}
.inviteF_bot_right>em:last-child{
	background-image: url(../../assets/images/cashRewards/app_store_palmplay.png);
	margin-top: 0.42rem;
}
.inviteF_bot_close{
	display: block;
	width: 0.56rem;
	height:0.56rem;
	background-image: url(../../assets/images/cashRewards/app_down_close.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	position: absolute;
	top: 0.25rem;
	right: 0.25rem;
}



</style>
