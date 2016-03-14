//Date.prototype.Format = function(fmt) { // author: meizz
//	var o = {
//		"M+" : this.getMonth() + 1, // 月份
//		"d+" : this.getDate(), // 日
//		"h+" : this.getHours(), // 小时
//		"m+" : this.getMinutes(), // 分
//		"s+" : this.getSeconds(), // 秒
//		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
//		"S" : this.getMilliseconds()
//	// 毫秒
//	};
//	if (/(y+)/.test(fmt))
//		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
//				.substr(4 - RegExp.$1.length));
//	for ( var k in o)
//		if (new RegExp("(" + k + ")").test(fmt))
//			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
//					: (("00" + o[k]).substr(("" + o[k]).length)));
//	return fmt;
//};
$(function() {
	// 预订总量报表
	report.resetItemsLevel2("#reportItemsLevel2-status");
	report.resetItemsLevel2("#reportItemsLevel2-time");
	report.resetItemsLevel2("#reportItemsLevel2-source");
	report.resetItemsLevel2("#reportItemsLevel2-source1");
	report.resetItemsLevel2("#reportItemsLevel2-source2");
	$("#status,#time,#source").hide();
	// 默认时间为当天
	var d = new Date();
	if ($("#date-start").val() == null || $("#date-start").val() == '') {
		$("#date-start").val(d.Format("yyyy-MM-dd"));
		if (!bkeruyun.isPlaceholder()) {
			$("#date-start").next("span").hide();
		}
	}
	if ($("#date-end").val() == null || $("#date-end").val() == '') {
		$("#date-end").val($("#date-start").val());
		if (!bkeruyun.isPlaceholder()) {
			$("#date-end").next("span").hide();
		}
	}
	options();
});

/** 选择分析指标 start */
function options() {

	var d = new Date();
	if ($("#date-start").val() == null || $("#date-start").val() == '') {
		$("#date-start").val(d.Format("yyyy-MM-dd"));
	}
	if ($("#date-end").val() == null || $("#date-end").val() == '') {
		$("#date-end").val($("#date-start").val());
	}
	brandId = $("#brandList  option:selected").val();
	commerial = $("#commercialId option:selected").val();
	var options = $("#indicatorsSelect1 option:selected").val();
	if (options == 0) {
		// $("#default").show();
		$("#status,#time,#source").hide();
		chart();
	}
	if (options == 1) {
		// $("#status").show();
		$("#time,#source,#default").hide();
		status();
	}
	if (options == 2) {
		// $("#time").show();
		$("#status,#source,#default").hide();
		period();
	}
	if (options == 3) {
		// $("#source").show();
		$("#status,#time,#default").hide();
		source();
	}

};
/** 选择分析指标 end */
var dates = new Array();// 预订日期数组
var datas = new Array();// 预订总数数组

/** 预订量报表* */
function chart() {
	/** 清空数组start */
//	dates.length = datas.length = 0;
	dates = [];
	datas = [];
	/** 清空数组end */
	commerial = $("#commercialId option:selected").val();
	brandId = $("#brandList  option:selected").val();
	var stime = $("#date-start").val();
	var etime = $("#date-end").val();
	bkeruyun.showLoading();
	$.post('report/bookingchart/getBookingChart.do', {
		'startTime' : stime,
		'endTime' : etime,
		"commercialId" : commerial,
		"brandId" : brandId
	}, function(chartdata) {
		bkeruyun.hideLoading();
		var chartjson = jQuery.parseJSON(chartdata);
		if (isSameday(stime, etime)) {
			chartjson.xlist = [ '早餐', '午餐', '下午茶', '晚餐', '夜宵', '其他', '默认' ];
		}
		myChart = echarts.init(document.getElementById('bookingChart'));
		var start = 100;
		var end = 0;
		if (chartjson.xlist[0].split("~").length > 1) {
			start = 100;
			end = 0;
		}
		option = {
			title : {
				text : '预订量报表'
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				x : 'left',
				y : 'bottom',
				data : [ '预订量' ]
			},

			grid : {
				x : 70,
				y : 60,
				x2 : 70,
				y2 : 100
			},
			dataZoom : {
				orient : "horizontal",
				show : true,
				start : start,
				end : end,
				y : 310
			},
			calculable : true,
			xAxis : [ {
				realtime : true,
				type : 'category',
				boundaryGap : false,
				data : chartjson.xlist
			} ],
			yAxis : [ {
				type : 'value'
			} ],
			series : [ {
				name : '预订量',
				type : 'line',
				data : chartjson.ylist
			} ]
		};

		var count = getcount(chartjson.ylist);

		if (count != 0) {
			$("#default").show();
			myChart = echarts.init(document.getElementById('bookingChart'));
			myChart.setOption(option);
			$("#default").parent().find(".notSearchContent").hide();
		} else {
			$("#default").hide();
			if ($("#default").parent().find(".notSearchContent").length > 0) {
				$("#default").parent().find(".notSearchContent").show();
			} else {
				var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧!");
				$("#default").parent().append(notData);
			}

		}
		$("#chart_count").html(count);
		var days = getdays(stime, etime);
		$("#chart_average").html(Math.round(count / days));

		/** 同一天时列表显示数据 */
		if (isSameday(stime, etime) && count > 0) {
			dates.push(stime);
			datas.push(count);
		}
		/** 同一天时列表显示数据 end */

		/** 多天时列表显示数据 */
		if (!isSameday(stime, etime)) {
			for (var i = 0; i < chartjson.xlist.length; i++) {
				if (chartjson.ylist[i] > 0) {
					dates.push(chartjson.xlist[i]);
					datas.push(chartjson.ylist[i]);
				}
			}
		}

		/** 多天时列表显示数据 end */
		pageQuery = new PageQuery("pageQuery"); // 构建分页查询对象
		pageQuery.pageSize = 15;
		pageQuery.queryPage(1, chartPage);
	});
};
/** 预订量报表end */

