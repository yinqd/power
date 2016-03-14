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

String.prototype.startWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length){
		return false;
	}else{
		return this.substr(0,str.length)==str;
	}
}

//设置nav
function currentLink() {
	  var currentUrl=window.location.href;
	  if(sessionStorage.getItem('currentLi') &&localStorage.getItem('currentLi')!==undefined){
		  var role=sessionStorage.getItem('currentLi');
		  $('.head-new-nav li.nav_group').removeClass('current');
		  $('.head-new-nav li[role='+role+']').addClass('current');
	  }else{
		  //从老系统过来的url
		  $('.head-new-nav li a').each(function(){
			  var href=$(this).attr('href');
			  if(href&&href!='#'){
				 if(currentUrl==href){
					 var currentLi=$(this).parents('.nav_group')[0];
					 $(currentLi).addClass('current');
					 sessionStorage.setItem('currentLi',$(currentLi).attr('role'));
				 }
			  }
		  });
		  var currentLi=$('.head-new-nav li.current');
		  if(currentLi.length<1){
			  $($('li.nav_group')[0]).addClass('current');
		  }
	  }
	  var flag=true;
	  $('.head-new-nav li').on('click',function(){
		  if(flag){
			  var currentLi=$(this).parents('.nav_group')[0];
			  sessionStorage.setItem('currentLi',$(currentLi).attr('role'));
			  flag=false;
		  }
	  });
};
//创建菜单
function createMenu(data,rootUrl){
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
};

function convertMenuData(rows){
	 var platform = function(p){
			if(p == 1){
				return "/mind";
			}else if(p == 3){
				return "/scm_kry";
			}else if(p == 2){
				return "/b_kry";
			}else if(p == 5){
				return "/portalbiz";
			}else{
				//return "/ww"
				throw new Error("菜单未知参数p="+p);
			}
		}
	    var nodes = [];
	    for(var i=0; i<rows.length; i++){
	        var row = rows[i];
	        if (row.parentId == 0){
	            var role=0;
	            switch (row.name){
	                case '顾客':
	                    role='crm';
	                    break;
	                case '订单':
	                    role='booking';
	                    break;
	                case '营销':
	                    role='marketing';
	                    break;
	                case '报表':
	                    role='report';
	                    break;
	                case '设置':
	                    role='set';
	                    break;
	                case '库存':
	                    role='scm';
	                    break;
	                case '帮助':
	                    role='faq';
	                    break;
	            };
	            nodes.push({
	                id:row.id,
	                role:role,
	                name:row.name,
	                sort:row.sort,
	                parentId:row.parentId,
	                url:platform(row.platform)+row.url
	            });
	        }
	    }
	    var toDo = [];
	    for(var i=0; i<nodes.length; i++){
	        toDo.push(nodes[i]);
	    };
	    nodes.sort(function(x,y){return x.sort - y.sort});
	    while(toDo.length){ 
	        var node = toDo.shift();    // 父节点
	        // 得到子节点
	        for(var i=0; i<rows.length; i++){
	            var row = rows[i];
	            if (row.parentId == node.id){
	                var child = {
	                    id:row.id,
	                    name:row.name,
	                    parentId:row.parentId,
	                    sort:row.sort,
	                    url: platform(row.platform)+row.url
	                };
	                if (node.children){
	                    node.children.push(child);
	                    node.url='#';
	                } else {
	                    node.children = [child];
	                }
	                toDo.push(child);
	            }
	        }
	        toDo.sort(function(x,y){return x.sort - y.sort});
	    }
	    return nodes;
};

