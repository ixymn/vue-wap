<script>
import {getStoreClickInfo} from '../../service/getData'

import '../../utils/common.js';

export default {
	data:function(){
		return{
            currency:this.$store.state.site.currency,
			recommandList:[],
            curpage:[1,1,1,1],
            goodsGroup:[
                [],
                [],
                [],
                [],
            ],
            arr: this.$route.params.info.split('&'),
            loading:false,
            upOrdown:false,//判断价格高低排序
            upOrdownRecord:[false],//记录价格高低切换历史
            secondClick:false,
            activeIndex:0,
            noGoods:false,
            topTabs:['New Arrivals',' Price ','Sales','Popular'],
		}
	},
	computed:{
        url1(){
            return '/index.php?act=store&op=store_goods&curpage='+this.curpage[0]+'&page=10&store_id='+this.store_id+this.stc_id+'&key=1'
        },
        url21(){
            return '/index.php?act=store&op=store_goods&curpage='+this.curpage[1]+'&page=10&store_id='+this.store_id+this.stc_id+'&key=2&order=1'
        },
        url22(){
            return '/index.php?act=store&op=store_goods&curpage='+this.curpage[1]+'&page=10&store_id='+this.store_id+this.stc_id+'&key=2&order=2'
        },
        url3(){
            return '/index.php?act=store&op=store_goods&curpage='+this.curpage[2]+'&page=10&store_id='+this.store_id+this.stc_id+'&key=3'
        },
        url4(){
            return '/index.php?act=store&op=store_goods&curpage='+this.curpage[3]+'&page=10&store_id='+this.store_id+this.stc_id+'&key=4'
        },
        store_id(){
            return this.arr[0].split('=')[1]
        },
        stc_id(){
            var clickOrSearch = this.arr[1].split('=')[1]==0?'&keyword='+this.keyword:'&stc_id='+this.arr[1].split('=')[1];

            return clickOrSearch
        },
        keyword(){
            return this.arr[2].split('=')[1]
        },
	},
	created(){

        this.initData(0)

	},
	methods:{
		searchBack(){
            this.$router.go(-1)
		},
		async initData(indexNow){
            this.$indicator.open();

            if(indexNow==1){
                var urlString = 'url'+(Number(indexNow)+1)+(this.upOrdown?'1':'2');
            }else{
                var urlString = 'url'+(Number(indexNow)+1);
            }

	  		var newData  = (await getStoreClickInfo(this[urlString]));
            var recordLength = this.upOrdownRecord.length;
            
            var whetherSame = this.upOrdownRecord[recordLength-1]==this.upOrdownRecord[recordLength-2];//判断是否价格高低排序互相切换

            if(!whetherSame&&indexNow==1){
                //↑如果whetherSame为否，且url属于price的，则说明用户在切换价格的高低排序
                this.goodsGroup[indexNow].splice(0,this.goodsGroup[indexNow].length);
                //↑清空price栏数据
            }
            if(newData.datas.goods_list){
                for(var i=0;i<newData.datas.goods_list.length;i++){
                    this.goodsGroup[indexNow].push(newData.datas.goods_list[i])
                }
                this.noGoods=false;
            }else{
                this.noGoods=true;
            }

            this.$indicator.close();

    	},
        loadmore(){
            this.loading = true;
            var indexNow = this.activeIndex;

              setTimeout(() => {
                var modoNum = this.curpage[this.activeIndex];
                this.curpage.splice(this.activeIndex,1,++modoNum)
                this.upOrdownRecord.push(this.upOrdown);

                // this.curpage[this.activeIndex]++;
                this.initData(indexNow);
                this.loading = false;
              }, 250);

        },
        changeTopTab(index){
            this.activeIndex = index;
            if(index==1){

                //this.secondClick判断是否是外界进入价格排序
                if(!this.secondClick){
                    this.secondClick = true;
                }else{
                    this.upOrdown = !this.upOrdown;
                    this.curpage.splice(this.activeIndex,1,1)
                }

                this.upOrdownRecord.push(this.upOrdown);

            }else{
                this.upOrdown = false;
                this.secondClick = false
            }

            var whetherSame = this.upOrdownRecord[this.upOrdownRecord.length-1]==this.upOrdownRecord[this.upOrdownRecord.length-2];

            if(this.goodsGroup[index].length==0||index==1&&!whetherSame){
                this.initData(index);
            }

        }
	}


}
</script>
<template>
<div class="wrapper">
<div class="topPart">
	<div class='head-back'>
	<div class="header-ico" @click="searchBack">
	</div>
	<div class="header-title">
	<span>{{keyword}}</span>
	</div>
	</div>

    <ul class="goodsTabs">
        <li v-for="(tab1,index) in topTabs" @click="changeTopTab(index)" :class="{active:index==activeIndex}">
        {{tab1}}
            <i :class="{upOrdown:index==1&&activeIndex==1,active:upOrdown}"></i>
        </li>
    </ul>
