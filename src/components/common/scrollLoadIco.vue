<template>
	<div class="scrollLoadIco">
		<div class="mt-load-ico">
			<mt-spinner type="triple-bounce"  color="#cccccc" :size="28"></mt-spinner>
		</div>
		<div class="mt-load-txt">Loading</div>
	</div>
</template>
<script>
export default {
	
}
</script>
<style lang="less">
.scrollLoadIco{
	text-align: center;
	padding: 0.42rem 0;
	.mt-load-ico{
		display: inline-block;
	}
	.mt-load-txt{
		display: inline-block;
		color: #999999;
		margin-left: 0.28rem;
	}
}
</style>