//页面初始化
$(function(){
	//添加页脚
	addFooter();
	//头部导航设置
	if(window.setMenu){
		setMenu(); 
	}

	//标签切换
	$(document).delegate(".switching-tab > li","click",function(){
		tabChange(this,$(this).parents(".switching-item").find(".switching-con"),"current");
	});
	//去掉a icon点击的时候的虚线框
	$(document).delegate("a[class^='icon']","click",function(e){
		var url = $(this).attr("href");
		if(url == "" || url == "#"){
			e.preventDefault();
		}
		$(this).blur(); 
	});
	$(document).delegate("a[href='#'],a[href=''],a[href='javascript:void(0)']","click",function(e){
			e.preventDefault();
	});
	//添加最小高度
	$("div[data-min-height]").each(function(){
		var defaultHight = window.innerHeight - $("#header").outerHeight() - $("#footer").outerHeight() - 60;
		var minHeight = $(this).attr("data-min-height") != "" ? $(this).attr("data-min-height") : defaultHight;
		$(this).css("min-height",minHeight + 'px');
	});
	//设置最大高度
	maxHeight();
	//检测浏览器版本 如果是ie8及以下提示信息
	detectionBrowser();
//	//左边栏加滚动条
//	$(".aside").each(function(){
//		var seniorSearchObj = ($("#link-seniorSearch").length > 0) ? $("#link-seniorSearch") : null;
//		var undoAllObj = ($("#undo-all").length > 0) ? $("#undo-all") : null;
//		var btnSearchObj = ($(this).find('.btn-search').length > 0) ? $(this).find('.btn-search').eq(0) : null;
//		$(this).wrapInner('<div class="aside-content" data-max-height=""></div>');
//		$(this).append('<div class="fixed-searchbtn"></div>');
//		var fixedSearchbtn = $(this).find('.fixed-searchbtn').eq(0);
//		if(seniorSearchObj != null){
//			seniorSearchObj.remove();
//			fixedSearchbtn.append(seniorSearchObj.clone(true));
//		}
//		if(undoAllObj != null){
//			undoAllObj.remove();
//			fixedSearchbtn.append(undoAllObj.clone(true));
//		}
//		if(btnSearchObj != null){
//			btnSearchObj.remove();
//			fixedSearchbtn.append(btnSearchObj.clone(true));
//		}
//	$(this).css("padding-bottom","100px");
//		maxHeight();
//	});
	
	//给body添加padding-top
//	addPaddingTop($("#header"));
	//绑定滚动条事件
	$(document).scroll(function(){
		rolling($("#nav-fixed"));
	});
	
	//折叠事件
	$('.collapse').on('hide.bs.collapse', function () {
	  $(this).prev().find("h3").find(".caret").toggleClass("caret-top");
	});
	$('.collapse').on('show.bs.collapse', function () {
	  $(this).prev().find("h3").find(".caret").addClass("caret-top");
	});
//	//对不支持Placeholder属性的浏览器进行优化
//	inputPlaceholder();
	//radio
	$(document).delegate(".radio > :radio","change",function(){
		radioChange(this,'radio-check');
	});
	//关联全选
	$(document).delegate(":checkbox:not([name^='switch'])","change",function(){
		if($(this).attr("data-checked-all")){
			var $obj = $("#" + $(this).attr("data-checked-all"));
			//关联全选操作
			associatedCheckAll(this,$obj);
		}else{
			//复选框操作
			checkboxChange(this,'checkbox-check');
		}
		
	});
	//全选
	$(document).delegate(":checkbox[data-all]","change",function(){
		var nameGroup = $(this).attr("data-all");
		//alert(nameGroup);
		checkAll(this,nameGroup);
	});
	//初始化 检查全选isCheckAll(e,nameGroup)
	/*
	$(":checkbox[data-all]").each(function(){
		var name = $(this).attr("data-all");
		isCheckAll(this,name);
	});
	*/
	//限制textarea的字符串长度
	$(document).delegate("textarea[maxlength]","keyup change",function(e){
		var len = $(this).attr("maxlength");
		CutStrLength(this,len);
	});
	//限制input的字符串长度
	$(document).delegate("input[maxlength]","keyup change",function(e){
		var len = $(this).attr("maxlength");
		CutStrLength(this,len);
	});
	//限制字符的输入格式 将字符串格式的正则表达式传入属性data-type=""
	$(document).delegate("input[data-type]","keyup change",function(e){
		var reg = eval($(this).attr("data-type"));
		limitInputFormat(this,reg);
		if($(this).attr("maxlength")){
			var len = $(this).attr("maxlength");
			CutStrLength(this,len);
		}
	});
	//限制最小输入
	$(document).delegate("input[min]","keyup change",function(e){
		var num = $(this).attr("min")*1;
		minInput(this,num);
	});
	//限制最大输入
	$(document).delegate("input[max]","keyup change",function(e){
		var num = $(this).attr("max")*1;
		maxInput(this,num);
	});
    //必填验证
	
	$(document).delegate("input[required]","blur",function(e){
		var $val = $(this).val();
		var $label = $(this).parents(".control-label-con").prev(".control-label");
		
		//为空验证
		if($val == ""){
			emptyPrompt(true,$label,"wrong");
		}else{
			emptyPrompt(false,$label,"wrong");
		}
	});
	//绑定开关
	creatSwitch($(":checkbox[name^='switch-checkbox']"));
	
	//创建select
	selectControl($('select'));
	//select control 效果 点击显示下拉列表
	$(document.body).delegate(".select-control:not('.disabled')","click",function(){
	  
	  var ulObj = $(this).next("ul");
	  //判断ul是否是隐藏的，如果是就显示，否则隐藏
	  if(ulObj.is(":hidden")){
		  $(".select-group > ul").hide();
		  $(".select-control").removeClass("select-control-arrowtop");
		  ulObj.show();
		  $(this).addClass("select-control-arrowtop");
	  }else{
		  ulObj.hide();
		  $(this).removeClass("select-control-arrowtop");
	  }
	  
	});
	//select control 效果 点击下拉列表选项选中
	$(document.body).delegate(".select-group > ul > li","click",function(){
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
	$(document).delegate("body","click",function(e){
		var target = $(e.target); 
		if(target.closest(".select-group").length == 0){ 
			$(".select-group > ul").hide(); 
			$(".select-group > .select-control").removeClass("select-control-arrowtop");
		} 
	});
//	//任意点击空白处 隐藏popover弹出框
//	$(document).bind("click",function(e){ 
//		var target = $(e.target); 
//		//当target不在popover/coupons-set 内是 隐藏
//		if(target.closest(".popover").length == 0 && target.closest(".coupons-set").length == 0){ 
//			$(".popover").hide(); 
//		} 
//	}); 
	//关闭弹框 x号
	$(document).delegate(".close","click",function(e){
		var popoverObj = $(e.target).closest(".panel-popover");
		if(popoverObj){
			hideLayer();
			popoverObj.hide();
			clearData(popoverObj);
		}
	});
	//关闭弹框 按钮
	$(document).delegate(".btn-shut-down","click",function(e){
		var popoverObj = $(e.target).closest(".panel-popover");
		if(popoverObj){
			//alert(popoverObj.html());
			hideLayer();
			popoverObj.hide();
		}
	});
	//关闭弹框 取消按钮
	$(document).delegate(".btn-cancel","click",function(e){
		var popoverObj;
		if($(e.target).closest(".panel-popover").length > 0){
			popoverObj = $(e.target).closest(".panel-popover");
		}else if($(e.target).closest(".popover").length > 0){
			popoverObj = $(e.target).closest(".popover");
		}else{
			return;
		}
		hideLayer();
		popoverObj.hide();
		clearData(popoverObj);
	});
	//清空搜索框里的数据
	$(document).delegate(".search-box .close","click",function(){
		var inputObj = $(this).parents(".search-box").find(":text");
		inputObj.val("");
		if(inputObj.parent().is(".placeholderBox")){
			alert("close");
			inputObj.parent().find(".holder").show();
		}
	});
	//初始化日历控件
	datepickerInitialize();
	//列表页查询栏全部清空操作
	$("#undo-all").on("click",function(e){
//		var selectControl = $(this).parent().find(".select-control"),
//			selectTxt = "";
//		if(selectControl.parent().find("select").length > 0){
//			selectTxt = selectControl.parent().find("select").eq(0).find("option").eq(0).text();
//		}
		e.preventDefault();
		clearData($(this).parents('.aside'));
//		$(".datepicker-start").next(".close").click();
//		selectControl.find("em").text(selectTxt);
		if(!isPlaceholder()){
			JPlaceHolder.init(); 
		}
	});
	//列表页加鼠标移上去反色
	$(document).delegate(".table > tbody > tr","mouseover",function(){
		$(this).css("background-color","#e1f0fe");
	});
	$(document).delegate(".table > tbody > tr","mouseout",function(){
		$(this).css("background-color","#fff");
	});
	//当前页面状态
//	$(".nav > li").find(".dropdown-menu").hide();
//	currentLink($(".nav > li"));
//	showNav($(".nav > li,.dropdown-submenu"),".dropdown-menu","open");
	
	//ajax loading
//	$(document).delegate(".btn-search","click",function(){
//		$(document).ajaxStart(function(){ showLoading();});
//		$(document).ajaxStop(function(){ hideLoading();});
//	});
	$(document).ajaxStop(function(){
		if($(document).scrollTop() == 0 ){
			$(".nav-tabs").eq(0).css("margin-top","0px");
		}
	});
	
});

/**
*    checkbox               //模拟checkbox功能
*    @param  object         element     需要操作对象
*    @param  className      class       切换的样式
**/
function checkboxChange(element,className){
	if(element.readOnly){return false;}
	if(element.checked){
		$(element).parent().addClass(className);
	}else{
		$(element).parent().removeClass(className);
	}
}
/**
*    checked all            //全选
*    @param  object         e           需要操作对象
*    @param  nameGroup      string      checkbox name
**/
function checkAll(e,nameGroup){
	if(e.checked){
		//alert($("[name='"+ nameGroup+"']:checkbox"));
		$("[name='"+ nameGroup+"']:checkbox").not(":disabled").each(function(){
			this.checked = true;
			checkboxChange(this,'checkbox-check');
		});
	}else{
		$("[name='"+ nameGroup+"']:checkbox").not(":disabled").each(function(){
			this.checked = false;
			checkboxChange(this,'checkbox-check');
		});
	}
	checkboxChange(e,'checkbox-check');
}
/**
*    is checked all                    //检查是不是全选
*    @param  object         e          this
*    @param  nameGroup      str        关联的 checkbox name
**/
function isCheckAll(e,nameGroup){
	var flag = true;
	$(":checkbox[name='"+ nameGroup +"']").not(":disabled").each(function(){
		if(!this.checked){
			flag = false;
		}
	});
	if(flag){
		e.checked = true;
		$(e).parent().addClass("checkbox-check");
	}
}
/**
*    associatedCheckAll     //关联全选
*    @param  object         e           需要操作对象
*    @param  jqueryObj      $obj        全选对象
**/
function associatedCheckAll(e,$obj){
	var flag = true;
	var $name = $(e).attr("name");
	checkboxChange(e,'checkbox-check');
	$("[name='"+ $name +"']:checkbox").not(":disabled").each(function(){
		if(!this.checked){
			flag = false;
		}
	});
	$obj.get(0).checked = flag;
	checkboxChange($obj.get(0),'checkbox-check');
}
/**
*    radio                  //模拟radio功能
*    @param  object         element     需要操作对象
*    @param  className      class       切换的样式
**/
function radioChange(element,className){
	if(element.checked){
		var $name = $(element).attr("name");
		$(":radio[name='" + $name + "']").each(function(){
			$(this).parent().removeClass(className);
		});
		$(element).parent().addClass(className);
		
	}
}

/**
*    delete element         //移除一项
*    @param  jqueryObject   $obj     需要操作对象
**/
function removeElement($obj,e){
	$obj.remove();
	if ( e && e.preventDefault ){
		//阻止默认浏览器动作(W3C) 
		e.preventDefault();
	}else{
		//IE中阻止函数器默认动作的方式 
		window.event.returnValue = false; 
	}
	
}
/**
*    hide element           //隐藏元素
*    @param  jqueryObject   $objs     需要操作对象
**/
function hideElement($objs){
	$objs.hide();
	//evt.preventDefault();
}
/**
*    show element           //显示元素
*    @param  jqueryObject   $objs     需要操作对象
**/
//function showElement($objs){
//	$objs.show();
//}
//显示遮罩层
function showLayer(){
	if($("#layer").lenght > 0){
		$("#layer").show();
	}else{
		$(document.body).append('<div id="layer"></div>');
		$("#layer").show();
	}
//	$('html').css({"overflow-y":"hidden"});//来回切换会引起页面左右晃动
}
//隐藏遮罩层
function hideLayer(){
	$("#layer").hide();
//	$('html').css({"overflow-y":"scroll"});
}
/**
*    addPaddingTop          //给body添加padding-top
*    @param  jqueryObject   $obj     需要操作对象
**/
//function addPaddingTop($obj){
//	if($obj.length > 0){
//		var h = $obj.outerHeight() + 'px';
//		$(document.body).css("padding-top",h);
//	}
//}
/**
*    addFooter          //给body添加页脚
**/
function addFooter(){
	if($("#footer").length < 1){
		$("body").append('<div id="footer" class="footerPs">©2012 keruyun.com 京ICP备12039470号</div>');
	}
//	var dH = parseInt($(document).height()),
//		wH = parseInt($(window).height());
//	console.log("dh = " + dH + " wh ==" + wH);
//	if(dH < wH){
//		alert("min");
//		$("#footer").addClass("footerPs");
//	}else{
//		alert("max");
//		if($("#footer").hasClass("footerPs")){
//			$("#footer").removeClass("footerPs");
//		}
//		
//	}
}
/**
*    rolling                //滚动条滚动的时候发生
*    @param  jqueryObject   $obj     需要操作对象
**/
function rolling($obj){
	var top = 0; 
    var h = $obj.outerHeight();
    var titleObj = $(".article-header").eq(0);
    $(document).on('scroll', function () {
        top = $(document).scrollTop();
//		console.log("titleObjtop=="+titleObj.offset().top);
        if (top > h) {
            titleObj.addClass("article-header-fixed");
        } else {
            titleObj.removeClass("article-header-fixed");
        }
    });
	
}
//模拟select控件 @param $selects:select元素
function selectControl($selects){
	var len = $selects.length;
	for(var i=0;i<len;i++){
		
		var $ele = $selects.eq(i);//当前select
		//判断是否有默认值，如果有，设置选中
		if($ele.attr("data-value")){
			$ele.val($ele.attr("data-value"));
		}
		var txt = $ele.find("option:selected").text();//选中项文本
		//alert(txt);
		if(!$ele.is(".select-style")){//如果不存在这个class
			var optionObjs =  $ele.find("option");
			var html = '<div class="select-control">';
			var ul = '<ul>';
			for(var j=0,oLen=optionObjs.length;j<oLen;j++){
				ul += '<li>' + optionObjs.eq(j).text() + '</li>';
			}
			
			ul += '</ul>';
			html += '<em>' + txt + '</em></div>' + ul;
			$ele.addClass("select-style").wrap('<div class="select-group"></div>').before(html);
		}else{//如果存在class select-style 重置当前选中的文本
			$ele.parent().find(".select-control > em").text(txt);
		}
		
	}
}
//限制字符串的长度
/**
 * 限制字符串的长度
 * @param obj               
 * @param Ilength                     number                     限制字符长度
 * @param isbyte                      boolean                    true为按字符串计算 false按字算
 */
function CutStrLength(obj,Ilength,isbyte){ //alert(0);
	var str = obj.value;  //字符串
	var len=0;            //累计字符长度 
	var okLen=0 ;         //实际字符长度 中文为1个字符
	//计算字符长度sss
	
	if(isbyte != null || isbyte == true){
		for(var i=0,len1=str.length;i<len1;i++) { 
			if(str.charCodeAt(i)>255){  
				len+=2;  
			}else  {
				len+=1; 
			}
			
			okLen+=1; 
			if(len >= Ilength){
				break;
			}
		}
		obj.value = str.substring(0,okLen);//超过长度禁止输入
	}else{
		if(obj.value.length > Ilength){
			obj.value = str.substring(0,Ilength);//超过长度禁止输入
		}
	}
} 
//检测字符串
//function checkFieldLength($e,fieldDesc,fieldLength){  
//	var str=$e.val();  
//	var theLen=0;  
//	var teststr='';  
//	//var reg1 = /^[1-9]+[0-9]*]*$/;
//	var $showObj = $e.parent().parent().find(".wrong");
//	
//	//只能输入数字
//	inputNumber($e.get(0));
//	
//	//计算字符串长度
//	for(var i=0;i<str.length;i++)  
//	{  
//		teststr=str.charAt(i);  
//		if(str.charCodeAt(i)>255)  
//		theLen=theLen+2;  
//		else  
//		theLen=theLen+1;  
//	}
//	if(theLen>fieldLength){ // 检测字符串长度
//		$showObj.show().text(fieldDesc);  
//		elementFadeOut($showObj);
//		$e.val(CutStrLength(str,fieldLength));
//	}
//}
//只能输入数字
//function inputNumber(o){
//	var str = o.value;
//	//替换非数字字符为空
//	o.value = str.replace(/[^\d]/g,'');
//}
/**
 * 限制输入字符的格式,不符合格式的字符不允许输入
 * @param o                  object             当前对象input
 * @param reg                reg                正则表达式          
 */
function limitInputFormat(o,reg){
	var str = o.value;
	//替换不符合格式的字符为空
	o.value = str.replace(reg,'');
}
/**
 * 限制最小输入数字
 */
function minInput(o,min){
	var num = o.value;
	if(num*1 < min){
		o.value = "";
	}
}
/**
 * 限制最大输入数字
 */
function maxInput(o,max){
	var num = o.value;
	if(num*1 > max){
		o.value = "";
	}
}
//如果显示1秒以后隐藏
//function elementFadeOut($obj){
//	if($obj.is(":visible")){
//		setTimeout(function(){
//			$obj.hide();
//		},1000);
//	}
//}
//选择月显示天数 @param $e:月select;$obj:日select;date:默认日期
function dateSelect($e,$obj){
	var $val = $e.val();
	creatDateOption(returnDateLen($val),$obj);
}
//返回每个月日期天数 @param $val:月select选中值
function returnDateLen($val){
	var date = new Date();
	var year = date.getFullYear();
	var len = 0;//如果没有选中月返回0
	
	if($val == 1 || $val == 3 || $val == 5 || $val == 7 || $val == 8 || $val == 10 || $val == 12){
		len = 31;
	}else if($val == 4 || $val == 6 || $val == 9 || $val == 11){
		len = 30;
	}else if($val == 2){
		if(year%400==0||(year%4==0&&year%100!=0)){
			len = 29;
		}else{
			len = 28;
		}
	}
	return len;
}
//创建日期项 @param len:返回创建的天数；$obj:被创建项的select
function creatDateOption(len,$obj){
	var $html = "";
	var $items = "";
	var dateVal = $obj.attr("data-value");//获取默认选中项
	var txt = "";
	
	if(len > 0){
		for(var i=0;i<len;i++){
			$html += "<option value='" + (i+1) + "'>" + (i+1) + "</option>";
			$items += "<li>" + (i+1) + "</li>";
		}
	}else{
		$html += "<option>日</option>";
		$items += "<li>日</li>";
	}
	
	$obj.empty();
	$obj.append($html);
	$obj.val(dateVal);//设置选中项
	txt = $obj.find("option:selected").text();
	$obj.prev("ul").empty();
	$obj.prev("ul").append($items);
	$obj.parent().find(".select-control em").text(txt);
}
//生日验证 暂时不用
//function birthdayValidation($e){
//	var $id = $e.attr("id");
//	//
//	if($id == "birthday-start-month"){
//		var endMonth = $("#birthday-end-month");
//		var endDate = $("#birthday-end-date");
//		//如果重新选择起始月将重置结束月
//		endMonth.val("月");
//		endMonth.trigger("change");
//		//endDate.val("日");
//	}else{
//		var startMonth = $("#birthday-start-month");
//		var startDate = $("#birthday-start-date");
//		var startMonthVal = startMonth.val();
//		var startDateVal = startDate.val();
//		var endMonthVal = $e.val();
////		alert(startMonthVal);
//		if(startMonthVal == "月" || startMonthVal < endMonthVal){
//			//event.preventDefault();
//			
//			alert("请您先选择开始月份,并且结束日期不能比开始日期小哦");
//			$e.val("月");
//			startDate.empty();
////			alert(startDate);
//			startDate.append("<option>日</option>");
//			//alert(event.type); 
//			//$e.one("change",functio);
//			//$e.trigger("change");
//			//return false;
//		}
//		
//	}
//}
//快捷选择
//function quickSelect($obj,$start,$end){
//	var dateObj = new Date();
//	var year = dateObj.getFullYear();
//	var month = ((dateObj.getMonth() + 1) < 10) ? "0" + (dateObj.getMonth() + 1) : (dateObj.getMonth() + 1);
//	var day = (dateObj.getDate() < 10) ? "0" + dateObj.getDate() : dateObj.getDate();
//	var startVal = ($start.val()) ? $start.val() : (year+'-'+month+'-'+day);
//	var startValArr = startVal.split("-");
//	var startYear = parseInt(startValArr[0],10);
//	var startMonth = parseInt(startValArr[1],10);
//	var startDay = parseInt(startValArr[2],10);
//	var step = parseInt($obj.attr("data-month"));
//	var endYear,endMonth,endDay;
//
//	if(startMonth+step > 12){
//		//大于12个月需加1年
//		endYear = startYear+1;
//		endMonth = (startMonth+step-12 < 10) ? '0' + (startMonth+step-12) : (startMonth+step-12);
//	}else{
//		//小于12个月
//		endYear = startYear;
//		endMonth = (startMonth+step < 10) ? '0' + (startMonth+step) : (startMonth+step);
//	}
//	if(startDay-1 == 0){//等于最后一天的时候
//		if(endMonth == "01" || endMonth == "03" || endMonth == "05" || endMonth == "07" || endMonth == "08" || endMonth == "10" || endMonth == "12"){
//			endDay = 31;
//		}else if(endMonth == "04" || endMonth == "06" || endMonth == "09" || endMonth == "11"){
//			endDay = 30;
//		}else{
//			if(year%400==0||(year%4==0&&year%100!=0)){
//				endDay = 29;
//			}else{
//				endDay = 28;
//			}
//		}
//	}else{
//		//alert(startDay);
//		endDay = ((startDay-1) < 10) ? "0" + (startDay-1) : (startDay-1);
//		//alert(endDay);
//	}
//	$start.val(startVal);
//	$end.val(endYear + '-' + endMonth + '-' + endDay);
//	//$obj.addClass("red").siblings().removeClass("red");
//}
//switch style
function creatSwitch($checkElements){
	var len = $checkElements.length;
	var browser=navigator.appName;
	//如果是ie浏览器并且小于ie9不加载
	if(browser=="Microsoft Internet Explorer"){
		var b_version=navigator.appVersion;
		var version=b_version.split(";");
		var trim_Version=version[1].replace(/[ ]/g,"");
		if(trim_Version=="MSIE8.0" || trim_Version=="MSIE7.0" || trim_Version=="MSIE6.0"){
			return false;
		}
		
	}
	for(var i=0;i<len;i++){
		
		var $ele = $checkElements.eq(i);
		var $id = $ele.attr("id");
		if(!$ele.is(".check-ios")){
			$ele.addClass("check-ios").wrap('<div class="switch-holder"></div>').after('<label for="' + $id + '"></label><span></span>');
		}
		//$ele.after('<label for="' + $id + '"></label><span></span>');
	}
	//alert(len);
}
///**
// * 对不支持 placeholder 占位符属性的浏览器进行优化
// */
//function inputPlaceholder(){
//	if(!isPlaceholderSupport()){
//		//初始化
//		$(":text").each(function(){
//			var defaultVal = ($(this).attr("placeholder")) ? $(this).attr("placeholder") : "";
//			
//			if($(this).val() == ""){
//				$(this).val(defaultVal);
//			}
//		});
//		//得到焦点
//		$(document.body).delegate(":text","focus",function(){
//			var defaultVal = ($(this).attr("placeholder")) ? $(this).attr("placeholder") : "";
//	
//			if($(this).val() == defaultVal){
//				$(this).val('');
//			}
//		});
//		//失去焦点
//		$(document.body).delegate(":text","blur",function(){
//			var defaultVal = ($(this).attr("placeholder")) ? $(this).attr("placeholder") : "";
//			var newVal = $(this).val();
//			
//			if(newVal.length > 0 && newVal != defaultVal){
//				$(this).val(newVal);
//			}else{
//				$(this).val(defaultVal);
//			}
//		});
//	}
//	//判断浏览器是否支持 placeholder 占位符属性
//	function isPlaceholderSupport() {  
//	    return 'placeholder' in document.createElement('input');  
//	}
//}
//上传文件改变时
//function fileChange($obj1,$Obj2){
//	var $url = $obj1.val();
//	$Obj2.val($url);
//}
//js本地图片预览，兼容ie[6-9]、火狐、Chrome17+、Opera11+、Maxthon3
///*
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
				//document.getElementById(imgPreviewId).style.display = "none";
				//document.getElementById(divPreviewId).innerHTML = "不支持Safari6.0以下浏览器的图片预览!";
            }  
			//alert(fileObj.files[0]);
			//$("#" + fileUrlObj).val(fileObj.value);
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
					//newPreview.style.marginLeft = "140px";
                }  
