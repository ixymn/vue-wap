<template>
  <div style="padding:0.33rem 0.28rem;background-color:white;" class="clearfix">
      <section class="feedback-item">
        <div style="height:0.61rem;margin-bottom:0.14rem;">
          <em class="feedback-star"></em>
          <em class="feedback-star"></em>
          <em class="feedback-star"></em>
          <em class="feedback-star"></em>
        </div>
        <div>Feedback 256</div>
      </section>
      <section class="feedback-item">
        <div style="height:0.61rem;margin-bottom:0.14rem;"><em class="feedback-order"></em></div>
        <div>(Orders 35)</div>
      </section>

  </div>
</template>
<style lang="less">
  .feedback-item{
    width: 50%;
    height: 1.11rem;
    text-align: center;
    font-size: 0.33rem;
    color: #9B9B9B;
    float: left;
    .feedback-star{
      display: inline-block;
      width: 0.36rem;
      height: 0.36rem;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url(../../assets/images/star.png);
      margin: 0.14rem 0;
    }
    .feedback-order{
      display: inline-block;
      width: 0.56rem;
      height: 0.56rem;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url(../../assets/images/goods-order.png);
    }
  }
</style>
<script>
export default {
  data: function(){
    return {

    }
  },
  props:[""]
}
</script>
