// 关闭弹出框
function closeModal($el) {
  $($el).parents('.kilimodal').hide();
}
//打开弹出框
function openModal($el) {
  $($el).show();
}
function initH5() {
  var iScale = 1;
  iScale = iScale / window.devicePixelRatio;
  $('head').append('<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=' + iScale + ',minimum-scale=' + iScale + ',maximum-scale=' + iScale + '">');
  var iWidth = document.documentElement.clientWidth;
  $('html').css('font-size', iWidth / 16)
}

//dialog
var kiliDialog = function () {
  var app = {
    init: function () {
      $('body').on('click', '.kili_dialog .dialog_close', this.closeDialog);
      this.initHTML();
    },
    initHTML: function () {
      if ($('body').find('.kili_dialog').length > 0) {
        return;
      }
      var html = [
        '<div class="kili_dialog">',
        '<div class="masker_wp"></div>',
        '<div class="dialog_wp">',
        '<div class="dialog_header">',
        '<h2 class="dialog_title">Notice</h2>',
        '<i class="dialog_close"></i>',
        '</div>',
        '<div class="dialog_body">',
        '<p class="content"></p>',
        '</div>',
        '<div class="dialog_footer">',
        '<a href="javascript:;">Buy the item at the normal price</a>',
        '</div>',
        '</div>',
        '</div>'
      ];
      $('body').append(html.join(''));
    },
    /**
     * 打开dialog
     * @param str    弹出框内容
     * @param href   弹出框底部链接
     */
    openDialog: function (str, href) {
      $('.kili_dialog .dialog_body .content').html(str);
      $('.kili_dialog .dialog_footer a').attr('href', href || 'javascript:;');
      $('.kili_dialog').show();
    },
    closeDialog: function () {
      $('.kili_dialog').hide();
    }
  };
  app.init();
  return app;
};


var lipapyPaymentModal = {};
var paymentModal = {
  init: function () {

  },
  initHTML: function () {

  },
  openDialog: function () {

  },
  closeDialog: function () {

  }
};


function getQueryString(e) {
  var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
  var a = window.location.search.substr(1).match(t);
  if (a != null) return a[2];
  return ""
}
function addCookie(e, t, a) {
  var n = e + "=" + escape(t) + "; path=/";
  if (a > 0) {
    var r = new Date;
    r.setTime(r.getTime() + a * 3600 * 1e3);
    n = n + ";expires=" + r.toGMTString()
  }
  document.cookie = n
}
function getCookie(e) {
  var t = document.cookie;
  var a = t.split("; ");
  for (var n = 0; n < a.length; n++) {
    var r = a[n].split("=");
    if (r[0] == e) return unescape(r[1])
  }
  return null
}
function delCookie(e) {
  var t = new Date;
  t.setTime(t.getTime() - 1);
  var a = getCookie(e);
  if (a != null) document.cookie = e + "=" + a + "; path=/;expires=" + t.toGMTString()
}
function checkLogin(e) {
  if (e == 0) {
    location.href = WapSiteUrl + "/html/member/login.html";
    return false
  } else {
    return true
  }
}
function contains(e, t) {
  var a = e.length;
  while (a--) {
    if (e[a] === t) {
      return true
    }
  }
  return false
}
function buildUrl(e, t) {
  switch (e) {
    case "keyword":
      return WapSiteUrl + "/html/product_list.html?keyword=" + encodeURIComponent(t);
    case "special":
      return WapSiteUrl + "/special.html?special_id=" + t;
    case "goods":
      return WapSiteUrl + "/html/product_detail.html?goods_id=" + t;
    case "url":
      return t
  }
  return WapSiteUrl
}
function errorTipsShow(e) {
  $(".error-tips").html(e)
  $(".error-tips").show();
  setTimeout(function () {
    errorTipsHide()
  }, 2000)
}
function errorTipsHide() {
  $(".error-tips").html("").hide()
}
function writeClear(e) {
  if (e.val().length > 0) {
    e.parent().addClass("write")
  } else {
    e.parent().removeClass("write")
  }
  btnCheck(e.parents("form"))
}