//				alert(document.selection.createRange().text);
//				alert(divPreviewId+"New");
                newPreview.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";                              
                var tempDivPreview=document.getElementById(divPreviewId);  
                tempDivPreview.parentNode.insertBefore(newPreview,tempDivPreview);  
                tempDivPreview.style.display="none";                      
            }  
			//alert(fileObj.value);
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
//单项选择
function selectOne($item,$items,className){
	$items.removeClass(className);
	$item.addClass(className);
}
/**
 * clearData            清空表单
 * @param               object        formObj
 */
function clearData(formObj){
	if($(formObj).find("form").length > 0){
		$(formObj).find("form").each(function(){
			this.reset();
		});
	}else{
		return;
	}
	$(formObj).find(":checkbox:not([name^='switch-checkbox'])").each(function(){
		if(this.checked){
			$(this).parent().addClass("checkbox-check");
		}else{
			$(this).parent().removeClass("checkbox-check");
		}
	});
	$(formObj).find(":radio").each(function(){
		if(this.checked){
			$(this).parent().addClass("radio-check");
		}else{
			$(this).parent().removeClass("radio-check");
		}
	});
	$(formObj).find("select").each(function(){
		$(this).parent().find("ul > li").eq(0).trigger("click");
	});
	//移除错误提示
	$(formObj).find("label").each(function(){
		if($(this).is(".wrong")){
			$(this).removeClass("wrong");
		}
	});
	//移除名称重复的错误提示
	$(formObj).find("div.wrong").each(function(){
		$(formObj).find("div.wrong").remove();
	});
	//重置编辑器内容
	$(formObj).find("div[id^='myEditor']").each(function(){
		var editorId = $(this).attr("id");
		var um = UM.getEditor(editorId);
		um.ready(function(){
			 //设置编辑器的内容
			 um.setContent('');
		});
	});
	//图片预览 重置图片
	if($(formObj).find(".img-responsive").length > 0 && $(formObj).find(".clearImgUpload").length > 0){
		$(formObj).find(".clearImgUpload").trigger("click");
	}
//	$(formObj).find(".img-responsive").each(function(i){
//		$(this).attr("src","themes/style/img/default.jpg");
//	});

	//重置选择门店控件
	$('#cmId-all-ul input[type=checkbox]').each(function(){
		if(!$(this).attr('checked')){
			$(this).click();
		}
	});
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
//		$("#divPreview").empty().append(defaultImg);
		//IE里js不能直接清空value;
		$("#" + fileInput).replaceWith(defaultFileInput);
//		alert($("#" + previewImg).parent().attr("id")+"New");
		$("#"+previewDiv+"New").remove();
		$("#" + previewImg).parent().css("display","block");
//		alert($("#" + fileInput).val());
//		alert(defaultFileInput);
	}else{
		$("#" + previewImg).attr("src",defaultUrl);
	}
}

