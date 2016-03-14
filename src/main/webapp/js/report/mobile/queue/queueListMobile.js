/**
 * 预定量手机报表js
 */
var brandId = null, commercialId = null;
var startDate = null, endDate = null;
var day = null;
var objx = new Array();
var objy = new Array();
$(function() {
	// $(".report-column").hide();
	// 单独高亮显示 一级菜单到页面去执行
	mobileReport
			.separateHighlighted('.filter-conditions a', 'click', 'current');
	reportLayer.btnConfirm.on("click", function() {
		// 隐藏筛选条件
		mobileReport.hideMemu();
	});
	var pagewidth = $(window).width();
	var pageheight = $(window).height();
	$("#echarts_line").height(pageheight * 0.4);
	$("#echarts_line").width(pagewidth);
	day = $("#cycleList > li.current").text();
	info();
	getInfo();
	// 点击确定触发
	$(document).delegate(".btn-confirm", "touchstart", function() {
		info();
		getInfo();
	});
	// 点击日周月年触发
	$(document).delegate("#cycleList li", "touchstart", function() {
		day = $("#cycleList > li.current").text();
		info();
		getInfo();
	});
})
// 点击上一次触发
reportLayer.btnPrev.bind("click", function() {
	prev();
	getInfo();
});
// 点击下一次触发
reportLayer.btnNext.bind("click", function() {
	next();
	getInfo();
});

// 获取排队量报表所需信息
function getInfo() {
	// $("#commercialId").val($(".filter-conditions a.current").attr("id"));
	// var day = $("#cycleList > li.current").text();
	// var info = $("#commercialId").val();
	//	
	// if (info == $(".filter-conditions a:first-child").attr("id")) {
	// brandId = info;
	// } else {
	// commercialId = info;
	// }
	var reportObj = $(".report-column"), // 显示内容的容器
	reportWrap = reportObj.parent();
	// if (day == "周") {
	// startDate = getWeekStartDate();
	// endDate = getWeekEndDate();
	// } else if (day == "月") {
	// startDate = getMonthStartDate();
	// endDate = getMonthEndDate();
	// } else if (day == "年") {
	// startDate = nowYear + "-01-01";
	// endDate = nowYear + "-12-31";
	// } else {
	// startDate = new Date().Format("yyyy-MM-dd");
	// endDate = new Date().Format("yyyy-MM-dd");
	// $(".next").hide();
	// $(".current-date").text(new Date().Format("yyyy.MM.dd"))
	// }
	$.post('report/queueReport/weixin/getInfo', {
		'brandId' : brandId,
		'commercialId' : commercialId,
		'startDate' : startDate,
		'endDate' : endDate
	}, function(data) {
		if (data.list.length > 0) {
			objx.length=0;
			objy.length=0;
			var total = 0;// 总排队数
			var queuing = 0;// 总排队中数
			var admission = 0;// 总入场数
			var invalid = 0;// 总作废数
			var cancel = 0;// 总取消数
			var rate = 0; // 流失率
			for (var i = 0; i < data.echartsInfoVos.length; i++) {
				objx.push(data.echartsInfoVos[i].x);
				objy.push(data.echartsInfoVos[i].y);
				total += data.echartsInfoVos[i].y;
				queuing += data.echartsInfoVos[i].queuingCount;
				admission += data.echartsInfoVos[i].admissionCount;
				invalid += data.echartsInfoVos[i].invalidCount;
				cancel += data.echartsInfoVos[i].cancelCount;
			}
			if (total - cancel == 0) {
				rate = 0;
			} else {
				rate = Math.round(invalid / (total - cancel) * 10000) / 100;
			}
			if (reportObj.is(":hidden")) {
				reportObj.show();
				reportWrap.find(".notSearchContent").hide();
			}
			echartsLine(objx, objy);
			$("#total").text(total);
			$("#queuing").text(queuing);
			$("#admission").text(admission);
			$("#invalid").text(invalid);
			$("#cancel").text(cancel);
			$("#rate").text(rate + "%");
		} else {
			var notData = mobileReport.notQueryData("没有查到数据，试试其他查询条件吧！");
			if (reportWrap.find(".notSearchContent").length > 0) {
				reportObj.hide();
				reportWrap.find(".notSearchContent").show();
			} else {
				reportObj.hide();
				reportWrap.append(notData);
			}
		}
	})
}
// echarts 图表调用函数
function echartsLine(objx, objy) {
//	require.config({
//		paths : {
//			echarts : 'js/echarts'
//		}
//	});
//	require([ 'echarts', 'echarts/chart/line' // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
//	], 
//	function(ec) {
		var myChart = echarts.init(document.getElementById('echarts_line'));
		option = {
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				x : 'left',
				y : 'bottom',
				data : [ '排队总次数' ]
			},
			dataZoom : {
				orient : "horizontal",
				show : false,
				y : 340
			},
			grid : {
				borderWidth : 0,
				x : 60,
				y : 10,
				x2 : 30,
				y2 : 50
			},
			calculable : true,
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				splitLine : {
					show : false
				},
				data : objx

			} ],
			yAxis : [ {
				type : 'value',
				axisLine : { // 轴线
					show : false
				},
				show : true,
				splitLine : {
					show : true,
					lineStyle : {
						type : 'dashed'
					}
				}
			} ],
			series : [ {
				name : '排队总次数',
				type : 'line',
				data : objy
			} ]
		};
		myChart.setOption(option);