function writeClose(e) {
  if (e.val().length > 0) {
    e.parent().addClass("write")
  } else {
    e.parent().removeClass("write")
  }
  buttonCheck(e.parents("form"))
}
function buttonCheck(e) {
  var t = true;
  e.find(".inp").each(function (i, idx) {
    if ($(this).hasClass("no-follow")) {
      return
    }
    if ($(this).val().length == 0) {
      if ($(idx).attr('name') == 'member_invitation_code')return true;
      t = false
    }
  });
  if (t) {
    e.find(".btn").parent().addClass("ok")
  } else {
    e.find(".btn").parent().removeClass("ok")
  }
}

function btnCheck(e) {
  var t = true;
  e.find("input").each(function (i, idx) {
    if ($(this).hasClass("no-follow")) {
      return
    }
    if ($(this).val().length == 0) {
      // if ($(idx).attr('name') == 'member_invitation_code')return true;
      t = false
    }
  });
  if (t) {
    e.find(".btn").parent().addClass("ok")
  } else {
    e.find(".btn").parent().removeClass("ok")
  }
}
function getSearchName() {
  var e = decodeURIComponent(getQueryString("keyword"));
  if (e == "") {
    if (getCookie("deft_key_value") == null) {
      $.getJSON(ApiUrl + "/index.php?act=index&op=search_hot_info", function (e) {
        var t = e.datas.hot_info;
        if (typeof t.name != "undefined") {
          $("#keyword").attr("placeholder", t.name);
          $("#keyword").html(t.name);
          addCookie("deft_key_name", t.name, 1);
          addCookie("deft_key_value", t.value, 1)
        } else {
          addCookie("deft_key_name", "", 1);
          addCookie("deft_key_value", "", 1)
        }
      })
    } else {
      $("#keyword").attr("placeholder", getCookie("deft_key_name"));
      $("#keyword").html(getCookie("deft_key_name"))
    }
  }
}
function getFreeVoucher(e, func) {
  var t = getCookie("key");
  if (!t) {
    checkLogin(0);
    return
  }
  $.ajax({
    type: "post",
    url: ApiUrl + "/index.php?act=member_voucher&op=voucher_exchange",
    data: {
      vid: e,
      key: t
    },
    dataType: "json",
    success: function (e) {
      checkLogin(e.login);
      var t = "Get Vouchers Successful!";
      var a = "green";
      if (e.datas.error) {
        t = "failed:" + e.datas.error;
        a = "red"
      }
      $.sDialog({
        skin: a,
        content: t,
        okBtn: false,
        cancelBtn: false
      })
      if (typeof(func) == 'function') eval('func(e)');
    }
  })
}
function updateCookieCart(e) {
  var t = decodeURIComponent(getCookie("goods_cart"));
  if (t) {
    $.ajax({
      type: "post",
      url: ApiUrl + "/index.php?act=member_cart&op=cart_batchadd",
      data: {
        key: e,
        cartlist: t
      },
      dataType: "json",
      async: false,
      success: function (a) {
        return false;
      }
    });
    delCookie("goods_cart")
  }
}
function getCartCount(e, t) {
  var a = 0;
  delCookie("cart_count")
  if (getCookie("key") !== null && getCookie("cart_count") === null) {
    var e = getCookie("key");
    $.ajax({
      type: "post",
      url: ApiUrl + "/index.php?act=member_cart&op=cart_count",
      data: {
        key: e
      },
      dataType: "json",
      async: false,
      success: function (e) {
        if (typeof e.datas.cart_count != "undefined") {
          addCookie("cart_count", e.datas.cart_count, t);
          a = e.datas.cart_count
        }
      }
    })
  } else {
    a = getCookie("cart_count")
  }
  if (a > 0 && $(".nctouch-nav-menu").has(".cart").length > 0) {
    $(".nctouch-nav-menu").has(".cart").find(".cart").parents("li").find("sup").show();
    $("#header-nav").find("sup").show()
  }
}
function getChatCount() {
  if ($("#header").find(".message").length > 0) {
    var e = getCookie("key");
    if (e !== null) {
      $.getJSON(ApiUrl + "/index.php?act=member_chat&op=get_msg_count", {
          key: e
        },
        function (e) {
          if (e.datas > 0) {
            $("#header").find(".message").parent().find("sup").show();
            $("#header-nav").find("sup").show()
          }
        })
    }
    $("#header").find(".message").parent().click(function () {
      window.location.href = WapSiteUrl + "/html/member/chat_list.html"
    })
  }
}

