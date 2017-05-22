<template>
  <div class="home-page"   >
    <div class="main-container">
      <slide-banner :listImg="listImg"></slide-banner>
      <flash-sales :flashList="flashList" class="flash-module"/>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {mapState, mapMutations} from 'vuex'
import {getIndexData,getFlashData} from '../../../service/getData'

import Slide from '../../../components/slide.vue'
import flash_sales from '../../../components/index/flash_sales.vue'
export default {
  name: 'home',
  data () {
    return {
      listImg: [],
      flashList:{},
      homeData:{}
    }
  },
  methods:{
    loadSlide:function(){
      let imagesSlide=[];
      if(this.home_page.code != undefined){
        let adv_list = this.home_page.datas.adv_list||[];
        for(let [index,item] of adv_list.entries()) {
          imagesSlide.push({"image":item.image,'type':item.type,'data':item.data})
        }
        this.listImg = imagesSlide
      }
    },
    loadFlash:function(){

    },
  },
  computed: {
    ...mapState([
       'home_page','cartGoods','flashSales'
    ]),
    homeData:function(){
      return this.home_page
    },
    flashList:function(){
      return this.flashSales
    }
  },
  components:{
    "slide-banner":Slide,
    "flash-sales":flash_sales
  },
  created(){
    this.loadSlide()

  },
  mounted(){
    this.loadSlide()
  },
  watch:{
    home_page:function(v,o){
      let imagesSlide=[];
      let adv_list = this.home_page.datas.adv_list;
      for ( let [index,item] of adv_list.entries()) {
        imagesSlide.push({"image":item.image,'type':item.type,'data':item.data})
      }
      this.listImg = imagesSlide
    }
  }
}
</script>

<style lang="less">
.home-slides {margin-bottom: .28rem;}
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
