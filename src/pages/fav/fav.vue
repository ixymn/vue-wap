<template>
  <div class="fav-box">
    <HEADE headTitle="Wish List" @goBackEvent="goBack" :isDiyBack="1"/>
    <div class="fav-main">
      <mt-loadmore :top-method="loadTop" :topDistance="100" @top-status-change="handleTopChange" ref="loadmore">
            <div slot="top" class="mint-loadmore-top">
              <div class="mint-loadmore-pull-box clearfix">
                <em v-show="topStatus !== 'loading'" class="em-pull-load-ico" :class="{ 'loadmore-ico-rotate': topStatus === 'drop' }"></em>
                <mt-spinner class="em-loading-ico" type="snake" v-show="topStatus == 'loading'" :size="28"></mt-spinner>
                <dl class="em-pull-load-msg">
                  <dd>{{topStatus !== 'loading'?'Release to refresh':'loadding...'}}</dd>
                  <dd>Update:{{updateLoadDate}}</dd>
                </dl>
              </div>
            </div>
            <div v-infinite-scroll="scrollMore" infinite-scroll-disabled="loadScroll" infinite-scroll-distance="10">
              <dl class="fav-item" v-for="item in favArr">
                  <router-link :to="'/goods/'+item.goods_id">
                  <dt class="fav-pic" :style="'background-image:url('+item.goods_image_url+')'"></dt>
                  <dd class="fav-msg">
                    <p class="fav-name">{{item.goods_name}}</p>
                    <p class="fav-price">{{currencyUnit}} {{item.goods_price.split(".")[0]}}</p>
                    <div><span @click.prevent="favToCart(item.goods_id)" class="fav-cart">ADD TO CART</span><span @click.prevent="removeFav(item.fav_id)" class="fav-remove">REMOVE</span></div>
                  </dd>
                  </router-link>
              </dl>
            </div>
          </mt-loadmore>

    </div>
    <SCROLLLOAD v-show="loadScroll&&hasMore"/>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {getFav,delFav,addToCart} from '../../service/getData';
import Head from '../../components/common/headerBack.vue'
import ScrollLoad from '../../components/common/scrollLoadIco.vue';

export default {
  data:function(){
  	return ({
      topStatus:'',
      updateLoadDate:'',
      curPage:1,
      hasMore:true,
      loadScroll:false,
      favArr:[],
  	});
  },
  computed:{
      currencyUnit:function(){
        return this.$store.state.site.currency;
      },
  },
  mounted:function(){
    if(!common.getCookie("key")){
      common.goLogin(this.$router);
      return;
    }
    this.scrollMore();
  },
  methods:{
    goBack:function(){
      this.$router.push("/usercenter");
    },
    scrollMore:async function(){
      this.loadScroll=true;
      if(this.hasMore){
        let params={
          "key":common.getCookie("key"),
        };
        let res=await getFav(params,this.curPage);
        if(res.code == "200"){
          if(res.datas.favorites_list.length){
            this.favArr=this.favArr.concat(res.datas.favorites_list); 
            this.curPage=this.curPage+1;
            this.hasMore=res.hasmore;
            this.loadScroll=false;
          }else{
            this.hasMore=false;
          }
          
        }else if(res.code == "444"){
          this.$toast(res.datas.error);
        }else{
          this.$toast("get data is failed");
        }
      }
    },
    refresh:async function(){
      let params={
        "key":common.getCookie("key"),
      };
      let res=await getFav(params,1);
      if(res.code == "200"){
        this.favArr=res.datas.favorites_list;
      }
    },
    loadTop:async function(){
      this.refresh();
      this.$refs.loadmore.onTopLoaded();
    },
    handleTopChange:function(status){
      this.updateLoadDate=new Date().toLocaleString();
      this.topStatus = status;
    },
    removeFav:function(favId){
      this.$messagebox({
        title:"",
        message: 'Are you sure to delete it?',
        showConfirmButton:true,
        confirmButtonText:'Delete',
        showCancelButton: true,
        cancelButtonText:'Cancel',
      }).then(action=>{
        if(action == 'confirm'){
          this.removeFavApi(favId);
        }
      });
    },
    removeFavApi:async function(favId){
      let params={"fav_id":favId,"key":common.getCookie("key")};
      let res=await delFav(params);
      if(res.code == "200"){
        this.refresh();
        this.$toast("Deleted");
      }else if(res.code == "444"){
        this.$toast(res.datas.error);
      }else{
        this.$toast("error");
      }
    },
    favToCart:async function(goodsId){
      if(!common.getCookie("key")){
        return;
      }
      this.$indicator.open();
      let params={
            "key":common.getCookie("key"),
            "goods_id":goodsId,
            "quantity":1
          },
          res=await addToCart(params);
      this.$indicator.close();
      if(res.code == "200"){
        this.$toast("Add to Cart Successful");
      }else if(res.code == "444"){
        this.$toast(res.datas.error);
      }else{
        this.$toast("error");
      }
    },
  },
  components:{
  	"HEADE":Head,
    "SCROLLLOAD":ScrollLoad,
  },
}
</script>

