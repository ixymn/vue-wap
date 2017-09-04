<template>
    <div class="wrapper">
        <headerBack headTitle="Help" v-if="!isAndroid"></headerBack>
        <h3>{{idSwichHint}}</h3>
        <ul class="problemList">
            <router-link tag="li" :to="'/helpIII/'+answer.id" v-for="answer in dataArr" :key="key">{{answer.title}}</router-link>
        </ul>
    </div>
</template>

<script>

import {mapState,mapMutations} from 'vuex'
import headerBack from '../../components/common/headerBack.vue'
import {getProblemListIII} from '../../service/getData'

export default {
    data:function(){
        return ({
            dataArr:[],
            id:this.$route.params.id,
        })
    },
    computed:{
        ...mapState(['newApiConfig','isAndroid']),
        idSwichHint(){
            var a;
            switch(Number(this.id)){
                case 21:
                a = 'Account Settings';
                break;
                case 22:
                a = 'Ordering';
                break;
                case 23:
                a = 'Payment, Rewards & Promotions';
                break;
                case 24:
                a = 'Shipping & Delivery';
                break;
                case 25:
                a = 'Returns, Replace & Refunds';
                break;
                default:
                a = 'help lists'
            }

            return a
        },
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
        async getProblemIII(){
            var newData  = await getProblemListIII(this.requestHeader);
            for(let i=0;i<newData.data.length;i++){
                this.dataArr.push(newData.data[i])
            }
            this.$indicator.close()

        },
    },
    created(){
        this.$indicator.open()
        if(this.newApiConfig){
            this.getProblemIII()
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
            this.getProblemIII()
        }
    },
    components:{
        "headerBack":headerBack,
    },

}

</script>

<style lang="less"  scoped>
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
h3{
    height:0.944rem;
    line-height: 0.944rem;
    font-size: 0.361rem;
    padding-left: 0.278rem;
}
</style>
