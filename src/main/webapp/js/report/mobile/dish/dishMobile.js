$(function(){
	init();
	bindtime();
	execution();
});

//初始化
function  init(){
reportLayer.btnConfirm.on("click",function(){
	execution();   
 });

//点击上一*
reportLayer.btnPrev.bind("click",function(){
	prev();
});
//点击下一*
reportLayer.btnNext.bind("click",function(){
	next();
});



	 
$(document).delegate(".filter-con2 .operation > a.btn-back","click",function(){
	
	//上级菜单
	var prevMenu = (curMenu.attr("data-prev-menu")) ? $("#" + curMenu.attr("data-prev-menu")) : null;
	curMenu.animate({"width":"0"},500);
	//将当前菜单设为上级菜单
	curMenu = prevMenu;
});

//日 周 月 年
$(document).delegate("#cycleList > li", "touchstart", function() {
		$(this).addClass("current").siblings().removeClass("current");
		bindtime();
		execution();	
});
}
//初始化结束



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
		$(".next").hide();
	} else if (day == "月") {
		startDate = getMonthStartDate();
		endDate = getMonthEndDate();
		$(".current-date").text(startDate+"至"+endDate);
		$(".prev").text("上一月");
		$(".next").hide();
	
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
		$(".next").hide();
		$(".current-date").text(startDate);
	}
}




//获取所有查询属性
function   getParams(){	
	var params=new Object();
    //var day = $("#cycleList > li.current").attr("type");
    params.businessStarttime=startDate;
    params.businessEndtime=endDate;
    var commercial=$("span[type='mendian']").attr("id");
    var dishType=$("span[type='dishType']").attr("id");
    var indexType= $("span[type='indexType']").attr("id");
//    console.log(indexType);
    params.commercialId=commercial;
    if(dishType!="dishType"){
    params.dishTypeNum=dishType;
    }
    params.indexType=indexType;
    return  params;
};


function execution(){
	var dishtype=$("span[type='dishType']").attr("id");
    if(dishtype=="dishType"){//菜品类型
    	 dishAll();  	
    }else{//单菜品
    	 dish();
    }
}

//菜品类型
function   dishAll(){
	var params=getParams();
	 $.post('report/dish/weixin/getDishTypeList.do',params,function(chartdata) {
		 var  chartjson=jQuery.parseJSON(chartdata);
//		 console.log(chartjson);
		 $("#singleDishes").hide();
		//alert(chartjson.length);
		 if(chartjson.length<1){
				var notData = mobileReport.notQueryData("没有查到数据，试试其他查询条件吧!");
				if ($("#classDishes").parent().find(".notSearchContent").length > 0) {
					$("#classDishes").hide();
					$("#singleDishes").hide();
					$("#classDishes").parent().find(".notSearchContent").show();
				} else {
					$("#classDishes").hide();
					$("#singleDishes").hide();
					$("#classDishes").parent().append(notData);
				}
		 }else{
			 
			 if ($("#classDishes").is(":hidden")) {
					$("#classDishes").show();
					$("#singleDishes").hide();
				 	$("#classDishes").parent().find(".notSearchContent").hide();
				}
			 dishType(chartjson);
		 }
		});
	  
};

//单菜品
function dish(){
	   var params=getParams();
	   $.post('report/dish/weixin/getDishList.do',params,function(chartdata) {
		   var  chartjson=jQuery.parseJSON(chartdata);
//		   console.log(chartjson);
		   var   desclist=chartjson.dishVoDesc;
		   if(desclist.length<1){
			   var notData = mobileReport.notQueryData("没有查到数据，试试其他查询条件吧！");
				 if($("#singleDishes").parent().find(".notSearchContent").length > 0){
					$("#singleDishes").hide();
					$("#classDishes").hide();
					$("#singleDishes").parent().find(".notSearchContent").show();
				}else{
					$("#singleDishes").hide();
					$("#classDishes").hide();
					$("#singleDishes").parent().append(notData);
				}
		   }else{   
			   if ($("#singleDishes").is(":hidden")) {
				   $("#singleDishes").show();
				   $("#classDishes").hide();
				   $("#singleDishes").parent().find(".notSearchContent").hide();
				}
			    	
			   dishTop(chartjson); //前十
			   dishbackwards(chartjson);//倒数十
			}
		   });	
};




