$(function(){
	queryChart();
	dateLimitTrigger();
	//
	$(document).delegate("#undo-all","click",function(){
		//$("#commercialSelect").empty(); 
		$("#date-start").val('');
		$("#date-end").val('');
		$('#commercialSelect').find('option:selected').attr("selected",false);
		$('#commercialSelect').find('option').eq(0).attr("selected",true);
		var commercialName = $('#commercialSelect').find('option').eq(0).text();
		$(".select-control").find('em').text(commercialName );
	});
});

function bookingFrequencyInitvalue(){
	//默认显示本周 周一至周日时间 可以选择未来的
	if( $("#date-start").val()==null ||  $("#date-start").val()==''){
		var stime = new Date();
		var weekDay = stime.getDay();
		var weekStartDate='',weekEndDate='';
		switch(weekDay){
			case 0:
				weekStartDate = new Date(stime*1-1000*60*60*24*6).Format("yyyy-MM-dd");
				break;
			case 1:
				weekStartDate = stime.Format("yyyy-MM-dd");
				break;
			case 2:
				weekStartDate = new Date(stime*1-1000*60*60*24*1).Format("yyyy-MM-dd");
				break;
			case 3:
				weekStartDate = new Date(stime*1-1000*60*60*24*2).Format("yyyy-MM-dd");
				break;
			case 4:
				weekStartDate = new Date(stime*1-1000*60*60*24*3).Format("yyyy-MM-dd");
				break;
			case 5:
				weekStartDate = new Date(stime*1-1000*60*60*24*4).Format("yyyy-MM-dd");
				break;
			case 6:
				weekStartDate = new Date(stime*1-1000*60*60*24*5).Format("yyyy-MM-dd");
				break;
		}
		weekEndDate = new Date(new Date(weekStartDate)*1+1000*60*60*24*6).Format("yyyy-MM-dd");
//		stime.setDate(stime.getDate()-7);
		$("#date-start").val(weekStartDate);
		$("#date-end").val(weekEndDate);
	}
//	if($("#date-end").val()==null ||  $("#date-end").val()==''){
//		var etime = new Date();
//		etime.setDate(etime.getDate()-1);
//		$("#date-end").val(etime.Format("yyyy-MM-dd"));
//	}	
}

function dateLimitTrigger(){
	var startObj = $("#date-start"), endObj = $('#date-end');
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
}


/**
 * 加载数据
 */
function queryChart(){
	//如果时间为空则初始化时间
	bookingFrequencyInitvalue();
	var  stime=$("#date-start").val();
	var  etime=$("#date-end").val();
	var  id = $("select").val();
	var diff = DateDiff(etime,stime);
	var params = {"startTime":stime,"endTime":etime,"id":id};
	$.ajax({
		type: "POST",
		url: ctxPath+ "/report/bookingFrequency/query",
		data: params,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		cache: false,
		beforeSend:bkeruyun.showLoading,
		success: function(data){
			bkeruyun.hideLoading();
			resetData();
			var jsonData = $.parseJSON(data);
			var morethan5 = jsonData.morethan5;
			var btw3_5 = jsonData.btw3_5;
			var btw1_2=jsonData.btw1_2;
			var totalCount = jsonData.totalCount;
			//当总数大于0，有数据的时候才进行下一步操作
			if(totalCount>0){
				showComponent();
				hideNodataTip();
				//绘图
				drawPie( morethan5,btw3_5,btw1_2);
				//填充span
				setSpan( totalCount,morethan5,btw3_5,btw1_2);
				//填充表格
				refushTable( jsonData.list);
			}else{
				showNodataTip();
				hideComponent();
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			bkeruyun.hideLoading();
	        alert("网络异常，请检查网络连接状态！");
	    }
	});
}

function hideNodataTip(){
	if ($("#bookingFrequencyPie").parent().find(".notSearchContent").length > 0) {
		$("#bookingFrequencyPie").parent().find(".notSearchContent").hide();
	}
}

function showNodataTip(){
	var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧！");
	if ($("#bookingFrequencyPie").parent().find(".notSearchContent").length > 0) {
		$("#bookingFrequencyPie").parent().find(".notSearchContent").show();
	} else {
		$("#bookingFrequencyPie").parent().append(notData);
	}	
}

function resetData(){
	$("#tbody_bookingGrid").empty();
	$('span.a').text(0);
	$('span.b').text(0);
	$('span.b').next().text(0);
	$('span.c').text(0);
	$('span.c').next().text(0);
	$('span.d').text(0);
	$('span.d').next().text(0);
}

function hideComponent(){
	$('#bookingFrequencyPie').hide();
	$(".formula-tip").hide();
	$(".text-center").hide();
	$("#reportItemsLevel2-status").hide();
}

function showComponent(){
	$('#bookingFrequencyPie').show();
	$(".formula-tip").show();
	$(".text-center").show();
	$("#reportItemsLevel2-status").show();
}

function setSpan(a,b,c,d){
	$('span.a').text(a);
	$('span.b').text(b ==0?"0%":(b/a*100).toFixed(1)+"%");
	$('span.b').next().text(b);
	$('span.c').text(c==0?"0%":(c/a*100).toFixed(1)+"%");
	$('span.c').next().text(c);
	$('span.d').text(d ==0?"0%":(d/a*100).toFixed(1)+"%");
	$('span.d').next().text(d);
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
		var myChart = ec.init(document.getElementById('bookingFrequencyPie'));
		var  legendData= ['预订5次以上','预订3～5次','预订1~2次'], seriesData =[];
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
			title : {
				text : '客户预订频次占比分析',
				//textStyle:'',
				x : 'left'
			},
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
				y : 'bottom',
				data :legendData
			},
			series : [ {
				name : '客户预订频次占比分析',
				type : 'pie',
				//radius : '40%',
				radius : '90px',
				center : [ '50%', '40%' ],
				data :seriesData
			} ]
		};
		// 为echarts对象加载数据 
		myChart.setOption(option);
	});
}
//绘制饼图结束

/**
 * 填充表格
 * @param items
 */
function refushTable(items){
	var html=[],len=0;
	var code="-";
	for(var i=0;i<items.length;i++){
		html[len++]="<tr><td>"+replaceWithCode(items[i].customerName,code)+"</td>";
		html[len++]="<td>"+replaceWithCode(items[i].customerMobile,code)+"</td>";
		html[len++]="<td>"+replaceWithCode(items[i].commercialName,code)+"</td>";
		html[len++]="<td>"+replaceWithCode(items[i].customerGroup,code)+"</td>";
		html[len++]="<td>"+replaceWithCode(items[i].count,code)+"</td></tr>";
	}
	$("#tbody_bookingGrid").append(html.join(""));
}

function replaceWithCode(arg,code){
	if(arg==null ||arg==""){
		return code;
	}else{
		return arg;
	}
}