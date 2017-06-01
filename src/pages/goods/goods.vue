<template>
  <div class="goods-box">
    <HEADE :gdsHeaderStyle="headStyle" :gdsColorBack="gdsColorBack"/>
    <div class="goods-main">
      <div class="goods-img">
        <BANNER :listImg="listImgTmp" :gdsBannerStyle="gdsBannerStyle" :gdsBannerItemStyle="gdsBannerItemStyle">
          <div slot="swiper-icons" class="share-icons">
            <img class="share-icons1" src="../../assets/images/goods-fav.png">
            <img class="share-icons2" src="../../assets/images/goods-share.png">
          </div>
        </BANNER>
      </div>
      <div class="goods-brief">
        <div class="goods-name">{{goodsInfo.goods_name}}</div>
        <div class="goods-price">
          <span>{{currUnit}} {{goodsInfo.goods_promotion_price}}</span><span>{{(goodsInfo.goods_storage!=0)?'In Stock':'Out Stock'}}</span>
        </div>
      
      </div>
      <div class="goods-spec">
        <SPEC v-for="(item,key) in goodsInfo.spec" :key="key" :specItem="item" @popupSpecEvent="popupSpec"></SPEC>
      </div>

      <div class="goods-express">
        <div style="float:left;width:54%;">
          <template  v-if="goodsInfo.goods_logistics_type == 0">
            <em class="goods-express-ico1 goods-express-ico1-1" ></em>
          Shipped by Kilimall
          </template>
          <template  v-else-if="goodsInfo.goods_logistics_type == 1">
            <em class="goods-express-ico1 goods-express-ico1-2" ></em>
          Shipped by local seller
          </template>
          <template  v-else-if="goodsInfo.goods_logistics_type == 2">
            <em class="goods-express-ico1 goods-express-ico1-3" ></em>
          Shipped from overseas
          </template>
          
          <router-link :to="'/goodsDetail/'+goodsId+'/3'"><em class="goods-express-ico2" ></em></router-link>
        </div>
       
        <div style="float:right;" v-show="goodsInfo.pay_on_deliver">
          <em class="goods-express-ico3" ></em>
          Pay on delivery
        </div>
      </div>
      <div class="goods-feedback" style="margin-top:0.28rem;">
        <FEEDBACK :goodsId="goodsId" :starNum="goodsInfo.evaluation_good_star" :feedbackNum="goodsInfo.evaluation_count" :orderNum="goodsInfo.goods_salenum"/>
      </div>
      <div class="goods-specfiction" v-show="goodsInfo.goods_attr">
        <SPECFICTION :goodsAttr="goodsInfo.goods_attr"/>
      </div>
      <router-link :to="'/goodsDetail/'+goodsId">
        <div class="goods-detail">
          <span>Product Details</span><em></em>
        </div>
      </router-link>
      <div class="goods-like">
        <LIKE :likeList="goodsCommend"/>
      </div>
    </div>
    <router-link :to="'/goodsDetail/'+goodsId">
      <div class="view-more">
        View More
      </div>
    </router-link>
    
      <BUYFOOTER @popupSpecEvent="popupSpec" :cartCount="totalNum"/>
    
    <mt-popup style="width:100%;"v-model="popupVisible" position="bottom" popup-transition="popup-fade">
      <POPUP :goodsInfo="goodsInfo" :storeInfo="storeInfo" :specInfoParent="goodsInfo.spec_name_value" :isShowLoading="isShowLoading" @asyncFreshEvent="asyncFresh" @bindLoadingEvent="bindLoading" @finishToCartEvent='finishToCart'/>
    </mt-popup>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {currencyUnit} from '../../config/env'
import {getGoodsData} from '../../service/getData'

import Head from '../../components/common/headerBack.vue'
import Footer from '../../components/common/buyFooter.vue'
import Spec from '../../components/goods/goodsSpec.vue'
import Feedback from '../../components/goods/goodsFeedback.vue'
import Specfiction from '../../components/goods/goodsSpecfiction.vue'
import Like from '../../components/goods/goodsLike.vue'
import Popup from '../../components/goods/popupSpec.vue'
import Slide from '../../components/slide.vue'

