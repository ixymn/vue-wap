<template>
  <div class="goods-box">
    <HEADE :gdsHeaderStyle="headStyle" :gdsColorBack="gdsColorBack" @goBackEvent="goBack" :isDiyBack="1" isGood="1" @favGodEvent="favGood" :isFavorite="isFavorite" @showShareDialogEvent="showShareDialog"/>
    <div class="goods-main" v-show="isLoaded">
      <div class="goods-img"  >
        <mt-swipe :auto="4000">
          <mt-swipe-item  v-for="(item, index) in listImgTmp" :key="index" style="background-position:center center;" :style="'background-image:url('+item.image+'),url(./icon_goods_default.png)'"></mt-swipe-item>
        </mt-swipe>
        <div class="swipe-bot-bg"></div>
      </div>
      <div class="flash-sale-tag clearfix" v-show="goodsInfo.goods_promotion_type == 3">
        <div class="flash-sale-tag-price">
          <em class="em-ico"></em>
          {{currencyUnit}} {{ parseInt(goodsInfo.flash_price) }}
        </div>
        <div class="flash-sale-tag-time">
          <p>Closing</p>
          <p><b>{{hrs>9?hrs:"0"+hrs}}</b>:<b>{{mins>9?mins:"0"+mins}}</b>:<b>{{secs>9?secs:"0"+secs}}</b></p>
        </div>
      </div>
      <div class="goods-brief">
        <div class="goods-name">{{goodsInfo.goods_name}}</div>
        <div class="goods-price clearfix">
          <span :style="goodsInfo.goods_promotion_type == 3?'text-decoration: line-through;':''">{{currencyUnit}} {{ parseInt(goodsInfo.price) }}</span>
          <span>Sold {{goodsInfo.goods_salenum}} <i>|</i> {{(goodsInfo.goods_storage!=0)?'In Stock':'Out Stock'}}</span>
        </div>
      </div>
      <div class="goods-middle-box">
        <div class="goods-express">
          <div style="float:left;width:54%;">
            <template  v-if="goodsInfo.goods_logistics_type == 1">
              <em class="goods-express-ico1 goods-express-ico1-1" ></em>
              KiliExpress {{goodsInfo.eta_day}} Days
            </template>
            <template  v-else-if="goodsInfo.goods_logistics_type == 0">
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
        <div class="goods-has-box" v-if="goodsInfo.is_selected || parseInt(storeInfo.store_baozhopen )">
          <!-- 有好货 -->
          <div class="goods-has-item" v-if="goodsInfo.is_selected">
            <em class="em-ico selective-ico"></em>This item joined selective channel
          </div>
           <!-- 质保金店铺 -->
          <div class="goods-has-item" v-if="parseInt(storeInfo.store_baozhopen )">
            <em class="em-ico secure-ico"></em>This item is secured by seller deposit
          </div>
        </div>


         <!-- 优惠券 -->
        <div class="goods-coupon" v-if="mansongInfo.rules" @click="popupCoupon">
           <ul>
             <li>
                <em class="coupon-ico em-ico"></em>
                <p>
                  Buy items over {{mansongInfo.rules[0].price+" "+currencyUnit}} , you can get {{mansongInfo.rules[0].discount+currencyUnit}}.
                </p>
                <em class="arrow_link_ico"></em>
             </li>
           </ul>
        </div>
        <!-- 礼物 -->
        <div class="goods-git" v-show="giftArray.length">
          <ul>
            <li v-for="item in giftArray">
                <em class="em-ico"></em>
                <span>{{item.gift_amount}} unit(s) {{item.gift_goodsname}}</span>
            </li>
          </ul>

        </div>
      </div>


      <!-- 产品规格介绍 -->
      <div class="good-spec-product">
        <div class="goods-spec" @click="popupSpec" v-if="goodsInfo.spec">
          Choose:<span v-for="item in goodsInfo.spec" >  {{'"'+item.spec_value+'"'}}</span>
          <em class="arrow_link_ico"></em>
        </div>
        <router-link :to="'/goodsDetail/'+goodsId">
          <div class="goods-spec">
            Product Details<em class="arrow_link_ico"></em>
          </div>
        </router-link>
      </div>

      <!-- 评论 -->
      <div class="goods-feedback">
        <FEEDBACK :goodsId="goodsInfo.goods_id" :starNum="parseInt(goodsInfo.evaluation_good_star)" :feedbackNum="goodsInfo.evaluation_count" :feedInfo="goodsFeed"/>
      </div>


      <!-- 店铺介绍 -->
      <router-link :to="'/store/'+goodsInfo.store_id">
      <div class="goods-shop">
          <span>Store: {{storeInfo.store_name}}</span>
          <em class="arrow_link_ico"></em>
          <em v-for="item in storeInfo.store_credit_bak" class="em-ico shop-star"></em>
      </div>
      </router-link>



      <div class="goods-like">
        <LIKE :likeList="goodsCommend" likeTitle="Featured Recommendations"/>
      </div>

      <div class="goods-like">
        <LIKE :likeList="goodsLikeList" likeTitle="You may also like"/>
      </div>
    </div>
    <router-link :to="'/goodsDetail/'+goodsId">
      <div class="view-more" v-show="isLoaded">

      </div>
    </router-link>

    <BUYFOOTER @popupSpecEvent="popupSpec" :cartCount="totalNum" :goodsId="goodsId" v-show="isLoaded" :type="goodsInfo.goods_promotion_type" @buyFlashEvent="buyFlash"/>


    <mt-popup style="width:100%;"v-model="popupVisible" position="bottom" popup-transition="popup-fade">
      <POPUP :goodsInfo="goodsInfo" :specInfoParent="goodsInfo.spec_name_value" :isShowLoading="isShowLoading" @asyncFreshEvent="asyncFresh" @bindLoadingEvent="bindLoading" @finishToCartEvent='finishToCart'/>
    </mt-popup>

    <mt-popup style="width:100%;" v-model="shareVisible"  popup-transition="popup-fade">
        <SHARE @hideShareEvent="hideShareDialog" shareObject="good" :goodsInfo="goodsInfo"/>
    </mt-popup>
    <!--  oversea 秒杀商品购买提示 -->
    <mt-popup style="width:100%;" v-model="overseaVisible" position="bottom" popup-transition="popup-fade">
      <div class="oversea-tip-box">
          <div class="oversea-tip-title">Tips<em class="em-ico" @click="closeOverseaTips"></em></div>
          <section>
            <p>Some products in your order will be delivered by Global Shipping. Please notice:</p>
            <dl>
              <dt class="oversea-tip-ico1"></dt>
              <dd>The estimated time of arrival might be within <b>30 days</b></dd>
            </dl>
            <dl>
              <dt class="oversea-tip-ico2"></dt>
              <dd>You have to <b>pay online</b>(M-PESA Supported)</dd>
            </dl>
            <dl>
              <dt class="oversea-tip-ico3"></dt>
              <dd>Your money will NOT get to the seller's account directly. Kilimall will reserve your money until you confirm receiving the package.</dd>
            </dl>
          </section>
          <div class="oversea-tip-btn" @click="continueBuyOversea">Continue</div>
      </div>
    </mt-popup>

    <!-- coupon列表 -->
    <mt-popup style="width:100%;" v-model="couponVisible"  popup-transition="popup-fade" position="bottom">
      <div class="coupon-list-box">
          <p class="coupon-list-title">Coupon</p>
          <ul>
            <li v-for="item in mansongInfo.rules">
              <em class="em-ico"></em>
                Single order amount above {{item.price+" "+currencyUnit}} , get a cash discount {{item.discount}} {{item.goods_id?' , Free Gift':''}}
            </li>
          </ul>
          <div class="coupon-btn-ok" @click="closeCoupon">ok</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {getGoodsData,addFav,delFav} from '../../service/getData'

