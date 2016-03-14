// JavaScript Document

$(function(){
    reportLayer.btnConfirm.on("click",function(){
        /*var curLink = $("#filter-con a.current"),
            showElement = $("#" + curLink.attr("data-show-element")),
            hideElementIds = curLink.attr("data-hide-element"),
            hideElementArr = hideElementIds.split(" "),
            hideElements = '';
            console.log( curLink.attr("data-show-element"));
            console.log(hideElementIds);
            for(var i=0,len=hideElementArr.length;i<len;i++){
                $("#" + hideElementArr[i]).hide();
            }
            showElement.show();
            */
            mobileReport.hideMemu();
            bindtime();
            bookingChartMobile();

    });
    
  //点击上一*
    reportLayer.btnPrev.bind("click",function(){
    	prev();
    	//execution();
    });
    //点击下一*
    reportLayer.btnNext.bind("click",function(){
    	next();
    	//execution();
    });
    	 
    //二级菜单调用 
  mobileReport.subMenu=function(){
		var curMenu = null,targetObj = null,backMenu = $("#filter-con"),backMenuTitle = null;
		$(document).delegate(".filter-conditions > li a","click",function(){
			//alert("subMenu");
			var _this = $(this);
			//有下级菜单
			if($(this).hasClass("lower-menu")){
			  //var subMenu = $("#" + _this.parents(".filter-con").attr("data-level")),//要显示的下级菜单
				var subMenu = $("#" + _this.attr("data-level")),
					level2MenuTitle = subMenu.find(".filter-con-title"),//要显示下级菜单标题元素
					subMenuItems = subMenu.find(".filter-conditions > li > a"),//下级菜单所有选项
					level2 = _this.find(".level-2"),//保存下级菜单选项的目标元素 
					level2Title = level2.attr("title"),//下级菜单标题
					level2Id = level2.attr("id");//当前Id

				level2MenuTitle.html(level2Title);//设置下级菜单的标题
				subMenu.animate({"width":"100%"},500);//显示下级菜单
				curMenu = subMenu;//将下级菜单设置为当前的菜单
				targetObj = level2;//设置目标元素
				if(_this.parents(".filter-con").attr("id") == "filter-con"){
					//如果点击的是一级菜单 设置返回目标元素
					backMenuTitle = level2;   
				}
				//设置下级菜单当前项
				setCurrent(level2Id,subMenuItems,"id");
			}else{//无下级菜单
				//当前菜单不等于返回菜单
				if(curMenu != backMenu){
					var targetTxt = _this.html(),
						targetId = _this.attr("id");
					//alert(targetObj);
					targetObj.attr("id",targetId).html(targetTxt);
					backMenuTitle.attr("id",targetId).html(targetTxt);
					$(".filter-con2").animate({"width":"0"},500);
					curMenu = null;
					targetObj = null;
				}
			}
			

		});
		$(document).delegate(".filter-con2 .operation > a.btn-back","click",function(){
			//上级菜单
			var prevMenu = (curMenu.attr("data-prev-menu")) ? $("#" + curMenu.attr("data-prev-menu")) : null;
			curMenu.animate({"width":"0"},500);
			//将当前菜单设为上级菜单
			curMenu = prevMenu;
		});

		//设置当前选中项 @id 唯一标识；@items 要遍历的元素；@a 要遍历元素的属性
		function setCurrent(id,items,a){
			var len = items.length,itemId;

			//取消所有元素的当前状态
			items.removeClass("current");

			for(var i=0;i<len;i++){
				//判断当前元素是否含有下级菜单 lower-menu
				itemId = (items.eq(i).hasClass('lower-menu')) ? items.eq(i).find(".level-2").attr(a) : items.eq(i).attr(a);

				if(itemId === id){
					items.eq(i).addClass("current");
				}
			}
				
		}
	};
    
    
    mobileReport.subMenu();
    
    require.config({
    	paths : {
			echarts : 'js/echarts'
		}
	});

	// 天 周 月 年
	$(document).delegate("#cycleList > li", "touchstart", function() {
		$(this).addClass("current").siblings().removeClass("current");
		bindtime();
		bookingChartMobile();
	});
	
	bindtime();
	//第一次加载报表
	bookingChartMobile();
	
});




