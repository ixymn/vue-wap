<template>
    <div class="wrapper">
        <headerBack headTitle="Help" v-if="!isAndroid"></headerBack>
        <h3>{{helpInfo.title}}</h3>
        <div v-html="helpInfo.content" id="helpInfo"></div>
        <img src="" alt="">
    </div>
</template>

<script>

import {mapState,mapMutations} from 'vuex'
import headerBack from '../../components/common/headerBack.vue'
import {getProblemListIV} from '../../service/getData'

export default {
    data:function(){
        return ({
            helpList:[],
            dataArr:[],
            oftenProblem:[],
            id:this.$route.params.id,
            helpInfo:{}
        })
    },
    computed:{
        ...mapState(['newApiConfig','isAndroid']),
        requestHeader(){
            return{
                configApi:this.newApiConfig.api,
                token:{
                    'Authorization':common.getCookie('Authorization')
                },
                version:this.newApiConfig.version,
                id:this.id
            }
        }
    },
    methods:{
        async getProblemIV(){
            var newData  = await getProblemListIV(this.requestHeader);
            this.helpInfo = newData;
            this.$indicator.close()

        },
    },
    created(){
        this.$indicator.open()
        if(this.newApiConfig){
            this.getProblemIV()
        }

    },
    mounted(){
        if(this.isAndroid){
            var wrapper = document.querySelector('.wrapper');
            wrapper.style.padding = '0';
        }
    },
    watch:{
        newApiConfig(){
            this.getProblemIV()
        }
    },
    components:{
        "headerBack":headerBack,
    },
  
}

</script>

<style lang="less">
    #helpInfo {
        padding:0 0.5rem;
        img{
            width:100%!important;
        }
    }
</style>
<style lang="less"  scoped>

h3{
    line-height: 0.944rem;
    font-size: 0.444rem;
    padding-left: 0.278rem;
}
.wrapper{
    *{
        box-sizing: border-box;
     }
    padding-top: 1.33rem;
}
.problemList{
    li{
        line-height: 1.111rem;
        background: #fff;
        font-size: 0.389rem;
        font-weight: bold;
        padding-left: 0.278rem;
        margin-bottom: 0.083rem;
    }
}
#helpInfo *{
    font-size: 0.389rem!important;
}
</style>
