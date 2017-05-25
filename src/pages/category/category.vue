<script>
import { mapMutations} from 'vuex'
import {getFirstCate} from '../../service/getData'

export default {
    name: 'category',
    created(){
        this.initData()
    },
    methods:{
        async initData(){
            // var data = {
            //     curpage:1,
            //     page:10,
            //     key:'',
            //     share_recommend:1
            // }
            
            var newData  = (await getFirstCate()).datas;

            this.categoryList = Object.assign({},this.categoryList,newData.class_list)

            console.log(newData)
        }
    },
    data:function(){
        return{
            categoryList:[]
        }
    }
}
</script>

<template>
<div>
    <ul class="categoryList">
        <li v-for="category in categoryList">
            <router-link :to="'categoryII/'+category.gc_id" class="v-link">
                <div class="cateImgWrapper">
                    <img :src="category.big_pic" alt="">
                </div>
                <p class="cateName">{{category.gc_name}}</p>
            </router-link>
        </li>
    </ul>
</div>
</template>
<style lang="less" scoped>
.categoryList{
    display:flex;
    flex-wrap: wrap;
    margin:0.25rem 0.125rem 0;
    li{
        margin:0 0.125rem 0.25rem;
        text-align: center;
        width:3rem;
    }
    .cateImgWrapper{
        height:2.8rem;
        background:#FFF;
        img{
            height:100%;
        }
    }
    .cateName{
        margin:0.12rem 0;
        // line-height: 0.6rem;
    }
}
</style>


