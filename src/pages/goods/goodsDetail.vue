<template>
  <div class="detail-box">
    <HEADER v-show="!fromAndroid" :headTitle="name"></HEADER>
    <div class="detail-main" :class="{'headHide':fromAndroid}">
      <ul class="detail-nav">
        <li :class="{'focus':(tabIndex == 1)}" @click="linkTab(1)">Specifications</li>
        <li :class="{'focus':(tabIndex == 2)}" @click="linkTab(2)">Product Detail</li>
        <li :class="{'focus':(tabIndex == 3)}" @click="linkTab(3)">Help</li>
      </ul>
      <div class="detail-con">
        <SPECFICTION v-if="tabIndex == 1" :goodsAttr="goodInfo.goods_attr"/>
        <DETAIL v-else-if="tabIndex == 2"/>
        <HELP v-else="tabIndex == 3" v-for="(item,key) in helpList" isPage="0" :index="key" :helpItem="item"></HELP>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {keHelp} from '../../config/help.js'

import Header from '../../components/common/headerBack.vue'
import Detail from '../../components/goods/detail.vue'
import Specfiction from '../../components/goods/goodsSpecfiction.vue'
import Help from '../../components/goods/help.vue'

export default {
  data:function(){
    return ({
      name:"Product Detail",
      tabIndex:2,
      helpList:[],
      goodsId:'',
      fromAndroid:0,
    })
  },
  mounted:function(){
    this.helpList=keHelp.Q;
    this.goodsId=this.$route.params.goodsid;
    if(this.$route.query.client == "android"){
      this.fromAndroid=1;
    }
    let tabArr=["1","2","3"];
    if(tabArr.indexOf(this.$route.params.tabindex)>=0)
      this.tabIndex=this.$route.params.tabindex;
  },
  components:{
    "HEADER":Header,
    "DETAIL":Detail,
    "SPECFICTION":Specfiction,
    "HELP":Help,
  },
  computed:{
    ...mapState(['goodInfo']),
  },
  methods:{

    linkTab:function(index){
      this.tabIndex=index;

    }
  },
}

</script>

<style lang="less"  scoped>
.headHide{
  margin-top:0 !important;
}
.detail-box{
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
      }
    }
    .detail-con{
      margin-top: 0.28rem;
      background-color: white;
    }
  }

}

</style>
