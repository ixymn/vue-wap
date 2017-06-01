<template>
	<div class="order-box">
		<HEADBACK headTitle="Order"></HEADBACK>
		<div class="order-main">
			<ul class="order-nav">
		        <li class="focus" @click="linkTab(1)">Pending Payment</li>
		       	<li class="focus" @click="linkTab(1)">In Trasit</li>
		       	<li class="focus" @click="linkTab(1)">Feedback</li>
		       	<li class="focus" @click="linkTab(1)">Feedback</li>
		     </ul>
		</div>
	</div>
</template>

<script>
import Head from '../../components/common/headerBack.vue';

export default {
	data:function(){
		return({
			
		});
	},
	components:{
		"HEADBACK":Head,
		
	},
	
}
  
</script>

<style lang="less">


</style>
