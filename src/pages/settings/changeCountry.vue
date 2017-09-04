<template>
    <div class='setting'>
        <header>
            <i class='site-logo' ><img src="../../assets/images/kiliLogo.png" ></i>
            <p>Please select your country</p>
        </header>

        <ul class="country-list">
            <li  v-for='(country,index) in sites' v-bind:class="activeIndex==index?'sel':'' " v-on:click="selectCountry(index)" :name="country.name" >
                <img :src='country.flag'  />
                <span>{{country.name}}</span>
                <i class='tick'></i>
            </li>
        </ul>

        <div class="enter-button" v-on:click="enterMall">Enter</div>


        <div id="inp"></div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import ngFlag from  '../../assets/settings/countrys/ng.png'
import keFlag from  '../../assets/settings/countrys/ke.png'
import ugFlag from  '../../assets/settings/countrys/ug.png'
export default {
      data(){
        return{
          sites:[
            {name:'Nigeria',flag:ngFlag},
            {name:'Kenya',flag:keFlag},
            {name:'Uganda',flag:ugFlag},
          ],
           start:{},
           end:{},
           gesture:[],
          activeIndex:null
        }
      },
      mounted:function(){

        for(let i in this.sites){
          if(this.sites[i].name.toLowerCase() == common.getCookie('country')){
            this.activeIndex=i;
          }
        }
      },
      computed:{
        test:function(){
          return ""
        }
      },
      methods:{
        ...mapMutations(['REMOVE_LOCAL_CART']),
        selectCountry:function(index){
          this.activeIndex = index;
        },
        enterMall:function(){
          if(this.activeIndex!=null){
            common.goLogout(this);
            this.REMOVE_LOCAL_CART();
            window.location.href="/";
            //this.$router.push("/home");
          }
        },
        skipMall:function(){
          this.$router.push("/home");
        },
        testLoad:function(){
          document.addEventListener('touchstart',this.touch, false);
          document.addEventListener('touchend',this.touch, false);
        },
        touch:function(event){
          var event = event || window.event;
          switch(event.type){
            case "touchstart":
                this.start = {}
                this.start.x = event.touches[0].clientX;
                this.start.y = event.touches[0].clientY;
                break;
            case "touchend":
                let angle=0;
                this.end = {};
                this.end.x = event.changedTouches[0].clientX;
                this.end.y = event.changedTouches[0].clientY;
                let x = this.end.x - this.start.x;
                let y = this.end.y - this.start.y;
                console.log(x,y);
                angle = Math.atan(parseFloat(y)/parseFloat(x));
                let abs = Math.abs(angle);
                if(y<=0){
                  abs > 1 ? this.gesture.push(1) :( angle < 0? this.gesture.push(4):this.gesture.push(3))
                }else{
                  abs > 1 ? this.gesture.push(2) :( angle > 0? this.gesture.push(4):this.gesture.push(3))
                }
                if(this.gesture.length > 8 ) this.gesture.shift();
                var g =  this.gesture.join("");
                if(g=="11223344"){
                  this.sites.push({name:'test',flag:ugFlag})
                }
                break;
              }

          }



      },
      watch:{
        activeIndex:function(){
          if(this.activeIndex!=null){
            var name = this.sites[this.activeIndex].name.substring(0,1).toLowerCase();
            var left = this.sites[this.activeIndex].name.substring(1);
            common.setCookie('country',name+left);
          }
        }
      },
      created(){
        window.addEventListener('load',this.testLoad, false);
      }

  }
</script>

<style lang="less" scoped>
.setting{
    background:#fff;
    height:100vh;
}
.country-list{
    .tick{
        display:inline-block;
        width:.67rem;
        height:.67rem;
        position:absolute;
        right:0.794rem;
        top:0.361rem;
    }
    .sel{
        background: #F3F5F9;
    }
    .sel .tick{
        background:url(../../assets/settings/countrys/selected.png) center no-repeat;
        background-size: contain;
    }
    li{
        height:1.389rem;
        line-height: 1.389rem;
        font-size: 0.444rem;
        text-indent: 2.389rem;
        img{
            position:absolute;
            width:0.889rem;
            height:0.583rem;
            left: 0.917rem;
            top:0.333rem;
        }
        position:relative;
    }
    width:6.222rem;
    margin:0 auto;

}
.enter-button{
    width:7.222rem;
    height:1.111rem;
    line-height: 1.111rem;
    text-align: center;
    margin:1.056rem auto 0;
    background:#424040;
    color:#fff;
    font-size: 0.444rem;
}
.skip-button{
  width:7.222rem;
  height:1.111rem;
  line-height: 1.111rem;
  text-align: center;
  margin:1.056rem auto 0;
  background:#fff;
  color:#000;
  font-size: 0.444rem;
}
.site-logo{
    img{
        width:100%;
    }
    display:inline-block;
    width:2.778rem;
    height:1.667rem;
    margin:2.639rem auto 0;
}
header{
    text-align: center;
    p{
        margin: 1.0rem 0;
        font-size: 0.389rem;
        color:#7E7E7E;
    }
}
</style>
