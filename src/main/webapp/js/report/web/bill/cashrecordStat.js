var queryParameter="";
var startObj = $("#date-start"), endObj = $('#date-end');
var datenow=new Date().Format("yyyy-MM-dd");
var mrStart=startDate=datenow+" 00:00";
var mrEnd=endDate=datenow+' 23:59';//结束时间
var commercialId="";//商户编号
var cialDetailTb = new TableStyle("cialDetailTb");
cialDetailTb.base();
cialDetailTb.fixedThead();

$(function(){
	//日历控制
	startObj.attr({"data-date-minView":"0","data-date-format":"yyyy-mm-dd hh:ii","data-date-endDate":datenow+" 23:59"});
	endObj.attr({"data-date-minView":"0","data-date-format":"yyyy-mm-dd hh:ii","data-date-endDate":datenow+" 23:59"});
//	startObj.val(mrStart);
//	endObj.val(mrEnd);
	setDefaultDate();
//	setStartEndTime();
	startObj.on("change",function(){
		setStartEndTime();
	});
	endObj.on("focus",function(){
		setStartEndTime();
	});
    var orderDetailPopover = new OrderDetail("orderDetailPopover");
    orderDetailPopover.hide();
    $(document).delegate("#cialDetailTb .orderNumber","click",function(e){
        var target = $(e.target);
        orderDetailPopover.position(target);
    });
	searchReport();
	$(document).delegate("#undo-all","click",function(){
		setDefaultDate();
	});
});
//默认时间设置
function setDefaultDate(){
	startObj.val(mrStart);
	endObj.val(mrEnd);
	if(!bkeruyun.isPlaceholder()){
		startObj.next("span").hide();
		endObj.next("span").hide();
	}
}
//设置开始与结束时间限制
function setStartEndTime(){
	var value = $.trim(startObj.val());
	if(value){
		var year = value.substring(0,4),
			month = value.substring(5,7),
			date = value.substring(8,10),
			setmrEnd='';
		month = (month.substring(0,1) == 0) ? parseInt(month.substring(1)) : parseInt(month);
//		console.log("month=="+month);
		//month = (month+3) > 12
		if((month+3) > 12){
			year = year*1+ 1;
			month = '0'+(month+3)%12;
		}else if((month+3) < 10){
			month = '0'+(month+3);
		}else{
			month = month+3;
		}
//		console.log("month=="+month);
		setmrEnd = year+'-'+month+'-'+date;
//		console.log("setmrEnd=="+setmrEnd);
		setmrEnd = (new Date(setmrEnd)*1 < new Date()*1) ? setmrEnd+' 23:59' : datenow+' 23:59';
//		console.log("setmrEnd=="+setmrEnd);
		endObj.attr("data-date-endDate",setmrEnd);
	}
}

function searchReport(){
	bkeruyun.showLoading();
	commercialId=$("#commercialId").val();
	if(startObj.val() == ""){
		startObj.val(mrStart)
	}
	startDate=startObj.val();
	if(endObj.val() == ""){
		endObj.val(mrStart);
	}
	endDate=endObj.val();
	query();
	
	
}



//报表查询
function query(){
	//清空表格
	$(".transverse-thead").find("li").remove();
	$("#content").find("li").remove();
	$("#totalPrice").find("li").remove();
	var commercialId = $("#indicatorsSelect1").val();
	queryParameter="startDate="+(startDate+":00")+"&endDate="+(endDate+":59")+"&commercialIds="+commercialId;
	$.ajax({
		type: "POST",
		url: "report/cashrecordStat/list",
		data: queryParameter,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
//		async: false,
		cache: false,
		beforeSend:bkeruyun.showLoading,
		success: function(data){
			bkeruyun.hideLoading();
			var commercialCount=0;//商户数
			var cashTypeCount=0;//收银类型
			var allPrice=0;//合计总金额
			var list = data.list;
			var len = list.length;
			if(list != null && len > 0){
				//表头
				$(".transverse-thead").append('<li style="width:100px;">门店编号</li><li style="width:260px;">门店名称</li><li style="width:150px;">总金额</li>');
				for(var i = 0 ;i < len; i++){
					commercialCount++;
					$("#content").append(' <ul id="'+i+'_ul">');
					$("#"+i+"_ul").append('<li style="width:100px;">'+list[i].commercialId+'</li>');
					$("#"+i+"_ul").append('<li style="width:260px;">'+list[i].commercialName.substring(0,24)+'</li>');
					$("#"+i+"_ul").append('<li style="width:150px;">'+list[i].totalPrice.toFixed(2)+'</li>');
					allPrice  += list[i].totalPrice*1;
					for (var key in list[i]){
						if(key != 'commercialId' && key != 'commercialName' && key != 'totalPrice'){
							if(i == 0){
								//拼表头
								$(".transverse-thead").append('<li style="width:150px;">'+key+'</li>');
								cashTypeCount++;
							}
							//内容
							$("#"+i+"_ul").append('<li style="width:150px;">'+list[i][key].toFixed(2)+'</li>');
						}
					} 
					$("#content").append(' </ul>');
				}
				//合计
				$("#totalPrice").append(' <li style="width:100px;">&nbsp;</li><li style="width:260px;">合计</li><li style="width:150px;">'+allPrice.toFixed(2)+'</li>');
				for(var i = 0 ;i < cashTypeCount; i++){
					var price=0;
					for(var j=0; j < commercialCount;j++){
						//获取每个类型的值
						price += $("#"+j+"_ul li:eq("+(i+3)+")").text()*1;
					}
					$("#totalPrice").append('<li style="width:150px;">'+price.toFixed(2)+'</li>');
				}
				var colLen = $(".transverse-thead > li").length;
				if(colLen <= 4){
					var liWidth = Math.floor(parseInt($("#cialDetailTb").width())/colLen);
					$(".transverse-thead > li").width(liWidth+'px');
					$(".transverse-tbody > ul > li").width(liWidth+'px');
					$(".transverse-tfoot > li").width(liWidth+'px');
				}
				//宽度重排
				cialDetailTb.base();
			}else{
				var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧！");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			bkeruyun.hideLoading();
	        alert("网络异常，请检查网络连接状态！");
	    }
	});
	
}


