<template>
	<div class="invite-friends">
		<HEADBACK headTitle="Invite Friends"></HEADBACK>
		<div class="ivtf-main">
			<div class="inviteF_top">
				<div class="inviteF_code">
				</div>
				<div class="inviteF_code_text">
					<p>Your referral code is</p>
					<p>{{invitCode}}</p>
				</div>
				
			</div>
			<div class="inviteF_msg">
				<div class="inviteF_btn" @click="showShareDialog">Invite Friends</div>
				<div class="inviteF_msg_title">
					Invite your friends to join Kilimall and get Kilimall's cash rewards.
				</div>
				<div class="inviteF_msg_txt">
					<p>The procedure is as follows:</p>
	                <p><span>1.</span> <span>Click the "invite friends now" button and share your invitation code to Facebook, Whatsapp, phone contacts and so on.</span></p>
	                <p><span>2.</span> <span>Your friend joins Kilimall using your invitation code.</span></p>
	                <p><span>3.</span> <span>Once your friend has registered and verified their phone number, both of you will get Kilimall cash rewards.</span></p>
	                <p><span>4.</span> <span>The more friends you invite to join Kilimall, the more cash rewards you will receive</span></p>
	                <p><span>5.</span> <span>Kilimall reserves the right to file lawsuits for any illegal or malicious means used to defraud Kilimall cash rewards.</span></p>
				</div>
			</div>
			<div class="inviteF_link">
				<router-link to="/cashRewards"><a href="javascript:;">My Cash Rewards</a></router-link>
			</div>
		</div>
		<mt-popup style="width:100%;" v-model="popupVisible"  popup-transition="popup-fade">
  			<SHARE @hideShareEvent="hideShareDialog" shareObject="code" :inviteCode="invitCode"/>
		</mt-popup>
	</div>
</template>

<script>
import {getInviteCode} from '../../service/getData'
import Head from '../../components/common/headerBack.vue';
import Share from '../../components/common/Share.vue';

export default {
	data:function(){
		return({
			popupVisible:false,
			invitCode:'',
		});
	},
	components:{
		"HEADBACK":Head,
		"SHARE":Share,
	},
	mounted:function(){
		if(!common.getCookie("key")){
			common.goLogin(this.$router);
			return;
		}
		this.initData();
	},
	methods:{
		initData:async function(){
			let res=await getInviteCode({"key":common.getCookie("key")});
			if(res.code == "200"){
				this.invitCode=res.datas.code;
			}else if(res.code == "444"){
				this.$toast(res.datas.error);
			}else{
				this.$toast("error");
			}
		},
		showShareDialog:function(){
			this.popupVisible=true;
		},
		hideShareDialog:function(){
			this.popupVisible=false;
		}
	},
}
</script>
<style lang="less">
.invite-friends{
	.ivtf-main{
		margin-top: 1.33rem;
		.inviteF_top{
			position: relative;
			height:4.39rem;
			background-color: #fff;
			overflow: auto;
		}
		.inviteF_code{
			position: relative;
			width: 8.0rem;
			height: 2.39rem;
			padding-top: 0.97rem;
			margin-top: 0.44rem;
			margin-left: 1.31rem;
			background-image: url(../../assets/images/cashRewards/code_bg.png);
			background-repeat: no-repeat;
			background-position: center;
			background-size: contain;
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
		.inviteF_msg{
			padding:0.56rem 0.5rem;
			margin-top: 0.28rem;
			background-color: #fff;
			position: relative;
		}
		.inviteF_btn{
			position: absolute;
			width: 5.14rem;
			height: 1.11rem;
			background-color:#424040;
			border-radius: 0.03rem;
			font-size: 0.44rem;
			color: #FFFFFF;
			line-height: 1.11rem;
			text-align: center;
			top: -0.86rem;
			left: 2.44rem;
			border-radius: 0.06rem;
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
		.inviteF_msg_txt>p:after{
			display: block;
			content: "";
			clear: both;

		}
		.inviteF_msg_txt>p{
			position: relative;
		}
		.inviteF_msg_txt>p>span{
			font-size: 0.33rem;
		}
		.inviteF_msg_txt>p>span:nth-child(1){
			width: 0.56rem;
			vertical-align: top;
			position: absolute;
			top: 0;
			left: 0;
		}
		.inviteF_msg_txt>p>span:nth-child(2){
			display: inline-block;	
			padding-left: 0.56rem;

		}
		.inviteF_link{
			margin: 0.6rem 0;
			text-align: center;
		}
		.inviteF_link a{
			font-size: 0.39rem;
			letter-spacing: -0.01rem;
			color: #F87622;
			text-decoration: underline;
		}
	}
	

}

</style>
