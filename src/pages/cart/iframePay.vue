<template>
	<div class="lipa-box">
        <HEADBACK headTitle="Payment" @goBackEvent="goBack" :isDiyBack="1"></HEADBACK>
        <div class="lipa-main">
        	<iframe src="" name="lipa-frame"></iframe>
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import {orderStepOne,orderStepTwo,sendCodePhone,verifyCodePhone,payOnline} from '../../service/getData'
import Head from '../../components/common/headerBack.vue';
export default {
	data:function(){
		return ({

		});
	},
	components:{
		"HEADBACK":Head,
	},
	computed:{
		...mapState(['paySn']),
	},
	mounted:function(){
		if(!this.paySn){
			this.$router.push("/order");
			return;
		}
		if(common.getCookie("key")){
			this.$indicator.open();
			this.payOnlineApi(this.paySn);
		}
		else
			this.$router.push('/login');
	},
	methods:{
		...mapMutations(['PAY_SN']),
		goBack:function(){
			this.$router.push("/"+this.$route.params.backUrl);
		},
		open :function(verb, url, data, target) {
	        var form = document.createElement("form");
	        form.action = url;
	        form.method = verb;
	        form.target = target || "_self";
	        if (data) {
	          for (var key in data) {
	            var input = document.createElement("input");
	            input.name = key;
	            input.value = typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
	            form.appendChild(input);
	          }
	        }
	        form.style.display = 'none';
	        document.body.appendChild(form);
	        this.$indicator.close();
	        form.submit();
	      },

		payOnlineApi:async function(pay_sn){
			let payParam={
				"key":common.getCookie("key"),
				"pay_sn":pay_sn,
			};
			let payRes=await payOnline(payParam);
			if(payRes.code == "200"){
				let postData=payRes.datas.pay_info.post_data,url=payRes.datas.pay_info.url;
				this.open('POST',url,postData,"lipa-frame");
			}else if(payRes.code == "444"){

				this.$toast({
					message:payRes.datas.error,
					duration:3000,
				});
			}else{
				this.$toast({
					message:"pay error",
					duration:3000,
				});
			}
			this.PAY_SN("");
		},
	}

}
</script>
<style lang="less" scoped>

.lipa-main{
	position: absolute;
    top: 1.33rem;
    bottom: 0;
    left: 0;
    right: 0;
    iframe{
		  width: 100%;
    	height: 100%;
			border:none;
    }
}

</style>
