/**
* @description 返回 yyyy-MM-dd 格式的日期 
* @example new Date().Format("yyyy-MM-dd")返回今天 || new Date(毫秒数).Format("yyyy-MM-dd") 返回指定日期
* @param fmt {string} 'yyyy-MM-dd'
*/
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

var bkeruyun = {
	/**
	 * @description: 动态添加页脚 
	 * @example: bkeruyun.addFooter();
	 */
    addFooter: function () {
        if ($("#footer").length < 1) {
            $("body").append('<div id="footer" class="footerPs"></div>');
        }
    },
    /**
	 * @description: 隐藏元素 
	 * @example: bkeruyun.hideElement($("#id"));
	 * @param: $objs {jquery object} 
	 */
    hideElement: function ($objs) {
        $objs.hide();
    },
    /**
	 * @description: 显示遮罩层 
	 * @example: bkeruyun.showLayer();
	 */
    showLayer: function () {
        if ($("#layer").lenght > 0) {
            $("#layer").show();
        } else {
            $(document.body).append('<div id="layer"></div>');
            $("#layer").show();
        }
    },
    /**
	 * @description: 隐藏遮罩层 
	 * @example: bkeruyun.hideLayer();
	 */
    hideLayer: function () {
        $("#layer").hide();
    },
    /**
	 * @description: 滚动条效果
	 * @param: $obj {jquery object} 
	 * @example: bkeruyun.rolling($("#nav-fixed"));
	 */
    rolling: function ($obj) {
        var top = 0;
        var h = $obj.outerHeight();
        var titleObj = $(".article-header").eq(0);
        $(document).on('scroll', function () {
            top = $(document).scrollTop();
//			console.log("titleObjtop=="+titleObj.offset().top);
            if (top > h) {
                titleObj.addClass("article-header-fixed");
            } else {
                titleObj.removeClass("article-header-fixed");
            }
        });

    },
    /**
	 * @description: 移除元素 
	 * @example: bkeruyun.removeElement($("#id"),event);
	 * @param: $obj {jquery object} 
	 * @param: e {object}
	 */
    removeElement: function ($obj, e) {
        $obj.remove();
        if (e && e.preventDefault) {
            //阻止默认浏览器动作(W3C)
            e.preventDefault();
        } else {
            //IE中阻止函数器默认动作的方式
            window.event.returnValue = false;
        }

    },
    /**
	 * @description: 单选
	 * @example: bkeruyun.selectOne($(this),$(this).siblings(),'current');
	 * @param: $item     {jquery object} 
	 * @param: $items    {jquery object}
	 * @param: className {string}
	 */
    selectOne: function ($item, $items, className) {
        $items.removeClass(className);
        $item.addClass(className);
    },
    /**
	 * @description: 没有查询到数据时调用,返回一个自定义信息的元素，需要通过append添加到指定位置
	 * @example: var notData = bkeruyun.notQueryData('么有查询到数据，换个条件试试吧！');
	 * @param: msg {string} 自定义信息
	 */
    notQueryData: function (msg) {
        window.scroll(0, 0);//将滚动条设置到顶部
        var notData = '<div class="notSearchContent">' + msg + '</div>';
        return notData;
    },
    /**
	 * @description: 检测浏览器版本 如果是ie8及以下提示信息
	 * @example: bkeruyun.detectionBrowser();
	 */
    detectionBrowser: function () {
        var browserVersion = window.navigator.userAgent.toUpperCase();
        // alert(browserVersion);
        //隐藏提示信息
        //$("#browser-prompt").hide();
        if (browserVersion.indexOf("MSIE") > -1) {
            //如果是ie浏览器检测是否是ie6 ie7 ie8
            if (browserVersion.indexOf("MSIE 6") > -1) {
                //判断提示信息元素是否已经存在
                if ($("#browser-prompt").length < 1) {
                    //不存在 添加
                    $(document.body).append('<div id="browser-prompt"><p class="center">当前浏览器与本网站不兼容<br/>请使用火狐浏览器<br/><a href="http://www.firefox.com.cn/download/" target="_blank">去下载</a></p></div>');
                }
                //显示提示信息
                $("#browser-prompt").show();
                $("#browser-prompt > .cancel").bind("click", function () {
                    $("#browser-prompt").slideUp();
                });
                /*
                 setTimeout(function(){
                 $("#browser-prompt").hide();
                 },10000);
                 */
            }
        }
    },
    /**
	 * @description: 显示隐藏菜单 
	 * @example: bkeruyun.showMenu(this,'.showObj') || bkeruyun.showMenu($("#set-add > li"),$("#set-add > li > ul"))
	 * @param: objs {object} 鼠标移上去的元素
	 * @param: showStr {string} 要显示的元素
	 */
    showMenu: function (objs, showStr) {
        var objs = $(objs);
        //当鼠标移到每一个的时候执行
        objs.each(function () {
            var showObj = $(this).find(showStr);
            var flag = false;
            $(this).mouseover(function () {
                flag = true;
                showObj.fadeIn("fast");
            });
            $(this).mouseout(function () {
                setTimeout(function () {
                    if (flag == false) {
                        showObj.fadeOut("fast");
                    }
                }, 300);

                flag = false;
            });
            showObj.mouseover(function () {
                flag = true;
            });
            showObj.mouseout(function () {
                setTimeout(function () {
                    if (flag == false) {
                        showObj.fadeOut("fast");
                    }
                }, 300);
                flag = false;
            });
        });

    },
    /**
	 * @description: 显示导航
	 * @example: bkeruyun.style.showNav($(".nav > li,.dropdown-submenu"), ".dropdown-menu", "open");
	 * @param: overObjs {object} 鼠标移上去的元素
	 * @param: showObj {object} 要显示的元素
	 * @param: className {string} 样式名
	 */
    //显示导航 鼠标移上去的元素 要显示的元素 要添加样式的元素 样式名
    showNav: function (overObjs, showObj, className) {
        var overObjs = $(overObjs);
        //当鼠标移到每一个的时候执行
        overObjs.each(function () {
            var flag = false;
            var that = $(this);
            var showObj = that.find(showObj);
            that.mouseover(function () {
                flag = true;
                that.addClass(className);
            }).mouseout(function () {
                setTimeout(function () {
                    if (flag == false) {
                        that.removeClass(className);
                    }
                }, 300);

                flag = false;
            });
            showObj.mouseover(function () {
                flag = true;
            }).mouseout(function () {
                setTimeout(function () {
                    if (flag == false) {
                        that.removeClass(className);
                    }
                }, 300);
                flag = false;
            });
        });

    },
    /**
	 * @description: 关闭当前窗口
	 * @example: bkeruyun.closeWindow();
	 */
    closeWindow: function () {
        var browserName = navigator.appName;
        if (browserName == "Netscape") {
            window.open('', '_parent', '');
            window.close();
        }
        else {
            if (browserName == "Microsoft Internet Explorer") {
                window.opener = "whocares";
                window.close();
            }
        }
    },

     //创建菜单
     createMenu: function(data,rootUrl){
    	 var dataLength=data.length;
 	    for(var i=0;i<dataLength;i++){
 	        var dataItem=data[i];
 	        var role=dataItem.role;
 	        var name=dataItem.name;
 	        var url=dataItem.url;
 	        var children=dataItem.children;
 	         var li = $('<li class="nav_group" role="'+role+'"></li>');
 	         if(children && children.length>0){
 	            li.html('<a class="dropdown-toggle '+role+'" href="#"> '+name+' <span class="caret"></span></a>');
 	            if(children.length > 0){ 
 	            	var childrenUl=$('<ul class="dropdown-menu"></ul>');
 		            for(var j=0;j<children.length;j++){
 		                var childrenItem = children[j];
 		                var childrenChildren=childrenItem.children;
 		                 
 		                var grandsonLi=$('<li class="dropdown-submenu"><a href="'+rootUrl+childrenItem.url+'">'+childrenItem.name+'</a>');
 		                childrenUl.append(grandsonLi);
 		               if(childrenChildren &&childrenChildren.length){
 		                    var grandsonUl=$('<ul class="dropdown-menu multi-level"></ul>');
 		                    for(var z=0;z<childrenChildren.length;z++){
 		                        grandsonUl.append($('<li><a href="'+rootUrl+childrenChildren[z].url+'">'+childrenChildren[z].name+'</a></li>'));
 		                    }
 		                    grandsonLi.append(grandsonUl);
 		                    childrenUl.append(grandsonLi);
 		             
 		                }  
 		            }
 		            li.append(childrenUl);
 	            }else{
 	            	li.append('<li class="dropdown-submenu"><a href="'+rootUrl+url+'">'+name+'</a>');
 	            }
 	            $('.head-new-nav').append(li);
 	        }else{
 	        	li.append('<a class="dropdown-toggle '+role+'" href="'+rootUrl+url+'"> '+name+'</a>');
 	        	 $('.head-new-nav').append(li);
 	        }
 	    }
 	   $('.head-new-nav').find("a").each(function(){if(this.href.indexOf("#") > -1){this.href = "javascript:;";}});
     },
    /**
	 * @description: 添加最大高度
	 * @example: bkeruyun.maxHeight();
	 * ? 需要扩张为外部可设置 或通过自定义属性
	 */
    maxHeight: function () {
        $("div[data-max-height]").each(function () {
            var defaultHight = window.innerHeight - $("#header").outerHeight() - $("#footer").outerHeight()-40;
            var maxHeight = $(this).attr("data-max-height") != "" ? $(this).attr("data-max-height") : defaultHight;

            $(this).css({"max-height": maxHeight + 'px', "overflow": "auto"});
        });
    },
    /**
	 * @description: 添加最小高度
	 * @example: bkeruyun.minHeight();
	 * ? 需要扩张为外部可设置 或通过自定义属性
	 */
    minHeight: function () {
        $("div[data-min-height]").each(function () {
            var defaultHight = window.innerHeight - $("#header").outerHeight() - $("#footer").outerHeight()-40;
            var minHeight = $(this).attr("data-min-height") != "" ? $(this).attr("data-min-height") : defaultHight;

            $(this).css({"min-height": minHeight + 'px', "overflow": "auto"});
        });
    },
    /**
	 * @description: ajax 加载中 显示加载状态
	 * @example: bkeruyun.showLoading();
	 */
    showLoading: function () {
        if ($("#loading").length > 0) {
            $("#loading").show();
        }
        else {
            var loading = '<div id="loading"><img src="'+ctxPath+'/themes/style/img/loading.gif" /></div>';
            $(document.body).append(loading);
        }
        bkeruyun.showLayer();
    },
    /**
	 * @description: ajax 加载完成 隐藏加载状态
	 * @example: bkeruyun.hideLoading();
	 */
    hideLoading: function () {
        $("#loading").hide();
        bkeruyun.hideLayer();
    },
    /**
	 * @description: 点击弹出层右上角的X 关闭弹出层
	 * @example: bkeruyun.closePlanPopover();
	 * ? 将弹出框做成独立组件
	 */
    closePlanPopover: function () {
        $(document).delegate(".close", "click", function (e) {
            var popoverObj = $(e.target).closest(".panel-popover");
            if (popoverObj) {
                bkeruyun.hideLayer();
                popoverObj.hide();
                bkeruyun.clearData(popoverObj);
            }
        });
        //关闭弹框 按钮
        $(document).delegate(".btn-shut-down", "click", function (e) {
            var popoverObj = $(e.target).closest(".panel-popover");
            if (popoverObj) {
                bkeruyun.hideLayer();
                popoverObj.hide();
            }
        });
        //关闭弹框 取消按钮
        $(document).delegate(".btn-cancel", "click", function (e) {
            var popoverObj;
            if ($(e.target).closest(".panel-popover").length > 0) {
                popoverObj = $(e.target).closest(".panel-popover");
            } else if ($(e.target).closest(".popover").length > 0) {
                popoverObj = $(e.target).closest(".popover");
            } else {
                return;
            }
            bkeruyun.hideLayer();
            popoverObj.hide();
            bkeruyun.clearData(popoverObj);
        });
    },
    /**
     * @description: 标签切换
     * @example: bkeruyun.tab("#scmBreadCrumbs > li","click",'.panel-group',"data-show","current",function(){step($("#scmBreadCrumbs > li.current").index());});
     * @param: tabs {jq expression}
     * @param: evt  {event}
     * @param: cons {jq expression}
     * @param: a {attribute}
     * @param: className {string} 
     * @param: fn {function}
     */
    tab:function(tabs,evt,cons,a,className,fn){
        $(document).delegate(tabs,evt,function(){
            var showCon = $("#"+$(this).attr(a));
            $(tabs).removeClass(className);
            $(this).addClass(className);
            // $(cons).hide();
            showCon.show().siblings(cons).hide();
            if(fn){
                fn();
            }
        });
        
    },
    /**
     * @description 更多搜索 
     * @param e {object}
     * @param moreObjs {jq object}
     * @param txt1 {string}
     * @param txt2 {string}
     */
    searchMore:function(e,moreObjs,txt1,txt2){
        var txt = $(e).text();
        if (txt == txt1) {
            moreObjs.show();
            $(e).text(txt2);
        }else if(txt == txt2){
            moreObjs.hide();
            $(e).text(txt1);
        }
    },
    /**
     * @description jqGrid冻结列 样式修复 
     * @example bkeruyun.resetFrozenStyle();
     */
    resetFrozenStyle:function(){
        $(".frozen-div").height("auto");
    },
    //form
    /**
	 * @description: 模拟复选框操作 
	 * @example: bkeruyun.checkboxChange(this, 'checkbox-check');
	 * @param: element {object} input 
	 * @param: className {string} 
	 */
    checkboxChange: function (element, className) {
        if (element.checked) {
            $(element).parent().addClass(className);
        } else {
            $(element).parent().removeClass(className);
        }
    },
    /**
	 * @description: 全选操作 当全选checkbox被选中 他下面的checkbox 全部设为选中
	 * @example: bkeruyun.checkboxAll($("#checkAll").get(0), 'name');
	 * @param: e {object} 全选input元素 
	 * @param: nameGroup {string} checkbox name
	 */
    checkAll: function (e, nameGroup) {
        if (e.checked) {
            //alert($("[name='"+ nameGroup+"']:checkbox"));
            $("[name='" + nameGroup + "']:checkbox").not(":disabled").each(function () {
                this.checked = true;
                bkeruyun.checkboxChange(this, 'checkbox-check');
            });
        } else {
            $("[name='" + nameGroup + "']:checkbox").not(":disabled").each(function () {
                this.checked = false;
                bkeruyun.checkboxChange(this, 'checkbox-check');
            });
        }
        bkeruyun.checkboxChange(e, 'checkbox-check');
    },
    /**
	 * @description: 关联全选操作 全选分类下的所有checkbox为选中时 将全选按钮选中
	 * @example: bkeruyun.associatedCheckAll(this, $("#checkAll"));
	 * @param: e {object} 分组中的checkbox 
	 * @param: $obj {jq object} 控制全选的checkbox
	 */
    associatedCheckAll: function (e, $obj) {
        var flag = true;
        var $name = $(e).attr("name");
        bkeruyun.checkboxChange(e, 'checkbox-check');
        $("[name='" + $name + "']:checkbox").not(":disabled").each(function () {
            if (!this.checked) {
                flag = false;
            }
        });
        $obj.get(0).checked = flag;
        bkeruyun.checkboxChange($obj.get(0), 'checkbox-check');
    },
    /**
	 * @description: 页面初始化时 判断全选checkbox是否设为选中 
	 * @example: bkeruyun.isCheckAll( $("#checkAll").get(0), "name");
	 * @param: e {object} 全选的checkbox 
	 * @param: nameGroup {string} checkbox name
	 */
    isCheckAll: function (e, nameGroup) {
        var flag = true;
        $(":checkbox[name='" + nameGroup + "']").not(":disabled").each(function () {
            if (!this.checked) {
                flag = false;
            }
        });
        if (flag) {
            e.checked = true;
            $(e).parent().addClass("checkbox-check");
        }
    },
    /**
	 * @description: 绑定checkbox 的全选、关联全选的操作 
	 * @example: 全选<label class="checkbox"><span></span><input type="checkbox" name="shopsAll" id="shopsAll" data-all="shops"> 全部门店</label>
	 * @example: 关联全选 <label class="checkbox"><span></span><input type="checkbox" name="shops" id="shops-1" data-checked-all="shopsAll"> 三里屯店</label> 
	 * @example: bkeruyun.checkboxEvt();
	 */
    checkboxEvt: function () {
        //关联全选
        $(document).delegate(":checkbox:not([name^='switch'])", "click", function () {
            if ($(this).attr("data-checked-all")) {
                var $obj = $("#" + $(this).attr("data-checked-all"));
                //关联全选操作
                bkeruyun.associatedCheckAll(this, $obj);
            } else {
                //复选框操作
                bkeruyun.checkboxChange(this, 'checkbox-check');
            }

        });
        //全选
        $(document).delegate(":checkbox[data-all]", "change", function () {
            var nameGroup = $(this).attr("data-all");
            //alert(nameGroup);
            bkeruyun.checkAll(this, nameGroup);
        });
    },
    /**
	 * @description: 模拟radio的操作 
	 * @example: bkeruyun.radioChange(this, 'radio-check');
	 * @param: element {object} radio 元素
	 * @param: className {string} radio-check
	 */
    radioChange: function (element, className) {
        if (element.checked) {
            var $name = $(element).attr("name");
            $(":radio[name='" + $name + "']").each(function () {
                $(this).parent().removeClass(className);
            });
            $(element).parent().addClass(className);

        }
    },
    /**
	 * @description: 绑定radio的操作 
	 * @example: 未选中<label class="radio"><span></span><input type="radio" name="radio" id="radio"> 单选一</label>
	 * @example: 选中<label class="radio radio-check"><span></span><input type="radio" name="radio" id="radio" checked> 单选二</label> 
	 * @example: bkeruyun.radioEvt();
	 */
    radioEvt: function () {
        $(document).delegate(".radio > :radio", "change", function () {
            bkeruyun.radioChange(this, 'radio-check');
        });

    },
    /**
	 * @description: 初始化select控件 通过遍历select 创建模拟的select控件 
	 * @example: bkeruyun.selectControl($("select"));
	 * @example: <select><option></option></select> 
	 * @param: $selects {jq object}
	 */
    selectControl: function ($selects) {
        var len = $selects.length;
        for (var i = 0; i < len; i++) {

            var $ele = $selects.eq(i);//当前select
            //判断是否有默认值，如果有，设置选中
            if ($ele.attr("data-value")) {
                $ele.val($ele.attr("data-value"));
            }
            var txt = $ele.find("option:selected").text();//选中项文本
            //alert(txt);
            if (!$ele.is(".select-style")) {//如果不存在这个class
                var optionObjs = $ele.find("option");
                var html = '<div class="select-control">';
                var ul = '<ul>';
                for (var j = 0, oLen = optionObjs.length; j < oLen; j++) {
                    ul += '<li>' + optionObjs.eq(j).text() + '</li>';
                }

                ul += '</ul>';
                html += '<em>' + txt + '</em></div>' + ul;
                $ele.addClass("select-style").wrap('<div class="select-group"></div>').before(html);
            } else {//如果存在class select-style 重置当前选中的文本
                $ele.parent().find(".select-control > em").text(txt);
            }

        }

    },
    /**
	 * @description: 模拟select控件事件操作
	 * @example: bkeruyun.selectControlEvt();
	 */
    selectControlEvt: function () {
        //select control 效果 点击显示下拉列表
        $(document.body).delegate(".select-control:not('.disabled')", "click", function () {
            // alert(0);

            var ulObj = $(this).next("ul");
            //判断ul是否是隐藏的，如果是就显示，否则隐藏
            if (ulObj.is(":hidden")) {
                $(".select-group > ul").hide();
                $(".select-control").removeClass("select-control-arrowtop");
                ulObj.show();
                $(this).addClass("select-control-arrowtop");
            } else {
                ulObj.hide();
                $(this).removeClass("select-control-arrowtop");
            }

        });
        //select control 效果 点击下拉列表选项选中
        $(document.body).delegate(".select-group > ul > li", "click", function () {
            var txt = $(this).text();
            var index = $(this).index();
            var groupObj = $(this).parent().parent();
            var ulObj = $(this).parent();
            // alert(0);
            ulObj.prev(".select-control").removeClass("select-control-arrowtop");
            ulObj.prev(".select-control").find("em").text(txt);
            ulObj.hide();//hide ul
            groupObj.find('select')[0].selectedIndex = index;//关联select选中
            groupObj.find('select').trigger("change");//触发change事件

        });
        //任意点击隐藏下拉列表
        $(document).delegate("body", "click", function (e) {
            var target = $(e.target);
            if (target.closest(".select-group").length == 0) {
                $(".select-group > ul").hide();
                $(".select-group > .select-control").removeClass("select-control-arrowtop");
            }
        });
    },
    /**
	 * @description: 商品设置-商品管理列表里 商品分类下拉列表查询组件
	 * @example: bkeruyun.dropDownSearch(); 
	 * ?是否独立成插件
	 */
    dropDownSearch:function(){
       //点击显示下拉分类
       $(".drop-down-search").delegate(".select-control","click",function(){
            var dropDownCon = $(this).next(".multi-select-con");
            if(dropDownCon.is(":hidden")){
                dropDownCon.show();
            }else{
                dropDownCon.hide();
                //重置下拉列表
                $(".drop-down-search .highlighted-list > li").show();
                $(".drop-down-search .multi-select-con .search-box :text").val("");
                //兼容ie
                if ($(".drop-down-search .multi-select-con .search-box :text").parent().is(".placeholderBox")) {
                    $(".drop-down-search .multi-select-con .search-box :text").parent().find(".holder").show();
                }
            }
       }); 
       //点击一条 模拟select
       $(".drop-down-search").delegate(".highlighted-list > li","click",function(){
            var dropDownCon = $(this).parents(".multi-select-con");
            var titleObj = dropDownCon.prev(".select-control ").find("em");
            var txt = $(this).text();
            //如果包含@进行截取显示
            if(txt.indexOf("@")>0){
                txt = txt.split("@")[1];
            }
            var value = $(this).attr("data-value");
            var inputObj = $('#'+titleObj.attr("data-save-input"));//要保存值的input
            titleObj.text(txt);
            inputObj.val(value);//将value的值保存到隐藏域
            dropDownCon.hide();
            //重置下拉列表
            $(".drop-down-search .highlighted-list > li").show();
            $(".drop-down-search .multi-select-con .search-box :text").val("");
            //兼容ie
            if ($(".drop-down-search .search-box :text").parent().is(".placeholderBox")) {
                $(".drop-down-search .multi-select-con .search-box :text").parent().find(".holder").show();
            };
       });
       //点击空白处 隐藏下拉框
        $(document).delegate("body", "click", function (e) {
            var target = $(e.target);
            if (target.closest(".drop-down-search").length == 0) {
                $(".drop-down-search > .multi-select-con").hide();
                //重置下拉列表
                $(".drop-down-search .highlighted-list > li").show();
                $(".drop-down-search .multi-select-con .search-box :text").val("");
                //兼容ie
                if ($(".drop-down-search .multi-select-con .search-box :text").parent().is(".placeholderBox")) {
                    $(".drop-down-search .multi-select-con .search-box :text").parent().find(".holder").show();
                };
            }
        });
        //点击搜索
        $(".drop-down-search").delegate(".search-box > .icon-search","click",function(){
            var key = $(this).parents(".search-box").find(":text").val();
            var itemObjs = $(this).parents(".search-box").next(".highlighted-list").find("li");
            var itemLen = itemObjs.length;
            
            for (var i = itemLen - 1; i >= 0; i--) {
                var txt = itemObjs.eq(i).text();
                if(txt.indexOf(key) != -1){
                    // alert(key);
                    itemObjs.eq(i).show();
                }else{
                    itemObjs.eq(i).hide();
                }
            };
        });
    },
    /**
	 * @description: 初始化开关组件
	 * @example: bkeruyun.creatSwitch($(":checkbox[name^='switch-checkbox'],:checkbox[class='switch']")); 
	 * @param: $checkElements {jq object}
	 */
    creatSwitch: function ($checkElements) {
        var len = $checkElements.length;
        var browser = navigator.appName;
        //如果是ie浏览器并且小于ie9不加载
        if (browser == "Microsoft Internet Explorer") {
            var b_version = navigator.appVersion;
            var version = b_version.split(";");
            var trim_Version = version[1].replace(/[ ]/g, "");
            if (trim_Version == "MSIE8.0" || trim_Version == "MSIE7.0" || trim_Version == "MSIE6.0") {
                return false;
            }

        }
        for (var i = 0; i < len; i++) {

            var $ele = $checkElements.eq(i);
            var $id = $ele.attr("id");
            if (!$ele.is(".check-ios")) {
                $ele.addClass("check-ios").wrap('<div class="switch-holder"></div>').after('<label for="' + $id + '"></label><span></span>');
            }
            //$ele.after('<label for="' + $id + '"></label><span></span>');
        }
        //alert(len);
    },
    /**
	 * @description: 限制字符串的长度
	 * @example: bkeruyun.CutStrLength(this, len, isCharacter); 
	 * @param: obj {object}
	 * @param: Ilength {number}
	 * @param: isCharacter {boolean} true为按字符串计算 false按字算
	 */
    CutStrLength: function (obj, Ilength, isCharacter) {
        var str = obj.value;  //字符串
        var len = 0;            //累计字符长度
        var okLen = 0;         //实际字符长度 中文为1个字符
        //计算字符长度sss

        if (isCharacter != null || isCharacter == true) {
            for (var i = 0, len1 = str.length; i < len1; i++) {
                if (str.charCodeAt(i) > 255) {
                    len += 2;
                } else {
                    len += 1;
                }

                okLen += 1;
                if (len >= Ilength) {
                    break;
                }
            }
            obj.value = str.substring(0, okLen);//超过长度禁止输入
        } else {
            if (obj.value.length > Ilength) {
                obj.value = str.substring(0, Ilength);//超过长度禁止输入
            }
        }
    },
    /**
	 * @description: 限制输入长度 用于:text/textarea 按字符串限制需添加属性data-character="true",按字算无需添加次属性
	 * @example: bkeruyun.maxlength(); 
	 * @example: <input type="text" maxlength="30" data-character="true">
	 */
    maxlength: function () {
        //限制textarea的字符串长度
        $(document).delegate("textarea[maxlength],input[maxlength]", "keyup blur", function (e) {
            var len = $(this).attr("maxlength"),
                isCharacter = ($(this).attr("data-character")) ? $(this).attr("data-character") : null;
            bkeruyun.CutStrLength(this, len, isCharacter);
        });
    },
    /**
	 * @description: 限制输入字符格式 不符合格式的 替换为空
	 * @example: bkeruyun.limitInputFormat(this, reg); 
	 */
    limitInputFormat: function (o, reg) {
        var str = o.value;
        //替换不符合格式的字符为空
        o.value = str.replace(reg, '');
    },
    /**
	 * @description: 限制只能输入数字含小数
	 * @example: bkeruyun.number(); 
	 * @example: <input type="text" data-type="number" >
	 */
    number: function () {
        //return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
        $(document).delegate("input[data-type='number']", "keyup blur", function (e) {
            var reg = /^[^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?]$/;
            // var reg = /^\D$/g;
            bkeruyun.limitInputFormat(this, reg);
        });

    },
    /**
	 * @description: 限制只能输入数字含小数 添加data-left-max="4"限制左侧输入几位整数 添加data-right-max="2"限制右侧输入几位小数
	 * @example: bkeruyun.number(); 
	 * @example: <input type="text" data-type="number1" data-left-max="4"  data-right-max="2">
	 */
    number1: function () {
        $(document).delegate("input[data-type='number1']", "keydown", function (event) {
            var value = this.value,
                pos = this.selectionStart,//ie8也支持这个属性
                leftMax = $(this).attr('data-left-max') ? $(this).attr('data-left-max') : 0,
                rightMax = $(this).attr('data-right-max') ? $(this).attr('data-right-max') : 0;
            var index = value.indexOf(".");
//            alert(pos);
            if (event.ctrlKey || event.shiftKey || event.altKey) {
                return false;
            }
            // if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39))
            if ((!(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode >= 37 && event.keyCode <= 40)) && (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 190))) {
                // event.returnValue=false;
                return false;
            }
            if (event.keyCode === 190 && this.value.indexOf(".") != -1) {
                // event.returnValue=false;
                return false;
            }
            //左侧限制
            if (pos > 0 && !!leftMax && index == -1) {
                if (value.length >= leftMax && (!(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode == 37) && !(event.keyCode == 39) && !(event.keyCode == 190))) {
                	return false;
                }
            } else if (pos > 0 && !!leftMax && index != -1 && pos < index) {
                var indexLeftNum = (index == 0) ? '' : value.substring(0, index);
                indexLeftNum = (index == 0) ? '' : value.substring(0, index);
                if (indexLeftNum.length >= leftMax && (!(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode == 37) && !(event.keyCode == 39) && !(event.keyCode == 190))) {
                	return false;
                }
            }
            //右侧限制
            if (!!rightMax && index != -1 && pos > index) {
                //            	console.log("right pos=="+pos+"  index=="+index);
                var indexRightNum = (index == value.length - 1) ? '' : value.substring(index + 1);
                //检查小数点右边
                if (indexRightNum.length >= rightMax && (!(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode == 37) && !(event.keyCode == 39) && !(event.keyCode == 190))) {
                	return false;
                }
            }
        });
    },
    /**
	 * @description: 限制只能输入整数
	 * @example: bkeruyun.digits(); 
	 * @example: <input type="text" data-type="digits" >
	 */
    digits: function () {
        $(document).delegate("input[data-type='digits']", "keyup blur", function (e) {
            var reg = /\D/g;
            bkeruyun.limitInputFormat(this, reg);
        });
    },
    /**
	 * @description: 限制只能输入英文和数字和下划线
	 * @example: bkeruyun.word(); 
	 * @example: <input type="text" data-type="word" >
	 */
    word:function () {
        $(document).delegate("input[data-type='word']", "keyup blur", function (e) {
            var reg = /\W/g;
            bkeruyun.limitInputFormat(this, reg);
        });
    },
    /**
	 * @description: 限制输入最小值 同时必须是只能输入数字 否则会报错
	 * @example: bkeruyun.minInput(); 
	 * @example: <input type="text" data-type="number" min="1" >
	 */
    minInput: function () {
        $(document).delegate("input[min]", "keyup blur", function (e) {
            var min = $(this).attr("min") * 1;
            var num = $(this).val() * 1;
            if (num < min) {
                $(this).val("");
            }
        });
    },
    /**
	 * @description: 限制输入最大值 同时必须是只能输入数字 否则会报错
	 * @example: bkeruyun.maxInput(); 
	 * @example: <input type="text" data-type="number" max="3" >
	 */
    maxInput: function () {
        $(document).delegate("input[max]", "keyup blur", function (e) {
            var max = $(this).attr("max") * 1;
            var num = $(this).val() * 1;
            if (num > max) {
                $(this).val("");
            }
        });
    },
    /**
	 * @description: 重置表单
	 * @example: bkeruyun.clearData($("#formParentId")); 
	 * @param: formObj {jq object} 表单的父元素
	 */
    clearData: function (formObj) {
        if ($(formObj).find("form").length > 0) {
            $(formObj).find("form").each(function () {
                this.reset();
            });
        } else {
            return;
        }
        $(formObj).find(":checkbox:not([name^='switch-checkbox'])").each(function () {
            if (this.checked) {
                $(this).parent().addClass("checkbox-check");
            } else {
                $(this).parent().removeClass("checkbox-check");
            }
        });
        $(formObj).find(":radio").each(function () {
            if (this.checked) {
                $(this).parent().addClass("radio-check");
            } else {
                $(this).parent().removeClass("radio-check");
            }
        });
        $(formObj).find("select").each(function () {
            $(this).parent().find("ul > li").eq(0).trigger("click");
        });
        //移除错误提示
        $(formObj).find("label").each(function () {
            if ($(this).is(".wrong")) {
                $(this).removeClass("wrong");
            }
        });
        //移除名称重复的错误提示
        $(formObj).find("div.wrong").each(function () {
            $(formObj).find("div.wrong").remove();
        });
        //重置编辑器内容
        $(formObj).find("div[id^='myEditor']").each(function () {
            var editorId = $(this).attr("id");
            var um = UM.getEditor(editorId);
            um.ready(function () {
                //设置编辑器的内容
                um.setContent('');
            });
        });
        //图片预览 重置图片
    	if($(formObj).find(".img-responsive").length > 0 && $(formObj).find(".clearImgUpload").length > 0){
    		$(formObj).find(".clearImgUpload").trigger("click");
    	}
//        $(formObj).find(".img-responsive").each(function (i) {
//            $(this).attr("src", "themes/style/img/default.jpg");
//        });
    	//重置选择门店控件
    	$('#cmId-all-ul input[type=checkbox]').each(function(){
    		if(!$(this).attr('checked')){
    			$(this).click();
    		}
    	});
      
    },
    /**
	 * @description: 清空富文本编辑器
	 * @example: bkeruyun.clearEditor("editorId"); 
	 * @param: editorId {string} 富文本编辑器的id
	 */
    clearEditor: function (editorId) {
        var um = UM.getEditor(editorObj);
        //对编辑器的操作最好在编辑器ready之后再做
        um.ready(function () {
            //设置编辑器的内容
            um.setContent('');
        });
    },
    /**
	 * @description: 清空文本框的value 通过点击文本框右侧的X 清空value
	 * @example: bkeruyun.clearValue(); 
	 */
    clearValue: function () {
        //清空搜索框里的数据
        $(document).delegate(".search-box .close", "click", function () {
            var inputObj = $(this).parents(".search-box").find(":text");
            inputObj.val("");
            if (inputObj.is(".datepicker-start") && inputObj.attr('data-for-element')) {
                var endInput = $("#" + inputObj.attr('data-for-element'));
                endInput.val("");
                if(window.JPlaceHolder){
                	endInput.parent(".placeholderBox").find(".holder").show();
         	   }
            }
        });
    },
    /**
	 * @description: 检查input输入是否为空 应用在营销模块 其他模块不要再用
	 * @example: bkeruyun.isEmpty($("inputId")); 
	 * @param: $obj {jq object} 
	 * @return: true || false {boolean} true为空 false不为空
	 */
    isEmpty: function ($obj) {
        var thisValue = $.trim($obj.val());//输入的信息
        var thisPlaceholder = ($obj.attr("placeholder")) ? $.trim($obj.attr("placeholder")) : "";//占位符文本
        if (!thisValue || thisValue == thisPlaceholder) {
            //如果为空或等于占位符文本
            return true;
        } else {
            //如果不为空
            return false;
        }
    },
    /**
	 * @description: 添加或取消错误提示信息 应用在营销模块 的验证 其他模块不要再用 当前必填项未填写将左侧标题标为红色
	 * @example: bkeruyun.emptyPrompt(flag, $objLabel, 'wrong'); 
	 * @param: flag {boolean}  true标红 false取消标红
	 * @param: $objLabel {jq object} 必填项的标题元素
	 * @param: className {string} wrong 
	 */
    emptyPrompt: function (flag, $objLabel, className) {
        //判断是否有未填项
        //alert($objLabel.html());
        if (flag) {
            if (!$objLabel.hasClass(className)) {//判断是否已存在错误提示信息 如不存在
                $objLabel.addClass(className);//添加错误提示信息
            }
        } else {
            if ($objLabel.hasClass(className)) {//检查是否存在错误提示信息 如存在
                $objLabel.removeClass(className);//移除错误提示信息
            }
        }
    },
    /**
	 * @description: 应用在营销模块 的验证 其他模块不要再用 用于检查当前模块包含错误项 添加错误提示信息
	 * @example: bkeruyun.promptWrong(flag, $obj, '此模块有未填项'); 
	 * @param: flag {boolean}  true包含错误 false没有错误
	 * @param: $obj {jq object} 要添加错误提示信息的元素
	 * @param: str {string} 错误提示信息 
	 */
    promptWrong: function (flag, $obj, str) {
        var wrongStr = '<span class="wrong">' + str + '</span>';//大标题提示信息
        if (flag) {//有未填项
            //给模块标题栏添加错误提示信息
            if ($obj.find('.wrong').length < 1) {//判断是否已含有错误提示信息
                //添加模块错误提示信息
                $obj.append(wrongStr);
            }

        } else {//填写正确
            //如果已含有错误提示信息 去掉错误提示信息
            if ($obj.find('.wrong').length > 0) {//判断是否已含有错误提示信息
                //如果已含有 将错误提示信息 移除
                $obj.find('.wrong').remove();
            }
        }
    },