/**
 * clearEditor          清空富文本编辑器 如果传入的参数是string 则参数为被操作元素的id名；object 则是 #+id; jquery object 则是$(obj);
 * @param               string        editorObj id   
 */
function clearEditor(editorObj){
	var um = UM.getEditor(editorObj);
	//对编辑器的操作最好在编辑器ready之后再做
	um.ready(function() {
		//设置编辑器的内容
		um.setContent('');
	});
}
//回调函数 是否为空
function isEmpty($obj){
	var thisValue = $.trim($obj.val());//输入的信息
	var thisPlaceholder = ($obj.attr("placeholder")) ? $.trim($obj.attr("placeholder")) : "";//占位符文本
    if(!thisValue || thisValue == thisPlaceholder){
    	//如果为空或等于占位符文本
		return true;
	}else{
		//如果不为空
		return false; 
	}
}
//添加取消错误提示信息
function emptyPrompt(flag,$objLabel,className){
	//判断是否有未填项
	//alert($objLabel.html());
	if(flag){
		if(!$objLabel.hasClass(className)){//判断是否已存在错误提示信息 如不存在
			$objLabel.addClass(className);//添加错误提示信息
		}
	}else{
		if($objLabel.hasClass(className)){//检查是否存在错误提示信息 如存在
			$objLabel.removeClass(className);//移除错误提示信息
		}
	}
}
//如果模块有未填项 提示错误信息
function promptWrong(flag,$obj,str){
	var wrongStr = '<span class="wrong">' + str + '</span>';//大标题提示信息 
	if(flag){//有未填项
		//给模块标题栏添加错误提示信息
		if($obj.find('.wrong').length < 1){//判断是否已含有错误提示信息
			//添加模块错误提示信息
			$obj.append(wrongStr);
		}
		
	}else{//填写正确
		//如果已含有错误提示信息 去掉错误提示信息
		if($obj.find('.wrong').length > 0){//判断是否已含有错误提示信息
			//如果已含有 将错误提示信息 移除
			$obj.find('.wrong').remove();
		}
	}
}
//检测浏览器版本 如果是ie8及以下提示信息
function detectionBrowser(){
	var browserVersion= window.navigator.userAgent.toUpperCase();
	//隐藏提示信息
	//$("#browser-prompt").hide();
	if(browserVersion.indexOf("MSIE")>-1){
		//如果是ie浏览器检测是否是ie6 ie7 ie8
		if(browserVersion.indexOf("MSIE 6")>-1 || browserVersion.indexOf("MSIE 7")>-1 || browserVersion.indexOf("MSIE 8")>-1){
			//判断提示信息元素是否已经存在
			if($("#browser-prompt").length < 1){
				//不存在 添加
				$(document.body).append('<div id="browser-prompt"><div></div><p class="center">您当前的浏览器版本过低，有些功能不被支持，为了不影响您的正常使用，建议升级浏览器版本，或者下载<a href="http://www.firefox.com.cn/download/" target="_blank">火狐浏览器</a></p><span class="cancel">×</span></div>');
			}
			//显示提示信息
			$("#browser-prompt").show();
			$("#browser-prompt > .cancel").bind("click",function(){
																$("#browser-prompt").slideUp();
																 });
			/*
			setTimeout(function(){
				$("#browser-prompt").hide();
			},10000);
			*/
		}
	}
 }
