var queryParameter="";
var startObj = $("#date-start"), endObj = $('#date-end');
var pageQuery = new PageQuery("pageQuery"); //构建分页查询对象
var date=new Date().Format("yyyy-MM-dd");
var startDate=date;//开始时间
var endDate=startDate;//结束时间
var commercialId="";//商户编号

$(function(){
	searchReport();
});




function searchReport(){
	bkeruyun.showLoading();
	//初始化日历控件
	datepickerInitializeReport();
	//开始时间不为空
	if( $("#date-start").val()!=null && $("#date-start").val()!=''){
		startDate=$("#date-start").val();
		//结束时间不为空
		if($("#date-end").val()!=null &&   $("#date-end").val()!=''){
			endDate=$("#date-end").val();
			//结束时间为空（结束时间等于开始时间）
		}else{
			$("#date-end").val($("#date-start").val());
			endDate=$("#date-end").val();
			if(!bkeruyun.isPlaceholder()){
				$("#date-end").next("span").hide();
			}
		}
		//开始时间为空（开始、结束时间都为今天）
	}else{
		startDate=endDate=date;
		$("#date-start").val(startDate);
		$("#date-end").val($("#date-start").val());
		if(!bkeruyun.isPlaceholder()){
			$("#date-start").next("span").hide();
			$("#date-end").next("span").hide();
		}
	}
	commercialId=$("#commercialId").val();
	
	queueLossReport();
}



