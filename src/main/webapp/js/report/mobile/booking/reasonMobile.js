var pagewidth = $(window).width();
var pageheight = $(window).height();
var reasonType = $(".reasonType").val();
var x = new Array();
var y = new Array();
var startDate = "";
var endDate = "";
var day = null;
var commercialId= null;
$(function() {
	if (browser.versions.mobile) {
		$("#main").height(pageheight * 0.6);
		$("#main").width(pagewidth * 0.95);
	}
	// 单独高亮显示 一级菜单到页面去执行
 	mobileReport.separateHighlighted('.filter-conditions a','click', 'current');
	$("#commercialId").val($(".filter-conditions  a.current").attr("id"));
	ready();

	// 点击日周月年
	$(document).delegate("#cycleList > li", "touchstart", function() {
		ready();
	});

	$(document).delegate(".btn-confirm", "touchstart", function() {
		var commercialId = $(".filter-conditions  a.current").attr("id");
		$("#commercialId").val(commercialId);
		ready();
	});
	// 点击筛选按钮 重置当前门店
	reportLayer.btnFilter
			.on("click",
					function() {
						var commercialId = $("#commercialId").val(), commercialLinks = $("#filter-con .filter-conditions a");
						for (var i = 0, len = commercialLinks.length; i < len; i++) {
							if (commercialLinks.eq(i).attr("id") === commercialId) {
								commercialLinks.removeClass("current");
								commercialLinks.eq(i).addClass("current");
							}
						}
					});

});

//点击上一次触发
reportLayer.btnPrev.bind("click",function(){
	prev();
	getInfo();
});
//点击下一次触发
reportLayer.btnNext.bind("click",function(){
	next();
	getInfo();
});

// 定义ready函数
function ready() {
	day = $("#cycleList > li.current").text();
	startDate = "";
	endDate = "";
	var reportObj = $("#default"), // 显示内容的容器
	reportWrap = reportObj.parent();
	if (day == "周") {
		startDate = getWeekStartDate();
		endDate = getWeekEndDate();
		$(".current-date").text(startDate+"至"+endDate);
	} else if (day == "月") {
		startDate = getMonthStartDate();
		endDate = getMonthEndDate();
		$(".current-date").text(startDate+"至"+endDate);
	} else if (day == "年") {
		startDate = nowYear + "-01-01";
		endDate = nowYear + "-12-31";
	} else {
		startDate = new Date().Format("yyyy-MM-dd");
		endDate = new Date().Format("yyyy-MM-dd");
		 $(".current-date").text(startDate);
	}
	if (reasonType == null || reasonType == '') {
		reasonType = -3;
	}

	// 获取商户编号
	commercialId = $("#commercialId").val();
	var queryParameter = "reasonType=" + reasonType + "&startDate=" + startDate
			+ "&endDate=" + endDate + "&commercialId=" + commercialId;

	$.ajax({
				type : "POST",
				url : "report/bookingReport/weixin/getReason",
				data : queryParameter,
				dataType : "json",
				contentType : "application/x-www-form-urlencoded;charset=UTF-8",
				async : false,
				cache : false,
				success : function(data) {
					x.length = 0;
					y.length = 0;
					if (data != null && data.length > 0) {
						if ($("#main").is(":hidden")) {
							$("#main").show();
							$("#main").parent().find(".notSearchContent")
									.hide();
						}
						if (pageheight<800) {
							if (data.length <= 3) {
								document.getElementById("main").style.height = 0 + 'px';
								document.getElementById("main").style.height = pageheight * 0.7
								 + 'px';
							} else if (data.length > 3 && data.length <= 6) {
								document.getElementById("main").style.height = 0 + 'px';
								document.getElementById("main").style.height = pageheight
										+ 'px';
							} else {
								document.getElementById("main").style.height = 0 + 'px';
								document.getElementById("main").style.height = pageheight
										* 1.4 + 'px';
							}
						} else {
								document.getElementById("main").style.height = 0 + 'px';
								document.getElementById("main").style.height = pageheight*0.9
										 + 'px';
						}
						for (var i = data.length; i > 0; i--) {
							var yy = data[i - 1].name;
							if (yy.length > 15) {
								yy = yy.substr(0, 15) + '\n'
										+ yy.substr(15, (yy.length - 15));
								y[i - 1] = yy;
								data[i - 1].name = yy;
								x.push(data[i - 1]);
							} else {
								y[i - 1] = yy;
								x.push(data[i - 1]);
							}
						}
						echartBar(x, y);
						if (reportObj.is(":hidden")) {
							reportObj.show();
							reportWrap.find(".notSearchContent").hide();
						}
					} else {
						var notData = mobileReport
								.notQueryData("没有查到数据，试试其他查询条件吧！");

						if (reportWrap.find(".notSearchContent").length > 0) {
							reportObj.hide();
							reportWrap.find(".notSearchContent").show();
						} else {
							reportObj.hide();
							reportWrap.append(notData);
						}
					}
				}
			});

}
//下一、上一调用函数
function getInfo(){
	var reportObj = $("#default"), // 显示内容的容器
	reportWrap = reportObj.parent();
	var queryParameter = "reasonType=" + reasonType + "&startDate=" + startDate
	+ "&endDate=" + endDate + "&commercialId=" + commercialId;

$.ajax({
		type : "POST",
		url : "report/bookingReport/weixin/getReason",
		data : queryParameter,
		dataType : "json",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		async : false,
		cache : false,
		success : function(data) {
			x.length = 0;
			y.length = 0;
			if (data != null && data.length > 0) {
				if ($("#main").is(":hidden")) {
					$("#main").show();
					$("#main").parent().find(".notSearchContent")
							.hide();
				}
				if (pageheight<800) {
					if (data.length <= 3) {
						document.getElementById("main").style.height = 0 + 'px';
						document.getElementById("main").style.height = pageheight * 0.7
						 + 'px';
					} else if (data.length > 3 && data.length <= 6) {
						document.getElementById("main").style.height = 0 + 'px';
						document.getElementById("main").style.height = pageheight*0.7
								+ 'px';
					} else {
						document.getElementById("main").style.height = 0 + 'px';
						document.getElementById("main").style.height = pageheight
								* 1.0 + 'px';
					}
				} else {
						document.getElementById("main").style.height = 0 + 'px';
						document.getElementById("main").style.height = pageheight*0.7
								 + 'px';
				}
				for (var i = data.length; i > 0; i--) {
					var yy = data[i - 1].name;
					if (yy.length > 15) {
						yy = yy.substr(0, 15) + '\n'
								+ yy.substr(15, (yy.length - 15));
						y[i - 1] = yy;
						data[i - 1].name = yy;
						x.push(data[i - 1]);
					} else {
						y[i - 1] = yy;
						x.push(data[i - 1]);
					}
				}
				echartBar(x, y);
				if (reportObj.is(":hidden")) {
					reportObj.show();
					reportWrap.find(".notSearchContent").hide();
				}
			} else {
				var notData = mobileReport
						.notQueryData("没有查到数据，试试其他查询条件吧！");

				if (reportWrap.find(".notSearchContent").length > 0) {
					reportObj.hide();
					reportWrap.find(".notSearchContent").show();
				} else {
					reportObj.hide();
					reportWrap.append(notData);
				}
			}
		}
	});

}
function echartBar(x, y) {
	var text = null;
	// 判断是哪个页面调用，根据页面不同返回不同的值
	if (reasonType == '-3') {
		text = '拒绝理由';
	} else if (reasonType == '9') {
		text = '取消理由';
	}
	require.config({
		paths : {
			echarts : 'js/echarts'
		}
	});
	require([ 'echarts', 'echarts/chart/pie' // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
	], function(ec) {
		var myChart = ec.init(document.getElementById('main'));
		option = {
			// title : {
			// text : '预订' + text+'理由' ,
			// x:'left'
			// },
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			legend : {
				orient : 'vertical',
				itemGap : 12,
				y : 'bottom',
				x : 'left',
				data : y
			},
			// calculable : true,
			series : [ {
				name : text + '占比分析',
				type : 'pie',
				center : [ '50%', '30%' ],
				radius : '60%',
				itemStyle : {
					normal : {
						label : {
							show : false
						},
						labelLine : {
							show : false
						}
					}
				},
				data : x
			} ]
		};

		// 为echarts对象加载数据
		myChart.setOption(option);
	}

	)

}

