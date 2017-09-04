<template>
  <div class="brand-wall">
    <!-- <mt-swipe :auto="0" class="block-list" v-touch:left="slideLeft"  v-touch:right="slideRight"> -->
    <mt-swipe :auto="0" class="block-list" >
      <!-- <mt-swipe-item   class="slide-block" v-for="i in loopMax"  v-bind:class=" i == currentBlock ?'curBlock slide'+i:'hideBlock slide'+i "  > -->
      <mt-swipe-item   class="slide-block" v-for="i in loopMax" key="i.key">

          <span v-for="(item,index)  in  brandList"  v-if=" (index+1)>(i-1)*itemInBlock && (index+1)<=i*itemInBlock"   @click="goSearch(item)" >
          <img :src="item.brand_pic" >
        </span>

      </mt-swipe-item>

      <!-- <span v-for="(item,index)  in  brandList"  v-bind:class="index<currentBlock* itemInBlock &&index>(currentBlock-1)*itemInBlock-1?'curBlock':'' "  >
        <img :src="item.brand_pic" >
      </span> -->

    </mt-swipe>
    <!-- <div class="pagination">
        <ul class='pagin-list'>
          <li class='pagin-dot' v-for="i  in  loopMax"  :class="currentBlock==i?'sel':'' " @click="swipeTo(i)"></li>
        </ul>
    </div> -->

  </div>
</template>

<script>
import {mapState} from 'vuex'
import { Swipe, SwipeItem } from 'mint-ui';
export default {
  name: 'brand-wall',
  props: ['brandList'],
  data () {
    return {
      currentBlock:1,
      itemInBlock:8,
      marginLeft:-0
    }
  },
  computed: {
    ...mapState([
      'site'
    ]),
    brands:function(){
      return this.brandList
    },
    loopMax:function(){
      if (this.brandList.length) {
        var loopLength = Math.ceil(this.brandList.length/this.itemInBlock)
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
    goSearch:function(item){
      var country = common.getCookie("country");
      this.$router.push({path:"/"+ country +"/search/"+item.brand_name,query:{b_id:item.brand_id}});
    },

    slideLeft:function(){

      this.currentBlock == 1? this.currentBlock=this.loopMax:
      this.currentBlock +=1;
    },
    slideRight:function(){
      this.currentBlock == this.loopMax? this.currentBlock=1:
      this.currentBlock -=1;

    },
    swipeTo:function(i){
      this.currentBlock =i;
    }


  }

}
</script>
<style lang="less">
.brand-wall{
  .title-banner{
    padding: .14rem .33rem;
    border-bottom: 1px solid #ddd;
    font-size: .44rem;font-weight: 900;
    .view-more{
      float:right;
    }
  }
.block-list{
  display: block;
  min-height: 3.6rem;
  height: auto;
  .mint-swipe-items-wrap {display: inline-block; height:auto;width: 100%;overflow: visible!important;  position: absolute;top:.2rem;}
  .slide-block {
    display:inline-block;
    min-height: 2rem;height: auto;padding-left: .1rem;
    span{
      display: inline-block;
      width:23.8%;margin:.1rem .05rem;
      img{width: 100%;height: 100%;object-fit: contain; box-sizing: border-box;padding: 3px;}
    }
  }
  .mint-swipe-indicators  .mint-swipe-indicator.is-active {
    width: .36rem;
    border-radius: .15rem;
  }
}



  // .block-list{
  //   display: block;
  //   max-height: 3rem;
  //   box-sizing: border-box;
  //   padding: .3rem .2rem;
  //   white-space: nowrap;
  //   overflow: hidden;
  //   .slide-block {
  //     height: 3rem;
  //     width: 100%;
  //
  //     span{display: inline-block; width: 2.4rem;height: 49%;text-align: center;float: left;
  //     img{ vertical-align: middle;width: 95%}
  //     }
  //   }
  //   .slide-block.hideBlock{display: none;}
  //   .slide1.curBlock{display: inline-block; opacity: 1;
  //   transition: opacity 1s ease-out;}
  //   .slide2.curBlock{display: inline-block;
  //   transition: opacity 1s ease-out;opacity: 1;}
  //   .slide3.curBlock{display: inline-block;
  //   transition: opacity 1s ease-out;opacity: 1;}
  //
  //   @keyframes slidein {
  //     from {
  //       margin-left: 100%;
  //     }
  //     to {
  //       margin-left: 0%;
  //     }
  //   }
  //
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


</style>
