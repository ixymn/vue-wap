<script>

export default {
	data:function(){
		return{
			goodsToShare:['Apple New Macbook 12','Apple New Macbook 13','Apple New Macbook 12']			
		}
	},
}
</script>
<template>
<div>
	<div class="ShareTitle">
		<input type="text" placeholder="Title">
	</div>	
	<div class="ShareItem">
		<span>Item</span>
		<span class="goodsToShare">{{goodsToShare.split(',')}}</span>
	</div>
	<div class="ShareWrite"></div>
</div>
</template>

<style lang="less" scoped>
.ShareTitle{
	height:1.389rem;
	line-height: 1.389rem;
	background:#fff;
		font-size: 14px;
	input{
		outline: none;
		border:none;
		height:1.389rem;
		font-size: 14px;
		padding-left: 0.278rem;
	}
}
.ShareItem{
	height:1.111rem;
	line-height: 1.111rem;
	color:#7E7E7E;
	font-size: 14px;
	margin-left: 0.278rem;
}
.ShareWrite{
	height:11.111rem;
	background:#fff;
}

</style>
