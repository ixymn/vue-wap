<template>
  <div class="today-deal">
    <div class="title-banner">
      TODAY'S DEAL

      <router-link to="/promotion" class='view-more' >More <i class="ic-next"></i> </router-link>
    </div>
    <!-- <mt-swipe :auto="0" class="block-list" v-touch:left="slideLeft"  v-touch:right="slideRight"> -->
    <mt-swipe :auto="0" class="block-list" >
      <mt-swipe-item   class="slide-block" v-for="i in loopMax" key="i.key">
        <!-- <dl v-for="(item,index)  in  goodsList"  v-if=" (index+1)>(i-1)*itemInBlock && (index+1)<=i*itemInBlock" v-bind:class="index<currentBlock* itemInBlock &&index>(currentBlock-1)*itemInBlock-1?'curBlock':'' "   @click="goGoods(item.goods_id)"> -->
        <dl v-for="(item,index)  in  goodsList"  v-if=" (index+1)>(i-1)*itemInBlock && (index+1)<=i*itemInBlock"  @click="goGoods(item.goods_id)">
        <dt class="">
          <img :src='item.goods_image' >
        </dt >
        <dd class="">
          <h4>{{item.goods_name}}</h4>
          <div class="price">
            <span style="color:#f87622;">{{site.currency}} {{parseInt(item.goods_promotion_price)}}</span>
            <del>{{site.currency}} {{parseInt(item.goods_marketprice)}}</del>
          </div>

        </dd>
        </dl>
     </mt-swipe-item>

      <!-- <div class="pagination">
          <ul class='pagin-list'>
            <li class='pagin-dot' v-for="i  in  loopMax"  :class="currentBlock==i?'sel':'' " @click="swipeTo(i)"></li>
          </ul>
      </div> -->

    </mt-swipe>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import { Swipe, SwipeItem } from 'mint-ui';

export default {
  name: 'today-deal',
  props: ['todayDeal'],
  data () {
    return {
      currentBlock:1,
      itemInBlock:3,
    }
  },
  computed: {
    ...mapState([
      'site'
    ]),
    goodsList:function(){

      return this.todayDeal
    },
    loopMax:function(){
      if (this.todayDeal.length) {
        var loopLength = Math.ceil(this.todayDeal.length/this.itemInBlock)
      }
      return loopLength
    }
  },

  created(){

  },
  mounted(){
    //console.log(this.todayDeal);
  },
  methods:{
    goGoods:function(id){
      this.$router.replace("/goods/"+id)
    },
    slideLeft:function(){
      this.currentBlock == this.loopMax? this.currentBlock=1:
      this.currentBlock +=1;

    },
    slideRight:function(){
      this.currentBlock == 1? this.currentBlock=this.loopMax:
      this.currentBlock -=1;
    },
    swipeTo:function(i){
      this.currentBlock =i;
    }


  }

}
</script>
<style lang="less">
.title-banner{
  padding: .14rem .33rem;
  border-bottom: 1px solid #ddd;
  font-size: .44rem;font-weight: 900;
  .view-more{
    float:right;font-weight: 400;color:#b5b5b5;
    .ic-next{display: inline-block; width: .36rem;margin-left: .14rem;
      background:url(../../assets/index/right_arrow.png) no-repeat center;
      background-size: contain;
      height:.6rem;float: right;
    }
  }
}
.today-deal{
  .block-list{
    min-height:10.3rem;width: 100%;
    .slide-block {
      min-height: 4.5rem;
    }
    .mint-swipe-items-wrap {display: block;width: 100%;height: auto;  overflow: visible;
  min-height: 5rem;}
    dl{
      padding: .2rem .6rem;width: 100%;
      dt {
        width:25%;height: 2.75rem;display: inline-block;
        img {  width: 100%;padding-top: 0.2rem;}
      }
      dd {display: inline-block;position: relative;float: right;width: 75%;height: 2.5rem;padding:.25rem;box-sizing: border-box;
        h4{font-size:.39rem;line-height: .6rem;height: 1.2rem;  width: 95%;overflow: hidden;}
        .price {position: absolute;bottom: 0;}
        span{display: block;font-size:.39rem;}
        del{display: block;font-size:.32rem;}

      }
    }
    // .curBlock {
    //   display: flex;
    //   // transition: width 1s, transform 1s;
    //   animation-duration: .3s;
    //   animation-name: slidein;
    // }
    // @keyframes slidein {
    // from {
    //   margin-left: 100%;
    // }
    //
    // to {
    //   margin-left: 0%;
    // }
    // }
    // .pagination{
    //   display: flex;
    //   justify-content: center;
    //   .pagin-list {
    //     display: flex ;
    //     .pagin-dot {width: .28rem;height: .28rem;margin:.1rem;border-radius: .14rem;background-color: #f87622;}
    //     .pagin-dot.sel{width: .5rem;}
    //   }
    // }
  }
  .mint-swipe-indicators  .mint-swipe-indicator.is-active {
    width: .36rem;
    border-radius: .15rem;
  }
}

</style>