export default {
  name: 'goods',
  data:function(){
  	return ({
      headStyle:{
        background:"none",
      },//头部的特例样式
      gdsBannerStyle:{
        height:"7.0rem",
      },
      gdsColorBack:{
        backgroundColor:"rgba(248, 118, 34, 0.5)"
      },
      gdsBannerItemStyle:{
        //backgroundSize:"contain",
      },//banner的特例样式
  		name:"Detail",
      goodsId:'',//当前商品号
      listImgTmp:[],
      goodsInfo:{},
      popupVisible:false,//选择规格弹框
      spec_list:{},
      goodsCommend:{},//推荐商品
      isShowLoading:true,//选择规格加载loading
      currUnit:'',
      storeId:'',//店铺id
      storeInfo:'',
  	});
  },

  mounted:function(){
    this.goodsId = this.$route.params.goodsid;
    this.currUnit = currencyUnit;
    this.initData();
  },
  computed:{
      ...mapState(['cartList']),

      //购物车总商品数量
      totalNum:function(){
        let num = 0;
        //console.log(this.cartList);
        for(let index in this.cartList){
          for(let index1 in this.cartList[index]){
            num += this.cartList[index][index1].num;
          }
        }
        return num;
      },
  },
  methods:{
    initData:async function(){
      let res = await getGoodsData(this.goodsId);
      this.goodsInfo = res.datas.goods_info;
      let goods_list = res.datas.goods_image;
      let imagesSlide=[];
      for ( let [index,item] of goods_list.entries()){
        imagesSlide.push({"image":item.medium_image,"type":"","data":""})
      }
      this.spec_list = res.datas.spec_list;
      this.listImgTmp = imagesSlide;
      this.goodsCommend = res.datas.goods_commend;
      this.storeId = res.datas.store_info.store_id;
      this.storeInfo = res.datas.store_info;
    },
    bindLoading:function(val){
      this.isShowLoading=val;
    },
    popupSpec:function(){
      this.popupVisible=true;
    },
    asyncFresh:async function(str){

      for(let item in this.spec_list){
        if(item == str){
          this.goodsId=this.spec_list[item];
          break;
        }
      }
      
      
      let res = await getGoodsData(this.goodsId);
      this.goodsInfo = res.datas.goods_info;
      let goods_list = res.datas.goods_image;
      let imagesSlide=[];
      for ( let [index,item] of goods_list.entries()){
        imagesSlide.push({"image":item.medium_image,"type":"","data":""})
      }
      this.spec_list = res.datas.spec_list;
      this.listImgTmp = imagesSlide;
      this.goodsCommend = res.datas.goods_commend;
      this.isShowLoading = false;
    },
    finishToCart:function(){
      this.popupVisible=false;
    },
  },
  components:{
  	"HEADE":Head,
    "BANNER":Slide,
    "BUYFOOTER":Footer,
    "SPEC":Spec,
    "FEEDBACK":Feedback,
    "SPECFICTION":Specfiction,
    "LIKE":Like,
    "POPUP":Popup,
  },
  
}
</script>

<style lang="less">
.goods-main{
  margin-bottom: 1.67rem;
}
.goods-img{
  background-color: #fff;
}
.share-icons{
  position: absolute;
  bottom: 0.75rem;
  right: 0.44rem;
  z-index: 1;
  width: 0.78rem;
  .share-icons1{
    width: 0.78rem;
    height: 0.78rem;
  }
  .share-icons2{
    width: 0.78rem;
    height: 0.78rem;
    margin-top: 0.56rem;
  }
}

.goods-brief{

  padding:0.42rem 0.28rem;
  text-align: left;
  border-bottom: 0.03rem solid #eff0f3;
  font-family: DroidSans;
  background-color: #fff;
}
.goods-name{

    font-size: 0.44rem;
    color: #150000;
    line-height: 0.5rem;
}
.goods-price{
  padding-top: 0.28rem;
  font-size: 0.5rem;
  color: #E4C187;

}
.goods-price>span:nth-child(1){
  float: left;
  display: inline-block;
  overflow: hidden;
  max-width: 50%;
  height: 0.56rem;
  line-height: 0.56rem;
  word-break: normal;
}
.goods-price>span:nth-child(2){
  display: inline-block;
  padding-left: 0.56rem;
  margin-left: 0.72rem;
  border-left: 1px solid #C4C8D2;
  font-size: 0.33rem;
  color: #9B9B9B;
  line-height: 0.33rem;
}
.goods-descr{
  font-size: 0.36rem;
  color: #F87622;
  letter-spacing: 0.01rem;
  line-height: 0.36rem;
}
.goods-spec{
  padding: 0.28rem 0;
  background-color: #fff;
}
.goods-express{
  height: 0.44rem;
  margin-top: 0.28rem;
  padding: 0.47rem 0.28rem;
  background-color: white;
  font-size: 0.33rem;
  color: #9B9B9B;
}
.goods-express>div{
  height:0.44rem;
  line-height: 0.44rem;
  width:42%;
}
.goods-express>div:nth-child(2){
  border-left:0.03rem solid #DDDFE4;
  padding-left: 0.28rem;
}
.goods-express>div>em{
  display: inline-block;
  width: 0.44rem;
  height: 0.44rem;
  background-repeat: no-repeat;;
  background-size: contain;
  vertical-align: middle;
}
.goods-express-ico1-1{
  background-image:url(../../assets/images/ic_express_fbk.png);
}
.goods-express-ico1-2{
  background-image:url(../../assets/images/ic_express_ds.png);
}
.goods-express-ico1-3{
  background-image:url(../../assets/images/ic_express_gs.png);
}
.goods-express-ico2{
  display: inline-block;
  width: 0.44rem;
  height: 0.44rem;
  background-repeat: no-repeat;;
  background-size: contain;
  vertical-align: middle;
  background-image:url(../../assets/images/goods-express-link.png);
  margin-left: 0.14rem;
}
.goods-express-ico3{

  background-image:url(../../assets/images/goods-delivery.png);
}
.goods-specfiction{
  margin-top:0.28rem;
}
.goods-like{
  margin-top: 0.28rem;
}
.goods-detail{
    margin-top: 0.28rem;
    background-color: white;
    height: 1.28rem;
    text-align: left;
    font-size: 0.39rem;
    color: #7E7E7E;
    letter-spacing: 0.01rem;
    line-height: 1.28rem;
    border-bottom: 0.03rem solid #eff0f3;
    padding-left: 0.28rem;
}
.goods-detail>em{
    width: 0.5rem;
    height: 0.44rem;
    float: right;
    margin-right: 0.28rem;
    margin-top: 0.4rem;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(../../assets/images/spec-arrow.png);
}
.view-more{
    position: fixed;
    background-color: #22caf8;
    width: 1rem;
    height: 1rem;
    padding: 0.3rem;
    border-radius: 50%;
    top: 50%;
    margin-top: -0.69rem;
    right: 0.56rem;
    color: white;
    font-size: 0.39rem;
    text-align: center;
    box-shadow: 2px 2px 10px #7fd8f1;
    cursor: pointer;
    z-index: 998;
}
</style>
