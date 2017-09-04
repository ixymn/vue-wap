<script>
import { mapMutations} from 'vuex'
import {getSecondCate} from '../../service/getData'
import { Indicator } from 'mint-ui';

// import router from './router'
export default {
    name: 'category',
    created(){
        Indicator.open({
            text: 'Loading...',
            spinnerType: 'fading-circle'
        });
        this.initData()
    },
    methods:{
        async initData(){

            var newData = (await getSecondCate(this.$route.params.id)).datas;

            this.categoryList = Object.assign({},this.categoryList,newData.class_list)

            Indicator.close();

        },
        goSearch(gc_id){

            this.$router.push("/categorySearch/"+gc_id)
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
                <li v-for="goodsDetail in category.child" @click="goSearch(goodsDetail.gc_id)">
                    <div class="cateImgWrapper">
                        <img onerror="this.src = './icon_goods_default.png'" :src="goodsDetail.big_pic" alt="">
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
    margin:0.25rem 0.2rem 0;
    
    li{
        margin:0 0.2rem 0.25rem;
        text-align: center;
        width:2.8rem;
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
    }
}
</style>