<style lang="less" scoped>
.mint-loadmore-pull-box{
  display: inline-block;
}
 .mint-loadmore-top{
    height: 1.11rem;
    line-height: 0;
    padding: 0.14rem 0;
    margin-top: -1.4rem;
} 
/* .mint-loadmore-top{
  margin-top: -1.11rem !important;
}
.mint-loadmore-bottom, .mint-loadmore-top{
    text-align: center;
    height: 1.11rem;
    line-height: 1.11rem;
} */
.em-pull-load-ico{
  display: inline-block;
  background-size: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  width: 0.69rem;
  height: 1.06rem;
  background-image: url(../../assets/images/xlistview_arrow.png);
  float: left;
}
.em-loading-ico{
  display: inline-block;
  float: left;
}
.em-pull-load-msg{
  float: left;
  font-size: 0.33rem;
  line-height: 0.44rem;
  height: 1.06rem;
  margin-left: 0.28rem;
}
.em-pull-load-msg>dd:nth-child(1){
  font-size: 0.39rem;
  margin-bottom: 0.14rem;
}
.loadmore-ico-rotate{
  display:inline-block;
  transform:rotate(180deg);
  -ms-transform:rotate(180deg); /* Internet Explorer */
  -moz-transform:rotate(180deg); /* Firefox */
  -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
  -o-transform:rotate(180deg); /* Opera */
}
.fav-box{
  .fav-main{
    margin-top: 1.33rem;
    background-color: white;
    .fav-item{
        display: block;
        height: auto;
        position: relative;
        min-height: 2.78rem;
        padding: 0.28rem;
        border-bottom: 1px solid #dde0e4;
        .fav-pic{
          width: 2.78rem;
          height: 2.78rem;
          display: block;
          background-size: contain;
          background-repeat: no-repeat;
          background-position:center center;
          position: absolute;
          top: 0.28rem;
          left: 0.28rem;
        }
        .fav-msg{
          margin-left: 3.06rem;
          height: 2.78rem;

          .fav-name{
            display: block;
            font-size: 0.44rem;
            line-height: 0.63rem;
            height: 1.25rem;
            overflow: hidden;
          }
          .fav-price{
             color: red;
             font-size: 0.44rem; 
             height:0.62rem;
          }
          div{ 
            height: 0.83rem;
            margin-top: 0.08rem;
            margin-bottom: 0;
            font-size: 0.34rem;
            .fav-remove{
              display: inline-block;
                height: 0.83rem;
                line-height: 0.83rem;
                float: right;
            }
            .fav-cart{
              float: right;
              display: inline-block;
              margin-left: 0.42rem;
                background-color: #f87622;
                text-align: center;
                height: 0.83rem;
                line-height: 0.83rem;
                color: white;
                padding:0 0.28rem;
            }
          }
        }
    }
  }
}
</style>