/** 预订量报表分页start */
function chartPage() {
	var params = pageQuery.getPageParameter(true);
	pageQuery.pageQueryDataId = "begin";
	pageQuery.pageQueryToolId = "beginDiv";
	pageQuery.showTotalPage = true;
	pageQuery.showTotalRows = true;
	pageQuery.totalRows = datas.length;
	pageQuery.lastPage = (pageQuery.lastPage == null ? 1
			: pageQuery.currentPage);
	var html = "";
	if (pageQuery.currentPage != Math.ceil(datas.length / pageQuery.pageSize)) {
		for (var i = (pageQuery.currentPage - 1) * pageQuery.pageSize; i < pageQuery.currentPage
				* pageQuery.pageSize; i++) {
			html += "<tr style='background-color: rgb(255, 255, 255);'><td>"
					+ dates[i] + "</td>" + "<td>" + datas[i] + "</td></tr>";
		}
	} else {
		for (var i = (pageQuery.currentPage - 1) * pageQuery.pageSize; i < datas.length; i++) {
			html += "<tr style='background-color: rgb(255, 255, 255);'><td>"
					+ dates[i] + "</td>" + "<td>" + datas[i] + "</td></tr>";
		}
	}
	$("#begin").empty();
	$("#begin").append(html);
	pageQuery.afterQuery();
}
/** 预订量报表分页end */

