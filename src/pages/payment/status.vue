<template lang="html">
<div class="">
<div class="error-tips"  style="display:none;"></div>


  <div id="success"  v-show="showStatus==1"  class="wrap wrap-success">
    <header class="top">Order Successful</header>
    <div class="content">
        <div class="title success">
            <i class="icon"></i>
            <span class="text">Order Successful</span>
        </div>
        <h3 class="tips">Thank you for buying</h3>
        <div class="btns">
            <a @click="goOrder" class="button button-k">View the Order</a>
            <a @click="goHome" class="button button-s">Buy More</a>
        </div>
    </div>

</div>

<div id="changed" v-show="showStatus==0" class="wrap wrap-success">
    <header class="top">Payment status unchanged</header>
    <div class="content">
        <div class="title process">
            <i class="icon"></i>
            <span class="text">Payment status unchanged</span>
        </div>
        <h3 class="tips">Thank you for buying</h3>
        <div class="tips-info">
            <p>Kindy proceed to pay your order and you will get cash rewards.</p>
            <p>If you have already completed your payment,</p>
            <p>don't worry about this page,</p>
            <p>kindly check the status after a couple of minutes.</p>
            <p>Thanks for your support.</p>
        </div>
        <div class="btns">
            <a @click="goOrder"  class=" button button-k">View the Order</a>
            <a @click="goHome" class="button button-s">Buy More</a>
        </div>
    </div>
</div>

<div id="error" v-show="showStatus==2" class="wrap wrap-error">
    <header class="top paystack-error-tips">Payment status unchanged</header>
    <div class="content">
        <div class="title error">
            <i class="icon"></i>
            <span class="text paystack-error-tips">Payment status unchanged</span>
        </div>
    </div>
    <div class="info">

        <h3 class="tips">Thank you for buying</h3>
        <div class="tips-info">
            <p>Order Payment Status Unchanged Sorry, </p>
            <p>Lipapay hasn't notified us yet.</p>
            <p>But don't worry,maybe it has a litte delay,</p>
            <p>Kindly check your order list later to see the payment status.</p>
        </div>
        <div class="btns">
            <a @click="goOrder"   class=" button button-k">View the Order</a>
            <a @click="goHome" class="button button-s">Buy More</a>
        </div>

    </div>
</div>
</div>

</template>

<script>
import {getPaymentStatus}  from '../../service/getData'
export default {
  data(){
    return {
      showStatus:null,
      inAndrod : this.isInAndroid(),
    }
  },

  methods:{
    isInAndroid(){
      var ua = navigator.userAgent;
      if(ua.indexOf("kilimall,android")>1){
        return true;
      }
      return false;
    },
    androidClick(action,id){
    window.WebViewJavascriptBridge.callHandler(
    'submitFromWeb',
    {
        "action": action, //login.search,goodsDetail,StoreDetail,buyVoucher,orderList,buyMore,verifyPhone,html5,userCenter
        "ref_id": id //goods_id,store_id，cate_id
    });

    },
    goOrder(){
      if(this.inAndrod){
        this.androidClick("go2orderlist","")
      }
      else{
      window.parent.location.href = "/#/order"
      //this.$router.push("/order")
      }
    },
    goHome(){
      if(this.nAndrod){
        this.androidClick("buymore","")
      }
      else{
      window.parent.location.href = "/#/home"
      //this.$router.push("/home")
      }

    },
    async initData(){
      var _this =this;
      var getQueryString = function(s){
        if(_this.$route.query[s]==undefined){ return 0;}
        return _this.$route.query[s];
      }
      var params = {
            "merchantId": getQueryString('merchantId'),
            "signType": getQueryString('signType'),
            "sign": getQueryString('sign'),
            "orderId": getQueryString('orderId'),
            "merchantOrderNo": getQueryString('merchantOrderNo'),
            "status": getQueryString('status'),
            "paymentMethod": getQueryString('paymentMethod')
        }
      var data = await getPaymentStatus(params);
      console.log(data);
      if(data){
        if (data.code == 200) {
                if (data.datas.status == 1) {
                  console.log(1);
                  this.showStatus = 1
                  //success

                } else if (data.datas.status == 0) {
                  console.log(0);
                  this.showStatus = 0;
                  // unchange
                }
        }
            if (data.code == 444) {
                //$('#error').show();
                console.log(444);
                this.showStatus = 0;
                document.querySelector(".error-tips").innerHTML=data.datas.error;
            }
      }
    }

    },

    created(){
      this.initData()
    }

}
</script>

<style lang="css" scoped >


body {
  background-color: #f2f2f2;
}
.wrap .top {
  height: 1.08rem;
  line-height: 1.08rem;
  text-align: center;
  font-weight: bold;
  background-color: #f97723;
  color: #ffffff;
  position: static;
}

.wrap .content {
  overflow: hidden;
  background-color: #fff;
}

.wrap .title {
  height: 0.62rem;
  line-height: 0.62rem;
  margin-top: 0.98rem;
  text-align: center;
}

.wrap .title.success .icon {
  background: url("../../assets/settings/check_success.png");
  -webkit-background-size: 100%;
  background-size: 100%;
}

.wrap .title.error {
  margin-top:0.6rem;
  margin-bottom:.5rem;
}

.wrap .title.error .icon {
  background: url("../../assets/settings/check_error.png");
  -webkit-background-size: 100%;
  background-size: 100%;
}
.wrap .title.process .icon {
  background: url("../../assets/settings/check_proccess.png");
  -webkit-background-size: 100%;
  background-size: 100%;
}
.wrap .title.success .text {
  color: #1a0202;
}

.wrap .title.error .text {
  color: #fd291d;
}

.wrap .title .icon {
  display: inline-block;
  width: .62rem;
  height: .62rem;
  vertical-align: middle;
}

.wrap .title .text {
  display: inline-block;
  font-size: .365rem;
  vertical-align: middle;
}

.wrap.wrap-error .tips {
  margin-bottom: 0;
  color: #140000;
}

.wrap .tips {
  font-size: .3rem;
  padding: .3rem 0;
  color: #7c7c7c;
  text-align: center;
  margin-bottom: .45rem;
}

.wrap .tips-info {
  padding: 0 .8333rem;
  margin-bottom: .62rem;
}

.wrap .tips-info p {
  color: #7b7b7b;
  font-size: .3rem;
}

.wrap .btns {
  text-align: center;
  padding-bottom: .5rem;
}

.wrap .btns .button {
  width: 3rem;
  height: .667rem;
  line-height: .67rem;
  display: inline-block;
  text-align: center;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-border-radius: .07rem;
  -moz-border-radius: .07rem;
  border-radius: .07rem;
}

.wrap .btns .button-s {
  color: #ffffff;
  background-color: #f97425;
  margin-right: 0.37rem;
}

.wrap .btns .button-k {
  color: #f97425;
  border: .03rem solid #f97425;
    margin: .5rem;
}

.wrap .info {
  background-color: #fff;
  margin-top: 0.166rem;
}

.wrap .info {
}

.wrap .info .info-item {
  padding-left: .413rem;
  height:.915em;
  line-height: .916rem;
  border: .03rem solid #f0f0f0;
  border-left: none;
  border-right: none;
  font-size: .3rem;
}

.wrap .info .info-item.nb {
  border-top: none;
}

.wrap .info .info-item strong {
  font-weight: normal;
  color: #7f7f7f;
}

.wrap .info .info-item span {
  color: #cecece;
}
</style>
