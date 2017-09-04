
(function(i,s,o,g,r,a,m){
    i['GoogleAnalyticsObject']=r;
    i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();
        a=s.createElement(o),m=s.getElementsByTagName(o)[0];
        a.async=1;
        a.src=g;
        m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

var siteDomain = window.location.href;
if(siteDomain.indexOf('kenya')>0){
    console.log('kenya')
    ga('create', 'UA-52665963-1', 'auto');
}else if(siteDomain.indexOf('nigeria')>0){
    ga('create', 'UA-52665963-11', 'auto');
    console.log('nigeria')
}else if(siteDomain.indexOf('uganda')>0){
    ga('create', 'UA-52665963-6', 'auto');
    console.log('uganda')
}else{
    console.log('test')
    ga('create', 'UA-52665963-1', 'auto');
}
ga('require', 'ec');
ga('require', 'displayfeatures');
ga('require', 'linkid');

var F=JSON.parse(common.getCookie("GA"));
common.delCookie("GA");

for(var it=0;it<F.idArray.length;it++){
    ga('ec:addProduct', {
        'id': F.idArray[it],
        'name': F.nameArray[it],
        'category': F.categoryArray[it],
        'brand': F.brandArray[it],
        'price': F.priceArray[it].replace(",",""),
        'quantity' : F.quantArr[it],
        'variant' : F.specArray[it],
    });
}
for(var ti2=0;ti2<F.sn_Array.length;ti2++){
    var strArr = F.sn_Array[ti2].split("|");
    ga('ec:setAction', 'purchase', {
        'id': strArr[0],
        'revenue':strArr[1],
        'tax':'',
        'affiliation': strArr[2],
        'shipping':strArr[3]
    });
    ga('send', 'event', 'Order', 'sendOrder', strArr[0])
}
if(F.orderCount==0){
  var metricValue = '1';
  ga('set','metric2',metricValue);
  ga('send','pageview');
}
