<template>
  <div class="index">
    <!-- <HEADE> -->
    <HEADE />
    <div class="home-tab">
      <ul class="tab">
        <li class="">
          <router-link to='home' class="v-link">
            <i class='home' ></i>
          </router-link>
        </li>
        <li class="">
          <router-link to="lifestyle" class="v-link" >
            <i class='lifestyle' ></i>
          </router-link>
        </li>
        <li>
          <router-link to="usercenter" class="v-link">
            <i class="usercenter"></i>
          </router-link>
        </li>
      </ul>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view ></router-view>
    </transition>
  </div>
</template>
<style lang="less">

.index {margin-top: 2.67rem;}
.home-tab {height: 1.11rem;position:fixed;top: 1.56rem;left: 0;right: 0;z-index: 2;background-color: #f3f5f9;    box-shadow: 0 0 10px 0;}

.v-link {display: block;}
.tab {
  display: flex;justify-content: space-around;align-items: center;height: 100%;
  i {display: inline-block;width: .67rem;height: .67rem;background-size:contain;background-repeat: no-repeat;background-position: center;}
  .home {background-image:url(../../assets/index/icon_home.png); }
  .lifestyle {background-image:url(../../assets/index/icon_lifestyle.png); }
  .usercenter {background-image:url(../../assets/index/icon_usercenter.png); }
}
.router-link-active{
  .home {background-image:url(../../assets/index/icon_home_on.png); }
  .lifestyle {background-image:url(../../assets/index/icon_lifestyle_on.png); }
  .usercenter {background-image:url(../../assets/index/icon_usercenter_on.png); }
}

.router-slid-enter-active, .router-slid-leave-active {transition: all .4s;}
.router-slid-enter, .router-slid-leave-active {transform: translate3d(2rem, 0, 0);opacity: 0;}




</style>

<script>
import {mapState, mapMutations} from 'vuex'
import Header from '../../components/header.vue'
import {getIndexData,getFlashData} from '../../service/getData'

export default {
  name: 'index',
  components:{
    "HEADE":Header,
  },
  data(){
    return {
    }
  },
  methods:{
    ...mapMutations([
      'SET_SITES'
    ]),
    detectCountry:function(){
      let countryCookie = this.$cookie.get("country");
      if(countryCookie){
        return countryCookie;
      }else{
        return false;
      }
    },
    useCountryData:function(c){
      console.log(c);
      this.SET_SITES(c);
    },

  },
  created(){
    var whichCountry = this.detectCountry();
    if(whichCountry){
      this.useCountryData( whichCountry );
    }else{
      this.$router.replace("/changeCountry")
      //this.useCountryData( 'test' );
    }
  },
  computed: {
    ...mapState([
       'home_page','cartGoods','flashSales','site'
    ]),
  }
}
</script>