//初始化select控件元素 设置被选中项 @param selectId:select元素;val:默认被选中的值
function selectControlsInitialize(selectId,v){
	$("#" + selectId).val(v);
}
/*
 * 返回日期 格式为：yyyy-mm-dd
 */
function returnDate(y,m,d){
	var check = function(n){
			if(n*1 < 10){
				return '0'+n;
			}else{
				return n;
			}
		}
	return check(y) + '-' + check(m) + '-' + check(d);
}
//初始化日历控件 给起始日期的input添加“datepicker-start”class,添加自定义属性"data-for-element"=结束日期input的id
function datepickerInitialize(){
	$(".datepicker-start").each(function(){
		var endDayObjId = $(this).attr("data-for-element");
		var thisObject = null;
		var dateType = 0;
			dateType = $(this).attr("data-date-type");
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		var date = d.getDate() + 1;
		//如果dateType为1，就设定开始日期为明天
		if(dateType == 1){
			thisObject = $(this)
			.datetimepicker({
				format: "yyyy-mm-dd",
		        language:  'zh-CN',
		        weekStart: 1,
		        todayBtn:  1,
				autoclose: true, 
				todayHighlight: true,
				startView: 2,
				minView: 2,
				//maxView: 2,
				startDate: returnDate(year,month,date),
				forceParse: true
		    });
		}else{
			thisObject = $(this)
			.datetimepicker({
				format: "yyyy-mm-dd",
		        language:  'zh-CN',
		        weekStart: 1,
		        todayBtn:  1,
				autoclose: true,
				todayHighlight: true,
				startView: 2,
				minView: 2,
				//maxView: 2,
				forceParse: true
		    });
		}
		thisObject.on("changeDate",function(ev){
			var value = $(this).val();
			
			//清除上一次操作;
			$('#' + endDayObjId).datetimepicker("remove");
			$('#' + endDayObjId).val("");
			
			//重新初始化结束时间 开始日期之前不可选
			$('#' + endDayObjId).datetimepicker({
				format: "yyyy-mm-dd",
				language:  'zh-CN',
				weekStart: 1,
				todayBtn:  1,
				autoclose: true,
				todayHighlight: true,
				startView: 2,
				minView: 2,
				startDate: value,
				//maxView: 2,
				forceParse: true
			});
		});
		//清空开始日期 结束日期为空 不可选
		thisObject.parents(".search-box").find(".close").bind("click",function(){
			$('#' + endDayObjId).datetimepicker("remove");
			$('#' + endDayObjId).parents(".search-box").find(".close").click();
		});
	});
	//结束日期
	$(".datepicker-end").each(function(){
		var startDayObjId = $("#"+$(this).attr("data-for-element"));
		var $value = $.trim(startDayObjId.val());
		if($value){
			$(this).datetimepicker({
				format: "yyyy-mm-dd",
				language:  'zh-CN',
				weekStart: 1,
				todayBtn:  1,
				autoclose: true,
				todayHighlight: true,
				startView: 2,
				minView: 2,
				startDate: $value,
				//maxView: 2,
				forceParse: true
			});
		}
		
	});
	//清理IE9以下placeholder占位符问题
	if(window.JPlaceHolder){
		cleartJplaceholder("input.datepicker-start");
		cleartJplaceholder("input.datepicker-end");
//		$(document).delegate("input.datepicker-start","change",function(){
//			if(!$(this).attr("placeholder")){return;}
//			var value = $(this).val(),txt=$(this).attr("placeholder");
//			if(value && value != txt){
//				$(this).parent().find(".holder").hide();
//			}else if(!value || value == txt){
//				$(this).val("");
//				$(this).parent().find(".holder").show();
//			}
//		});
//		$(document).delegate("input.datepicker-start","change",function(){
//			if(!$(this).attr("placeholder")){return;}
//			var value = $(this).val(),txt=$(this).attr("placeholder");
//			if(value && value != txt){
//				$(this).parent().find(".holder").hide();
//			}else if(!value || value == txt){
//				$(this).val("");
//				$(this).parent().find(".holder").show();
//			}
//		});
	}
	
//	
}
/**
 * 清理IE9以下placeholder占位符
 * @expression {string} 
 */
