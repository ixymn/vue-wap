import fetch from '../utils/fetch'

//获取首页数据
var getIndexData = () => fetch('GET', '/index.php?act=index_new&op=index', {});



export {getIndexData}