//
$(function () {
  $(".input-del").click(function () {
    $(this).parent().removeClass("write").find("input").val("");
    btnCheck($(this).parents("form"));
  });


  // Online Payment 选择支付方式
  $("body").on("click", "label", function () {
    if ($(this).has('input[type="radio"]').length > 0) {
      $(this).addClass("checked").siblings().removeAttr("class").find('input[type="radio"]').removeAttr("checked")
    } else if ($(this).has('[type="checkbox"]')) {
      if ($(this).find('input[type="checkbox"]').prop("checked")) {
        $(this).addClass("checked")
      } else {
        $(this).removeClass("checked")
      }
    }
  });


  if ($("body").hasClass("scroller-body")) {
    new IScroll(".scroller-body", {
      mouseWheel: true,
      click: true
    })
  }
  $("#header").on("click", "#header-nav", function () {
    if ($(".nctouch-nav-layout").hasClass("show")) {
      $(".nctouch-nav-layout").removeClass("show")
    } else {
      $(".nctouch-nav-layout").addClass("show")
    }
  });
  $("#header").on("click", ".nctouch-nav-layout", function () {
    $(".nctouch-nav-layout").removeClass("show")
  });
  $(document).scroll(function () {
    $(".nctouch-nav-layout").removeClass("show")
  });
  //getSearchName();
  getCartCount();
  getChatCount();
  $(document).scroll(function () {
    e();
  });
  $(".fix-block-r,footer").on("click", ".gotop", function () {
    btn = $(this)[0];
    this.timer = setInterval(function () {
      $(window).scrollTop(Math.floor($(window).scrollTop() * .8));
      if ($(window).scrollTop() == 0) clearInterval(btn.timer, e)
    }, 10)
  });
  function e() {
    $(window).scrollTop() == 0 ? $("#goTopBtn").addClass("hide") : $("#goTopBtn").removeClass("hide")
    $(window).scrollTop() == 0 ? $("#goTopBf").addClass("hide") : $("#goTopBf").removeClass("hide")
  }
});