//获取点击上一*后的开始、结束日期
function prev(){
	var ms = 1000*60*60*24;//一天之中毫秒数
	if (day == "周") {
		startDate= new Date(parseInt(new Date(startDate).getTime()-7*ms)).Format("yyyy-MM-dd");
		endDate= new Date(parseInt(new Date(endDate).getTime()-7*ms)).Format("yyyy-MM-dd");
	} else if (day == "月") {
		endDate= new Date(parseInt(new Date(startDate).getTime()-ms)).Format("yyyy-MM-dd");
		tempMonth=new Date(endDate).getMonth();
		tempYear=new Date(endDate).getFullYear();
		startDate=new Date(tempYear,tempMonth,1).Format("yyyy-MM-dd");
	} else {
		startDate=endDate= new Date(parseInt(new Date(startDate).getTime()-ms)).Format("yyyy-MM-dd");
	}
}
//获取点击下一*后的开始、结束日期
function next(){
	var ms = 1000*60*60*24;//一天之中毫秒数
	if (day == "周") {
		startDate= new Date(parseInt(new Date(startDate).getTime()+7*ms)).Format("yyyy-MM-dd");
		endDate= new Date(parseInt(new Date(endDate).getTime()+7*ms)).Format("yyyy-MM-dd");
	} else if (day == "月") {
		startDate= new Date(parseInt(new Date(endDate).getTime()+ms)).Format("yyyy-MM-dd");
		tempMonth=new Date(startDate).getMonth();
		tempYear=new Date(startDate).getFullYear();
		tempDays=getMonthDays(tempMonth);
		endDate=new Date(tempYear,tempMonth,tempDays).Format("yyyy-MM-dd");
	} else {
		startDate=endDate= new Date(parseInt(new Date(startDate).getTime()+ms)).Format("yyyy-MM-dd");
	}
}

$(window).on("orientationchange", function() {
	var pagewidth = $(window).width();
	var pageheight = $(window).height();
	if (window.orientation == 0) // Portrait 竖屏模式
	{
		$("#main").height(pageheight * 0.6);
	} else // Landscape 横屏模式
	{
		$("#main").height(pageheight * 0.7);
	}

	$("#main").width(pagewidth * 0.95);
	// $('#main').time_analysis('rfreshChart');
	echartBar(x, y);

});

function hengshuping() {
	reportLayer.filterMemu.css({
		"-webkit-transform" : 'translate(' + reportLayer.filterMemuX + 'px'
				+ ', 0 )'
	});
}

window.addEventListener("onorientationchange" in window ? "orientationchange"
		: "resize", hengshuping, false);
