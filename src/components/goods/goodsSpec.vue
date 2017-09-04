<template>
  <div class="spec-item" @click="popupSpecEvent">
      <div class="spec-name">{{specItem.spec_name}}</div>
      <div class="spec-select">
        {{specItem.spec_value}}
      </div>
      <em class="spec-link"></em>
  </div>
</template>
<style lang="less">
  .spec-item{
  
    height: 0.83rem;
    line-height: 0.83rem;
    padding: 0.28rem;
    font-size: 0.39rem;
    .spec-name{
      display: inline-block;
      padding-right: 0.28rem;
      color: #7E7E7E;
      text-align: left;
      float: left;
    }
    .spec-select{
      height: 0.83rem;
      text-align: center;
      color: black;
      border: 0.03rem solid #DDDFE4;
      border-radius: 0.03rem; 
      float: left;
      width: 2.78rem;
      overflow: hidden;
      font-size: 0.33rem;
    }
    .spec-link{
      width: 0.5rem;
      height: 0.44rem;
      float: right;
      margin-right: 0.28rem;
      margin-top: 0.17rem;
      display: inline-block;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url(../../assets/images/spec-arrow.png);
    }
  }
</style>
<script>
export default {
  data: function(){
    return {

    }
  },
  props:["specItem"],
  methods:{
    popupSpecEvent:function(){
      this.$emit('popupSpecEvent');
    },
  }
}
</script>
