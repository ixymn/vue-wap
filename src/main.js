// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'  // promise  polyfill

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
//mint-ui 引入
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint);
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.config.productionTip = false
// font icon plugin
//import Icon from 'vue-awesome/components/Icon.vue'
// use axios as the network io


// use vue-cookie deals with cookies , usage: this.$cookie.set('test', 'Hello world!', 1);
// var VueCookie = require('vue-cookie');
// Vue.use(VueCookie);

// import touch from 'vue-directive-touch';
// Vue.use(touch);

//images lazyload


import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})
// flexible
import './static/flexible_css.js'
import './static/flexible.js'


router.beforeEach((to,from,next)=>{
  let fullpath = to.fullPath; // 包含 query string 参数
  if (router.mode == "history") {
    // 如果路由模式为 history ，则检查地址是否是 hash 模式，并处理改写；
    if(to.redirectedFrom && to.redirectedFrom.indexOf('/#/')==0){
      console.log(window.location.href);
      fullpath = fullpath.split("#/")[1];
      // 取井号后面的地址，并不带斜杠
      window.location.href = '/'+fullpath;
      // 添加斜杠并主动跳转，暂时使用这种解决方案。
    }
  }
  // 正常的 history 模式，检查国家路由
	let countryRegExp= /(kenya|nigeria|uganda|test)/;
	let country = countryRegExp.exec(fullpath);
  // 如果有国家信息，则直接 next() 跳转
  // 如果没有，则检查 cookie，cookie 含有国家信息则加上国家，没有则直接跳转，后续进入选择国家页面
  if(!country){
    if(common.getCookie("country")){
      let redirectURL='/'+common.getCookie("country")+fullpath;
      console.log(redirectURL);
      next(redirectURL);
    }else{
      next();
    }
  }else{
    next();
  }

});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  data:{
    eventHub: new Vue()
  }
})
