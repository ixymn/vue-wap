<template>
  <header class='head-back' :style="gdsHeaderStyle">
    <div class="header-ico" :style="gdsColorBack" @click="$router.go(-1)">
      
    </div>
    <div class="header-title"><span>{{headTitle}}</span></div>
    
  </header>
</template>
<style lang="less">

.head-back {
  position:fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  top:0;
  z-index: 2;
  height:1.33rem;
  width: 100%;
  background: #424040;
  .header-ico {
    position: absolute;
    top: 50%;
    margin-top: -0.47rem;
    margin-left: 0.28rem;
    width:0.95rem;
    height:0.95rem;
    border-radius: 50%;
    vertical-align: middle;  
    background-image: url(../../assets/images/header-back.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 40%;
  }
  .header-title { 
    height:1.33rem;
    line-height:1.33rem;
    color: white;
    font-size: 0.47rem;
    text-align:center;
    width: 100%;
  }
  .header-title>span{
    display: inline-block;
    width: 50%;
    text-align: center;
  }
}
</style>
<script>
import '../../assets/icons';
export default {
  name: 'header',
  data () {
    return {
      menuShow : false,
    }
  },   // end data
  props:['headTitle','gdsHeaderStyle','gdsColorBack'],
  methods: {
    showMenu :function(event){
      this.menuShow = !this.menuShow;
    },
  }
}
</script>
