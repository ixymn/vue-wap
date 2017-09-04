<template>
	<div class="flash-box">
		<HEADBACK headTitle="Flash Sale" @goBackEvent="goBack" :isDiyBack="1"></HEADBACK>
		<ul class="flash-nav clearfix" v-show="isShow">
	        <li :class="{focus:tabIndex==index}" @click="focusFlashTime(index)" v-for="(item,index) in timeState[timeStateIndex]">
	        	<p>{{flashData.length?flashData[index].begin:''}}</p>
	        	<p>{{item}}</p>
	        </li>
	        
	     </ul>
		<div class="flash-main" v-show="isShow">
		     <dl class="flash-good-box" @click="linkGood(item.goods_id)" v-for="item in flashData.length?flashData[tabIndex].goods_list:[]">
		     	<dt class="flash-image" >
		     		<em class="em-ico" :style="'background-image:url('+item.goods_image+')'"></em>
		     	</dt>
		     	<dd class="flash-msg">
		     		<section>{{item.goods_name}}</section>
		     		<p class="clearfix"><span class="flash-tag">Flash Price</span><em class="flash-discount">{{item.goods_scale}}%off</em></p>
		     		<p class="clearfix"><span class="flash-price">{{currencyUnit}} {{item.flash_price}}</span><em class="flash-storage" :class="timeState[timeStateIndex][tabIndex]!='On Going'?'invalid':item.last_storage<=0?'invalid':''">{{item.last_storage>0?'Grab It':'Sold Out'}}</em></p>
		     	</dd>
		     </dl>

		</div>
	</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {getFlashData} from '../../service/getData';
import Head from '../../components/common/headerBack.vue';
import ScrollLoad from '../../components/common/scrollLoadIco.vue';
export default {
	data:function(){
		return({
			isShow:0,
			nowTime:'',
			timeStateIndex:0,
			tabIndex:0,
			flashData:[],
			timeState:[
				["Coming Up","Coming Up","Coming Up","Coming Up"],
				["On Going","Next","Coming Up","Coming Up"],
				["Over","On Going","Next","Coming Up"],
				["Over","Over","On Going","Next"],
				["Over","Over","Over","On Going"],
			],
			setTimeHandler:null,
		});
	},
	computed:{
		currencyUnit:function(){
			return this.$store.state.site.currency;
		}
	},
	components:{
		"HEADBACK":Head
	},
	watch:{
		nowTime:function(){
			
			for(var i in this.flashData){
				
				if(this.nowTime>=this.flashData[i].begin_stamp && this.nowTime<this.flashData[i].end_stamp){
					this.timeStateIndex=parseInt(i)+1;
					
					break;
				}
			}
			
		}
	},
	created:function(){
		this.getData();
	},
	mounted:function(){
		
	},
	beforeDestroy:function(){
	    if(this.setTimeHandler){
	      clearInterval(this.setTimeHandler);
	      this.setTimeHandler=null;
	    }
	},
	methods:{
		goBack:function(){
			this.$router.push("/home");
		},
		getData:async function(){
			this.$indicator.open();
			let res = await getFlashData();

			if(res.code == "200"){
				this.flashData=res.datas;
				this.nowTime=this.flashData[0].now_stamp;
				//this.nowTime=1501648185;
				//重服务器获取时间开始监测
				this.timerFlash();
				//进入页面，分页是在ongoing栏
				for(var i in this.flashData){
					if(this.flashData[i].is_show == 1){
						this.tabIndex=i;
					}
				}
				this.isShow=1;
				this.$indicator.close();
			}else if(res.code == "444"){
				this.$indicator.close();
				this.$toast(res.datas.error);
			}else{
				this.$indicator.close();
				this.$toast("error");
			}
		},
		focusFlashTime:function(index){
			this.tabIndex=index;
		},
		timerFlash:function(){
			var that = this;
			this.setTimeHandler=setInterval(function(){
				that.nowTime=that.nowTime+1;
				//console.log(that.nowTime+"===="+this.setTimeHandler);
				if(that.nowTime>this.flashData[this.flashData.length-1].end_stamp){
					clearInterval(this.setTimeHandler);
	    			this.setTimeHandler=null;
	    			this.getData();
				}
			}.bind(that),1000);
		},
		linkGood:function(goodsId){
			this.$router.push("/goods/"+goodsId);
		}
	},

}
  
</script>

<style lang="less">

ul.flash-nav{
	    z-index: 2;
		position: fixed;
		top: 1.33rem;
		right: 0;
		left: 0;
		border-bottom: 1px solid #DDDFE4;
		background-color: white;
		li{
			width: 25%;
			display: inline-block;
			text-align: center;
			color: #7E7E7E;
			float: left;
			box-sizing: border-box;
			position: relative;
			border-bottom: 0.08rem solid white;
			p:nth-child(1){
				margin-top: 0.14rem;
				font-size: 0.44rem;
			}
			p:nth-child(2){
				font-size:0.28rem;
				margin-bottom: 0.14rem;
			}
		}
		li.focus{
			border-bottom-color:#f87622;
			color: #f87622;
		}
		
	}
.flash-main{
	    margin-top: 2.6rem;
	    dl.flash-good-box{
	    	padding: 0.56rem 0.28rem;
	    	border-bottom: .03rem solid #eff0f3;
	    	background-color: white;
	    	position: relative;
	    	min-height: 2.78rem;
			dt.flash-image{
				position: absolute;
				top: 0.56rem;
				left: 0.28rem;
				em{
					width: 2.78rem;
					height: 2.78rem;
					background-size: contain;
				}
			}
			dd.flash-msg{
				margin-left: 3.06rem;
				section{
					font-size: 0.33rem;
					line-height: 0.44rem;
					height: 0.89rem;
					overflow: hidden;
				}
				.flash-tag{
					float: left;
					font-size: 0.39rem;
					margin-top: 0.28rem;
				}
				.flash-discount{
					margin-top: 0.28rem;
					float: right;
					font-size: 0.33rem;
					display: inline-block;
					padding: 0 0.14rem;
					background-color:#f5b807;
					color:white; 
				}
				
				.flash-price{
					margin-top: 0.28rem;
					float: left;
					color:#f87622;
					font-size: 0.5rem;
				}
				.flash-storage{
					margin-top: 0.28rem;
					float: right;
					background-color: #f87622;
					color: white;
					padding: 0.06rem 0.28rem;
					border-radius: 0.06rem;
					font-size: 0.39rem;
				}
				.invalid{
					background-color: #d9d9d9;
				}
			}
	    }
}

</style>
