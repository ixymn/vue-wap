<template>
  <header class='head'>
    <i class='site-logo'>KILIMALL</i>
    <span><input class='search-input' type='text' name='search' value=""></span>
    <icon name='cart-plus' class='shop-cart'></icon>
    <i class='menu-button'></i>

  </header>
</template>

<script>
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
}

</style>
