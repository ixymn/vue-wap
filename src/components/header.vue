<template>
  <header class='head'>
    <i class='site-logo'>KILIMALL</i>
    <div class='header-search' ><label class="search-icon"> <icon name="icon-search" class="icon" ></icon></label><input class='search-input' type='text' name='search' value=""></div>

    <div class="header-cart"><icon name='cart-plus' class='shop-cart'></icon></div>
    <div class="header-menu">
      <div class="icon" v-on:click='showMenu'>
        <icon name='icon-menu' class='shop-cart' ></icon>
      </div>
      <div class="drop-menu" v-show="menuShow"></div>
    </div>
  </header>
</template>
<style lang="less">
.header-menu {position: relative;}
.drop-menu {width: 2rem;position: absolute;height: 4rem;z-index: 999;background: red;}
.shop-cart {width: .61rem;height: .61rem;color: #fff;}
i { font-style:normal;display:inline-block;}
.head {
  position:fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 .42rem;
  top:0;
  z-index: 2;
  height:1.56rem;
  width: 100%;
  background: #424040;
  .site-logo {color:#fff;font-size: .5rem;font-weight: bold;}
  .header-search {display: flex;opacity: 0.7;height: .61rem;margin:auto .28rem}
  .header-cart {margin:auto .28rem}
  .header-menu {margin:auto .28rem}
  .search-icon{ height: .61rem;background: #fff;width: .61rem;display: flex;justify-content: center;align-items: center;border-radius: 5px 0 0 5px;
    .icon {width: .3rem;height: .3rem;}
  }
  .header-search {max-width:50%;}
  .search-input{border: none;border-radius: 0 5px 5px 0;height: .61rem;margin-left: -2px;width:100%;}
}
</style>
<script>
import '../assets/icons';
export default {
  name: 'header',
  data () {
    return {
      menuShow : false,
    }
  },   // end data
  methods: {
    showMenu :function(event){
      this.menuShow = !this.menuShow;
    },
  }
}
</script>
