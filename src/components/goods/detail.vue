<template>
  <div id="goods-detail" style="overflow:hidden">

  </div>
</template>

<script>
import {getGoodsHtml} from '../../service/getData'

export default {
    data: function(){
        return {
            goodsId:'',
        }
    },
    mounted:function(){
        this.goodsId=this.$route.params.goodsid;
        this.initData();
    },
    methods:{
        initData:async function(){
            let res = await getGoodsHtml(this.goodsId);
            
            document.getElementById("goods-detail").innerHTML=res;
            document.querySelectorAll("#goods-detail *[width]").forEach(function(i){
                i.removeAttribute("width");
                i.removeAttribute("height");
            })
        
            document.querySelectorAll("#product_detail_html *[style*=width]").forEach(function(i){
                i.style.width="";
                i.style.height="";
            }); 

        }
    },
}
</script>

<style lang="less">
#goods-detail {
    width: 100%;
    box-sizing: border-box;
  padding:0 .4rem!important;
  font-size:0.33rem !important;
  img{
    width: 100% !important;
    height: auto !important;
    display: block;
    vertical-align: bottom;
  }
}
</style>
