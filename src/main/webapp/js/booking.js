//var OrderStatusEnum = new EnumWrapper('${OrderStatusEnumJson}');
var pageQuery = new PageQuery("pageQuery"); //构建分页查询对象
$(function(){
//	$("#reservation-con > table:gt(0)").hide();
	$(document).delegate("#reservation-tab > li","click",function(i){
		//如果不在点击的不是当前页
		if(!$(this).is(".current")){
//			alert("not current");
			var index = $(this).index();
//			$('#disheTimeSimple').datetimepicker("remove");
			$("#undo-all").click();
			if(index == 0){
				timeSimple1();
				timeSenior1();
				clearOrderStatus();
			}else if(index == 1){
				//点击待处理标签 订单状态选中且只能选择未处理
				$(":checkbox[name='orderStatus']").each(function(i){
					var statusId = $(this).attr("id");
					if(statusId == "tablesType_-2"){
						this.checked = true;
						$(this).parent().addClass("checkbox-check");
					}else{
						this.checked = false;
						$(this).parent().removeClass("checkbox-check");
					}
					this.disabled = true;
					$(this).parent().addClass("checkbox-disable");
				});
				if(!$("#tablesType-all").get(0).checked){
					$("#tablesType-all").attr({"checked":"checked","disabled":"disabled"}).parent().addClass("checkbox-check checkbox-disable");
				}
				
				timeSimple2();
				timeSenior2();
			}else{
				timeSimple2();
				timeSenior2();
				clearOrderStatus();
				
			}
			$(this).addClass("current").siblings().removeClass("current");
			$("#reservation-con > table").hide();
			$("#reservation-con > table").eq(index).show();
			//默认选择预订就餐时间
			$(":radio[name='isSendTime']").each(function(i){
				if(i != 0){
					if($(this).parent().hasClass("radio-check")){
						$(this).parent().removeClass("radio-check");
					}
					
				}
			});
			$(":radio[name='isSendTime']").eq(0).attr("checked","checked").parent().addClass("radio-check");
			query();
		}
		
		function clearOrderStatus(){
			$(":checkbox[name='orderStatus']").each(function(i){
				if(this.checked){
					this.checked = false;
					$(this).parent().removeClass("checkbox-check");
				}
				if(this.disabled){
					this.disabled = false;
					$(this).parent().removeClass("checkbox-disable");
				}
			});
			if($("#tablesType-all").get(0).checked){
				$("#tablesType-all").removeAttr("checked").parent().removeClass("checkbox-check");
			}
			if($("#tablesType-all").get(0).disabled){
				$("#tablesType-all").removeAttr("disabled").parent().removeClass("checkbox-disable");
			}
			
		}
	});
	//全部撤销
	$("#undo-all").on("click",function(){
		if($("#reservation-tab > li.current").index() == 1){
			//点击待处理标签 订单状态选中且只能选择未处理
			$(":checkbox[name='orderStatus']").each(function(i){
				var statusId = $(this).attr("id");
				if(statusId == "tablesType_-2"){
					this.checked = true;
					$(this).parent().addClass("checkbox-check");
				}else{
					this.checked = false;
					$(this).parent().removeClass("checkbox-check");
				}
				this.disabled = true;
				$(this).parent().addClass("checkbox-disable");
			});
			if(!$("#tablesType-all").get(0).checked){
				$("#tablesType-all").attr({"checked":"checked","disabled":"disabled"}).parent().addClass("checkbox-check checkbox-disable");
			}
			
		}
	});
	//高级查询
	$("#link-seniorSearch").on("click",function(e){
		e.preventDefault();
		var status = $(this).attr("data-status");
		if(status == 0){
			$("#disheTimeSimple").val("");
			$("#timeSimple").hide();
			$("#timeSenior").show();
			$("#seniorSearch").show();
			$(this).text("返回简单查询").attr("data-status",1);
		}else{
			$("#timeSimple").show();
			$("#disheTimeStart").val("");
			$("#disheTimeEnd").val("");
			$("#timeSenior").hide();
			$("#seniorSearch").hide();
			$(this).text("高级查询").attr("data-status",0);
		}
		$(window).scrollTop(0);
	});
	//初始化 预订就餐时间 简单
	timeSimple1();
	//初始化 预订就餐时间 高级
	timeSenior1();
	//预订时间和创建时间的切换
	$(":radio[name='isSendTime']").change(function(){
		var value =$(":radio[name='isSendTime']:checked").val();
		$('#disheTimeEnd').datetimepicker("remove");
		//alert(value);
		$("#timeSenior .close").click();
		if(value == 0){
			//今日
			if($("#reservation-tab > li.current").index() == 0){
				timeSenior1();
			}else{
				timeSenior2();
			}
		}else{
			timeSenior3();
		}
	});
	
	query();
});