/** 预订时段报表* */
function period() {
	commerial = $("#commercialId option:selected").val();
	brandId = $("#brandList  option:selected").val();
	var stime = $("#date-start").val();
	var etime = $("#date-end").val();
	bkeruyun.showLoading();
	$.post('report/bookingPeriod/getBookingPeriodChart.do', {
		'startTime' : stime,
		'endTime' : etime,
		"commercialId" : commerial,
		"brandId" : brandId
	}, function(chartdata) {
		bkeruyun.hideLoading();
		var chartjson = jQuery.parseJSON(chartdata);
		if (isSameday(stime, etime)) {
			chartjson.xlist = [ '早餐', '午餐', '下午茶', '晚餐', '夜宵', '其他', '默认' ];
		}
		myChart = echarts.init(document.getElementById('bookingPeriod'));
		var start = 100;
		var end = 0;
		if (chartjson.xlist[0].split("~").length > 1) {
			start = 100;
			end = 0;
		}
		var legend = "";
		var series = "";
		var select = [ false, false, false, false, false, false, false ];
		
		
		if (chartjson.ylist != null) {
			series = [ {
				"name" : "预订量",
				"type" : "line",
				"data" : chartjson.ylist
			} ];

			legend = {
				x : 'left',
				y : 'bottom',
				data : [ '预订量' ]

			};
		} else {
			if (getcount(chartjson.breakfast) > 0) {
				select[0] = true;
			}
			if (getcount(chartjson.lunch) > 0) {
				select[1] = true;
			}
			if (getcount(chartjson.afternoonTea) > 0) {
				select[2] = true;
			}
			if (getcount(chartjson.dinner) > 0) {
				select[3] = true;
			}
			if (getcount(chartjson.supper) > 0) {
				select[4] = true;
			}
			if (getcount(chartjson.other) > 0) {
				select[5] = true;
			}
			if (getcount(chartjson.defaults) > 0) {
				select[6] = true;
			}
			series = [ {
				"name" : "早餐",
				"type" : "line",
				"data" : chartjson.breakfast
			}, {
				"name" : "午餐",
				"type" : "line",
				"data" : chartjson.lunch
			}, {
				"name" : "下午茶",
				"type" : "line",
				"data" : chartjson.afternoonTea
			}, {
				"name" : "晚餐",
				"type" : "line",
				"data" : chartjson.dinner
			}, {
				"name" : "宵夜",
				"type" : "line",
				"data" : chartjson.supper
			}, {
				"name" : "其他",
				"type" : "line",
				"data" : chartjson.other
			}, {
				"name" : "默认",
				"type" : "line",
				"data" : chartjson.defaults
			}

			];

			legend = {
				x : 'left',
				y : 'bottom',
				selected:{
					'早餐':select[0],
					'午餐':select[1],
					'下午茶':select[2], 
					'晚餐':select[3], 
					'宵夜':select[4], 
					'其他':select[5], 
					'默认':select[6]
			},
				data : [ '早餐', '午餐', '下午茶', '晚餐', '宵夜', '其他', '默认' ]

			};
		}
		option = {
			title : {
				text : '预订时段报表'
			},
			tooltip : {
				trigger : 'axis'
			},

			legend : legend,

			grid : {
				x : 70,
				y : 60,
				x2 : 70,
				y2 : 100
			},
			dataZoom : {
				orient : "horizontal",
				show : true,
				start : start,
				end : end,
				y : 310
			},

			calculable : true,
			xAxis : [

			{
				realtime : true,
				type : 'category',
				boundaryGap : false,
				data : chartjson.xlist
			}

			],
			yAxis : [ {
				type : 'value'
			} ],

			series : series
		};

		if (chartjson.ylist == null) {
			var count = getcount(chartjson.defaults)
					+ getcount(chartjson.breakfast) + getcount(chartjson.lunch)
					+ getcount(chartjson.afternoonTea)
					+ getcount(chartjson.dinner) + getcount(chartjson.supper)
					+ getcount(chartjson.other);
			if (count != 0) {
				$("#time").show();
				myChart = echarts
						.init(document.getElementById('bookingPeriod'));
				myChart.setOption(option);
				$("#time").parent().find(".notSearchContent").hide();
			} else {
				$("#time").hide();
				if ($("#time").parent().find(".notSearchContent").length > 0) {
					$("#time").parent().find(".notSearchContent").show();
				} else {
					var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧!");
					$("#time").parent().append(notData);
				}

			}
			$("#period_count").html(count);
			$("#period_average")
					.html(Math.round(count / getdays(stime, etime)));
			$("#breakfast").html(getcount(chartjson.breakfast));
			$("#lunch").html(getcount(chartjson.lunch));
			$("#afternoonTea").html(getcount(chartjson.afternoonTea));
			$("#dinner").html(getcount(chartjson.dinner));
			$("#supper").html(getcount(chartjson.supper));
			$("#other").html(getcount(chartjson.other));
			$("#defaults").html(getcount(chartjson.defaults));
		} else {
			var count = getcount(chartjson.ylist);
			if (count != 0) {
				$("#time").show();
				myChart = echarts
						.init(document.getElementById('bookingPeriod'));
				myChart.setOption(option);
				$("#time").parent().find(".notSearchContent").hide();
			} else {
				$("#time").hide();
				if ($("#time").parent().find(".notSearchContent").length > 0) {
					$("#time").parent().find(".notSearchContent").show();
				} else {
					var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧!");
					$("#time").parent().append(notData);
				}

			}

			$("#period_count").html(count);
			$("#period_average").html(count / getdays(stime, etime));
			$("#breakfast").html(chartjson.ylist[0]);
			$("#lunch").html(chartjson.ylist[1]);
			$("#afternoonTea").html(chartjson.ylist[2]);
			$("#dinner").html(chartjson.ylist[3]);
			$("#supper").html(chartjson.ylist[4]);
			$("#other").html(chartjson.ylist[5]);
			$("#defaults").html(chartjson.ylist[6]);

		}
	});
	periodpageQuery = new PageQuery("periodpageQuery"); // 构建分页查询对象
	periodpageQuery.pageSize = 15;
	periodpageQuery.queryPage(1, loadperiod);
};
// 预订时段报表 分页部分 start
function loadperiod() {
	brandId = $("#brandList  option:selected").val();
	commerial = $("#commercialId option:selected").val();
	var stime = $("#date-start").val();
	var etime = $("#date-end").val();
	var params = "brandId=" + brandId + "&" + "startTime=" + stime + "&"
			+ "endTime=" + etime + "&" + periodpageQuery.getPageParameter(true);
	if (typeof (commerial) != "undefined") {
		params = "brandId=" + brandId + "&" + "startTime=" + stime + "&"
				+ "endTime=" + etime + "&" + "commercialId=" + commerial + "&"
				+ periodpageQuery.getPageParameter(true);
	}

	$
			.ajax({
				type : "POST",
				url : "report/bookingPeriod/queryListForPage.do",
				data : params + "&random=" + Math.random(),
				dataType : "json",
				cache : false,
				// async: false,
				beforeSend : bkeruyun.showLoading,
				success : function(data) {
					bkeruyun.hideLoading();
					periodpageQuery.pageQueryDataId = "period-1";
					periodpageQuery.pageQueryToolId = "periodToolDiv"; // 设置分页工具栏的id
					periodpageQuery.showTotalPage = true;
					periodpageQuery.showTotalRows = true;
					// console.debug(data);
					periodpageQuery.totalRows = data.totalRows;
					periodpageQuery.lastPage = (periodpageQuery.lastPage == null ? 1
							: periodpageQuery.currentPage);
					// var totalHtml = "(" + data.totalRows + ")";
					var items = data.items;
					var trhtml = "";

					for (var i = 0; i < items.length; i++) {
						var count = Number(items[i].defaults)
								+ Number(items[i].breakfast)
								+ Number(items[i].lunch)
								+ Number(items[i].afternoonTea)
								+ Number(items[i].dinner)
								+ Number(items[i].supper)
								+ Number(items[i].other)
						trhtml += "<tr style='background-color: rgb(255, 255, 255);'><td>"
								+ items[i].time
								+ "</td>"
								+ "<td>"
								+ items[i].breakfast
								+ "</td>"
								+ "<td>"
								+ items[i].lunch
								+ "</td>"
								+ "<td>"
								+ items[i].afternoonTea
								+ "</td>"
								+ "<td>"
								+ items[i].dinner
								+ "</td>"
								+ "<td>"
								+ items[i].supper
								+ "</td>"
								+ "<td>"
								+ items[i].other
								+ "</td>"
								+ "<td>"
								+ items[i].defaults
								+ "</td>"
								+ "<td>"
								+ count
								+ "</td></tr>";
					}
					$("#period-1").empty();
					$("#period-1").append(trhtml);

					periodpageQuery.afterQuery();
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					bkeruyun.hideLoading();
					alert("网络异常，请检查网络连接状态！");
				}

			});
}
// 预订时段分页部分end
/** 预订时段结束* */

