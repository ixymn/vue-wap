<template>
  <div class="hello">
    <HEADE />
    <div class="home-tab">
      <ul class="tab">
        <li class="index-tab">
          <router-link to='home' class="v-link"><icon name="icon-home" class="home-tabs-icon" ></icon></router-link>
        </li>
        <li class="lifestyle-tab">
          <router-link to="lifestyle" class="v-link" ><icon name="icon-compass" class="home-tabs-icon"></icon></router-link>
        </li>
        <li class="usercenter-tab" >
          <router-link to="usercenter" class="v-link"><icon name="icon-user" class="home-tabs-icon"></icon></router-link>
        </li>
      </ul>
    </div>
    <transition name="router-slid" mode="out-in">
            <router-view ></router-view>
    </transition>

  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getIndexData} from '../service/getData'

import Header from '../components/header.vue'
export default {
  name: 'index',
  components:{
    "HEADE":Header,
  },
  methods:{
    ...mapMutations([
      'STORE_HOME_INFO'
    ]),
    async initData(){
      let res = await getIndexData();
      this.STORE_HOME_INFO(res);
    }
  },
  computed: {
    ...mapState([
       'home_page'
    ])
  },
  mounted(){
    this.initData();
  }
}
</script>

<style >
.home-tab {height: 1.11rem;}
.v-link {display: block;}
.tab {display: flex;justify-content: space-around;align-items: center;height: 100%;}
.home-tabs-icon {width: .63rem;height: .63rem;color: #424040; filter:invert(1);}
.router-slid-enter-active, .router-slid-leave-active {transition: all .4s;}
.router-slid-enter, .router-slid-leave-active {transform: translate3d(2rem, 0, 0);opacity: 0;}
</style>
