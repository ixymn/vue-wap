<template>
  <div class="search-page">
  <header class='head' v-if="!isAndroid">
    <div class="header-back"  @click="goBack"></div>
    <div class='header-search' >
      <label class="search-icon"> <i class="icon icon-search" ></i></label>
      <input class='search-input' v-model="keyword" ref="searchInput">
    </div>
    <div class="header-button" @click="goSearch(keyword)">
      <button type="button" class="search-button">
        Search
      </button>
    </div>
  </header>

<search-filter :sortItem="sort_item" v-show="filterShow" @filterChange="filterChangeFUNC" @OpenFilter="OpenFilterFUNC" :filterParams="filterParams" @changeSortName="changeSortName"></search-filter>

  <div class="hot-search"  v-if="this.$route.params.searchItem===undefined">
    <h4>Top searches</h4>
    <ul>
      <li v-for="(hot,key) in searchRecommands.list " class="hot-searches"  @click='goSearch(hot)'>{{ hot }}</li>
    </ul>
  </div>

  <div class="goods-list" v-if="this.$route.params.searchItem!=undefined">
  <ul :style="isAndroid?'margin-top:1.5rem':''" v-infinite-scroll="loadmore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="120" >
    <li v-for="goods in goodsList" class="goods-item" @click="goGoods(goods.goods_id)">
      <div class="goods-image">
        <img :src="goods.goods_image_url"  >
      </div>
      <div class="goods-detail">
        <p class="goods-name">{{ goods.goods_name }}</p>
        <p class="goods-price" >{{site.currency}} {{ parseInt(goods.goods_promotion_price) }}</p>
      </div>
    </li>
  </ul>

    <div v-show="emptyHint" class="emptyHint">
        <p>No records here</p>
    </div>
    <mt-popup v-model="filterPOP" position="bottom">
        <div class="filterPOPcontent">
            <div class="priceZone">
                <span class="priceTitle">Price:</span>
                <input type="text" v-model="lowestPrice" class="lowestPrice" :placeholder="site.currency">
                <span class="sukima">--</span>
                <input type="text" v-model="highestPrice" class="highestPrice" :placeholder="site.currency">

            </div>
            <div class="boxZone">
                <div class="resetButton" @click="resetInput">Reset</div>
                <div class="filterButton" @click="setFilter">Filter</div>
            </div>
        </div>
    </mt-popup>

  </div>

</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getSearchRecommond,getSearchResult} from '../../service/getData'
import search_filter from '../../components/search/search_filter'