/** 预订来源start* */
function source() {
	commerial = $("#commercialId option:selected").val();
	brandId = $("#brandList  option:selected").val();
	var stime = $("#date-start").val();
	var etime = $("#date-end").val();
	bkeruyun.showLoading();
	$.post('report/bookingSource/getBookingSourceChart.do', {
		'brandId' : brandId,
		'startTime' : stime,
		'endTime' : etime,
		"commercialId" : commerial
	}, function(chartdata) {
		bkeruyun.hideLoading();
		var chartjson = jQuery.parseJSON(chartdata);
		if (isSameday(stime, etime)) {
			chartjson.xlist = [ '早餐', '午餐', '下午茶', '晚餐', '夜宵', '其他', '默认' ];
		}
		myChart = echarts.init(document.getElementById('bookingSource'));
		var start = 100;
		var end = 0;
		if (chartjson.xlist[0].split("~").length > 1) {
			start = 100;
			end = 0;
		}
		var sources = new Array();
		var legendData = new Array();
		var chose = '{';
		for (var i = 0; i < chartjson.sources.length; i++) {
			var objs = {};
			objs.name = chartjson.sources[i].sourceName;
			name = chartjson.sources[i].sourceName;
			objs.type = 'line';
			objs.data = chartjson[chartjson.sources[i].sourceId];
			sources.push(objs);
			legendData.push(chartjson.sources[i].sourceName);
			var judge = false;
			for (var j = 0; j < objs.data.length; j++) {
				while (objs.data[j] > 0) {
					judge = true;
					break;
				}
				if (judge == true)
					break;
			}
			if (i == chartjson.sources.length - 1) {
				chose += name + ":" + judge + "}"
			} else {
				chose += name + ":" + judge + ","
			}
		}
		var choseJson = eval("(" + chose + ")");
		option = {
			title : {
				text : '预订来源报表'
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				x : 'left',
				y : 'bottom',
				selected : choseJson,
				data : legendData

			},
			calculable : true,
			grid : {
				x : 70,
				y : 60,
				x2 : 70,
				y2 : 110
			},
			dataZoom : {
				orient : "horizontal",
				show : true,
				start : start,
				end : end,
				y : 300
			},

			xAxis : [

			{
				realtime : true,
				type : 'category',
				boundaryGap : false,
				data : chartjson.xlist
			}

			],
			yAxis : [ {
				type : 'value'
			} ],
			series : sources
		};

		var count = 0;

		for (var i = 0; i < chartjson.sources.length; i++) {
			count = count + getcount(chartjson[chartjson.sources[i].sourceId]);
		}

		// var count=getcount(chartjson.DaiDingYuDing)
		// +getcount(chartjson.DaoDian)
		// +getcount(chartjson.DaZhongDianPing)
		// +getcount(chartjson.MeiTuan)
		// +getcount(chartjson.Nuomi)
		// +getcount(chartjson.WeiXin)
		// +getcount(chartjson.XiaoMiShu)
		// +getcount(chartjson.ShouJiYuDing)
		// +getcount(chartjson.DianHuaYuDing)
		// +getcount(chartjson.ZhaoWei)
		// +getcount(chartjson.Baidu)
		// +getcount(chartjson.BaiDuDiTu)
		// +getcount(chartjson.TaoDianDian);

		if (count != 0) {
			$("#source").show();
			myChart = echarts.init(document.getElementById('bookingSource'));
			myChart.setOption(option);
			$("#source").parent().find(".notSearchContent").hide();
		} else {
			$("#source").hide();
			if ($("#source").parent().find(".notSearchContent").length > 0) {
				$("#source").parent().find(".notSearchContent").show();
			} else {
				var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧!");
				$("#source").parent().append(notData);
			}

		}
		$("#daiding").html(getcount(chartjson[21]));
		$("#daodian").html(getcount(chartjson[22]));
		$("#dazhongdianping").html(getcount(chartjson[23]));
		$("#meituan").html(getcount(chartjson[24]));
		$("#baidunuomi").html(getcount(chartjson[25]));

		$("#weixin").html(getcount(chartjson[26]));
		$("#dingcanxiaomishu").html(getcount(chartjson[27]));
		$("#shouji").html(getcount(chartjson[29]));
		$("#dianhua").html(getcount(chartjson[30]));
		$("#zhaowei").html(getcount(chartjson[28]));

		$("#baiduzhidahao").html(getcount(chartjson[34]));
		$("#zhidahao").html(getcount(chartjson[33]));
		$("#baiduditu").html(getcount(chartjson[32]));
		$("#taodiandian").html(getcount(chartjson[31]));
		$("#enjoy").html(getcount(chartjson[35]));
		$("#weizhi").html(getcount(chartjson[20]));

		$("#sourcecount").html(count);
		$("#sourceavg").html(Math.round(count / getdays(stime, etime)));

	});

	sourcepageQuery = new PageQuery("sourcepageQuery"); // 构建分页查询对象
	sourcepageQuery.pageSize = 15;
	// var valueData = {};
	sourcepageQuery.queryPage(1, loadSource);

};
// 预订来源分页 start
function loadSource() {

	var stime = $("#date-start").val();
	var etime = $("#date-end").val();
	brandId = $("#brandList  option:selected").val();
	commerial = $("#commercialId option:selected").val();
	var params = "brandId=" + brandId + "&" + "startTime=" + stime + "&"
			+ "endTime=" + etime + "&" + sourcepageQuery.getPageParameter(true);
	if (typeof (commerial) != "undefined") {
		params = "brandId=" + brandId + "&" + "startTime=" + stime + "&"
				+ "endTime=" + etime + "&" + "commercialId=" + commerial + "&"
				+ sourcepageQuery.getPageParameter(true);
	}
	$.ajax({
		type : "POST",
		url : "report/bookingSource/queryListForPage.do",
		data : params + "&random=" + Math.random(),
		dataType : "json",
		cache : false,
		// async: false,
		beforeSend : bkeruyun.showLoading,
		success : function(data) {
			bkeruyun.hideLoading();
			sourcepageQuery.pageQueryDataId = "source-1";
			sourcepageQuery.pageQueryToolId = "sourceToolDiv"; // 设置分页工具栏的id
			sourcepageQuery.showTotalPage = true;
			sourcepageQuery.showTotalRows = true;
			// console.debug(data);
			sourcepageQuery.totalRows = data.totalRows;
			sourcepageQuery.lastPage = (sourcepageQuery.lastPage == null ? 1
					: sourcepageQuery.currentPage);
			// var totalHtml = "(" + data.totalRows + ")";
			var items = data.items;
			var trhtml = "";
//			console.log(items);
			for (var i = 0; i < items.length; i++) {

				var count = Number(items[i][20]) + Number(items[i][21])
						+ Number(items[i][22]) + Number(items[i][23])
						+ Number(items[i][24]) + Number(items[i][25])
						+ Number(items[i][26]) + Number(items[i][27])
						+ Number(items[i][28]) + Number(items[i][29])
						+ Number(items[i][30]) + Number(items[i][31])
						+ Number(items[i][32]) + Number(items[i][33])
						+ Number(items[i][34]) + Number(items[i][35]);

				var sourceNum = [ Number(items[i][20]), Number(items[i][21]),
						Number(items[i][22]), Number(items[i][23]),
						Number(items[i][24]), Number(items[i][25]),
						Number(items[i][26]), Number(items[i][27]),
						Number(items[i][28]), Number(items[i][29]),
						Number(items[i][30]), Number(items[i][31]),
						Number(items[i][32]), Number(items[i][33]),
						Number(items[i][34]), Number(items[i][35]) ];

				var maxNum = Math.max(Number(items[i][20]),
						Number(items[i][21]), Number(items[i][22]),
						Number(items[i][23]), Number(items[i][24]),
						Number(items[i][25]), Number(items[i][26]),
						Number(items[i][27]), Number(items[i][28]),
						Number(items[i][29]), Number(items[i][30]),
						Number(items[i][31]), Number(items[i][32]),
						Number(items[i][33]), Number(items[i][34]),
						Number(items[i][35]));

				trhtml += "<ul class='report-table-row'>" + "<li>"
						+ items[i].time + "</li>" + "<li>" + count + "</li>"
						+ "<li>" + getNameByMax(sourceNum, maxNum) + "</li>"
						+ "</ul>" + "<div class='report-table-details'>"
						+ "<dl>" +

						"<dt>代订</dt>" + "<dd>" + items[i][21] + "</dd>"
						+ "<dt>到店</dt>" + "<dd>" + items[i][22] + "</dd>" +

						"<dt>大众点评</dt>" + "<dd>" + items[i][23] + "</dd>"
						+ "<dt>美团</dt>" + "<dd>" + items[i][24] + "</dd>" +

						"<dt>百度糯米</dt>" + "<dd>" + items[i][25] + "</dd>"
						+ "<dt>微信</dt>" + "<dd>" + items[i][26] + "</dd>" +

						"<dt>订餐小秘书</dt>" + "<dd>" + items[i][27] + "</dd>"
						+ "<dt>手机</dt>" + "<dd>" + items[i][29] + "</dd>" +

						"<dt>电话</dt>" + "<dd>" + items[i][30] + "</dd>"
						+ "<dt>找位</dt>" + "<dd>" + items[i][28] + "</dd>"
						+ "<dt>直达号</dt>" + "<dd>" + items[i][33] + "</dd>"
						+ "<dt>百度直达号</dt>" + "<dd>" + items[i][34] + "</dd>"
						+ "<dt>百度地图</dt>" + "<dd>" + items[i][32] + "</dd>"
						+ "<dt>淘点点</dt>" + "<dd>" + items[i][31] + "</dd>"
						+ "<dt>enjoy</dt>" + "<dd>" + items[i][35] + "</dd>"
						+ "<dt>未知</dt>" + "<dd>" + items[i][20] + "</dd>" +

						"</dl> " + "</div>";
			}
			var tablehtml = "<div class='report-table'>" + trhtml + "</div>";
			$("#source-1").empty();
			$("#source-1").append(tablehtml);

			sourcepageQuery.afterQuery();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			bkeruyun.hideLoading();
			alert("网络异常，请检查网络连接状态！");
		}

	});
}
/** 预订来源结束* */

