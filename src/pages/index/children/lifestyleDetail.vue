<script>
export default {
	name: 'AAAAAA',
	created:function(){
		alert(99)
	}

}
</script>
<template>
<div id="aaaaaaaaaaaaaaaaaaaa">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</div>
</template>

<style lang="less">
.ShareList{
	li{
		background:#fff;
		margin-top: 0.278rem;
	}
}
.infoHead{
	height:60px;
	position:relative;
}
.infoLeft{
	width:124px;
	height:60px;
	position:absolute;
	left:0;
}
.infoRight{
	width:2.097rem;
	height:0.722rem;
	line-height: 0.722rem;
	text-align: center;
	color:#E4C187;
	border:1px solid #E4C187;
	right:20px;
	top:17px;
	position:absolute;
	font-size: 13px;

}
.profileP{
	width:40px;
	height:40px;
	border-radius: 50%;
	overflow:hidden;
	position:absolute;
	left:10px;
	top:10px;
	img{
		width:100%;
	}
}
.SharerName{
	position:absolute;
	left:58px;
	top:10px;
	color:#000;
	font-size: 14px;
}
.ShareTime{
	position:absolute;
	left:58px;
	top:30px;
	color:#999999;

}
.articleT{
	font-size: 16px;
	font-weight: bold;
	color:#000;
	margin:2px 0 3px 0;
}
.articleB{
	color:#999999;
}
.infFooter{
	li{
		height:1.111rem;
		line-height: 1.111rem;
		width:33.3%;
		float:left;
		text-align: center;
		color:#999999;
		i{
			display:inline-block;
			width:14px;
			height:14px;
		}
	}
	.Igolook i{
		background:url(../../../assets/images/lifestyle/golook.png) no-repeat 0 4px;
		background-size: contain;
	}
	.Icollect i{
		background:url(../../../assets/images/lifestyle/weizan.png) no-repeat 0 4px;
		background-size: contain;
	}
	.Ishare i{
		background:url(../../../assets/images/lifestyle/share.png) no-repeat;
		position:relative;
		top:1px;
		margin-right: 4px;
		background-size: contain;
	}
}
.infoBody{
	background: #f3f5f9;
	padding-bottom: 0.278rem;
}
.ShareBody{
	padding:0 0.278rem;
}
.swipeChange{
	position: relative;
	overflow: auto;
	height: 5rem;
}
.content{
	z-index: 999;
	width: 300vw;
	position: absolute;
	height: 3rem;
	li{
		width:5.139rem;
		height:2.639rem;
		float: left;
		margin-right: 0.278rem;
		img{
			width:100%;
		}
	}
}
.swipeChangeWrapper{
	padding-left: 0.278rem;
	height: 3rem;
	background:#fff;
	overflow: hidden;
}

.topicTtile{
	padding:0 0.278rem;
	font-size: 16px;
	font-weight: bold;
	height:40px;
	line-height: 40px;
	background:#fff;
}
.lifestyle-page{
	background:#f3f5f9;
}

.titleGroupChange{
	position:relative;
	overflow:auto;
	height:80px;
}
.titleGroupWrapper{
	margin-top: 0.278rem;
	height:1.389rem;
	overflow:hidden;
}
.titleGroup{
	background:#fff;
	width:150vw;
	li{
		padding:0 0.375rem;
		font-size: 14px;
		float:left;
		color:#7E7E7E;
		span{
			padding:0.319rem 0 0.403rem;
			display:inline-block;
		}
	}
	li.active{
		font-weight: bold;
		color:#000;
		span{
			border-bottom: 2px solid #e4c187;
		}
	}
}
.titleGroup{

}
.LifeDetail{
	width:100vw;
	height:100vh;
	background:#FFF;
}


</style>
