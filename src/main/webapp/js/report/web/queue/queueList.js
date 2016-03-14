/**
 * @author zhaoc
 */
var startObj = $("#date-start"), endObj = $('#date-end');
var pageQuery = new PageQuery("pageQuery"); // 构建分页查询对象
pageQuery.pageQueryDataId = "tbody"; // 设置数据表格的id
pageQuery.pageQueryToolId = "pageToolDiv"; // 设置分页工具栏的id
pageQuery.showTotalPage = true;

var commercialId = null;
var brandId = null;
var startDate = null;
var endDate = null;
var today = new Date().Format("yyyy-MM-dd");
$(function() {
	newquery();
	report.resetItemsLevel2("#reportItemsLevel2-status");
})
// 查询出发事件
function newquery() {
 	time();
	ready();
	
}
// 排队列表函数
function ready() {
	brandId=null;
	commercialId=null;
	// 如果开始时间为空的设置为当前日期
	if ($("#date-start").val() == null || $("#date-start").val() == '') {
		$("#date-start").val(today);
		if(!bkeruyun.isPlaceholder()){
			$("#date-start").next("span").hide();
		}
	}
	// 如果结束时间为空设置结束时间等于结束时间
	if ($("#date-end").val() == null || $("#date-end").val() == '') {
		$("#date-end").val($("#date-start").val());
		if(!bkeruyun.isPlaceholder()){
			$("#date-end").next("span").hide();
		}
	}
	startDate = $("#date-start").val();
	endDate = $("#date-end").val();
	// 如果选择编号不等于门店编号，那么选择的编号为门店，否则为品牌编号
	if ($("#indicatorsSelect1 option:selected").val() != $(".brandId").val()) {
		commercialId = $("#indicatorsSelect1 option:selected").val();
	} else {
		brandId = $("#indicatorsSelect1 option:selected").val();
	}		
	bkeruyun.showLoading();
			$.post(
					'report/queueReport/getInfo',
					{
						'brandId' : brandId,
						'commercialId' : commercialId,
						'startDate' : startDate,
						'endDate' : endDate
					},
					function(data) {
						bkeruyun.hideLoading();
						var objx = new Array();
						var objy = new Array();
						var total = 0;// 总排队数
						var queuing = 0;// 总排队中数
						var admission = 0;// 总入场数
						var invalid = 0;// 总作废数
						var cancel = 0;// 总取消数
						var rate = 0; // 流失率
						var chose = false;
						if (data.list.length > 0) {
							if ($("#main").is(":hidden")) {
								$("#main").show();
								$("#main").parent().find(".notSearchContent").hide();
							}
						
							pageQuery.totalRows = data.list.length;
							pageQuery.queryPage(1, loadData);
							for (var i = 0; i < data.echartsInfoVos.length; i++) {
								objx.push(data.echartsInfoVos[i].x);
								objy.push(data.echartsInfoVos[i].y);
								total += data.echartsInfoVos[i].y;
								queuing += data.echartsInfoVos[i].queuingCount;
								admission += data.echartsInfoVos[i].admissionCount;
								invalid += data.echartsInfoVos[i].invalidCount;
								cancel += data.echartsInfoVos[i].cancelCount;
							}
							// 如果选择同一天那么不显示时间轴（dataZoom）
							if (endDate != startDate) {
								chose = true;
							}
							var myChart = echarts.init(document
									.getElementById('echarts_line'));
							option = {
								title : {
									text : '排队量报表'
								},
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
									show : chose,
									y : 340
								},
								grid : {
									y2 : 90
								},
								calculable : true,
								xAxis : [ {
									type : 'category',
									boundaryGap : false,
									data : objx

								} ],
								yAxis : [ {
									type : 'value'
								} ],
								series : [ {
									name : '排队总次数',
									type : 'line',
									data : objy
								} ]
							};
							myChart.setOption(option);
							// 如果（总排队数-取消数）=0那么流失率为0
							if (total - cancel == 0) {
								rate = 0;
							} else {
								rate =Math.round(invalid / (total - cancel)* 10000)/100;
							}
							$("#total").text(total);
							$("#queuing").text(queuing);
							$("#admission").text(admission);
							$("#invalid").text(invalid);
							$("#cancel").text(cancel);
							$("#rate").text(rate + "%");
						} else {
							// $("#echarts_pie").html("没有查到数据，试试其他查询条件吧！");
							var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧！");
							if ($("#main").parent().find(".notSearchContent").length > 0) {
								$("#main").hide();
								$("#main").parent().find(".notSearchContent")
										.show();
							} else {
								$("#main").hide();
								$("#main").parent().append(notData);
							}
						}
					})
}
// 分页查询
function loadData() {
	bkeruyun.showLoading();
	$.post('report/queueReport/getInfo', {
		'brandId' : brandId,
		'commercialId' : commercialId,
		'startDate' : startDate,
		'endDate' : endDate,
		'currentPage' : pageQuery.currentPage,
		'pageSize' : pageQuery.pageSize
	}, function(map) {
		bkeruyun.hideLoading();
		var Insert = '';
		pageQuery.lastPage = (pageQuery.lastPage == null ? 1: pageQuery.currentPage);
		if (map.list.length > 0) {
			for (var i = 0; i < map.list.length; i++) {
				var date = map.list[i].date;
				var t = map.list[i].totalCount;// 总排队数
				var q = map.list[i].queuingCount;// 排队中
				var a = map.list[i].admissionCount;// 总入场数
				var c = map.list[i].cancelCount;// 总取消数
				var inv = map.list[i].invalidCount;// 总作废数
				var r = 0; // 流失率
				if (t - c == 0) {
					r = 0;
				} else {
					r = Math.round(inv / (t - c) * 10000)/100;
				}
				Insert += '<tr><td>' + date + '</td><td>' + t + '</td><td>' + q
						+ '</td><td>' + a + '</td><td>' + inv + '</td><td>' + c
						+ '</td><td>' + r + '%</td></tr>';
			}
		}
		pageQuery.afterQuery();
		$("#list tbody").html(Insert);
	})
}
function time() {
	// 设置开始时间小于等于今天
	startObj.attr("data-date-endDate",today);
	startObj.change(function(){
		var startValue = $.trim(startObj.val());
		if (startValue < (parseInt(today.substring(0, 4)) - 1)
				+ today.substring(4)) {
			endValue = (parseInt(startValue.substring(0, 4)) + 1)
					+ startValue.substring(4);
		} else {
			endValue = today;
		}
		endObj.attr("data-date-endDate",endValue);
	});
	endObj.focus(function(){
		var startValue = $.trim(startObj.val());
		if (startValue < (parseInt(today.substring(0, 4)) - 1)
				+ today.substring(4)) {
			endValue = (parseInt(startValue.substring(0, 4)) + 1)
					+ startValue.substring(4);
		} else {
			endValue = today;
		}
		endObj.attr("data-date-endDate",endValue);
	});
//	startObj.datetimepicker('setEndDate', today);
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
//				// 清除上一次操作;
//				endObj.datetimepicker("remove");
//				endObj.val("");
//			});
//	
	
//	$(document).delegate(".datepicker-end","focus",function(){
//		var startValue = $.trim(startObj.val());
//		if(startValue){
//			if (startValue < (parseInt(today.substring(0, 4)) - 1)
//					+ today.substring(4)) {
//				endValue = (parseInt(startValue.substring(0, 4)) + 1)
//						+ startValue.substring(4);
//			} else {
//				endValue = today;
//			}
//			// 重新初始化结束时间 开始日期之前不可选
//			endObj.attr("data-date-endDate",endValue);
////			endObj.attr("data-date-startDate":startValue,"data-date-endDate":endValue);
////			endObj.datetimepicker({
////				format : "yyyy-mm-dd",
////				language : 'zh-CN',
////				weekStart : 1,
////				todayBtn : 1,
////				autoclose : true,
////				todayHighlight : true,
////				startView : 2,
////				minView : 2,
////				startDate : startValue,
////				endDate : endValue,
////				// maxView: 2,
////				forceParse : true
////			});
//		
//		}
//	});
}
