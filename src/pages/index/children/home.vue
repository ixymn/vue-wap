<template>
  <div class="home-page">
    <div class="main-container">
      <slide-banner :listImg="listImg"></slide-banner>
    </div>
  </div>
</template>

<script>
import Slide from '../../../components/slide.vue'

export default {
  name: 'home',
  data () {
    return {
      listImg: [
        //{url: ""},
      ]
    }
  },
  created:function(){
    var url = 'http://mobile.kilimall.co.ke/index.php?act=index_new&op=index';
    let imagesSlide=[];
    this.$http.get(url).then(result=>{
        let adv_list = result.data.datas.adv_list;
        for ( let [index,item] of adv_list.entries()) {
          imagesSlide.push({"url":item.image})
        }
    },result=>{
        // alert('连接失败');
    });
    this.listImg = imagesSlide;
  },
  components:{
    "slide-banner":Slide
  }
}
</script>

<style>

</style>