import Head from '../../components/common/headerBack.vue'
import Share from '../../components/common/Share.vue';
import Indicator from '../../components/common/Indicator.vue'
import Footer from '../../components/common/buyFooter.vue'
import Spec from '../../components/goods/goodsSpec.vue'
import Feedback from '../../components/goods/goodsFeedback.vue'
import Like from '../../components/goods/goodsLike.vue'
import Popup from '../../components/goods/popupSpec.vue'

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
      gdsColorBack:1,
      gdsBannerItemStyle:{
        //backgroundSize:"contain",
      },//banner的特例样式
  		name:"Detail",
      //goodsId:'',//当前商品号
      listImgTmp:[],
      goodsInfo:{},
      popupVisible:false,//选择规格弹框
      shareVisible:false,//分享弹框
      overseaVisible:false,//oversea 秒杀商品购买提示
      couponVisible:false,
      spec_list:{},
      goodsLikeList:{},
      goodsFeed:{},
      goodsCommend:{},//推荐商品
      isShowLoading:true,//选择规格加载loading
      storeId:'',//店铺id
      isFavorite:0,
      totalNum:0,
      isLoaded:false,
      giftArray:[],
      mansongInfo:{},
      storeInfo:{},
      setTimeHandler:null,
      restTime:0,
      flashData:null,
      hrs:0,
      mins:0,
      secs:0,
      cartAction:0,
      dumpNum:0,
  	});
  },
  created:function(){
    this.INIT_CART();

  },
  mounted:function(){
    this.goodsId = this.$route.params.goodsid;
    this.initData();
  },
  computed:{
      ...mapState(['cartList']),

      currencyUnit:function(){
        return this.$store.state.site.currency;
      },
      goodsId:function(){
        return this.$route.params.goodsid;
      }
  },
  beforeDestroy:function(){
    if(this.setTimeHandler){
      clearInterval(this.setTimeHandler);
      this.setTimeHandler=null;
    }
  },
  methods:{
    ...mapMutations(['INIT_CART','SAVE_ORDCFRM','SET_GOOD_INFO']),
    setTimer:function(){
      var that=this;
      this.setTimeHandler=setInterval(function(){
        //console.log(that.restTime+"======"+this.setTimeHandler)
        if(that.restTime>0){
          that.restTime=that.restTime-1;
        }else{
          clearInterval(that.setTimeHandler);
          that.setTimeHandler=null;
          that.initData();
        }
      }.bind(that),1000);
    },
    initData:async function(){
      this.$indicator.open();
      let res = await getGoodsData({
          "key":common.getCookie("key")?common.getCookie("key"):'',
          "goods_id":this.goodsId
      });
      this.goodsInfo = res.datas.goods_info;
      this.SET_GOOD_INFO(this.goodsInfo);
      this.goodsInfo.price = this.goodsInfo.goods_promotion_price;

      // judge Flash Sale
      if(this.goodsInfo.goods_promotion_type == 3 && this.goodsInfo.flash_info){
        this.restTime=this.goodsInfo.flash_info.end_stamp-this.goodsInfo.flash_info.now_stamp;
        this.goodsInfo.price = this.goodsInfo.goods_price;
        this.goodsInfo.flash_price=this.goodsInfo.goods_promotion_price;
        this.setTimer();
      }


      let goods_list = res.datas.goods_image;
      let imagesSlide=[];
      for (var i in goods_list){
        imagesSlide.push({"image":goods_list[i].medium_image,"type":"","data":""})
      }
      this.spec_list = res.datas.spec_list;
      this.listImgTmp = imagesSlide;
      this.goodsCommend = res.datas.goods_commend;
      this.goodsLikeList = res.datas.may_like_goods;
      this.goodsFeed = res.datas.goods_eval_list;
      this.storeId = res.datas.store_info.store_id;
      this.isFavorite = res.datas.is_favorate;

      if(res.datas.mansong_info){
        this.mansongInfo=res.datas.mansong_info;
      }
      if(res.datas.gift_array){
        this.giftArray=res.datas.gift_array;
      }
      this.storeInfo=res.datas.store_info;
      let num = 0;
      if(this.cartList){
         for(let index in this.cartList){
            num += this.cartList[index].num;
          }
      }
      if(common.getCookie("key")){
        num+=res.datas.cart_count;
      }
      this.totalNum=parseInt(num);
      this.isLoaded=true;
      this.$indicator.close();
      //页面 refresh 时暂停显示 页面
      document.querySelector('.goods-main').style.opacity = 1;
    },
    goBack:function(){
      //if(document.referrer != (location.origin+"/")){
        //this.$router.push("/home");
      //}else{
        this.$router.go(-1);
      //}
    },
    addCartAnimate(){
      this.cartAction++;
      // alert(9)
    },
    bindLoading:function(val){
      this.isShowLoading=val;
    },
    popupSpec:function(){
      this.popupVisible=true;
    },
    popupCoupon:function(){
      this.couponVisible=true;
    },
    closeCoupon:function(){
      this.couponVisible=false;
    },
    asyncFresh:async function(str){
      var goodIdTmp;
      for(let item in this.spec_list){
        if(item == str){
          goodIdTmp=this.spec_list[item];
          break;
        }
      }


      let res = await getGoodsData({
          "key":common.getCookie("key")?common.getCookie("key"):'',
          "goods_id":goodIdTmp
      });
      this.isShowLoading = false;
      if(res.code == "200"){
        this.goodsInfo = res.datas.goods_info;
        this.goodsInfo.price = this.goodsInfo.goods_promotion_price;
        // judge Flash Sale
        if(this.goodsInfo.goods_promotion_type == 3 && this.goodsInfo.flash_info){
          this.restTime=this.goodsInfo.flash_info.end_stamp-this.goodsInfo.flash_info.now_stamp;
          this.goodsInfo.price = this.goodsInfo.goods_price;
          this.goodsInfo.flash_price=this.this.goodsInfo.goods_promotion_price;
          this.setTimer();
        }

        let goods_list = res.datas.goods_image;
        let imagesSlide=[];
        for (var i in goods_list){
          imagesSlide.push({"image":goods_list[i].medium_image,"type":"","data":""})
        }
        this.goodsId=goodIdTmp;
        this.spec_list = res.datas.spec_list;
        this.listImgTmp = imagesSlide;
        this.goodsCommend = res.datas.may_like_goods;
        //window.history.pushState({},0,"/#/"+common.getCookie("country")+"/goods/"+goodIdTmp);
      }else if(res.code == "444"){
        this.$toast(res.datas.error);
      }else{
        this.$toast("error");
      }

    },
    finishToCart:function(num){
      this.popupVisible=false;
      let THIS = this;
      this.dumpNum = num;
      setTimeout(THIS.addCartAnimate,200);
    },
    addDumpNum(){
      this.totalNum+=parseInt(this.dumpNum);
    },
    addfavApi:async function(params){
      this.$indicator.open();
      let res = await addFav(params);
      this.isFavorite=1;
      this.$indicator.close();
    },
    addFavGood:function(){
      var key=common.getCookie('key');
      if(!common.getCookie("key")){
        common.goLogin(this.$router);
        return;
      }
      let params={"goods_id":this.goodsId,"key":key};
      this.addfavApi(params);
    },
    delfavApi:async function(params){
      this.$indicator.open();
      let res = await delFav(params);
      this.$indicator.close();
      this.isFavorite=0;
    },
    delFavGood:function(){
      var key=common.getCookie('key');
      if(!common.getCookie("key")){
        common.goLogin(this.$router);
        return;
      }
      let params={"fav_id":this.goodsId,"key":key};
      this.delfavApi(params);
    },
    favGood:function(){
      //收藏
      if(this.isFavorite==0){
        this.addFavGood();

      }else if(this.isFavorite == 1){
        this.delFavGood();

      }

    },
    showShareDialog:function(){
      this.shareVisible=true;
    },
    hideShareDialog:function(){
      this.shareVisible=false;
    },
    refreshPage:function(){
      //页面 refresh 时，暂停显示页面
      document.querySelector('.goods-main').style.opacity = 0;
      this.initData();
      setTimeout(function(){
        window.scrollTo(0, 0);
      },500)

    },
    closeOverseaTips:function(){
      this.overseaVisible=false;
    },
    continueBuyOversea:function(){
      this.overseaVisible=false;
      this.orderStep();
    },
    buyFlash:function(){
      if(common.getCookie("key")){
        if(this.goodsInfo.goods_logistics_type==2){
          this.overseaVisible=true;
        }else{
          this.orderStep();
        }
      }else{
        common.goLogin(this.$router);
      }
    },
    orderStep:function(){
      this.SAVE_ORDCFRM({
        "cartIds":this.goodsId+"|1",
        "ifCart":"",
        "backUrl":"/flashSale",
        "addrId":'',
        "flashBuy":1,
      });
      this.$router.push('/orderConfirm');
    },
  },
  components:{
  	"HEADE":Head,
    "Indicator":Indicator,
    "BUYFOOTER":Footer,
    "SPEC":Spec,
    "FEEDBACK":Feedback,
    "LIKE":Like,
    "POPUP":Popup,
    "SHARE":Share,
  },
  watch:{
    goodsId:function(){
      this.refreshPage();

    },
    restTime:function(val){
      var days=Math.floor(val/(24*3600));
      this.hrs=Math.floor((val/3600)-(days*24));
      this.mins=Math.floor((val/60)-(days*24*60)-(this.hrs*60));
      this.secs=Math.floor(val-(days*24*3600)-(this.hrs*3600)-(this.mins*60));
    }
  }

}
</script>