//    //如果模块有未填项 提示错误信息（用div，将换行）
//    promptWrongDiv: function (flag, $obj, str) {
//        var wrongStr = '<div class="wrong">' + str + '</div>';//大标题提示信息
//        if (flag) {//有未填项
//            //给模块标题栏添加错误提示信息
//            if ($obj.find('.wrong').length < 1) {//判断是否已含有错误提示信息
//                //添加模块错误提示信息
//                $obj.append(wrongStr);
//            }
//
//        } else {//填写正确
//            //如果已含有错误提示信息 去掉错误提示信息
//            if ($obj.find('.wrong').length > 0) {//判断是否已含有错误提示信息
//                //如果已含有 将错误提示信息 移除
//                $obj.find('.wrong').remove();
//            }
//        }
//    },
    /**
	 * @description: 操作成功后 显示提示信息 3秒后隐藏 背景颜色加深一些，位置调整一下
	 * @example: bkeruyun.promptMessage('操作成功'); 
	 * @param: msg {string} 错误提示信息 
	 * @param: data {object} {left: '50%',marginLeft: '-' + $("#promptMessage").outerWidth() / 2 + 'px',top: '50%',marginTop: '0px'} 调整这里的值改变位置
	 */
    //显示提示信息 3秒后隐藏 背景颜色加深一些，位置调整一下
    promptMessage: function (msg, data) {
        if ($("#promptMessage").length < 1) {
            var html = '<div id="promptMessage" style="display:none;"></div>';
            $("body").append(html);
        }
        var $obj = $("#promptMessage");
        $obj.html(msg);
        if (data == null) {
            data = {
                left: '50%',
                marginLeft: '-' + $("#promptMessage").outerWidth() / 2 + 'px',
                top: '50%',
                marginTop: '0px'
            }
        }
        $obj.show().css({
            "left": data.left,
            "margin-left": data.marginLeft,
            "top": data.top,
            "margin-top": data.marginTop
        });
        setTimeout(function () {
            $obj.fadeOut();
        }, 3000);
    },
     /**
     * @description 日历控件的二次封装 通过在input里添加自定义属性
     * @example <input name="startDate" type="text" class="form-control datepicker-start" id="date-start" data-for-element="date-end结束日期的ID" placeholder="开始日期" readonly="">
     * @example data-date-format="yyyy-mm-dd"  //yyyy-mm-dd hh:ii:ss
     * @example data-date-startView="2" //0:'hour' || 1:'day' || 2:'month' || 3:'year' || 4:'decade'
     * @example data-date-minView="2" //默认0
     * @example data-date-maxView="4" //默认4
     * @example data-date-startDate="yyyy-mm-dd" //默认null
     * @example data-date-endDate="yyyy-mm-dd" //默认null
     * ?独立出去与日历插件放一起
     */
     //日历控件
    datepickerInitialize: (function () {
        $(document).delegate(".datepicker-start", "focus", function () {
            var $this = $(this),
                _format = ($this.attr("data-date-format")) ? $this.attr("data-date-format") : "yyyy-mm-dd",
                _startView = ($this.attr("data-date-startView")) ? parseInt($this.attr("data-date-startView")) : 2,
                _minView = ($this.attr("data-date-minView")) ? parseInt($this.attr("data-date-minView")) : 2,
                _maxView = ($this.attr("data-date-maxView")) ? parseInt($this.attr("data-date-maxView")) : 4,
                _startDate = ($this.attr("data-date-startDate")) ? $this.attr("data-date-startDate") : null,
                _endDate = ($this.attr("data-date-endDate")) ? $this.attr("data-date-endDate") : null;
            //console.log("_format == " + _format);
            //console.log("_startView == " + _startView);
            //console.log("_minView == " + _minView);
            //console.log("_maxView == " + _maxView);
            //console.log("_startDate == " + _startDate);
            //console.log("_endDate == " + _endDate);
            $this.datetimepicker({
                format: _format,
                language: 'zh-CN',
                weekStart: 1,
                todayBtn: false,
                autoclose: true,
                todayHighlight: true,
                startView: _startView,
                minView: _minView,
                maxView: _maxView,
                startDate: _startDate,
                endDate: _endDate,
                forceParse: true
            }).on("changeDate", function (ev) {
                var endDayObjId = $this.attr("data-for-element"),
                    _value = $this.val();

                //清除上一次操作;
                if (endDayObjId) {
                    $('#' + endDayObjId).datetimepicker("remove");
                    $('#' + endDayObjId).val("");
                    //$('#' + endDayObjId).attr("data-date-startDate",_value);
                    // console.log(0);
                }
            });

            //清空开始日期 结束日期为空 不可选
            $this.parents(".search-box").find(".close").bind("click", function () {
                $("#" + $this.attr("data-for-element")).datetimepicker("remove");
				$("#" + $this.attr("data-for-element")).val("");
				if(window.JPlaceHolder){
//					alert($this.attr("data-for-element"));
					$("#" + $this.attr("data-for-element")).parent(".placeholderBox").find(".holder").show();
			    }
            });
        });

        $(document).delegate(".datepicker-end", "focus", function () {
            var $this = $(this),
                _startValue = $("#" + $this.attr("data-for-element")).val(),
                _format = ($this.attr("data-date-format")) ? $this.attr("data-date-format") : "yyyy-mm-dd",
                _startView = ($this.attr("data-date-startView")) ? parseInt($this.attr("data-date-startView")) : 2,
                _minView = ($this.attr("data-date-minView")) ? parseInt($this.attr("data-date-minView")) : 2,
                _maxView = ($this.attr("data-date-maxView")) ? parseInt($this.attr("data-date-maxView")) : 4,
                _startDate = ($this.attr("data-date-startDate")) ? $this.attr("data-date-startDate") : _startValue,
                _endDate = ($this.attr("data-date-endDate")) ? $this.attr("data-date-endDate") : null;
//            console.log("_endDate ==" + _endDate);
            if (_startValue) {
                //_startDate = _startValue;
                //console.log(_startDate);
                $this.datetimepicker({
                    format: _format,
                    language: 'zh-CN',
                    weekStart: 1,
                    todayBtn: false,
                    autoclose: true,
                    todayHighlight: true,
                    startView: _startView,
                    minView: _minView,
                    maxView: _maxView,
                    startDate: _startDate,
                    endDate: _endDate,
                    forceParse: true
                });
            }
        });
    })(),
    /**
	 * @description 点击加号 input值加一个递增 达到最大上限不能加 前提input只能输入数字
	 * @example bkeruyun.plusFun($(".plus"),1,10,event); 
	 * @param $obj {ja object} 发生事件的元素 
	 * @param step {number} 递增
	 * @param maxNum {number} 最大值
	 * @param evt {object} event 可以不传
	 */
    plusFun: function ($obj, step, maxNum, evt) {
        var oldNumber = $obj.val() * 1;
        var newNumber;

        //如果当前值是最大值 返回
        if (oldNumber == maxNum) {
            return;
        }
        newNumber = (oldNumber + step) > maxNum ? maxNum : oldNumber + step;

        $obj.val(newNumber);
    },
    /**
	 * @description 点击减号 input值减一个递增 达到最小值不能减 前提input只能输入数字
	 * @example bkeruyun.minusFun($(".minus"),1,1,event); 
	 * @param $obj {ja object} 发生事件的元素 
	 * @param step {number} 递增
	 * @param minNum {number} 最小值
	 * @param evt {object} event 可以不传
	 */
    minusFun: function ($obj, step, minNum) {
        var oldNumber = $obj.val() * 1;
        var newNumber;

        //如果当前值是最小值 返回
        if (oldNumber == minNum) {
            return;
        }
        newNumber = (oldNumber - step) < minNum ? minNum : oldNumber - step;

        $obj.val(newNumber);
    },
    /**
     * @description 点击全部撤销或重置所有选择 重置表单
     * @example bkeruyun.undoAll();
     */
    undoAll: function () {
        $("#undo-all").on("click", function (e) {
            e.preventDefault();
            bkeruyun.clearData($(this).parents('.aside'));

            if (!bkeruyun.isPlaceholder()) {
                JPlaceHolder.init();
            }
            //通过js添加的初始值重置表单会为空
            bkeruyun.setDefaultDate();
        });
    },
    /**
     * @description 设置默认开始时间/结束时间
     * @param _startObj
     * @param _endObj
     */
    setDefaultDate:function(_startObj, _endObj){
    	var _this = this;
    	var startObj = _startObj, endObj = _endObj;
    	if (!startObj) {
    		startObj = $("#date-start"),
    		endObj = $('#date-end');
    	}
    	if (startObj) {
        	var today=new Date().Format("yyyy-MM-dd");
        	startObj.val(today);
        	if (endObj) {
        		endObj.val(today);
        	}
        	if(window.JPlaceHolder){
        		startObj.next("span").hide();
        		if (endObj) {
        			endObj.next("span").hide();
        		}
        	}
    	}
    },
    /**
     * 绑定开始时间的change事件，设定时间的限制条件。
     * @param _startObj
     * @param _endObj
     * ?重复代码 干掉
     */
    bindStartDateChange:function(_startObj, _endObj) {
    	var startObj = _startObj, endObj = _endObj;
    	if (!startObj) {
    		startObj = $("#date-start"),
    		endObj = $('#date-end');
    	}

    	if (startObj) {
	    	var today=new Date().Format("yyyy-MM-dd");
	    	
	    	startObj.attr("data-date-endDate",today);
	    	startObj.on("change",function(){
				var _value = $.trim($(this).val()),
					_maxDate = (_value.substring(0,4)*1+1) + _value.substring(4),
					_endTimeValue = (new Date(_maxDate)*1 > new Date()*1) ? today : _maxDate;
				endObj.attr("data-date-endDate",_endTimeValue);
	    	});
    	}
    },

    /**
     * @description 检查浏览器是否支持placeholder属性
     * @returns {boolean} true支持 || false不支持
     * ?放到form文件
     */
    isPlaceholder: function () {
        return 'placeholder' in document.createElement('input');
    }
};
/**
 * 设置AJAX请求的默认参数选项
 */