//
(function ($) {
  $.extend($, {
    scrollTransparent: function (e) {
      var t = {
        valve: "#header",
        scrollHeight: 50
      };
      var e = $.extend({}, t, e);

      function a() {
        $(window).scroll(function () {
          if ($(window).scrollTop() <= e.scrollHeight) {
            $(e.valve).addClass("transparent").removeClass("posf")
          } else {
            $(e.valve).addClass("posf").removeClass("transparent")
          }
        })
      }

      return this.each(function () {
        a()
      })()
    },
    areaSelected: function (options) {
      var defaults = {
        success: function (e) {
        }
      };
      var options = $.extend({},
        defaults, options);
      var ASID = 0;
      var ASID_1 = 0;
      var ASID_2 = 0;
      var ASID_3 = 0;
      var ASPARENT = "";
      var ASNAME = "";
      var ASINFO = "";
      var ASDEEP = 1;
      var ASINIT = true;
      var ASDOOR = 0;

      function _init() {
        if ($("#areaSelected").length > 0) {
          $("#areaSelected").remove()
        }
        var e = '<div id="areaSelected">' + '<div class="nctouch-full-mask left">' + '<div class="nctouch-full-mask-bg"></div>' + '<div class="nctouch-full-mask-block">' + '<div class="header">' + '<div class="header-wrap">' + '<div class="header-l"><a href="javascript:void(0);"><i class="back"></i></a></div>' + '<div class="header-title">' + "<h1>State/Region</h1>" + "</div>" + '<div class="header-r"><a href="javascript:void(0);"><i class="close"></i></a></div>' + "</div>" + "</div>" + '<div class="nctouch-main-layout">' + '<div class="nctouch-single-nav">' + '<ul id="filtrate_ul" class="area">' + '<li class="selected"><a href="javascript:void(0);">State/Region</a></li>' + '<li><a href="javascript:void(0);" >City/Town</a></li>' + "</ul>" + "</div>" + '<div class="nctouch-main-layout-a"><ul class="nctouch-default-list"></ul></div>' + "</div>" + "</div>" + "</div>" + "</div>";
        $("body").append(e);
        _getAreaList();
        _bindEvent();
        _close()
      }

      function _getAreaList() {
        $.ajax({
          type: "get",
          url: ApiUrl + "/index.php?act=area&op=area_list",
          data: {
            area_id: ASID
          },
          dataType: "json",
          async: false,
          success: function (e) {
            if (e.datas.area_list.length == 0) {
              _finish();
              return false
            }
            if (ASINIT) {
              ASINIT = false
            } else {
              ASDEEP++
            }
            $("#areaSelected").find("#filtrate_ul").find("li").eq(ASDEEP - 1).addClass("selected").siblings().removeClass("selected");
            checkLogin(e.login);
            var t = e.datas;
            var a = "";
            for (var n = 0; n < t.area_list.length; n++) {
              a += '<li><a href="javascript:void(0);" data-id="' + t.area_list[n].area_id + '" data-name="' + t.area_list[n].area_name + '"  data-door="' + t.area_list[n].area_door + '" data-parent-id="' + t.area_list[n].area_parent_id + '"><h4>' + t.area_list[n].area_name + '</h4></a></li>'
            }
            $("#areaSelected").find(".nctouch-default-list").html(a);
            if (typeof myScrollArea == "undefined") {
              if (typeof IScroll == "undefined") {
                $.ajax({
                  url: WapSiteUrl + "/js/iscroll.js",
                  dataType: "script",
                  async: false
                })
              }
              myScrollArea = new IScroll("#areaSelected .nctouch-main-layout-a", {
                mouseWheel: true,
                click: true
              })
            } else {
              myScrollArea.refresh()
            }
          }
        });
        return false
      }

      function _bindEvent() {
        $("#areaSelected").find(".nctouch-default-list").off("click", "li > a");
        $("#areaSelected").find(".nctouch-default-list").on("click", "li > a", function () {
          ASID = $(this).attr("data-id");
          eval("ASID_" + ASDEEP + "=$(this).attr('data-id')");
          ASDOOR = $(this).attr("data-door");
          ASNAME = $(this).attr("data-name");
          ASPARENT = $(this).attr("data-parent-id");
          ASINFO += ASNAME + " ";
          var _li = $("#areaSelected").find("#filtrate_ul").find("li").eq(ASDEEP);
          _li.prev().find("a").attr({"data-id": ASID, "data-name": ASNAME}).html(ASNAME);
          if (ASDEEP == 3) {
            _finish();
            return false
          }
          _getAreaList()
        });
        $("#areaSelected").find("#filtrate_ul").off("click", "li > a");
        $("#areaSelected").find("#filtrate_ul").on("click", "li > a",
          function () {
            if ($(this).parent().index() >= $("#areaSelected").find("#filtrate_ul").find(".selected").index()) {
              return false
            }
            ASID = $(this).parent().prev().find("a").attr("data-id");
            ASNAME = $(this).parent().prev().find("a").attr("data-name");
            ASDOOR = $(this).parent().prev().find("a").attr("data-door");
            ASPARENT = $(this).parent().prev().find("a").attr("data-parent-id");
            ASDEEP = $(this).parent().index();
            ASINFO = "";
            for (var e = 0; e < $("#areaSelected").find("#filtrate_ul").find("a").length; e++) {
              if (e < ASDEEP) {
                ASINFO += $("#areaSelected").find("#filtrate_ul").find("a").eq(e).attr("data-name") + " "
              } else {
                var t = "";
                switch (e) {
                  case 0:
                    t = "Area";
                    break;
                  case 1:
                    t = "City";
                    break;
                  case 2:
                    t = "City";
                    break
                }
                $("#areaSelected").find("#filtrate_ul").find("a").eq(e).html(t)
              }
            }
            _getAreaList()
          })
      }

      function _finish() {
        var e = {
          area_id: ASID,
          area_id_1: ASID_1,
          area_id_2: ASID_2,
          area_id_3: ASID_3,
          area_name: ASNAME,
          area_info: ASINFO,
          area_door: ASDOOR,
          area_parent: ASPARENT,
        };
        options.success.call("success", e);
        if (!ASINIT) {
          $("#areaSelected").find(".nctouch-full-mask").addClass("right").removeClass("left")
        }
        return false
      }

      function _close() {
        $("#areaSelected").find(".header-l").off("click", "a");
        $("#areaSelected").find(".header-l").on("click", "a",
          function () {
            $("#areaSelected").find(".nctouch-full-mask").addClass("right").removeClass("left")
          });
        return false
      }

      return this.each(function () {
        return _init()
      })()
    },
    animationLeft: function (e) {
      var t = {
        valve: ".animation-left",
        wrapper: ".nctouch-full-mask",
        scroll: ""
      };
      var e = $.extend({}, t, e);

      function a() {
        $(e.valve).click(function () {
          $(e.wrapper).removeClass("hide").removeClass("right").addClass("left");
          if (e.scroll != "") {
            if (typeof myScrollAnimationLeft == "undefined") {
              if (typeof IScroll == "undefined") {
                $.ajax({
                  url: WapSiteUrl + "/js/iscroll.js",
                  dataType: "script",
                  async: false
                })
              }
              myScrollAnimationLeft = new IScroll(e.scroll, {
                mouseWheel: true,
                click: true
              })
            } else {
              myScrollAnimationLeft.refresh()
            }
          }
        });
        $(e.wrapper).on("click", ".header-l > a", function () {
          $(e.wrapper).addClass("right").removeClass("left")
        })
      }

      return this.each(function () {
        a()
      })()
    },
    animationUp: function (e) {
      var t = {
        valve: ".animation-up",
        wrapper: ".nctouch-bottom-mask",
        scroll: ".nctouch-bottom-mask-rolling",
        start: function () {
        },
        close: function () {
        }
      };
      var e = $.extend({}, t, e);

      function a() {
        e.start.call("start");
        $(e.wrapper).removeClass("down").addClass("up");
        if (e.scroll != "") {
          if (typeof myScrollAnimationUp == "undefined") {
            if (typeof IScroll == "undefined") {
              $.ajax({
                url: WapSiteUrl + "/js/iscroll.js",
                dataType: "script",
                async: false
              })
            }
            myScrollAnimationUp = new IScroll(e.scroll, {
              mouseWheel: true,
              click: true
            })
          } else {
            myScrollAnimationUp.refresh()
          }
        }
      }

      return this.each(function () {
        if (e.valve != "") {
          $(e.valve).on("click",
            function () {
              a()
            })
        } else {
          a()
        }
        $(e.wrapper).on("click", ".nctouch-bottom-mask-bg,.nctouch-bottom-mask-close", function () {
          $('.nctouch-inp-con').find('.pay-sel label').removeClass('checked');
          $(e.wrapper).addClass("down").removeClass("up");
          e.close.call("close")
        })
      })()
    }
  })
})(Zepto);

