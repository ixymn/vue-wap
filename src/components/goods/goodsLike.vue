<template>
  <div style="background-color:white;padding:0.42rem 0;">
    <div class="like-title">
      <p><span>{{likeTitle}}</span><em></em></p>
    </div>
    <ul class="like-goods clearfix">
      <li v-for="item in likeList">

        <router-link :to="'/goods/'+item.goods_id">
          <div class="like-goods-pic" :style="'background-image:url('+item.goods_image_url+'),url(./icon_goods_default.png)'">
          </div>
          <div class="like-goods-price">
            {{currencyUnit}} {{item.goods_price}}
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
    p{
      display: inline-block;
      padding: 0 0.83rem;
      position: relative; 
      span{
        padding: 0 0.28rem;
        background-color: white;
        position: relative;
        z-index: 2;
      }
      em{
          display: inline-block;
          position: absolute;
          left: 0;
          right: 0;
          height: 0.03rem;
          margin-top: -0.03rem;
          background-color: #ccc;
          top: 50%;
      }
    }
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
        font-size:0.33rem;
        color:  #F87622;
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
  props:['likeList','likeTitle'],
  computed:{
    currencyUnit:function(){
        return this.$store.state.site.currency;
      },
  }
}
</script>
