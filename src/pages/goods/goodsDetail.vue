<template>
  <div class="detail-box">
    <HEADER :headTitle="name"></HEADER>
    <div class="detail-main">
      <ul class="detail-nav">
        <li :class="{'focus':(tabIndex == 1)}" @click="linkTab(1)">Feedback</li>
        <li :class="{'focus':(tabIndex == 2)}" @click="linkTab(2)">Product Detail</li>
        <li :class="{'focus':(tabIndex == 3)}" @click="linkTab(3)">Help</li>
      </ul>
      <div class="detail-con">
        <FEEDBACK v-if="tabIndex == 1"/>
        <DETAIL v-else-if="tabIndex == 2"/>
        <HELP v-else="tabIndex == 3" v-for="item in helpList" :helpItem="item"></HELP>
      </div>
    </div>
  </div>
</template>

<script>
import {keHelp} from '../../config/help.js'

import Header from '../../components/common/headerBack.vue'
import Detail from '../../components/goods/detail.vue'
import Feedback from '../../components/goods/feedback.vue'
import Help from '../../components/goods/help.vue'

export default {
  data:function(){
    return ({
      name:"Product Detail",
      tabIndex:1,
      helpList:[],
      goodsId:'',
    })
  },
  mounted:function(){
    this.helpList=keHelp.Q;
    this.goodsId=this.$route.params.goodsid;
  },
  components:{
    "HEADER":Header,
    "DETAIL":Detail,
    "FEEDBACK":Feedback,
    "HELP":Help,
  },
  methods:{
    linkTab:function(index){
      this.tabIndex=index;
      
    }
  },
}
  
</script>

<style lang="less">
.detail-box{
  font-family: DroidSans;
  .detail-main{
    margin-top: 1.33rem;
    .detail-nav{
      height: 1.11rem;
      line-height: 1.11rem;
      background-color: white;
      li{
        display: inline-block;
        float: left;
        width: 33%;
        text-align: center;
        font-size: 0.39rem;
        color: #7E7E7E;
      }
      li.focus{
        color: #150000;
        font-family: DroidSans-Bold;
      }
    }
    .detail-con{
      margin-top: 0.28rem;
      background-color: white;
    }
  }
  
}

</style>
