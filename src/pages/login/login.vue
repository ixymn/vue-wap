<template>
<div class='login-page'>

    <headerBack headTitle="Login" @goBackEvent="goBack" :isDiyBack="1"></headerBack>

        <div class="kiliTitle">
            Kilimall
        </div>
        <ul class="loginList">
            <li class="loginUser">
                <i></i>
                <div class="inputWrapper">
                    <input type="text" name="username" v-model="username" value="" placeholder="email/phone/username">
                </div>
            </li>
            <li class="pwWrapper">
                <i></i>
                <div class="inputWrapper">
                     <input type="password" name="password" v-model="password" value="" placeholder="password">
                </div>
            </li>
        </ul>

        <div class="forgetPW">
            <div class="forgetButton">
            <router-link class="v-link" to="/fpMobile">Forgot account</router-link>
            </div>
        </div>

        <div class="loginButton" @click="loginClick">Login</div>
        <router-link to='mobileSignUp' class="v-link">
        <div class="createAccount">
                Create account
        </div>
        </router-link>

<!-- 2017年6月28日14:13:53 -->
<!--         <div class="loginVia">
            <div class="greyLine"></div>
            <span class="loginViaWord">Login via</span>
            <div class="greyLine"></div>
        </div>

        <div class="adBox">
            <div class="adFacebook"></div>
            <div class="adIns"></div>
        </div> -->
</div>
</template>
<script>

import {mapState, mapMutations} from 'vuex'
import { accountLogin } from '../../service/getData'
import { Indicator,Toast } from 'mint-ui';
import headerBack from '../../components/common/headerBack'

export default {
      data(){
        return{
          username:'',
          password:'',
        }
      },
      computed:{
        params:function(){
          return {
            username:this.username,
            password:this.password,
            client:"wap"
          }
        }
      },
      methods:{
        ...mapMutations([
         'STORE_LOGIN_INFO'
        ]),
        goLogin(){
          common.goLogin(this.$router);
        },
        loginClick(){

            Indicator.open({
                text: 'Process...',
                spinnerType: 'fading-circle'
            });

            this.loginProcess();

        },
        async loginProcess(){
            var res  =  await accountLogin(this.params);

            if(res.code == 200 ){
                common.setCookie('key',res.datas.key);
                common.setCookie('username',res.datas.username);
                this.STORE_LOGIN_INFO(res)

                Indicator.close();
                if(common.getCookie("redirect_url")){
                    this.$router.push(common.getCookie("redirect_url"))
                }else{
                    this.$router.push('/home')
                }

            }else if(res.code == 444){
                Indicator.close();

                Toast({
                    message:res.datas.error,
                    duration: 3000
                });
            }
        },
        goBack:function(){
            this.$router.push('/home')
          },
      },
      watch:{

      },

      created(){
      },
      components:{
        'headerBack':headerBack
      }
  }
</script>

<style lang="less" scoped>
button{
    width: 5rem;
    height: 2rem;
    background: #ff0;
}
.login-page{
    background:#f3f5f9;
    *{
        box-sizing: border-box;
    }
}
.kiliTitle{
    font-size: 0.73rem;
    font-weight: bold;
    color: #150000;
    margin:2.556rem auto 1.278rem;
    text-align: center;
}
.loginList{
    li{
        width:7.222rem;
        line-height: 1.167rem;
        height:1.167rem;
        // border:1px solid red;
        position: relative;
        i{
            position:absolute;
            left:0;
        }
    }
}
.inputWrapper{
    margin-left: 1.111rem;
    border-bottom: 1px solid #82797b;
    line-height: 1.167rem;
    height:1.167rem;
    input{
        height:1.111rem;
        width:100%;
        background:none;
        outline: none;
        border:none;
    }
//     input::-webkit-input-placeholder {
// 　　    color:#AFB1B7;
// 　　}
}
.loginButton{
    width:7.222rem;
    height:1.111rem;
    line-height: 1.111rem;
    margin: 0 auto ;
    background:#424040;
    color:#fff;
    font-size: 0.444rem;
    text-align: center;
    font-weight: bold;
}
.createAccount{
    font-weight: bold;

    width:7.222rem;
    height:1.111rem;
    line-height: 1.111rem;
    margin:0.667rem auto 0;
    border:1px solid #424040;
    color:#424040;
    background:#fff;
    font-size: 0.444rem;
    text-align: center;
}
.loginUser {
    i{
        display:inline-block;
        width:0.667rem;
        height:0.667rem;
        bottom:0.222rem;
        background:url('../../assets/images/username.png');
        background-size: contain;
    }
    margin:0 auto 0.389rem;
}
.pwWrapper {
    i{
        display:inline-block;
        width:0.667rem;
        height:0.667rem;
        bottom:0.222rem;
        background:url('../../assets/images/lock.png');
        background-size: contain;
    }
    margin:0 auto;
}
.forgetPW{
    width:7.222rem;
    height:1.389rem;
    line-height: 1.389rem;
    position: relative;
    .forgetButton{
        font-size: 0.389rem;
        height:1.111rem;
        line-height: 1.111rem;
        position:absolute;
        right:0;
    }
    margin:0 auto;
}

.loginVia{
    width:7.222rem;
    display:flex;
    justify-content:space-between;
    margin:2.333rem auto 0;
    font-size: 0.417rem;
    color:#150000;

    .greyLine{
        width:2.222rem;
        height:2px;
        background:red;
        position: relative;
        top:8px;
        background: #eaecf0;
    }
}

.adBox{
    width:3.389rem;
    margin: 0.889rem auto 0;
    display:flex;
    justify-content:space-between;
    .adFacebook{
        background: url(../../assets/images/facebook.png);
        background-size: contain;
        display:inline-block;
        width:1.0rem;
        height:1.0rem;
    }
    .adIns{
        background: url(../../assets/images/ins.png);
        background-size: contain;
        display:inline-block;
        width:1.0rem;
        height:1.0rem;
    }
}
</style>
