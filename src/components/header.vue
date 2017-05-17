<template>
  <header class='head'>
    <i class='site-logo'>KILIMALL</i>
    <div class='header-search' ><label class="search-icon"> <icon name="icon-search" class="icon" ></icon></label><input class='search-input' type='text' name='search' value=""></div>

    <div class="header-cart"><icon name='cart-plus' class='shop-cart'></icon></div>
    <div class="header-menu">
      <div class="icon" v-on:click='showMenu'>
        <icon name='icon-menu' class='shop-cart' ></icon>
      </div>
      <div class="drop-menu" v-show="menuShow" >
        <ul v-on:click='showMenu'>
            <li class="menu-home">
              <router-link to="home" class="v-link" >Home
              </router-link>
              </li>
            <li class="menu-deal">
              <router-link to="goods" class="v-link" >Today's Deal
              </router-link>
              </li>
            <li class="menu-life">
              <router-link to="lifestyle" class="v-link" >Lifestyle
              </router-link>

            </li>
            <li class="menu-order">
              <router-link to="usercenter" class="v-link" >Orders
              </router-link>
            </li>
            <li class="menu-message">
              <router-link to="lifestyle" class="v-link" >Message
              </router-link>
            </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<style lang="less">
.header-menu {position: relative;}
.drop-menu { min-width: 4.25rem; position: absolute; min-height:5.74rem; z-index: 999; background:#2C2B2B; color: #fff;right: 0;top: 1.2rem;
  &:before {
    content: "";border-top: .2rem solid transparent;border-right: .22rem solid #2C2B2B;border-bottom: .2rem solid #2C2B2B;border-left: .22rem solid transparent;display:inline-block;position: absolute;top: -.22rem;right: 0;
    }
  ul{padding: .3rem 0;}
  li{
    text-align: left;min-height: 1.03rem;display: flex;align-items: center;font-size: .42rem;padding-left: 1.33rem;
    background-repeat: no-repeat;background-position:.56rem .32rem;background-size: .42rem;
    &:hover {
      background-color: #150000;
    }
    a{
      letter-spacing:0.022rem;text-decoration: none;color: #fff;
    }
  }
  .menu-home {background-image: url(../assets/header/icon_home.png);}
  .menu-deal {background-image: url(../assets/header/icon_deal.png);}
  .menu-life {background-image: url(../assets/header/icon_lifestyle.png);}
  .menu-order {background-image: url(../assets/header/icon_orders.png);}
  .menu-message {background-image: url(../assets/header/icon_message.png);}


}
.shop-cart {width: .61rem;height: .61rem;color: #fff;}
i { font-style:normal;display:inline-block;}
.head { position:fixed;display: flex;align-items: center;justify-content: space-between;box-sizing: border-box;padding: 0 .42rem;top:0;z-index: 2;height:1.56rem;width: 100%;background: #424040;
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
