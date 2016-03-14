var queryParameter="";
var startObj = $("#date-start"), endObj = $('#date-end');
var pageQuery = new PageQuery("pageQuery"); //构建分页查询对象
var date=new Date().Format("yyyy-MM-dd");
var startDate=addByTransDate(date,-6);//开始时间
var endDate=date;//结束时间
var commercialId="";//商户编号
var weekarr=new Array();
var obj3=new Array();
var datedi=0;

$(function(){
	searchReport();
});



function searchReport(){
	bkeruyun.showLoading();
	datepickerInitializeReport();
	
	if( $("#date-start").val()!=null && $("#date-start").val()!=''){
		startDate=$("#date-start").val();
	}else{
		startDate=addByTransDate(date,-6);
		$("#date-start").val(startDate);
		if(!bkeruyun.isPlaceholder()){
			$("#date-start").next("span").hide();
		}
	}
	if($("#date-end").val()!=null &&   $("#date-end").val()!=''){
		endDate=$("#date-end").val();
	}else{
		$("#date-end").val(addByTransDate(startDate,6));
		if(!bkeruyun.isPlaceholder()){
			$("#date-end").next("span").hide();
		}
		endDate=$("#date-end").val();
	}
	commercialId=$("#commercialId").val();
	
	weekarr.length=0;
	obj3.length=0;
	datedi=DateDiff(startDate,endDate);
	if(datedi<6){
		for(var j=0;j<datedi+1;j++){
			var day=new Date(addByTransDate(startDate,j)).getDay();
			weekarr.push(day);
			if(day == 1){
				obj3.push("周一");
			}
			if(day == 2){
				obj3.push("周二");
			}
			if(day == 3){
				obj3.push("周三");
			}
			if(day == 4){
				obj3.push("周四");
			}
			if(day == 5){
				obj3.push("周五");
			}
			if(day == 6){
				obj3.push("周六");
			}
			if(day == 0){
				obj3.push("周日");
			}
		}
	}else{
		
		obj3.push("周一");
		obj3.push("周二");
		obj3.push("周三");
		obj3.push("周四");
		obj3.push("周五");
		obj3.push("周六");
		obj3.push("周日");
	}
	
	
	queueLossReport();
//	JPlaceHolder.init();
}



