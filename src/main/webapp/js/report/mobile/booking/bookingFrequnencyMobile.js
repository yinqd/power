$(function(){
	//初始化日期数据
	initDate();
	queryBookingFrequency();
	
	//日周年月状态切换
	$(document).delegate("#cycleList > li","touchstart",function(){
		queryBookingFrequency();
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
		queryBookingFrequency();
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
		queryBookingFrequency();
	});
	//门店选择
	$(document).delegate(".filter-conditions >li a","touchstart",function(){
		$(".filter-conditions >li a").removeClass("current");
		$(this).addClass("current");
	});
	//点击确认开始查询数据
	$(document).delegate(".btn-confirm","click",function(){
		queryBookingFrequency();
	});
});

function initDate(){
	$(".current-date").text(getWeekStartDate()+"至"+getWeekEndDate());
	$(".current").trigger("click"); 
}
function queryBookingFrequency(){
	var params = getParams();
	//ctxPath全局变量
/*	$.post(ctxPath+"/report/bookingFrequency/weixin/queryByMobile", params, function(data) {
			//重置图表
			resetData();
		var jsonData = $.parseJSON(data);
			if(jsonData.totalCount>0){
				showComponent();
				var morethan5 = jsonData.morethan5;
				var btw3_5 = jsonData.btw3_5;
				var btw1_2=jsonData.btw1_2;
				drawPie( morethan5,btw3_5,btw1_2);
				setSpan( jsonData.totalCount,morethan5,btw3_5,btw1_2);				
			}else{
				hideComponent();
				$('#chartDiv').html("<div class='notSearchContent'>没有查到数据，试试其他查询条件吧！</div>");
			}
	});*/
	
	$.ajax({
		type: "POST",
		url: ctxPath+"/report/bookingFrequency/weixin/queryByMobile",
		data: params,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		cache: false,
		//async: false,
		success: function(data) {
			//重置图表
			resetData();
		var jsonData = $.parseJSON(data);
			if(jsonData.totalCount>0){
				showComponent();
				hideNoDataTip();
				var morethan5 = jsonData.morethan5;
				var btw3_5 = jsonData.btw3_5;
				var btw1_2=jsonData.btw1_2;
				drawPie( morethan5,btw3_5,btw1_2);
				setSpan( jsonData.totalCount,morethan5,btw3_5,btw1_2);				
			}else{
				hideComponent();
				showNoDataTip();
			}
		}
	});
}

function showNoDataTip(){
	var notData = '<div class="notSearchContent">没有查到数据，试试其他查询条件吧！</div>';
	if ($("#chartDiv").parent().find(".notSearchContent").length > 0) {
		$("#chartDiv").parent().find(".notSearchContent").show();
	} else {
		$("#chartDiv").parent().append(notData);
	}	
}

function hideNoDataTip(){
	if ($("#chartDiv").parent().find(".notSearchContent").length > 0) {
		$("#chartDiv").parent().find(".notSearchContent").hide();
	}
}


function getParams(){
	var type = $("#cycleList > li.current").text();
	var starTime ,endTime,commercialId;
	if( $(".current-date").text() =="" ||  $(".current-date").text()==null){
		initDate();
		starTime = getWeekStartDate();
		endTime = getWeekEndDate();
	}
	var array = $(".current-date").text().split("至");
	starTime = array[0];
	endTime = array[1];
	if(type == "年"){
		starTime = nowYear+"-01-01";
		endTime = nowYear +"-12-31";
	}
	var commercialId = $(".filter-conditions  a.current").attr("data-commercialId");
	if(commercialId == "全部门店")
		{
		commercialId ="all";
		}
	var parms = {"startTime":starTime,"endTime":endTime,"commercialId":commercialId};
	return parms;
}

/**
 * 绘制预订频次饼图
 */
function drawPie(a,b,c) {
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
		var seriesData = [];
		if(a >0){
			seriesData.push({"name":'预订5次以上','value':a});
		}
		if(b>0){
			seriesData.push({"name":'预订3～5次','value':b});
		}
		if(c>0){
			seriesData.push({"name":'预订1~2次','value':c});
		}
		option = {
			tooltip : {
				trigger : 'item',
				 formatter: function (params,ticket,callback) {
					 	var  percent = "0%";
					 	if(params[3] != null){
					 		percent = parseFloat(params[3]).toFixed(1)+"%";
					 	}
					 	var st = params[0]+"<br/>"+params[1]+":"+params[2]+"("+percent+")";
			            return st;
			        }
			},
			legend : {
				orient : 'horizontal',
				y : 'right',
				data : [ '预订5次以上', '预订3～5次', '预订1~2次' ]
			},
			series : [ {
				name : '客户预订频次占比分析',
				type : 'pie',
				radius : '60%',
				center : [ '50%', '50%' ],
				data :seriesData
			} ]
		};
		// 为echarts对象加载数据 
		myChart.setOption(option);
	});
}

//绘制饼图结束
//填充span
function setSpan(a,b,c,d){
	//$('.report-status.report-status-level2 >li>div>span:eq(0)').text(100);
	$('span.a').text(a);
	$('span.b').text(b ==0?"0%":(b/a*100).toFixed(1)+"%");
	$('span.b').siblings().filter('.sub-number').text(b+"位");
	$('span.c').text(c ==0?"0%":(c/a*100).toFixed(1)+"%");
	$('span.c').siblings().filter('.sub-number').text(c+"位");
	$('span.d').text(d ==0?"0%":(d/a*100).toFixed(1)+"%");
	$('span.d').siblings().filter('.sub-number').text(d+"位");
}

function resetData(){
	
	$('span.a').text(0);
	$('span.b').text(0);
	$('span.b').siblings().filter('.sub-number').text("0位");
	$('span.c').text(0);
	$('span.c').siblings().filter('.sub-number').text("0位");
	$('span.d').text(0);
	$('span.d').siblings().filter('.sub-number').text("位");
}

function hideComponent(){
	$('#chartDiv').hide();
	$(".report-status-level2").hide();
}
function showComponent(){
	$('#chartDiv').show();
	$(".report-status-level2").show();
}
	