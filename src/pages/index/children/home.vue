<template>
  <div class="home-page"   >
    <div class="main-container">
      <slide-banner :listImg="listImg"  class="home-slides" />
      <flash-sales />
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import Slide from '../../../components/slide.vue'
import flash_sales from '../../../components/index/flash_sales.vue'


export default {
  name: 'home',

  data () {
    return {
      listImg: [
        //{url: ""},
      ],
      aa:0
    }
  },
  methods:{
    loadSlide:function(){
      let imagesSlide=[];
      let adv_list = this.home_page.datas.adv_list;
      for(let [index,item] of adv_list.entries()) {
        imagesSlide.push({"image":item.image,'type':item.type,'data':item.data})
      }
      this.listImg = imagesSlide
    },

  },
  computed: {
    ...mapState([
       'home_page'
    ])
  },
  components:{
    "slide-banner":Slide,
    "flash-sales":flash_sales
  },
  mounted(){
    console.log(store);
    this.loadSlide()
  },
  watch:{
    home_page:function(v,o){
    this.loadSlide();
    }
  }
}
</script>

<style>
.home-slides {margin-bottom: .28rem;}
</style>