//	})
}
// 准备品牌、门店编号、开始结束时间
function info() {
	commercialId = null, brandId = null;
	$("#commercialId").val($(".filter-conditions  a.current").attr("id"));
	var info = $("#commercialId").val();
	if (info == $(".filter-conditions a:first-child").attr("id")) {
		brandId = info;
	} else {
		commercialId = info;
	}
	if (day == "周") {
		startDate = getWeekStartDate();
		endDate = getWeekEndDate();
		$(".next").hide();
		$(".current-date").text(startDate + "至" + endDate);
	} else if (day == "月") {
		startDate = getMonthStartDate();
		endDate = getMonthEndDate()
		$(".next").hide();
		$(".current-date").text(startDate + "至" + endDate);
	} else if (day == "年") {
		startDate = nowYear + "-01-01";
		endDate = nowYear + "-12-31";
	} else {
		startDate = new Date().Format("yyyy-MM-dd");
		endDate = new Date().Format("yyyy-MM-dd");
		$(".next").hide();
		$(".current-date").text(startDate);
	}
}
// 获取点击上一*后的开始、结束日期
function prev() {
	var ms = 1000 * 60 * 60 * 24;// 一天之中毫秒数
	if (day == "周") {
		startDate = new Date(parseInt(new Date(startDate).getTime() - 7 * ms))
				.Format("yyyy-MM-dd");
		endDate = new Date(parseInt(new Date(endDate).getTime() - 7 * ms))
				.Format("yyyy-MM-dd");
	} else if (day == "月") {
		endDate = new Date(parseInt(new Date(startDate).getTime() - ms))
				.Format("yyyy-MM-dd");
		tempMonth = new Date(endDate).getMonth();
		tempYear = new Date(endDate).getFullYear();
		startDate = new Date(tempYear, tempMonth, 1).Format("yyyy-MM-dd");
	} else {
		startDate = endDate = new Date(parseInt(new Date(startDate).getTime()
				- ms)).Format("yyyy-MM-dd");
	}
}
// 获取点击下一*后的开始、结束日期
function next() {
	var ms = 1000 * 60 * 60 * 24;// 一天之中毫秒数
	if (day == "周") {
		startDate = new Date(parseInt(new Date(startDate).getTime() + 7 * ms))
				.Format("yyyy-MM-dd");
		endDate = new Date(parseInt(new Date(endDate).getTime() + 7 * ms))
				.Format("yyyy-MM-dd");
	} else if (day == "月") {
		startDate = new Date(parseInt(new Date(endDate).getTime() + ms))
				.Format("yyyy-MM-dd");
		tempMonth = new Date(startDate).getMonth();
		tempYear = new Date(startDate).getFullYear();
		tempDays = getMonthDays(tempMonth);
		endDate = new Date(tempYear, tempMonth, tempDays).Format("yyyy-MM-dd");
	} else {
		startDate = endDate = new Date(parseInt(new Date(startDate).getTime()
				+ ms)).Format("yyyy-MM-dd");
	}
}
// 封装时间格式化方法
Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
// 转屏事件
$(window).on("orientationchange", function() {
	var pagewidth = $(window).width();
	var pageheight = $(window).height();
	if (window.orientation == 0 || window.orientation == 180) // Portrait 竖屏模式
	{
		$("#echarts_line").height(pageheight * 0.4);
	} else // Landscape 横屏模式
	{
		$("#echarts_line").height(pageheight * 0.6);
	}
	$("#echarts_line").width(pagewidth);
	echartsLine(objx, objy);
});