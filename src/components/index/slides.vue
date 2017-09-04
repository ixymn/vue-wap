<template lang="html">
  <mt-swipe :auto="10000" class="home-slides" >
    <mt-swipe-item class="home-slide-item"  v-for="(slide,index) in listImg" :key='index' :style="[{ backgroundImage: 'url(' + slide.image + ')' }]"
       @click.native="goSlide(slide)">
      <!-- <i  class="link-click"></i> -->
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';

export default {
    props: ['listImg'],
    methods:{
      goSlide:function(slide){

        var country = common.getCookie('country');

        if(slide.type == "url"){
          if(slide.data.indexOf("store")>0){
            var store_id = slide.data.match(/store_id=(\w+)(&?)/)[1]
            //this.$router.push({ path:"/"+country+"/store/"+store_id, query: { title: slide.title }})
            this.$router.push({ path:"/store/"+store_id, query: { title: slide.title }})
          }else if(slide.data.indexOf("product_list")>0){
            // 如果 url 是一个搜索页
            if(slide.data.indexOf("gc_id")>0){
              var gc_id = slide.data.match(/gc_id=(\w+)(&?)/)[1]
              this.$router.push({ path:"/categorySearch/"+gc_id })
            }else if(slide.data.indexOf("keyword")>0){
              var keyword = slide.data.match(/keyword=(\w+)(&?)/)[1]
              this.$router.push({ path:"/search/"+keyword })
            }
          }else if(slide.data.indexOf("special_id")>0){
            // 如果 url 是一个专题页
              var id = slide.data.match(/special_id=(\w+)(&?)/)[1]
              this.$router.push({ path:"/special/"+id })
          }else{
            window.open(slide.data)
          }
        }else{
          //this.$router.push({path:"/"+country+"/"+slide.type+"/"+slide.data,query:{ title: slide.title}});
          this.$router.push({path:"/"+slide.type+"/"+slide.data,query:{ title: slide.title}});
        }
      }
    }
}
</script>

<style lang="less" scoped>
.home-slides {height: 3.2rem;
.home-slide-item{width: 100%;height: 100%;background-repeat: no-repeat;background-size: cover;background-position: center;}
.link-click {display: inline-block;width: 100%;height: 100%;background-color: #f00; }
}
</style>
