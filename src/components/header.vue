<template>
  <header class='head'>
    <i class='site-logo'>KILIMALL</i>
    <span class='search-bar' ><label class="search-icon"> <icon name="icon-search" class="icon" ></icon></label><input class='search-input' type='text' name='search' value=""></span>

    <icon name='cart-plus' class='shop-cart'></icon>
    <icon name='icon-menu' class='shop-cart'></icon>
  </header>
</template>

<script>
import '../assets/icons';
export default {
  name: 'header',
  data () {
    return {
      msg: 'Header'
    }
  }
}
</script>
<style lang="less">
.shop-cart {width: .61rem;height: .61rem;color: #fff;}
i { font-style:normal;display:inline-block;}
.head {
  position:fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 0 .42rem;
  top:0;
  height:1.56rem;
  width: 100%;
  background: #424040;
  .site-logo {color:#fff;font-size: .5rem;font-weight: bold;}
  .search-bar {display: flex;opacity: 0.7;height: .61rem}
  .search-icon{ height: .61rem;background: #fff;width: .61rem;display: flex;justify-content: center;align-items: center;border-radius: 5px 0 0 5px;
    .icon {width: .3rem;height: .3rem;}
  }
  .search-input{border: none;border-radius: 0 5px 5px 0;height: .61rem;margin-left: -2px;}
}

</style>
