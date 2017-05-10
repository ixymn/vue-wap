<template>
  <div class="hello">
    <HEADE />
    <HOMETAB />
    <div class="main-container">
      <app-banner :listImg="listImg"></app-banner>
    </div>
  </div>
</template>

<script>
import Header from '../components/header.vue'
import hometab from '../components/hometab.vue'
import Slide from '../components/slide.vue'
export default {
  name: 'index',
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
    "HOMETAB": hometab,
    "HEADE":Header,
    "app-banner":Slide
  }
}
</script>

<style scoped>

.upload-label { display: block;width: 1.33rem;height: 1.33rem;background: red;}
</style>