//菜品类型
function  dishType(chartjson){
	       var params=getParams();
		   //console.log(chartdata);
		  // var  chartjson=jQuery.parseJSON(chartdata);
		   var  xlist=new  Array();
		   var  pricelist=new  Array();
		   var  countlist=new  Array();
		   var  ylist=new Array();
		   var name="";
	  	    if(params.indexType=="sellprice"){
	  	    	name="销售总额";
	  	    }else{
	  	    	name="销售总数";
	  	    }
		   $.each(chartjson,function(i,v){
		       xlist.push(v.dishTypeName);
		       pricelist.push(v.sellPrice);
		       countlist.push(v.sellCount);
			});
		   pricelist.sort(function(a,b){return  a-b;});
		   countlist.sort(function(a,b){return a-b;});
		   xlist=daoxu(xlist);
		   
		   $.each(xlist,function(i,v){
			     if(v.length>6){
			    	 xlist[i]=v.substr(0,6)+'..';   
				 }
				  });
	   
			
		  //console.log($("#indexType option:selected").val());
		   if(params.indexType=="sellprice"){
			   ylist=pricelist;
		   }else{
			   ylist=countlist;
		   }
		   require.config({
				paths : {
					echarts : 'js/echarts'
				}
			});
		    require(
		    [ 
		      'echarts',
		      'echarts/chart/bar'
		    ],
		    function(ec){
			myChart = ec.init(document.getElementById('dishTypeChart'));
			option = {
				    tooltip : {
				        trigger: 'axis'
				    },
				 
				    grid : {
						borderWidth:0,
						x : 90,
					},
				    calculable : true,
				    xAxis : [
				        {
				            type : 'value',
				            boundaryGap : [0, 0.01],
				            axisLabel:{
				            	 show:true,
				            	 rotate:-30
				            }
				        }
				    ],
				    yAxis : [
				        {
				            type : 'category',
				            data : xlist
				        }
				    ],
				    series : [
				        {
				            name:name,
				            type:'bar',
				            data:ylist
				        },
				     
				    ]
				};
			myChart.setOption(option);
	  
		  });
		   
//		    
//		    var trhtml="";
//		    for(var i = 0; i < chartjson.length; i++){
//		    	trhtml+="<tr>"+
//	                	"<td>"+chartjson[i].dishTypeNum+"</td>"+
//	                    "<td>"+chartjson[i].dishTypeName+"</td>"+
//	                    "<td>￥"+chartjson[i].sellPrice+"</td>"+
//	                    "<td>"+chartjson[i].sellCount+"</td>"+
//	                "</tr>";
//		    	
//		    };
//		    $("#dishTypeList").empty();
//	        $("#dishTypeList").append(trhtml);
		   
};





