<template>
  <div class="lifestyle-page">
fsfsdfdfdsfdsfsf

<div class="addGoods" v-on:click='addClick' ></div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'

export default {
  name: 'lifestyle',
  methods:{
      ...mapMutations([
    		'ADD_TO_CART'
    	]),
    addClick:function(){
      this.ADD_TO_CART()
    }
  },
  computed:{

  },

}
</script>

<style>
.addGoods{
  height: 10rem;
  background: red;
}
</style>
