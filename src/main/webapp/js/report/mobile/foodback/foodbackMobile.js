$(function() {

	initDate();
	// 日周年月状态切换
	$(document).delegate("#cycleList > li", "touchstart", function() {
		queryChart();
	});

	//门店选择
	$(document).delegate(".filter-conditions >li a","touchstart",function(){
		$(".filter-conditions >li a").removeClass("current");
		$(this).addClass("current");
	});
	
	//点击确认开始查询数据
	$(document).delegate(".btn-confirm","click",function(){
		queryChart();
	});
	
	//重写 reportMobile btn 的click事件方法
	reportLayer.btnPrev.unbind("click");
	reportLayer.btnPrev.bind("click ",function(){
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
		queryChart();
	});
	reportLayer.btnNext.unbind("click");
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
		queryChart();
	});
	queryChart();
});

function initDate() {
	$(".current-date").text(formatDate(new Date()));
	$(".current").trigger("click");
}
/**
 * 加载数据
 */
function queryChart() {
	var params = getParams();
	$.post(ctxPath + "/report/foodback/weixin/queryByMobile", params, function(data) {
		resetData();
		var jsons = $.parseJSON(data);
		if (jsons.chartData != null) {
			showComponent();
			hideNoDataTip();
				$.each(jsons.chartData,function(i,v){
			if(v.dishName.length>5){
				jsons.chartData[i].dishName= v.dishName.substr(0,5)+"...";
				}
				});
			drawChart(jsons.chartData);
			setSpan(jsons.totalPrice, jsons.dishCount);
		} else {
			hideComponent();
			showNoDataTip();
		}
	});

	function showNoDataTip(){
		var notData = '<div class="notSearchContent">没有查到数据，试试其他查询条件吧！</div>';
		if ($(".chartDiv").parent().find(".notSearchContent").length > 0) {
			$(".chartDiv").parent().find(".notSearchContent").show();
		} else {
			$(".chartDiv").parent().append(notData);
		}	
	}
	
	function hideNoDataTip(){
		if ($(".chartDiv").parent().find(".notSearchContent").length > 0) {
			$(".chartDiv").parent().find(".notSearchContent").hide();
		}
	}
		
	function resetData() {
//		console.log("reset data");
		
		$('.number').first().text("￥0");
		$('.number').last().text("0");
	}

	function showComponent(){
		$('.chartDiv').show();
		$(".report-status").show();
	}
	function hideComponent(){
		$('.chartDiv').hide();
		$(".report-status").hide();
	}
	function setSpan(totalPrice, dishCount) {
//		console.log("set span");
		$('.number').first().text("￥" + totalPrice);
		$('.number').last().text(dishCount);
	}

	/**
	 * 绘制预订频次饼图
	 */
	function drawChart(chartData) {
//		console.log("draw pie start");
		var legendData = new Array();
		var seriesData = new Array();

		for (i = 0; i < chartData.length; i++) {
			legendData.push(chartData[i].dishName);
			var item = chartData[i];
			// seriesData.push("{\"name\":\""+item.dishName+","+item.totalCount+"\","+"\"value\":"+item.totalPrice+"}");
			seriesData.push({
				'name' : item.dishName,
				'value' : item.totalPrice
			});
		}
		// 路径配置
		require.config({
			paths : {
				echarts : 'js/echarts'
			}
		});
		// 使用
		require([ 'echarts', 'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
		], function(ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('chartDiv'));
			option = {
				tooltip : {
					trigger : 'item',
					formatter : function(params, ticket, callback) {
					 	var  percent = "0%";
					 	if(params[3] != null){
					 		percent = parseFloat(params[3]).toFixed(1)+"%";
					 	}
						var st = params[1] + "<br/>退菜金额：￥" + params[2]+"("+percent+")";
						return st;
					}
				},
				legend : {
					orient : 'vertical',
					x : 'right',
					show : false,
					data : legendData
				},
				series : [ {
					name : '退菜占比分析',
					type : 'pie',
					radius : '45%',
					center : [ '50%', '50%' ],
					data : seriesData
				} ]
			};
			// 为echarts对象加载数据
			myChart.setOption(option);
		});
//		console.log("draw pie end");
	}
	// 绘制饼图结束
	// ///获取参数
	function getParams() {
		var type = $("#cycleList > li.current").text();
		var starTime, endTime, commercialId;
		if (type == "年") {
			starTime = nowYear + "-01-01";
			endTime = nowYear + "-12-31";
		} else if (type == "日") {
			starTime = $(".current-date").text();
			endTime = starTime;
		} else {
			if ($(".current-date").text() == ""
					|| $(".current-date").text() == null) {
				initDate();
				starTime = getWeekStartDate();
				endTime = getWeekEndDate();
			} else {
				starTime = $(".current-date").text().split("至")[0];
				endTime = $(".current-date").text().split("至")[1];
			}
		}
		var commercialId = $(".filter-conditions  a.current").attr(
				"data-commercialId");
		if (commercialId == "全部门店") {
			commercialId = "all";
		}
		var parms = {
			"startTime" : starTime,
			"endTime" : endTime,
			"commercialId" : commercialId
		};
		return parms;
	}
}