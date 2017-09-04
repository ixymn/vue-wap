<script>
import loginHeader from '../../components/loginHeader'
import { Indicator,Toast } from 'mint-ui';
import {registerEmail} from '../../service/getData'
import headerBack from '../../components/common/headerBack'

import '../../utils/common.js'


export default {
    data(){
        return{
            email:'',
            password:'',
            pwCanBeSee:false,
            loginParams:{
                username:'',
                password:'',
                client:"wap"
            }
        }
    },
    computed:{
        params(){
            return{
                email:this.email,
                password:this.password,
                client:'wap'
            }
        }
    },
    components:{
        'headerBack':headerBack
    },
    methods:{
        nextClick(){
            this.loginParams = {
                username:this.email,
                password:this.password
            }
            Indicator.open({
                text: 'Process...',
                spinnerType: 'fading-circle'
            });
            this.goRegister();
        },
        async goRegister() {
            var result = await registerEmail(this.params);
            if(result.code==444){
                Indicator.close();
                Toast({
                    message:result.datas.error,
                    duration: 2400
                });
            }else if(result.code==200){

                common.setCookie('username',result.datas.username)
                common.setCookie('key',result.datas.key)

                Indicator.close();
                this.$router.push('/signUpSuc')
            }

        },
    }
}
</script>
<template>
<div class='wrapper'>
    <headerBack headTitle='Sign Up' ></headerBack>

    <ul class="loginList">
        <li class="loginUser">
            <i></i>
            <div class="inputWrapper">
                <input type="text" v-model="email" value="" placeholder="email">
            </div>
        </li>
        <li class="pwWrapper">
            <i></i>
            <div class="inputWrapper">
                <input type="password" v-show="!pwCanBeSee" v-model="password" placeholder="password">
                <input type="text" name="password" v-show="pwCanBeSee" v-model="password" placeholder="password">
                <div class="pwToggle" :class="{active:!pwCanBeSee}" @click="pwCanBeSee=!pwCanBeSee">
                    <em></em>
                </div>
            </div>
            <div class="explainWord">Click the eye to see password</div>
        </li>
    </ul>

    <div class="nextButton" @click="nextClick">Sign up</div>

    <p class="signUpViamp"><router-link class="v-link" to='mobileSignUp'>sign up VIA mobile phone</router-link></p>

    <p class="logIn"><router-link class="v-link" to='/login'>Log in</router-link></p>

</div>
</template>
<style lang="less" scoped>
.signUpViamp,{
    color:#4A90E2;
    text-align: center;
    margin: 20px auto 0;
    font-size: 0.389rem;
    text-decoration: underline;
    height:1.2rem;
    line-height: 1.2rem;
    width: 5.556rem;
    a{
        color:#4A90E2;
    }
}
.logIn{
    color:#4A90E2;
    text-align: center;
    margin: 0.511rem auto 0;
    font-size: 0.389rem;
    text-decoration: underline;
    height:1.2rem;
    line-height: 1.2rem;
    width: 5.556rem;
    a{
        color:#4A90E2;
    }
}

.loginList{
    margin-top: 2.444rem;

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
    z-index: 99;
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
}


.loginUser {
    i{
        display:inline-block;
        width:0.667rem;
        height:0.667rem;
        bottom:0.222rem;
        background:url(../../assets/images/username.png);
        background-size: contain;
    }
    margin:0 auto 0.389rem;
}
.pwWrapper {
    margin:0 auto;
    position: relative;
    .explainWord{
        height:0.333rem;
        line-height: 0.333rem;
        position:absolute;
        bottom:-0.5rem;
        right:0;
    }
    i{
        display:inline-block;
        width:0.667rem;
        height:0.667rem;
        bottom:0.222rem;
        background:url(../../assets/images/lock.png);
        background-size: contain;
    }
    .pwToggle{
        position:absolute;
        top:0px;
        right:-7px;
        height:1.167rem;
        width:1.389rem;
        em{
            width:0.667rem;
            height:0.667rem;
            position:absolute;
            top:13px;
            left:13px;
            background:url(../../assets/images/biyan.png) 0% 0% no-repeat/contain;
        }
    }
    .pwToggle.active em{
        background:url(../../assets/images/zhengyan.png) 0% 0% no-repeat/contain;
    }
    
}

.nextButton{
    width:7.222rem;
    height:1.111rem;
    line-height: 1.111rem;
    margin:1.0rem auto 0;
    background:#424040;
    color:#fff;
    font-size: 0.444rem;
    text-align: center;
    font-weight: bold;
}
</style>