//
$.fn.ajaxUploadImage = function (e) {
  var t = {
    url: "",
    data: {},
    start: function () {
    },
    success: function () {
    }
  };
  var e = $.extend({}, t, e);
  var a;

  function n() {
    if (a === null || a === undefined) {
      alert("please select upload file！");
      return false
    }
    return true
  }

  return this.each(function () {
    $(this).on("change", function () {
      var t = $(this);
      e.start.call("start", t);
      a = t.prop("files")[0];
      if (!n) return false;
      try {
        var r = new XMLHttpRequest;
        r.open("post", e.url, true);
        r.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        r.onreadystatechange = function () {
          if (r.readyState == 4) {
            returnDate = $.parseJSON(r.responseText);
            e.success.call("success", t, returnDate)
          }
        };
        var i = new FormData;
        for (k in e.data) {
          i.append(k, e.data[k])
        }
        i.append(t.attr("name"), a);
        result = r.send(i)
      } catch (o) {
      }
    })
  })
};


function loadSeccode() {
  $("#codekey").val("");
  $.ajax({
    type: "get",
    url: ApiUrl + "/index.php?act=seccode&op=makecodekey",
    async: false,
    dataType: "jsonp",
    success: function (e) {
      $("#codekey").val(e.datas.codekey);
    }
  });
  $("#codeimage").attr("src", ApiUrl + "/index.php?act=seccode&op=makecode&k=" + $("#codekey").val() + "&t=" + Math.random())
}

/*function getGoogle() {
 $("#codekey").val("");
 $.ajax({
 type: "get",
 url: ApiUrl + "/index.php?act=index&op=getGoogle",
 async: false,
 dataType: "jsonp",
 success: function(e) {
 $(document.body).append(e.datas);
 }
 });
 }*/

