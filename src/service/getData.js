import fetch from '../utils/fetch'

//获取首页数据
var getIndexData = () => fetch('GET', '/index.php?act=index_new&op=index', {});
//获取秒杀商品数据
var getFlashData = () => fetch('GET','/index.php?act=flash_goods',{});
//获取goods数据
var getGoodsData = (goodsid) => fetch('GET','/index.php?act=goods&op=new_goods_detail&goods_id='+goodsid,{});
//获取goods评论
var getGoodsComment = (goodsid,curpage) => fetch('GET','/index.php?act=goods&op=goods_evaluate&goods_id='+goodsid+"&curpage="+curpage+"&page=10");

export {
	getIndexData,
  getFlashData,
	getGoodsData,
	getGoodsComment,
}
