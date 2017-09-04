<template>
  <div class="hot-catelog">
    <div class="title-banner"> HOT CATEGORIES </div>
    <div class="block-list"  >

      <ul class="brand-list">
          <li v-for="(item,index)  in  cateList"   @click="goCate(item.gc_id)" >
            <span v-html="item.gc_name">  </span>
            <img :src="item.gc_icon" >
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'hot-catelog',
  props: ['cateList'],
  data () {
    return {

    }
  },
  computed: {
    ...mapState([
      'site'
    ]),
    cats:function(){
      return this.cateList
    }
  },

  created(){

  },
  mounted(){
    //console.log(this.todayDeal);
  },
  methods:{
    goCate:function(brand_id){
      this.$router.replace("/categorySearch/"+brand_id);
    },
  }

}
</script>
<style lang="less" scoped >
.hot-catelog{
  .title-banner{
    padding: .14rem .33rem;
    border-bottom: 1px solid #ddd;
    font-size: .44rem;
    background-color: white;
    .view-more{
      float:right;
    }
  }
  .block-list{
    display: block;
    box-sizing: border-box;
    overflow: hidden;
    .brand-list{
      background: #fff;
      li{
        width: 5rem;
        display: inline-block;
        position: relative;
        padding: .2rem;
        box-sizing: border-box;
        height:2rem;
        span {
          display: flex;
          width: 2.8rem;
          position: absolute;
          height: 100%;
          align-items: center;
          font-size: .32rem;
          font-weight: bold;
        }
        img{position: absolute;right: 0.1rem;height:1.99rem;width: 1.99rem;}
      }
    }


  }

}


</style>
