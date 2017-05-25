<template>
  <div class='setting'>
<header> <i class='site-logo' ><img src="" ></i></header>


<div class="head-hint">
  Please select your country
</div>

<div>
<ul class="country-list">
<li  v-for='(country,index) in sites' v-bind:class="activeIndex==index?'aaa':'' " v-on:click="selectCountry(index)" >
  <img :src='country.flag'  />
  <span>{{country.name}}</span>
  <i class='tick'></i>
</li>
</ul>
</div>
</div>
</template>

<script>
import ngFlag from  '../../assets/settings/countrys/ng.png'
import keFlag from  '../../assets/settings/countrys/ke.png'
import ugFlag from  '../../assets/settings/countrys/ug.png'
export default {
      data(){
        return{
          sites:[
            {name:'Nigeria',flag:ngFlag},
            {name:'Kenya',flag:keFlag},
            {name:'Uganda',flag:ugFlag}
          ],
          activeIndex:null
        }
      },
      methods:{
        selectCountry:function(index){
          this.activeIndex = index;
        },
      },
      watch:{
        activeIndex:function(){

        }
      },

      created(){
      },
      // computed:{
      //   isSelect:function(){
      //     this.activeIndex ==
      //   }
      // }
  }
</script>

<style lang="less">


</style>
