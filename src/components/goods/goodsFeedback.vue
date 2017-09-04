<template>

      <section class="feedback-item">
        <div v-if="feedbackNum!=0">
          <router-link :to="'/feedback/'+this.goodsId" >
            <div class="feedback-title clearfix">
              Feedback ({{feedbackNum}}) 
              <em class="arrow_link_ico"></em>
              <em v-for="item in stars" class="feedback-star"></em>
            </div>
          </router-link>
          <div class="feedback-one" v-if="feedInfo.length">
            <div class="feedback-photo">
              <em class="em-ico" :style="'background-image:url('+feedInfo[0].member_avatar+')'"></em>{{feedInfo[0].geval_frommembername}}
            </div>
            <p>{{feedInfo[0].geval_content}}</p>
          </div>
        </div>
        <div v-else>
          <div class="feedback-title clearfix" style="padding-right:0.42rem;">
              Feedback ({{feedbackNum}}) 
              <em v-for="item in stars" class="feedback-star"></em>
            </div>
        </div>
        
      </section>
    
</template>
<style lang="less">

  .feedback-item{
    background-color: white;
    color: #150000;
    font-size: 0.39rem;
    line-height: 0.39rem;
    margin-bottom: 0.28rem;
    padding-left: 0.42rem;
    div.feedback-title{
      padding: 0.42rem 0 0.42rem 0;
      height:0.39rem;
      margin-bottom:0.14rem;
      border-bottom: .03rem solid #eff0f3;
      .feedback-star{
        float: right;
        width: 0.39rem;
        height: 0.39rem;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url(../../assets/images/star.png);
        margin: 0 0.03rem;
      }
      em{
        margin-left: 0.28rem;
      }
      em.arrow_link_ico{
        width: 0.39rem;
        height: 0.39rem;
        float: right;
        margin-right: 0.42rem;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url(../../assets/images/goods/arrow_link.png);
      }
    }
    
   .feedback-one{
      padding: 0.42rem 0 0.42rem 0;
      .feedback-photo{
          font-size: 0.33rem;
          color: #999999;
          em{
            width: 0.67rem;
            height: 0.67rem;
            border-radius: 50%;
            margin-right: 0.21rem;
            vertical-align: middle;
            background-image: url(../../assets/images/star.png);
          }
      }
      p{
        margin-top: 0.28rem;
        color: #150000;
        font-size: 0.33rem;
        padding-right: 0.42rem;
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
  computed:{
    stars:function(){
      var tmpArr=[];
      for(var i = 0;i<this.starNum;i++){
          tmpArr.push(i);
      }
      return tmpArr;
    }
  },
  props:["goodsId","starNum","feedbackNum","feedInfo"]
}
</script>
