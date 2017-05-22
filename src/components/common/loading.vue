<template>
	<div class="loading">
		<div class="spinner"><i></i></div>
		Loading
	</div>
</template>
<script>
export default {
  
}
</script>
<style lang="less">
.loading { 
		text-align: center; 
		display: block; 
		padding: 0.28rem 0; 
		font-size: 0.33rem; 
		color: #666; 
	}
	.spinner { 
		display: inline-block; 
		vertical-align: middle; 
		margin-right: 0.4em; 
		font-size: 1em; 
		width: 1em; 
		height: 1em; 
		text-align: left; 
		border-radius: 50%; 
		box-shadow: inset 0 0 0 .1em rgba(58, 168, 237, .3); 
	}
	.spinner i { 
		position: absolute; 
		clip: rect(0, 1em, 1em, .5em); 
		width: 1em; 
		height: 1em; 
		animation: spinner-circle-clipper 1s ease-in-out infinite; 
		-webkit-animation: spinner-circle-clipper 1s ease-in-out infinite; 
	}
	@keyframes spinner-circle-clipper {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(180deg); }
	}
	@-webkit-keyframes spinner-circle-clipper {
		0% { -webkit-transform: rotate(0deg); }
		100% { -webkit-transform: rotate(180deg); }
	}
	.spinner i:after { 
		position: absolute;
		clip: rect(0, 1em, 1em, .5em); 
		width: 1em; 
		height: 1em; 
		content: ''; 
		animation: spinner-circle 1s ease-in-out infinite; 
		-webkit-animation: spinner-circle 1s ease-in-out infinite; border-radius: 50%;
		box-shadow: inset 0 0 0 .1em #3aa8ed; 
	}
	@keyframes spinner-circle {
		0% { transform: rotate(-180deg); }
		100% { transform: rotate(180deg); }
	}
	@-webkit-keyframes spinner-circle {
		0% { -webkit-transform: rotate(-180deg); }
		100% { -webkit-transform: rotate(180deg); }
	}
</style>