function   bindtime(){
	day = $("#cycleList > li.current").text();
	startDate = "";
	endDate = "";
	$(".prev").show();
	$(".next").show();
	if (day == "周") {
		startDate = getWeekStartDate();
		endDate = getWeekEndDate();
		$(".current-date").text(startDate+"至"+endDate);
		$(".prev").text("上一周");
		$(".next").text("下一周");
	} else if (day == "月") {
		startDate = getMonthStartDate();
		endDate = getMonthEndDate();
		$(".current-date").text(startDate+"至"+endDate);
		$(".prev").text("上一月");
		$(".next").text("下一月");
	
	} else if (day == "年") {
		startDate = nowYear + "-01-01";
		endDate = nowYear + "-12-31";
		$(".current-date").text(startDate+"至"+endDate);
		$(".prev").hide();
		$(".next").hide();
	
	} else {
		startDate = new Date().Format("yyyy-MM-dd");
		endDate = new Date().Format("yyyy-MM-dd");
		$(".prev").text("上一天");
		$(".next").text("下一天");
		$(".current-date").text(startDate);
	}
}



//// 初始化
//function initialization() {
//	var reportType = $(".filter-conditions  a.current").html();
//	type = 'day';
//	if (reportType == "选择分析指标") {
//		chart();
//	}
//	if (reportType == "预订时段") {
//		time();
//	}
//	if (reportType == "订单状态") {
//		status();
//	}
//	if (reportType == "订单来源") {
//		source();
//	}
//}
////点击确定按钮
//reportLayer.btnConfirm.on("click", function() {
//	mobileReport.hideMemu();
//    bookingChartMobile();
//
//});

// 报表查询
function bookingChartMobile() {

	var day = $("#cycleList > li.current").text();
	type = 'day';
	if (day == "周") {
		type = 'week';
	} else if (day == "月") {
		type = 'month';
	} else if (day == "年") {
		type = 'year';
	} else {
		type = 'day';
	}
	
	commercial=$("#filter-conditions >li>a>span[data-type='type']").attr("id");
	brandId=$("#filter-conditions >li>a>span[data-type='brandtype']").attr("id");
	var reportType = $("#filter-conditions >li>a>span[data-type='zhibiao']").attr("id");
	
   
	if (reportType == "选择分析指标") {
		//$("#default").show();
		$("#status").hide();
		$("#time").hide();
		$("#source").hide();
		chart();
	}
	if (reportType == "预订时段") {
		$("#default").hide();
		$("#status").hide();
		//$("#time").show();
		$("#source").hide();
	
		time();
	}
	if (reportType == "订单状态") {
		$("#default").hide();
		//$("#status").show();
		$("#time").hide();
		$("#source").hide();
	
		status();
	}
	if (reportType == "订单来源") {
		$("#default").hide();
		$("#status").hide();
		$("#time").hide();
		//$("#source").show();
	
		source();
	}

}
// 预订量报表
function chart() {
	var   params={"type" : type,"startTime":startDate,"endTime":endDate};
	commercial=$("#filter-conditions >li>a>span[data-type='type']").attr("id");
	if(typeof(commercial) !="undefined"){
		  params.commercialId=commercial;
	}
	if(typeof(brandId)!="undefined"){
	      params.brandId=brandId;
	}
	
	$.post("report/bookingchart/weixin/getBookingChartPhone.do",params, function(chartdata) {
         
		var chartjson = jQuery.parseJSON(chartdata);
		//alert(chartjson.ylist);
		$("#chartTitle").html("预订量报表");
		if (type == 'day') {
			chartjson.xlist = [ '早餐', '午餐', '下午茶', '晚餐', '夜宵', '其他', '默认' ];
			$("#chart_name").html("今日预订");
		}
		if (type == "week") {
			$("#chart_name").html("本周预订");
			chartjson.xlist = [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ];

		}
		if (type == "month") {
			$("#chart_name").html("本月预订");
		}
		if (type == "year") {
			$("#chart_name").html("本年预订");
			chartjson.xlist = [ '1', '2', '3', '4', '5', '6', '7', '8', '9',
					'10', '11', '12' ];
		}
		
		if(Math.max.apply(null,chartjson.ylist)!=0){
			$("#default").show();	
			$("#default").parent().find(".notSearchContent").hide();
        require([ 'echarts', 'echarts/chart/line' // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
		],

		function(ec) {
			myChart = ec.init(document.getElementById('bookingChart'));
			option = {

				tooltip : {
					trigger : 'axis'
				},
				legend : {
					x : 'left',
					y : 'bottom',
					data : [ '预订量' ]
				},
				grid : {
					borderWidth:0,
					x : 60,
					y : 10,
					x2 : 20,
					y2 : 90
				},
				calculable : true,
				xAxis : [ {
					type : 'category',
					boundaryGap : false,
					splitLine : {
						show : false
					},
					data : chartjson.xlist
				} ],
				yAxis : [ {
					type : 'value',
					axisLine : { // 轴线
						show : false
					},
					splitLine : {
						show : false
					}
				} ],
				series : [ {
					name : '预订量',
					type : 'line',
					data : chartjson.ylist
				} ]
			};
			myChart.setOption(option);
			
		});}else{
			
			$("#default").hide();
			if ($("#default").parent().find(".notSearchContent").length > 0){
				$("#default").parent().find(".notSearchContent").show();
			}else{
				var notData = mobileReport.notQueryData("没有查到数据，试试其他查询条件吧!");	
				$("#default").parent().append(notData);
			}
		
			
		}
		
		
		
		
		
		var chartcount = getcount(chartjson.ylist);
		$("#chart_count").html(chartcount);
		$("#chart_avg").html(Math.round(chartcount / getdays()));
	});
};

