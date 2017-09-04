<template>
  <div class="home-page"   >
    <div class="main-container">
      <slide-banner :listImg="listImg"></slide-banner>
      <flash-sales class="flash-module"/>
      <today-deal :todayDeal="todayDeal" class="today-module" />
      <brand-wall :brandList="brandList" class="brand-module" />
      <hot-catelog :cateList="cateList" class="cate-module"/>
      <you-may-like :youMayLike="youMayLike" class="mayLike-module" />
    </div>
  </div>
</template>

<script>

import {mapState, mapMutations} from 'vuex'
import {getIndexData,getFlashData} from '../../../service/getData'
import {Indicator} from 'mint-ui'

import Slide from '../../../components/index/slides.vue'


import brand_wall from '../../../components/index/brand_wall.vue'
import flash_sales from '../../../components/index/flash_sales.vue'
import today_deal from '../../../components/index/today_deal.vue'
import hot_catelog from '../../../components/index/hot_catelog.vue'
import you_may_like from '../../../components/index/you_may_like.vue'


export default {
  name: 'home',
  data () {
    return {

    }
  },
  methods:{
    ...mapMutations([
    ]),

  },
  computed: {
    ...mapState([
       'home_page','loginInfo','flashSales'
    ]),
    homeData:function(){
      return this.home_page
    },
    listImg: function(){
      let imagesSlide=[];
      if (this.home_page.code) {
        let adv_list = this.home_page.datas.adv_list||[];
        for(var i in adv_list ) {
          imagesSlide.push({"image":adv_list[i].image,'type':adv_list[i].type,'data':adv_list[i].data,'title':adv_list[i].title})
        }
      }

      return imagesSlide;
    },
    todayDeal:function(){
      if (this.home_page.code){
        return this.home_page.datas.hot_todays_deal
      }else{
        return {}
      }
    },
    brandList:function(){
      if (this.home_page.code){
        return this.home_page.datas.brand
      }else{
        return {}
      }
    },
    cateList:function(){
      if (this.home_page.code){
        return this.home_page.datas.hot_category
      }else{
        return {}
      }
    },
    youMayLike:function(){
      if (this.home_page.code){
        let l = [];
        let list = this.home_page.datas.rec_list||[];
        for(var i in list) {
          l.push({"goods_image":list[i].goods_image,'goods_name':list[i].goods_name,'goods_promotion_price':list[i].goods_promotion_price,'goods_id':list[i].goods_id})
        }
        return l
      }else{
        return []
      }
    },
  },
  components:{
    "slide-banner":Slide,
    "flash-sales":flash_sales,
    "today-deal":today_deal,
    "brand-wall":brand_wall,
    "hot-catelog":hot_catelog,
    "you-may-like":you_may_like
  },
  created(){
  },
  mounted(){
    Indicator.close();
  },
  watch:{
    home_page:function(v,o){
        let imagesSlide=[];
        let adv_list = this.home_page.datas.adv_list||[];
        for(var i in adv_list) {
          imagesSlide.push({"image":adv_list[i].image,'type':adv_list[i].type,'data':adv_list[i].data})
        }
        this.listImg = imagesSlide
    }
  }
}
</script>

<style lang='less' scoped >
.home-page {margin-top: 1.11rem;}
.home-slides {}
.today-module {background-color:#fff;margin:.28rem 0;}
.brand-module {background-color:#fff;margin:.28rem 0;}
.mayLike-module {background-color:#fff;margin:.28rem 0;}


.swiper-container {
    width: 100%;
    height: 3.2rem;
    .swiper-wrapper {
        width: 100%;
        height: 100%;
    }
    .swiper-slide {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .swiper-pagination-bullet {
        width:0.3rem;
        height: 0.3rem;
        display: inline-block;
        background: #7c5e53;
    }
    .swiper-pagination-white .swiper-pagination-bullet{
        background:#999;
    }
}
</style>
