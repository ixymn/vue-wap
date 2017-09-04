<template>
	<div class="inviteShare_dialog" :class="{'share-good':!inviteCode}">
        <em class="inviteShare_close" id="inviteShare_close" @click="hideShare"></em>
        <div class="inviteShare_title">{{shareTitle}}</div>
        <p class="inviteShare_code" v-if="inviteCode">{{shareObject=='code'?inviteCode:''}}</p>
        <div class="inviteShare_ico clearfix" v-if="inviteCode">
            <a href="javascript:;" alt="facebook" @click="shareEvent(1)" class="inviteByFk"></a>
            <a href="javascript:;" alt="sms" @click="shareEvent(2)" class="inviteBySms"></a>
            <a href="javascript:;" alt="twitter" @click="shareEvent(3)" class="inviteByTw"></a>
    	</div>
    	<div class="inviteShare_ico clearfix" v-else>
            <a href="javascript:;" alt="facebook" @click="shareGood(1)" class="inviteByFk"></a>
            <a href="javascript:;" alt="sms" @click="shareGood(2)" class="inviteBySms"></a>
            <a href="javascript:;" alt="twitter" @click="shareGood(3)" class="inviteByTw"></a>
    	</div>
	</div>
</template>
<script>
export default {
	props:['shareObject','inviteCode','goodsInfo'],
	computed:{
		shareTitle:function(){
			let strTmp='';
			switch (this.shareObject){
				case 'code':
					strTmp='Share My Referral Code';
					break;
				case 'good':
					strTmp='Share To';
					break;
			}
			return strTmp;
		},
		currencyUnit:function(){
	        return this.$store.state.site.currency;
	    },
	},
	methods:{
		hideShare:function(){
			this.$emit("hideShareEvent");
		},
		shareEvent:function(index){
			let cashAmount='';
			switch(common.getCookie("country")){
				case "kenya":
					cashAmount="100 "+this.currencyUnit+" for free now! "
					break;
				case "nigeria":
					cashAmount="300 "+this.currencyUnit+" for free now! "
					break;
				case "uganda":
					cashAmount="3000 "+this.currencyUnit+" for free now! "
					break;
				default:
					cashAmount="";
			};
			var sharePic=window.location.href.split("#")[0]+'facebook_share.png',
				sharHref = window.location.href + 'Share/'+this.inviteCode,
				shareObj = {
		            twTitle:cashAmount+'Come and join Kilimall and receive your Cash Rewards! Simply click the link!',
		            desc:'Use the invitation code {'+this.inviteCode+'} to register on Kilimall and get rewards .\n'
		        };

		    switch(index){
		    	case 1:
		    		var _uri = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(sharHref)+'&picture='+encodeURIComponent(sharePic)+'&title='+encodeURIComponent(shareObj.twTitle)+'&description=.';
	            	window.open(_uri);
		    		break;
		    	case 2:
		    		var _uri = 'sms:?&body='+shareObj.twTitle+' '+sharHref;
	            	window.open(_uri);
		    		break;
		    	case 3:
			    	var _uri = 'http://twitter.com/home/?status='.concat(encodeURIComponent(shareObj.twTitle)).concat(encodeURIComponent(sharHref));
		            window.open(_uri);
		    		break;	
		    }
		},
		shareGood:function(index){
			var sharePic=this.goodsInfo.goods_image,
				sharHref = window.location.href,
				shareObj = {
		            twTitle:this.goodsInfo.goods_name+' Amazing product,try it out!',
		            desc:''
		        };

		    switch(index){
		    	case 1:
		    		var _uri = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(sharHref)+'&picture='+encodeURIComponent(sharePic)+'&title='+encodeURIComponent(shareObj.twTitle)+'&description=.';
	            	window.open(_uri);
		    		break;
		    	case 2:
		    		var _uri = 'sms:?&body='+shareObj.twTitle+' '+sharHref;
	            	window.open(_uri);
		    		break;
		    	case 3:
			    	var _uri = 'http://twitter.com/home/?status='.concat(encodeURIComponent(shareObj.twTitle)).concat(encodeURIComponent(sharHref));
		            window.open(_uri);
		    		break;	
		    }
		},
	}
}
</script>
<style lang="less">
	.inviteShare_dialog{
	    width: 80%;
	    height: 4.6rem;
	    padding: 0.5rem 0.3rem 0.4rem 0.3rem;
	    box-sizing: border-box;
	    background: #fff;
	    margin: auto;
	    position: absolute;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    border-radius: 0.15rem;
	    text-align: center;
	}
	.share-good{
		height: 3.5rem;
	}
	.inviteShare_close{
		width: 0.5rem;
		height: 0.5rem;
		background-image: url(../../assets/images/cashRewards/ic_close.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center;
		display: block;
		position: absolute;
		top: 0.5rem;
		right: 0.3rem;
	}
	.inviteShare_title{
		font-size: 0.45rem;
		text-align: center;
		margin-bottom: 0.2rem;
	}
	.inviteShare_code{
		text-align: center;
		font-size: 0.5rem;
		color: #F87622;
		letter-spacing: -0.01rem;
		font-weight: bold;
		margin: 0.4rem auto 0.2rem auto;
		height: 0.6rem;
	}
	.inviteShare_ico a{
		display: inline-block;
		float: left;
		width: 1.25rem;
		height: 1.25rem;
		margin: 0.4rem 0.5rem 0 0.5rem;
		background-size: contain;
		background-repeat: no-repeat;
		
	}
	.inviteByFk{
		background-image: url(../../assets/images/cashRewards/icon_top_up_share_fk.png);
	}
	.inviteBySms{
		background-image: url(../../assets/images/cashRewards/icon_share_sms.png);
	}
	.inviteByTw{
		background-image: url(../../assets/images/cashRewards/icon_top_up_share_tw.png);
	}
	.inviteShare_ico{
		display: inline-block;
	    margin: auto;
	    text-align: center;
	}
</style>

