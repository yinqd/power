
$(function() {
	// $(".report-table-details,#status,#time,#source").hide();



	$(document).delegate("#cycleList > li","touchstart", function() {
		$(this).addClass("current").siblings().removeClass("current");
		handoverMoblie();
	});
	
	//点击上一*
	reportLayer.btnPrev.bind("click",function(){
		prev();
	});
	//点击下一*
	reportLayer.btnNext.bind("click",function(){
		next();
	});
	
	$(document).delegate(".filter-conditions > li >a", "click", function() {
		$(".filter-conditions > li >a").removeClass("current");
		$(this).addClass("current").siblings();
	});
	
	$("#commercialId").val($(".filter-conditions  a.current").attr("id"));

	
	//确定按钮
	$(document).delegate(".btn-confirm","click",function(){
		commerial=$(".filter-conditions  a.current").attr("id");
		handoverCount();
		handoverList();
	
	});

	
	
	
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
	handoverMoblie();
});

function   handoverMoblie(){
    day = $("#cycleList > li.current").text();
    if (day == '周') {
    	startDate = getWeekStartDate();
		endDate = getWeekEndDate();
		$(".current-date").text(startDate+"至"+endDate);
		$(".prev").text("上一周");
		$(".next").hide();
	} else {
		startDate = new Date().Format("yyyy-MM-dd");
		endDate = new Date().Format("yyyy-MM-dd");
		$(".prev").text("上一天");
		$(".next").hide();
		$(".current-date").text(startDate);
	}
	
	handoverCount();
	handoverList();
	
	
}


function    handoverCount(){
	 var   params={"startTime":startDate,"endTime":endDate};
	 if(typeof(commerial)!="undefined"){
	   params.commerialId=commerial;	 
	 }
	 $.post('report/handover/weixin/getHandoverCount.do',params,function(data) {
		 var  chartjson=jQuery.parseJSON(data);
//		 console.log(chartjson.count);
		 if(chartjson.count<1){
			 var notData = mobileReport.notQueryData("没有查到数据，试试其他查询条件吧!");
				if ($("#handover").parent().find(".notSearchContent").length > 0) {
					$("#handover").hide();
					$("#handover").parent().find(".notSearchContent").show();
				} else {
					$("#handover").hide();
					$("#handover").parent().append(notData);
				}
		 }else{
			 
			 if ($("#handover").is(":hidden")) {
					$("#handover").show();
					$("#handover").parent().find(".notSearchContent").hide();
				}
		 }
		 
		 $("#jjze").html("￥"+chartjson.handOverMoney);
	 	 $('#jjcs').html(chartjson.count);
		});
}

function   handoverList(){
	 var   params={"startTime":startDate,"endTime":endDate};
	 if(typeof(commerial)!="undefined"){
		   params.commerialId=commerial;	 
		}
	 $.post('report/handover/weixin/queryListByMobile',params,function(data) {
	    var items = jQuery.parseJSON(data);
		var  divhtml="";
		for (var i = 0; i < items.length; i++) {
			
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
  			var  times='';
  			if(items[i].handOverStartTime.substring(0,11)==items[i].handOverEndTime.substring(0,11)){
  				times=items[i].handOverStartTime.substring(0,11)+" "+items[i].handOverStartTime.substring(10)+"~"+items[i].handOverEndTime.substring(10);
  			}else{
  				times=items[i].handOverStartTime+"~"+items[i].handOverEndTime;
  			}
  			
  			
			
		divhtml+="<div   style='position:relative;overflow:hidden;width:100%'>"+
		"<h2 class='report-caption'  style='font-size:14px;font-weight:bolder'>"+
		times
		+"</h2>"+
        "<ul class='report-table-row'>"+
            "<div>交班收银员</div>"+
            "<div style='text-align:right;width:60%'  >"+handOverPeoples+"</div>"+
        "</ul>"+
        "<ul class='report-table-row'>"+
            "<div>交接金额</div>"+
            "<div style='text-align:right;width:60%'>￥"+items[i].handOverMoney+"</div>"+
        "</ul>"+
        "<ul class='report-table-row'>"+
            "<div>交接设备</div>"+
            "<div style='text-align:right;width:60%'>pad-"+items[i].padNo+"</div>"+
        "</ul>"+
        "<ul class='report-table-row'>"+
            "<div>接班收银员</div>"+
            "<div style='text-align:right;width:60%'>"+nextHandoverPeople+"</div>"+
        "</ul>"+
        "</div>";
		 }
	   
		 $("#handoverList").empty();
		 $("#handoverList").append(divhtml);
	    
		
		
		 
		});
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
		
		
	}else {
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
	handoverCount();
	handoverList();
	
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
	handoverCount();
	handoverList();
}


