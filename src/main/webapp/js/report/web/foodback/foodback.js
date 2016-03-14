var queryParameter="";
var pageQuery = new PageQuery("pageQuery"); //构建分页查询对象
pageQuery.pageQueryDataId = "tbody-1"; //设置数据表格的id
pageQuery.pageQueryToolId = "pageToolDiv"; //设置分页工具栏的id
pageQuery.showTotalPage = true;
pageQuery.showTotalRows=true;
$(function(){
	$(document).delegate(".icon-view","click",function(e){
		$(this).submit();
	});
	dateLimitTrigger();
	$(document).delegate("#undo-all","click",function(){
		$("#date-start").val('');
		$("#date-end").val('');
		$('#indicatorsSelect1').find('option:selected').attr("selected",false);
		$('#indicatorsSelect1').find('option').eq(0).attr("selected",true);
		var commercialName = $('#indicatorsSelect1').find('option').eq(0).text();
		$(".select-control").find('em').text(commercialName );
	});
	pageQuery.queryPage(1, loadData);
});

function foodbackInitValue(){
	//默认时间为当天
	var d = new Date();
	if( $("#date-start").val()==null ||  $("#date-start").val()==''){
		$("#date-start").val(d.Format("yyyy-MM-dd"));
	}
	if($("#date-end").val()==null ||  $("#date-end").val()==''){
		$("#date-end").val($("#date-start").val());
	}	
	if($("#indicatorsSelect1").val()==null||$("#indicatorsSelect1").val()==''){
		$('#indicatorsSelect1')[0].selectedIndex = 1;
	}
}

function dateLimitTrigger(){
	// 设置开始时间小于等于今天
	var startObj=$('#date-start'),endObj=$('#date-end');
	startObj.attr({"data-date-endDate":new Date().Format("yyyy-MM-dd")});
	startObj.change(function(){
		var now = new Date();
		var temp =  new Date($('#date-start').val());
		temp.setFullYear(temp.getFullYear()+1);
		var maxDate= now.getTime()>temp.getTime()?temp.Format("yyyy-MM-dd"):now.Format("yyyy-MM-dd");
		
			endObj.attr({"data-date-endDate":maxDate});
	});
	endObj.focus(function(){
		var now = new Date();
		var temp =  new Date($('#date-start').val());
		temp.setFullYear(temp.getFullYear()+1);
		var maxDate= now.getTime()>temp.getTime()?temp.Format("yyyy-MM-dd"):now.Format("yyyy-MM-dd");
		
			endObj.attr({"data-date-endDate":maxDate});
	});
	//设置开始时间最大值
//	$('#date-start').datetimepicker('setEndDate', new Date().Format("yyyy-MM-dd"));
//	$("#date-start").on("changeDate",function(ev){	
//		var now = new Date();
//		var temp =  new Date($('#date-start').val());
//		temp.setFullYear(temp.getFullYear()+1);
//		var maxDate= now.getTime()>temp.getTime()?temp.Format("yyyy-MM-dd"):now.Format("yyyy-MM-dd");
//		$('#date-end').datetimepicker("remove");
//		console.debug("endtime,min:"+$('#date-start').val()+"  max:"+maxDate);
//		$('#date-end').datetimepicker({
//			format: "yyyy-mm-dd",
//			language:  'zh-CN',
//			weekStart: 1,
//			todayBtn:  1,
//			autoclose: true,
//			todayHighlight: true,
//			startView: 2,
//			minView: 2,
//			startDate: $('#date-start').val(),
//			endDate: maxDate,
//			//maxView: 2,
//			forceParse: true
//		});
//	});
}

//点击查询或第一次进入页面，查询数据
function queryData(){
	pageQuery.currentPage = 1; 
	pageQuery.queryPage(1, loadData);
}

/**
 * 加载数据
 */
function loadData(){
	foodbackInitValue();
	var  id = $("#indicatorsSelect1").val();
	var params = {"startTime":$("#date-start").val(),
			"endTime":$("#date-end").val(),
			"commercialId":id,
			"currentPage":pageQuery.currentPage,
			"pageSize":pageQuery.pageSize};
	$.ajax({
		type: "GET",
		url: ctxPath+ "/report/foodback/queryByWeb",
		data: params,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		cache: false,
		//async: false,
		beforeSend:bkeruyun.showLoading,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			bkeruyun.hideLoading();
	        alert("网络异常，请检查网络连接状态！");
	    },
		success: function(data){
			bkeruyun.hideLoading();
			var jsons = $.parseJSON(data);	
			pageQuery.totalRows = jsons.totalRows;
			pageQuery.lastPage = (pageQuery.lastPage == null ? 1 : pageQuery.currentPage);
			
		/*	if(items== null ||items.length==0){
				$("tbody").append(html.join(""));
			}*/
			resetData();
			
			if(jsons.chartData != null){
				showComponent();
				hideNodataTip();
				setSpan( jsons.totalPrice,jsons.dishCount);
				refushTable( jsons.tableData);	
				drawChart(jsons.chartData);
				pageQuery.afterQuery();
			}else{
				showNodataTip();
				hideComponent();
			}
		}
	});
}