//var valueData = {};


var dataId = $("#reservation-tab").find("li.current").attr("data-id");
if (dataId == 1) {
	pageQuery.pageQueryDataId = "today"; //设置数据表格的id
} else if (dataId == 2) {
	pageQuery.pageQueryDataId = "untreated"; //设置数据表格的id
} else if (dataId == 3) {
	pageQuery.pageQueryDataId = "all"; //设置数据表格的id
}

pageQuery.pageQueryToolId = "pageToolDiv"; //设置分页工具栏的id
pageQuery.showTotalPage = true;
pageQuery.showTotalRows= true;

var formData = "";
function query() {
//	var checks = $(".panel-list-type").find(":checkbox[id!='tablesType-all']");
//	$(checks).each(function(){
//		var value = $(this).val();
//		//value = Math.abs(value);
//		var textValue = $(this).parent().text();
//		valueData[value] = textValue;
//	});
//	var orderKey = "order_" + -4;
//	valueData[-4] = "逾期未到店";

	formData = buildParams(formData);
	pageQuery.queryPage(1, loadData);
}

//window.onscroll = function(){
//	var scrollTop = $(document).scrollTop();
//	var wH = $(window).height();
//	var dH = $(document).height() - 50;
//	if(scrollTop + wH > dH ){
//		pageQuery.scrollNextPage(loadData);
//	}
//};

// 数据来源未处理，待定
function buildParams(formData) {
	formData = serializeFormById("queryForm");
	var flag = $("#seniorSearch").is(":hidden");
	var queryType;
	if (!flag) {
		queryType = 2;
	} else {
		queryType = 1;
	}
	if (queryType == 2) {
		var dataSource = [];
		var radioValue = $(":radio:checked").val();
		if (radioValue == 0) {
			formData += "&queryField=orderTime";
		} else if (radioValue == 1) {
			formData += "&queryField=createTime";
		}
		
		var sourceSelected = $("#orderSource").find("option:selected").val();
		if (sourceSelected == "") {
			 var optionObj = $("#orderSource").find("option[value!='']");
			 $(optionObj).each(function() {
				 var dataValue = $(this).val();
				 dataSource.push(dataValue);
			 }); 
		} else {
			dataSource.push(sourceSelected);
		}
		
		formData += "&orderSource=" + dataSource;
	}
	
	dataId = $("#reservation-tab").find("li.current").attr("data-id");
	var selectedValue = $("#commercial").find("option:selected").val();
//	var data = [];
	if (typeof(selectedValue) != "undefined") {
		if (selectedValue != "") {
//			 var option = $("#commercial").find("option[value!='']");
//			 $(option).each(function() {
//				 var value = $(this).val();
//				 data.push(value);
//			 }); 
			formData += "&commercialId=" + selectedValue;
		} else {
			formData += "&commercialId=all";
		}
	}
	
	formData += "&queryType=" + queryType + "&queryTab=" + dataId;
//	console.debug(formData);
	return formData;
}

