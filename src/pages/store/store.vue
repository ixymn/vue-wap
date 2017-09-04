<script>
import {mapState, mapMutations} from 'vuex'
import {getStoreFilter,collectStore,cancelCollectStore} from '../../service/getData'
import headerBack from '../../components/common/headerBack.vue'
import storeSearch from './storeSearch'
// import goStoreSearch from './goStoreSearch'
import '../../utils/common.js';

export default {
	data:function(){
		return{

			// /index.php?act=store&op=store_info&store_id=547&key=6003269f4ac80a1a71b237085bd62219
			storeData:[],
			storeInfo:{},
			turnOn:true,
			curpage:1,
			page:10,
			store_id:this.$route.params.id,
			filterdata:[],
			scrollSwitch:false,
			loadMoreSwtich:true,
			filterStr:'Default',
			searchWord:'',
			defaultOtherShow:false,
			popupVisible:false,
			popupVisible2:false,
			deOrSales:0,
			firstTimeFilter:true,
			goSearchShopId:'',
			keyWord:'',
			baseUrl:'/index.php?act=store&op=store_info'
		}
	},
	computed:{
		...mapState([
      "isAndroid"
    ]),
		currency(){
			return this.$store.state.site.currency;
		},
		collectParams(){
			return{
				store_id:this.store_id,
				key:common.getCookie('key')
			}
		}
	},
	created(){
		this.initData();
	},
	components:{
		'headerBack':headerBack,
		'storeSearch':storeSearch,

	},
	methods:{
		async initData(){
			var data = {
				key:common.getCookie("key")?common.getCookie("key"):'',
				store_id:this.store_id
			}

			var url = this.baseUrl+'&store_id='+data.store_id+'&key='+data.key;

	  		var newData  = (await getStoreFilter(url));

	  		this.storeData = newData.datas.rec_goods_list;
	  		this.storeInfo = newData.datas.store_info;

    	},
		async doCollect(){
			this.$indicator.open({
                text: 'Process...',
                spinnerType: 'fading-circle'
            });
	  		var newData  = (await collectStore(this.collectParams));
	  		if(newData.datas==1){

	  			var THIS = this
	  			this.initData().then(function(){
	  				THIS.$indicator.close()
					THIS.$toast({
	                    message:'Saved',
	                    duration: 2000
	                })
	            });
	  		}else{
	  			this.$toast({
                    message:'process failed',
                    duration: 2000
                });
	  		}

    	},
		async cancelCollect(){
			this.$indicator.open({
                text: 'Process...',
                spinnerType: 'fading-circle'
            });
	  		var newData  = (await cancelCollectStore(this.collectParams));
	  		if(newData.datas==1){

	  			var THIS = this
	  			this.initData().then(function(){
	  				THIS.$indicator.close()
					THIS.$toast({
	                    message:'Cancelled',
	                    duration: 2000
	                });
				})
	  		}else{
	  			this.$toast({
                    message:'process failed',
                    duration: 2000
                });
	  		}

    	},
    	hideSearch(){
    		this.popupVisible = false;
    	},
    	hideGoSearch(){
    		this.popupVisible = true;
    		this.popupVisible2 = false;
    	},
    	goSearch(val){
    		this.searchWord = val.name;
    		this.goSearchShopId = val.id;
    		this.popupVisible2 = true;
    	},
    	goSearch2(word){
    		this.keyWord = word;
    		this.popupVisible2 = true;
    	},
    	changeFavorate(is_favorate){
    		if(!common.getCookie('key')){
    			this.$router.push('/login')
    			return
    		}
    		if(is_favorate){
    			this.cancelCollect()
    		}else{
    			this.doCollect()
    		}
    	},
			goGoods(id){
				if(this.isAndroid){
	           window.WebViewJavascriptBridge.callHandler(
	          'submitFromWeb',
	          {
	              "action": 'goodsDetail', //login.search,goodsDetail,StoreDetail,buyVoucher,orderList,buyMore,verifyPhone,html5,userCenter
	              "ref_id": id //goods_id,store_id，cate_id
	          });
	      }else{
	        this.$router.push("/goods/"+id)
	      }
			}
	}
}
</script>
<template>
<div class="wrapper">
	<headerBack headTitle="Shop Info" v-if="!isAndroid"></headerBack>

	<div class="searchButton" @click="popupVisible=true"><i></i></div>
	<div class="shopBaseInfo">
		<div class="shopName">{{storeInfo.store_name}}</div>
		<div class="shopImg"><img :src="storeInfo.store_avatar"></div>
		<div class="shopCollect" :class="{active:storeInfo.is_favorate}" @click="changeFavorate(storeInfo.is_favorate)"></div>
	</div>
	<ul class="itemAndLike">
		<li>
			<p>{{storeInfo.goods_count}}</p>
			<p>Items</p>
		</li>
		<li>
			<p>{{storeInfo.store_collect}}</p>
			<p>Like</p>
		</li>
	</ul>

	<ul class="todayList">
		<li v-for="good in storeData">
				<div class="todayImgWrapper" @click='goGoods(good.goods_id)' :style="'background:url('+good.goods_image_url+') 0% 0% / contain no-repeat;'">
				</div>
				<p>{{good.goods_name}}</p>
				<div>
					<span>{{currency}}</span>
					<em>{{good.goods_price}}</em>
				</div>
		</li>
	</ul>

