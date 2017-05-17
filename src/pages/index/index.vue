<template>
  <div class="index">
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
        <li  >
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
.index {margin-top: 1.56rem;}
.home-tab {height: 1.11rem;}
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
import {getIndexData} from '../../service/getData'

import Header from '../../components/header.vue'

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
