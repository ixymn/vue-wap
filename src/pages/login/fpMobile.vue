<script>
import loginHeader from '../../components/loginHeader'
import { Indicator,Toast } from 'mint-ui';
import {fpMobile,getCaptcha} from '../../service/getData'
import headerBack from '../../components/common/headerBack'

import '../../utils/common.js'

export default {
    data(){
        return{
            phoneNum:'',
            verifyCode:'',
            countNum:0,
        }
    },
    components:{
        'headerBack':headerBack
    },
    computed:{
        codeParams(){
            return{
                type:3,
                phone:this.phoneNum,
                client:'wap'
            }
        },
        phoneParams(){
            return{
                captcha:this.verifyCode,
                phone:this.phoneNum,
                client:'wap'
            }
        }
    }, 
    methods:{
        nextClick(){
            Indicator.open({
                text: 'Process...',
                spinnerType: 'fading-circle'
            });
            this.sendPhoneForget();
            // this.registerSuc();
        },
        registerSuc(){
            this.$router.push('/registerII')
        },
        getCodeNum(){
            this.getCode();
            this.countNum = 60;
            var THIS = this;
            var countDown = setInterval(countDownF,1000);
            function countDownF(){
                THIS.countNum--;
                if(THIS.countNum ===0){
                    clearInterval(countDown)
                }
            }

        },
        async getCode() {
            var result = await getCaptcha(this.codeParams);
            if(result.code==444){
                Toast({
                    message:result.datas.error,
                    duration: 5000
                });
                this.countNum = 10;
            }
        },
        async sendPhoneForget(){
            var result = await fpMobile(this.phoneParams);
            if(result.code==444){
                Indicator.close();
                Toast({
                    message:result.datas.error,
                    duration: 2400
                });
            }else if(result.code==200){
                Indicator.close();
                Toast({
                    message:result.datas.msg,
                    duration: 10000
                });
                var THIS = this;
                setTimeout(function(){THIS.$router.push('/login')},10000)
               
            }
        }
    },

}
</script>
<template>
<div class='wrapper'>
    <headerBack headTitle='Forget Password?' ></headerBack>

    <ul class="loginList">
        <li class="loginUser">
            <i></i>
            <div class="inputWrapper">
                <input type="text" v-model="phoneNum" value="" placeholder="Phone No. eg.0742000111">
            </div>
        </li>
        <li class="vfCode">
            <i></i>
            <div class="inputWrapper shortInput">
                <input type="text" v-model="verifyCode" value="" placeholder="Input code">
                <div class="getCode" @click="getCodeNum" v-show="!countNum">Get code</div>
                <div class="getCode active" v-show="countNum">Resend in {{countNum}}s</div>
            </div>
        </li>
    </ul>

    <div class="nextButton" @click="nextClick">Next</div>

    <p class="signUpEmail"><router-link class="v-link" to='fpEmail'>Reset via Email</router-link></p>

</div>
</template>
<style lang="less" scoped>
.wrapper *{
    box-sizing: border-box;
    position: relative;
}
.informP{
    color:#7E7E7E;
    width:5.8rem;
    line-height: 0.556rem;
    text-align: center;
    position:absolute;
    bottom:30px;
    left:0;
    right:0;
    margin:0 auto;
}
.signUpEmail,{
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
    margin-top: 2.4444rem;

    li{
        width:7.222rem;
        line-height: 1.167rem;
        height:1.167rem;
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
.shortInput.inputWrapper{
    width:3.056rem;
}

.loginUser {
    i{
        display:inline-block;
        width:0.667rem;
        height:0.667rem;
        bottom:0.222rem;
        background:url(../../assets/images/phone1.png);
        background-size: contain;
    }
    margin:0 auto 0.389rem;
}
.vfCode{
    i{
        display:inline-block;
        width:0.667rem;
        height:0.667rem;
        bottom:0.222rem;
        background:url(../../assets/images/123.png);
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
.getCode{
    width:2.583rem;
    height:0.861rem;
    line-height: 0.861rem;
    position:absolute;
    right:-3.056rem;
    bottom:0;
    background:#E4C187;
    color:#fff;
    text-align: center;
    font-size: 0.389rem;
}
.getCode.active{
    background: #fff;
    border:1px solid #E4C187;
    color:#E4C187;
    font-size: 0.333rem;
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