<style lang="less" scoped>
.goods-middle-box{
  margin-bottom: 0.28rem;
  background-color:#F9FAFC;
  padding-left: 0.42rem;
}
.coupon-list-box{
  background-color: white;
  padding:0.42rem 0.42rem 2.08rem 0.42rem;
  min-height: 5.56rem;
  position: relative;
  .coupon-list-title{
    text-align: center;
    color: #150000;
    font-weight: bold;
    font-size: 0.39rem;
  }
  ul{
    max-height: 9.03rem;
    overflow-y: auto;
    li{
      padding: 0.42rem 0;
      margin-left: 2.03rem;
      position: relative;
      font-size: 0.33rem;
      color: #150000;
      line-height: 0.47rem;
      border-bottom: 0.01rem solid #DDE0E4;
      em{
        position: absolute;
        left: -2.03rem;
        width: 1.47rem;
        height: 0.44rem;
        background-image: url("../../assets/images/goods/mansong.png");
        padding-left: 0.28rem;
      }
    }
  }
  .coupon-btn-ok{
    background: #F87622;
    border-radius: 0.03rem;
    color: white;
    font-weight: bold;
    font-size: 0.44rem;
    text-align: center;
    height: 1.11rem;
    line-height: 1.11rem;
    position: fixed;
    bottom: 0.42rem;
    right: 0.42rem;
    left: 0.42rem;
  }
}
.oversea-tip-box{
  .oversea-tip-title{
    font-size: 0.44rem;
    text-align: center;
    height: 0.67rem;
    line-height: 0.67rem;
    position: relative;
    padding: 0.28rem 0;
    em{
      width: 0.67rem;
      height: 0.67rem;
      background-image: url("../../assets/images/cashRewards/ic_close.png");
      position: absolute;
      right: 0.28rem;
      top: 0.14rem;
    }
  }
  section{
    font-size: 0.39rem;
    line-height: 0.5rem;
    padding: 0.28rem 0.42rem;
    p{
      margin-bottom: 0.28rem;
    }
    dl{
      padding:0.28rem 0;
      display: table;
      dt{
        width: 1.03rem;
        height: 1.03rem;
        background-repeat: no-repeat;
        background-position: center center;
        display: table-cell;
        padding-left: 1.11rem;
      }
      dt.oversea-tip-ico1{
         background-image: url("../../assets/images/flashSale/shipping_tip_g.png");
      }
      dt.oversea-tip-ico2{
         background-image: url("../../assets/images/flashSale/shipping_tip_m.png");
      }
      dt.oversea-tip-ico3{
         background-image: url("../../assets/images/flashSale/shipping_tip_k.png");
      }
      dd{
        display: table-cell;
      }
    }
  }
  .oversea-tip-btn{
    margin: 0.28rem 0.42rem;
    background-color:#f87622;
    text-align: center;
    font-size: 0.44rem;
    color: white;
    height:1.06rem;
    line-height: 1.06rem
  }
}
.goods-main{
  margin-bottom: 1.67rem;
  .flash-sale-tag{
    height: 1.06rem;
    background-color: #f87622;
    .flash-sale-tag-price{
      padding:0.14rem 0 0.14rem 0.28rem;
      height: 100%;
      color: white;
      width: 70%;
      float: left;
      box-sizing: border-box;
      line-height: 0.78rem;
      font-size: 0.56rem;
      em{
        width: 1.72rem;
        height: 0.78rem;
        background-image: url("../../assets/images/flashSale/ic_goods_detail_flash_sale.png");
        float: left;
        margin-right: 0.28rem;

      }

    }
    .flash-sale-tag-time{
      box-sizing: border-box;
      height: 100%;
      width: 30%;
      float: left;
      color: white;
      background-color: pink;
      text-align: center;
      font-size: 0.33rem;
      padding-top: 0.07rem;
      p:nth-child(2){
        font-size: 0.39rem;
        b{
          font-weight: normal;
        }
      }
    }
  }
  .goods-coupon{
    color: #150000;
    font-size: 0.33rem;
    border-bottom: .03rem solid #eff0f3;
    li{
      padding: 0.42rem 0;
      border-bottom: 1px solid #eff0f3;
      width: 100%;
      position: relative;
      display: table;
      em.coupon-ico{
        width: 1.47rem;
        height: 0.44rem;
        background-image: url("../../assets/images/goods/mansong.png");
        float: left;
        margin-right: 0.14rem;
      }
      p{
          width: 7rem;
          line-height: 0.44rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          float: left;
      }
    }
    li:last-child{
       border-bottom:none;
    }
  }
  .goods-has-box{
    border-bottom: 0.03rem solid #eff0f3;
    padding:0.14rem 0;
    .goods-has-item{
      font-size: 0.33rem;
      color: #666666;
      line-height: 0.5rem;
      height: 0.5rem;
      padding:0.14rem 0;
      em{
        width: 0.5rem;
        height: 0.5rem;
        margin-right:0.14rem;
        vertical-align: middle;
      }
      em.secure-ico{
        background-image: url("../../assets/images/goods/detail_secure_icon.png");
      }
      em.selective-ico{
        background-image: url("../../assets/images/goods/detail_select_icon.png");
      }
    }
  }
  .goods-git{
    color: #150000;
    font-size: 0.33rem;
    margin-bottom: 0.28rem;
    padding: 0 0.28rem 0 0;

    li{
       padding: 0.28rem 0;
      border-bottom: 1px solid #eff0f3;
      width: 100%;
      position: relative;
      min-height: 0.67rem;
      display: table;
      em{
        width: 0.67rem;
        height: 0.67rem;
        background-image: url("../../assets/images/goods/zengpin.png");

        position: absolute;
        top: 50%;
        margin-top: -0.33rem;
      }
      span{
        display: table-cell;
        padding-left: 0.8rem;
        vertical-align: middle;
      }

    }
    li:last-child{
       border-bottom:none;
    }
  }
}
.goods-img{
  background-color: #fff;
  height: 10.0rem;
  position: relative;
  .mint-swipe-items-wrap > div{
    background-size: cover;
    background-repeat: no-repeat;
  }
  .swipe-bot-bg{
    margin-top: -.75rem;
    position: relative;
    width: 100%;
    height: 0.75rem ;
    text-align: center;
    background: -webkit-linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.1)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.1)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.1)); /* Firefox 3.6 - 15 */
    background: linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.1)); /* 标准的语法 */
  }
}

