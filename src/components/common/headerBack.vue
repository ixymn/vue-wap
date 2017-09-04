<template>
  <header class='head-back' :style="gdsHeaderStyle">
    <div class="header-ico" :class="{'header-ico-good':gdsColorBack}" @click="goBack">

    </div>
    <div class="header-title">
      <span>{{headTitle}}</span>
    </div>
    <slot name="header-action"></slot>



    <!-- 2017年8月16日17:24:09header添加统一返回入口 -->
    <div class="header-menu">
      
      <div v-if="isGood">
        <i class='icon icon-menu-good-fav' @click='favGodEvent' :class="{'icon-menu-good-faved':isFavorite}"></i>
        <i class='icon icon-menu-good' @click='showMenu'></i>
      </div>
      <div  v-on:click='showMenu' v-else>
        <i class='icon icon-menu'></i>
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
            <li class="menu-share" @click="showShareDialogEvent" v-show="isGood">
              Share
            </li>
        </ul>
      </div>
      <div v-show="menuShow" style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:998;" @click="showMenu"></div>
    </div>



  </header>
</template>
<style lang="less" scoped>

.head-back {
  position:fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  top:0;
  z-index: 999;
  height:1.33rem;
  width: 100%;
  background: #424040;
  .header-ico {
    position: absolute;
    top: 50%;
    margin-top: -0.47rem;
    margin-left: 0.28rem;
    width:0.94rem;
    height:0.94rem;
    border-radius: 50%;
    vertical-align: middle;
    background-image: url(../../assets/images/header-back.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 40%;
  }
  .header-ico-good{
    background-image: url(../../assets/images/header-back-good.png);
    background-size: 100%;
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



.header-menu {position: absolute;right:0;top:0;}
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
  .menu-home {background-image: url(../../assets/header/icon_home.png);}
  .menu-deal {background-image: url(../../assets/header/icon_deal.png);}
  .menu-life {background-image: url(../../assets/header/icon_lifestyle.png);}
  .menu-order {background-image: url(../../assets/header/icon_orders.png);}
  .menu-message {background-image: url(../../assets/header/icon_message.png);}
  .menu-login{
    background-image: url(../../assets/header/icon_login.png);
  }
  .menu-signup{
    background-image: url(../../assets/header/icon_signup.png);
  }
  .menu-share{
    background-image: url(../../assets/header/ic_pop_share.png);
  }
}

.shop-cart {width: .61rem;height: .61rem;color: #fff;}
i { font-style:normal;}
  .site-logo {color:#fff;font-size: .5rem;font-weight: bold;}
  .header-search {display: flex;opacity: 0.7;height: .61rem;margin:auto .28rem}
  .icon {display: inline-block;background-position: center;background-repeat: no-repeat;background-size: contain;}
  .header-cart {margin:auto .28rem;
    .icon-cart{
      position: relative;
      width: .61rem;
      height: .61rem;
      background-image: url(../../assets/header/icon_cart.png);
      .cart-goods{
        display: inline-block;text-align:center;width: 0.56rem;height: 0.56rem;line-height: 0.56rem;border-radius: 50%;background-color: #F87622;color: #fff;position: absolute;top:-0.28rem;right:-0.28rem;
        font-size: 0.33rem;
      }

    }
  }
  .header-menu {
    position: absolute;
    right:0.34rem;
    top:0.34rem;
    .icon-menu{
      width: .61rem;
      height: .61rem;
      background-image: url(../../assets/header/icon_menu.png);
    }
    .icon-menu-good{
      top:0.2rem;
      width: 0.95rem;
      height: 0.95rem;
      margin-left: 0.56rem;
      background-image: url("../../assets/images/goods-share.png");

    }
    .icon-menu-good-fav{
      width: 0.95rem;
      height: 0.95rem;
      background-image: url("../../assets/images/goods-fav.png");
    }
    .icon-menu-good-faved{
      background-image: url("../../assets/images/goods-faved.png");
    }
    
  }

  .header-search {max-width:50%;
    .search-icon{ height: .61rem;background: #fff;width: .61rem;display: flex;justify-content: center;align-items: center;border-radius: 5px 0 0 5px;
      .icon-search {
        width: .4rem;height: .4rem;background-image: url(../../assets/header/icon_sousuo.png);
      }
    }
    .search-input{
      border: none;border-radius: 0 5px 5px 0;height: .61rem;margin-left: -2px;width:100%;
    }
  }


</style>
<script>
import '../../assets/icons';
import {Indicator}  from 'mint-ui'
import {mapState} from 'vuex'

export default {
  name: 'header',
  data () {
    return {
      menuShow : false,
    }
  },   // end data
  props:['headTitle','gdsHeaderStyle','gdsColorBack','isDiyBack','isGood','isFavorite'],
  computed:{
    ...mapState([
       'loginInfo'
    ]),
  },
  methods: {
    showMenu :function(event){
      this.menuShow = !this.menuShow;
    },
    goBack:function(){
      Indicator.close()
      if(this.isDiyBack == 1){
        this.$emit('goBackEvent');
      }else{
        this.$router.go(-1);
      }
    },
    favGodEvent:function(){
      this.$emit('favGodEvent');
    },
    showShareDialogEvent:function(){
      this.$emit('showShareDialogEvent');
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
