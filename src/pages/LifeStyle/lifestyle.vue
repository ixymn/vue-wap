<script>
import {mapMutations} from 'vuex'
import {getLifeStyle} from '../../service/getData'

export default {
	name: 'lifestyle',
	created(){
		this.initData();
	},
	data:function(){
		return{
			totalData:{},
			subjectList:{},
			shareList:[],
			popupVisible:false
		}
	},
	computed:{
	    pjltest(){
	    	return this.$store.state.pjltest
	    },
	    topicList(){
	    	return this.totalData.topicList
	    },
	},
	methods:{
	  	...mapMutations([
			'MUTATION_TEST'
		]),
		async initData(){
			var data = {
				curpage:1,
				page:10,
				key:'',
				share_recommend:1
			}
			
	        var newData  = (await getLifeStyle(data)).datas;

	        for(var i=0;i<newData.subjectList.length;i++){
	        	newData.subjectList[i].active = false;
	        	if(i==0){
		        	newData.subjectList[i].active = true;
	        	}
	        }

	        this.totalData = Object.assign({},this.totalData,newData)
			this.subjectList = Object.assign([],this.subjectList,newData.subjectList)
			this.shareList = Object.assign([],this.shareList,newData.shareList)
			console.log(this.shareList)

	        // console.log(this.totalData)
	        // this.MUTATION_TEST(res)
    	},
		titleClick(titles){
			for(let i=0;i<this.subjectList.length;i++){
                this.subjectList[i].active = false;
                // this.subjectList[i].subject_title = i;

				console.log(this.totalData.subjectList[i].active)
            }
            titles.active = true;
		},
		loadTop(){
			var THIS = this;
			setTimeout(function(){THIS.$refs.loadmore.onTopLoaded()},1000)
		}
	}
}
</script>
<template>
<div class="lifestyle-page">

	<router-link to='newShare' class="v-link">
		<div class="newShare"></div>
	</router-link>

	<mt-loadmore :top-method="loadTop" ref="loadmore">

		<div class="topicTtile">TOPIC</div>

		<div class="swipeChangeWrapper">
			<ul class="content">
				<li v-for="topic in topicList" :topic_id="topic.topic_id">
					<img :src="topic.topic_img" alt="">
				</li>
			</ul>
		</div>

		<div class="titleGroupWrapper">
			<ul class="titleGroup clearfix">
				<li @click="titleClick(titles)" v-for="titles in subjectList" :class="{active:titles.active}">
				<span>{{titles.subject_title}}</span>
				</li>
			</ul>
		</div>

		<ul class="ShareList">
			<li v-for="share in shareList">
				<div class="ShareBody">
					<div class="infoHead">
						<div class="infoLeft">
							<div class="profileP">
								<img :src="share.author_avatar" alt="">
							</div>
							<div class="SharerName">{{share.author_name}}</div>
							<div class="ShareTime">5 mins ago</div>
						</div>
						<div class="infoRight">+Follow</div>
					</div>
					<router-link to='lifestyleDetail' class="v-link">
						<div class="infoBody">
							<img src="../../assets/images/lifeStyle/1.png" alt="">
							<p class="articleT">{{share.share_title}}</p>
							<p class="articleB">{{share.share_content}}</p>
						</div>
	          		</router-link>
				</div>
				<ul class="infFooter clearfix">
					<li class="Igolook"><i></i>{{share.click_count}}</li>
					<li class="Icollect"><i></i>{{share.collection_count}}</li>
					<li class="Ishare"><i></i>Share</li>
				</ul>
			</li>
		</ul>

	</mt-loadmore>
<router-view></router-view>

</div>
</template>

<style lang="less" scoped>
.newShare{
	width:1.222rem;
	height:1.222rem;
	position:fixed;
	right:0.361rem;
	bottom:0.7rem;
	background:url(../../assets/images/lifestyle/newShare.png);
	background-size: contain;
	// border-radius: 50%;
	// background:#f87622;
	z-index: 99;
}
.ShareList>li{
	background:#fff;
	margin-top: 0.278rem;
}
.infoHead{
	height:1.667rem;
	position:relative;
}
.infoLeft{
	width:3.444rem;
	height:1.667rem;
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
	right:0.556rem;
	top:0.472rem;
	position:absolute;
	font-size: 0.361rem;

}
.profileP{
	width:1.111rem;
	height:1.111rem;
	border-radius: 50%;
	overflow:hidden;
	position:absolute;
	left:0.278rem;
	top:0.278rem;
	img{
		width:100%;
	}
}
.SharerName{
	position:absolute;
	left:1.611rem;
	top:0.278rem;
	color:#000;
	font-size: 0.389rem;
	white-space: nowrap;
}
.ShareTime{
	position:absolute;
	left:1.611rem;
	top:0.833rem;
	color:#999999;

}
.articleT{
	font-size: 0.444rem;
	font-weight: bold;
	color:#000;
	margin:2px 0 3px 0;
}
.articleB{
	color:#999999;
}
.infFooter{
	li{
		height:1rem;
		line-height: 1rem;
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
		background:url(../../assets/images/lifestyle/golook.png) no-repeat 0 4px;
		background-size: contain;
	}
	.Icollect i{
		background:url(../../assets/images/lifestyle/weizan.png) no-repeat 0 4px;
		background-size: contain;
	}
	.Ishare i{
		background:url(../../assets/images/lifestyle/share.png) no-repeat;
		position:relative;
		top:1px;
		margin-right: 4px;
		background-size: contain;
	}
}
.infoBody{
	background: #f3f5f9;
	padding-bottom: 0.278rem;
	img{
		width:100%;
	}
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
	height: 3rem;
	li{
		width:5.139rem;
		height:2.639rem;
		float: left;
		margin-right: 0.278rem;
		overflow:hidden;
		img{
			width:100%;
		}
	}
}
.swipeChangeWrapper{
	padding-left: 0.278rem;
	height: 3rem;
	background:#fff;
	overflow-x:scroll;
}

.topicTtile{
	padding:0 0.278rem;
	font-size: 0.444rem;
	font-weight: bold;
	height:1.111rem;
	line-height: 1.111rem;
	background:#fff;
}
.lifestyle-page{
	background:#f3f5f9;
}

.titleGroupChange{
	position:relative;

}
.titleGroupWrapper{
	margin-top: 0.278rem;
	height:1.6rem;
	overflow-x:scroll;
}
.titleGroup{
	background:#fff;
  display:flex;
  overflow-x:scroll;
  white-space: nowrap;
	li{
		padding:0 0.375rem;
		font-size: 0.389rem;
		color:#7E7E7E;
    display:inline-block;
		span{
			padding:0.319rem 0 0.403rem;
			display:inline-block;
		}
	}
	li.active{
		font-weight: bold;
		color:#000;
    border-bottom: .06rem solid #e4c187;
	}
}
.titleGroup::-webkit-scrollbar {display:none}

.LifeDetail{
	width:100vw;
	height:100vh;
	background:#FFF;
}

.addGoods{
  height: 10rem;
  background: red;
}
</style>