$.ajaxSetup({
    contentType: "application/x-www-form-urlencoded;charset=utf-8",
    complete: function (xhr, textStatus) {
        //session timeout
        if (xhr.status == 911) {
            window.location = _loginUrl;//返回应用首页
            return;
        }
    }
});
/**
 * 序列化form
 * @param formId
 * @returns
 */
function serializeFormById(formId) {
    beforeSerialize(formId);
    var ret = $("#" + formId).serialize();
    afterSerialize(formId);
    return ret;
}
/**
 * 序列化form
 * @param formId
 * @returns
 * ?与上一个函数可以合并
 */
function serializeArrayFormById(formId) {
    beforeSerialize(formId);
    var ret = $("#" + formId).serializeArray();
    afterSerialize(formId);
    return ret;
}

/**
 * 调用$("#"+formId).serialize()方法前调用，用于兼容查询时ie8,9不支持html5 placeholder问题
 * @param formId
 * weixinLogin.js用到 并且在该文件里有定义 先注掉
 */
function beforeSerialize(formId) {
    $("#" + formId + " input[placeholder]").each(function (i, e) {
        $this = $(this);
        var placeHolder = $this.attr("placeholder");
        var value = $this.val();
        if (placeHolder == value) {
            $this.attr("isChange", true);
            $this.val("");
        }
    });
}

