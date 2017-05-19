<template>
  <header class='head'>
    <i class='site-logo'>KILIMALL</i>
    <div class='header-search' >
      <label class="search-icon"> <i class="icon icon-search" ></i></label>
      <input class='search-input' type='text' name='search' value="">
    </div>
    <div class="header-cart">
      <i class='icon icon-cart'>
        <span class="cart-goods" v-bind:class="showCartGoodsNum" >{{this.cartGoods}}</span>
      </i>
    </div>
    <div class="header-menu">
      <div  v-on:click='showMenu'>
        <i class='icon icon-menu' ></i>
      </div>
      <div class="drop-menu" v-show="menuShow" >
        <ul v-on:click='showMenu'>
            <li class="menu-home">
              <router-link to="home" class="v-link" >Home</router-link>
            </li>
            <li class="menu-deal">
              <router-link to="usercenter" class="v-link" >Today's Deal</router-link>
            </li>
            <li class="menu-life">
              <router-link to="lifestyle" class="v-link" >Lifestyle</router-link>
            </li>
            <li class="menu-order">
              <router-link to="usercenter" class="v-link" >Orders</router-link>
            </li>
            <li class="menu-message">
              <router-link to="lifestyle" class="v-link" >Message</router-link>
            </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<style lang="less">
.show{visibility:visible;}
.hide{visibility: hidden;}
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
i { font-style:normal;}
.head { position:fixed;display: flex;align-items: center;justify-content: space-between;box-sizing: border-box;padding: 0 .42rem;top:0;z-index: 2;height:1.56rem;width: 100%;background: #424040;
  .site-logo {color:#fff;font-size: .5rem;font-weight: bold;}
  .header-search {display: flex;opacity: 0.7;height: .61rem;margin:auto .28rem}
  .icon {display: inline-block;background-position: center;background-repeat: no-repeat;background-size: contain;}
  .header-cart {margin:auto .28rem;
    .icon-cart{
      position: relative;
      width: .61rem;
      height: .61rem;
      background-image: url(../assets/header/icon_cart.png);
      .cart-goods{
        display: flex;
        justify-content: center;
        width: .4rem;
        height: .4rem;
        line-height: .44rem;
        border-radius: 50%;
        background-color: #F87622;
        color: #fff;
        position: absolute;top:-.12rem;right:-.19rem;
        border: 2px solid #424040;
      }
    }
  }
  .header-menu {margin:auto .28rem;
    .icon-menu{
      width: .61rem;
      height: .61rem;
      background-image: url(../assets/header/icon_menu.png);
    }
  }
  .search-icon{ height: .61rem;background: #fff;width: .61rem;display: flex;justify-content: center;align-items: center;border-radius: 5px 0 0 5px;
    .icon-search {
      width: .4rem;
      height: .4rem;
      background-image: url(../assets/header/icon_sousuo.png);
    }
  }
  .header-search {max-width:50%;}
  .search-input{border: none;border-radius: 0 5px 5px 0;height: .61rem;margin-left: -2px;width:100%;}
}
</style>
<script>
import {mapState } from 'vuex'

import '../assets/icons';
export default {
  name: 'header',
  data () {
    return {
      menuShow : false,
      cartGoodsNum: 0,
    }
  },   // end data
  computed:{
    ...mapState([
       'cartGoods'
    ]),
    showCartGoodsNum:function(){
      return  (this.cartGoods==0?"hide":"show")
    }
  },

  methods: {
    showMenu :function(event){
      this.menuShow = !this.menuShow;
    },
  }
}
</script>