import {Indicator} from 'mint-ui'
export default {
  data(){
    return({
      sort_item:[
        {name:"belong",index:0,id:"sort_belong",default:"All"},
        {name:"order",index:1,id:"sort_order",default:"Popularity"},
        {name:"filter",index:2,id:"sort_filter",default:"Filter"}
      ],
      recommondItems:{},
      recommondList:[],
      searchResult:[],
      keyword:'',
      goodsList:[],
      lowestPrice:'',
      highestPrice:'',
      curpage:1,
      loadMoreSwitch:true,
      allLoaded:false,
      loading:false,
      filterPOP:false,
      searchWordInto:null,
      tempParams:null,
      filterParams:{},
      emptyHint:false,
    })
  },
  computed: {
    ...mapState([
       'searchRecommands','searchList','site','isAndroid'
    ]),
    finalParams(){
      let obj = JSON.parse(this.tempParams);
      obj.curpage = this.curpage

      return obj
    },
    // routeSearch:function(){
    //   this.goodsList=[];
    //   return this.$route.params.searchItem
    // },
    filterShow:function(){
      return this.$route.params.searchItem;
    }
  },
  methods: {
    ...mapMutations([
      'STORE_SEARCH_RECOMMAND','STORE_SEARCH_INFO'
    ]),
    goBack:function(){
      this.$router.go(-1)
      Indicator.close();
    },
    OpenFilterFUNC(){
      this.filterPOP = true;
    },
    goGoods:function(goodsId){
      if(this.isAndroid){
           window.WebViewJavascriptBridge.callHandler(
          'submitFromWeb',
          {
              "action": 'goodsDetail', //login.search,goodsDetail,StoreDetail,buyVoucher,orderList,buyMore,verifyPhone,html5,userCenter
              "ref_id": goodsId //goods_id,store_id，cate_id
          });
      }else{
        this.$router.push("/goods/"+goodsId)
      }

    },
    goSearch :function(hot){
      this.curpage = 1;
      this.$router.push("/search/"+hot.trim());
    },
    async initRecommondData() {
      this.recommondItems = await getSearchRecommond();
      this.STORE_SEARCH_RECOMMAND(this.recommondItems.datas)
      this.$refs.searchInput.focus()
    },
    async fetchSearchData(searchParams){
      if(searchParams.keyword){
        Indicator.open({
            text: 'Loading...',
            spinnerType: 'fading-circle'
        });
        this.searchResult = await getSearchResult(searchParams);
        if(!this.searchResult.hasmore){
            this.loadMoreSwitch = false;
        }
        Indicator.close()
      }
    },
    loadmore(){
      this.loading = true;
      setTimeout(() => {
        if(this.loadMoreSwitch==false) return ;
          this.curpage++
          this.fetchSearchData(this.finalParams)
          this.loading = false;
      }, 250);
    },
    filterChangeFUNC(params){
        this.loading = false;
        this.loadMoreSwitch = true;
        let scroller = document.querySelectorAll('.goods-list')[0];

        if(scroller){
           let padding = scroller.style;
           scroller.scrollTop = 0;
        }

        this.curpage = 1;
        this.tempParams = JSON.stringify(params);
        this.fetchSearchData(this.finalParams)

    },
    resetInput(){
        this.lowestPrice = '';
        this.highestPrice = '';
        this.resetFilter()
    },
    resetFilter(){
        this.filterParams = {
            lowestPrice:this.lowestPrice,
            highestPrice:this.highestPrice
        }
    },
    setFilter(){
        let isNumOK = this.checkNum(this.lowestPrice)&&this.checkNum(this.highestPrice);

        if(isNumOK){
            let isOrderOK = Number(this.lowestPrice)<=Number(this.highestPrice);
            if(isOrderOK){
            
            }else{
                this.$toast({
                    message: 'Please check the price',
                    position:'bottom',
                    duration: 3000
                });
                return 
            }
        }else{

            this.$toast({
                message: 'Please check the price',
                position:'bottom',
                duration: 3000
            });
            return
        }

        this.filterParams = {
            lowestPrice:this.lowestPrice,
            highestPrice:this.highestPrice
        }
        this.filterPOP=false;
    },
    checkNum(val){
        return val!=''&&!isNaN(val)&&val>=0
    },
    changeSortName(obj){
        let index = 0;
        switch(obj.index.substring(0,1)){
            case 'l':
            index = 0
            break;
            case 'k':
            index = 1
            break;
        }
        this.sort_item[index].default = obj.val;
    }
  },
  components:{
    "search-filter":search_filter
  },
  watch:{
    recommondItems:function(){
      this.recommondList = this.recommondItems.datas
    },
    searchResult:function(){
        if(this.curpage == 1) this.goodsList = [];

        let searchGoodsList = this.searchResult.datas.goods_list;
        for (var i = 0,len = searchGoodsList.length; i < len; i++) {
        this.goodsList.push(searchGoodsList[i])
        }

        if(this.goodsList.length==0){
        this.emptyHint = true
        }else{
        this.emptyHint = false
        }
    },
    $route(){
        this.keyword = this.$route.params.searchItem;
    }

  },
  created(){
    let searchItem = this.$route.params.searchItem;
    this.keyword = this.$route.params.searchItem;
    this.initRecommondData()
  },

}
</script>

