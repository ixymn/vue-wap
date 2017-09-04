<template>
  <div class="search-page">
  <header class='head'>
    <div class="header-back"  @click="goBack"></div>
    <div class='header-search' >
      <label class="search-icon"> <i class="icon icon-search" ></i></label>
      <input class='search-input' v-model="keyword" >
    </div>
    <div class="header-button" @click="goSearch(keyword)">
      <button type="button" class="search-button">
        Search
      </button>
    </div>
  </header>
  <search-filter :sortItem="sort_item" v-show="filterShow" ></search-filter>

  <div class="hot-search"  v-if="this.$route.params.gc_id===undefined">
    <h4>Top searches</h4>
    <ul>
      <li v-for="(hot,key) in searchRecommands.list " class="hot-searches"  @click='goSearch(hot)'>{{ hot }}</li>
    </ul>
  </div>

  <div class="goods-list" v-if="this.$route.params.gc_id!=undefined"  :style="isAndroid?'top:1.5rem':''">

  <ul v-infinite-scroll="loadNextPage" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="true" infinite-scroll-distance="20">
    <li v-for="goods in goodsList" class="goods-item" @click="goGoods(goods.goods_id)">
      <div class="goods-image">
        <img :src="goods.goods_image_url"  >
      </div>
      <div class="goods-detail">
        <p class="goods-name">{{ goods.goods_name }}</p>
        <p class="goods-price" >{{site.currency}}  {{ parseInt(goods.goods_promotion_price) }}</p>
      </div>
    </li>
  </ul>
  <div class="page-infinite-loading" v-bind:style="{ display: loading?'none':'block'}" >
    <div class="loading">
      <div class="spinner"><i></i></div>
      Loading...
    </div>
  </div>
  </div>

</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getSearchRecommond,getCategoryGoods} from '../../service/getData'
import search_filter from '../../components/search/search_filter'
import { Indicator } from 'mint-ui';

export default {
  data(){
    return({
      sort_item:[
        {name:"belong",index:0,id:"sort_belong",default:"Default"},
        {name:"order",index:1,id:"sort_order",default:"Popularity"},
        //{name:"filter",index:2,id:"sort_filter",default:"Filter"}
      ],
      recommondItems:{},
      recommondList:[],
      searchResult:[],
      keyword:'',
      goodsList:[],
      curpage:1,
      hasmore:false,
      allLoaded:false,
      loading:false,
      searchParams:{
        gc_id:null,
        curpage:null,
        key:0,
        order:0,
      },
    })
  },
  computed: {
    ...mapState([
       'searchRecommands','searchList','site','isAndroid'
    ]),
    routeSearch:function(){
      this.goodsList=[];
      return this.$route.params.gc_id
    },
    filterShow:function(){
      var isShow = false;
      if(this.routeSearch){
        isShow = true;
      }
      return isShow;
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
    resetParams:function(){
      this.curpage = 1;
      this.searchParams.curpage = 1;
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
      this.$router.push("/search/"+hot.trim())
    },
    async initRecommondData() {
      this.recommondItems = await getSearchRecommond();
      this.STORE_SEARCH_RECOMMAND(this.recommondItems.datas)
      this.$refs.searchInput.focus()
      Indicator.close();
    },
    async fetchSearchData(searchParams){
      if(searchParams.gc_id){
        Indicator.open({
            text: 'Loading...',
            spinnerType: 'fading-circle'
        });
        this.searchResult = await getCategoryGoods(searchParams);
        Indicator.close();
      }
    },
    loadNextPage() {
      this.loading = true;
      setTimeout(() => {
        this.hasmore = this.searchResult.hasmore;
        if(this.hasmore==false) return ;
        this.curpage++
        this.searchParams.gc_id = this.$route.params.gc_id;
        this.searchParams.curpage = this.curpage;
        this.fetchSearchData(this.searchParams)
        this.loading = false;
      }, 100)
    },

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
    },
    routeSearch:function(){
      this.searchParams.gc_id = this.routeSearch;
      this.searchParams.curpage = this.curpage;
      this.fetchSearchData(this.searchParams)
    }
  },
  created(){
    let searchItem = this.$route.params.gc_id;
    if(searchItem){
      this.searchParams.gc_id = searchItem;
      this.resetParams();
      this.fetchSearchData(this.searchParams)
    }else{
      this.initRecommondData()
    }
    //坚挺筛选变化
    this.$root.eventHub.$on('filterChange',(index) => {
      this.curpage = 1;
      switch (index[0]){
        case "k":
          if(index[1]==3){
            this.searchParams.order = index[2];
          }else{
            this.searchParams.order = 0;
          }
          this.searchParams.key = index[1];
          this.fetchSearchData(this.searchParams)
          this.resetParams();
          break;
        case "l":

          this.searchParams.logisticsType = index[1];
          this.fetchSearchData(this.searchParams)
          this.resetParams();
          break;
      }
    })
    Indicator.close();
  },
  mounted(){
    Indicator.close();
  }
}
</script>

<style lang="less" scoped >
.head { position:fixed;display: flex;align-items: center;justify-content: flex-start;box-sizing: border-box;padding: 0 .42rem;top:0;z-index: 2;height:1.56rem;width: 100%;background: #424040;
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
  position: relative;
  .goods-list{
    position: absolute;top:3.1rem;left: 0;right: 0;bottom: 0;background-color: #f3f5f9;min-height: 500px;
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
.page-infinite-loading {text-align: center;
  .loading { text-align: center; display: block; padding: .1rem 0;
    font-size: 0.4rem; color: #666; margin: 0 auto;}
  .spinner { display: inline-block; vertical-align: middle; margin-right: 0.1rem;
    font-size: 1rem; width: .5rem; height: .5rem; text-align: left; border-radius: 50%;
    box-shadow: inset 0 0 0 .05rem rgba(255, 108, 34, .3); }
  .spinner i { position: absolute; clip: rect(0, .5rem, .5rem, .25rem);
    width: .5rem; height: .5rem;
     animation: spinner-circle-clipper 1s ease-in-out infinite;
      -webkit-animation: spinner-circle-clipper 1s ease-in-out infinite; }
  .spinner i:after { position: absolute; clip: rect(0, .5rem, .5rem, .25rem);
    width: .5rem; height: .5rem; content: ''; animation: spinner-circle 1s ease-in-out infinite;
    -webkit-animation: spinner-circle 1s ease-in-out infinite; border-radius: 50%;
    box-shadow: inset 0 0 0 .05rem #f87622; }
    @keyframes spinner-circle-clipper {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(180deg); }
    }
    @-webkit-keyframes spinner-circle-clipper {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(180deg); }
    }
    @keyframes spinner-circle {
    0% { transform: rotate(-180deg); }
    100% { transform: rotate(180deg); }
    }
    @-webkit-keyframes spinner-circle {
    0% { -webkit-transform: rotate(-180deg); }
    100% { -webkit-transform: rotate(180deg); }
    }

}

</style>
