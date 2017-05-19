<template>
  <header class='head-back' :style="gdsHeaderStyle">
    <div class="header-ico"><icon name='icon-goback' class='shop-cart'></icon></div>
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
  padding: 0 .42rem;
  top:0;
  z-index: 2;
  height:1.33rem;
  width: 100%;
  background: #424040;
  .header-ico {}
  .header-title { 
    position: absolute;
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
  props:['headTitle','gdsHeaderStyle'],
  methods: {
    showMenu :function(event){
      this.menuShow = !this.menuShow;
    },
  }
}
</script>
