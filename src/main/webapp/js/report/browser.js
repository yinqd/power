
/*
* 智能机浏览器版本信息:
*
*/
        var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {//移动终端浏览器版本信息 
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                }; 
            }(), 
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        } ;
        //document.writeln("语言版本: "+browser.language);
        //document.writeln(" 是否为移动终端: "+browser.versions.mobile);
        //document.writeln(" ios终端: "+browser.versions.ios);
        //document.writeln(" android终端: "+browser.versions.android);
        //document.writeln(" 是否为iPhone: "+browser.versions.iPhone);
        //document.writeln(" 是否iPad: "+browser.versions.iPad);
        //document.writeln(navigator.userAgent);

        /*
        alert($(window).height()); //浏览器时下窗口可视区域高度
        alert($(document).height()); //浏览器时下窗口文档的高度
        alert($(document.body).height());//浏览器时下窗口文档body的高度
        alert($(document.body).outerHeight(true));//浏览器时下窗口文档body的总高度 包括border padding margin
        alert($(window).width()); //浏览器时下窗口可视区域宽度
        alert($(document).width());//浏览器时下窗口文档对于象宽度
        alert($(document.body).width());//浏览器时下窗口文档body的高度
        alert($(document.body).outerWidth(true));//浏览器时下窗口文档body的总宽度 包括border padding margin
        alert($(document).scrollTop()); //获取滚动条到顶部的垂直高度
        alert($(document).scrollLeft()); //获取滚动条到左边的垂直宽度
*/
      