// 预订时段报表
function time() {
	
	var   params={"type" : type,"startTime":startDate,"endTime":endDate};
	commercial=$("#filter-conditions >li>a>span[data-type='type']").attr("id");
	if(typeof(commercial) != "undefined"){
		  params.commercialId=commercial;
	}
	if(typeof(brandId)!="undefined"){
		  params.brandId=brandId;
	}
	
	$.post("report/bookingPeriod/weixin/getBookingPeriodChartByPhone.do",params, function(chartdata) {
		var chartjson = jQuery.parseJSON(chartdata);
		$("#chartTitle").html("预订时段报表");
		if (type == 'day') {
			chartjson.xlist = [ '早餐', '午餐', '下午茶', '晚餐', '夜宵', '其他', '默认' ];
			$("#period_name").html("今日预订");
		}
		if (type == "week") {
			$("#period_name").html("本周预订");
			chartjson.xlist = [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ];
		}
		if (type == "month") {
			$("#period_name").html("本月预订");
		}
		if (type == "year") {
			$("#period_name").html("本年预订");
			chartjson.xlist = [ '1', '2', '3', '4', '5', '6', '7', '8', '9',
					'10', '11', '12' ];
		}
		var select =[false,false,false,false,false,false,false];
 		require([ 'echarts', 'echarts/chart/line' // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
		], function(ec) {
			myChart = ec.init(document.getElementById('bookingPeriod'));
			var legend = "";
			var series = "";
			if (chartjson.ylist != null) {
				series = [ {
					"name" : "预订量",
					"type" : "line",
					"data" : chartjson.ylist
				} ];

				legend = {
					x : 'left',
					y : 'bottom',
					data : [ '预订量' ]

				};
			} else {
				if (getcount(chartjson.breakfast)>0) {
					select[0]=true;
				}
				if (getcount(chartjson.lunch)>0) {
					select[1]=true;
				}
				if (getcount(chartjson.afternoonTea)>0) {
					select[2]=true;
				}
				if (getcount(chartjson.dinner)>0) {
					select[3]=true;
				}
				if (getcount(chartjson.supper)>0) {
					select[4]=true;
				}
				if (getcount(chartjson.other)>0) {
					select[5]=true;
				}
				if (getcount(chartjson.defaults)>0) {
					select[6]=true;
				}
				series = [ {
					"name" : "早餐",
					"type" : "line",
					"data" : chartjson.breakfast
				}, {
					"name" : "午餐",
					"type" : "line",
					"data" : chartjson.lunch
				}, {
					"name" : "下午茶",
					"type" : "line",
					"data" : chartjson.afternoonTea
				}, {
					"name" : "晚餐",
					"type" : "line",
					"data" : chartjson.dinner
				}, {
					"name" : "宵夜",
					"type" : "line",
					"data" : chartjson.supper
				}, {
					"name" : "其他",
					"type" : "line",
					"data" : chartjson.other
				}, {
					"name" : "默认",
					"type" : "line",
					"data" : chartjson.defaults
				}

				];

				legend = {
					x : 'left',
					y : 'bottom',
					selected:{
						'早餐':select[0],
						'午餐':select[1],
						'下午茶':select[2],
						'晚餐':select[3],
						'宵夜':select[4],
						'其他':select[5],
						'默认':select[6]
					},
					data : [ '早餐', '午餐', '下午茶', '晚餐', '宵夜', '其他', '默认' ]

				};
			}
			option = {

				tooltip : {
					trigger : 'axis'
				},

				legend : legend,
				grid : {
					borderWidth:0,
					x : 60,
					y : 10,
					x2 : 20,
					y2 : 90
				},
				calculable : true,
				xAxis : [

				{
					splitLine : {
						show : false
					},
					type : 'category',
					boundaryGap : false,
					data : chartjson.xlist
				}

				],
				yAxis : [ {
					axisLine : { // 轴线
						show : false
					},
					splitLine : {
						show : false
					},
					type : 'value'
				} ],

				series : series
			};
			
			if(chartjson.ylist == null){
				var count = getcount(chartjson.defaults)
				+ getcount(chartjson.breakfast) + getcount(chartjson.lunch)
				+ getcount(chartjson.afternoonTea)
				+ getcount(chartjson.dinner) + getcount(chartjson.supper)
				+ getcount(chartjson.other);
				
				if(count!=0){
					$("#time").show();
					myChart = ec.init(document.getElementById('bookingPeriod'));
					myChart.setOption(option);
					$("#time").parent().find(".notSearchContent").hide();
									
				}else{
					$("#time").hide();
					if ($("#time").parent().find(".notSearchContent").length > 0){
						$("#time").parent().find(".notSearchContent").show();
					}else{
						var notData = mobileReport.notQueryData("没有查到数据，试试其他查询条件吧!");	
						$("#time").parent().append(notData);
					}
				}
				
				
			}else{
				var count = getcount(chartjson.ylist);
				if(count!=0){
					$("#time").show();
					myChart = ec.init(document.getElementById('bookingPeriod'));
					myChart.setOption(option);
					$("#time").parent().find(".notSearchContent").hide();
				}else{
					$("#time").hide();
					if ($("#time").parent().find(".notSearchContent").length > 0){
						$("#time").parent().find(".notSearchContent").show();
					}else{
						var notData = mobileReport.notQueryData("没有查到数据，试试其他查询条件吧!");	
						$("#time").parent().append(notData);
					}
				}
			}
			
		
		}

		);
		
		
		
		

		if (chartjson.ylist == null) {

			var count = getcount(chartjson.defaults)
					+ getcount(chartjson.breakfast) + getcount(chartjson.lunch)
					+ getcount(chartjson.afternoonTea)
					+ getcount(chartjson.dinner) + getcount(chartjson.supper)
					+ getcount(chartjson.other);
			$("#period_count").html(count);
			$("#period_average").html(Math.round(count / getdays()));
			$("#breakfast").html(getcount(chartjson.breakfast));
			$("#lunch").html(getcount(chartjson.lunch));
			$("#afternoonTea").html(getcount(chartjson.afternoonTea));
			$("#dinner").html(getcount(chartjson.dinner));
			$("#supper").html(getcount(chartjson.supper));
			$("#other").html(getcount(chartjson.other));
			$("#defaults").html(getcount(chartjson.defaults));
		} else {
			var count = getcount(chartjson.ylist);
			$("#period_count").html(count);
			$("#period_average").html(count / getdays());
			$("#breakfast").html(chartjson.ylist[0]);
			$("#lunch").html(chartjson.ylist[1]);
			$("#afternoonTea").html(chartjson.ylist[2]);
			$("#dinner").html(chartjson.ylist[3]);
			$("#supper").html(chartjson.ylist[4]);
			$("#other").html(chartjson.ylist[5]);
			$("#defaults").html(chartjson.ylist[6]);
		}

	}

	);
};

