<script>

export default {
    name:'loading',
    methods:{

    },
    data:function(){
        return{
            
        }
    }
}
</script>

<template>

    <div class="mint-indicator">
        <div class="mint-indicator-wrapper" style="padding:0.556rem">
            <span class="mint-indicator-spin">
                <div class="mint-spinner-fading-circle circle-color-21" style="width: 0.889rem; height: 0.889rem;">
                    <div class="mint-spinner-fading-circle-circle is-circle2"></div>
                    <div class="mint-spinner-fading-circle-circle is-circle3"></div>
                    <div class="mint-spinner-fading-circle-circle is-circle4"></div>
                    <div class="mint-spinner-fading-circle-circle is-circle5"></div>
                    <div class="mint-spinner-fading-circle-circle is-circle6"></div>
                    <div class="mint-spinner-fading-circle-circle is-circle7"></div>
                    <div class="mint-spinner-fading-circle-circle is-circle8"></div>
                    <div class="mint-spinner-fading-circle-circle is-circle9"></div>
                    <div class="mint-spinner-fading-circle-circle is-circle10"></div>
                    <div class="mint-spinner-fading-circle-circle is-circle11"></div>
                    <div class="mint-spinner-fading-circle-circle is-circle12"></div>
                    <div class="mint-spinner-fading-circle-circle is-circle13"></div>
                </div>
            </span>
            <span class="mint-indicator-text">Loading...</span>
        </div>
        <div class="mint-indicator-mask"></div>
    </div>

</template>
<style lang="less" scoped>
.circle-color-21 > div::before {
    background-color: #ccc;
}
.mint-indicator-text {
    display: block;
    color: #fff;
    text-align: center;
    margin-top: 0.278rem;
    font-size: 0.444rem;
}
.mint-indicator-wrapper {
    border-radius: 0.139rem;
}
</style>


