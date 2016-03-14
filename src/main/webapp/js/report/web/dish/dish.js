$(function(){
	var d = new Date();
	if( $("#date-start").val()==null ||  $("#date-start").val()==''){
		$("#date-start").val(d.Format("yyyy-MM-dd"));
	}
	if($("#date-end").val()==null ||  $("#date-end").val()==''){
		$("#date-end").val($("#date-start").val());
	};
	
$(":radio[name='ranking']").on("change",function(){
	
	
    var checkedId = $(":radio[name='ranking']:checked").attr("id");
    if(checkedId == "ranking-2"){
      $("#rankingClass").show();
      //$("#classDishes").hide();
    	
    }else{
      $("#rankingClass").hide();
      //$("#classDishes").show();
    }
  });

$("#undo-all").on("click",function(e){
//	$(".datepicker-start").next(".close").click();
//	var groups= $(".select-group");
//	groups.each(function(){
//		 $(this).find("select").eq(0).find("option").eq(0).selected="selected";
//	     var   selectTxt=$(this).find("select").eq(0).find("option").eq(0).text();
//		 $(this).find("em").text(selectTxt);
//	});
	$("#rankingClass").hide();
	
});

	checkdish();
});

//查询按钮事件
function  checkdish(){
	
	var d = new Date();
	if( $("#date-start").val()==null ||  $("#date-start").val()==''){
		$("#date-start").val(d.Format("yyyy-MM-dd"));
	}
	if($("#date-end").val()==null ||  $("#date-end").val()==''){
		$("#date-end").val($("#date-start").val());
	};
	
    var checkedId = $(":radio[name='ranking']:checked").attr("id");
    if(checkedId == "ranking-2"){
      $("#rankingClass").show();
      dish();
    }else{
      $("#rankingClass").hide();
      dishAll();
    }
	
};

