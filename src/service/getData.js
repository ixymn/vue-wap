import fetch from '../utils/fetch'
import {
	apiUrl,apiUrlnew
} from '../config/env'
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

export {
	getIndexData,
  getFlashData,
	getGoodsData,
	getGoodsComment,
    getGoodsHtml,
}
