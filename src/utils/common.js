import { getLoginInfo } from '../service/getData.js'
var common = {

  setCookie : (e, t, a)=>{
    var n = e + "=" + escape(t) + "; path=/";
    if (a > 0) {
      var r = new Date;
      r.setTime(r.getTime() + a * 3600 * 1e3);
      n = n + ";expires=" + r.toGMTString()
    }
    document.cookie = n
  },
  getCookie: (e)=>{
    var t = document.cookie;
    var a = t.split("; ");
    for (var n = 0; n < a.length; n++) {
      var r = a[n].split("=");
      if (r[0] == e) return unescape(r[1])
    }
    return null
  },
  delCookie:(e)=>{
    var t = new Date;
    t.setTime(t.getTime() - 1);
    var a = common.getCookie(e);
    if (a != null) document.cookie = e + "=" + a + "; path=/;expires=" + t.toGMTString()
  },
  storeRedirectUrl:(r)=>{
    common.delCookie("redirect_url");
    let redirect_url = window.location.href.split("#")[1];
    common.setCookie("redirect_url",redirect_url);
  },

  checkLogin : async ()=>{
    let key = common.getCookie("key");
    return await getLoginInfo({key:key});

  },
  goLogin:(r)=>{
    common.storeRedirectUrl(r);

    r.push("/login");
  },
  goLogout:(_this)=>{
    common.delCookie('key')
    common.delCookie('username')
    common.delCookie('hidePopup');
    common.delCookie('redirect_url');
    _this.$store.state.cartAddr=null;//清除购物车地址
  },
  getQueryString:(e)=>{
    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
    var a = window.location.search.substr(1).match(t);
    if (a != null) return a[2];
    return ""
  }
}


var Ad = {
  afId: common.getQueryString("kilimall_af_id") || common.getCookie("af_id"),
  refId: common.getQueryString("refid") || common.getCookie("ref_id"),
  utmSource: common.getQueryString("source") || common.getQueryString("utm_source") || common.getCookie("utm_source"),
  orderId: "",
  totalCost: "",
  adHtml: "",
  AdTypeHtml: function () {
    if (this.utmSource == "clickwise") {
      this.adHtml += "<img src='";
      this.adHtml += "https://track.clickwise.net/pb?ActionCode="+this.ActionCode+"&AccountID=56d11586&CampaignID="+this.Campaignid+"&ApiKey="+this.ApiKey+"&";
      this.adHtml += "RefId=" + this.refId + "&";
      this.adHtml += "OrderId=" + this.orderId + "&";
      this.adHtml += "TotalCost=" + this.totalCost + "'  width='1' height='1' />";
    }
    else if (this.utmSource == "AffiliateSG") {//shoogloomedia
      this.adHtml += "<div><iframe src='http://trackkin.com/p.ashx?o="+this.shoogloo_o+"&e=134&t=";
      this.adHtml += this.orderId + "&p=" + this.totalCost + "' "
      this.adHtml += " height='1' width='1' frameborder='1'></iframe>";
      this.adHtml += "<img src='//cdsch2.veinteractive.com/DataReceiverService.asmx/Pixel?journeycode=5F96CE72-E26D-4285-B31F-C5716914E1A0' width='1' height='1'/></div>"
    }
    return
  },
  AdRefPump: function () {
    common.addCookie("af_id", this.afId, 30 * 24);
    common.addCookie("ref_id", this.refId, 30 * 24);
    common.addCookie("utm_source", this.utmSource, 30 * 24);
  },//存储广告信息
  AdRefDump: function () {
    var afcookie = common.getCookie("af_id");
    var refcookie = common.getCookie("ref_id");
    var utmcookie = common.getCookie("utm_source");
    if (this.afId != afcookie) {
      common.delCookie("af_id");
    }
    if (this.refId != refcookie) {
      common.delCookie("ref_id");
    }
    if (this.utmSource != utmcookie) {
      common.delCookie("utm_source");
    }
    //delCookie("af_id");
    //delCookie("utm_source");
    common.delCookie("adhtml");
  }//删除广告信息
}//广告代码全局变量入口

window.common = common;
window.Ad = Ad;
