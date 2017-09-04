<template>
  <header class='head'>
    <i class='site-logo'>KILIMALL</i>
    <div class='header-search' >
      <label class="search-icon"> <i class="icon icon-search" ></i></label>
      <input class='search-input' type='text' name='search' value="" ref="searchInput" v-on:click="enterSearch">
    </div>

    <div class="header-cart" @click="linkCart">
      <i class='icon icon-cart'>
        <span class="cart-goods" :class="cartNum?'show':'hide'" >{{cartNum}}</span>
      </i>
    </div>
    <div class="header-menu">
      <div  v-on:click='showMenu'>
        <i class='icon icon-menu' ></i>
      </div>
      <div class="drop-menu" v-show="menuShow" >
        <ul v-on:click='showMenu'>
            <router-link to="/home" class="v-link" ><li class="menu-home" >
              Home
            </li>
            </router-link>
            <router-link to="/promotion" class="v-link" >
            <li class="menu-deal">
              Today's Deal
            </li>
            </router-link>
            <!-- <li class="menu-life">
              <router-link to="lifestyle" class="v-link" >Lifestyle</router-link>
            </li> -->
            <li class="menu-order" @click="linkPage('/order')">
              Orders
            </li>
            <li class="menu-message" @click="linkPage('/cashRewards')">
              Cash Reward</router-link>
            </li>
            <router-link to="/login" class="v-link" >
            <li class="menu-login" v-show="loginInfo.code != '200'">
              Login
            </li>
            </router-link>
            <router-link to="/mobileSignUp" class="v-link" >
            <li class="menu-signup" v-show="loginInfo.code != '200'">
              Sign up
            </li>
            </router-link>
        </ul>
      </div>
      <div v-show="menuShow" style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:998;" @click="showMenu"></div>
    </div>
  </header>
</template>
<style lang="less" scoped>
.search-bar{
  height: 1.2rem;position: absolute;top: .2rem;bottom: .2rem;left: .2rem;right: .2rem;background: red;z-index: 99;
  display: flex;align-items: center;justify-content: flex-start;
  .search-icon{ height: .7rem;background: #fff;width: .7rem;display: flex;justify-content: center;align-items: center;border-radius:0 5px 5px 0;
    .icon-search {
      width: .5rem;height: .5rem;background-image: url(../assets/header/icon_sousuo.png);
    }
  }
  .search-input {width:60%;height:.7rem; }

}
.show{visibility:visible;}
.hide{visibility: hidden;}
.header-menu {position: relative;}
.drop-menu { min-width: 4.5rem; position: absolute;  z-index: 1111; background:#2C2B2B; color: #fff;right: 0;top: 1.2rem;
  &:before {
    content: "";border-top: .2rem solid transparent;border-right: .22rem solid #2C2B2B;border-bottom: .2rem solid #2C2B2B;border-left: .22rem solid transparent;display:inline-block;position: absolute;top: -.22rem;right: 0;
    }
  ul{padding: .3rem 0;}
  li{
    text-align: left;min-height: 1.2rem;display: flex;align-items: center;
    font-size: 0.39rem;padding-left: 1.5rem;
    background-repeat: no-repeat;background-position:0.6rem center;background-size: .75rem;letter-spacing:0.022rem;text-decoration: none;color: #fff;
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
  .menu-login{
    background-image: url(../assets/header/icon_login.png);
  }
  .menu-signup{
    background-image: url(../assets/header/icon_signup.png);
  }
}
.shop-cart {width: .61rem;height: .61rem;color: #fff;}
i { font-style:normal;}
.head { position:fixed;z-index: 999;display: flex;align-items: center;justify-content: space-between;box-sizing: border-box;padding: 0 .42rem;top:0;z-index: 9;height:1.56rem;width: 100%;background: #424040;
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
        display: inline-block;text-align:center;width: 0.56rem;height: 0.56rem;line-height: 0.56rem;border-radius: 50%;background-color: #F87622;color: #fff;position: absolute;top:-0.28rem;right:-0.28rem;
        font-size: 0.33rem;
      }

    }
  }
  .header-menu {margin:auto .28rem;
    .icon-menu{
      width: .61rem;height: .61rem;background-image: url(../assets/header/icon_menu.png);
    }
  }

  .header-search {max-width:50%;
    .search-icon{ height: .61rem;background: #fff;width: .61rem;display: flex;justify-content: center;align-items: center;border-radius: 5px 0 0 5px;
      .icon-search {
        width: .4rem;height: .4rem;background-image: url(../assets/header/icon_sousuo.png);
      }
    }
    .search-input{
      border: none;border-radius: 0 5px 5px 0;height: .61rem;margin-left: -2px;width:100%;
    }
  }
}
</style>
<script>
import {mapState,mapMutations} from 'vuex'
import {getCartNum} from '../service/getData'

import '../assets/icons';
export default {
  name: 'header',
  data () {
    return {
      menuShow : false,
      cartNum:0,
    }
  },   // end data
  computed:{
    ...mapState([
       'cartList',
       'loginInfo'
    ]),
  },
  created:function(){
    this.INIT_CART();
  },
  mounted:function(){
    let num = 0;
    if(this.cartList){
       for(let index in this.cartList){
          num += this.cartList[index].num;
        }
    }
    this.cartNum+=num;
    if(common.getCookie("key")){
      this.initData();
    }
  },
  methods: {
    ...mapMutations(['BACK_CART','INIT_CART','BACK_ORDER']),
    initData:async function(){
      let res = await getCartNum({
          "key":common.getCookie("key"),
      });
      if(res.code == "200"){
        this.cartNum+=res.datas.cart_count;
      }
    },
    showMenu :function(event){
      this.menuShow = !this.menuShow;
    },
    enterSearch:function(){
      this.$router.push("/search/"+this.$refs.searchInput.value)

    },
    linkCart:function(){
      this.BACK_CART(this.$route.path);
      this.$router.push("/cart");
    },

    linkPage:function(url){
      if(this.loginInfo.code == "200"){
        this.$router.push(url);
      }else{
        common.goLogin(this.$router);
      }
    }
  }
}
</script>
