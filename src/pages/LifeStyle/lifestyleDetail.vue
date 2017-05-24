<script>

export default {
	data:function(){
		return{
			goodsToShare:['Apple New Macbook 12','New Cloth displayed','Iphone 6s'],
			picsList:[0],
			senTaku:[
				{
					isActive:true,
					word:'Insert the buy links in the middle.'
				},
				{
					isActive:false,
					word:'Images loaded in the tail.'
				}
			]		
		}
	},
	computed:{
		ToShareRE(){
			return this.goodsToShare.join(',')
		}
	},
	methods:{
		checkOption(option){
			option.isActive=!option.isActive;
		}
	}
}
</script>
<template>
<div class="SETwrapper">
	<div class="percent74">
		<div class="ShareTitle">
			<input type="text" placeholder="Title">
		</div>	
		<div class="ShareItem">
			<p>
				<span>Item</span>
				<span class="goodsToShare">{{ToShareRE}}</span>
			</p>
			<div class="itemTianJia"></div>
		</div>
		<div class="addColumn">
			<textarea class="ShareWrite" placeholder="Share with others.."></textarea>
			<div class="picsZone clearfix">
				<ul class="picsList">
					<li v-for="pic in picsList">
						<i></i>
						<img src="../../assets/images/lifeStyle/2.png" alt="">
					</li>
				</ul>
				<div class="addPic"></div>
			</div>
		</div>
	</div>
	<div class="percent26">
		<div class="senTaku">
			<ul>
				<li v-for="option in senTaku" @click="checkOption(option)">
					<label>
						<i :class="{active:option.isActive}"></i>
						<span>{{option.word}}</span>
					</label>
				</li>
			</ul>
		</div>
		<div class="publishWrapper">
			<div class="publishB"><span>Publish</span></div>
		</div>
	</div>
</div>
</template>

<style lang="less" scoped>
.SETwrapper{
	height: 100vh;
}
.percent74{
	height:76vh;
	display:flex;
	flex-direction:column;
}
.percent26{
	height:24vh;
	padding-top: 0.278rem;
}
.publishWrapper{
	height:9vh;
	padding:0.278rem;
}
.publishB{
	height:100%;
	// height:40px;
	// line-height: 40px;
	// text-align: center;
	background: #424040;
	color:#fff;
	font-size: 0.444rem;
	position:relative;
	span{
		position:absolute;       
	    margin:auto;
	    top:50%;
	    left:50%;
	    transform:translate(-50%,-50%)
	}
}
.senTaku{
	// height:2.222rem;
	background:#fff;
	li{
		// height:1.111rem;
		// line-height: 1.111rem;
		height:6vh;
		line-height: 6vh;
		padding-left: 0.278rem;

	}
	i{
		width:0.5rem;
		height:0.5rem;
		display:inline-block;
		background:url(../../assets/images/lifestyle/clickEmpty.png);
		background-size: contain;
		position:relative;
		top:0.111rem;
		margin-right: 0.139rem;
	}
	i.active{
		background:url(../../assets/images/lifestyle/clickCertain.png);
		background-size: contain;
	}
}
.addPic{
	float:left;
	margin-bottom: 0.222rem;
}
.picsList{
	li{
		width:2.083rem;
		height:2.083rem;
		float:left;
		margin:0 0.278rem 0.278rem 0;
		position:relative;
		img{
			width:100%;
		}
		i{
			width:0.5rem;
			height:0.5rem;
			display:inline-block;
			background:url(../../assets/images/lifestyle/deletePic.png);
			background-size: contain;
			position:absolute;
			right:-0.167rem;
			top:-0.167rem;
		}
	}
}
.picsZone{
	flex-grow:1;

	padding:0.278rem 0.278rem 0;
	background:#fff;
	.addPic{
		width:2.083rem;
		height:2.083rem;
		background:url(../../assets/images/lifestyle/addPic.png);
		background-size: contain;
	}
}
.ShareTitle{
	flex-grow:1;
	height:1.389rem;
	line-height: 1.389rem;
	background:#fff;
		font-size: 0.389rem;
	input{
		outline: none;
		border:none;
		height:1.389rem;
		font-size: 0.389rem;
		padding-left: 0.278rem;
	}
}
.ShareItem{
	flex-grow:1;

	height:1.111rem;
	line-height: 1.111rem;
	color:#7E7E7E;
	font-size: 0.389rem;
	margin-left: 0.278rem;
	position:relative;
}

.addColumn{
	flex-grow:8;

	display:flex;
	flex-direction:column;
	background: #FFF;
}
.ShareWrite{
	height:6.111rem;
	flex-grow:9;
	// height:100%;
	background:#fff;
	width:100%;
	outline:none;
	border:none;
	resize:none;
	font-size:0.389rem;
	line-height: 0.6rem;
	padding:0.333rem;
}
.ShareItem>p{
	text-overflow:ellipsis;
	overflow:hidden;
	white-space:nowrap;
	width:80%;
}
.goodsToShare{
	color:#E4C187;
	margin-left: 0.139rem;
}
.itemTianJia{
	width:0.611rem;
	height:0.611rem;
	position:absolute;
	right:0.25rem;
	top:0.25rem;
	background:url(../../assets/images/lifestyle/itemtianjia.png) 0.028rem 0;
	background-size: contain;
}
</style>