</div>


<ul class="contentTabs">
    <li v-for="(goodsList,index) in goodsGroup" v-show="activeIndex==index">
        <ul class="goodsLists" v-infinite-scroll="loadmore" infinite-scroll-disabled="loading" infinite-scroll-distance="120" infinite-scroll-immediate-check="false">
            <li v-for="good in goodsList">
                <div class="leftImg" :style="'background:url('+good.goods_image_url+') 0% 0% / contain no-repeat;'"></div>
                <div class="rightInfo">
                    <p>{{good.goods_name}}</p>
                    <div>
                        <i :class="{drop:good.goods_logistics_type==0,fbk:good.goods_logistics_type==1,global:good.goods_logistics_type==2,}"></i>
                    </div>
                    <p class="goodsPrice">{{currency}} {{good.goods_price}}</p>
                </div>
            </li>
        </ul>
        <span class="noGoods" v-show="noGoods">No records here</span>
    </li>
</ul>


</div>
</template>

<style lang="less" scoped>
.noGoods{
    font-size: 0.528rem;
    position:absolute;         
    margin:auto;
    top:52%;
    left:50%;
    transform:translate(-50%,-50%)
}
.upOrdown{
    position:absolute;
    width:0.472rem;
    height:0.472rem;
    bottom:0.306rem;
    display:inline-block;
    background: url(../../assets/images/upArrow.png) 0% 0% no-repeat/contain;
}
.upOrdown.active{
    transform:rotate(180deg)
}
.goodsPrice{
    color:#ec7c37;
    font-size: 0.417rem;
    position: absolute;
    bottom:0.333rem;
}
.contentTabs{
    >li{
        height:100vh;
        overflow:scroll;
        padding-top: 2.333rem;

    }
}
.topPart{
    height:2.333rem;
    position: absolute;
    top:0;
    width:100%;
}
.rightInfo{
    i{
        display:inline-block;
        width:0.556rem;
        height:0.556rem;
    }
    .fbk{
            background:url(../../assets/images/fulfil.png);
            background-size: contain;
        }
    .global{
        background:url(../../assets/images/global.png);
        background-size: contain;
    }
    .drop{
        background:url(../../assets/images/drop.png);
        background-size: contain;
    }
}
.goodsListsWrapper{
    height:94.4vh;
    overflow:auto;
}
.goodsLists{
    margin-top: 0.139rem;
    >li{
        position: relative;
        display:flex;
        border-bottom: 0.028rem solid #d1d1d1;
        background: #fff;
        margin-bottom: 0.139rem;
        >div{
            height:3.333rem;
        }
        .leftImg{
            width:33%;
        }
        .rightInfo{
            width:67%;
        }
    }
}
.goodsTabs{
    display:flex;
    margin-top: 1.333rem;
    li{
        background: #fff;
        height:0.944rem;
        line-height: 0.944rem;
        font-size: 0.389rem;
        text-align: center;
        flex-grow:1;
    }
    .active{
        color:#ec7c37;
    }
}

.wrapper{
	width:100vw;
	height:100vh;
    position: relative;
	background: #f3f5f9;
	// padding-top: 2.333rem;
    // display:flex;
    // flex-direction:column;
	*{
    	box-sizing: border-box;
	}
}

.head-back {
	overflow:hidden;
  position:absolute;
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
