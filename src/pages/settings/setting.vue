<script>
import {mapState} from 'vuex'
import headerBack from '../../components/common/headerBack.vue'
import '../../utils/common.js'

export default {
	data:function(){
		return{

		}
	},
	computed:{
        ...mapState([
           'loginInfo'
        ]),
	},
	created(){

	},
	methods:{
        logOut(){
            common.delCookie('key')
            common.delCookie('username')
            this.$store.state.cartAddr=null;//清除购物车地址
            this.$router.push('/login')
        },
        linkVerifyPhone(){
            if(common.getCookie('key')){
                //已绑定手机
                if(this.loginInfo.datas.member_info.member_mobile_bind == "1"){
                    this.$toast({
                        message:"Already verified: "+this.loginInfo.datas.member_info.member_mobile,
                        position:'bottom',
                    });
                }else{//未绑定，跳转绑定页面
                    this.$router.push("/verifyPhone");
                }
            }else{
                common.goLogin(this.$router);
            }
        },
        goModifyPW(){
            if(common.getCookie('key')){
                this.$router.push("/modifyPassword");
            }else{
                this.$router.push("/login");
            }
        }
	},
    components:{
        'headerBack':headerBack,
    },
}
</script>
<template>
<div class="wrapper22">
    <headerBack headTitle="Settings"></headerBack>
    <ul class="settingList">
        <!-- <li>Profile<i></i></li> -->
        <li @click="linkVerifyPhone">Verify Phone No. <i></i>

        </li>
        <li>
            <router-link to="/changeCountry">Select Country</router-link>
            <i></i>
        </li>
        <li @click="goModifyPW">
            Modify Password
            <i></i>
        </li>
    </ul>
    <div class="nextButton" @click="logOut" v-show="this.loginInfo.code=='200'">LOG OUT</div>
</div>
</template>

<style lang="less" scoped>
.wrapper22{
    padding-top: 1.33rem;
	*{
    	box-sizing: border-box;
	}
}
.settingList{
    li{
			height: 1.42rem;
		  line-height: 1.42rem;
		  padding-left: .5rem;
		  font-size: .389rem;
		  border-bottom: 1px solid #e2e2e2;
		  background: #f7f7f7;
		  position: relative;
		  color: #464646;
        a{
            display:inline-block;
            width:100%;
						color: #464646;
        }
    }

    i{
        background: url(../../assets/images/arrowRight.png)0 0 no-repeat/contain;
        display:inline-block;
        width:0.556rem;
        height:0.556rem;
        position: absolute;
        right:0.194rem;
        top:0.278rem;
    }
}
.nextButton{
    width: 7.222rem;
    height: 1.111rem;
    line-height: 1.111rem;
    margin: 1rem auto 0;
    background: #424040;
    color: #fff;
    font-size: .444rem;
    text-align: center;
    font-weight: 700;
}
</style>
