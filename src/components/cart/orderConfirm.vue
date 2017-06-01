<template>
    <div class="ordcfr-box">
        <div class="ordcfr-head">
            Order Confirm<em @click="closePopup"></em>
        </div>
        <div class="ordcfr-main">
        	<img src="../../assets/images/ordcfr-line.png">
        	<div style="clear:both;"></div>
        	<div class="ordcfr-title">
        		<span>Shipping Information</span>
        		<em class="em-ico"></em>
        	</div>
        	<div class="ordcfr-recive">
        		<div class="ordcfr-recive-person">
        			<em class="em-ico"></em>
        			<span class="ordcfr-recive-name">Ven</span>
        			<span class="ordcfr-recive-tel">0742 837 245</span>
        			<span class="ordcfr-recive-default">[Default]</span>
        		</div>
        		<div class="ordcfr-recive-addr">
        			<em class="em-ico"></em>
        			<span>Maecenas eu elit fringilla, sollicitudin magna eget, convallis tellus.</span>
        			<div style="clear:both;"></div>
        		</div>
        	</div>
        	<div class="payment">
        		<div class="payment-part">
        			<em class="em-ico"></em>
        			<div class="payment-box">
        				<p class="ordcfr-part-title">Online Payment</p>
        			</div>
        		</div>
        		<div class="payment-part">
        			<em class="em-ico checked"></em>
        			<div class="payment-box">
        				<p class="ordcfr-part-title">Pay on delivery</p>
        				<p class="payment-delivery-msg">Please verify your phone number to use Cash on Delivery payment option.</p>
        				<div class="ordcfr-input-box">
        					<input class="ordcfr-input" placeholder="Input phone no. e.g.0712654618" type="text" >
        					<div class="ordcfr-btn ordcfr-btn-grey">Send</div>
        				</div>
        				<div class="ordcfr-input-box">
        					<input style="width:3.61rem;" class="ordcfr-input" placeholder="Verification code" type="text">
        					<div class="ordcfr-btn ordcfr-btn-orange">Verify</div>
        				</div>
        			</div>
        		</div>
        	</div>
        	<div class="ordcfr-foot">
        		<div class="ordcfr-foot-left">
        			Total <span>KSh 2,239</span>
        		</div>
        		<div class="ordcfr-foot-btn">Confirm Order</div>
        	</div>
        </div>
    </div>
</template>
<script>
	export default {
	  methods:{
	  	closePopup:function(){
	  		this.$emit("closePopupEvent");

	  	}
	  }    
	     
	}
</script>
<style lang="less">
.ordcfr-head{
	padding: 0.39rem 0;
	text-align: center;
	font-size: 0.44rem;
	color: #FFFFFF;
	line-height: 0.56rem;
	em{
		display: inline-block;
		background-image: url(../../assets/images/ordcfr-close.png);
		width: 0.56rem;
		height: 0.56rem;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		vertical-align: middle;
		margin-left: 0.67rem;
	}
 }
 .ordcfr-main{
 	background-color: white; 
 	margin-bottom: 1.94rem;
 	img{
 		height: 0.14rem;
 		float: left
 	}
 	.ordcfr-title{
 		font-size: 0.33rem;
 		color: #7E7E7E;
 		height: 1.11rem;
 		line-height: 1.11rem;
 		padding: 0 0.56rem;
 		em{
 			float: right;
 			width: 0.61rem;
 			height: 0.61rem;
 			background-image: url(../../assets/images/help-arrow-right.png);
 			margin-top: 0.25rem;
 		}
 	}
 	.ordcfr-recive{
 		padding: 0.39rem 0.56rem;
 		background-color:#F3F5F9;
 		font-size: 0.39rem;
 		color: #150000;
 		.ordcfr-recive-person{
			font-weight: bold;
			margin-bottom: 0.28rem;
			em{
				width:0.44rem;
				height: 0.56rem;
	 			background-image: url(../../assets/images/ordcfr-person.png);
	 			vertical-align: middle;
	 			margin-right: 0.22rem;
			}
			.ordcfr-recive-default{
				font-weight: normal;
				color: #E4C187;
				float: right;
			}
 		}
 		.ordcfr-recive-addr{
 			line-height: 0.5rem;
 			em{
 				width:0.44rem;
	 			height: 0.53rem;
	 			background-image: url(../../assets/images/ordcfr-addr.png);
	 			vertical-align: middle;
	 			margin-right: 0.22rem;
	 			position: absolute;
 			}
 			span{
 				display: inline-block;
 				margin-left: 0.7rem;
 				float: left;
 				word-wrap: break-word;
 			}
 		}
 	}
 	.ordcfr-foot{
 		padding: 0.42rem 0.28rem;
 		box-shadow: 0 -0.06rem 0.22rem 0 rgba(0,0,0,0.11);
 		position: fixed;
 		bottom: 0;
 		right: 0;
 		left: 0;
 		background: white;
 		.ordcfr-foot-btn{
 			width: 4.72rem;
 			height: 1.11rem;
 			background: #D0D3D9;
			border-radius: 0.03rem;
			text-align: center;
			color: white;
			font-weight: bold;
			font-size: 0.44rem;
			float: right;
			line-height: 1.11rem;
 		}
 		.ordcfr-foot-left{
 			float: left;
 			font-size: 0.33rem;
 			color: #C4C8D2;
 			margin-left: 0.28rem;
 			margin-top: 0.22rem;
 			margin-bottom: 0.22rem;
 			span{
 				font-size: 0.5rem;
				color: #F87622;
				margin-left: 0.1rem;	
 			}
 		}
 	}
 	.payment{
		.payment-part{
			padding: 0.42rem 0.56rem;
			position: relative;
			em{
				width: 0.56rem;
				height: 0.56rem;
				background-color: #F3F5F9;
				border: 1px solid #DDDFE4;
				border-radius: 50%;
				box-sizing: border-box;
				position: absolute;
			}
			em.checked{
				background-image:url(../../assets/images/checked-ico.png);
			}
			.payment-box{
				margin-left: 0.83rem;
				.ordcfr-part-title{
					font-size: 0.39rem;
					color: #150000;
					margin-bottom: 0.19rem;
				}
				.payment-delivery-msg{
					font-size: 0.33rem;
					color: #C4C8D2;
				}
				.ordcfr-input-box{
					margin-top: 0.42rem;
					.ordcfr-input{
						border: none;
						height: 0.94rem;
						line-height: 0.94rem;
						background: #F3F5F9;
						border:1px solid #9FA5B1;
						border-radius: 0.03rem;
						padding: 0 0.36rem;
						color: #150000;
						box-sizing: border-box;
					}
					.ordcfr-btn{
						display: inline-block;
						padding: 0 0.56rem;
						height: 0.94rem;
						text-align: center;
						font-size: 0.39rem;
						color: #FFFFFF;
						font-weight: bold;
						line-height: 0.94rem;
						border-radius: 0.03rem;
					}
					.ordcfr-btn-grey{
						background-color: #D0D3D9;
					}
					.ordcfr-btn-orange{
						background-color:  #EBD0A8;
					}
				}
			}
		}
 	}

 }

</style>