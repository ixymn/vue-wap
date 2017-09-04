<template>
  <transition name="fade">
      <router-view></router-view>
  </transition>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import './utils/common.js'
import {getIndexData,getFlashData,getToken} from './service/getData'

export default {
  name: 'entry',
  data(){
    return {
    }
  },
  methods:{
    ...mapMutations([
      'SET_SITES','STORE_LOGIN_INFO','FLASH_SALE','STORE_HOME_INFO'
    ]),
    detectCountry:function(){
      let countryCookie = common.getCookie("country");
      if(countryCookie){
        return countryCookie;
      }else{
        return false;
      }
    },
    useCountryData:function(c){
      //this.SET_SITES(c);
    },
    async login(){
      let a = await common.checkLogin();
      this.STORE_LOGIN_INFO(a)
    },
    async initData(){
        let res = await getIndexData();
        this.STORE_HOME_INFO(res);
        let flash = await getFlashData();
        this.FLASH_SALE(flash);
    },
    creatConfigJs(){
        var oHead = document.getElementsByTagName('head').item(0);
        var oScript= document.createElement("script");
        oScript.type = "text/javascript";
        oScript.src="//www.kilimall.com/config.js";
        oHead.appendChild( oScript);
        oScript.onload = ()=>{
          this.$store.state.newApiConfig=window.config;
          if(!common.getCookie('Authorization')){
            this.getTokenFunc()
          }
        }

    },
    async getTokenFunc(){
        let newData  = await getToken(this.configPara);
        common.setCookie('Authorization',newData.access_token,300);
    },

    anchorRedirect:function(){
      var query =  this.$route.query;
      if(query.anchor){
        switch (query.anchor) {
          case "flash-sale":
            this.$router.push("/flashSale")
            break;

        }
      }
    },

  },
  created(){

    var whichCountry = this.detectCountry();
    if(whichCountry){
      this.useCountryData( whichCountry );
    }else{
      this.$router.push("/changeCountry")
      return;
      //this.useCountryData( 'test' );
    }
    this.anchorRedirect();
    this.login();

    //检测UTM广告信息
    if(Ad.afId){
      Ad.AdRefDump(); //delete ad ref utm info
      Ad.AdRefPump(); //add ad utm ref info
    };

    this.initData()

    this.creatConfigJs()
  },
  computed: {
    ...mapState([
       'site','loginInfo','newApiConfig'
    ]),
    configPara(){
        return{
            grant_type: 'client_credentials',
            client_id: this.newApiConfig.client_id,
            client_secret: this.newApiConfig.client_secret,
            url:this.newApiConfig.api+'/oauth/token',
        }
    },
  }
}
</script>

<style  scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-active {
     opacity: 0;
}
</style>
