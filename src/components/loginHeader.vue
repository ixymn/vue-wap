<script>
import router from '../router'


export default {
    data(){
        return{

        }
    },
    props:{
        headerName:{
            type: String,
            required: true
        }
    }

}
</script>
<template>
<div>
    <header>
        <div onclick="window.history.go(-1)">
        <i></i>
        </div>
        {{headerName}}
    </header>
</div>
</template>
<style lang="less" scoped>
    header{
        height:1.389rem;
        line-height: 1.389rem;
        text-align: center;
        background: #424040;
        color:#fff;
        font-size: 0.444rem;
        i{
            position:absolute;
            left:0;
            top:0;
            display:inline-block;
            width:0.778rem;
            height:1.389rem;
            background:url(../assets/images/return.png) 0% 50% no-repeat/contain;
        }
    }

</style>