<style lang="less" scoped >
.head { position:fixed;z-index: 999;display: flex;align-items: center;justify-content: flex-start;box-sizing: border-box;padding: 0 .42rem;top:0;height:1.56rem;width: 100%;background: #424040;
  .header-search {display: flex;opacity: 0.7;height: .75rem;margin:auto .28rem}
  .icon {display: inline-block;background-position: center;background-repeat: no-repeat;background-size: contain;}
  .header-search {min-width:60%;margin-right: .5rem;
    .search-icon{ height: .75rem;background: #fff;width: .75rem;display: flex;justify-content: center;align-items: center;border-radius:5px 0 0 5px;
      .icon-search {
        width: .5rem;height: .5rem;background-image: url(../../assets/header/icon_sousuo.png);
      }
    }
    .search-input{
      border: none;border-radius: 0 5px 5px 0;height: .75rem;margin-left: -2px;padding-left: .1rem;width:100%;font-size: .44rem;
    }
  }
  .search-button{
    border: none;background: #424040; color: #fff;font-size: .44rem;
  }
  .header-back {width: .5rem;height: .5rem;background: url(../../assets/images/header-back.png) no-repeat center;background-size:contain; margin-right:.5rem;}
}
.hot-search{position: absolute;top:1.56rem;left: 0;right: 0;box-sizing: border-box;padding: .3rem;
  h4 {border-bottom: 1px solid #ddd;}
  ul {margin-top: .22rem;}
  .hot-searches{
    padding:.14rem .2rem .16rem;border-radius: .18rem;background-color: #c6c5c5;display: inline-block;width:auto;margin:.1rem;
  }
}
.search-page{
    *{
        box-sizing: border-box;
    }
  position: relative;
  .goods-list{
        // overflow: scroll;
        height:100vh;
        ul{
          margin-top: 3.06rem;
        }
        // min-height: 12rem;
    // position: absolute;top:3.06rem;left: 0;right: 0;bottom: 0;



    background-color: #f3f5f9;
    .goods-item{width: 50%;display: inline-block;padding:.14rem;box-sizing: border-box;border-bottom: 1px solid #ddd;}
    .goods-item:nth-of-type(odd){
      border-right: 1px solid #ddd;
    }
    .goods-item:nth-of-type(even){
      margin-left: -1px;
    }
    .goods-image{
      min-height: 4.95rem;width: 100%;
      img{width:100%;height: 100%}
    }
    .goods-name {
      overflow: hidden;
      height: 1.2rem;
      font-size: .4rem;
      line-height: .6rem;
    }
    .goods-price { color: #f98722; font-size: .36rem;}
  }
}
// .page-infinite-loading {text-align: center;
//   .loading { text-align: center; display: block; padding: .1rem 0;
//     font-size: 0.4rem; color: #666; margin: 0 auto;}
//   .spinner { display: inline-block; vertical-align: middle; margin-right: 0.1rem;
//     font-size: 1rem; width: .5rem; height: .5rem; text-align: left; border-radius: 50%;
//     box-shadow: inset 0 0 0 .05rem rgba(255, 108, 34, .3); }
//   .spinner i { position: absolute; clip: rect(0, .5rem, .5rem, .25rem);
//     width: .5rem; height: .5rem;
//      animation: spinner-circle-clipper 1s ease-in-out infinite;
//       -webkit-animation: spinner-circle-clipper 1s ease-in-out infinite; }
//   .spinner i:after { position: absolute; clip: rect(0, .5rem, .5rem, .25rem);
//     width: .5rem; height: .5rem; content: ''; animation: spinner-circle 1s ease-in-out infinite;
//     -webkit-animation: spinner-circle 1s ease-in-out infinite; border-radius: 50%;
//     box-shadow: inset 0 0 0 .05rem #f87622; }
//     @keyframes spinner-circle-clipper {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(180deg); }
//     }
//     @-webkit-keyframes spinner-circle-clipper {
//     0% { -webkit-transform: rotate(0deg); }
//     100% { -webkit-transform: rotate(180deg); }
//     }
//     @keyframes spinner-circle {
//     0% { transform: rotate(-180deg); }
//     100% { transform: rotate(180deg); }
//     }
//     @-webkit-keyframes spinner-circle {
//     0% { -webkit-transform: rotate(-180deg); }
//     100% { -webkit-transform: rotate(180deg); }
//     }

// }
.filterPOPcontent{
    height: 7rem;
    padding-top: 1px;
    position: relative;
}
.mint-popup-bottom{
    width:100%;
}
.priceZone{
    font-size: 0.417rem;
    margin-top: 0.556rem;
    input{
        height:0.889rem;
        padding-left: 0.111rem;
        width:3rem;
    }
    .sukima{
        margin:0 0.356rem;
    }
    .priceTitle{
        margin:0 0.278rem;
    }
}
.resetButton{
    width:3.4rem;
    height:0.944rem;
    line-height: 0.944rem;
    text-align: center;
    font-size: 0.444rem;
    background: #fdbe96;
    color:#000;
    position: absolute;
    bottom:0.556rem;
    left:0.833rem;
}
.filterButton{
    background: #f87622;
    width:3.4rem;
    height:0.944rem;
    line-height: 0.944rem;
    text-align: center;
    color:#fff;
    font-size: 0.444rem;
    position: absolute;
    bottom:0.556rem;
    right:0.833rem;
}
.emptyHint{
    p{
        margin:8rem auto 0;
        font-size: 0.5rem;
        text-align: center;
    }
}
</style>
