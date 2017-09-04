<script>
import loginHeader from '../../components/loginHeader'
import { Indicator,Toast } from 'mint-ui';
import {fpEmail} from '../../service/getData'

import '../../utils/common.js'

export default {
    data(){
        return{
            email:''
        }
    },
    components:{
        'loginHeader':loginHeader
    },
    computed:{
    },
    methods:{
        nextClick(){
            this.$emit('resetSUC')
        }
    }
}
</script>
<template>
<div>
    <ul class="loginList">
        <li class="loginUser">
            <div class="inputWrapper">
                <input type="password" v-model="email" value="" placeholder="New password">
            </div>
        </li>
        <li class="loginUser">
            <div class="inputWrapper">
                <input type="password" v-model="email" value="" placeholder="Confirm new password">
            </div>
        </li>
    </ul>

    <div class="nextButton" @click="nextClick">OK</div>

</div>
</template>
<style lang="less" scoped>


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
