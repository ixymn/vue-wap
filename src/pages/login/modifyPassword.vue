<script>
import headerBack from '../../components/common/headerBack.vue'
import {modifyPassword} from '../../service/getData'
import '../../utils/common.js'

export default {
    data:function(){
        return{
            oldpassword:'',
            newpassword:'',
            confirmpw:'',
        }
    },
    computed:{
        params(){
            return{
                new_pass:this.newpassword,
                old_pass:this.oldpassword,
                key:common.getCookie('key')
            }
        }
    },
    created(){
        
    },
    methods:{
        clickOK(){
            if(this.newpassword==''){
                this.$toast({
                    message:'Enter your new password',
                    duration: 3000
                });
            }else if(this.newpassword===this.confirmpw){
                this.$indicator.open({
                    text: 'Process...',
                    spinnerType: 'fading-circle'
                });
                this.SendModify()
            }else{
                this.$toast({
                    message:'The password entered did not match twice',
                    duration: 3000
                });
            }
        },
        async SendModify(){
            var res  =  await modifyPassword(this.params);
            if(res.code==200){
                this.$indicator.close()
                this.$toast({
                    message:res.datas.msg,
                    duration: 10000
                });
            }else if(res.code==444){
                this.$indicator.close()
                this.$toast({
                    message:res.datas.error,
                    duration: 3000
                });
            }

        },
    },
    components:{
        'headerBack':headerBack
    }
}
</script>
<template>
<div class="wrapper">
    <headerBack headTitle='Saved Shops'></headerBack>
    <ul class="loginList">
        <li>
            <input type="text" v-model="oldpassword" value="" placeholder="Old Password">
        </li>
        <li>
             <input type="text" v-model="newpassword" value="" placeholder="New Password">
        </li>
        <li>
             <input type="text" v-model="confirmpw" value="" placeholder="Confirm New Password">
        </li>
    </ul>
    <div class="nextButton" @click="clickOK">OK</div>
</div>
</template>

<style lang="less" scoped>
.wrapper{
    *{
        box-sizing: border-box;
    }
}

.loginList{
    margin-top: 2.6rem;
    li{
        margin:0 auto;
        width:7.222rem;
        line-height: 1.167rem;
        height:1.167rem;
        border-bottom:0.028rem solid #82797b;
        input{
            height:1.111rem;
            width:100%;
            background:none;
            outline: none;
            border:none;
        }
    }
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
.nextButton{
    width: 7.222rem;
    height: 1.111rem;
    line-height: 1.111rem;
    margin: 1rem auto 0;
    background: #424040;
    color: #fff;
    font-size: .444rem;
    text-align: center;
    font-weight: 700;
}
</style>