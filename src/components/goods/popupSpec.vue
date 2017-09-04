<template>
  <div class="popup-spec">
    <div class="popup-title">
      <div class="goods-image"><img :src="goodsInfo.goods_image" onerror="this.src='./icon_goods_default.png'"/></div>
      <div class="goods-info"><span>{{currencyUnit}} {{goodsInfo.price}}</span> <span>In Stock</span></div>
    </div>
    <div class="popup-spec-overflow"> 
      <template v-for="(item,index) in goodsInfo.spec_name">
        <div class="popup-spec-item">
          <div>{{item.spec_name}}</div>
          <ul class="clearfix" >
            <li v-for="(item1,index1) in goodsInfo.spec_value[item.spec_value]" :class="{focus: index1 == specInfoParent[item.spec_value]}" :test="specInfo[1]"  @click="focusSpec(item.spec_value,index1)">{{item1}}</li>
          </ul>
        </div>
      </template>

      <div class="popup-spec-item clearfix">
        <div style="display:inline-block;float:left;">PCS.</div>
        <dl style="display:inline-block;float:right;">
          <dd class="popup-good-pcs" @click="minusPCS"></dd>
          <dd>{{pcs}}</dd>
          <dd class="popup-good-pcs" @click="plusPCS"></dd>
        </dl>
      </div>
    </div>
    <div v-if="goodsInfo.goods_storage && goodsInfo.goods_promotion_type != 3" class="popup-addcart-btn" @click="addToCart()">
      Add To Cart
    </div>
    <div v-else class="popup-addcart-btn" style="background-color:#ddd">
      Add To Cart
    </div>
    <div class="loading-box" v-show="isLoading">
      <LOADING />
    </div>
  </div>
</template>
<script>
    import {mapState,mapMutations} from 'vuex'
    import {addToCart} from  '../../service/getData'
    import Loading from '../common/loading.vue'

    export default {
      data: function(){
        return {
          specInfo:'',
          pcs:1,
          isLoading:false,
        }
      },
      props:['goodsInfo','specInfoParent','isShowLoading'],
      components:{
        "LOADING":Loading,
      },
      computed:{
        ...mapState([
          'cartList'
        ]),
        currencyUnit:function(){
          return this.$store.state.site.currency;
        }
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
          this.pcs=1;
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
        addToCart:function(){
          if(common.getCookie("key")){
            this.addLogedCartApi();
          }else{
            this.ADD_CART({"goodId":this.goodsInfo.goods_id,"pcs":this.pcs});
            this.$emit('finishToCartEvent',[this.pcs]);
          }

          this.$emit('clickCartAnimate');
        },
        addLogedCartApi:async function(){
          let param={
              "key":common.getCookie("key"),
              "goods_id":this.goodsInfo.goods_id,
              "quantity":this.pcs,
            },
            res=await addToCart(param);
            if(res.code == "200"){
                this.$emit('finishToCartEvent',[this.pcs]);
            }else if(res.code == "444"){
                this.$toast({
                  message:res.datas.error,
                  position:'bottom',
                });
            }else{
                this.$toast({
                  message:"add to cart error",
                  position:'bottom'
                });
            }
        },
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
      height: 2.5rem;
      position: relative;
      .goods-image{
        position: absolute;
        top: -0.69rem;
        width: 2.61rem;
        height: 2.61rem;
        padding: 0.08rem;
        background-color: white;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        float: left;
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
        color: #F87622;
        span{
          display: block;
          text-align: left;
          line-height: 0.5rem;
        }
        span:nth-child(1){
          word-break:break-all;
          font-weight: bold;
        }
        span:nth-child(2){
          color: #C7C7C7;
          font-size: 0.33rem;
        }
      }
    }
    div.popup-spec-overflow{
      width: 100%;
      max-height: 7rem;
      overflow: auto;
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
            line-height: 0.67rem;
          }
          dd:nth-child(2){
            font-size: 0.44rem;
            margin: 0 0.28rem;
          }
          dd.popup-good-pcs{

            font-size: 0.72rem;
            width: 0.67rem;
            height: 0.67rem;
            box-sizing: border-box;
            border-radius: 0.06rem;
            color: #eff0f3;
            background-size: 100%;
          }
          dd.popup-good-pcs:nth-child(1){
            background-image: url(../../assets/images/pcs-minus.png);
          }
          dd.popup-good-pcs:last-child{
            background-image: url(../../assets/images/pcs-plus.png);
          }
        }
        ul{
          li{
            text-align: center;
            font-size: 0.33rem;
            color: #150000;
            padding: 0.19rem 0.28rem;
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