function cleartJplaceholder(expression){
	$(document).delegate(expression,"change",function(){
		if(!$(this).attr("placeholder")){return;}
		var value = $(this).val(),txt=$(this).attr("placeholder");
		if(value && value != txt){
			$(this).parent().find(".holder").hide();
		}else if(!value || value == txt){
			$(this).val("");
			$(this).parent().find(".holder").show();
		}
	});
}
$.ajaxSetup({
		contentType : "application/x-www-form-urlencoded;charset=utf-8",
		complete : function(xhr, textStatus) {
			//session timeout
			if (xhr.status == 911) {
				window.location = _loginUrl;//返回应用首页
				return;
			}
		}
	});
var EnumUtil = {};
EnumUtil.getViewValue = function(enumArray, backValue) {
	var e = null;
	for (var i = 0; i < enumArray.length; i++) {
		e = enumArray[i];
		if (e.backValue == backValue) {
			return e.viewValue;
		}
	}
	return backValue;
};

/**
 * 显示隐藏菜单 鼠标移上去的元素 要显示的元素 要添加样式的元素 样式名
 */
function showMenu(objs,showStr){
	var objs = $(objs);
	//当鼠标移到每一个的时候执行
	objs.each(function(){
		var showObj = $(this).find(showStr);
		var flag = false;
		$(this).mouseover(function(){
			flag = true;
			showObj.fadeIn("slow");
		});
		$(this).mouseout(function(){
			setTimeout(function(){
				if(flag == false){
					showObj.fadeOut("slow");
				}
			},300);
			
			flag = false;
		});
		showObj.mouseover(function(){
			flag = true;
		});
		showObj.mouseout(function(){
			setTimeout(function(){
				if(flag == false){
					showObj.fadeOut("slow");
				}
			},300);
			flag = false;
		});
	});
	
}
/**
 * 显示导航 鼠标移上去的元素 要显示的元素 要添加样式的元素 样式名
 */