/** 预订状态start* */
function status() {
	commerial = $("#commercialId option:selected").val();
	brandId = $("#brandList  option:selected").val();
	var stime = $("#date-start").val();
	var etime = $("#date-end").val();
	bkeruyun.showLoading();
	$.post('report/bookingStatus/getBookingStatusChart.do', {
		'brandId' : brandId,
		'startTime' : stime,
		'endTime' : etime,
		"commercialId" : commerial
	}, function(chartdata) {
		bkeruyun.hideLoading();
		var chartjson = jQuery.parseJSON(chartdata);

		if (isSameday(stime, etime)) {

			chartjson.xlist = [ '早餐', '午餐', '下午茶', '晚餐', '夜宵', '其他', '默认' ];
		}
		myChart = echarts.init(document.getElementById('bookingStatus'));
		var start = 100;
		var end = 0;
		if (chartjson.xlist[0].split("~").length > 1) {
			start = 100;
			end = 0;
		}
		var judge = [ false, false, false, false, false, false, false ];// 存放
																		// echarts
																		// legend
																		// 的对应数据selected
																		// 属性
		/** 判断是否数据全为0，进行修改数据selected属性 start */
		for (var i = 0; i < chartjson.xlist.length; i++) {
			while (chartjson.yhdd[i] > 0) {
				judge[0] = true;
				break;
			}
			while (chartjson.yhld[i] > 0) {
				judge[1] = true;
				break;
			}
			while (chartjson.yqx[i] > 0) {
				judge[2] = true;
				break;
			}
			while (chartjson.wcl[i] > 0) {
				judge[3] = true;
				break;
			}
			while (chartjson.yjj[i] > 0) {
				judge[4] = true;
				break;
			}
			while (chartjson.yqwdd[i] > 0) {
				judge[5] = true;
				break;
			}
			while (chartjson.yhwdd[i] > 0) {
				judge[6] = true;
				break;
			}
		}
		/** 判断是否数据全为0，进行修改数据selected属性 end */
		option = {
			title : {
				text : '预订状态报表'
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				x : 'left',
				y : 'bottom',
				selected : {
					'已到店' : judge[0],
					'已离店' : judge[1],
					'已取消' : judge[2],
					'未处理' : judge[3],
					'已拒绝' : judge[4],
					'逾期未到店' : judge[5],
					'未到店' : judge[6]
				},
				data : [ '已到店', '已离店', '已取消', '未处理', '已拒绝', '逾期未到店', '未到店' ]

			},

			calculable : true,

			grid : {
				x : 70,
				y : 60,
				x2 : 70,
				y2 : 100
			},
			dataZoom : {
				orient : "horizontal",
				show : true,
				start : start,
				end : end,
				y : 310
			},

			xAxis : [

			{
				realtime : true,
				type : 'category',
				boundaryGap : false,
				data : chartjson.xlist
			}

			],
			yAxis : [ {
				type : 'value'
			} ],
			series : [

			{
				"name" : "已到店",
				"type" : "line",
				"data" : chartjson.yhdd
			}, {
				"name" : "已离店",
				"type" : "line",
				"data" : chartjson.yhld
			}, {
				"name" : "已取消",
				"type" : "line",
				"data" : chartjson.yqx
			}, {
				"name" : "未处理",
				"type" : "line",
				"data" : chartjson.wcl
			}, {
				"name" : "已拒绝",
				"type" : "line",
				"data" : chartjson.yjj
			}, {
				"name" : "逾期未到店",
				"type" : "line",
				"data" : chartjson.yqwdd
			}, {
				"name" : "未到店",
				"type" : "line",
				"data" : chartjson.yhwdd
			} ]
		};

		var count = getcount(chartjson.yhwdd) + getcount(chartjson.yhdd)
				+ getcount(chartjson.yhld) + getcount(chartjson.yqx)
				+ getcount(chartjson.wcl) + getcount(chartjson.yjj)
				+ getcount(chartjson.yqwdd);

		if (count != 0) {
			$("#status").show();
			myChart = echarts.init(document.getElementById('bookingStatus'));
			myChart.setOption(option);
			$("#status").parent().find(".notSearchContent").hide();
		} else {
			$("#status").hide();
			if ($("#status").parent().find(".notSearchContent").length > 0) {
				$("#status").parent().find(".notSearchContent").show();
			} else {
				var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧!");
				$("#status").parent().append(notData);
			}

		}

		$("#status_count").html(count);
		$("#status_average").html(Math.round(count / getdays(stime, etime)));
		$("#status_yhdd").html(getcount(chartjson.yhdd));
		$("#status_yhld").html(getcount(chartjson.yhld));
		$("#status_yqx").html(getcount(chartjson.yqx));
		$("#status_wcl").html(getcount(chartjson.wcl));
		$("#status_yjj").html(getcount(chartjson.yjj));
		$("#status_yqwdd").html(getcount(chartjson.yqwdd));
		$("#status_yhwdd").html(getcount(chartjson.yhwdd));

	});

	statuspageQuery = new PageQuery("statuspageQuery"); // 构建分页查询对象
	// var valueData = {};
	statuspageQuery.pageSize = 15;
	statuspageQuery.queryPage(1, loadStatus);
};

