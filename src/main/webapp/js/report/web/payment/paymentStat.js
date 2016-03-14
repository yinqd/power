/**
 * 
 */
var startObj = $("#date-start"), endObj = $('#date-end');
var datenow = new Date().Format("yyyy-MM-dd");
var mrStart=startDate=datenow;
var mrEnd=endDate=datenow;//结束时间
var commercialId = "";//商户编号
var cialDetailTb = new TableStyle("cialDetailTb");
cialDetailTb.base();
cialDetailTb.fixedThead();

$(function(){
	//日历控制
	startObj.attr({"data-date-format":"yyyy-mm-dd","data-date-endDate":datenow});
	endObj.attr({"data-date-format":"yyyy-mm-dd","data-date-endDate":datenow});
//	startObj.val(mrStart);
//	endObj.val(mrEnd);
	setDefaultDate();
//	setStartEndTime();
//	startObj.on("change",function(){
//		setStartEndTime();
//	});
//	endObj.on("focus",function(){
//		setStartEndTime();
//	});
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
		setmrEnd = (new Date(setmrEnd)*1 < new Date()*1) ? setmrEnd : datenow;
//		console.log("setmrEnd=="+setmrEnd);
		endObj.attr("data-date-endDate",setmrEnd);
	}
}

function searchReport(){
	bkeruyun.showLoading();
	commercialId = $("#commercial").find("option:selected").val();
	if(startObj.val() == ""){
		startObj.val(mrStart);
	}
	startDate = startObj.val();
	if(endObj.val() == ""){
		endObj.val(mrStart);
	}
	endDate = endObj.val();
	query();
}


function query() {
	//清空表格
	$("#table_head").empty();
	$("#table_content").empty();
	var commercialID = $("#commercial").find("option:selected").val();
	queryParameter = "startBizDate=" + startDate + "&endBizDate=" + endDate + "&commercialId=" + commercialID;
	$.ajax({
		type: "POST",
		url: "report/payment/statPaymentList",
		data: queryParameter,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
//		async: false,
		cache: false,
		beforeSend:bkeruyun.showLoading,
		success: function(data){
			bkeruyun.hideLoading();
			var dataList = data.rows; // 统计结果集
			console.debug(JSON.stringify(dataList));
			var payHeader = data.payHeader; // 支付列表头
			var cashHeader = data.cashHeader; // 收银列表头
			var totalRows = data.totalRows; // 合计行
			
			if (dataList != null && dataList.length > 0) {
				var colNum = data.payCount + 2;
				var payColWidth = colNum * 100;
				var cashColWidth = data.payCount * 100;
				// 生成动态表头
				$("#table_head").append('<tr id="first_header"><th rowspan="2" width="200">门店编号</th><th rowspan="2" width="200">门店名称</th><th rowspan="2" width="200">总金额</th><th colspan="' + colNum + '" width="' + payColWidth + '">收银总额</th></tr>');
				var thHtml = "";
				for (var cashType in cashHeader) {
					thHtml += '<th colspan="' + data.payCount + '" width="' + cashColWidth + '">' + cashHeader[cashType] + '</th>';
					
				}
				$("#first_header").append(thHtml);
				thHtml = '<tr id="second_header"><th width="100">溢收</th><th width="100">抹零</th>';
				for (var payType in payHeader) {
					thHtml += '<th width="100">' + payHeader[payType] + '</th>';
					
				}
				for (var i = 0; i < data.cashCount; i++) {
					for (var payType in payHeader) {
						thHtml += '<th width="100">' + payHeader[payType] + '</th>';
						
					}
				}
				thHtml += '</tr>';
				$("#table_head").append(thHtml);
				// 填充统计数据
				var dataHtml = "";
				for (var i = 0; i < dataList.length; i++) {
					var dataRow = dataList[i];
					var content = '<tr>';
					for (var colName in dataRow) {
						content += '<td>' + dataRow[colName] + '</td>';
						
					}
					content += '</tr>';
					dataHtml += content;
					
				}
				$("#table_content").append(dataHtml);
				// 填充合计行数据
				var totalHtml = '<tr><td colspan="2">合计</td>';
				for (var result in totalRows) {
					totalHtml += '<td>' + totalRows[result] + '</td>';
					
				}
				$("#table_content").append(totalHtml);
				cialDetailTb.base();
			} else {
				var message = bkeruyun.notQueryData("没有查到数据");
				$("#table_content").append(message);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			bkeruyun.hideLoading();
	        alert("网络异常，请检查网络连接状态！");
	    }
	});
}
