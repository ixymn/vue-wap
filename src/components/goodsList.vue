<template>
<div >
<ul>
<li v-for="goods in goodsList" >
  <div class="goods-image">
    <img :src="goods.image"  >
  </div>
  <div class="goods-detail">
    <p class="goods-name">{{ goods.goods_name }}</p>
    <p class="goods-price">{{ parseInt(goods.goods_promotion_price) }}</p>
  </div>
</li>
</ul>
</div>
</template>
<style lang="less">

</style>

<script>

export default {
    props: ['goodsList'],
    data(){
      return{
      }
    },
    methods:{

    },
    created(){
    },
    updated(){

    }
}
</script>