// 预订状态分页 start
function loadStatus() {
	var stime = $("#date-start").val();
	var etime = $("#date-end").val();
	brandId = $("#brandList  option:selected").val();
	commerial = $("#commercialId option:selected").val();
	var params = "brandId=" + brandId + "&" + "startTime=" + stime + "&"
			+ "endTime=" + etime + "&" + statuspageQuery.getPageParameter(true);
	if (typeof (commerial) != "undefined") {
		params = "brandId=" + brandId + "&" + "startTime=" + stime + "&"
				+ "endTime=" + etime + "&" + "commercialId=" + commerial + "&"
				+ statuspageQuery.getPageParameter(true);
	}

	$
			.ajax({
				type : "POST",
				url : "report/bookingStatus/queryListForPage.do",
				data : params + "&random=" + Math.random(),
				dataType : "json",
				cache : false,
				// async: false,
				beforeSend : bkeruyun.showLoading,
				success : function(data) {
					bkeruyun.hideLoading();
					statuspageQuery.pageQueryDataId = "status-1"; // 设置数据表格的id
					statuspageQuery.pageQueryToolId = "statusToolDiv"; // 设置分页工具栏的id
					statuspageQuery.showTotalPage = true;
					statuspageQuery.showTotalRows = true;
					statuspageQuery.totalRows = data.totalRows;
					statuspageQuery.lastPage = (statuspageQuery.lastPage == null ? 1
							: statuspageQuery.currentPage);
					var items = data.items;
					var trhtml = "";
					for (var i = 0; i < items.length; i++) {
						var count = Number(items[i].yhwdd)
								+ Number(items[i].yhdd) + Number(items[i].yhld)
								+ Number(items[i].yqx) + Number(items[i].wcl)
								+ Number(items[i].yjj) + Number(items[i].yqwdd);
						trhtml += "<tr style='background-color: rgb(255, 255, 255);'><td>"
								+ items[i].time
								+ "</td>"
								+ "<td>"
								+ items[i].yhdd
								+ "</td>"
								+ "<td>"
								+ items[i].yhld
								+ "</td>"
								+ "<td>"
								+ items[i].yqx
								+ "</td>"
								+ "<td>"
								+ items[i].wcl
								+ "</td>"
								+ "<td>"
								+ items[i].yjj
								+ "</td>"
								+ "<td>"
								+ items[i].yqwdd
								+ "</td>"
								+ "<td>"
								+ items[i].yhwdd
								+ "</td>"
								+ "<td>"
								+ count
								+ "</td></tr>";
					}
					$("#status-1").empty();
					$("#status-1").append(trhtml);

					statuspageQuery.afterQuery();
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					bkeruyun.hideLoading();
					alert("网络异常，请检查网络连接状态！");
				}

			});
}
/** 预订状态end* */