//菜品类型
function   dishAll(){
	var params=getParams();
	 $.post('report/dish/getDishTypeList.do',params,function(chartdata) {
		 var  chartjson=jQuery.parseJSON(chartdata);
//		 console.log(chartjson);
		 $("#singleDishes").hide();
		 if(chartjson.length<1){
				var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧!");
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
	   $.post('report/dish/getDishList.do',params,function(chartdata) {
		   var  chartjson=jQuery.parseJSON(chartdata);
		   var   desclist=chartjson.dishVoDesc;
		   if(desclist.length<1){
			   var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧！");
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
	   var  xlist=new  Array();
	   var  pricelist=new  Array();
	   var  countlist=new  Array();
	   var  ylist=new Array();
	   $.each(chartjson,function(i,v){
	       xlist.push(v.dishTypeName);
	       pricelist.push(v.sellPrice);
	       countlist.push(v.sellCount);
		});
	   pricelist.sort(function(a,b){return  a-b;});
	   countlist.sort(function(a,b){return a-b;});
	 //  console.log(xlist);
	   xlist=daoxu(xlist);
//	   console.log(xlist);
	      $.each(xlist,function(i,v){
	    	    if(v.length>6){
	    	    	 xlist[i]=v.substr(0,6)+'..';	
	    	    }
		 });   
	   
//       console.log(xlist);
	   // console.log(xlist);
	   //console.log($("#indexType option:selected").val());
	   if($("#indexType option:selected").val()=="sellprice"){
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
	    	
    	var indexType=$("#indexType  option:selected").val();
  	    var name="";
  	    if(indexType=="sellprice"){
  	    	name="销售总额";
  	    }else{
  	    	name="销售总数";
  	    }
		myChart = ec.init(document.getElementById('dishTypeChart'));
		option = {
				title:{
				    text:'菜品分类排行'
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
			            boundaryGap : [0, 0.01]
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
	   
	    
	    var trhtml="";
	    for(var i = 0; i < chartjson.length; i++){
	    	trhtml+="<tr>"+
                	"<td>"+chartjson[i].dishTypeNum+"</td>"+
                	"<td>"+chartjson[i].dishTypeName+"</td>"+
                    "<td>￥"+chartjson[i].sellPrice+"</td>"+
                    "<td>"+chartjson[i].sellCount+"</td>"+
                "</tr>";
	    	
	    };
	    $("#dishTypeList").empty();
        $("#dishTypeList").append(trhtml);
	   
};





function dishTop(chartjson){
	   var indexType=$("#indexType  option:selected").val();
	    var name="";
	    if(indexType=="sellprice"){
	    	name="销售总额";
	    }else{
	    	name="销售总数";
	    }
	   var    xlist= new Array();
	   var    ylist= new Array();
	   var    pricelist=new Array();
	   var    countlist=new Array();
	   require.config({
			paths : {
				echarts : 'js/echarts'
			}
		});
	   var dishDesc=chartjson.dishVoDesc;
	   $.each(dishDesc,function(i,v){
		  xlist.push(v.dishName); 
		  pricelist.push(v.sellPrice);
		  countlist.push(v.sellCount);
	   });
	   if($("#indexType option:selected").val()=="sellprice"){
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
	   
	   ylist.sort(function(a,b){return  a-b;});
	    require([ 'echarts', 'echarts/chart/bar'],function(ec){
		dishTopChart = ec.init(document.getElementById('dishTopChart'));
		dishTopoption = {
				title:{
				    text:'菜品排行',
				    subtext:'排行最高'
				
				 }, 
				 grid :{
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
			            boundaryGap :[0, 0.01]
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
	    
	   
	    var trhtml="";
	    for(var i = 0; i < dishDesc.length; i++){
	    	trhtml+="<tr>"+
		        	"<td>"+dishDesc[i].dishNum+"</td>"+
		            "<td>"+dishDesc[i].dishName+"</td>"+
		            "<td>"+dishDesc[i].dishTypeName+"</td>"+
		            "<td>￥"+dishDesc[i].sellPrice+"</td>"+
		            "<td>"+dishDesc[i].sellCount+"</td>"+
                "</tr>";
	    	
	    };
	    $("#dishDescList").empty();
        $("#dishDescList").append(trhtml);
	
});
};


function  dishbackwards(chartjson){
	  
	  var indexType=$("#indexType  option:selected").val();
	    var name="";
	    if(indexType=="sellprice"){
	    	name="销售总额";
	    }else{
	    	name="销售总数";
	    }
	require.config({
		paths : {
			echarts : 'js/echarts'
		}
	});
	var   xlist=new Array();
	var   ylist=new Array();
	var   pricelist=new Array();
	var   countlist=new Array();
	
	var  dishVolist=chartjson.dishVoList;
	$.each(dishVolist,function(i,v){
	   xlist.push(v.dishName);
	   pricelist.push(v.sellPrice);
	   countlist.push(v.sellCount);
	});
	if($("#indexType option:selected").val()=="sellprice"){
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
	//console.log(ylist);
	ylist=daoxu(ylist);
    //console.log(ylist);    
	
	require([ 'echarts', 'echarts/chart/bar'],function(ec){
    backwards = ec.init(document.getElementById('backwards'));
    backwardsoption = {
    		 title:{
			    subtext:'排行最低'
			 }, 
			 
			 grid:{
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
		            boundaryGap : [0, 0.01]
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
    var trhtml="";
    for(var i = 0; i < dishVolist.length; i++){
    	trhtml+="<tr>"+
            	"<td>"+dishVolist[i].dishNum+"</td>"+
                "<td>"+dishVolist[i].dishName+"</td>"+
                "<td>"+dishVolist[i].dishTypeName+"</td>"+
                "<td>￥"+dishVolist[i].sellPrice+"</td>"+
                "<td>"+dishVolist[i].sellCount+"</td>"+
            "</tr>";
    };
    $("#dishVoList").empty();
    $("#dishVoList").append(trhtml);

});
	
};






//获取所有查询属性
function   getParams(){	
 	var stime=$("#date-start").val();
	var etime=$("#date-end").val();
	var indexType=$("#indexType  option:selected").val();
	var dishType=$("#dishType  option:selected").val();
	var commercial=$("#commercialId option:selected").val();
	var params={"businessStarttime":stime,"businessEndtime":etime,"indexType":indexType};
	if(typeof(dishType)!="undefined"){
		params.dishTypeNum=dishType;
	}
	if(typeof(commercial)!="undefined"){
	    params.commercialId=commercial;
	}
	return  params;
};





//Date.prototype.Format = function (fmt) { //author: meizz 
//    var o = {
//        "M+": this.getMonth() + 1, 
//        "d+": this.getDate(), 
//        "h+": this.getHours(), 
//        "m+": this.getMinutes(),
//        "s+": this.getSeconds(), 
//        "q+": Math.floor((this.getMonth() + 3) / 3),  
//        "S": this.getMilliseconds() 
//    };
//    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//    for (var k in o)
//    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//    return fmt;
//};



//初始化时间

$(function(){
	dateLimitTrigger();
	//datepickerInitializeReport();
});


function dateLimitTrigger(){
	//设置开始时间最大值
//	$('#date-start').datetimepicker('setEndDate', new Date().Format("yyyy-MM-dd"));
	$('#date-start').attr("data-date-endDate",new Date().Format("yyyy-MM-dd"));
	$("#date-start").on("changeDate",function(ev){	
		var now = new Date();
		var temp =  new Date($('#date-start').val());
		temp.setFullYear(temp.getFullYear()+1);
		var maxDate= now.getTime()>temp.getTime()?temp.Format("yyyy-MM-dd"):now.Format("yyyy-MM-dd");
		$('#date-end').attr("data-date-endDate",maxDate);
		//		$('#date-end').datetimepicker("remove");
//		console.log("endtime,min:"+$('#date-start').val()+"  max:"+maxDate);
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
	});
}


function datepickerInitializeReport(){
	var startObj = $("#date-start"),
	    endObj = $('#date-end');
	
	startObj.datetimepicker({
		format: "yyyy-mm-dd",
		language:  'zh-CN',
		weekStart: 1,
		todayBtn:  1,
		autoclose: true,
		todayHighlight: true,
		startView: 2,
		minView: 2,
		//maxView: 2,
		forceParse: true
		
	}).on("changeDate",function(ev){
		var startValue = $(this).val(),
			endValue = (parseInt(startValue.substring(0,4))+1) + startValue.substring(4);
		
		endObj.datetimepicker("remove");
		endObj.val("");
		
		
		endObj.datetimepicker({
			format: "yyyy-mm-dd",
			language:  'zh-CN',
			weekStart: 1,
			todayBtn:  1,
			autoclose: true,
			todayHighlight: true,
			startView: 2,
			minView: 2,
			startDate: startValue,
			endDate: endValue,
			//maxView: 2,
			forceParse: true
		});
		
		startObj.next(".close").bind("click",function(){
			endObj.datetimepicker("remove");
			endObj.val("");
		});
	});
	if(startObj.val() != ""){
		var startValue = startObj.val(),
		    endValue = (parseInt(startValue.substring(0,4))+1) + startValue.substring(4);
		endObj.datetimepicker({
			format: "yyyy-mm-dd",
			language:  'zh-CN',
			weekStart: 1,
			todayBtn:  1,
			autoclose: true,
			todayHighlight: true,
			startView: 2,
			minView: 2,
			startDate: startValue,
			endDate: endValue,
			//maxView: 2,
			forceParse: true
		});
	}
	
}



// 倒序
function   daoxu(templist){
	  var  count =templist.length-1;
	  var   list=new  Array();
	  for(var  i=count;i>-1;i--){
	     list.push(templist[i]);
	  }
	  return  list;
}