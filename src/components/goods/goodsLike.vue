<template>
  <div style="background-color:white;padding:0.42rem 0;">
    <div class="like-title">You may also like</div>
    <ul class="like-goods clearfix">
      <li v-for="item in likeList">

        <router-link :to="'/goods/'+item.goods_id">
          <div class="like-goods-pic" :style="'background-image:url('+item.goods_image_url+')'">
          </div>
          <div class="like-goods-price">
            Ksh {{item.goods_price}}
          </div>
        </router-link>
      </li>
    </ul>
    
  </div>
</template>
<style lang="less">
  .like-title{
    font-size: 0.39rem;
    color: #150000;
    letter-spacing: 0.01rem;
    text-align: center;
    font-weight: bold;
  }
  .like-goods{
    
    li{
      display: inline-block;
      width: 28%;
      float: left;
      margin:0.42rem 0 0.42rem 4%;
      box-sizing: border-box;
      .like-goods-pic{
        width:100%;
        height: 2.22rem;
        background-color: white;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
      }
      .like-goods-price{
        margin-top: 0.28rem;
        font-size: 0.39rem;
        color: #E4C187;
        height: 0.39rem;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
      }
    }

  }
</style>
<script>
export default {
  data: function(){
    return {

    }
  },
  props:['likeList'],
}
</script>
