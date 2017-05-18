<template>
  <div style="background-color:white;padding:0.42rem 0;">
    <div class="like-title">You may also like</div>
    <ul class="like-goods clearfix">
      <li>
        <a href="product_detail.html?goods_id=391289">
          <div class="like-goods-pic">
          </div>
          <div class="like-goods-price">
            Ksh 2,239
          </div>
        </a>
      </li>
      <li>
        <a href="product_detail.html?goods_id=391289">
          <div class="like-goods-pic">
          </div>
          <div class="like-goods-price">
            Ksh 2,239
          </div>
        </a>
      </li>
      <li>
        <a href="product_detail.html?goods_id=391289">
          <div class="like-goods-pic">
          </div>
          <div class="like-goods-price">
            Ksh 2,239
          </div>
        </a>
      </li>
      <li>
        <a href="product_detail.html?goods_id=391289">
          <div class="like-goods-pic">
          </div>
          <div class="like-goods-price">
            Ksh 2,239
          </div>
        </a>
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
        background-image: url(http://image-s3.kilimall.co.ke/shop/store/goods/1053/2017/03/1053_05433437220916194_240.jpg);
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
  }
}
</script>