//报表查询
function queueLossReport(){
	queryParameter="startDate="+startDate+"&endDate="+endDate+"&commercialId="+commercialId;
	$.ajax({
		type: "POST",
		url: "report/queue/avgWaitTimeReport",
		data: queryParameter,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
//		async: false,
		cache: false,
		beforeSend:bkeruyun.showLoading,
		success: function(data){
			bkeruyun.hideLoading();
			//获取总条数
			var items=data.items;
			var obj=new Array();
			var obj2=new Array();
			if(items != null && items.length > 0){
				pageQuery.totalRows = items.length;
				for(var i=0;i<items.length;i++){
					//每个排队平均等待时长的百分比
					if(i<11){
					
						var str="{name:'"+items[i].repastPersonCount+"人',type:'line',statck:'平均等待时长',data:["+items[i].mon+","+items[i].tues+","+items[i].wed+","+items[i].thur+","+items[i].fri+","+items[i].sat+","+items[i].sun+"]}";
						if(datedi<6){
							var dataarr=new Array();
							if($.inArray(1,weekarr)>-1 ){
								dataarr.push(items[i].mon);
							}
							if($.inArray(2,weekarr)>-1 ){
								dataarr.push(items[i].tues);
							}
							if($.inArray(3,weekarr)>-1){
								dataarr.push(items[i].wed);
							}
							if($.inArray(4,weekarr)>-1){
								dataarr.push(items[i].thur);
							}
							if($.inArray(5,weekarr)>-1){
								dataarr.push(items[i].fri);
							}
							if($.inArray(6,weekarr)>-1){
								dataarr.push(items[i].sat);
							}
							if($.inArray(0,weekarr)>-1){
								dataarr.push(items[i].sun);
							}
							str="{name:'"+items[i].repastPersonCount+"人',type:'line',statck:'平均等待时长',data:["+dataarr.toString()+"]}";
						}
						
						//需要放入折线图的值
						obj.push(items[i].repastPersonCount+"人");
						obj2.push(eval("("+str+")"));
					}
				}
				
				//够建分页对象
				pageQuery.pageQueryDataId = "tbody"; //设置数据表格的id
				pageQuery.pageQueryToolId = "pageToolDiv"; //设置分页工具栏的id
				pageQuery.showTotalPage = true;
				pageQuery.showTotalRows=true;
				pageQuery.pageSize=15;
				pageQuery.queryPage(1, loadData);
				
				if($("#queueCon").is(":hidden")){
					$("#queueCon").show();
					$("#queueCon").parent().find(".notSearchContent").hide();
				}
				echartsLine(obj,obj2,obj3);
				
			}else{
				var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧！");
				if($("#queueCon").parent().find(".notSearchContent").length > 0){
					$("#queueCon").hide();
					$("#queueCon").parent().find(".notSearchContent").show();
				}else{
					$("#queueCon").hide();
					$("#queueCon").parent().append(notData);
				}
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			bkeruyun.hideLoading();
	        alert("网络异常，请检查网络连接状态！");
	    }
	});
}



//查询分页数据
function loadData(){
	queryParameter=queryParameter="startDate="+startDate+"&endDate="+endDate+"&commercialId="+commercialId
	+"&currentPage="+pageQuery.currentPage +  "&pageSize=" + pageQuery.pageSize;
	$.ajax({
		type: "POST",
		url: "report/queue/avgWaitTimeReport.do",
		data: queryParameter,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
//		async: false,
		cache: false,
		beforeSend:bkeruyun.showLoading,
		success: function(data){
			bkeruyun.hideLoading();
			var tbody="";
			pageQuery.lastPage = (pageQuery.lastPage == null ? 1 : pageQuery.currentPage);
			var items=data.items;
			if(items!=null  && items.length>0){
				for(var i=0;i<items.length;i++){
					tbody +='<tr>';
					tbody +='<td>'+items[i].repastPersonCount+'人</td>';
					tbody +='<td>'+items[i].mon+'分钟</td>';
					tbody +='<td>'+items[i].tues+'分钟</td>';
					tbody +='<td>'+items[i].wed+'分钟</td>';
					tbody +='<td>'+items[i].thur+'分钟</td>';
					tbody +='<td>'+items[i].fri+'分钟</td>';
					tbody +='<td>'+items[i].sat+'分钟</td>';
					tbody +='<td>'+items[i].sun+'分钟</td>';
					tbody +='</tr>';
						
				}
			}
			$("#tbody").html(tbody);
			pageQuery.afterQuery();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			bkeruyun.hideLoading();
	        alert("网络异常，请检查网络连接状态！");
	    }
	});
}

function echartsLine(obj,obj2,obj3){
	require.config({
	    paths: {
	        echarts: 'js/echarts'
	    }
	});
	require(
	    [
	        'echarts',
	        'echarts/chart/line'  // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
	    ],
	    function (ec) {
	        var myChart = ec.init(document.getElementById('echarts_pie'));
	        var option = 
	        	        {
	        	            title : {
	        	                text: '平均等待时长',
	        	            },
	        	            tooltip : {
	        	                trigger: 'axis',
	        	                formatter: function (params,ticket,callback) {
	        	                    var res = params[0].name;
	        	                    for (var i = 0, l = params.length; i < l; i++) {
	        	                        res += '<br/>' + params[i].seriesName + ' : ' + params[i].value +"分钟";
	        	                    }
	        	                    return res;
	        	                }
	        	            },
	        	            legend: {
	        	            	orient:'horizontal',
	        	            	y:'bottom',
	        	            	x:'center',
	        	                data:obj
	        	            },
	        	           // calculable : true,
	        	            xAxis : [
	        	                     {
	        	                         type : 'category',
	        	                         boundaryGap : false,
	        	                         data : obj3
	        	                     }
	        	                 ],
	        	                 yAxis : [
	        	                     {
	        	                         type : 'value'
	        	                     }
	        	                 ],
	        	            series :obj2
	        	        }
	        
	        myChart.setOption(option);
	    }
	)
}

function datepickerInitializeReport(){
	// 设置开始时间小于等于今天
	startObj.attr({"data-date-endDate":addByTransDate(date,-6)});
	startObj.change(function(){
		var startValue = $.trim($(this).val());
			if (startValue < (parseInt(date.substring(0, 4)) - 1)
					+ date.substring(4)) {
				endValue = (parseInt(startValue.substring(0, 4)) + 1)
						+ startValue.substring(4);
			} else {
				endValue = date;
			}
			startValue= addByTransDate(startValue,6)
//	console.log("startValue==="+startValue);
//	console.log("endValue==="+endValue);
			endObj.attr({"data-date-endDate":endValue});
	});
//	startObj.datetimepicker('setEndDate',addByTransDate(date,-6));
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
//		endDate : addByTransDate(date,-6),
//		forceParse : true
//	}).on(
//			"changeDate",
//			function(ev) {
//				// 清除上一次操作;
//				endObj.datetimepicker("remove");
//				endObj.val("");
//			});
//	
//	
//	$(document).delegate(".datepicker-end","focus",function(){
//		var startValue = $.trim(startObj.val());
//		if(startValue){
//			if (startValue < (parseInt(date.substring(0, 4)) - 1)
//					+ date.substring(4)) {
//				endValue = (parseInt(startValue.substring(0, 4)) + 1)
//						+ startValue.substring(4);
//			} else {
//				endValue = date;
//			}
//			startValue= addByTransDate(startValue,6)
//			console.log("startValue==="+startValue);
//			console.log("endValue==="+endValue);
//			// 重新初始化结束时间 开始日期之前不可选
//			endObj.datetimepicker({
//				format : "yyyy-mm-dd",
//				language : 'zh-CN',
//				weekStart : 1,
//				todayBtn : 1,
//				autoclose : true,
//				todayHighlight : true,
//				startView : 2,
//				minView : 2,
//				startDate :startValue,
//				endDate : endValue,
//				forceParse : true
//			});
//		
//		}
//	});
}
                    