/** 按分析指标 分页调用start* */
function loadData() {
	var options = $("#indicatorsSelect1 option:selected").val();
	if (options == 0) {
		chartPage();
	}
	if (options == 1) {
		loadStatus();
	}
	if (options == 2) {
		loadperiod();
	}
	if (options == 3) {
		loadSource();
	}
}
/** 按分析指标 分页调用end* */

// 获取最大当天最大的预订来源
function getNameByMax(sourceNum, maxNum) {
	var sourceName = [ "未知", "代订", "到店", "大众点评", "美团", "百度糯米", "微信", "订餐小秘书",
			"找位", "手机", "电话", "淘点点", "百度地图", "直达号", "百度直达号", "enjoy" ];

	var num = 0;
	for (var i = 0; i < sourceNum.length; i++) {
		if (sourceNum[i] == maxNum) {
			num = i;
			break;
		}

	}

	return sourceName[num];
};

// 预订总量
function getcount(list) {
	var count = 0;
	for (var i = 0; i < list.length; i++) {
		count += Number(list[i]);
	}
	return count;
}
// 获取2个时间段中的天数
function getdays(stime, etime) {
	var days = 1;
	if (stime != null && etime != null && etime != stime) {
		var a = new Date(stime).getTime();
		var b = new Date(etime).getTime();
		var c = 60 * 60 * 24 * 1000;
		days = (b - a) / c;
		days = Number(days) + 1;
	}
	return days;
}