function dishTop(chartjson){
	   var    xlist= new Array();
	   var    ylist= new Array();
	   var    pricelist=new Array();
	   var    countlist=new Array();
	   require.config({
			paths : {
				echarts : 'js/echarts'
			}
		});
	 
	   var name="";
 	    if(getParams().indexType=="sellprice"){
 	    	name="销售总额";
 	    }else{
 	    	name="销售总数";
 	    }
	   var dishDesc=chartjson.dishVoDesc;
	   $.each(dishDesc,function(i,v){
		  xlist.push(v.dishName); 
		  pricelist.push(v.sellPrice);
		  countlist.push(v.sellCount);
	   });
	   
	   xlist=daoxu(xlist);
	   
		   $.each(xlist,function(i,v){
			  if(v.length>6){
				  xlist[i]=v.substr(0,6)+'..';   
				     
			  }
			   
		   });
		      
		   
	   
	   if(getParams().indexType=="sellprice"){
		   ylist=pricelist;
	   }else{
		   ylist=countlist;
	   }
	    ylist.sort(function(a,b){return  a-b;});
	    require([ 'echarts', 'echarts/chart/bar'],function(ec){
		dishTopChart = ec.init(document.getElementById('dishTopChart'));
		dishTopoption = {
				title:{
					text:'最高排行'
				 }, 
				tooltip : {
			        trigger: 'axis'
			    },
			    grid : {
					borderWidth:0,
					x : 90,
				},
			    calculable : true,
			    xAxis : [
			        {
			            type : 'value',
			            boundaryGap : [0, 0.01],
			            axisLabel:{
			            	 show:true,
			            	 rotate:-30
			            }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'category',
			            data : xlist
			        }
			    ],
			    series : [
			        {
			            name:name,
			            type:'bar',
			            data:ylist
			        },
			     
			    ]
			};
		dishTopChart.setOption(dishTopoption);
	    
//	   
//	    var trhtml="";
//	    for(var i = 0; i < dishDesc.length; i++){
//	    	trhtml+="<tr>"+
//		        	"<td>"+dishDesc[i].dishNum+"</td>"+
//		            "<td>"+dishDesc[i].dishName+"</td>"+
//		            "<td>￥"+dishDesc[i].dishTypeName+"</td>"+
//		            "<td>"+dishDesc[i].sellPrice+"</td>"+
//		            "<td>"+dishDesc[i].sellCount+"</td>"+
//                "</tr>";
//	    	
//	    };
//	    $("#dishDescList").empty();
//        $("#dishDescList").append(trhtml);
	
});
};


