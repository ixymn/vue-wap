<script>
import { mapMutations} from 'vuex';
import {getFirstCate} from '../../service/getData';
import { Indicator } from 'mint-ui';
function notFind(){
    alert('notfffffffff')
}

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

            var newData  = (await getFirstCate()).datas;

            this.categoryList = Object.assign({},this.categoryList,newData.class_list)
            Indicator.close();
        },
        notFind(){
            alert(2)
        }
    },
    data:function(){
        return{
            categoryList:[],
        }
    }
}
</script>

<template>
<div class="wrapper">
    <ul class="categoryList">
        <li v-for="category in categoryList">
            <router-link :to="'/category/'+category.gc_id" class="v-link">
                <div class="cateImgWrapper">
                    <img onerror="this.src = './icon_goods_default.png'" :src="category.big_pic" alt="">    
                </div>
                <p class="cateName">{{category.gc_name}}</p>
            </router-link>
        </li>
    </ul>

</div>
</template>
<style lang="less" scoped>



.wrapper{
    padding-top: 1px;
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
        position: relative;
        background: url(../../assets/images/goods/icon_goods_default.png) 0% 0% no-repeat/contain;
        height:2.8rem;
        div{
            height:100%;
        }
        img{
            height:100%;
            // width:100%;
            background: #fff;
        }
    }
    .cateName{
        margin:0.12rem 0;
    }
}
</style>