function showNav(overObjs,showObj,className){
	var overObjs = $(overObjs);
	//当鼠标移到每一个的时候执行
	overObjs.each(function(){
		var flag = false;
		var that = $(this);
		var showObj = that.find(showObj);
		that.mouseover(function(){
			flag = true;
			that.addClass(className);
		}).mouseout(function(){
			setTimeout(function(){
				if(flag == false){
					that.removeClass(className);
				}
			},300);
			
			flag = false;
		});
		showObj.mouseover(function(){
			flag = true;
		}).mouseout(function(){
			setTimeout(function(){
				if(flag == false){
					that.removeClass(className);
				}
			},300);
			flag = false;
		});
	});
	
}
//返回当前时间
function getNewDate(s){
	var time = "";
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var date = d.getDate();
	var str = s == null ? "." : s;
	
	function charset(number){
		if(number < 10){
			number = "0" + number;
		}
		return number;
	}
	return time = year + str + charset(month) + str + charset(date);
}
/**
 * 加操作
 * @param $obj      jquery object         被加的元素
 * @param step      number                递增
 * @parem maxNum    number                最大值
 */
function plusFun($obj,step,maxNum,evt){
	var oldNumber = $obj.val()*1;
	var newNumber;
	
	//如果当前值是最大值 返回
	if(oldNumber == maxNum){return;}
	newNumber = (oldNumber + step) > maxNum ? maxNum : oldNumber + step;
	
	$obj.val(newNumber);
}
/**
 * 减操作
 * @param $obj      jquery object         被减的元素
 * @param step      number                递增
 * @parem minNum    number                最小值
 */
function minusFun($obj,step,minNum){
	var oldNumber = $obj.val()*1;
	var newNumber;
	
	//如果当前值是最小值 返回
	if(oldNumber == minNum){return;}
	newNumber = (oldNumber - step) < minNum ? minNum : oldNumber - step;
	
	$obj.val(newNumber);
}
/**
 * 显示提示信息 3秒后隐藏
 * @param msg              string                  需要显示的字符串
 * @param data             object                  数据对象 可以传入需要显示的位置
 */
function promptMessage(msg,data){
	if($("#promptMessage").length < 1){
		var html = '<div id="promptMessage" style="display:none;"></div>';
		$("body").append(html);
	}
	var $obj = $("#promptMessage");
	$obj.html(msg);
	if(data == null){
		data = {
			left:'50%',
			marginLeft:'-' + $("#promptMessage").outerWidth()/2, 
			top:'70%',
			marginTop:'143px'
			}
	}
	$obj.show().css({"left":data.left,"margin-left":data.marginLeft,"top":data.top,"margin-top":data.marginTop});
	setTimeout(function(){
		$obj.fadeOut();			
	},3000);
}

/**
 * 序列化form
 * @param formId 
 * @returns
 */
function serializeFormById(formId){
	beforeSerialize(formId);
	var ret=$("#"+formId).serialize();
	afterSerialize(formId);
	return ret;
}

/**
 * 调用$("#"+formId).serialize()方法前调用，用于兼容查询时ie8,9不支持html5 placeholder问题
 * @param formId
 */
function beforeSerialize(formId){
	$("#"+formId+" input[placeholder]").each(function(i,e){
		$this=$(this);
		var placeHolder=$this.attr("placeholder");
		var value=$this.val();
		if(placeHolder==value){
			$this.attr("isChange",true);
			$this.val("");
		}
	});
}

/**
 * 调用$("#"+formId).serialize()方法后调用，用于兼容查询时ie8,9不支持html5 placeholder问题
 * @param formId
 */
function afterSerialize(formId){
	$("#"+formId+" input[placeholder]").each(function(i,e){
		$this=$(this);
		var placeHolder=$this.attr("placeholder");
		var value=$this.val();
		var isChange=$this.attr("isChange");
		if(value=="" && isChange){
			$this.removeAttr("isChange");
			$this.val(placeHolder);
		}
	});
}

function EnumWrapper(enumJsonString){
	this.EnumObj=jQuery.parseJSON(enumJsonString);
	for(var name in this.EnumObj){
		this[name]=this.EnumObj[name];
	}
	if(typeof EnumWrapper._init=="undefined"){
		EnumWrapper.prototype.getViewValue=function(backValue){
			var enumObj=this.EnumObj;
			for(var propName in enumObj){
				var obj=enumObj[propName];
				if(obj&&obj.backValue==backValue){
					return obj.viewValue;
				}
			}
			return backValue;
		};
		EnumWrapper.prototype.getBackValue=function(viewValue){
			var enumObj=this.EnumObj;
			for(var propName in enumObj){
				var obj=enumObj[propName];
				if(obj&&obj.viewValue==viewValue){
					return obj.backValue;
				}
			}
			return backValue;
		};
		EnumWrapper.prototype.getName=function(backValue){
			var enumObj=this.EnumObj;
			for(var propName in enumObj){
				var obj=enumObj[propName];
				if(obj&&obj.backValue==backValue){
					return propName;
				}
			}
			return backValue;
		};
		EnumWrapper.prototype.getViewValueByName=function(name){
			var enumObj=this.EnumObj;
			for(var propName in enumObj){
				var obj=enumObj[propName];
				if(propName==name){
					return obj.viewValue;
				}
			}
			return name;
		};
		EnumWrapper._init=true;
	}
}
/**
 * 关闭当前窗口
 */
function closeWindow(){
	var browserName=navigator.appName; 
	if (browserName=="Netscape") 
	{ 
		window.open('','_parent',''); 
		window.close(); 
	} 
	else 
	{ 
		if (browserName=="Microsoft Internet Explorer") 
		{ 
			window.opener = "whocares"; 
			window.close(); 
		} 
	} 
}

/**
 * 判断是否命名重复
 * @param flag                 boolean              如果重复返回true否则false
 * @param fn1                  function             true执行
 * @param fn2                  function             false 执行
 */