// 预订状态
function status() {
	var   params={"type" : type,"startTime":startDate,"endTime":endDate};
	commercial=$("#filter-conditions >li>a>span[data-type='type']").attr("id");
	if(typeof(commercial) != "undefined"){
		  params.commercialId=commercial;
	}
	if(typeof(brandId)!="undefined"){
		  params.brandId=brandId;
	}
	$.post("report/bookingStatus/weixin/getBookingStatusChartByPhone.do",params,
			function(chartdata) {
				var chartjson = jQuery.parseJSON(chartdata);
				$("#chartTitle").html("预订状态报表");
				if (type == 'day') {
					chartjson.xlist = [ '早餐', '午餐', '下午茶', '晚餐', '夜宵', '其他',
							'默认' ];
					$("#status_name").html("今日预订");
				}
				if (type == "week") {
					$("#status_name").html("本周预订");
					chartjson.xlist = [ '周一', '周二', '周三', '周四', '周五', '周六',
							'周日' ];
				}
				if (type == "month") {
					$("#status_name").html("本月预订");
				}
				if (type == "year") {
					$("#status_name").html("本年预订");
					chartjson.xlist = [ '1', '2', '3', '4', '5', '6', '7', '8',
							'9', '10', '11', '12' ];
				}
				var select=[false,false,false,false,false,false,false];
				if (getcount(chartjson.yhdd)>0) {
					select[0]=true;
				}
				if (getcount(chartjson.yhld)>0) {
					select[1]=true;
				}
				if (getcount(chartjson.yqx)>0) {
					select[2]=true;
				}
				if (getcount(chartjson.wcl)>0) {
					select[3]=true;
				}
				if (getcount(chartjson.yjj)>0) {
					select[4]=true;
				}
				if (getcount(chartjson.yqwdd)>0) {
					select[5]=true;
				}
				if (getcount(chartjson.yhwdd)>0) {
					select[6]=true;
				}
				require([ 'echarts', 'echarts/chart/line' // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
				],
						function(ec) {
							myChart = ec.init(document.getElementById('bookingStatus'));
							option = {

								tooltip : {
									trigger : 'axis'
								},
								legend : {
									x : 'left',
									y : 'bottom',
									selected:{
										'已到店':select[0], 
										'已离店':select[1],
										'已取消':select[2],
										'未处理':select[3], 
										'已拒绝':select[4],
										'逾期未到店':select[5],
										'未到店':select[6]
									},
									data : [ '已到店', '已离店', '已取消', '未处理', '已拒绝',
											'逾期未到店', '未到店' ]

								},
								grid : {
									borderWidth:0,
									x : 60,
									y : 10,
									x2 : 20,
									y2 : 120
								},
								calculable : true,
								xAxis : [

								{
									splitLine : {
										show : false
									},
									type : 'category',
									boundaryGap : false,
									data : chartjson.xlist
								}

								],
								yAxis : [ {
									axisLine : { // 轴线
										show : false
									},
									splitLine : {
										show : false
									},
									type : 'value'
								} ],
								series : [

								{
									"name" : "已到店",
									"type" : "line",
									"data" : chartjson.yhdd
								}, {
									"name" : "已离店",
									"type" : "line",
									"data" : chartjson.yhld
								}, {
									"name" : "已取消",
									"type" : "line",
									"data" : chartjson.yqx
								}, {
									"name" : "未处理",
									"type" : "line",
									"data" : chartjson.wcl
								}, {
									"name" : "已拒绝",
									"type" : "line",
									"data" : chartjson.yjj
								}, {
									"name" : "逾期未到店",
									"type" : "line",
									"data" : chartjson.yqwdd
								}, {
									"name" : "未到店",
									"type" : "line",
									"data" : chartjson.yhwdd
								} ]
							};
 
							var count = getcount(chartjson.yhwdd)
							+ getcount(chartjson.yhdd) + getcount(chartjson.yhld)
							+ getcount(chartjson.yqx) + getcount(chartjson.wcl)
							+ getcount(chartjson.yjj) + getcount(chartjson.yqwdd);
							
							
							if(count!=0){
								$("#status").show();
								myChart = ec.init(document.getElementById('bookingStatus'));
								myChart.setOption(option);
								$("#status").parent().find(".notSearchContent").hide();
												
							}else{
								$("#status").hide();
								if ($("#status").parent().find(".notSearchContent").length > 0){
									$("#status").parent().find(".notSearchContent").show();
								}else{
									var notData = mobileReport.notQueryData("没有查到数据，试试其他查询条件吧!");	
									$("#status").parent().append(notData);
								}
							}
							
							
						}

				);

				var count = getcount(chartjson.yhwdd)
						+ getcount(chartjson.yhdd) + getcount(chartjson.yhld)
						+ getcount(chartjson.yqx) + getcount(chartjson.wcl)
						+ getcount(chartjson.yjj) + getcount(chartjson.yqwdd);
				$("#status_count").html(count);
				$("#status_average").html(Math.round(count / getdays()));
				$("#status_yhdd").html(getcount(chartjson.yhdd));
				$("#status_yhld").html(getcount(chartjson.yhld));
				$("#status_yqx").html(getcount(chartjson.yqx));
				$("#status_wcl").html(getcount(chartjson.wcl));
				$("#status_yjj").html(getcount(chartjson.yjj));
				$("#status_yqwdd").html(getcount(chartjson.yqwdd));
				$("#status_yhwdd").html(getcount(chartjson.yhwdd));

			});
};

