<script>
import fpEmailFirst from './fpEmailFirst'
import fpEmailSecond from './fpEmailSecond'
import pwReset from './pwReset'
import { Indicator,Toast } from 'mint-ui';
import {fpEmail} from '../../service/getData'
import headerBack from '../../components/common/headerBack'

import '../../utils/common.js'

export default {
    data(){
        return{
            emailSent:'',
            stepIndex:1,
        }
    },
    components:{
        'headerBack':headerBack,
        'fpEmailFirst':fpEmailFirst,
        'fpEmailSecond':fpEmailSecond,
        'pwReset':pwReset
    },
    computed:{

    },
    methods:{
        enterSecond(info){
            this.emailSent = info;
            this.stepIndex=2;
        },
        enterThird(){
            this.stepIndex=3;
        },
        showSUC(){
            this.stepIndex=4;
        }
    }
}
</script>
<template>
<div class='wrapper'>
    <headerBack headTitle='Forget Password?' ></headerBack>
    <fpEmailFirst @nextStepTrigger='enterSecond' v-show="stepIndex==1"></fpEmailFirst>
    <fpEmailSecond v-show="stepIndex==2" :emailSent='emailSent' @stepResetTrigger='enterThird'></fpEmailSecond>
    <pwReset v-show="stepIndex==3" @resetSUC='showSUC'></pwReset>
    <div v-show="stepIndex==4">
        <div class="showSUC" ></div>
        <p class="sucRemind">Successful</p>
    </div>
</div>
</template>
<style lang="less" scoped>
.showSUC{
    width:4.944rem;
    height:2.111rem;
    margin:1.667rem auto 0;
    background: url(../../assets/images/pwReset.png) 0% 0% no-repeat/contain;
}
.sucRemind{
    font-size: 0.625rem;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
}
.wrapper *{
    box-sizing: border-box;
    position: relative;
}

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
.loginList{
    margin-top: 2.444rem;

    li{
        width:7.222rem;
        line-height: 1.167rem;
        height:1.167rem;
        margin: 0 auto 0.389rem;
        // border:1px solid red;
        position: relative;
        i{
            position:absolute;
            left:0;
            display:inline-block;
            width:0.667rem;
            height:0.667rem;
            bottom:0.222rem;
            background:url(../../assets/images/envolpe.png);
            background-size: contain;  
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
