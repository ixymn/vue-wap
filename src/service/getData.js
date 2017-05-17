import fetch from '../utils/fetch'


var getIndexData = () => fetch('GET', '/index.php?act=index_new&op=index', {});



export {getIndexData}