function source() {
	var   params={"type" : type,"startTime":startDate,"endTime":endDate};
	commercial=$("#filter-conditions >li>a>span[data-type='type']").attr("id");
	if(typeof(commercial) != "undefined"){
		  params.commercialId=commercial;
	}
	if(typeof(brandId)!="undefined"){
		  params.brandId=brandId;
	}
	
	$.post("report/bookingSource/weixin/getBookingSourceChartByPhone.do",params, function(chartdata) {
		var chartjson = jQuery.parseJSON(chartdata);
		$("#chartTitle").html("预订来源报表");
		if (type == 'day') {
			chartjson.xlist = [ '早餐', '午餐', '下午茶', '晚餐', '夜宵', '其他', '默认' ];
			$("#source_name").html("今日预订");
		}
		if (type == "week") {
			$("#source_name").html("本周预订");
			chartjson.xlist = [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ];
		}
		if (type == "month") {
			$("#source_name").html("本月预订");
		}
		if (type == "year") {
			$("#source_name").html("本年预订");
			chartjson.xlist = [ '1', '2', '3', '4', '5', '6', '7', '8', '9',
					'10', '11', '12' ];
		}

		
		   var sources=new Array();
		   var legendData=new Array();
		   var chose = '{';
		   for(var i=0;i<chartjson.sources.length;i++){
			   var   objs={};
			   objs.name=chartjson.sources[i].sourceName;
			   name = chartjson.sources[i].sourceName;
			   objs.type='line';
			   objs.data=chartjson[chartjson.sources[i].sourceId];
			   sources.push(objs);
			   legendData.push(chartjson.sources[i].sourceName);
			   var judge = false;
				for (var j = 0; j < objs.data.length; j++) {
					while (objs.data[j] > 0) {
						judge = true;
						break;
					}
					if (judge == true)
						break;
				}
				if (i == chartjson.sources.length - 1) {
					chose += name + ":" + judge + "}"
				} else {
					chose += name + ":" + judge + ","
				}
			}
		   var choseJson = eval("(" + chose + ")");
		   var  count=0;
		require([ 'echarts', 'echarts/chart/line' // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
		], function(ec) {
			myChart = ec.init(document.getElementById('bookingSource'));
			option = {

				tooltip : {
					trigger : 'axis'
				},
				legend : {
					x : 'left',
					y :200,
					selected:choseJson,
					data :legendData

				},
				grid : {
					borderWidth:0,
					x : 60,
					y : 10,
					x2 : 20,
					y2 : 220
				},
				calculable : true,
				xAxis : [

				{
					splitLine : {
						show : false
					},
					type : 'category',
					boundaryGap : false,
					data : chartjson.xlist
				}

				],
				yAxis : [ {
					axisLine : { // 轴线
						show : false
					},
					splitLine : {
						show : false
					},
					type : 'value'
				} ],
				series :sources
			};

			  
	   
		      
			   
		   for(var i=0;i<chartjson.sources.length;i++){
			   count=count+getcount(chartjson[chartjson.sources[i].sourceId]);
		   }
			   
 			if(count!=0){
				$("#source").show();
				myChart = ec.init(document.getElementById('bookingSource'));
				myChart.setOption(option);
				$("#source").parent().find(".notSearchContent").hide();
								
			}else{
				$("#source").hide();
				if ($("#source").parent().find(".notSearchContent").length > 0){
					$("#source").parent().find(".notSearchContent").show();
				}else{
					var notData = mobileReport.notQueryData("没有查到数据，试试其他查询条件吧!");	
					$("#source").parent().append(notData);
				}
			}
			
		
		});
           
		   
	    var  sourceshtml="";
		   for(var i=0;i<chartjson.sources.length;i++){
		   sourceshtml+="<li><div><span class='number'>"+getcount(chartjson.sources[i].ordercount)+"</span><span>"+chartjson.sources[i].sourceName+"</span></div></li>";
		}
		$("#sourcesName").empty();
		$("#sourcesName").append(sourceshtml);
		

		$("#sourcecount").html(count);
		$("#sourceavg").html(Math.round(count / getdays()));

	});

}

