import fetch from '../utils/fetch'

//获取首页数据
var getIndexData = () => fetch('GET', '/index.php?act=index_new&op=index', {});
//获取秒杀商品数据
var getFlashData = () => fetch('GET','/index.php?act=flash_goods',{});
//获取goods数据
var getGoodsData = (goodsid) => fetch('GET','/index.php?act=goods&op=new_goods_detail&goods_id='+goodsid,{});


export {
	getIndexData,
  getFlashData,
	getGoodsData,
}
