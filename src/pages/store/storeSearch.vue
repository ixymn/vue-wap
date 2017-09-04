<script>
import {getSearchHint} from '../../service/getData'

import '../../utils/common.js';

export default {
	data:function(){
		return{
			recommandList:[],
			searchValue:'',
			searchId:'',
			store_id:this.$route.params.id,
		}
	},
	props:['shopName','storeId','popupVisible'],
	computed:{
		searchInfo(){
			return{
				val:this.searchValue,
				// id:
			}
		}

	},
	created(){
		
	},
	methods:{
		searchBack(){
			this.$emit('hideSearch')
		},
		goSearchClick(val){
			this.$router.push('/goStoreSearch/store_id='+this.store_id+'&stc_id='+val.id+'&keyword='+val.name)
		},
		goSearchType(word){
			this.$router.push('/goStoreSearch/store_id='+this.store_id+'&stc_id=000&keyword='+word)
		},
		async initData(){

	  		var newData  = (await getSearchHint(this.storeId)).datas.store_goods_class;
	  		var TempArr =[];
	  		var TempArr2 =[];

	  		for(var i=0;i<newData.length;i++){
	  			if(newData[i].pid==0){
	  				newData[i].childNode = [];
	  				newData[i].seen = false;
	  				TempArr.push(newData[i])
	  			}else{
	  				TempArr2.push(newData[i])
	  			}
	  		}

	  		for(var i=0;i<TempArr.length;i++){
	  			for(var j=0;j<TempArr2.length;j++){
		  			if(TempArr2[j].pid==TempArr[i].id){
		  				TempArr[i].childNode.push(TempArr2[j])
		  			}
		  		}
	  		}

	  		this.recommandList = TempArr.concat();
    	},
    	setSearchValue(val){
    		this.searchValue = val.name;
    		this.goSearchClick(val)
    	},
    	goSearchOrNot(recom){

    		if(recom.childNode.length==0){
    			this.setSearchValue({name:recom.name,id:recom.id})
    		}else{
    			recom.seen = !recom.seen
    		}
    	}
	},
	watch:{
		popupVisible(){
			if(this.popupVisible == true){
				this.$refs.searchInput.focus()
				this.initData();
			}
		}
	}
}
</script>
<template>
<div class="wrapper">
	<div class='head-back'>
	<div class="header-ico" @click="searchBack">
	</div>
	<div class="header-title">
	<span>{{shopName}}</span>
	</div>
	</div>


	<div class="searchZone">
		<div class="textWrapper">
			<i></i>
			<input type="text" v-model="searchValue" ref="searchInput">
		</div>
		<div class="searchButton" @click="goSearchType(searchValue)">Search</div>
	</div>

		<!-- <li v-for="recom in recommandList" @click="setSearchValue(recom.name)"> -->

	<ul class="lenovoList">
		<li v-for="recom in recommandList">
			<div class="dataLevel1" @click="goSearchOrNot(recom)">{{recom.name}}</div>
			
			<ul class="lenovoList2" v-show="recom.seen">
				<li v-for="detail in recom.childNode" @click="goSearchClick({name:detail.name,id:detail.id})">
					<div class="dataLevel2">{{detail.name}}</div>
				</li>
			</ul>
		</li>
	</ul>

</div>
</template>

<style lang="less" scoped>
.wrapper{
	width:100vw;
	height:100vh;
	background: #f3f5f9;
	padding-top: 0.028rem;
	*{
    	box-sizing: border-box;
	}
}
.searchZone{
	// height:1.556rem;
	// line-height: 1.556rem;
	padding:0.278rem 2.222rem 0.278rem 0.278rem;
	margin-top: 1.33rem;
	position: relative;
	.textWrapper{
		i{
			display:inline-block;
			width:0.556rem;
			height:0.556rem;
			background: url(../../assets/images/magnifying2.png)0 0 no-repeat/contain;
			position: absolute;
			left:0.472rem;
			top:0.5rem;
		}
		input{
			outline: none;
			border:none;
			height:0.944rem;
			width:100%;
			padding-left: 0.833rem;
		}
	}
	.searchButton{
		position: absolute;
		width:2.222rem;
		height:1.472rem;
		line-height: 1.472rem;
		right:0;
		top:0;
		text-align: center;
		font-size: 0.389rem;
	}
}
.lenovoList{
	background: #fff;
	.dataLevel1{
		height:1.611rem;
		line-height: 1.611rem;
		padding-left:0.556rem;
		font-size: 0.444rem;
		border-bottom: 0.028rem solid #c8c6c6;
	}
	max-height: 70vh;
	overflow:auto;
}

.lenovoList2{
	background: #fff;
	.dataLevel2{
		background: #f1f1f1;
		height:1.611rem;
		line-height: 1.611rem;
		padding-left:0.556rem;
		font-size: 0.444rem;
		border-bottom: 0.028rem solid #c8c6c6;
	}
	.dataLevel2:active{
		background: #d9d9d9;
	}
}
	


.head-back {
	overflow:hidden;
  position:fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  top:0;
  z-index: 2;
  height:1.33rem;
  width: 100%;
  background: #424040;
  .header-ico {
    position: absolute;
    top: 50%;
    margin-top: -0.47rem;
    margin-left: 0.28rem;
    width:0.95rem;
    height:0.95rem;
    border-radius: 50%;
    vertical-align: middle;
    background-image: url(../../assets/images/header-back.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 40%;
  }
  .header-title {
    height:1.33rem;
    line-height:1.33rem;
    color: white;
    font-size: 0.47rem;
    text-align:center;
    width: 100%;
  }
  .header-title>span{
    display: inline-block;
    width: 50%;
    text-align: center;
  }
}

</style>
