<template>
  <div class="special-page" :style="isAndroid?'padding-top: 0;':''">
    <HEADBACK :headTitle="title" v-if="!isAndroid" ></HEADBACK>
    <div class="banner-pic">
      <img :src="headBanner.image" alt="">
    </div>
    <div class="goods-floor" v-for="(floor,index) in goodsFloor" >
      <h4> {{floor.title}}</h4>
      <ul class="goods-list"  >
        <li class="goods-item" v-for="(item,index) in floor.item"  @click="goGoods(item.goods_id)" >
          <div class="goods-image">
            <img :src="item.goods_image"  >
          </div>
          <div class="goods-detail">
            <p class="goods-name">{{ item.goods_name }}</p>
            <p class="goods-price" >{{site.currency}} {{ parseInt(item.goods_promotion_price) }}</p>
          </div>
        </li>
      </ul>

    </div>

  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getSpecialPage} from '../../service/getData.js'
import Head from '../../components/common/headerBack.vue';
export default {
  name: 'special-page',
  data () {
    return {
      specialData:{},
      pageContent:[],
      headBanner:{},
      goodsFloor:[],
    }
  },
  computed: {
    ...mapState([
      "specialPage", 'site','isAndroid'
    ]),
    title:function(){
      return this.$route.query.title||"Special Page"
    }
  },
  watch:{
    specialData:function(){

    }
  },
  created(){

     this.initData();
  },
  methods:{
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
    async initData(){
      let floor =[];
      if(this.$route.params.id){
        let res = (await getSpecialPage(this.$route.params.id)).datas;
        for (var i in res){
          let key = Object.getOwnPropertyNames(res[i])[0];
          let vv = res[i][key];
            switch (key) {
              case 'home3':
                $.each(vv.item,
                  function (k3, v3) {
                    vv.item[k3].url = buildUrl(v3.type, v3.data);
                  });
                break;
              case 'home1':
                this.headBanner = {
                  image : vv.image,
                  url : vv.type+"/"+vv.data
                }
                break;
              case 'goods':
                  this.goodsFloor.push(vv)
                break;
              }
        }
      }
    }
  },
  components:{
    "HEADBACK":Head,

  },
}
</script>
<style lang="less" scoped >
.special-page {
  padding-top: 1.33rem;
  .banner-pic{
    img {width:100%;}
  }
  .goods-list{
    background-color: #f3f5f9;
    .goods-item{
      width: 50%;
      display: inline-block;
      padding:.14rem;
      box-sizing: border-box;
      background-color:#fff;
      border-bottom: 1px solid #ddd;
    }
    .goods-item:nth-of-type(odd){
      border-right: 1px solid #ddd;
    }
    .goods-item:nth-of-type(even){
      margin-left: -1px;
    }
    .goods-image{
     height: 4.95rem;text-align: center;
      img{  width: 100%;height: 100%;object-fit: contain;}
    }
    .goods-name {
      overflow: hidden;
      height: 1.2rem;
      font-size: .4rem;
      line-height: .6rem;
    }
    .goods-price {
      font-size: .36rem;
      color:#f98722;
    }
  }
}

.goods-floor {
  h4 {
    line-height: .7rem;
    font-size: .54rem;
    padding-left: .4rem;
    margin: .3rem 0;
    border-left: .08rem solid #f87622;
  }
}
</style>
