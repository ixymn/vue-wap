<template>
  <div class="home-page"   >
    <div class="main-container">
      <slide-banner :listImg="listImg"></slide-banner>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import Slide from '../../components/slide.vue'

export default {
  name: 'home',
  data () {
    return {
      listImg: [
        //{url: ""},
      ]
    }
  },
  methods:{

  },
  computed: {
    ...mapState([
       'home_page'
    ])
  },
  components:{
    "slide-banner":Slide
  },
  mounted(){
    let imagesSlide=[];
    let adv_list = this.home_page.datas.adv_list;
    for ( let [index,item] of adv_list.entries()) {
      imagesSlide.push({"url":item.image})
    }
    this.listImg = imagesSlide
  },
  watch:{
    home_page:function(v,o){
      let imagesSlide=[];
      let adv_list = this.home_page.datas.adv_list;
      for ( let [index,item] of adv_list.entries()) {
        imagesSlide.push({"url":item.image})
      }
      this.listImg = imagesSlide
    }
  }
}
</script>

<style>

</style>
