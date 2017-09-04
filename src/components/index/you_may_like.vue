<template>
  <div class="you-may-like">
    <div class="title-banner">
      YOU MAY LIKE
    </div>
    <div class="block-list"  >
      <!-- <mt-loadmore   :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"> -->

      <ul class="goods-list" v-infinite-scroll="loadmore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
        <li v-for="(item,index)  in  goodsList"  class="goods-item" @click="goGoods(item.goods_id)">
          <span class="goods-image">
            <img :src='item.goods_image' >
          </span >
          <h4 class="goods-name" v-html="item.goods_name"></h4>
          <span class="goods-price" >{{site.currency}} {{ parseInt(item.goods_promotion_price) }}</span>
        </li>
      </ul>
      <!-- </mt-loadmore> -->
      <div class="page-infinite-loading" v-bind:style="{ display: loading?'block':'none'}" >
        <div class="loading">
          <div class="spinner"><i></i></div>
          Loading...
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getHomepageYouMayLike} from '../../service/getData.js'
export default {
  name: 'you-may-like',
  props: ['youMayLike'],
  data () {
    return {
      loading:false,
      curpage:1,
      hasmore:false,
      tmplist:this.youMayLike,
      pageReturn:{},
      allLoaded:true
    }
  },
  computed: {
    ...mapState([
      'site'
    ]),
    goodsList:function(){
      if(this.curpage!=1){
      return this.tmplist;
      }else{
        return this.youMayLike;
      }
    }
  },
  watch:{
    youMayLike:function(){
      this.tmplist = this.youMayLike;
    },
    pageReturn:function() {
      if(this.curpage!=1){
        let l = [];
        let list = this.pageReturn.datas.rec_list||[];
        for(var i in list) {
          l.push({"goods_image":list[i].goods_image,'goods_name':list[i].goods_name,'goods_promotion_price':list[i].goods_promotion_price,'goods_id':list[i].goods_id})
        }
        this.tmplist=this.tmplist.concat(l);
      }
    }
  },
  mounted(){
    //this.initData();
  },
  methods:{
    // initData(){
    //   this.goodsList = this.youMayLike
    // },
    goGoods:function(id){
      this.$router.push("/goods/"+id)
    },
    async fetchData(){
      var p = {
        "page":10,
        "curpage":this.curpage
      }
      let res= await getHomepageYouMayLike(p);
      this.pageReturn = res
      return res
    },
    loadmore() {
      if(document.getElementById("app").offsetHeight < 10) return 0;
      this.loading = true;
      setTimeout(() => {
        if(this.curpage>1){
          this.hasmore = this.pageReturn.hasmore
        }else{
          this.hasmore = true
        }
      if(this.hasmore==false) return ;

        this.curpage++
        this.fetchData();

      this.loading = false;
      }, 100);


      }

  }

}
</script>
<style lang="less" scoped>
.title-banner{
  padding: .14rem .33rem;
  border-bottom: 1px solid #ddd;
  font-size: .44rem;
  .view-more{
    float:right;
  }
}
.you-may-like{
  min-height: 15rem;
  .block-list{
    min-height: 10rem;
    .goods-list{

      .goods-item{width: 50%;display: inline-block;padding:.14rem;box-sizing: border-box;border-bottom: 1px solid #ddd;padding: .14rem}
      .goods-item:nth-of-type(odd){
        border-right: 1px solid #ddd;
      }
      .goods-item:nth-of-type(even){
        margin-left: -1px;
      }
      .goods-image{
        display: inline-block;
        min-height: 4.95rem;width: 100%;
        img{width:100%;  max-height: 4.95rem;object-fit: contain;}
      }
      .goods-name {
        overflow: hidden;
        height: 1rem;
        font-size: .36rem;
        line-height: .5rem;
      }
      .goods-price { color: #f98722; font-size: .36rem;}
    }
    .page-infinite-loading { text-align: center;  width: 100%;
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
  }

}
</style>
