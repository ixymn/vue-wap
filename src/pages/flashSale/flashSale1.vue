<template>
	<div class="flash-box">
		<HEADBACK headTitle="Flash Sale" ></HEADBACK>
		<ul class="flash-nav clearfix">
	        <li :class="{focus:tabIndex==index}" @click="focusFlashTime(index)" v-for="(item,index) in timeState[timeStateIndex]">
	        	<p>{{index==0?"10:30":index==1?"12:30":index==2?"16:30":index==3?"20:30":""}}</p>
	        	<p>{{item}}</p>
	        </li>
	        
	     </ul>
		<div class="flash-main">
		     
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
			nowTime:'',
			nowDate:'',
			timeStateIndex:0,
			tabIndex:0,
			timeState:[
				["Coming Up","Coming Up","Coming Up","Coming Up"],
				["On Going","Next","Coming Up","Coming Up"],
				["Over","On Going","Next","Coming Up"],
				["Over","Over","On Going","Next"],
				["Over","Over","Over","On Going"],
			]
		});
	},
	computed:{
		...mapState(['flashSales']),
		timePeriod:function(){
			return([
				{"start":Date.parse(this.nowDate+" 00:00:00"),"end":Date.parse(this.nowDate+" 10:29:59")},
				{"start":Date.parse(this.nowDate+" 10:30:00"),"end":Date.parse(this.nowDate+" 12:29:59")},
				{"start":Date.parse(this.nowDate+" 12:30:00"),"end":Date.parse(this.nowDate+" 16:29:59")},
				{"start":Date.parse(this.nowDate+" 16:30:00"),"end":Date.parse(this.nowDate+" 20:29:59")},
				{"start":Date.parse(this.nowDate+" 20:30:00"),"end":Date.parse(this.nowDate+" 23:59:59")},
			]);
		}
	},
	components:{
		"HEADBACK":Head
	},
	watch:{
		nowTime:function(){
			console.log(this.nowTime);
			console.log("每秒执行"+this.nowDate+"-"+ new Date().getTime());

			for(var i in this.timePeriod){
				if(this.nowTime>=this.timePeriod[i].start && this.nowTime<=this.timePeriod[i].end){
					this.timeStateIndex=i;
					break;
				}
			}
		}
	},
	created:function(){
		this.timerFlash();
	},
	mounted:function(){
		this.tabIndex=this.timeStateIndex==0?1:this.timeStateIndex;
	},
	methods:{
		focusFlashTime:function(index){
			this.tabIndex=index;
		},
		timerFlash:function(){
			var that = this;
			var setTimeHandler=setInterval(function(){
				that.nowTime=new Date().getTime();
				that.nowDate=that.formatTime(new Date(),"yyyy/MM/dd");
			}.bind(that),1000);
		},
		
		formatTime:function(tmpTime,fmt){
			var o = { 
		        "M+" : tmpTime.getMonth()+1,                 //月份 
		        "d+" : tmpTime.getDate(),                    //日 
		        "h+" : tmpTime.getHours(),                   //小时 
		        "m+" : tmpTime.getMinutes(),                 //分 
		        "s+" : tmpTime.getSeconds(),                 //秒 
		        "q+" : Math.floor((tmpTime.getMonth()+3)/3), //季度 
		        "S"  : tmpTime.getMilliseconds()             //毫秒 
		    }; 
		    if(/(y+)/.test(fmt)) {
		            fmt=fmt.replace(RegExp.$1, (tmpTime.getFullYear()+"").substr(4 - RegExp.$1.length)); 
		    }
		     for(var k in o) {
		        if(new RegExp("("+ k +")").test(fmt)){
		             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
		         }
		     }
		    return fmt; 
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
	    margin-top: 3rem;
}

</style>
