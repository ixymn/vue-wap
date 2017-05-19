<template>
  <footer class="buy-footer">
    <div class="buy-ico chat"></div>
    <div class="buy-ico cart">
      <em class="cart-band">99</em>
    </div>
    <div class="buy_btn" @click="popupSpecEvent">Buy</div>
  </footer>
</template>
<style lang="less">
.buy-footer{
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 1.11rem;
  padding:0.22rem 0.28rem;
  background-color: white;
  box-shadow:0 0 0.22rem 0 rgba(0, 0, 0, 0.11);
  .buy_btn{
    width: 5.69rem;
    height: 1.11rem;
    text-align: center;
    background: #F87622;
    border-radius: 0.03rem;
    font-size: 0.44rem;
    line-height: 1.11rem;
    color:white;
    float: right;
  }
  .buy-ico{
    float: left;
    width: 0.61rem;
    height: 0.61rem;
    background-repeat: no-repeat;
    background-size: contain;
    margin:0.19rem 0.5rem;
  }
  .chat{
    background-image: url(../../assets/images/chat.png)
  }
  .cart{
    position: relative;
    background-image: url(../../assets/images/cart.png);
    .cart-band{
      position: absolute;
      font-size: 0.33rem;
      top: -0.22rem;
      right: -0.5rem;
      display: inline-block;
      width: 0.72rem;
      
      background: #F87622;
      border-radius: 0.28rem;
      border:0.06rem solid white;
      color: white;
      letter-spacing: 0.03rem;
      line-height:  0.44rem;
      text-align: center;
      box-sizing: border-box;
    }
  }
}
</style>
<script>
export default {
  name: 'buyFooter',
  data: function(){
    return {

    }
  },
  props:[],
  methods: {
   popupSpecEvent:function(){
      this.$emit('popupSpecEvent');
    },
  }
}
</script>
