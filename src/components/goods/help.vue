<template>
	<div class='faq' >
	    <div class='question' :class='{focus:isShow}' @click="showMore()">{{isPage==1?('Q'+(index+1)+'. '):''}}{{helpItem.question}}</div>
	    <div class='answer' v-show="isShow" v-html="helpItem.answer"></div>
	</div>
</template>
<style lang="less">
  .faq {
        background: #ffffff;
        box-shadow: inset 0px 0px 0px 0px #dddfe4;
    }
    .question {
    	text-align: left;
    	padding: 0.42rem 1.11rem 0.42rem  0;
        line-height: 0.5rem;
        margin-left: 0.42rem;
        color: black;
        font-size:0.39rem;
        border-bottom: 1px solid #e3e5e9;
        background: url("../../assets/images/help-arrow-right.png") no-repeat right;
        background-size: 0.61rem;
        background-position-x: 95%;
    }
    .question.focus {
        background: url("../../assets/images/help-arrow-down.png") no-repeat right;
        background-size: 0.48rem;
        background-position-x: 95%;
    }
    .question p {
        margin: 0.68rem 0;
        padding-right: 0.68rem;
    }
    .answer {
        line-height: 0.56rem;
        padding: 0.42rem 0.69rem;
        color: #150000;
        text-align: left;
        font-size:0.39rem;
        background-color: #f9fafc;
        a{
            color:blue;
        }
        a:visit{
            color:#86077e;
        }
    }
</style>
<script>


export default {
  data: function(){
    return {
    	isShow:false,
    }
  },
  props:["helpItem","isPage","index"],
  methods:{
  	showMore:function(){
  		this.isShow=!this.isShow;

  	}
  }
}
</script>
