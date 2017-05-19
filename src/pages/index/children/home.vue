<template>
  <div class="home-page"   >
    <div class="main-container">
      <div class="home-slides" style="position:relative">
          <div class="swiper-container" >
              <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="str in listImg" :style="{ backgroundImage: 'url('+ str.image + ')' }"></div>
              </div>
              <div class="swiper-pagination swiper-pagination-white"></div>
          </div>
          <slot name="swiper-icons"></slot>
      </div>
      <flash-sales :flashList="flashList" class="flash-module"/>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {mapState, mapMutations} from 'vuex'
import {getIndexData,getFlashData} from '../../../service/getData'

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
    ...mapMutations([
      'STORE_HOME_INFO','FLASH_SALE'
    ]),
    async initData(){
      if(this.home_page.code == undefined){
        let res = await getIndexData();
        this.STORE_HOME_INFO(res);
        this.loadSlide();
      }
      let flash = await getFlashData();
      this.FLASH_SALE(flash);
    },
    loadSlide:function(){
      let imagesSlide=[];
      if(this.home_page.code != undefined){
        let adv_list = this.home_page.datas.adv_list||[];
        for(let [index,item] of adv_list.entries()) {
          imagesSlide.push({"image":item.image,'type':item.type,'data':item.data})
        }
        this.listImg = imagesSlide
        this.initSwiper();
      }
    },
    loadFlash:function(){

    },
    initSwiper:function(){
      let swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          loop: true,
          speed: 400,
          autoplay: 4000,
          onTouchEnd: function() {
              swiper.startAutoplay()
          }
      });
    }


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
    "flash-sales":flash_sales
  },
  created(){
    this.initData()
  },
  mounted(){
    this.loadSlide();
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