/**
 * 调用$("#"+formId).serialize()方法后调用，用于兼容查询时ie8,9不支持html5 placeholder问题
 * @param formId
 * weixinLogin.js用到 并且在该文件里有定义 先注掉
 */
function afterSerialize(formId) {
    $("#" + formId + " input[placeholder]").each(function (i, e) {
        $this = $(this);
        var placeHolder = $this.attr("placeholder");
        var value = $this.val();
        var isChange = $this.attr("isChange");
        if (value == "" && isChange) {
            $this.removeAttr("isChange");
            $this.val(placeHolder);
        }
    });
}
/**
 * @description 将格式完好的JSON字符串转为与之对应的JavaScript对象
 * @example var OrderStatusEnum = new EnumWrapper('${OrderStatusEnumJson}');
 * @param {jsonString}
 */
function EnumWrapper(enumJsonString) {
    this.EnumObj = jQuery.parseJSON(enumJsonString);
    for (var name in this.EnumObj) {
        this[name] = this.EnumObj[name];
    }
    if (typeof EnumWrapper._init == "undefined") {
        EnumWrapper.prototype.getViewValue = function (backValue) {
            var enumObj = this.EnumObj;
            for (var propName in enumObj) {
                var obj = enumObj[propName];
                if (obj && obj.backValue == backValue) {
                    return obj.viewValue;
                }
            }
            return backValue;
        };
        EnumWrapper.prototype.getBackValue = function (viewValue) {
            var enumObj = this.EnumObj;
            for (var propName in enumObj) {
                var obj = enumObj[propName];
                if (obj && obj.viewValue == viewValue) {
                    return obj.backValue;
                }
            }
            return backValue;
        };
        EnumWrapper.prototype.getName = function (backValue) {
            var enumObj = this.EnumObj;
            for (var propName in enumObj) {
                var obj = enumObj[propName];
                if (obj && obj.backValue == backValue) {
                    return propName;
                }
            }
            return backValue;
        };
        EnumWrapper.prototype.getViewValueByName = function (name) {
            var enumObj = this.EnumObj;
            for (var propName in enumObj) {
                var obj = enumObj[propName];
                if (propName == name) {
                    return obj.viewValue;
                }
            }
            return name;
        };
        EnumWrapper._init = true;
    }
}
/**
 * 关闭当前窗口
 */
