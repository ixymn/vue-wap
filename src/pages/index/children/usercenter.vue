<template>
	<div class="userCenter">
		
		<div class="uc-info">
           
			<div class="uc-info-set">
				<router-link to="/help"><em class="uc-qa-ico em-ico"></em></router-link>
				<router-link to="/setting"><em class="uc-set-ico em-ico"></em></router-link>
			</div>

			<div class="uc-info-box clearfix">
				<div class="uc-info-left" v-if="isLogin">
					<em class="uc-photo em-ico" ></em>
					<p class="uc-username">{{ memberInfo.user_name }}</p>
				</div>
    			
                <div class="uc-info-left" @click="goLogin"  v-else >
                    <em class="uc-photo em-ico">Log in</em>
                </div>

				<div class="uc-info-right">
					<p v-if="isLogin" class="uc-amount" @click="linkPage('/cashRewards')"><em class="uc-dollar-ico em-ico"></em>{{ site.currency }} {{ memberInfo.point }}<em class="uc-amount-more-ico em-ico"></em></p>
					<router-link to="/mobileSignUp" v-else>
					<p class="uc-sign-up">Sign up</p>
					</router-link>
				</div>
			</div>
		</div>
		<div class="uc-nav-item">
			<div class="uc-item-title" @click="linkPage('/order')">My Orders<span>more<em class="em-ico"></em></span></div>
			<div class="uc-item-box clearfix">
				<dl class="uc-item-part" @click="linkOrder(1)">
					<dt class="uc-order1">
						<b class="uc-brand" v-show="memberInfo.order_nopay_count!=0">{{memberInfo.order_nopay_count>99?'..':memberInfo.order_nopay_count}}</b>
					</dt>
					<dd>Pending payment</dd>
				</dl>
				<dl class="uc-item-part" @click="linkOrder(2)">
					<dt class="uc-order2">
						<b class="uc-brand" v-show="memberInfo.order_pay_count!=0">{{ memberInfo.order_pay_count>99?'..':memberInfo.order_pay_count}}</b>
					</dt>
					<dd>In transit</dd>
				</dl>
				
			</div>
		</div>
		<div class="uc-nav-item">
			<div class="uc-item-title" @click="linkPage('/cashRewards')">Cash Rewards<span>more<em class="em-ico"></em></span></div>
			<div class="uc-item-box clearfix">

				<!-- <dl class="uc-item-part">
					<dt class="uc-cash1">
					</dt>
					<dd>Daily Bonus</dd>
				</dl> -->
				<!-- <dl class="uc-item-part">
					<dt class="uc-cash2">
					</dt>
					<dd>Earn Cash Rewards</dd>
				</dl> -->
				<dl class="uc-item-part" @click="linkPage('/invitFriends')">
					<dt class="uc-cash3">
					</dt>
					<dd>Invite Friends</dd>
				</dl>
			</div>
		</div>
		<div class="uc-nav-item">
			<div class="uc-item-title">Favorite</div>
			<div class="uc-item-box clearfix">
				
				<dl class="uc-item-part" @click="linkPage('/fav')">
					<dt class="uc-fav1">
					</dt>
					<dd>Wish List</dd>
				</dl>
				<dl class="uc-item-part"@click="linkPage('/savedShops')">
					<dt class="uc-fav2">
					</dt>
					<dd>Saved Store</dd>
				</dl>
				<dl class="uc-item-part" @click="linkPage('/history')">
					<dt class="uc-fav3">
					</dt>
					<dd>History View</dd>
				</dl>
			</div>
		</div>
		<div class="uc-nav-item">
			<router-link to="/setting"><div class="uc-item-title" >Settings<span>more<em class="em-ico"></em></span></div></router-link>
			<div class="uc-item-box clearfix">
				<dl class="uc-item-part" @click="linkAddr">
					<dt class="uc-set1">
					</dt>
					<dd>Address</dd>
				</dl>
				<dl class="uc-item-part" @click="linkVerifyPhone">
					<dt class="uc-set2">
					</dt>
					<dd>Verify Phone</dd>
				</dl>
				<!-- <dl class="uc-item-part">
						<dt class="uc-set3">
						</dt>
						<dd>Persional Info</dd>
					</dl> -->
			</div>
		</div>

		
	</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'usercenter',
  data(){
    return {
      	isLogin:0,
		memberInfo:{
			avator:"",
			point:0,
			user_name:"",
			order_pay_count:0,
			order_nopay_count:0,
		},
    }
  },
  computed: {
    ...mapState([
       'site','loginInfo'
    ]),

  },
  watch:{
  },
  methods:{
    ...mapMutations([
    	'BACK_CART_ADDR','BACK_ORDER','STORE_LOGIN_INFO','ORDER_TAB_INDEX'
    ]),
    linkPage:function(url){
    	if(common.getCookie('key')){
    		this.$router.push(url);
    	}else{
    		this.goLogin();
    	}
    },
    linkOrder:function(index){
    	if(common.getCookie('key')){
    		this.ORDER_TAB_INDEX(index);
    		this.BACK_ORDER('/usercenter');
    		this.$router.push('/order');
    	}else{
    		this.goLogin();
    	}
    },
    linkAddr:function(){
    	if(common.getCookie('key')){
    		this.BACK_CART_ADDR(this.$route.path);
    		this.$router.push("/address");
    	}else{
    		this.goLogin();
    	}
    },
	async ckecklogin(){
		let a = await common.checkLogin();
		this.STORE_LOGIN_INFO(a)
		
		if(this.loginInfo.code == "200"){
			this.isLogin = 1;
			this.memberInfo = this.loginInfo.datas.member_info;
		}
	},
	goLogin(){
		common.setCookie("redirect_url",this.$route.path);
		this.$router.push('/login');
		//common.goLogin(this.$router);
	},
	linkVerifyPhone(){
		if(common.getCookie('key')){
    		//已绑定手机
    		if(this.loginInfo.datas.member_info.member_mobile_bind == "1"){
    			this.$toast({
    				message:"Already verified: "+this.loginInfo.datas.member_info.member_mobile,
    				position:'bottom',
    			});
    		}else{//未绑定，跳转绑定页面
    			this.$router.push("/verifyPhone");
    		}
    	}else{
    		this.goLogin();
    	}
	},

  },
	created(){
		this.ckecklogin();
	},
  mounted(){
		this.ckecklogin();
  }
}
</script>
<style lang="less">
.userCenter{
	.uc-nav-item{
		background-color: white;
		margin-bottom: 0.28rem;
		.uc-item-title{
			height: 1.22rem;
			line-height: 1.22rem;
			padding:0 0.42rem;
			font-size: 0.39rem;
			color: #150000;
			font-weight: bold;
			border-bottom: 1px solid #DDE0E4;
			span{
				float: right;
				font-weight: normal;
				color: #999999;
				em{
					width: 0.39rem;
					height: 0.39rem;
					float: right;
					margin-top: 0.43rem;
					margin-left: 0.14rem;
					background-image:url(../../../assets/images/userCenter/uc_more_ico.png);
				}
			}

		}
		.uc-item-box{
			.uc-item-part{
				width: 33%;
				float: left;
				height: 2.75rem;
				text-align: center;
				padding-top: 0.56rem;
				box-sizing: border-box;
				dt{
					width: 0.72rem;
					height: 0.72rem;
					background-size: 100%;
					background-repeat:no-repeat;
					background-position: center center;
					display: block;
					margin:auto;
					position: relative;
					.uc-brand{
						position: absolute;
					    top: -.2rem;
					    right: -.2rem;
					    display: block;
					    border-radius: 50%;
					    width: .50rem;
					    height: .50rem;
					    line-height: .5rem;
					    background: #f87622;
					    border: 0.06rem solid #fff;
					    font-size: .3rem;
					    font-weight: 400;
					    color: #fff;
					    text-align: center;
					    vertical-align: middle;
					}
					
					
				}
				.uc-order1{
					background-image:url(../../../assets/images/userCenter/uc_order1.png);
				}
				.uc-order2{
					background-image:url(../../../assets/images/userCenter/uc_order2.png);
				}
				.uc-cash1{
					background-image:url(../../../assets/images/userCenter/uc_cash1.png);
				}
				.uc-cash2{
					background-image:url(../../../assets/images/userCenter/uc_cash2.png);
				}
				.uc-cash3{
					background-image:url(../../../assets/images/userCenter/uc_cash3.png);
				}
				.uc-fav1{
					background-image:url(../../../assets/images/userCenter/uc_fav1.png);
				}
				.uc-fav2{
					background-image:url(../../../assets/images/userCenter/uc_fav2.png);
				}
				.uc-fav3{
					background-image:url(../../../assets/images/userCenter/uc_fav3.png);
				}
				.uc-set1{
					background-image:url(../../../assets/images/userCenter/uc_set1.png);
				}
				.uc-set2{
					background-image:url(../../../assets/images/userCenter/uc_set2.png);
				}
				.uc-set3{
					background-image:url(../../../assets/images/userCenter/uc_set3.png);
				}
				
				dd{
					margin-top: 0.28rem;
					font-size: 0.33rem;
					line-height: 0.33rem;
					color: #666666;
					width: 1.58rem;
					text-align: center;
					margin:0.28rem auto 0 auto;
				}
			}
		}
	}
}

