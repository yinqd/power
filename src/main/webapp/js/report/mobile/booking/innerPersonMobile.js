var obj;
var items;
var startTime = "";
var endTime = "";
var day = null;
var commercialId= null;
$(function(){
	 var pagewidth = $(window).width();
     var pageheight = $(window).height();
     if (browser.versions.mobile) {
      
         $("#echarts_pie").height(pageheight*0.6);
         $("#echarts_pie").width(pagewidth * 0.95);
     }
	
	$("#commercialId").val($(".filter-conditions  a.current").attr("id"));
	innerPersonReport();
	// 单独高亮显示 一级菜单到页面去执行
 	mobileReport.separateHighlighted('.filter-conditions a','click', 'current');
	//点击日周月年
	$(document).delegate("#cycleList > li","touchstart",function(){
		//var day=$(this).text();
		//var commercialId=$(".filter-conditions  a.current").attr("id");
		innerPersonReport();
	});
	
	$(document).delegate(".btn-confirm","touchstart",function(){
		var commercialId=$(".filter-conditions  a.current").attr("id");
		$("#commercialId").val(commercialId);
		innerPersonReport();
	});
	//点击筛选按钮 重置当前门店
	reportLayer.btnFilter.on("click",function(){
		var commercialId = $("#commercialId").val(),
		    commercialLinks = $("#filter-con .filter-conditions a");
		for(var i=0,len=commercialLinks.length;i<len;i++){
			if(commercialLinks.eq(i).attr("id") === commercialId){
				commercialLinks.removeClass("current");
				commercialLinks.eq(i).addClass("current");
			}
		}
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
function innerPersonReport(){
	day=$("#cycleList > li.current").text();
	startTime="";
	endTime="";
	var reportObj = $("#default"),//显示内容的容器
		reportWrap = reportObj.parent();
	if(day=="周"){
		startTime=getWeekStartDate();
		endTime=getWeekEndDate();
		$(".current-date").text(startTime+"至"+endTime);
	}else if(day=="月"){
		startTime=getMonthStartDate();
		endTime=getMonthEndDate();
		$(".current-date").text(startTime+"至"+endTime);
	}else if(day == "年"){
		startTime=nowYear+"-01-01";
		endTime=nowYear+"-12-31";
	}else{
		 startTime=new Date().Format("yyyy-MM-dd");
		 endTime=new Date().Format("yyyy-MM-dd");
		 $(".current-date").text(startTime);
	}
	
	//获取商户编号
	commercialId=$("#commercialId").val();
	
	queryParameter="commercialId="+commercialId+"&startTime="+startTime+"&endTime="+endTime;
	$.ajax({
		type: "POST",
		url: "report/bookingReport/weixin/innerPersonReport",
		data: queryParameter,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		async: false,
		cache: false,
		success: function(data){
			items=data.items;
			obj=new Array();
			var html="";
			var total=0;
			if(items != null && items.length > 0){
				for(var i=0;i<items.length;i++){
					obj.push(items[i].name);
					//获取代理人总数
					total+=items[i].value;
				}
				//代理人饼图
				echartsPie(obj,items);
				var other=0;
				var per = 0;
				for(var i=0;i<items.length;i++){
					//每个代理人的百分比
					per = (Math.round(items[i].value / total * 10000 ) / 100.00);
					if(i<5){
						html+="<li><div><span class='number'>" +per+"%</span><span>"+items[i].name+"</span><span class='sub-number'>"+items[i].value+"</span></div></li>";
					}else{
						other+=items[i].value;
					}
				}
				if(items.length>5){
					per = (Math.round(other / total * 10000 ) / 100.00);
					html+="<li><div><span class='number'>" +per+"%</span><span>其它</span><span class='sub-number'>"+ other +"</span></div></li>";
				}
				if(reportObj.is(":hidden")){
					reportObj.show();
					reportWrap.find(".notSearchContent").hide();
				}
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
			$("#total").text(total);
			$("#reportItemsLevel2-agent").html(html);
		}
	});
}

//下一、上一调用函数
function getInfo(){
	var reportObj = $("#default"),//显示内容的容器
	reportWrap = reportObj.parent();
	queryParameter="commercialId="+commercialId+"&startTime="+startTime+"&endTime="+endTime;
	$.ajax({
		type: "POST",
		url: "report/bookingReport/weixin/innerPersonReport",
		data: queryParameter,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		async: false,
		cache: false,
		success: function(data){
			items=data.items;
			obj=new Array();
			var html="";
			var total=0;
			if(items != null && items.length > 0){
				for(var i=0;i<items.length;i++){
					obj.push(items[i].name);
					//获取代理人总数
					total+=items[i].value;
				}
				//代理人饼图
				echartsPie(obj,items);
				var other=0;
				var per = 0;
				for(var i=0;i<items.length;i++){
					//每个代理人的百分比
					per = (Math.round(items[i].value / total * 10000 ) / 100.00);
					if(i<5){
						html+="<li><div><span class='number'>" +per+"%</span><span>"+items[i].name+"</span><span class='sub-number'>"+items[i].value+"</span></div></li>";
					}else{
						other+=items[i].value;
					}
				}
				if(items.length>5){
					per = (Math.round(other / total * 10000 ) / 100.00);
					html+="<li><div><span class='number'>" +per+"%</span><span>其它</span><span class='sub-number'>"+ other +"</span></div></li>";
				}
				if(reportObj.is(":hidden")){
					reportObj.show();
					reportWrap.find(".notSearchContent").hide();
				}
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
			$("#total").text(total);
			$("#reportItemsLevel2-agent").html(html);
		}
	});
}

function echartsPie(obj,obj2){
	var per="60%";
	if(obj2.length<5){
		per="60%";
	}else if(obj2.length<10){
		per="50%";
	}else{
		per="40%";
	}
	require.config({
	    paths: {
	        echarts: 'js/echarts'
	    }
	});
	require(
	    [
	        'echarts',
	        'echarts/chart/pie'  // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
	    ],
	    function (ec) {
	        var myChart = ec.init(document.getElementById('echarts_pie'));
	        var option = 
	        	        {
	        		/**
	        	            title : {
	        	                text: '代理人预订占比分析',
	        	                	x:'left'
	        	               // subtext: '纯属虚构'
	        	            },*/
	        	            tooltip : {
	        	                trigger: 'item',
	        	                formatter: "{b} : {c} ({d}%)"
	        	            },
	        	            legend: {
	        	            	orient:'horizontal',
	        	            	y:'bottom',
	        	            	x:'center',
	        	                data:obj
	        	            },
	        	            toolbox: {
	        	            	x:"center",
	        	                show : false,//是否展示工具栏
	        	                feature : {
	        	                    mark : {show: true},//是否展示辅助线
	        	                    dataView : {show: true, readOnly: true},
	        	                    magicType : {
	        	                        show: true, 
	        	                        type: ['pie', 'funnel'],
	        	                        option: {
	        	                            funnel: {
	        	                                x: '25%',
	        	                                width: '50%',
	        	                                funnelAlign: 'left',
	        	                                max: 1700
	        	                            }
	        	                        }
	        	                    },
	        	                    restore : {show: true},
	        	                    saveAsImage : {show: false}
	        	                }
	        	            },
	        	            series : [
	        	                {
	        	                    name:'代理人预订占比分析',
	        	                    type:'pie',
	        	                    center: ['50%', '50%'],
	        	                    itemStyle : {
	    				                normal : {
	    				                    label : {
	    				                        show : false
	    				                    },
	    				                    labelLine : {
	    				                        show : false
	    				                    }
	    				                }
	    				            },
	        	                    radius: per,
	        	                    data:obj2
	        	                }
	        	            ]
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
//		  alert(22);
//		  reportLayer.filterMemu.css({"-webkit-transform":'translate(' + pagewidth + 'px' + ', 0 )'});
//		  hengshuping();
		  $("#echarts_pie").height(pageheight*0.6);
	   // $(".report-column").css({"background-color":"yellow","font-size":"300%"});
	  }
	  else // Landscape  横屏模式
	  {
//		  reportLayer.filterMemu.css({"-webkit-transform":'translate(' + pagewidth + 'px' + ', 0 )'});
//		  alert(23);
//		  hengshuping();
		  $("#echarts_pie").height(pageheight*0.8);
	  //  $(".report-column").css({"background-color":"pink","font-size":"200%"});
	  }
	  
      $("#echarts_pie").width(pagewidth * 0.95);
      echartsPie(obj,items);
     // $('#echarts_pie').time_analysis('rfreshChart');
	  //$('#echarts_pie').refresh();
	});
/*
$(window).resize(function () {
	SetData("resize");
    $('#echarts_pie').time_analysis('rfreshChart');
});
*/
//function hengshuping(){
//	alert(0);
//	var pagewidth = $(window).width();
//	reportLayer.filterMemu.css({"-webkit-transform":'translate(' + pagewidth + 'px' + ', 0 )'});
//}
	
//window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