function closeWindow() {
    var browserName = navigator.appName;
    if (browserName == "Netscape") {
        window.open('', '_parent', '');
        window.close();
    }
    else {
        if (browserName == "Microsoft Internet Explorer") {
            window.opener = "whocares";
            window.close();
        }
    }
}
$(function () {
    //取消空链接的默认事件
    $(document).delegate("a[href='#'],a[href=''],a[href='javascript:void(0)']", "click", function (e) {
        e.preventDefault();
    });
    bkeruyun.rolling($("#nav-fixed"));

    //添加底栏
    bkeruyun.addFooter();
    //初始化select控件
   // bkeruyun.selectControl($('select'));
    //初始化select控件事件
    bkeruyun.selectControlEvt();
    //检测浏览器版本 如果是ie8及以下提示信息
    bkeruyun.detectionBrowser();
    //关闭弹框
    bkeruyun.closePlanPopover();
    //checkbox事件
    bkeruyun.checkboxEvt();
    //radio事件
    bkeruyun.radioEvt();
    //开关
    bkeruyun.creatSwitch($(":checkbox[name^='switch-checkbox'],:checkbox[class='switch']"));
    //限制最大输入长度
    bkeruyun.maxlength();
    //只能输入数字 含小数
    bkeruyun.number();
    //输入固定格式的数字
    bkeruyun.number1();
    //只能输入整数
    bkeruyun.digits();
    //限制输入最大值 同时必须是只能输入数字 否则会报错
    bkeruyun.maxInput(); 
    //限制输入最小值 同时必须是只能输入数字 否则会报错
    bkeruyun.minInput(); 
    //限制只能输入英文和数字和下划线
    bkeruyun.word();
    //清空文本框的value 通过点击文本框右侧的X 清空value
    bkeruyun.clearValue();
    //全部撤销
    bkeruyun.undoAll();
    //最大高度
    bkeruyun.maxHeight();
    //最小高度
    bkeruyun.minHeight();
    //下搜索拉分类
    bkeruyun.dropDownSearch();
});
//js本地图片预览，兼容ie[6-9]、火狐、Chrome17+、Opera11+、Maxthon3
///*
/**
 * @description js本地图片预览，兼容ie[6-9]、火狐、Chrome17+、Opera11+、Maxthon3
 * @example PreviewImage(this,$('#trigger-file-2'),'imgHeadPhoto-2','divPreview-2',$('#labelText'))
 * @param fileObj {object} file元素
 * @param fileUrlObj {jq object} 显示file文件信息的input
 * @param imgPreviewId {string} 预览img的ID
 * @param divPreviewId {string} 执行IE滤镜的div的ID
 * @param btnDelete {jq object} 清空按钮
 * @param namegroup {string} 此参数可不传， 用于营销模块添加水印功能 checkbox name 
 * ? 独立出去
 */
