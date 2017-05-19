<template>
  <div id="goods-detail" style="100%">
  	detail
  </div>
</template>

<script>
import {getGoodsHtml} from '../../service/getData'

export default {
    data: function(){
        return {

        }
    },
    mounted:function(){
        this.initData();
    },
    methods:{
        initData:async function(){
            let res = await getGoodsHtml("15676");
            document.getElementById("goods-detail").innerHTML=res;
            document.querySelectorAll("#goods-detail *[width]").forEach(function(i){
                i.removeAttribute("width");
                i.removeAttribute("height");
            })
            document.querySelectorAll("#product_detail_html *[style*=width]").forEach(function(i){
                i.style.width="";
                i.style.height="";
            })

        }
    },
}
</script>

<style lang="less">

</style>
