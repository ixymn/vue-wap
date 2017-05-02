<?php defined('InShopNC') or exit('Access Invalid!');?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no">
<title>Offers</title>
<link rel="stylesheet" type="text/css" href="<?php echo WAP_SITE_URL; ?>/css/base.css">
<link rel="stylesheet" type="text/css" href="<?php echo WAP_SITE_URL; ?>/css/index.css">
<style media="screen">
.goods-list li:nth-child(even) {
  margin-left: -1px;
}
</style>
</head>
<body>
<div class="fixed-Width" id="main-container">
<?php
foreach ((array) $output['list'] as $v) {
    foreach ($v as $kk => $vv) {
        require 'mb_special_item.module_' . $kk . '.php';
        break;
    }

}
?>
</div>
<script type="text/javascript" src="<?php echo MOBILE_RESOURCE_SITE_URL; ?>/js/zepto.min.js" charset="utf-8"></script>
<script type="text/javascript" src="<?php echo MOBILE_RESOURCE_SITE_URL; ?>/js/swipe.js" charset="utf-8"></script>
<script type="text/javascript" src="<?php echo WAP_SITE_URL; ?>/js/config.js" charset="utf-8"></script>
<script type="text/javascript" src="<?php echo WAP_SITE_URL; ?>/js/common.js" charset="utf-8"></script>
<?php echo htmlspecialchars_decode($output['special']['special_extend']); ?>
<script type="text/javascript">
$(function() {
    $('.adv_list').each(function() {
        if ($(this).find('.item').length < 2) return;
        Swipe(this, {
            startSlide: 2,
            speed: 400,
            auto: 3000,
            continuous: true,
            disableScroll: false,
            stopPropagation: false,
            callback: function(index, elem) {},
            transitionEnd: function(index, elem) {}
        });
    });
	$('[nctype="btn_item"]').on('click', function() {
		var type = $(this).attr('data-type');
		var data = $(this).attr('data-data');
    if(isInAndroid()) {
        android_click(type, data);
        return;
    }
	});
});

    $(".price_mark").html(App.currency);

    $('.goods-list .goods-pic').each(function(i, j) {
        $(j).height($(j).width());
    });
</script>
</body>
</html>