function PreviewImage(fileObj,fileUrlObj,imgPreviewId,divPreviewId,btnDelete,namegroup){
  var allowExtention=".jpg,.bmp,.gif,.png";//允许上传文件的后缀名document.getElementById("hfAllowPicSuffix").value;  
  var extention=fileObj.value.substring(fileObj.value.lastIndexOf(".")+1).toLowerCase();              
  var browserVersion= window.navigator.userAgent.toUpperCase();  
  if(allowExtention.indexOf(extention)>-1){  
		//alert(fileObj.value.substring(fileObj.value.lastIndexOf("\\")+1).toLowerCase()); 
      if(fileObj.files){//HTML5实现预览，兼容chrome、火狐7+等  
          if(window.FileReader){  
              var reader = new FileReader();   
              reader.onload = function(e){  
                  document.getElementById(imgPreviewId).setAttribute("src",e.target.result);  
              }    
              reader.readAsDataURL(fileObj.files[0]);  
				//alert(1);
          }else if(browserVersion.indexOf("SAFARI")>-1){  
              alert("不支持Safari6.0以下浏览器的图片预览!");  
          }
      }else if (browserVersion.indexOf("MSIE")>-1){
          if(browserVersion.indexOf("MSIE 6")>-1){//ie6  
              document.getElementById(imgPreviewId).setAttribute("src",fileObj.value);  
          }else{//ie[7-9]  
              fileObj.select();  
              if(browserVersion.indexOf("MSIE 9")>-1)  
                  fileObj.blur();//不加上这句 document.selection.createRange().text在ie9会拒绝访问
					//fileUrlObj.focus();
              var newPreview =document.getElementById(divPreviewId+"New");  
              if(newPreview==null){  
                  newPreview =document.createElement("div");  
                  newPreview.setAttribute("id",divPreviewId+"New");  
                  newPreview.style.width = document.getElementById(imgPreviewId).width+"px";  
                  newPreview.style.height = document.getElementById(imgPreviewId).height+"px";  
                  newPreview.style.border="solid 1px #d2e2e2";  
              }
              newPreview.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
              var tempDivPreview=document.getElementById(divPreviewId);  
              tempDivPreview.parentNode.insertBefore(newPreview,tempDivPreview);  
              tempDivPreview.style.display="none";                      
          }  
      }else if(browserVersion.indexOf("FIREFOX")>-1){//firefox
          var firefoxVersion= parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);  
          if(firefoxVersion<7){//firefox7以下版本  
              document.getElementById(imgPreviewId).setAttribute("src",fileObj.files[0].getAsDataURL());  
          }else{//firefox7.0+                      
              document.getElementById(imgPreviewId).setAttribute("src",window.URL.createObjectURL(fileObj.files[0]));  
          }  
      }else{  
          document.getElementById(imgPreviewId).setAttribute("src",fileObj.value);  
      }  
		//截取字符串并输出url
		var inputValue = fileObj.value.substring(fileObj.value.lastIndexOf("\\")+1).toLowerCase();
		fileUrlObj.val(inputValue);
		//如果不为null，执行以下代码
		if(namegroup != null){
			$(":checkbox[name='" + namegroup + "']").each(function(i){
				$(this).removeAttr("disabled");
				//alert(i);
			});
		}
		
  }else{  
      alert("仅支持"+allowExtention+"为后缀名的文件!");  
      fileObj.value="";//清空选中文件  
      if(browserVersion.indexOf("MSIE")>-1){                          
          fileObj.select();  
          document.selection.clear();  
      }                  
      fileObj.outerHTML=fileObj.outerHTML;  
  }  
	//$("#" + fileUrlObj).val(fileObj.value);
  //如果清空按钮隐藏 显示清空
  if($(btnDelete).is(":hidden")){
  	btnDelete.show();
  }
} 
/**
 * clearPreviewImg      清空预览图片
 * @param               string        urlInput id
 * @param               string        fileInput id
 * @param               string        previewImg id
 * @param               string        defaultUrl url
 * ? 遗留问题 ie滤镜清空
 */
