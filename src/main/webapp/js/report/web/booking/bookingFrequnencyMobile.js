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
});

function initDate(){
	$(".current-date").text(getWeekStartDate()+"至"+getWeekEndDate());
	$(".current").trigger("click"); 
}
function queryBookingFrequency(){
	var parms = getParams();
	//ctxPath全局变量
	$.post(ctxPath+"/report/bookingFrequency/queryByMobile", parms, function(data) {
			//重置图表
			resetComponent();
		var jsonData = $.parseJSON(data);
			if(jsonData.totalCount>0){
				var morethan5 = jsonData.morethan5;
				var btw3_5 = jsonData.btw3_5;
				var btw1_2=jsonData.btw1_2;
				drawPie( morethan5,btw3_5,btw1_2);
				setSpan( jsonData.totalCount,morethan5,btw3_5,btw1_2);				
			}else{
				$('#chartDiv').html("<p style='x:50px;y:50px'>没有预订记录</p>");
			}
	});
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
		var parms =  [{"name":'预订5次以上','value':a},{"name": "预订3～5次","value":b},{"name": "预订1~2次","value":c}];
		option = {
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			legend : {
				orient : 'horizontal',
				y : 'right',
				data : [ '预订5次以上', '预订3～5次', '预订1~2次' ]
			},
			series : [ {
				name : '客户预订频次占比分析',
				type : 'pie',
				//radius : '40%',
				radius : '40px',
				center : [ '50%', '40%' ],
				data :parms
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
	$('span.b').text((b/a*100).toFixed(1)+"%");
	$('span.b').siblings().filter('.sub-number').text(b+"位");
	$('span.c').text((c/a*100).toFixed(1)+"%");
	$('span.c').siblings().filter('.sub-number').text(c+"位");
	$('span.d').text((d/a*100).toFixed(1)+"%");
	$('span.d').siblings().filter('.sub-number').text(d+"位");
}

function resetComponent(){
	$('#chartDiv').empty();
	$('span.a').text(0);
	$('span.b').text(0);
	$('span.b').siblings().filter('.sub-number').text("0位");
	$('span.c').text(0);
	$('span.c').siblings().filter('.sub-number').text("0位");
	$('span.d').text(0);
	$('span.d').siblings().filter('.sub-number').text("位");
}
	