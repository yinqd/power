var commercialId=null;
var startTime="";
var endTime="";
var day=null;
var obj=new Array();
var obj2=new Array();
$(function(){
	 var pagewidth = $(window).width();
     var pageheight = $(window).height();
     if (browser.versions.mobile) {
      
         $("#echarts_pie").height(pageheight*0.6);
         $("#echarts_pie").width(pagewidth * 0.95);
     }
 	// 单独高亮显示 一级菜单到页面去执行
 	mobileReport.separateHighlighted('.filter-conditions a','click', 'current');
	
	$("#commercialId").val($(".filter-conditions  a.current").attr("id"));
	queueLossReport();
	
	//点击日周月年
	$(document).delegate("#cycleList > li","touchstart",function(){
		//var day=$(this).text();
		//var commercialId=$(".filter-conditions  a.current").attr("id");
		queueLossReport();
	});
	
	$(document).delegate(".btn-confirm","touchstart",function(){
		var commercialId=$(".filter-conditions  a.current").attr("id");
		$("#commercialId").val(commercialId);
		queueLossReport();
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


//报表查询
function queueLossReport(){
	day=$("#cycleList > li.current").text(); 
	startTime="";
	endTime="";
	if(day=="周"){
		startTime=getWeekStartDate();
		endTime=getWeekEndDate();
		$(".next").hide();
		$(".current-date").text(startTime+"至"+endTime);
	}else if(day=="月"){
		startTime=getMonthStartDate();
		endTime=getMonthEndDate();
		$(".next").hide();
		$(".current-date").text(startTime+"至"+endTime);
	}else if(day == "年"){
		startTime=nowYear+"-01-01";
		endTime=nowYear+"-12-31";
	}else{
		 startTime=new Date().Format("yyyy-MM-dd");
		 endTime=new Date().Format("yyyy-MM-dd");
		 $(".next").hide();
		 $(".current-date").text(startTime);
	}
	
	//获取商户编号
	commercialId=$("#commercialId").val();
	queryParameter="commercialId="+commercialId+"&startDate="+startTime+"&endDate="+endTime;
	 getAjax(queryParameter);
}


function getAjax(queryParameter){
	var reportObj = $("#default"),//显示内容的容器
	reportWrap = reportObj.parent();
	$.ajax({
		type: "POST",
		url: "report/queue/weixin/queueLossReport",
		data: queryParameter,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		async: false,
		cache: false,
		success: function(data){
			var items=data.items;
			obj.length=0;
			obj2.length=0;
			var html="";
			var total=0;
			var cancelCount=0;
			var invalidCount=0;
			var per=0;
			var othertotal=0;
			var othercancelCount=0;
			var otherinvalidCount=0;
			if(items != null && items.length > 0){
				for(var i=0;i<items.length;i++){
					//获取排队总数
					total+=items[i].totalCount;
					//获取排队取消总数
					cancelCount += items[i].cancelCount;
					//获取作废总数
					invalidCount += items[i].invalidCount;
					//每个排队流失率的百分比
					if ((items[i].totalCount-items[i].cancelCount)>0) {
						per = (Math.round(items[i].invalidCount / (items[i].totalCount-items[i].cancelCount) * 10000 ) / 100.00);
					}else {
						per=0;
					}
					if(i<11){
						html+="<li><div><span class='number'>" +per+"%</span><span>"+items[i].repastPersonCount+"人排队流失率</span></div></li>";
						var str="{value:"+per+",name:'"+items[i].repastPersonCount+"人'}";
						//需要放入饼图的值
						if(per>0){
							obj.push(items[i].repastPersonCount+"\n人");
							obj2.push(eval("("+str+")"));
						}
						
					}else{
						othertotal+=items[i].totalCount;
						othercancelCount += items[i].cancelCount;
						otherinvalidCount += items[i].invalidCount;
					}
				}
				if(items.length>11){
					if (( othertotal - othercancelCount)>0) {
						per = (Math.round(otherinvalidCount /( othertotal - othercancelCount) * 10000 ) / 100.00);
					}else {
						per=0;
					}
					html+="<li><div><span class='number'>" +per+"%</span><span>其它</span></div></li>";
					if(per>0){
						obj.push("其它"+'\n'+"人数");
						var str="{value:"+per+",name:'其它人数'}";
						obj2.push(eval("("+str+")"));
					}
					
				}
				
				
				if(reportObj.is(":hidden")){
					reportObj.show();
					reportWrap.find(".notSearchContent").hide();
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
					$("#text").show().html("Good！流失率是零哦~棒棒哒~"+"<br><br>");
					$("#echarts_pie").hide();
				}
				//总流失率
				/*
				var rate=0;
				if (total-cancelCount==0) {
					rate=0;
				}else {
					rate=Math.round(invalidCount/(total-cancelCount)*10000)/100;
				}
				$("#allCount").text(rate+"%");
				*/
				$("#reportItemsLevel2-agent").html(html);
			}else{
				var notData = mobileReport.notQueryData("没有查到数据，试试其他查询条件吧！");
				if(reportWrap.find(".notSearchContent").length > 0){
					reportObj.hide();
					reportWrap.find(".notSearchContent").show();
				}else{
					reportObj.hide();
					reportWrap.append(notData);
				}
			}
			
		}
	});
}

//下一、上一调用函数
function getInfo(){
	queryParameter="commercialId="+commercialId+"&startDate="+startTime+"&endDate="+endTime;
	 getAjax(queryParameter);
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
    	            tooltip : {
    	            	trigger : 'axis',
    	                formatter: "{b}流失率 : {c}%"
    	            },
					grid : {
						x: 30,
						x2: 20,
						y: 25,
						y2: 60
					},
					calculable : false,
					xAxis : [ {
						axisLabel:{
							 show:true,
							 interval:0
						},
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
                    
//获取点击上一*后的开始、结束日期
function prev(){
	var ms = 1000*60*60*24;//一天之中毫秒数
	if (day == "周") {
		startTime= new Date(parseInt(new Date(startTime).getTime()-7*ms)).Format("yyyy-MM-dd");
		endTime= new Date(parseInt(new Date(endTime).getTime()-7*ms)).Format("yyyy-MM-dd");
	} else if (day == "月") {
		endTime= new Date(parseInt(new Date(startTime).getTime()-ms)).Format("yyyy-MM-dd");
		tempMonth=new Date(endTime).getMonth();
		tempYear=new Date(endTime).getFullYear();
		startTime=new Date(tempYear,tempMonth,1).Format("yyyy-MM-dd");
	} else {
		startTime=endTime= new Date(parseInt(new Date(startTime).getTime()-ms)).Format("yyyy-MM-dd");
	}
}
//获取点击下一*后的开始、结束日期
function next(){
	var ms = 1000*60*60*24;//一天之中毫秒数
	if (day == "周") {
		startTime= new Date(parseInt(new Date(startTime).getTime()+7*ms)).Format("yyyy-MM-dd");
		endTime= new Date(parseInt(new Date(endTime).getTime()+7*ms)).Format("yyyy-MM-dd");
	} else if (day == "月") {
		startTime= new Date(parseInt(new Date(endTime).getTime()+ms)).Format("yyyy-MM-dd");
		tempMonth=new Date(startTime).getMonth();
		tempYear=new Date(startTime).getFullYear();
		tempDays=getMonthDays(tempMonth);
		endTime=new Date(tempYear,tempMonth,tempDays).Format("yyyy-MM-dd");
	} else {
		startTime=endTime= new Date(parseInt(new Date(startTime).getTime()+ms)).Format("yyyy-MM-dd");
	}
}

$(window).on("orientationchange",function(){
	  var pagewidth = $(window).width();
	  var pageheight = $(window).height();
	  if(window.orientation == 0 || window.orientation == 180) // Portrait  竖屏模式
	  {
		  $("#echarts_pie").height(pageheight*0.6);
	  }
	  else // Landscape  横屏模式
	  {
		  $("#echarts_pie").height(pageheight*0.8);
	  }
      $("#echarts_pie").width(pagewidth * 0.95);
      if (obj!=null) {
    	  echartsPie(obj,obj2);
	}
	});