function clearPreviewImg($e,urlInput,fileInput,previewImg,defaultUrl,imageId){
	var browserVersion= window.navigator.userAgent.toUpperCase();
	var clearBtnId = $e.attr("id");
	$("#" + urlInput).val("");
	$("#" + fileInput).val("");
	$e.hide();
	if (imageId) {
		$("#" + imageId).val("");
	}
	
	//如果是ie 清空滤镜  删除原来的滤镜,再添加默认img
	if(browserVersion.indexOf("MSIE")>-1){
		var defaultImg = '<img src="'+defaultUrl+'" class="img-responsive" id="'+previewImg+'">';
		var previewDiv = $("#" + previewImg).parent().attr("id");
		var defaultFileInput = '<input type="file" id="'+fileInput+'" name="'+fileInput+'" onChange="PreviewImage(this,$(\'#'+urlInput+'\'),\''+previewImg+'\',\''+previewDiv+'\',$(\'#'+clearBtnId+'\'),\'watermark\')">';
		//IE里js不能直接清空value;
		$("#" + fileInput).replaceWith(defaultFileInput);
		$("#"+previewDiv+"New").remove();
		$("#" + previewImg).parent().css("display","block");
	}else{
		$("#" + previewImg).attr("src",defaultUrl);
	}
}
$(function () {
    /**
     * 编辑界面离开时提示用户是否离开
     * @param url 返回地址
     */
    $.notifyLeaving = function (url) {
        if (url == null || url == undefined || url == '') {
            bkeruyun.promptMessage("返回地址不能为空");
            return false;
        }

        Message.confirm({title: "提示", describe: "当前信息已变更，是否退出？"}, function () {
            window.location.href = url;
        });
    };

    /**
     * 执行查询
     * @param args 查询参数
     * queryFormId 查询条件表单id
     * dataGridId 数据表格id
     */
    $.doSearch = function (args) {
        var gridId = args.dataGridId.id, toPage = args.toPage;
        //fromId = args.queryFormId.id;
        if (toPage == undefined || toPage == '') {
            $('#' + gridId).refresh();
        } else {
            $('#' + gridId).refresh(toPage);
        }
    };

    $.doDelete = function (args) {
        Message.confirm({title: "提示", describe: "是否删除?"}, function () {
        	if(args.callback == 'undefined' ||args.callback == ""){
        		args.callback = '$.showMsgAndRefresh';
        	}
            $.submitWithAjax(args);
        });
    };

    $.doConfirm = function (args) {
        Message.confirm({title: "提示", describe: "确认后，单据无法编辑，是否确认?"}, function () {
        	args.callback = '$.showMsgAndRefresh';
            $.submitWithAjax(args);
        });
    };

    $.doClock = function (args) {
    	 var desc = $.beforeCallback(args);
         if (!desc) {
             desc = '是否停用?';
         }
        Message.confirm({title: "提示", describe: desc}, function () {
        	if(args.callback == 'undefined' ||args.callback == ""){
        		args.callback = '$.showMsgAndRefresh';
        	}
        	$.submitWithAjax(args);
        });
    };

    $.doUnlock = function (args) {
    	var desc = $.beforeCallback(args);
        if (desc == '') {
            desc = '是否启用?';
        }
        Message.confirm({title: "提示", describe: '是否启用?'}, function () {
            args.callback = '$.showMsgAndRefresh';
            $.submitWithAjax(args);
        });
    };

    //执行操作前回调
    $.beforeCallback = function (args) {
        var beforeCallback = args.callback, msg = '';
        if (beforeCallback && $.isFunction(beforeCallback.toFunction())) {
            msg = beforeCallback.toDo(args);
        }
        return msg;
    };

    /**
     * ajax提交数据
     * @param args
     */
    $.submitWithAjax = function (args) {
        var url = args.url, postData = args.postData;
        $.urlAndPostDataCheck(url, postData);

        var callback = args.callback;
        if (!callback) {
            callback = '$.defaultAjaxCallback';
        }

        $.ajax({
            url: url,
            type: args.type || "post",
            data: $.param(postData),
            async: (args.async != false),
            dataType: args.dataType || "json",
            beforeSend: bkeruyun.showLoading,
            success: function (result) {
                if ($.isFunction(callback.toFunction())) {
                    args.result = result;
                    callback.toDo(args);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                bkeruyun.promptMessage('发生系统错误，请联系管理员！');
            },
            complete: function (jqXHR, textStatus) {
                //取消遮罩
                bkeruyun.hideLoading();
            }
        });
    };
    /**
     * 表单提交
     * @param args
     * @returns {boolean}
     */
    $.formSubmitWithAjax = function (args) {
        var url = args.url;
        if (url == null || url == undefined || url == '') {
            bkeruyun.promptMessage("请求地址不能为空");
            return false;
        }

        var formId = args.formId;
        if (formId == null || formId == undefined || formId == '') {
            bkeruyun.promptMessage("表单id不能为空");
            return false;
        }

        //执行表单检查前回调
        var status = true;
        var beforeValidateCallback = args.beforeValidate;
        if (beforeValidateCallback && $.isFunction(beforeValidateCallback.toFunction())) {
            status = beforeValidateCallback.toDo();
            if (!status) {
                return false;
            }
        }

        //执行表单检查
        var $form = $('#' + formId);
        var validator = $form.validate({
            debug: true, //提交表单
            messages: args.messages,
            errorPlacement: function (error, element) {
                error.appendTo(element.parents(".positionRelative").find(".wrong"));
            }
        });

        if (!validator.form()) {
            return false;
        }

        //执行表单检查后回调
        var afterBalidateCaccback = args.afterValidate;
        if (afterBalidateCaccback && $.isFunction(afterBalidateCaccback.toFunction())) {
            status = afterBalidateCaccback.toDo();
            if (!status) {
                return false;
            }
        }

        //将表格还原为未编辑状态
        var gridId = args.gridId;
        if (gridId) {
            var $grid = $("#" + gridId);

            var ids = $grid.jqGrid('getDataIDs');
            for (var i = 0; i < ids.length; i++) {
                $grid.jqGrid('restoreRow', ids[i]);
            }
        }

        //执行自定义检查
        var customValidator = args.customValidator;
        if (customValidator && $.isFunction(customValidator.toFunction())) {
            if (!customValidator.toDo(args)) {
                return false;
            }
        }

        //序列化表格数据
        var gridData = $grid.jqGrid('getRowData');

        //生成最后提交数据
        var formData, postData, contentType;

        if (gridId) {
            contentType = "application/json";
            formData = $form.getFormData();
            postData = formData;
            var gridDataId = 'details';
            if (args.gridDataId != undefined && args.gridDataId != '') {
                gridDataId = args.gridDataId;
            }
            postData[gridDataId] = gridData;
            postData = JSON.stringify(postData);
        } else {
            contentType = 'application/x-www-form-urlencoded;charset=UTF-8';
            postData = $form.serialize();
        }

        //合并args中的postData
        if (args.postData && typeof args.postData == "object") {
            for (var key in args.postData) {
                postData[key] = args.postData[key];
            }
        }

        var callback = '$.defaultAjaxCallback';
        if (args.submitCallback) {
            callback = args.submitCallback;
        }
        $.ajax({
            url: url,
            type: args.type || "post",
            data: postData,
            async: (args.async != false),
            dataType: args.dataType || "json",
            contentType: contentType,
            beforeSend: bkeruyun.showLoading,
            success: function (result) {
                bkeruyun.promptMessage(result.message);
                if ($.isFunction(callback.toFunction())) {
                    args.result = result;
                    callback.toDo(args);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                bkeruyun.promptMessage('发生系统错误，请联系管理员！');
            },
            complete: function (jqXHR, textStatus) {
                //取消遮罩
                bkeruyun.hideLoading();
            }
        });
    };

    /**
     * 从form中查找有message属性的集合,并返回一个对象
     * @param formId
     * @returns {Object}
     */
    $.getFormValidateMessages = function (formId) {
        var messageQueue = [];
        //根据当前form获取所有有message的标签,并处理验证消息
        $("#" + formId).find("[message]").each(function () {
            var message = $(this).attr("message");
            var property = $(this).attr("name") || $(this).attr("id");

            var entry = {};
            entry[property] = message;
            //var entry = new $.validateMessageObject(property, message);
            messageQueue.push(entry);
        });
        var messageSource = '{' + messageQueue.join(",").toString() + '}';
        return eval('(' + messageSource + ')');
    };

    $.validateMessageObject = function (property, message) {
        this.property = property;
        this.message = message;
        this.toString = function () {
            return this.property + ":" + this.message;
        };
    };


    /**
     * 执行编辑操作
     * @param args
     */
    $.doEditor = function (args) {
        $.doForward(args);
    };
    /**
     * 执行支付方式操作
     * @param args
     */
    $.doPayment = function (args) {
        $.doForward(args);
    };
    /**
     * 执行查看操作
     * @param args
     */
    $.doView = function (args) {
        $.doForward(args);
    };

        /**
         * 执行重置密码操作
         * @param args
         */
        $.doUpdatepassword = function (args) {
            //$.doForward(args);
            var desc = $.beforeCallback(args);
            if (!desc) {
                desc = '是否重置密码?';
            }
            Message.confirm({title: "提示", describe: desc}, function () {
                if(args.callback == 'undefined' ||args.callback == ""){
                    args.callback = '$.showMsgAndRefresh';
                }
                $.submitWithAjax(args);
            });
        };

    /**
     * 页面跳转
     * @param args 参数
     * url：跳转地址
     * postData：传递的参数
     * @returns {boolean}
     */
    $.doForward = function (args) {
        var url = args.url, postData = args.postData;
        $.urlAndPostDataCheck(url, postData);
        window.location.href = url + '?' + $.param(postData);
    };
    
    /**
     * 执行模板添加商品
     * 
     */
    $.doAddgoods=function(args){
    	$.doForward(args);
	};
    
    /**
     * 执行页面跳转到授权门店
     * 
     */
    $.doAuthorization=function(args){
    	$.doForward(args);
	};
    
    /**
     * 执行成功提示并刷新表格，执行失败只提示
     * @param args
     */
    $.showMsgAndRefresh = function (args) {
        var result = args.result, dataGridId = args.dataGridId;
        if (result.success) {
            bkeruyun.promptMessage(result.message);
            $("#" + dataGridId).trigger('reloadGrid');
        } else {
            if (result.data != '' && result.data != undefined) {
                bkeruyun.promptMessage("操作失败:" + result.message, result.data + "<br>");
            } else {
                bkeruyun.promptMessage("操作失败:" + result.message);
            }
        }
    };
    
    

    /**
     * 默认的ajax成功回调，提示操作结果
     * @param args
     */
    $.defaultAjaxCallback = function (args) {
        var rs = args.result;
        if (rs.success) {
            bkeruyun.promptMessage(rs.message);
        } else {
            if (rs.data != '' && rs.data != null) {
                bkeruyun.promptMessage("操作失败:" + rs.message, rs.data + "<br>");
            } else {
                bkeruyun.promptMessage("操作失败:" + rs.message);
            }
        }
    };


    $.urlAndPostDataCheck = function (url, postData) {
        if (url == null || url == undefined || url == '') {
            bkeruyun.promptMessage("url地址不能为空");
            return false;
        }
        if (postData == undefined || postData == '') {
            bkeruyun.promptMessage("提交数据不能为空");
            return false;
        }
        return true;
    };
}
);

/*tags for auto post, by skiny at 2015.05.12, start*/
$.fn.getFormData = function () {
var result = {};
$(this).serializeArray().map(function (v) {
    if (result[v.name] != undefined) {
        if (typeof result[v.name] == "string") result[v.name] = new Array(result[v.name]);
        result[v.name][result[v.name].length] = v.value;
    }
    else result[v.name] = v.value;
});
return result;
};

/**
* 将对象转化为数组，特别处理对象中嵌套的数组
* @param data
* @returns {Array}
*/
function objectToArray(data) {
var result = [];
$.map(data, function (value, key) {
    var object = {};
    if ($.isArray(value)) {
        var name = key;
        $.map(value, function (value, key) {
            var object = {};
            object.name = name;
            object.value = value;
            result.push(object);
        });
    } else {
        object.name = key;
        object.value = value;
        result.push(object);
    }
});
return result;
}

/**
* 首字母转大写
* @param str
* @returns {XML|void|string}
* @constructor
*/
function UpperFirstLetter(str) {
return str.replace(/\b\w+\b/g, function (word) {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
});
}


/**
* 移除小数点后的0或.0，如“123,456,789.0000”变成“123,456,789”、 “123,000”不变还是“123,000”
* @param obj
* @returns {*}
*/
function returnWithoutDecimalZero(obj) {

var number = (typeof obj == 'string' ? obj : obj.toString());

if (number.indexOf('.') < 0) {
    return number;
}

while (true) {
    if (number.lastIndexOf('.0') == number.length - 2) {
        return number.substring(0, number.length - 2);
    } else if (number.lastIndexOf('0') == number.length - 1) {
        number = number.substring(0, number.length - 1);
    } else {
        return number;
    }
}
}

/**
* 自定义的金额表示格式：货币符号￥为前缀，千分位分隔符，删除多余的小数位0（或.0）。如“￥ 123,456,789,000”、“￥ 13.2”
* @param cellvalue
* @param options
* @param rowObject
* @returns {string}
*/
function customCurrencyFormatter(cellvalue, options, rowObject) {

var numberstr = (typeof cellvalue == 'string' ? cellvalue : cellvalue.toString());

numberstr = returnWithoutDecimalZero(numberstr);

var index = numberstr.lastIndexOf('.');

var left = index > 0 ? numberstr.substring(0, index) : numberstr;
var right = index > 0 ? numberstr.substring(index + 1) : '';

var count = 1;
for (var pointer = left.length - 1; pointer > 0; pointer--) {
    if (count % 3 == 0) {
        var replace_left = left.substring(0, pointer);
        //var replace = left.substring(pointer, pointer + 1);
        var replace_right = left.substring(pointer + 1);
        var withstr = ',' + left.charAt(pointer);
        left = replace_left + withstr + replace_right;
    }
    count++;
}

return "￥ " + left + (index > 0 ? '.' : "") + right;
}

/**
* 生成一个输入浮点数的input
* @param cellvalue
* @param options
* @param rowObject
* @returns {string}
*/
function formatInputNumber(cellvalue, options, rowObject) {
var colName = options.colModel.name;
var str = '<input type=\'text\'  style=\'width:100%;height:100%\' autocomplete=\'off\' data-left-max=\'8\' data-right-max=\'5\'';
str += 'class=\'text-right number ' + colName + '\'';
str += 'data-type=\'number\' placeholder=\'0\' ';
str += 'id=\'' + options.rowId + '_' + options.colModel.name + '\' ';
str += 'name=\'' + colName + '\' ';
if (cellvalue != '' && cellvalue != undefined) {
    str += 'value=\'' + cellvalue + '\' ';
}
str += '>';
return str;
}
/**
* 返回单元格input的值
* @param cellvalue
* @param options
* @param cell
* @returns {*}
*/
function unformatInput(cellvalue, options, cell) {
var value = $(cell).children('input')[0].value;
return value == '' ? 0 : value;
}

String.prototype.toFunction = function () {
var temp = String(this);
if (temp && typeof $[temp.replace("$.", "")] == "function") return $[temp.replace("$.", "")];
};
String.prototype.toDo = function (args) {
var temp = String(this);
if (temp && typeof $[temp.replace("$.", "")] == "function") {
    var result = $[temp.replace("$.", "")](args);
}
//返回回调的值
if (result) {
    return result;
}
};


$(function () {
//event
$("body").on("click", "[function],[args]", function () {
    var args = $(this).attr("args"),
        perms = $(this).attr("perms"),
        functionDo = $(this).attr("function");
    if (functionDo || args) {
        args.replace(/'/g, "\"");
        try {
            eval("window.tempVal=" + args + ";");
            args = window.tempVal;
        }
        catch (ex) {
            args = {};
        }

        if ($.isFunction(functionDo.toFunction())) {
            //eval("(" + functionDo.toFunction(args) + ")");
            functionDo.toDo(args);
        }
    }
});

});
/*tags for auto post, by skiny at 2015.05.12, end*/

//===========================特殊字符验证Start=================================
/**
 * 自动恢复光标位置
 */
$.fn.textFocus = function (v) {
    var range, len, v = v === undefined ? 0 : parseInt(v);
    this.each(function () {
        if ($.browser.msie) {
            range = this.createTextRange();
            v === 0 ? range.collapse(false) : range.move("character", v);
            range.select();
        } else {
            len = this.value.length;
            v === 0 ? this.setSelectionRange(len, len) : this.setSelectionRange(v, v);
        }
        this.focus();
    });
    return this;
}
var baseReg = {
	/** 通用特殊字符过滤 **/
	checkName : function(){
		$(document).delegate("input[data-format='name']", "input propertychange", function (e) {
            //不允许输入的特殊字符集合
            var reg = /[\~\`\·\!\！\@\￥\^\…\_\——\_\=\|\{\}\[\]\:\：\;\；\‘\’\"\”\“\<\>\《\》\?\、\，\.\。\？\、\%\\]/g,
                check = this.value.match(reg);
            if (check) {
                var index = this.value.indexOf(check[0]);
                this.value = this.value.replace(reg, "");
                $(this).textFocus(index);
            }
        });
        $(document).delegate("input[data-format='name']", "change", function (e) {
            //输入完成清除为输入法预留的特殊字符
            var reg = /[\'\,]/g;
            if (reg.test(this.value)) this.value = this.value.replace(reg, "");
        });
	},
	/** 过滤查询时的%号 **/
	checkDataBaseInput : function(){
		$(document).delegate("input[data-format='database']", "input propertychange", function (e) {
            //不允许输入的特殊字符集合
            var reg = /[\%]/g,
                check = this.value.match(reg);
            if (check) {
                var index = this.value.indexOf(check[0]);
                this.value = this.value.replace(reg, "");
                $(this).textFocus(index);
            }
        });
	},
	init : function(){
		baseReg.checkName();
		baseReg.checkDataBaseInput();
	}
}
baseReg.init();
//===========================特殊字符验证End=================================