function hideNodataTip(){
	if ($(".chartDiv").parent().find(".notSearchContent").length > 0) {
		$(".chartDiv").parent().find(".notSearchContent").hide();
	}
}

function showNodataTip(){
	var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧！");
	if ($(".chartDiv").parent().find(".notSearchContent").length > 0) {
		$(".chartDiv").parent().find(".notSearchContent").show();
	} else {
		$(".chartDiv").parent().append(notData);
	}	
	
}

function showComponent(){
	$('.chartDiv').show();
	$(".report-items-level1").show();
	$(".text-center").show();
	$("#pageToolDiv").show();
}
function hideComponent(){
	$('.chartDiv').hide();
	$(".report-items-level1").hide();
	$(".text-center").hide();
	$("#pageToolDiv").hide();
}

function setSpan(totalPrice,dishCount){
//	console.log("set span");
	$('.number').first().text("￥"+totalPrice);
	$('.number').last().text(dishCount);
}

function resetData(){
	$("#dataGrid").empty();
	$('.number').first().text("￥"+0);
	$('.number').last().text(0);
}

/**
 * 绘制预订频次饼图
 */
function drawChart(chartData) {
//	console.log("draw pie start");
	var legendData =  new Array();
	var seriesData = new Array();
	for(i = 0;i<chartData.length;i++){
		legendData.push(chartData[i].dishName);
		var item = chartData[i];
		seriesData.push({'name':item.dishName,'value':item.totalPrice});
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
			title : {
				text : '退菜占比分析',
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
					 	var st = params[1]+"<br/>退菜金额：￥"+params[2]+"("+percent+")";
			            return st;
			        }
			},
			legend : {
				orient : 'horizontal',
				y : 'bottom',
				data : legendData
			},
			series : [ {
				name : '退菜占比分析',
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
//	console.log("draw pie end");
}
//绘制饼图结束

/**
 * 填充表格
 * @param items
 */
function refushTable(items){
//	console.log("refushTable start");
	var html=[],len=0;
	for(var i=0;i<items.length;i++){
		html[len++]="<tr><td>"+items[i].dishName+"</td>";
		html[len++]="<td>"+items[i].dishTypeName+"</td>";
		html[len++]="<td>"+items[i].dishCount+"</td>";
		html[len++]="<td>"+items[i].totalPrice+"</td>";
		html[len++]="<td>"+items[i].orderCount+"</td>";
		var  stime=$("#date-start").val();
		var  etime=$("#date-end").val();
		var commercialId =$('select').val();
		var url = ctxPath+"/report/foodback/detailView?dishId="+items[i].dishId
		+"&startTime="+(stime ==null?'-':stime)
		+"&endTime="+(etime ==null?'-':etime)
		+"&commercialId="+commercialId
		+"&totalPrice="+(items[i].totalPrice==null?'-':items[i].totalPrice)
		+"&dishCount="+(items[i].dishCount==null?'-':items[i].dishCount);
		html[len++]="<td><a href=\""+url+"\" target=\"_blank\" title=\"查看\" class=\"icon-view\" >查看</a></td>";
	}
	$("#dataGrid").append(html.join(""));
//	console.log("refushTable end");
}


function detailView(id){
	 var params = {dishName:$("#."+id).attr("dishName")
			 		,dishId:$("#."+id).attr("dishId")
			 		,dishCount:$("#."+id).attr("dishCount")
			 		,totalPrice:$("#."+id).attr("totalPrice")
	 };
	$.post(ctxPath+"/report/foodback/detailView", params, function(data) {
		clearChart();
		clearSpan();
		var jsons = $.parseJSON(data);	
		if(jsons.chartData != null){
			drawChart(jsons.chartData);
		}
		if(jsons.dishCount != null && jsons.totalPrice!= null){				
			setSpan( jsons.totalPrice,jsons.dishCount);
		}
		if(jsons.tableData != null){
			refushTable( jsons.tableData);	
		}
	});
}