function favoriteStore(e) {
  var t = getCookie("key");
  if (!t) {
    checkLogin(0);
    return
  }
  if (e <= 0) {
    $.sDialog({
      skin: "green",
      content: "error",
      okBtn: false,
      cancelBtn: false
    });
    return false
  }
  var a = false;
  $.ajax({
    type: "post",
    url: ApiUrl + "/index.php?act=member_favorites_store&op=favorites_add",
    data: {
      key: t,
      store_id: e
    },
    dataType: "json",
    async: false,
    success: function (e) {
      if (e.code == 200) {
        a = true
      } else {
        $.sDialog({
          skin: "red",
          content: e.datas.error,
          okBtn: false,
          cancelBtn: false
        })
      }
    }
  });
  return a
}

function dropFavoriteStore(e) {
  var t = getCookie("key");
  if (!t) {
    checkLogin(0);
    return
  }
  if (e <= 0) {
    $.sDialog({
      skin: "green",
      content: "error",
      okBtn: false,
      cancelBtn: false
    });
    return false
  }
  var a = false;
  $.ajax({
    type: "post",
    url: ApiUrl + "/index.php?act=member_favorites_store&op=favorites_del",
    data: {
      key: t,
      store_id: e
    },
    dataType: "json",
    async: false,
    success: function (e) {
      if (e.code == 200) {
        a = true
      } else {
        $.sDialog({
          skin: "red",
          content: e.datas.error,
          okBtn: false,
          cancelBtn: false
        })
      }
    }
  });
  return a
}

function favoriteGoods(e) {
  var t = getCookie("key");
  if (!t) {
    checkLogin(0);
    return
  }
  if (e <= 0) {
    $.sDialog({
      skin: "green",
      content: "error",
      okBtn: false,
      cancelBtn: false
    });
    return false
  }
  var a = false;
  $.ajax({
    type: "post",
    url: ApiUrl + "/index.php?act=member_favorites&op=favorites_add",
    data: {
      key: t,
      goods_id: e
    },
    dataType: "json",
    async: false,
    success: function (e) {
      if (e.code == 200) {
        a = true
      } else {
        $.sDialog({
          skin: "red",
          content: e.datas.error,
          okBtn: false,
          cancelBtn: false
        })
      }
    }
  });
  return a
}

function dropFavoriteGoods(e) {
  var t = getCookie("key");
  if (!t) {
    checkLogin(0);
    return
  }
  if (e <= 0) {
    $.sDialog({
      skin: "green",
      content: "error",
      okBtn: false,
      cancelBtn: false
    });
    return false
  }
  var a = false;
  $.ajax({
    type: "post",
    url: ApiUrl + "/index.php?act=member_favorites&op=favorites_del",
    data: {
      key: t,
      fav_id: e
    },
    dataType: "json",
    async: false,
    success: function (e) {
      if (e.code == 200) {
        a = true
      } else {
        $.sDialog({
          skin: "red",
          content: e.datas.error,
          okBtn: false,
          cancelBtn: false
        })
      }
    }
  });
  return a
}
function loadCss(e) {
  var t = document.createElement("link");
  t.setAttribute("type", "text/css");
  t.setAttribute("href", e);
  t.setAttribute("href", e);
  t.setAttribute("rel", "stylesheet");
  css_id = document.getElementById("auto_css_id");
  if (css_id) {
    document.getElementsByTagName("head")[0].removeChild(css_id)
  }
  document.getElementsByTagName("head")[0].appendChild(t)
}

function loadJs(e) {
  var t = document.createElement("script");
  t.setAttribute("type", "text/javascript");
  t.setAttribute("src", e);
  t.setAttribute("id", "auto_script_id");
  script_id = document.getElementById("auto_script_id");
  if (script_id) {
    document.getElementsByTagName("head")[0].removeChild(script_id)
  }
  document.getElementsByTagName("head")[0].appendChild(t)
}

