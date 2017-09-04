<template>
    <div class="wrapper">
        <headerBack headTitle="Help" v-if="!isAndroid"></headerBack>
        <h3>Frequently Asked Questions:</h3>
        <ul class="problemList" v-show="listLoaded">
            <router-link tag="li" :to="'/helpIII/'+often.id" v-for="often in oftenProblem" :key="key" >{{often.title}}</router-link>
        </ul>
        <h3>You can find:</h3>
        <ul class="problemList" v-show="listLoaded">
            <router-link tag="li" :to="'/helpII/'+problem.id" v-for="problem in dataArr" :key="key">{{problem.title}}</router-link>
        </ul>
    </div>
</template>


<script>

import {mapState,mapMutations} from 'vuex'
import headerBack from '../../components/common/headerBack.vue'
import {getProblemListI,getProblemListII} from '../../service/getData'

export default {
    data:function(){
        return {
            dataArr:[],
            oftenProblem:[],
        }
    },
    computed:{
        ...mapState(['newApiConfig','isAndroid']),
        listLoaded(){
            return this.dataArr.length>0&&this.oftenProblem.length>0
        },
        requestHeader(){
            return{
                configApi:this.newApiConfig.api,
                token:{
                    'Authorization':common.getCookie('Authorization')
                },
                version:this.newApiConfig.version
            }
        }
    },
    methods:{
        async getProblemI(){
            var newData  = await getProblemListI(this.requestHeader);
            for(let i=0;i<newData.children.length;i++){
                this.dataArr.push(newData.children[i])
            }
        },
        async getProblemII(){
            var newData  = await getProblemListII(this.requestHeader);
            for(let i=0;i<newData.data.length;i++){
                this.oftenProblem.push(newData.data[i])
            }
        },
    },
    created(){
        this.$indicator.open()
        if(this.newApiConfig){
            this.getProblemI()
            this.getProblemII()
        }
    },
    mounted(){
        if(this.isAndroid){
            var wrapper = document.querySelector('.wrapper');
            wrapper.style.padding = '0';

        }
    },
    watch:{
        listLoaded(){
            this.$indicator.close()
        },
        newApiConfig(){
            this.getProblemI()
            this.getProblemII()
        }
    },
    components:{
        "headerBack":headerBack,
    },

}

</script>
<style lang="less" scoped>
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