function loadData() {
	var params = formData + "&" + pageQuery.getPageParameter(true);
	$.ajax({
		type:"POST",
		url:"booking/queryListForPage",
		data:params + "&random=" + Math.random(),
		dataType:"json",
		cache: false,
//		async: false,
		beforeSend:showLoading,
		success:function(data) {
			hideLoading();
//			console.debug(data);
			pageQuery.totalRows = data.totalRows;
			pageQuery.lastPage = (pageQuery.lastPage == null ? 1 : pageQuery.currentPage);
			var totalHtml = "(" + data.totalRows + ")";
			var items = data.items;
			var trHtml = "";
			for (var i = 0; i < items.length; i++) {
				var orderStatus = items[i].orderStatus;
//				for (var item in valueData) {
//					if (orderStatus == item) {
						// 未处理
						if (orderStatus == OrderStatusEnum.UNTREATED.backValue) {
							trHtml += "<tr><td><i class='icon-untreated'>" + OrderStatusEnum.UNTREATED.viewValue + "</i></td>";
						// 未到店
						} else if (orderStatus == OrderStatusEnum.UNREACHED.backValue) {
							trHtml += "<tr><td><i class='icon-noshop'>" + OrderStatusEnum.UNREACHED.viewValue + "</i></td>";
						// 已到店
						} else if (orderStatus == OrderStatusEnum.REACHED.backValue) {
							trHtml += "<tr><td><i class='icon-shop'>" + OrderStatusEnum.REACHED.viewValue + "</i></td>";
						// 已离店
						} else if (orderStatus == OrderStatusEnum.LEAVE.backValue) {
							trHtml += "<tr><td><i class='icon-leave'>" + OrderStatusEnum.LEAVE.viewValue + "</i></td>";
						// 已拒绝
						} else if (orderStatus == OrderStatusEnum.REJECTED.backValue) {
							trHtml += "<tr><td><i class='icon-refused'>" + OrderStatusEnum.REJECTED.viewValue + "</i></td>";
						// 已取消
						} else if (orderStatus == OrderStatusEnum.CANCEL.backValue) {
							trHtml += "<tr><td><i class='icon-cancelled'>" + OrderStatusEnum.CANCEL.viewValue + "</i></td>";
						// 逾期未到店
						} else if (orderStatus == OrderStatusEnum.OVERDUEUNREACHED.backValue) {
							trHtml += "<tr><td><i class='icon-overdue'>" + OrderStatusEnum.OVERDUEUNREACHED.viewValue + "</i></td>";
						}
//						break;
//					}
					
//				}
				var orderTime = $.trim(items[i].ordertime);
				if (dataId == 1) {
					if (orderTime.indexOf(" ") > 0) {
						var dateIndex = orderTime.indexOf(" ");
						orderTime = orderTime.substring(dateIndex + 1, dateIndex + 6);
					} else {
						orderTime = "00:00";
					}
					
				} else {
					if (orderTime.indexOf(" ") > 0) {
						var index = orderTime.lastIndexOf(":");
						orderTime = orderTime.substring(0, index);
					} else {
						orderTime += " 00:00";
					}
					
				}
				var orderSource = "";
				// 代订
				if (items[i].ordersource == 'DaiDingYuDing') {
					orderSource = SourceEnum.DaiDingYuDing.viewValue;
				// 到店
				} else if (items[i].ordersource == 'DaoDian') {
					orderSource = SourceEnum.DaoDian.viewValue;
				// 大众点评
				} else if (items[i].ordersource == 'DaZhongDianPing' || items[i].ordersource == '大众点评') {
					orderSource = SourceEnum.DaZhongDianPing.viewValue;
				// 美团
				} else if (items[i].ordersource == 'MeiTuan' || items[i].ordersource == '美团') {
					orderSource = SourceEnum.MeiTuan.viewValue;
				// 百度糯米
				} else if (items[i].ordersource == 'Baidu' || items[i].ordersource == 'Nuomi') {
					orderSource = SourceEnum.Baidu.viewValue;
				// 微信
				} else if (items[i].ordersource == 'WeiXin') {
					orderSource = SourceEnum.WeiXin.viewValue;
				// 订餐小秘书
				} else if (items[i].ordersource == 'XiaoMiShu') {
					orderSource = SourceEnum.XiaoMiShu.viewValue;
				// 找位
				} else if (items[i].ordersource == 'ZhaoWei') {
					orderSource = SourceEnum.ZhaoWei.viewValue;
				// 手机
				} else if (items[i].ordersource == 'ShouJiYuDing') {
					orderSource = SourceEnum.ShouJiYuDing.viewValue;
				// 电话
				} else if (items[i].ordersource == 'DianHuaYuDing') {
					orderSource = SourceEnum.DianHuaYuDing.viewValue;
				}
				
//				var tableId = items[i].tableid;
//				var tableNum = items[i].tableNum;
				var tableId = null;
				var tableNum = null;
				var status = items[i].isDelete;
				if (status != null) {
					var tempId = "";
					var tempNum = "";
					var tableArray = items[i].tableList;
					if (tableArray != null && tableArray != '') {
						for (var j = 0; j < tableArray.length; j++) {
							if (tableArray[j].id != null && tableArray[j].id != '') {
								tempId += tableArray[j].id + ",";
							}
							if (tableArray[j].tableNum != null && tableArray[j].tableNum != '') {
								tempNum += tableArray[j].tableNum + ",";
							}
						}
						
						if ($.trim(tempId) != '') {
							tableId = tempId.substring(0, tempId.length - 1);
						} else {
							tableId = null;
						}
						
						if ($.trim(tempNum) != '') {
							tableNum = tempNum.substring(0, tempNum.length - 1);
						} else {
							tableNum = null;
						}
					}
				}
				
				trHtml += "<td>" + orderTime + "</td><td>" + items[i].customername + "</td><td>" + (items[i].customermobile == null ? "-" : items[i].customermobile) + "</td><td>" +
				items[i].ordernumber + "</td><td>" + (tableNum == null ? "-" : tableNum) + "</td><td>" + orderSource + "</td><td>" +
						"<a href='javascript:view(" + items[i].id + "," + tableId + "," + items[i].commercialid + ")' title='查看' class='icon-view' id='" + items[i].id + (tableId == null ? "" : "_" + tableId) + "'>查看</a></td></tr>";
			}
			
			if (dataId == 1) {
				$("#totayTab").empty();
				$("#totayTab").append(totalHtml);
				$("#today").empty();
				$("#today").append(trHtml);
				
				$("#untreatedTab").empty();
				$("#untreatedTab").append("(" + data.bookingCountMap["untreated"] + ")");
				$("#allTab").empty();
				$("#allTab").append("(" + data.bookingCountMap["total"] + ")");
				
			} else if (dataId == 2) {
				$("#untreatedTab").empty();
				$("#untreatedTab").append(totalHtml);
				$("#untreated").empty();
				$("#untreated").append(trHtml);
				
				$("#totayTab").empty();
				$("#totayTab").append("(" + data.bookingCountMap["today"] + ")");
				$("#allTab").empty();
				$("#allTab").append("(" + data.bookingCountMap["total"] + ")");
			} else {
				$("#allTab").empty();
				$("#allTab").append(totalHtml);
				$("#all").empty();
				$("#all").append(trHtml);
				
				$("#totayTab").empty();
				$("#totayTab").append("(" + data.bookingCountMap["today"] + ")");
				$("#untreatedTab").empty();
				$("#untreatedTab").append("(" + data.bookingCountMap["untreated"] + ")");
			}
			
			pageQuery.afterQuery();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			hideLoading();
	        alert("网络异常，请检查网络连接状态！");
	    }
		
	});
}