// 预订总量
function getcount(list) {
	var count = 0;
	for (var i = 0; i < list.length; i++) {
		count += Number(list[i]);
	}
	return count;
}
// 获取2个时间段中的天数
function getdays() {
  return DateDiff(startDate,endDate)+1;

}


function prev(){
	var ms = 1000*60*60*24;//一天之中毫秒数
	
	if (day == "周") {
		//var stime = getWeekStartDate();
		startDate= new Date(parseInt(new Date(startDate).getTime()-7*ms)).Format("yyyy-MM-dd");
		endDate= new Date(parseInt(new Date(endDate).getTime()-7*ms)).Format("yyyy-MM-dd");
		$(".current-date").text(startDate+"至"+endDate);
		
//		if(stime!=startDate){
//			$(".next").show();
//			$(".next").text("下一周");
//		}else{
//			$(".next").hide();
//		}
		
		
	} else if (day == "月") {
//		var stime =getMonthStartDate();
		endDate= new Date(parseInt(new Date(startDate).getTime()-ms)).Format("yyyy-MM-dd");
		tempMonth=new Date(endDate).getMonth();
		tempYear=new Date(endDate).getFullYear();
		startDate=new Date(tempYear,tempMonth,1).Format("yyyy-MM-dd");
		$(".current-date").text(startDate+"至"+endDate);
		//var stime = getWeekStartDate();
//		if(stime!=startDate){
//			$(".next").show();
//			$(".next").text("下一月");
//		}else{
//			$(".next").hide();
//		}
//		
	} else {
		startDate=endDate= new Date(parseInt(new Date(startDate).getTime()-ms)).Format("yyyy-MM-dd");
		$(".current-date").text(startDate);
	//	var stime= new Date().Format("yyyy-MM-dd");
		//var stime = getWeekStartDate();
//		if(stime!=startDate){
//			$(".next").show();
//			$(".next").text("下一天");
//		}else{
//			$(".next").hide();
//		}
//		
	}
	bookingChartMobile();
	
}
//获取点击下一*后的开始、结束日期
function next(){
	var ms = 1000*60*60*24;//一天之中毫秒数
	
	if (day == "周") {
//		var stime = getWeekStartDate();
		startDate= new Date(parseInt(new Date(startDate).getTime()+7*ms)).Format("yyyy-MM-dd");
		endDate= new Date(parseInt(new Date(endDate).getTime()+7*ms)).Format("yyyy-MM-dd");
		$(".current-date").text(startDate+"至"+endDate);
//		if(stime!=startDate){
//			$(".next").show();
//			$(".next").text("下一周");
//		}else{
//			$(".next").hide();
//		}
	} else if (day == "月") {
//		var stime =getMonthStartDate();
		startDate= new Date(parseInt(new Date(endDate).getTime()+ms)).Format("yyyy-MM-dd");
		tempMonth=new Date(startDate).getMonth();
		tempYear=new Date(startDate).getFullYear();
		tempDays=getMonthDays(tempMonth);
		endDate=new Date(tempYear,tempMonth,tempDays).Format("yyyy-MM-dd");
		//var stime = getWeekStartDate();
		$(".current-date").text(startDate+"至"+endDate);
//		if(stime!=startDate){
//			$(".next").show();
//			$(".next").text("下一月");
//		}else{
//			$(".next").hide();
//		}
	} else {
		startDate=endDate= new Date(parseInt(new Date(startDate).getTime()+ms)).Format("yyyy-MM-dd");
		$(".current-date").text(startDate);
//		var stime= new Date().Format("yyyy-MM-dd");
		//var stime = getWeekStartDate();
//		if(stime!=startDate){
//			$(".next").show();
//			$(".next").text("下一天");
//		}else{
//			$(".next").hide();
//		}
	}
	bookingChartMobile();
}
