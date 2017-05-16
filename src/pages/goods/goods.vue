<template>
  <div class="goods-box">
    <HEADE :headTitle="name" :gdsHeaderStyle="headStyle"/>
    <div class="goods-main">
      <div class="goods-img">
        <BANNER :listImg="listImg" :gdsBannerStyle="gdsBannerStyle" :gdsBannerItemStyle="gdsBannerItemStyle">
          <div slot="swiper-icons" class="share-icons">
            <img class="share-icons1" src="../../assets/images/goods-fav.png">
            <img class="share-icons2" src="../../assets/images/goods-share.png">
          </div>
        </BANNER>
      </div>
      <div class="goods-brief">
        <div class="goods-name">{{goodsInfo.goods_name}}</div>
        <div class="goods-price">
          <span>Ksh 2,239</span><span>In Stock</span>
        </div>
        <div class="goods-descr">Duis sollicitudin hendrerit magna eu dictum.</div>
      </div>
      <div class="goods-spec">
        <SPEC v-for="item in goodsInfo.spec" :specItem="item"/>
      </div>

      <div class="goods-express">
        <div style="float:left;">
          <em class="goods-express-ico1" style=""></em>
          KiliExpress 1-3 Days
          <em class="goods-express-ico2" ></em>
        </div>
        <div style="float:right;">
          <em class="goods-express-ico3" ></em>
          Pay on delivery
        </div>
      </div>
      <div class="goods-feedback" style="margin-top:0.28rem;">
        <FEEDBACK />
      </div>
      <div class="goods-specfiction">
        
      </div>
    </div>
    <FOOTER />
  </div>
</template>

<script>
import Header from '../../components/common/headerBack.vue'
import Footer from '../../components/common/buyFooter.vue'
import Spec from '../../components/goods/goodsSpec.vue'
import Feedback from '../../components/goods/goodsFeedback.vue'
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
      gdsBannerItemStyle:{
        backgroundSize:"contain",
      },//banner的特例样式
  		name:"Detail",
      listImg:[],
      goodsInfo:{},
  	});
  },
  components:{
  	"HEADE":Header,
    "BANNER":Slide,
    "FOOTER":Footer,
    "SPEC":Spec,
    "FEEDBACK":Feedback,
  },
  created:function(){
    var url = 'http://mobile.kilimall.co.ke/index.php?act=goods&op=new_goods_detail&goods_id=27494';
    let imagesSlide=[];
    this.$http.get(url).then(result=>{
      
        let goods_list = result.data.datas.goods_image;
        for ( let [index,item] of goods_list.entries()){
          imagesSlide.push({"url":item.medium_image})
        }
        this.goodsInfo = result.data.datas.goods_info;

    },result=>{
        // alert('连接失败');
    });
    this.listImg = imagesSlide;
  }
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
  background-color: #fff;
}
.goods-name{
    font-size: 0.44rem;
    color: #150000;
    line-height: 0.5rem;
}
.goods-price{
  padding: 0.28rem 0;
  font-size: 0.5rem;
  color: #E4C187;
  line-height: 0.56rem;
}
.goods-price>span:nth-child(1){
  display: inline-block;
  overflow: hidden;
  width: 50%;
}
.goods-price>span:nth-child(2){
  display: inline-block;
  padding-left: 0.56rem;
  margin-left: 0.72rem;
  border-left: solid #C4C8D2;
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
  height: 0.33rem;
  margin-top: 0.28rem;
  padding: 0.47rem 0.28rem;
  background-color: white;
  font-size: 0.33rem;
  color: #9B9B9B;
}
.goods-express>div{
  height:100%;
  width:48%;
}
.goods-express>div:nth-child(2){
  border-left:0.03rem solid #DDDFE4; 
}
.goods-express>div>em{
  display: inline-block;
  width: 0.33rem;
  height: 0.33rem;
  background-repeat: no-repeat;;
  background-size: contain;
  vertical-align: middle;
}
.goods-express-ico1{
  background-image:url(../../assets/images/goods-express.png);
}
.goods-express-ico2{
  background-image:url(../../assets/images/goods-express-link.png);
  margin-left: 0.14rem;
}
.goods-express-ico3{
  background-image:url(../../assets/images/goods-delivery.png);
}
</style>
