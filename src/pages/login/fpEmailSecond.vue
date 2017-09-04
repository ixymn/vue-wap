<script>
import loginHeader from '../../components/loginHeader'
import { Indicator,Toast } from 'mint-ui';
import {fpEmail} from '../../service/getData'

import '../../utils/common.js'

export default {
    data(){
        return{
            email:'',
        }
    },
    // props:['emailSent'],
    props:{
        emailSent:{
            type: String,
            required: true
        }
    },
    components:{
        'loginHeader':loginHeader
    },
    computed:{
        params(){
            return{
                email:this.email,
                client:'wap'
            }
        },
        omitEmail(){
            var index = this.emailSent.indexOf('@');
            var str = '***';

            return str+this.emailSent.substr(index);
        }
    },
    methods:{
        nextClick(){
            this.enterThird();
            // Indicator.open({
            //     text: 'Process...',
            //     spinnerType: 'fading-circle'
            // });
            // this.sendEmailCode()
        },
        async sendEmailCode() {
            var result = await fpEmail(this.params);
            if(result.code==444){
                Indicator.close();
                Toast({
                    message:result.datas.error,
                    duration: 2400
                });
                                                                     
            }else if(result.code==200){
                //2017年6月15日13:53:03，邮箱找回仍未完善！

                Indicator.close();
                this.$router.push('/')
            }

        },
        enterThird(){
            this.$emit('stepResetTrigger')
        }
    }
}
</script>
<template>
<div>
    <p class="remindInfo">A code has been sent  to your email <span>{{omitEmail}}</span>Please check and input the code below to proceed.</p>
    <ul class="loginList">
        <li class="loginUser">
            <i></i>
            <div class="inputWrapper">
                <input type="text" v-model="email" value="" placeholder="Input yor email">
            </div>
        </li>
    </ul>

    <div class="nextButton" @click="nextClick">Next</div>

    <p class="signUpViamp"><router-link class="v-link" to='fpMobile'>Reset via SMS</router-link></p>
</div>
</template>
<style lang="less" scoped>


.remindInfo{
    width:7.222rem;
    font-size: 0.417rem;
    color: #7E7E7E;
    margin:1.111rem auto 0;
    span{
        color:#F87622;
    }
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
    margin-top: 0.7rem;

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
