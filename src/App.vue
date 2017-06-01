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
  methods: {
    
   },
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
<<<<<<< HEAD
=======
  
>>>>>>> 5222b758955377ae195db7c8c644d9ad56201dcc
}
.router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
    opacity: 0;
}
</style>
