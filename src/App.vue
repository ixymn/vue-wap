<template>
  <div id="app"  >
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>

export default {
  name: 'app',
  created : function () {
  },
  methods : {

  }
}
</script>

<style lang="less">
a{
  color:#000;
}
#app {
  /*font-family: 'Roboto', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  min-height: 5rem;
  font-size: .33rem;
  a:hover {
      text-decoration: none;
  }
}
.router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
    opacity: 0;
}
.em-ico{
  display: inline-block;
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
}

</style>