<mt-popup
  v-model="popupVisible"
  position="right">
	<storeSearch :storeId="store_id" :shopName="storeInfo.store_name" @hideSearch="hideSearch" :popupVisible="popupVisible"></storeSearch>

</mt-popup>


<!-- <mt-popup
  v-model="popupVisible2"
  position="right">
  <goStoreSearch :popupVisible2="popupVisible2" :searchWord="searchWord" @hideGoSearch="hideGoSearch" :storeId="goSearchShopId" :keyWord="keyWord"></goStoreSearch>

</mt-popup> -->
</div>
</template>

<style lang="less" scoped>
.wrapper *{
	box-sizing: border-box;
}
.searchButton{

	position: fixed;
	top:0;
	right:1.3rem;
	height:1.33rem;
	width:1.6rem;
	text-align: center;
	z-index: 1299;
	i{
		background: url(../../assets/images/magnifying.png)0 0 no-repeat/contain;
		display:inline-block;
		width:0.9rem;
		height:0.9rem;
		margin-top: 0.23rem;
	}
}
.shopImg{
	position:absolute;
	bottom:-0.278rem;
	left:0.611rem;
	img{
		display:inline-block;
		width:2.111rem;
		height:2.111rem;
	}
}
.shopCollect{
	position:absolute;
	right:0.556rem;
	bottom:0.222rem;
	width:0.833rem;
	height:0.833rem;
	z-index: 299;
	background: url(../../assets/images/goods-fav.png)0 0 no-repeat/contain;
}
.shopCollect.active{
	background: url(../../assets/images/goods-faved.png)0 0 no-repeat/contain;

}
.shopBaseInfo{
	background: #625f5f;
	position: relative;
	height: 4.444rem;
	.shopName{
		position:absolute;
		bottom:1.34rem;
		color: #FFF;
		left:3.056rem;
	}

}
.itemAndLike{
	height: 1.556rem;
	margin-bottom: 0.556rem;
	li{
		padding-top: 0.389rem;
		background: #fff;
		height: 1.556rem;
		width:49.8%;
		float:left;
		text-align: center;
	}
}
.todayList{
	display:flex;
	flex-wrap:wrap;
	justify-content:space-between;
	li{
		width:49.8%;
		background:#fff;
		margin-bottom: 0.06rem;
		padding:0 0.2rem;
		p{
			font-size: 0.389rem;
		    line-height: .6rem;
		    height: 1.2rem;
		    overflow: hidden;
		}
		img{
			width:100%;
		}
		.todayImgWrapper{
			margin:0.4rem;
			height:3.4rem;
		}
	}
	div{
		position:relative;
		span{
			color:#ec5464;
			font-size: 0.361rem;
			margin-right: 0.111rem;
		}
		em{
			font-size: 0.472rem;
			color:#ec5464;
			position:relative;
			top:0.028rem;
			// font-weight: bold;
		}
		i{
			display:inline-block;
			width:0.556rem;
			height:0.556rem;
			position:absolute;
			right:0.222rem;
			top:0.111rem;
		}
		.fbk{
			background:url(../../assets/images/fulfil.png);
			background-size: contain;
		}
		.global{
			background:url(../../assets/images/global.png);
			background-size: contain;
		}
	}
	h4{
		color: #999;
		line-height: 0.944rem;
	}
}
</style>