function android_click(action,id){
  if(window.android != undefined ){
    switch (action) {
      case "goodsDetail":
        action = "goods";
        break;
      case "buy_voucher":
        action = "buyVoucher";
        break;
      case "userCenter":
        action = "go2usercenter";
        break;
      case "verifyPhone":
        action = "verify_phone";
        break;
      case "orderList":
        action = "go2orderlist"
        break;
    }
    window.android.mb_special_item_click(action,id);
  }

  if(window.WebViewJavascriptBridge){
    switch (action) {
      case "goods":
        action = "goodsDetail";
        break;
      case "buyVoucher":
        action = "buy_voucher";
        break;
      case "go2usercenter":
        action = "userCenter";
        break;
      case "verify_phone":
        action = "verifyPhone";
        break;
      case "go2orderlist":
        action = "orderList"
        break;
    }
    window.WebViewJavascriptBridge.callHandler(
    'submitFromWeb',
    {
        "action": action, //login.search,goodsDetail,StoreDetail,buyVoucher,orderList,buyMore,verifyPhone,html5,userCenter
        "ref_id": id //goods_id,store_id，cate_id
    });
  }
}//end of android click
// remove head nav in android app
function removeHeadForAndroid(){
  if(isInAndroid()){
    $("#header").next().css("margin-top","0");
    $("#header").remove();
  }
}
removeHeadForAndroid();
// End -- remove head nav in android app

// check page in official Android App
function isInAndroid(){
  var ua = navigator.userAgent;
  if(ua.indexOf("kilimall,android")>1){
    return true;
  }
  return false;
}

/* 增加各个广告联盟的统计代码 */
var Ad = {
  afId: getQueryString("kilimall_af_id") || getCookie("af_id"),
  refId: getQueryString("refid") || getCookie("ref_id"),
  utmSource: getQueryString("source") || getQueryString("utm_source") || getCookie("utm_source"),
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
    addCookie("af_id", this.afId, 30 * 24);
    addCookie("ref_id", this.refId, 30 * 24);
    addCookie("utm_source", this.utmSource, 30 * 24);
  },//存储广告信息
  AdRefDump: function () {
    var afcookie = getCookie("af_id");
    var refcookie = getCookie("ref_id");
    var utmcookie = getCookie("utm_source");
    if (this.afId != afcookie) {
      delCookie("af_id");
    }
    if (this.refId != refcookie) {
      delCookie("ref_id");
    }
    if (this.utmSource != utmcookie) {
      delCookie("utm_source");
    }
    //delCookie("af_id");
    //delCookie("utm_source");
    delCookie("adhtml");
  }//删除广告信息
}//广告代码全局变量入口
//Opera mini localStorage sessionStorage polyfill
if (typeof window.localStorage == 'undefined' || typeof window.sessionStorage == 'undefined') (function () {
  var Storage = function (type) {
    function createCookie(name, value, days) {
      var date, expires;
      if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      } else {
        expires = "";
      }
      document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
      var nameEQ = name + "=",
        ca = document.cookie.split(';'),
        i, c;
      for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
          return c.substring(nameEQ.length, c.length).replace(/'/g, '"');
        }
      }
      return null;
    }

    function setData(data) {
      data = JSON.stringify(data).replace(/"/g, "'");
      if (type == 'session') {
        window.name = data;
      } else {
        createCookie('localStorage', data, 365);
      }
    }

    function clearData() {
      if (type == 'session') {
        window.name = '';
      } else {
        createCookie('localStorage', '', 365);
      }
    }

    function getData() {
      var data = type == 'session' ? window.name : readCookie('localStorage');
      return data ? JSON.parse(data) : {};
    }

    // initialise if there's already data
    var data = getData();
    return {
      length: 0,
      clear: function () {
        data = {};
        this.length = 0;
        clearData();
      },
      getItem: function (key) {
        return data[key] === undefined ? null : data[key];
      },
      key: function (i) {
        // not perfect, but works
        var ctr = 0;
        for (var k in data) {
          if (ctr == i) return k;
          else ctr++;
        }
        return null;
      },
      removeItem: function (key) {
        delete data[key];
        this.length--;
        setData(data);
      },
      setItem: function (key, value) {
        data[key] = value + ''; // forces the value to a string
        this.length++;
        setData(data);
      }
    };
  };
  if (typeof window.localStorage == 'undefined') window.localStorage = new Storage('local');
  if (typeof window.sessionStorage == 'undefined') window.sessionStorage = new Storage('session');
})();// end Opera mini localStorage sessionStorage polyfill