//报表查询
function queueLossReport(){
	queryParameter="startDate="+startDate+"&endDate="+endDate+"&commercialId="+commercialId;
	
	$.ajax({
		type: "POST",
		url: "report/queue/queueLossReport",
		data: queryParameter,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
//		async: false,
//		beforeSend:bkeruyun.showLoading,
		cache: false,
		success: function(data){
			//获取总条数
			var items=data.items;
			var obj=new Array();
			var obj2=new Array();
			var html="";
			var total=0;
			var cancelCount=0;
			var invalidCount=0;
			if(items != null && items.length > 0){
				pageQuery.totalRows = items.length;
				for(var i=0;i<items.length;i++){
					//获取排队总数
					total+=items[i].totalCount;
					//获取排队取消总数
					cancelCount += items[i].cancelCount;
					//获取作废总数
					invalidCount += items[i].invalidCount;
				}
				var othertotal=0;
				var othercancelCount=0;
				var otherinvalidCount=0;
				var per = 0;
				for(var i=0;i<items.length;i++){
					//每个排队流失率的百分比
					if ((items[i].totalCount-items[i].cancelCount)>0) {
						per = (Math.round(items[i].invalidCount / (items[i].totalCount-items[i].cancelCount) * 10000 ) / 100.00);
					}else {
						per=0;
					}
					if(i<11){
						html+="<li><span class='number'>" +per+"%</span><span>"+items[i].repastPersonCount+"人排队流失率</span></li>";
						var str="{value:"+per+",name:'"+items[i].repastPersonCount+"人'}";
						//需要放入饼图的值
						if(per>0){
							obj.push(items[i].repastPersonCount+"人");
							obj2.push(eval("("+str+")"));
						}
						
					}else{
						othertotal+=items[i].totalCount;
						othercancelCount += items[i].cancelCount;
						otherinvalidCount += items[i].invalidCount;
					}
				}
				if(items.length>11){
					if ((othertotal - othercancelCount)>0) {
						per = (Math.round(otherinvalidCount /( othertotal - othercancelCount) * 10000 ) / 100.00);
					}else {
						per=0;
					}
					html+="<li><span class='number'>" +per+"%</span><span>其它</span></li>";
					if(per>0){
						obj.push("其它人数");
						var str="{value:"+per+",name:'其它人数'}";
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
				
				
				
				
				if($("#queueLossCon").is(":hidden")){
					$("#queueLossCon").show();
					$("#queueLossCon").parent().find(".notSearchContent").hide();
				}
				
				if(obj.length>0){
					for(var j=items.length;j<11;j++){
						obj.push("");
						obj2.push(0);
					}
					
					
					//排队流失率饼图
					$("#echarts_pie").show();
					$("#text").hide();
					echartsPie(obj,obj2);
				}else{
					$("#text").show().html("Good！流失率是零哦~棒棒哒~");
					$("#echarts_pie").hide();
				}
				
				
			}else{
				bkeruyun.hideLoading();
				var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧！");
				if($("#queueLossCon").parent().find(".notSearchContent").length > 0){
					$("#queueLossCon").hide();
					$("#queueLossCon").parent().find(".notSearchContent").show();
				}else{
					$("#queueLossCon").hide();
					$("#queueLossCon").parent().append(notData);
				}
			}
			//总流失率
			var rate=0;
			if (total-cancelCount==0) {
				rate=0;
			}else {
				rate=Math.round(invalidCount/(total-cancelCount)*10000)/100;
			}
			$("#allCount").text(rate+"%");
			$("#reportItemsLevel2-status").html(html);
			report.resetItemsLevel2("#reportItemsLevel2-status");
		}
	});
}



//查询分页数据
function loadData(){
	queryParameter="startDate="+startDate+"&endDate="+endDate+"&commercialId="+commercialId+"&currentPage="+pageQuery.currentPage +  "&pageSize=" + pageQuery.pageSize;
	$.ajax({
		type: "POST",
		url: "report/queue/queueLossReport.do",
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
					if ((items[i].totalCount-items[i].cancelCount)>0) {
						var per = (Math.round(items[i].invalidCount / (items[i].totalCount-items[i].cancelCount) * 10000 ) / 100.00);
					}else {
						per=0;
					}
					tbody +='<tr>';
					tbody +='<td>'+items[i].repastPersonCount+'</td>';
					tbody +='<td>'+items[i].totalCount+'</td>';
					//tbody +='<td>'+items[i].queuingCount+'</td>';
					//tbody +='<td>'+items[i].admissionCount+'</td>';
					tbody +='<td>'+items[i].invalidCount+'</td>';
					tbody +='<td>'+items[i].cancelCount+'</td>';
					tbody +='<td>'+per+'%</td>';
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

function echartsPie(obj,obj2){
	require.config({
	    paths: {
	        echarts: 'js/echarts'
	    }
	});
	require(
	    [
	        'echarts',
	        'echarts/chart/bar'  // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
	    ],
	    function (ec) {
	        var myChart = ec.init(document.getElementById('echarts_pie'));
	        var option = 
	        	        {
	        	            title : {
	        	                text: '排队流失率占比分析',
	        	                	x:'left'
	        	               // subtext: '纯属虚构'
	        	            },
	        	            tooltip : {
	        	            	trigger : 'axis',
	        	                formatter: "{b}流失率 : {c}%"
	        	            },
							dataZoom : {
								orient : "horizontal",
								y : 200,
								//start : 50,
								//end : 55 
							},
							grid : {
								y2 : 90
							},
							calculable : false,
							xAxis : [ {
								type : 'category',
								data : obj

							} ],
							yAxis : [ {
								type : 'value'
							} ],
							series : [ {
								name : '排队流失率',
								type : 'bar',            
								itemStyle: {
					                normal: {
					                    color: function(params) {
					                        // build a color map as your need.
					                        var colorList = [
					                          '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
					                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
					                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
					                        ];
					                        return colorList[params.dataIndex]
					                    }
					                  
					                }
					            },
								data : obj2
							} ]
	        	        }
	        
	        myChart.setOption(option);
	    }
	)
}

function datepickerInitializeReport(){
	// 设置开始时间小于等于今天
	startObj.attr({"data-date-endDate":date});
	startObj.change(function(){
		var startValue = $.trim($(this).val());
			if (startValue < (parseInt(date.substring(0, 4)) - 1)
					+ date.substring(4)) {
				endValue = (parseInt(startValue.substring(0, 4)) + 1)
						+ startValue.substring(4);
			} else {
				endValue = date;
			}
			endObj.attr({"data-date-endDate":endValue});
	});
	endObj.focus(function(){
		var startValue = $.trim($(this).val());
		if (startValue < (parseInt(date.substring(0, 4)) - 1)
				+ date.substring(4)) {
			endValue = (parseInt(startValue.substring(0, 4)) + 1)
					+ startValue.substring(4);
		} else {
			endValue = date;
		}
		endObj.attr({"data-date-endDate":endValue});
	});
//	startObj.datetimepicker('setEndDate', date);
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
//				startDate : startValue,
//				endDate : endValue,
//				// maxView: 2,
//				forceParse : true
//			});
//		
//		}
//	});
}
                    
