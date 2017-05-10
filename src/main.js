// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
// font icon plugin
import Icon from 'vue-awesome/components/Icon.vue'
// use axios as the network io
import axios from 'axios'
Vue.prototype.$http = axios

// flexible
import './static/flexible_css.js'
import './static/flexible.js'


//register  icon component
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
