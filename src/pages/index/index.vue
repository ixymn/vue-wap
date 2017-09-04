<template>
  <div class="index">
    <!-- <HEADE> -->
    <HEADE />
    <APPAD></APPAD>
    <div class="home-tab">
      <div class="tab">

        <div  v-for="(tab,index) in tabs" >
            <router-link :to="'/'+country+'/'+tab.name" active-class="on">
              <i  :class="tab.name" ></i>
            </router-link>
        </div>
      </div>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view ></router-view>
    </transition>
    <div class="popup-message"  @click="hidePopup" :class="adShow?'show':''" >
      <div class="popup-content"  @click.stop="goAd">
        <i class="close-popup" @click.stop="hidePopup"></i>
        <a :href="adURL"  @click="hidePopup">
        <img :src="adPic" class="ad-pic">
        </a>
        <span class=""></span>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import Header from '../../components/header.vue'
import APPAD from '../../components/appAd.vue'
import {getIndexData,getFlashData,getIndexAdInfo} from '../../service/getData'

export default {
  name: 'index',
  components:{
    "HEADE":Header,
    'APPAD':APPAD,
  },
  data(){
    return {
      tabs:[
        {name:"home"},
        {name:"category"},
        {name:"usercenter"}
      ],
      tabIndex:0,
      adShow:0,
      adPic:"",
      adURL:"",
    }
  },
  computed:{
    country:function(){
      return common.getCookie("country");
    },
  },
  created(){
    this.goAd();
    this.addGTMscript();
    this.initData();
  },
  methods:{
    ...mapMutations([
      'SET_SITES','STORE_HOME_INFO','FLASH_SALE'
    ]),
    goLink(v){
      this.tabIndex = v;
      this.$router.push("/"+this.tabs[v].name);
    },
    hidePopup(){
      this.adShow = 0;
      common.setCookie("hidePopup","1",1);
    },
    async initData(){
        let res = await getIndexData();
        this.STORE_HOME_INFO(res); 
        if(res.datas.flash_info){
          this.FLASH_SALE(res.datas.flash_info);
        }
    },
    async goAd(){
      if(!common.getCookie('hidePopup')){

          let adInfo  = await getIndexAdInfo();
          this.adShow = adInfo.datas.activity_pop_info.state;
          this.adURL = adInfo.datas.activity_pop_info.url;
          this.adPic = adInfo.datas.activity_pop_info.pic;
      }
    },
    addGTMscript(){
      if(common.getCookie("country")){
        var url ="";
        switch (common.getCookie("country")) {
          case "kenya":
            url = "//m.kilimall.co.ke/mjs/extend.js"
            break;
          case "uganda":
            url = "//m.kilimall.co.ug/mjs/extend.js"
            break;
          case "nigeria":
            url = "//m.kilimall.ng/mjs/extend.js"
            break;
        }
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = url;
        document.body.insertBefore(s, document.body.firstChild);
      }
    }

  },
  
}
</script>


<style lang="less" scoped >
.popup-message.show {display: flex;}
.popup-message {display: none;justify-content: center;align-items: center;position:fixed;top:0;left:0;right: 0;bottom:0;z-index: 9999;background-color: rgba(255,255,255,.5);
  .popup-content {width:6rem;height:8rem;position: relative;
    .close-popup{ position: absolute; right: .2rem;top: .2rem;display: inline-block;width: 1rem;height:1rem;background: url(../../assets/index/close.png) no-repeat center;background-size: .7rem .7rem; }
  }
  .ad-pic{width: 100%;height: 100%;object-fit: contain;}
}

.index {margin-top: 2.67rem;}
.home-tab {height: 1.11rem;position:fixed;top: 1.56rem;left: 0;right: 0;z-index: 2;background-color: #f3f5f9;    box-shadow: 0 0 10px 0;}

.v-link {display: block;}
.tab {
  display: flex;justify-content: space-around;align-items: center;height: 100%;background-color: white;
  a{
    display: block;
  }
  i {display: inline-block;width: .67rem;height: .67rem;background-size:contain;background-repeat: no-repeat;background-position: center;}
  .home {background-image:url(../../assets/index/icon_home.png); }
  .category {background-image:url(../../assets/index/category.png); }
  .usercenter {background-image:url(../../assets/index/icon_usercenter.png); }
}
.on{
  .home {background-image:url(../../assets/index/icon_home_on.png); }
  .category {background-image:url(../../assets/index/category_on.png); }
  .usercenter {background-image:url(../../assets/index/icon_usercenter_on.png); }
}

.router-slid-enter-active, .router-slid-leave-active {transition: all .4s;}
.router-slid-enter, .router-slid-leave-active {transform: translate3d(2rem, 0, 0);opacity: 0;}

</style>