function view(orderId, tableId, commercialId) {
	if (!tableId) {
		location.href = $("base").attr("href") + "booking/view?orderId=" + orderId + "&commercialId=" + commercialId;
	} else {
		location.href = $("base").attr("href") + "booking/view?orderId=" + orderId + "&tableId=" + tableId + "&commercialId=" + commercialId;
	}
}

//预订就餐时间 简单 从时间开始
function timeSimple1(){
	$('#disheTimeSimple').datetimepicker("remove");
	$('#disheTimeSimple')
	.datetimepicker({
		format: "hh:ii",
        language:  'zh-CN',
        weekStart: 0,
        todayBtn:  1,
		autoclose: true,
		todayHighlight: true,
		startView: 1,
		//minView: 0,
		maxView: 2,
		//setStartDate:"2014-10-1",
		forceParse: true
    });
	//$('#disheTimeSimple').datetimepicker('setStartDate', new Date());
}
//预订就餐时间 简单 从日期开始
function timeSimple2(){
	$('#disheTimeSimple').datetimepicker("remove");
	$('#disheTimeSimple')
	.datetimepicker({
		format: "yyyy-mm-dd hh:ii",
		language:  'zh-CN',
		weekStart: 0,
		todayBtn:  1,
		autoclose: true,
		todayHighlight: true,
		startView: 2,
		//minView: 0,
		maxView: 2,
		//setStartDate:"2014-10-1",
		forceParse: true
	});
	//$('#disheTimeSimple').datetimepicker('setStartDate', new Date());
}
//预订就餐时间 高级 从时间开始
function timeSenior1(){
	$('#disheTimeStart').datetimepicker("remove");
	$('#disheTimeStart')
	.datetimepicker({
		format: "hh:ii",
        language:  'zh-CN',
        weekStart: 0,
        todayBtn:  1,
		autoclose: true,
		todayHighlight: true,
		startView: 1,
		//minView: 0,
		maxView: 2,
		//setStartDate:"2014-10-1",
		forceParse: true
    })
	.on("changeDate",function(ev){
		var value = $(this).val();
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		var date = d.getDate();
		var startDate = returnDate(year,month,date + " " + value);
		//清除上一次操作;
		$('#disheTimeEnd').datetimepicker("remove");
		$('#disheTimeEnd').val("");
		
		//重新初始化结束时间 开始日期之前不可选
		$('#disheTimeEnd').datetimepicker({
			format: "hh:ii",
			language:  'zh-CN',
			weekStart: 0,
			todayBtn:  1,
			autoclose: true,
			todayHighlight: true,
			startView: 1,
			//minView: 0,
			maxView: 2,
			//startDate: value,
			forceParse: true
		});
		$('#disheTimeEnd').datetimepicker('setStartDate', startDate);
	});;
	//$('#disheTimeStart').datetimepicker('setStartDate', new Date());
}
//预订就餐时间 高级 从日期开始
function timeSenior2(){
//	alert("timeSenior2");
	$('#disheTimeStart').datetimepicker("remove");
	$('#disheTimeStart')
	.datetimepicker({
		format: "yyyy-mm-dd hh:ii",
        language:  'zh-CN',
        weekStart: 0,
        todayBtn:  1,
		autoclose: true,
		todayHighlight: true,
		startView: 2,
		//minView: 0,
		maxView: 2,
		//setStartDate:"2014-10-1",
		forceParse: true
    })
	.on("changeDate",function(ev){
		var value = $(this).val();
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		var date = d.getDate();
		var startDate = returnDate(year,month,date + " " + value);
		//清除上一次操作;
		$('#disheTimeEnd').datetimepicker("remove");
		$('#disheTimeEnd').val("");
		
		//重新初始化结束时间 开始日期之前不可选
		$('#disheTimeEnd').datetimepicker({
			format: "yyyy-mm-dd hh:ii",
			language:  'zh-CN',
			weekStart: 0,
			todayBtn:  1,
			autoclose: true,
			todayHighlight: true,
			startView: 2,
			//minView: 0,
			maxView: 2,
//			startDate: value,
			forceParse: true
		});
		$('#disheTimeEnd').datetimepicker('setStartDate', value);
	});
	//$('#disheTimeStart').datetimepicker('setStartDate', new Date());
}
//预订创建时间 只有日期
function timeSenior3(){
//	alert("timeSenior3");
	$('#disheTimeStart').datetimepicker("remove");
	$('#disheTimeStart')
	.datetimepicker({
		format: "yyyy-mm-dd",
        language:  'zh-CN',
        weekStart: 0,
        todayBtn:  1,
		autoclose: true,
		todayHighlight: true,
		startView: 2,
		minView: 2,
//		maxView: 2,
		//setStartDate:"2014-10-1",
		forceParse: true
    })
	.on("changeDate",function(ev){
		var value = $(this).val();
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		var date = d.getDate();
		var startDate = returnDate(year,month,date + " " + value);
		//清除上一次操作;
		$('#disheTimeEnd').datetimepicker("remove");
		$('#disheTimeEnd').val("");
		
		//重新初始化结束时间 开始日期之前不可选
		$('#disheTimeEnd').datetimepicker({
			format: "yyyy-mm-dd",
			language:  'zh-CN',
			weekStart: 0,
			todayBtn:  1,
			autoclose: true,
			todayHighlight: true,
			startView: 2,
			minView: 2,
//			maxView: 2,
//			startDate: value,
			forceParse: true
		});
		$('#disheTimeEnd').datetimepicker('setStartDate', value);
	});
	//$('#disheTimeStart').datetimepicker('setStartDate', new Date());
}