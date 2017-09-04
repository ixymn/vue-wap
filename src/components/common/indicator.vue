<template>
	<div class="mint-indicator">
		<div class="mint-indicator-wrapper" style="padding: 0.42rem;">
			<span class="mint-indicator-spin">
				<div class="mint-spinner-snake" style="border-top-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204); height: 0.89rem; width: 0.89rem;"></div>
			</span>
			 <span class="mint-indicator-text">process...</span>
		</div> 
		<div class="mint-indicator-mask"></div>
	</div>
</template>
<script>
export default {
  
}
</script>
<style lang="less">
.mint-indicator {
  -webkit-transition: opacity .2s linear;
  transition: opacity .2s linear;
}
.mint-indicator-wrapper {
  top: 50%;
  left: 50%;
  position: fixed;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  border-radius: 0.14rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  box-sizing: border-box;
  text-align: center;
  z-index: 9999;
}
.mint-indicator-text {
  display: block;
  color: #fff;
  text-align: center;
  margin-top: 0.28rem;
  font-size: 0.44rem;
}
.mint-indicator-spin {
  display: inline-block;
  text-align: center;
}
.mint-indicator-mask {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: transparent;
}
.mint-indicator-enter, .mint-indicator-leave-active {
  opacity: 0;
}
</style>

