/**
var queryParameter="";
var pageQuery = new PageQuery("pageQuery"); //构建分页查询对象
pageQuery.pageQueryDataId = "tbody-1"; //设置数据表格的id
pageQuery.pageQueryToolId = "pageToolDiv"; //设置分页工具栏的id
pageQuery.showTotalPage = true;
pageQuery.showTotalRows=true;

*/
$(function(){
	//reportItemsLevel2-agent
	report.resetItemsLevel2("#reportItemsLevel2-agent");
	$("#status,#time,#source").hide();
	//分析指标
	$("#indicatorsSelect1").on("change",function(){
		var value = $(this).val();
		//console.log(value);
		//状态
		if(value == 1){
			$("#status").show();
			$("#time,#source,#default").hide();
		//时段
		}else if(value == 2){
			$("#time").show();
			$("#status,#source,#default").hide();
		//来源
		}else if(value == 3){
			$("#source").show();
			$("#status,#time,#default").hide();
		//默认
		}else{
			$("#default").show();
			$("#status,#time,#source").hide();
		}
	});
	
	
	
	innerPersonReport();
	
});


function searchReport(){
	//loadData();
	datepickerInitializeReport();
	innerPersonReport();
}


/**
//查询分页数据
function loadData(){
	queryParameter=$("#innerPersonForm").serialize()+"&currentPage="+pageQuery.currentPage +  "&pageSize=" + pageQuery.pageSize;
	$.ajax({
		type: "POST",
		url: "report/bookingReport/innerPersonList.do",
		data: queryParameter,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		async: false,
		cache: false,
		success: function(data){
			var html=[];
			pageQuery.totalRows = data.totalRows;
			pageQuery.lastPage = (pageQuery.lastPage == null ? 1 : pageQuery.currentPage);
			var items=data.items;
			for(var i=0;i<items.length;i++){
					html[html.length]='<tr>';
					html[html.length]='<td>'+items[i].name+'</td>';
					html[html.length]='<td>'+items[i].value+'</td>';
					html[html.length]='<td>'+(Math.round(items[i].value / total * 10000 ) / 100.00)+'</td>';
					html[html.length]='</tr>';
					
			}
			$("#tbody-1").append(html.join(""));
		}
	});
}
**/

//报表查询
function innerPersonReport(){
	var d = new Date();
	if( $("#date-start").val()==null ||  $("#date-start").val()==''){
		$("#date-start").val(d.Format("yyyy-MM-dd"));
		if(!bkeruyun.isPlaceholder()){
			$("#date-start").next("span").hide();
		}
	}
	if($("#date-end").val()==null ||  $("#date-end").val()==''){
		$("#date-end").val($("#date-start").val());
		if(!bkeruyun.isPlaceholder()){
			$("#date-end").next("span").hide();
		}
	}
	
	
	queryParameter=$("#innerPersonForm").serialize();
	$.ajax({
		type: "POST",
		url: "report/bookingReport/innerPersonReport",
		data: queryParameter,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		//async: false,
		cache: false,
		beforeSend:bkeruyun.showLoading,
		success: function(data){
			bkeruyun.hideLoading();
			//totalPage=data.totalPage;
			var items=data.items;
			var obj=new Array();
			var html="";
			var tbody="";
			var total=0;
			if(items != null && items.length > 0){
				for(var i=0;i<items.length;i++){
					obj.push(items[i].name);
					//获取代理人总数
					total+=items[i].value;
				}
				var other=0;
				var per = 0;
				for(var i=0;i<items.length;i++){
					//每个代理人的百分比
					per = (Math.round(items[i].value / total * 10000 ) / 100.00);
					if(i<5){
						html+="<li><span class='number'>" +per+"%</span><span>"+items[i].name+"</span><span class='sub-number'>"+items[i].value+"</span></li>";
					}else{
						other+=items[i].value;
					}
					
					
					//代理人代表
					tbody +='<tr>';
					tbody +='<td>'+items[i].name+'</td>';
					tbody +='<td>'+items[i].value+'</td>';
					tbody +='<td>'+per+'%</td>';
					tbody +='</tr>';
				}
				if(items.length>5){
					per = (Math.round(other / total * 10000 ) / 100.00);
					html+="<li><span class='number'>" +per+"%</span><span>其它</span><span class='sub-number'>"+ other +"</span></li>";
				}
				if($("#innerPersonCon").is(":hidden")){
					$("#innerPersonCon").show();
					$("#innerPersonCon").parent().find(".notSearchContent").hide();
				}
				//代理人饼图
				echartsPie(obj,items);
			}else{
				var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧！");
				if($("#innerPersonCon").parent().find(".notSearchContent").length > 0){
					$("#innerPersonCon").hide();
					$("#innerPersonCon").parent().find(".notSearchContent").show();
				}else{
					$("#innerPersonCon").hide();
					$("#innerPersonCon").parent().append(notData);
				}
			}
			$("#total").text(total);
			$("#reportItemsLevel2-agent").html(html);
			//重置二级状态
			report.resetItemsLevel2("#reportItemsLevel2-agent");
			$("#tbody-1").html(tbody);
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
	        'echarts/chart/pie'  // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
	    ],
	    function (ec) {
	        var myChart = ec.init(document.getElementById('echarts_pie'));
	        var option = 
	        	        {
	        	            title : {
	        	                text: '代理人预订占比分析',
	        	                	x:'left'
	        	               // subtext: '纯属虚构'
	        	            },
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
	        	           // calculable : true,
	        	            series : [
	        	                {
	        	                    name:'代理人预订占比分析',
	        	                    type:'pie',
	        	                    center: ['50%', '45%'],
	        	                    radius: '50%',
	        	                    startAngle:360,
	        	        			clockWise:true,
	        	                    data:obj2
	        	                }
	        	            ]
	        	        }
	        
	        myChart.setOption(option);
	    }
	)
}


$(function(){
	//初始化日历控件
	datepickerInitializeReport();
});
function datepickerInitializeReport(){
	var startObj = $("#date-start"),
	    endObj = $('#date-end');
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
                    