function  dishbackwards(chartjson){
	require.config({
		paths : {
			echarts : 'js/echarts'
		}
	});
	var   xlist=new Array();
	var   ylist=new Array();
	var   pricelist=new Array();
	var   countlist=new Array();
	 var name="";
	    if(getParams().indexType=="sellprice"){
	    	name="销售总额";
	    }else{
	    	name="销售总数";
	    }
	var  dishVolist=chartjson.dishVoList;
	$.each(dishVolist,function(i,v){
	   xlist.push(v.dishName);
	   pricelist.push(v.sellPrice);
	   countlist.push(v.sellCount);
	});
	if(getParams().indexType=="sellprice"){
		   ylist=pricelist;
	   }else{
		   ylist=countlist;
	   }
    xlist=daoxu(xlist);
    
    	$.each(xlist,function(i,v){
   	        if(v.length>6){
   	        	xlist[i]=v.substr(0,6)+'..';   
   	     	   	
   	        }
    		});
       	
    ylist=daoxu(ylist);
//	console.log(ylist);
	//ylist.sort(function(a,b){return  a-b;});
	require([ 'echarts', 'echarts/chart/bar'],function(ec){
    backwards = ec.init(document.getElementById('backwards'));
    backwardsoption = {
    		 title : {
			        text: '最低排行'
			    },
			    grid : {
					borderWidth:0,
					x : 90,
				},
			tooltip : {
		        trigger: 'axis'
		    },
		
		    calculable : true,
		    xAxis : [
		        {
		            type : 'value',
		            boundaryGap : [0, 0.01],
		            axisLabel:{
		            	 show:true,
		            	 rotate:-30
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
		            data : xlist
		        }
		    ],
		    series : [
		        {
		            name:name,
		            type:'bar',
		            data:ylist
		        },
		     
		    ]
		};
    backwards.setOption(backwardsoption);
//    var trhtml="";
//    for(var i = 0; i < dishVolist.length; i++){
//    	trhtml+="<tr>"+
//            	"<td>"+dishVolist[i].dishNum+"</td>"+
//                "<td>"+dishVolist[i].dishName+"</td>"+
//                "<td>￥"+dishVolist[i].dishTypeName+"</td>"+
//                "<td>"+dishVolist[i].sellPrice+"</td>"+
//                "<td>"+dishVolist[i].sellCount+"</td>"+
//            "</tr>";
//    };
//    $("#dishVoList").empty();
//    $("#dishVoList").append(trhtml);

});
	
};

//倒序
function   daoxu(templist){
	  var  count =templist.length-1;
	  var   list=new  Array();
	  for(var  i=count;i>-1;i--){
	     list.push(templist[i]);
	  }
	  return  list;
}




function prev(){
	var ms = 1000*60*60*24;//一天之中毫秒数
	
	if (day == "周") {
		var stime = getWeekStartDate();
		startDate= new Date(parseInt(new Date(startDate).getTime()-7*ms)).Format("yyyy-MM-dd");
		endDate= new Date(parseInt(new Date(endDate).getTime()-7*ms)).Format("yyyy-MM-dd");
		$(".current-date").text(startDate+"至"+endDate);
		
		if(stime!=startDate){
			$(".next").show();
			$(".next").text("下一周");
		}else{
			$(".next").hide();
		}
		
		
	} else if (day == "月") {
		var stime =getMonthStartDate();
		endDate= new Date(parseInt(new Date(startDate).getTime()-ms)).Format("yyyy-MM-dd");
		tempMonth=new Date(endDate).getMonth();
		tempYear=new Date(endDate).getFullYear();
		startDate=new Date(tempYear,tempMonth,1).Format("yyyy-MM-dd");
		$(".current-date").text(startDate+"至"+endDate);
		//var stime = getWeekStartDate();
		if(stime!=startDate){
			$(".next").show();
			$(".next").text("下一月");
		}else{
			$(".next").hide();
		}
		
	} else {
		startDate=endDate= new Date(parseInt(new Date(startDate).getTime()-ms)).Format("yyyy-MM-dd");
		$(".current-date").text(startDate);
		var stime= new Date().Format("yyyy-MM-dd");
		//var stime = getWeekStartDate();
		if(stime!=startDate){
			$(".next").show();
			$(".next").text("下一天");
		}else{
			$(".next").hide();
		}
		
	}
	execution();
	
}
//获取点击下一*后的开始、结束日期
function next(){
	var ms = 1000*60*60*24;//一天之中毫秒数
	
	if (day == "周") {
		var stime = getWeekStartDate();
		startDate= new Date(parseInt(new Date(startDate).getTime()+7*ms)).Format("yyyy-MM-dd");
		endDate= new Date(parseInt(new Date(endDate).getTime()+7*ms)).Format("yyyy-MM-dd");
		$(".current-date").text(startDate+"至"+endDate);
		
		if(stime!=startDate){
			$(".next").show();
			$(".next").text("下一周");
		}else{
			$(".next").hide();
		}
	} else if (day == "月") {
		var stime =getMonthStartDate();
		startDate= new Date(parseInt(new Date(endDate).getTime()+ms)).Format("yyyy-MM-dd");
		tempMonth=new Date(startDate).getMonth();
		tempYear=new Date(startDate).getFullYear();
		tempDays=getMonthDays(tempMonth);
		endDate=new Date(tempYear,tempMonth,tempDays).Format("yyyy-MM-dd");
		//var stime = getWeekStartDate();
		$(".current-date").text(startDate+"至"+endDate);
		if(stime!=startDate){
			$(".next").show();
			$(".next").text("下一月");
		}else{
			$(".next").hide();
		}
	} else {
		startDate=endDate= new Date(parseInt(new Date(startDate).getTime()+ms)).Format("yyyy-MM-dd");
		$(".current-date").text(startDate);
		var stime= new Date().Format("yyyy-MM-dd");
		//var stime = getWeekStartDate();
		if(stime!=startDate){
			$(".next").show();
			$(".next").text("下一天");
		}else{
			$(".next").hide();
		}
	}
	execution();
}