function isSameday(stime, etime) {
	var days = 0;
	var a = new Date(stime).getTime();
	var b = new Date(etime).getTime();
	var c = 60 * 60 * 24 * 1000;
	days = (b - a) / c;
	if (days == 0) {
		return true;
	} else {
		return false;
	}
}

// var report = {
// //点击展开 查看详情
// folding:(function(){
// $(document).delegate(".report-table > .report-table-row","click",function(){
//    				    
//    				   
//    				    
// var nextObj = $(this).next(".report-table-details");
// var tempstatu=nextObj.css('display');
// $(".report-table-details").hide();
//    				    
// if(tempstatu=='block'){
// nextObj.show();
// }else{
// nextObj.hide();
//     						
// }
// if(nextObj.is(":hidden")){
// nextObj.show();
// $(this).addClass("report-table-down");
// }else{
// nextObj.hide();
// $(this).removeClass("report-table-down");
// }
// });
// })(),
// ////报表二级列表重新分配宽度
// resetItemsLevel2:function(obj){
// var itemsParent = $(obj),
// items = itemsParent.find("li"),
// len = items.length,
// w = itemsParent.innerWidth();
// //console.log("len == " + len);
// //小于6个宽度平均分配
// if(len<6){
// var newLiW = Math.floor(w/len)-1 + 'px';
// console.log("newLiW == " + newLiW + "; w==" + w);
// items.width(newLiW);
// //等于6 什么都不做
// }else if(len == 6){
// return;
// //大于6换行 添加补白
// }else{
// var spaceLi = '',
// spaceLiLen = 6-len%6;
// //console.log("spaceLiLen == " + spaceLiLen);
// for(var i=0;i<spaceLiLen;i++){
// spaceLi += '<li></li>';
// }
// itemsParent.append(spaceLi);
// itemsParent.css({"border-bottom":"0 none"});
// itemsParent.find("li").css({"border-bottom":"1px solid #c8c8c8"});
//    						
// }
// },
// //计算公式
// formulaTip:(function(){
// $(".formula-tip > span").hover(function(){
// $(".formula-tip > p").show();
// },function(){
// $(".formula-tip > p").hide();
//    				
// });
// })()
//    		
//    		
// };

$(function() {
	// 初始化日历控件
	datepickerInitializeReport();
});
function datepickerInitializeReport() {
	var startObj = $("#date-start"),
	    endObj = $('#date-end');
	startObj.change(function(){
		var startValue = $(this).val(),
			endValue = (parseInt(startValue.substring(0,4))+1) + startValue.substring(4);
		endObj.attr("data-date-endDate",endValue);
	});
	endObj.focus(function(){
		var startValue = startObj.val(),
	    	endValue = (parseInt(startValue.substring(0,4))+1) + startValue.substring(4);
		endObj.attr("data-date-endDate",endValue);
	});
//	var startObj = $("#date-start"), endObj = $('#date-end');
//
//	startObj.datetimepicker({
//		format : "yyyy-mm-dd",
//		language : 'zh-CN',
//		weekStart : 1,
//		todayBtn : 1,
//		autoclose : true,
//		todayHighlight : true,
//		startView : 2,
//		minView : 2,
//		// maxView: 2,
//		forceParse : true
//	}).on(
//			"changeDate",
//			function(ev) {
//				var startValue = $(this).val(), endValue = (parseInt(startValue
//						.substring(0, 4)) + 1)
//						+ startValue.substring(4);
//
//				// 清除上一次操作;
//				endObj.datetimepicker("remove");
//				endObj.val("");
//
//				// 重新初始化结束时间 开始日期之前不可选
//				endObj.datetimepicker({
//					format : "yyyy-mm-dd",
//					language : 'zh-CN',
//					weekStart : 1,
//					todayBtn : 1,
//					autoclose : true,
//					todayHighlight : true,
//					startView : 2,
//					minView : 2,
//					startDate : startValue,
//					endDate : endValue,
//					// maxView: 2,
//					forceParse : true
//				});
//				// 清空开始日期 结束日期为空 不可选
//				startObj.next(".close").bind("click", function() {
//					endObj.datetimepicker("remove");
//					endObj.val("");
//				});
//			});
//	if (startObj.val() != "") {
//		var startValue = startObj.val(), endValue = (parseInt(startValue
//				.substring(0, 4)) + 1)
//				+ startValue.substring(4);
//		endObj.datetimepicker({
//			format : "yyyy-mm-dd",
//			language : 'zh-CN',
//			weekStart : 1,
//			todayBtn : 1,
//			autoclose : true,
//			todayHighlight : true,
//			startView : 2,
//			minView : 2,
//			startDate : startValue,
//			endDate : endValue,
//			// maxView: 2,
//			forceParse : true
//		});
//	}

}