.uc-info{
	height: 3.06rem;
	background-image: url(../../../assets/images/userCenter/user_bg.png);
	background-size:100%;
	background-repeat: no-repeat;
	margin-bottom: 0.28rem;
	.uc-info-set{
		height: 0.97rem;
		text-align: right;
		em{
			width: 0.56rem;
			height: 0.56rem;
			margin-top: 0.42rem;
		}
		.uc-set-ico{
			background-image: url(../../../assets/images/userCenter/uc_set.png);
			margin-left: 0.69rem;
			margin-right: 0.42rem;
		}
		.uc-qa-ico{
			background-image: url(../../../assets/images/userCenter/uc_qa.png);
		}
	}
	.uc-info-box{
		height: 1.67rem;
		.uc-info-left{
			margin-left:0.42rem;
			float: left;
			em{
				width: 1.67rem;
				height: 1.67rem;
				box-sizing: border-box;
				border-radius: 50%;
				border: 0.09rem solid white;
				background-image: url(../../../assets/images/userCenter/user_photo.png);
				background-size: 105% 105%;
				vertical-align: middle;
				font-size: 0.39rem;
				font-weight: bold;
				text-align: center;
				color: #FFFFFF;
				line-height: 1.53rem;
			}
			.uc-username{
				display: inline-block;
				font-size: 0.39rem;
				color: white;
				vertical-align: middle;
				margin-left: 0.28rem;
			}
		}
		.uc-info-right{
			float: right;
			margin-top: 0.45rem;
			.uc-sign-up{
				width: 2.08rem;
				height: 0.78rem;
				text-align: center;
				line-height: 0.78rem;
				box-sizing: border-box;
				border: 2px solid rgba(255,255,255,0.50);
				border-radius: 1.39rem;
				color:white;
				margin-right: 0.42rem;
				margin-top: 0.42rem;
			}
			.uc-amount{
				background-image: linear-gradient(-90deg, #FF5600 0%, #FF8500 100%);
				border-radius: 1.39rem 0 0 1.39rem;
				width: auto;
				height: 0.81rem;
				font-size: 0.33rem;
				color: white;
				vertical-align: middle;
				display: table-cell;
				em.uc-amount-more-ico{
					background-image: url(../../../assets/images/userCenter/cash_amount_ico.png);
					width: 0.33rem;
					height: 0.33rem;
					margin-right: 0.28rem;
					vertical-align: middle;
					margin-left: 0.28rem;
				}
				em.uc-dollar-ico{
					background-image: url(../../../assets/images/userCenter/uc_dollar_ico.png);
					width: 0.47rem;
					height: 0.47rem;
					vertical-align: middle;
					margin-left: 0.17rem;
					margin-right: 0.14rem;
				}
			}
			
		}
	}
}

</style>