.goods-shop{
    background-color: white;
    color: #150000;
    font-size: 0.39rem;
    line-height: 0.42rem;
    height: 0.42rem;
    margin-bottom: 0.28rem;
    padding: 0.42rem 0 0.42rem 0.42rem;
    span{
      height: 0.6rem;
      display: inline-block;
      width: 50%;
      text-overflow:ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .shop-star{
      float: right;
      width: 0.39rem;
      height: 0.39rem;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url(../../assets/images/star.png);
      margin: 0 0.03rem;
    }
    em{
      margin-left: 0.28rem;
    }
}

.goods-brief{
  padding:0.42rem 0.42rem;
  text-align: left;
  border-bottom: 0.03rem solid #eff0f3;
  background-color: #fff;
}
.goods-name{
    line-height: 0.5rem;
    font-weight: bold;
    font-size: 0.39rem;
    color: #150000;
}
.goods-price{
  padding-top: 0.28rem;
  font-size: 0.5rem;
}
.goods-price>span:nth-child(1){
  float: left;
  display: inline-block;
  overflow: hidden;
  max-width: 50%;
  height: 0.56rem;
  line-height: 0.56rem;
  word-break: normal;
  font-weight: bold;
  font-size: 0.5rem;
  color: #F87622;
}
.goods-price>span:nth-child(2){
  float: right;
  display: inline-block;
  padding-left: 0.56rem;
  margin-left: 0.72rem;
  font-size: 0.33rem;
  color: #999999;
  line-height: 24px;
}
.goods-price>span:nth-child(2)>i{
  color: #C4C8D2;
  font-style: normal;
  margin: 0 0.14rem;
}
.goods-descr{
  font-size: 0.36rem;
  color: #F87622;
  letter-spacing: 0.01rem;
  line-height: 0.36rem;
}
.good-spec-product{
  padding-left: 0.42rem;
  margin:0.28rem 0;
  background-color: #fff;
}
.goods-spec{
  font-size: 0.39rem;
  color: #150000;
  padding: 0.42rem 0;
  border-bottom: 0.03rem solid #eff0f3;
  line-height: 0.39rem;
}
em.arrow_link_ico{
    width: 0.39rem;
    height: 0.39rem;
    float: right;
    margin-right: 0.42rem;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(../../assets/images/goods/arrow_link.png);
}
.goods-express{
  height: 0.44rem;
  padding: 0.42rem 0.42rem 0.42rem 0;
  background-color:  #F9FAFC;
  font-size: 0.33rem;
  color: #9B9B9B;
  border-bottom: .03rem solid #eff0f3;

}
.goods-express>div{
  height:0.44rem;
  line-height: 0.44rem;
  width:42%;
}
.goods-express>div:nth-child(2){
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

.view-more{
    position: fixed;
    background-image:url(../../assets/images/goods/detail_link.png);
    background-size: 100%;
    background-repeat: no-repeat;
    width: 1.81rem;
    height: 1.94rem;
    bottom: 1.7rem;
    margin-top: -0.69rem;
    right: 0.42rem;
    color: white;
    font-size: 0.33rem;
    text-align: center;

    cursor: pointer;
    z-index: 998;
    display: table;
    span{
      display: table-cell;
      vertical-align: middle;
    }
}
</style>
