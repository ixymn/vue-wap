<template>
  <div class="specifiction">
    <div class="spec-title">Specfiction</div>
    <div class="spec-table">
      <dl v-for="(item,key,index) in goodsAttr" class="clearfix">
        <dt>{{item.name}}</dt>
        <dd>
          <span v-for="(value,index) in item" v-if="(index != 'name')">{{value}}</span>
        </dd>
      </dl>
      
    </div>
  </div>
</template>
<style lang="less">
.specifiction{
  background-color: white;
  .spec-title{
    height: 1.28rem;
    text-align: left;
    font-size: 0.39rem;
    color: #7E7E7E;
    letter-spacing: 0.01rem;
    line-height: 1.28rem;
    border-bottom: 0.03rem solid #eff0f3;
    padding-left: 0.28rem;
  }
  .spec-table{
      padding:0.42rem;
      dl{
        dt{
          width: 40%;
          color: #7E7E7E;
          border-left: 0.03rem solid #eff0f3;
          border-right: 0.03rem solid #eff0f3;
          border-bottom: 0.03rem solid #eff0f3;
        }
        dd{
          width: 60%;
          color: #150000;
          border-right: 0.03rem solid #eff0f3;
          border-bottom: 0.03rem solid #eff0f3;
        }
        dt,dd{
          display: block;
          float: left;
          font-size: 0.33rem;
          line-height: 0.33rem;
          padding: 0.39rem 0 0.39rem 0.28rem;
          text-align: left;
          box-sizing: border-box;
        } 
      }
      dl:nth-child(1){
        border-top: 0.03rem solid #eff0f3;
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
  props:["goodsAttr"],
}
</script>
