<template>
  <div class="popup-spec">
    <div class="popup-title">
      <div class="goods-image"><img :src="goodsInfo.goods_image" /></div>
      <div class="goods-info"><span>Ksh 2,239</span> <span>In Stock</span></div>
    </div>
    <template v-for="(item,index) in goodsInfo.spec_name">
      <div class="popup-spec-item">
        <div>{{item.spec_name}}</div>
        <ul class="clearfix">
          <li v-for="(item1,index1) in goodsInfo.spec_value[item.spec_value]" :class="{focus: index1 == specInfoParent[item.spec_value]}" :test="specInfo[1]"  @click="focusSpec(item.spec_value,index1)">{{item1}}</li>
        </ul> 
      </div>
    </template>
    
    <div class="popup-spec-item clearfix">
      <div style="display:inline-block;float:left;">PCS.</div>
      <dl style="display:inline-block;float:right;">
        <dd class="popup-good-pcs" @click="minusPCS">-</dd>
        <dd>{{pcs}}</dd>
        <dd class="popup-good-pcs" @click="plusPCS">+</dd>
      </dl>
    </div>
    <div class="popup-addcart-btn" @touchstart="addToCart(goodsInfo,storeInfo,pcs)">
      Add To Cart
    </div>
    <div class="loading-box" v-show="isLoading">
      <LOADING />
    </div>
  </div>
</template>
<script>
    import {mapState,mapMutations} from 'vuex'
    import Loading from '../common/loading.vue'

    export default {
      data: function(){
        return {
          specInfo:'',
          pcs:1,
          isLoading:false,
        }
      },
      props:['goodsInfo','specInfoParent','isShowLoading',"storeInfo"],
      components:{
        "LOADING":Loading,
      },
      computed:{
        ...mapState([
          'cartList'
        ]),
      },
      watch:{
        isShowLoading:function(val){
          this.isLoading=val;
        },
        isLoading:function(val){
          this.$emit("bindLoadingEvent",val);
        },
      },
      methods:{
        ...mapMutations([
          'ADD_CART',
        ]),
        focusSpec:function(index,index1){
          this.isLoading=true;
          this.specInfoParent[index]=index1;
          let goodsIdArr=[];
          for(let key in this.specInfoParent){
            goodsIdArr.push(this.specInfoParent[key]);
          }
          this.$emit('asyncFreshEvent',goodsIdArr.join("|"));
        },
        plusPCS:function(){
          if(this.pcs < this.goodsInfo.goods_storage){
            this.pcs++;
          }
        },
        minusPCS:function(){
          if(this.pcs > 1 ){
            this.pcs--;
          }
        },
        addToCart:function(goodsInfo,storeInfo,pcs){
          this.ADD_CART({goodsInfo,storeInfo,pcs});
          this.$emit('finishToCartEvent');
        }
      },
    }
</script>
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
        img{
          width: 100%;
        }
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
          float: left;
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
          text-align: center;
          font-size: 0.33rem;
          padding: 0.28rem 0.28rem;
          display: inline-block;
          float: left;
          margin-right: 0.33rem;
          margin-top: 0.42rem;
          border: 1px solid #eff0f3;
          min-width: 0.78rem;
        }
        li.focus{
          border-color:#F87622;
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
    .loading-box{
      position: absolute;
      width: 2.5rem;
      height: 0.78rem;
      line-height: 0.78rem;
      left: 50%;
      margin-left: -1.25rem;
      top: 45%;
      text-align: center;
    }
  }
</style>