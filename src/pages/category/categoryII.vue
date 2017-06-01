<script>
import { mapMutations} from 'vuex'
import {getSecondCate} from '../../service/getData'
// import router from './router'
export default {
    name: 'category',
    created(){
        this.initData()
    },
    methods:{
        async initData(){
            
            var newData = (await getSecondCate(this.$route.params.id)).datas;

            this.categoryList = Object.assign({},this.categoryList,newData.class_list)

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
    <ul>
        <li v-for="category in categoryList">
            <div class="cateHead">{{category.gc_name}}</div>
            <ul class="categoryList">
                <li v-for="goodsDetail in category.child">
                    <div class="cateImgWrapper">
                        <img :src="goodsDetail.big_pic" alt="">
                    </div>
                    <p class="cateName">{{goodsDetail.gc_name}}</p>
                </li>
            </ul>
        </li>
    </ul>
</div>
</template>
<style lang="less" scoped>
*{
    box-sizing:border-box;
}
.cateHead{
    height:1.111rem;
    line-height: 1.111rem;
    font-size: 0.444rem;
    padding-left: 0.389rem;
    background:#fff;
}
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


