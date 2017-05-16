<template>
  <div class="goods-box">
    <HEADE :headTitle="name"/>
    <div class="">
      <BANNER :listImg="listImg"/>
    </div>
  </div>
</template>

<script>
import Header from '../../components/common/headerBack.vue'
import Slide from '../../components/slide.vue'

export default {
  name: 'goods',
  data:function(){
  	return ({
  		name:"Detail",
      listImg:[],
  	});
  },
  components:{
  	"HEADE":Header,
    "BANNER":Slide,
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
  }
}
</script>

<style scoped>
.goods-box{
  margin-top: 1.33rem;
}
</style>
