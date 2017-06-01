import fetch from '../utils/fetch'
import store from '../store'
import Vue from 'vue'
function getCookie(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
  else
      return null;
}
var country = getCookie('country');
if(country){
  store.commit('SET_SITES',country);
}else{
  store.commit('SET_SITES','kenya');
}
var apiUrl = store.state.site.apiUrl;
//获取首页数据
var getIndexData = () => fetch('GET', apiUrl+'/index.php?act=index_new&op=index', {});
//获取秒杀商品数据
var getFlashData = () => fetch('GET',apiUrl+'/index.php?act=flash_goods',{});

//获取goods数据
var getGoodsData = (goodsid) => fetch('GET',apiUrl+'/index.php?act=goods&op=new_goods_detail&goods_id='+goodsid,{});
//获取goods评论
var getGoodsComment = (goodsid,curpage) => fetch('GET',apiUrl+'/index.php?act=goods&op=goods_evaluate&goods_id='+goodsid+"&curpage="+curpage+"&page=10");
//获取goods详细HTML
var getGoodsHtml = (goodsid) => fetch('GET',apiUrl+'/index.php?act=goods&op=goods_body&goods_id='+goodsid,{},'fetch','text');

//LifeStyle
var getLifeStyle = (data) => fetch('GET',apiUrl+'/index.php?act=lifestyle&op=getShareHome'+'&curpage='+data.curpage+'&page='+data.page+'&key='+data.key+'&share_recommend='+data.share_recommend,{})

//Category一级分类
var getFirstCate = () => fetch('GET',apiUrl+'/index.php?act=goods_class',{});

//Category二级分类
var getSecondCate = (gc_id) => fetch('GET',apiUrl+'/index.php?act=goods_class&op=get_child_all&gc_id='+gc_id,{});

//todayDeal
var getTodayDeal = (data) => fetch('GET',apiUrl+'/index.php?act=promotion&page='+data.page+'&curpage='+data.curpage,{});

export {
	getIndexData,
  	getFlashData,
	getGoodsData,
	getGoodsComment,
    getGoodsHtml,
    getLifeStyle,
    getFirstCate,
    getSecondCate,
    getTodayDeal,
}
