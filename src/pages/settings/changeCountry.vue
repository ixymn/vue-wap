<template>
  <div class='setting'>
<header> <i class='site-logo' ><img src="" ></i></header>


<div class="head-hint">
  Please select your country
</div>

<div>
<ul class="country-list">
<li  v-for='(country,index) in sites' v-bind:class="activeIndex==index?'sel':'' " v-on:click="selectCountry(index)" :name="country.name" >
  <img :src='country.flag'  />
  <span>{{country.name}}</span>
  <i class='tick'></i>
</li>
</ul>
</div>
<button type="button" class="enter-button" v-on:click="enterMall">Shopping Now</button>
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
            {name:'nigeria',flag:ngFlag},
            {name:'kenya',flag:keFlag},
            {name:'uganda',flag:ugFlag}
          ],
          activeIndex:null
        }
      },
      methods:{
        selectCountry:function(index){
          this.activeIndex = index;
        },
        enterMall:function(){
          if(this.activeIndex!=null){
            this.$router.replace("/home")

          }
        }
      },
      watch:{
        activeIndex:function(){
          if(this.activeIndex!=null){
            this.$cookie.set('country',this.sites[this.activeIndex].name);
          }
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
.country-list{
  .tick{
    display:inline-block;
    width:.67rem;
    height:.67rem;
  }
  .sel .tick{
    background:url(../../assets/settings/countrys/selected.png) center no-repeat;

  }
}
.enter-button{padding:.14rem .3rem;background-color:#f87622;color:#424040;font-size:.5rem}

</style>