function isRepeated(flag,fn1,fn2){
	if(flag){
		fn1();
	}else{
		fn2();
	}
}
/**
 * 标签切换内容
 * @param e                  object           this
 * @param divs               objects          要显示的divs
 * @param className          string           当前状态
**/
function tabChange(e,divs,className){
	var index = $(e).index();
	$(e).addClass(className).siblings().removeClass(className);
	//divs.hide();
	divs.eq(index).addClass(className).siblings().removeClass(className);;
}
/**
 *多标签滚动
 *@ obj           object          目标元素
**/
function tabSwitchWrap(obj){
	var moveObj = $(obj),
	    moveObjParnet = moveObj.parent();
		posWidth = parseInt(moveObjParnet.outerWidth()),
		tabs = moveObj.find("li"),
		len1 = Math.round(posWidth/parseInt(tabs.eq(0).outerWidth())),
		ulWidth = 0;
//	alert("len" + len + "==length==" + tabs.length);	
	//初始化 定义moveObj的width;
	for(var i=0,len=tabs.length;i<len;i++){
		ulWidth += parseInt(tabs.eq(i).outerWidth());
	}
	moveObj.width(ulWidth);
//	console.log((ulWidth > parseInt(moveObj.parent().width())) + '\n' + ulWidth + '\n' + parseInt(moveObj.parent().width()));
	if(tabs.length > len1){
		if(!moveObj.parent().is(".switching-tab-wrap")){
			moveObj.before('<span class="next"></span><span class="prev" data-status="disabled"></span>');
			moveObj.wrap('<div class="switching-tab-wrap"></div>');
		}
	}else{
		if(moveObj.parent().is(".switching-tab-wrap")){
			var cloneObj = moveObj;
			moveObj.parent().prev(".prev").remove();
			moveObj.parent().prev(".next").remove();
			moveObj.parent().replaceWith(cloneObj);
			//moveObj.parent().prev(".next").remove();
		}
	}
	moveTabs(moveObj);
}
//tab标签左右滚动
function moveTabs(obj){
	var moveObj = $(obj),
		nextBtn = moveObj.parent().parent().find(".next"),
	    prevBtn = moveObj.parent().parent().find(".prev"),
	    posWidth = parseInt(moveObj.parent().parent().outerWidth()),
		tabs = moveObj.find("li"),
		len = Math.ceil(tabs.length/Math.round(posWidth/parseInt(tabs.eq(0).outerWidth()))),
		index = 0,
		ulWidth = 0;
	
//	alert(Math.round(posWidth/parseInt(tabs.eq(0).outerWidth())) + "=len=" + len + "\n tabs.length " + tabs.length+ "\n posWidth " + posWidth+ "\n li " +tabs.eq(0).css("width"));
	//初始化
	moveObj.css("left","0px");
	if(nextBtn.attr("data-status") === "disabled"){
		nextBtn.removeAttr("data-status");
	}
	if(!prevBtn.attr("data-status")){
		prevBtn.attr("data-status","disabled");
	}
	nextBtn.unbind("click");
	prevBtn.unbind("click");
	//下一个
	nextBtn.bind("click",function(){
		if(index < len-1){
//			alert("len="+len+"=index=" + index);
			posMove(moveObj,posWidth,-1);
			prevBtn.removeAttr("data-status");
//			console.log("next index ===" + index);
			if(index == len-1){
				nextBtn.attr("data-status","disabled");
			}
		}
	});
	//上一个
	prevBtn.bind("click",function(){
		if(index > 0){
			posMove(moveObj,posWidth,1);
			nextBtn.removeAttr("data-status");
//			console.log("prev index ===" + index);
			if(index == 0){
				prevBtn.attr("data-status","disabled");
				
			}
		}
	});
	function posMove(obj,pw,step){
		if(!$(obj).is(":animated")){
//			console.log("--" + index + "-pw-" + pw);
			var L = parseInt($(obj).css("left"));
			L += pw*step;
			index -= step;
			//console.log("++" + index + "w===" + L);
			$(obj).animate({left:L + "px"},500);
		}
	}
}
//添加最大高度
function maxHeight(){
	$("div[data-max-height]").each(function(){
		var defaultHight = window.innerHeight - $("#header").outerHeight() -$("#footer").outerHeight() - 160;
		var maxHeight = $(this).attr("data-max-height") != "" ? $(this).attr("data-max-height") : defaultHight;
//		var height = $(this).outerHeight();
		
		$(this).css({"max-height":maxHeight + 'px',"overflow-x":"hidden","overflow-y":"auto"});
//		if(!$(this).is(".mCustomScrollbar")){
//			$(this).mCustomScrollbar();
//		}
		
	});
}
//取反 检查是否支持placeholder属性
function isPlaceholder(){
	return 'placeholder' in document.createElement('input');
}
//
function showLoading(){
	if($("#loading").length > 0){
		$("#loading").show();
	}
	else{
		var loading = '<div id="loading"><img src="themes/style/img/loading.gif" /></div>';
		$(document.body).append(loading);
	}
	showLayer();
}
function hideLoading(){
	$("#loading").hide();
	hideLayer();
}


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

String.prototype.toFunction = function () {
    var temp = String(this);
    if (temp && typeof $[temp.replace("$.", "")] == "function") return $[temp.replace("$.", "")];
}
String.prototype.toDo = function (args) {
    var temp = String(this);
    if (temp && typeof $[temp.replace("$.", "")] == "function")
        $[temp.replace("$.", "")](args);
}

$(function () {

    //submit
    var autoSubmit = function (args) {

        var queryFormData = {};

        if (args.queryFormId) {
            queryFormData = $("#" + args.queryFormId).getFormData();
            if (args.beforeSend && (typeof $[args.beforeSend.replace("$.", "")] == "function"))
                queryFormData = $[args.beforeSend.replace("$.", "")](queryFormData);
        }

        if (args.dataGridId) {
            queryFormData["details"] = $("#" + args.dataGridId).jqGrid("getRowData");
        }

        if (args.postData && typeof args.postData == "object") {
            for (key in args.postData) {
                queryFormData[key] = args.postData[key];
            }
        }

        //console.log("post", queryFormData);

        if (args.url) {
            $.ajax({
                url: args.url,
                type: args.type || "post",
                data: queryFormData,
                async: (args.async != false),
                dataType: args.dataType || "json",
                beforeSend: showLoading,
                success: function (result) {
                    //操作结果信息提示
                    promptMessage(result.message);
                    if (args.callBack) {
                        $[args.callBack.replace("$.", "")](result);
                    }
                    //取消遮罩
                    hideLoading();
                }
            });
        }
    };

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

            if (args.beforeSubmit) {
                if (typeof args.beforeSubmit.toFunction() == "function" && args.beforeSubmit.toDo()) {
                    if (functionDo && (typeof functionDo.toFunction() == "function")) {
                        functionDo.toDo(args);
                    }
                    else autoSubmit(args);
                }

            }
            else if (functionDo && (typeof functionDo.toFunction() == "function")) {
                functionDo.toDo(args);
            }
            else autoSubmit(args);
        }
    });

});


/**
 * 检查对象是否为空，不包含任何可读属性
 * @param obj
 * @returns {boolean}
 */
function isEmptyObj(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
}