<script>
import loginHeader from '../../components/loginHeader'

export default {
    data(){
        return{

        }
    },
    methods:{

    },
    components:{
        'loginHeader':loginHeader
    },
}
</script>
<template>
<div class='wrapper'>
    <loginHeader headerName='Sign Up Success' ></loginHeader>
    <div class="sucPic"></div>
    <h2>Congratuations for your successful registration!</h2>
    <p class="pWord">Please fill in more details to help improve your shopping experience. You will get some small cash prize for your effort.</p>
    
    <a href="/" class="fillNow">Shop Now</a>
</div>
</template>
<style lang="less" scoped>
.laterPLS{
    font-size: 0.389rem;
    text-align: center;
    margin-top: 1.5rem;
    color: #AFB1B7;
    text-decoration: underline;
}
.fillNow{
    font-size: 0.444rem;
    text-align: center;
    display:block;
    width:3.333rem;
    height:1.111rem;
    line-height: 1.111rem;
    margin: 1.5rem auto 0;
    color: #4A90E2;
    text-decoration: underline;
}
.sucPic{
    width:4.944rem;
    height:2.167rem;
    background:url(../../assets/images/registSuc.png) 0% 0% no-repeat/contain;
    margin: 1.667rem auto 0;
}
h2{
    font-size: 0.625rem;
    text-align: center;
    margin-top: 0.833rem;
}
.pWord{
    font-size: 14px;
    color: #7E7E7E;
    text-align: center;
    margin:0.667rem auto 0;
    width:9rem;
}
</style>
