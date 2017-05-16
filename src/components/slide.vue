<template>
<div style="position:relative">
    <div class="swiper-container" :style="gdsBannerStyle">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="str in listImg" :style="[{ backgroundImage: 'url(' + str.url + ')' },gdsBannerItemStyle]"></div>
        </div>
        
        <div class="swiper-pagination swiper-pagination-white"></div>

    </div>
    <slot name="swiper-icons"></slot>
</div>
</template>

<script>
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    export default {
        props: ['listImg',"gdsBannerStyle","gdsBannerItemStyle"],

        methods:{
          initSwiper:function(){
            let swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                loop: true,
                speed: 400,
                autoplay: 4000,
                onTouchEnd: function() {
                    swiper.startAutoplay()
                }
            });
          }
        },
        updated(){
          this.initSwiper();
        }
    }
</script>

<style lang="less">
    .swiper-container {
        width: 100%;
        height: 3.2rem;
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .swiper-pagination-bullet {
            width:0.14rem;
            height: 0.14rem;
            display: inline-block;
            background: #7c5e53;
        }
        .swiper-pagination-white .swiper-pagination-bullet{
            background:#999;
        }
    }
</style>
