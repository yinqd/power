// JavaScript Document

$(function(){
	//取消a默认动作
	//mobileReport.preventDefault("a[href='#'],a[href='']","click");
	//点返回按钮 隐藏菜单 
	reportLayer.btnBack.on("click",function(){
		mobileReport.hideMemu();
	});
	//点确认按钮 隐藏菜单 
	reportLayer.btnConfirm.on("click",function(){
        mobileReport.hideMemu();

    });
    //点击筛选按钮显示菜单
	reportLayer.btnFilter.on("click",function(){
		mobileReport.showMemu();
	});
	//单独高亮显示 一级菜单到页面去执行
	//mobileReport.separateHighlighted('.filter-conditions a','touchstart click','current');
    
	//隐藏筛选条件
//	reportLayer.filterMemu.css({"-webkit-transform":'translate(' + reportLayer.filterMemuX + 'px' + ', 0 )',"display":"none"});
	//预订量报表 默认隐藏不显示项
	$(".report-table-details,#status,#time,#source").hide();
	//点击表格 显示详情
	$(document).delegate(".report-table-row","click",function(e){
		//alert(e.type);
		e.preventDefault();
		var reportDtl = $(this).next(".report-table-details");
		if(!reportDtl){return;}
		if(reportDtl.is(":hidden")){
			reportDtl.slideDown();
			$(this).addClass("open");
		}else{
			reportDtl.slideUp();
			$(this).removeClass("open");
		}
	});
	//日周年月状态切换
	$(document).delegate("#cycleList > li","touchstart click",function(){
		if($(this).attr("data-value")){
			var value = $(this).attr("data-value")*1,
				flag = (reportLayer.operationObj.attr("data-limit")) ? reportLayer.operationObj.attr("data-limit")*1 : true;
			mobileReport.changeCycle(value,flag);
		}
		$(this).addClass("current").siblings().removeClass("current");
	});
	reportLayer.btnPrev.bind("click",function(){
		var cycleValue = reportLayer.operationObj.attr("data-value")*1,//当前操作周期
			flag = (reportLayer.operationObj.attr("data-limit")) ? reportLayer.operationObj.attr("data-limit")*1 : true;
			// ms = 1000*60*60*24,//一天之中毫秒数
			
		switch(cycleValue){
			case 1:
				mobileReport.changeDate('-1',flag);
				break;
			case 2:
				mobileReport.changeWeek('-1',flag);
				break;
			case 3:
				mobileReport.changeMonth('-1',flag);
				break;
		}
	});
	reportLayer.btnNext.bind("click",function(){
		var cycleValue = reportLayer.operationObj.attr("data-value")*1,//当前操作周期
			flag = (reportLayer.operationObj.attr("data-limit")) ? reportLayer.operationObj.attr("data-limit")*1 : true;
			// ms = 1000*60*60*24,//一天之中毫秒数
			
		switch(cycleValue){
			case 1:
				mobileReport.changeDate('1',flag);
				break;
			case 2:
				mobileReport.changeWeek('1',flag);
				break;
			case 3:
				mobileReport.changeMonth('1',flag);
				break;
		}
	});
});
var reportLayer = {
	filterMemu : $("#filter-con"),//筛选菜单
	btnBack    : $("#filter-con .btn-back"),//返回按钮
	btnConfirm : $("#filter-con .btn-confirm"),//确认按钮
	btnFilter  : $("#header .filter"),//筛选按钮
	filterMemuX: parseInt($("#filter-con").outerWidth()),
	operationObj : $("#operationTime"),//上下操作容器
	btnPrev: $("#operationTime > .prev"),//上一个
	btnNext: $("#operationTime > .next"),//下一个
	curDate: $("#operationTime > .current-date")//当前显示时间
}
var mobileReport = {
	preventDefault:(function(){
		$(document).delegate("a[href='#'],a[href='']","click",function(e){
			e.preventDefault();
//			return false;
		});
	})(),
	hideMemu:function(){
		reportLayer.filterMemu.animate({"width":"0"},500);
		$(".report-table-details").hide();
	},
	showMemu:function(){
		reportLayer.filterMemu.animate({"width":"100%"},500);
	},
	notQueryData:function(msg){//没有查询到数据时调用返回一个自定义信息的元素，根据需要添加到页面
		window.scroll(0, 0);
		var notData = '<div class="notSearchContent">' + msg + '</div>';
		return notData;
	},
	separateHighlighted:function(items,evt,className){//单独高亮显示
		$(document).delegate(items,evt,function(e){
			e.preventDefault();
			$(items).removeClass(className);
			$(this).addClass(className);
		});
	},
	getWeekday:function(dateVal){
		var d = (dateVal) ? new Date(dateVal) :new Date(),
			day = d.getDay(),
            weekday = '';
        switch (day){
            case 0:
                weekday = '星期日';
                break;
            case 1:
                weekday = '星期一';
                break;
            case 2:
                weekday = '星期二';
                break;
            case 3:
                weekday = '星期三';
                break;
            case 4:
                weekday = '星期四';
                break;
            case 5:
                weekday = '星期五';
                break;
            case 6:
                weekday = '星期六';
                break;

        }
        return weekday;
    },
    subMenu:function(){
		var curMenu = null,targetObj = null,backMenu = $("#filter-con"),backMenuTitle = null;
		$(document).delegate(".filter-conditions > li a","click",function(){
			//alert("subMenu");
			var _this = $(this);
			//有下级菜单
			if(!!$(this).hasClass("lower-menu")){
				var subMenu = $("#" + _this.attr("data-level")),//要显示的下级菜单
					level2MenuTitle = subMenu.find(".filter-con-title"),//要显示下级菜单标题元素
					subMenuItems = subMenu.find(".filter-conditions > li > a"),//下级菜单所有选项
					level2 = _this.find(".level-2"),//保存下级菜单选项的目标元素 
					level2Title = level2.attr("title"),//下级菜单标题
					level2Id = level2.attr("id");//当前Id

				level2MenuTitle.html(level2Title);//设置下级菜单的标题
				subMenu.animate({"width":"100%"},500);//显示下级菜单
				curMenu = subMenu;//将下级菜单设置为当前的菜单
				targetObj = level2;//设置目标元素
				if(_this.parents(".filter-con").attr("id") == "filter-con"){
					//如果点击的是一级菜单 设置返回目标元素
					backMenuTitle = level2;   
				}
				//设置下级菜单当前项
				setCurrent(level2Id,subMenuItems,"id");
			}else{//无下级菜单
				//当前菜单不等于返回菜单
				if(curMenu != backMenu){
					var targetTxt = _this.html(),
						targetId = _this.attr("id");
					//alert(targetObj);
					targetObj.attr("id",targetId).html(targetTxt);
					backMenuTitle.attr("id",targetId).html(targetTxt);
					$(".filter-con2").animate({"width":"0"},500);
					curMenu = null;
					targetObj = null;
				}
			}
			

		});
		$(document).delegate(".filter-con2 .operation > a.btn-back","click",function(){
			//上级菜单
			var prevMenu = (curMenu.attr("data-prev-menu")) ? $("#" + curMenu.attr("data-prev-menu")) : null;
			curMenu.animate({"width":"0"},500);
			//将当前菜单设为上级菜单
			curMenu = prevMenu;
		});

		//设置当前选中项 @id 唯一标识；@items 要遍历的元素；@a 要遍历元素的属性
		function setCurrent(id,items,a){
			var len = items.length,itemId;

			//取消所有元素的当前状态
			items.removeClass("current");

			for(var i=0;i<len;i++){
				//判断当前元素是否含有下级菜单 lower-menu
				itemId = (items.eq(i).hasClass('lower-menu')) ? items.eq(i).find(".level-2").attr(a) : items.eq(i).attr(a);

				if(itemId === id){
					items.eq(i).addClass("current");
				}
			}
				
		}
	},
	//when cycle change operation change;@param i li attr "data-value"
	changeCycle: function(i,flag){
		var today = new Date().Format("yyyy-MM-dd"),
			weekStartDate = getWeekStartDate(),
			weekEndDate = getWeekEndDate(),
			monthStartDate = getMonthStartDate(),
			monthEndDate = getMonthEndDate();

		reportLayer.operationObj.attr("data-value",i);

		switch(i){
			case 1:
				//alert(i);
				reportLayer.btnPrev.html("上一天").show();
				if(flag){
					reportLayer.btnNext.html("下一天").hide();
				}else{
					reportLayer.btnNext.html("下一天").show();
				}
				
				reportLayer.curDate.html(today);
				break;
			case 2:
				reportLayer.btnPrev.html("上一周").show();
				if(flag){
					reportLayer.btnNext.html("下一周").hide();
				}else{
					reportLayer.btnNext.html("下一周").show();
				}
				
				reportLayer.curDate.html(weekStartDate + "至" + weekEndDate);
				break;
			case 3:
				reportLayer.btnPrev.html("上一月").show();
				if(flag){
					reportLayer.btnNext.html("下一月").hide();
				}else{
					reportLayer.btnNext.html("下一月").show();
				}
				
				reportLayer.curDate.html(monthStartDate + "至" + monthEndDate);
				break;
			case 4:
				reportLayer.btnPrev.hide();
				reportLayer.btnNext.hide();
				reportLayer.curDate.html(nowYear + '-01' + "至" + nowYear + '-12');
				break;

		}
	},
	changeDate: function(s,flag){
		var ms = 1000*60*60*24,
			days = ms*1*s,
			curd = new Date(reportLayer.curDate.text())*1,//当前时间
			today = new Date().Format("yyyy-MM-dd"),//今天
			newCurd = new Date(curd + days).Format("yyyy-MM-dd");
//			console.log("days == " + days);
//			console.log("curd == " + curd);
//			console.log("today == " + today);
//			console.log("newCurd == " + newCurd);

			reportLayer.curDate.html(newCurd);
			if(flag){
				if(newCurd == today){
					reportLayer.btnNext.hide();
				}else{
					reportLayer.btnNext.show();
				}
			}
	},
	changeWeek: function(s,flag){
		var ms = 1000*60*60*24,
			days = ms*7*s,
			curd = reportLayer.curDate.text().split("至"),//当前时间
			curStartD = new Date(curd[0])*1,//开始时间
			curEndD = new Date(curd[1])*1,//结束时间
			nowStartDate = getWeekStartDate(),//当前开始时间
			newCurStartD = new Date(curStartD + days).Format("yyyy-MM-dd"),
			newCurEndD = new Date(curEndD + days).Format("yyyy-MM-dd");
//			console.log("days == " + days);
//			console.log("curStartD == " + curStartD);
//			console.log("curEndD == " + curEndD);
//			console.log("nowStartDate == " + nowStartDate);
//			console.log("newCurStartD == " + newCurStartD);
//			console.log("newCurEndD == " + newCurEndD);

			reportLayer.curDate.html(newCurStartD + '至' + newCurEndD);
			if(flag){
				if(newCurStartD == nowStartDate){
					reportLayer.btnNext.hide();
				}else{
					reportLayer.btnNext.show();
				}
			}
	},
	changeMonth: function(s,flag){
		var ms = 1000*60*60*24,
			curd = reportLayer.curDate.text().split("至"),//当前时间
			curYear = new Date(curd[0]).getFullYear(),//开始年
			curMonth = new Date(curd[0]).getMonth(),//开始月
			newCurYear,
			newCurMonth,
			days,
			newCurStartD,
			newCurEndD;

			if(curMonth == 11 && curMonth+s*1 > 11){
				// alert(0);
				newCurMonth = 0;
				newCurYear = curYear+1;

			}else if(curMonth == 0 && curMonth+s*1 < 0){
				// alert(11);
				newCurMonth = 11;
				newCurYear = curYear-1;
			}else{
				// alert(-1);
				newCurMonth = curMonth+s*1;
				newCurYear = curYear;
			}
			days = getMonthDays(newCurMonth);
			newCurStartD = newCurYear + "-" + check(newCurMonth+1) + "-01";
			newCurEndD = newCurYear + "-" + check(newCurMonth+1) + "-" + days;

//			console.log("curd == " + curd);
//			console.log("curYear == " + curYear);
//			console.log("curMonth == " + curMonth);
//			console.log("newCurYear == " + newCurYear);
//			console.log("newCurMonth == " + newCurMonth);
//			console.log("days == " + days);

			reportLayer.curDate.html(newCurStartD + '至' + newCurEndD);
			if(flag){
				if(newCurMonth == nowMonth){
					reportLayer.btnNext.hide();
				}else{
					reportLayer.btnNext.show();
				}
			}
			function check(n){
				if(n*1 < 10){
			        n = "0" + n;
			    }else{
			        n = n;
			    }
			    return n;
			}
		
	}
}
	