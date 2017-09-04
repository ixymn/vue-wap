<template>
	<div>
		<template v-if="hasData">
			<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				
				<li class="eval-container clearfix" v-for="item in comList">
					<div class="user-avatar"><img :src="item.member_avatar" /></div>
					<div class="user-eval">
						<div class="user-name">{{item.geval_frommembername}}</div>
						<div class="eval-raty-time clearfix">
							<span class="goods-raty">
								<i v-for="n in 5" class="star_gray">
									<i class="star_orange" :class="{width36:(item.geval_scores>=n)}"></i>
								</i>
							</span>
							<span class="eval-time">{{item.geval_addtime_date}}</span>
						</div>
						<div class="eval-content">{{item.geval_content}}</div>
					</div>
				</li>
			</ul>
			<SCROLLLOAD v-show="!loading"/>
		</template>
		<template v-else>
			<div class="nctouch-norecord eval" >
				<div class="norecord-ico"><i></i></div>
				<dl>
					<dt>No Review</dt>
					<dd>Welcome to Kilimall</dd>
				</dl>
			</div>
		</template>
	</div>
</template>
<script>
	import {getGoodsComment} from '../../service/getData'
	import ScrollLoad from '../../components/common/scrollLoadIco.vue';
	export default {
		data: function(){
			return {
				comList:[],//评论列表
				hasmore:true,
				loading:false,
    			goodsId:"",
    			curpage:1,
		    }
		},
		components:{
			"SCROLLLOAD":ScrollLoad,
		},
		mounted:function(){
			this.goodsId=this.$route.params.goodsid;
			this.loadMore();
		},
		computed:{
			hasData:function(){
				if(this.comList)
					return true;
				else
					return false;
			}
		},
		methods:{
			
			loadMore: async function(){
					this.loading = true;
				if(this.hasmore){
					let resComment = await getGoodsComment(this.goodsId,this.curpage);
					if(resComment.code == "200"){
						if(resComment.datas.goods_eval_list.length){
							console.log(resComment.datas.goods_eval_list.length)
							let newArr=this.comList.concat(resComment.datas.goods_eval_list);
							this.comList=newArr;
							this.loading=false;
							this.hasmore=resComment.hasmore;
							this.curpage=this.curpage+1;
						}
					}else if(res.code == "444"){
						this.$toast(res.datas.error);
					}else{
						this.$toast("error");
					}
				}
				
				
			},
		},
	}
</script>
<style lang="less">
	.eval-container {
		padding: 0.36rem 0 0 0.42rem;
		background-color: #ffffff;
		box-shadow: inset 0px 0px 0px 0px #dddfe4;
	}
	.user-avatar {
		float: left;
		width: 1.0rem;
	}
	.user-avatar>img {
		width: 100%;
	}
	.user-eval {
		float: right;
		width: 80%;
		padding: 0 0.42rem 0.36rem 0;
		border-bottom: 1px solid #e1e3e7;
	}
	.user-name {
		color: #150000;
		font-size: 0.33rem;
		font-weight: bold;
		text-align: left;
	}
	
	.eval-raty-time {
		padding-top: 0.19rem;
	}
	.star_gray {
		float: left;
		width: 0.36rem;
		height: 0.36rem;
		margin-right: 0.11rem;
		background: url(../../assets/images/star-grey.png) no-repeat center;
		background-size: 100% 100%;
	}
	.star_orange {
		float: left;
		height: 0.36rem;
		background:url(../../assets/images/star.png) no-repeat left center;
		background-size: auto 100%;
	}
	.width36{
		width: 0.36rem;
	}
	.eval-time {
		float: right;
		color: #C4C8D2;
		font-size: 0.33rem;
	}
	.eval-content {
		padding-top:0.28rem;
		color: #150000;
		font-size: 0.39rem;
		text-align: left;
	}
	.nctouch-norecord {
		position: initial;
		width: auto;
		height: auto;
		margin: 0 auto;
		padding-top: 2rem;
		font-size: 0;
		text-align: center;
		background-color: #f3f5f9;
	}
	.nctouch-norecord .norecord-ico { 
		display: inline-block; 
		width: 1.2rem; 
		height: 1.2rem; 
		padding: 0.4rem; 
		margin: 0 auto; 
		background-color: #DDD; 
		border-radius: 100%;
	}
	.nctouch-norecord .norecord-ico i { 
		display: block; 
		width: 100%; 
		height: 100%; 
		background-repeat: no-repeat; 
		background-position: 50% 50%; 
		background-size: 80%; 
	}
	.nctouch-norecord.eval .norecord-ico i { 
		background-image: url(../../assets/images/no-review.png); 
	}
	.nctouch-norecord dl { 
		height: 2.75rem; 
		margin-top: 0.42rem; 
	}
	.nctouch-norecord dl dt { 
		display: block; 
		height: 0.56rem; 
		margin-bottom: 0.42rem; 
		font-size: 0.44rem; 
		line-height: 0.83rem; 
	}
	.nctouch-norecord dl dd {
		display: block; 
		height: 0.56rem; 
		margin-bottom: 0.5rem; 
		font-size: 0.33rem; 
		line-height:0.39rem; 
		color: #999; 
	}
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
		box-shadow: inset 0 0 0 .1em #3aa8ed; }
		@keyframes spinner-circle {
			0% { transform: rotate(-180deg); }
			100% { transform: rotate(180deg); }
		}
		@-webkit-keyframes spinner-circle {
			0% { -webkit-transform: rotate(-180deg); }
			100% { -webkit-transform: rotate(180deg); }
		}
	</style>

