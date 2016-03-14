$(function(){;
	var d = new Date();
	if( $("#date-start").val()==null ||  $("#date-start").val()==''){
		$("#date-start").val(d.Format("yyyy-MM-dd"));
	}
	if($("#date-end").val()==null ||  $("#date-end").val()==''){
		$("#date-end").val($("#date-start").val());
	}
	
	$("#undo-all").on("click",function(e){
//		$(".datepicker-start").next(".close").click();
//		var groups= $(".select-group");
//		groups.each(function(){
//			 $(this).find("select").eq(0).find("option").eq(0).selected="selected";
//		     var   selectTxt=$(this).find("select").eq(0).find("option").eq(0).text();
//			 $(this).find("em").text(selectTxt);
//		});
		
		
	});

    count();
    query();
 


});

function    count(){
	 
	  var handoverPeople=$("#handoverPeople option:selected").val();
	   var device=$("#device option:selected").val();
	   var commerial=$("#commerials option:selected").val();
	   var  stime=$("#date-start").val();
	   var  etime=$("#date-end").val();
	   var  params={'startTime':stime,'endTime':etime,"shiftPeople":handoverPeople,"deviceId":device};
	   if(commerial!=0){
		   params.commerialId=commerial;
	   }
	 $.post('report/handover/getHandoverCount.do',params,function(data) {
		 var  chartjson=jQuery.parseJSON(data);
		 if(chartjson.count!=0){
			 $("#main").show();
			 $("#main").parent().find(".notSearchContent").hide();
				 
		 }else{
			 $("#main").hide();
			 if($("#main").parent().find(".notSearchContent").length > 0){
					$("#main").parent().find(".notSearchContent").show();
				}else{
					var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧!");	
					$("#main").parent().append(notData);
				}
		 }
		 
	 	 $("#jjze").html("￥"+chartjson.handOverMoney);
	 	 $('#jjcs').html(chartjson.count);

		});
}


function    option(){
	var d = new Date();
	if( $("#date-start").val()==null ||  $("#date-start").val()==''){
		$("#date-start").val(d.Format("yyyy-MM-dd"));
	}
	if($("#date-end").val()==null ||  $("#date-end").val()==''){
		$("#date-end").val($("#date-start").val());
	};
	count();
	query();
	
}

function query() {
	 handoverQuery = new PageQuery("handoverQuery"); //构建分页查询对象
	 handoverQuery.pageSize=15;
	 handoverQuery.queryPage(1,loadData);
}


function    loadData(){
	 
	   var handoverPeople=$("#handoverPeople option:selected").val();
	   var device=$("#device option:selected").val();
	   var commerial=$("#commerials option:selected").val();
	   var  stime=$("#date-start").val();
	   var  etime=$("#date-end").val();
	   var  params={'page.currentPage':handoverQuery.currentPage,'page.pageSize':handoverQuery.pageSize,'page.subRows':handoverQuery.getSubRows(),'startTime':stime,'endTime':etime,"shiftPeople":handoverPeople,"deviceId":device};
	   if(commerial!=0){
		    params.commerialId=commerial; 
	   }
	   bkeruyun.showLoading();
	   
	   $.post('report/handover/queryListForPage.do',params,function(data) {
		   bkeruyun.hideLoading();
		   handoverQuery.pageQueryDataId="handover-1";
		   handoverQuery.pageQueryToolId = "handoverToolDiv"; //设置分页工具栏的id
		   handoverQuery.showTotalPage = true;
		   handoverQuery.showTotalRows= true;
		   handoverQuery.totalRows = data.totalRows;
		   handoverQuery.lastPage = (handoverQuery.lastPage == null ? 1 : handoverQuery.currentPage);
		   var items = data.items;
  		   var trhtml= "";
  		   
  		   
  		   
  		   for (var i = 0; i < items.length; i++) {
  			var  handOverPeoples='';
  			var  nextHandoverPeople='';
  			if(typeof(items[i].handOverPeoples)=='undefined' || items[i].handOverPeoples==''){
  				handOverPeoples='-';
  			}else{
  				handOverPeoples=items[i].handOverPeoples;
  			}
  			
  			
  			if(typeof(items[i].nextHandoverPeople)=='undefined' || items[i].nextHandoverPeople==''){
  				nextHandoverPeople='-';
  			}else{
  				nextHandoverPeople=items[i].nextHandoverPeople;
  			}
  			trhtml+="<tr>"+
        	"<td>"+items[i].handOverEndTime+"</td>"+
            "<td>"+handOverPeoples+"</td>"+
            "<td>  ￥"+items[i].handOverMoney +"</td>"+
            "<td>  pad-"+items[i].padNo +"</td>"+
            "<td>"+nextHandoverPeople+"</td>"+
            "<td><a href='javascript:view("+items[i].id+")' title='查看' class='icon-view' >查看</a></td>"+
            "</tr>";
  		 }
  		$("#handover-1").empty();
	    $("#handover-1").append(trhtml);
	
	    handoverQuery.afterQuery();
		}
	   
	   
	   );
	  
	
	
}
    

/**shift 
 * 查看详情
 * @param orderId
 * @param tableId
 * @param obj
 */
function view(handoverId) {
	
location.href = "report/handover/getHandoverDetails?id="+handoverId;
	   
}
    
    
    
    
    
    
    Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    
    
    
    
    
    $(function(){
    	//初始化日历控件
    	dateLimitTrigger();	
    });

    function dateLimitTrigger(){
    	//设置开始时间最大值
    	$('#date-start').datetimepicker('setEndDate', new Date().Format("yyyy-MM-dd"));
    	$("#date-start").on("changeDate",function(ev){	
    		var now = new Date();
    		var temp =  new Date($('#date-start').val());
    		temp.setFullYear(temp.getFullYear()+1);
    		var maxDate= now.getTime()>temp.getTime()?temp.Format("yyyy-MM-dd"):now.Format("yyyy-MM-dd");
    		$('#date-end').datetimepicker("remove");
    		console.debug("endtime,min:"+$('#date-start').val()+"  max:"+maxDate);
    		$('#date-end').datetimepicker({
    			format: "yyyy-mm-dd",
    			language:  'zh-CN',
    			weekStart: 1,
    			todayBtn:  1,
    			autoclose: true,
    			todayHighlight: true,
    			startView: 2,
    			minView: 2,
    			startDate: $('#date-start').val(),
    			endDate: maxDate,
    			//maxView: 2,
    			forceParse: true
    		});
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
    		
    		//清除上一次操作;
    		endObj.datetimepicker("remove");
    		endObj.val("");
    		
    		//重新初始化结束时间 开始日期之前不可选
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
    		//清空开始日期 结束日期为空 不可选
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

