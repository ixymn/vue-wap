<template>
  <footer class="buy-footer">
    <!-- <div class="buy-ico chat" @click="linkHelp"></div> -->
    <div style="margin-left:1.4rem;" class="buy-ico cart" @click="linkCart">
      <em ref="cartNum" class="cart-band" v-show="cartCount">{{cartCount>99?'..':cartCount}}</em>
    </div>
    <div class="buy_btn" @click="popupSpecEvent" v-if="type!=3">Buy</div>
    <div class="buy_btn" @click="buyFlashEvent" v-else>Buy</div>

    <div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
      
  </footer>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  data: function(){
    return {
      balls: [
            {
                show: false
            },
            {
                show: false
            },
            {
                show: false
            },
        ],
      dropBalls:[],
    }
  },
  props:['cartCount','goodsId',"type","cartAction"],
  methods: {
    ...mapMutations(['BACK_CART']),
    popupSpecEvent:function(){
      this.$emit('popupSpecEvent');
    },
    buyFlashEvent:function(){
      this.$emit('buyFlashEvent');
    },
    linkCart:function(){
      this.BACK_CART(this.$route.path);
      this.$router.push("/cart");
    },
    linkHelp:function(){
      this.$router.push("/goodsDetail/"+this.goodsId+"/3");
    },
    ballAnimate(){

        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;

            this.dropBalls.push(ball);
            return;
          }
        }

    },
    beforeDrop(el){
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            el.style.display = '';

            el.style.webkitTransform = `translate3d(0,-0.3rem,0)`;
            el.style.transform = `translate3d(0,-0.3rem,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(5rem,0,0)`;
            inner.style.transform = `translate3d(5rem,0,0)`;
          }
        }
    },
    dropping(el,done){
          let rf = el.offsetHeight;
        // this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';


          el.addEventListener('transitionend', done);
        // });
    },
    afterDrop(el) {

        this.$refs.cartNum.style.transform = "scale(1.6)"
        this.$refs.cartNum.style.opacity = "0.8"

        var THIS = this;
        function next(){
            THIS.$emit('delayAddNum')
            
            THIS.$refs.cartNum.style.transform = "scale(1)"
            THIS.$refs.cartNum.style.opacity = "1"
        }
        setTimeout(next,400)

        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
    }
  },
  watch:{
    cartAction(){
        this.ballAnimate()
    }
  }
}
</script>
<style lang="less">

.ball-container .ball{
    position: fixed;
    left: 2.0rem;
    bottom: 0.778rem;
    z-index: 200;
    transition: all .5s cubic-bezier(.52,-17.43,.95,.21);
}

.ball-container .ball .inner{
    width: 0.444rem;
    height: 0.444rem;
    border-radius: 50%;
    background: #f87622;
    transition: all .5s linear;
}

.buy-footer{
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 1.11rem;
  padding:0.22rem 0.28rem;
  background-color: white;
  box-shadow:0 0 0.22rem 0 rgba(0, 0, 0, 0.11);
  z-index:3;
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
        display: inline-block;
        text-align: center;
        width: .6rem;
        height: .6rem;
        line-height: .48rem;
        border: 0.06rem solid white;
        box-sizing: border-box;
        border-radius: 50%;
        background-color: #f87622;
        color: #fff;
        position: absolute;
        top: -.28rem;
        right: -.3rem;
        font-size: .3rem;
        transition: all .4s ease-in-out;
        
    }
  }
}
</style>

