<template>
  <div class="popup-spec">
    <div class="popup-title">
      <div class="goods-image"></div>
      <div class="goods-info"><span>Ksh 2,239</span> <span>In Stock</span></div>
    </div>

    <div class="popup-spec-item">
      <div>Color Choices</div>
      <ul class="clearfix">
        <li>Blue</li>
        <li>Blue</li>
        <li>Blue</li>
        <li>Blue</li>
      </ul>
    </div>
    <div class="popup-spec-item">
      <div>Color Choices</div>
      <ul class="clearfix">
        <li>Blue</li>
        <li>Blue</li>
        <li>Blue</li>
        <li>Blue</li>
      </ul>
    </div>
    <div class="popup-spec-item clearfix">
      <div style="display:inline-block;float:left;">PCS.</div>
      <dl style="display:inline-block;float:right;">
        <dd class="popup-good-pcs">-</dd>
        <dd >1</dd>
        <dd class="popup-good-pcs">+</dd>
      </dl>
    </div>
    <div class="popup-addcart-btn">
      Add To Cart
    </div>
  </div>
</template>
<style lang="less">
  .popup-spec{
    width: 100%;
    box-sizing: border-box;
    min-height: 7rem;
    padding: 0 0.83rem 2.22rem 0.83rem;
    position: relative;
    .popup-title{
      height: 1.39rem;
      position: relative;
      .goods-image{
        position: absolute;
        top: -1.39rem;
        width: 2.78rem;
        height: 2.78rem;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        float: left;
        background-color: red;
      }
      .goods-info{
        width: 60%;
        margin-top: 0.42rem;
        margin-left:3.06rem;
        float: left;
        font-size: 0.5rem;
        color: #E4C187;
        span{
          display: block;
          text-align: left;
          line-height: 0.5rem;
        }
        span:nth-child(1){
          word-break:break-all;
        }
        span:nth-child(2){
          color: #C7C7C7;
          font-size: 0.33rem;
        }
      }
    }
    .popup-spec-item{
      padding: 0.42rem 0 0.28rem 0;
      div{
        text-align: left;
        font-size: 0.39rem;
        font-weight: bold;
        color: #150000;
        letter-spacing: 0.01rem;
        line-height: 0.39rem;
        
      }
      dl{
        dd{
          display: inline-block;
          line-height: 0.94rem;
        }
        dd:nth-child(2){
          font-size: 0.44rem;
          margin: 0 0.28rem;
        }
        dd.popup-good-pcs{
          font-size: 0.72rem;
          width: 0.94rem;
          height: 0.94rem;
          box-sizing: border-box;
          border-radius: 0.06rem;
          color: #eff0f3;
          border: 0.03rem solid #eff0f3;
        }
      }
      ul{
        li{
          font-size: 0.33rem;
          padding: 0.22rem 0.42rem;
          display: inline-block;
          float: left;
          margin-right: 0.33rem;
          margin-top: 0.42rem;
          border: 0.03rem solid #eff0f3;
        }
      }
    }
    .popup-addcart-btn{
      position: absolute;
      box-sizing: border-box;
      right:0.83rem;
      left: 0.83rem;
      bottom: 0.42rem;
      text-align: center;
      height: 1.11rem;
      line-height: 1.11rem;
      background-color: #F87622;
      border-radius: 0.03rem;
      color: white;
      font-size: 0.44rem;
    }
  }
</style>
<script>
export default {
  data: function(){
    return {

    }
  },
  props:['goodsInfo'],
}
</script>
