/**
 * 账单明细表js
 */
//var pageQuery = new PageQuery("pageQuery"); // 构建分页查询对象
//pageQuery.pageQueryDataId = "tbody"; // 设置数据表格的id
//pageQuery.pageQueryToolId = "pageToolDiv"; // 设置分页工具栏的id
//pageQuery.showTotalPage = true;

var startObj = $("#date-start");
var today = new Date().Format("yyyy-MM-dd")
var orderDetailPopover = new OrderDetail("orderDetailPopover","cialDetailTb");
var cialDetailTb = new TableStyle("cialDetailTb");
cialDetailTb.base();
cialDetailTb.fixedThead();
$(function() {
	$("#cialDetailTb").hide();
	bkeruyun.showLoading();
	// 设置时间控件默认时间
	setDefaultDate();
//	startObj.val(today);
//	if(!bkeruyun.isPlaceholder()){
//		startObj.next("span").hide();
//	}
	
	startObj.attr("data-date-endDate", today);
	// 全部撤销设置默认时间
	$("#undo-all").click(function() {
		setDefaultDate();
	})

	// cialDetailTb.fixedLeft(2);
	orderDetailPopover.hide();
	$(document).delegate("#cialDetailTb .orderNumber", "click", function(e) {
		$(".popover-content .orderList").empty();
		var target = $(e.target);
		orderDetailPopover.position(target);
	});
	query();
});
//默认时间设置
function setDefaultDate(){
	startObj.val(today);
	if(!bkeruyun.isPlaceholder()){
		startObj.next("span").hide();
	}
}
/** 点击查询触发事件 start */
function query() {
	//隐藏弹层
	orderDetailPopover.hide();
	var date = startObj.val();
	if (date == null || date == '') {
		startObj.val(today);
		date = startObj.val();
	}
	var commercialId = $("#indicatorsSelect1 option:selected").val();
	var parm='';
	if (commercialId!=undefined) {
		parm = "date=" + date + "&commercialId=" + commercialId;
	}else {
		 parm="date=" + date;
	}
	$
			.ajax({
				type : "POST",
				url : "report/getBillInfos",
				data : parm + "&random=" + Math.random(),
				dataType : "json",
				beforeSend : bkeruyun.showLoading,
				success : function(data) {
					bkeruyun.hideLoading();
					if (data != null) {
//						pageQuery.totalRows = data.billingDetailsVos.length;
//						pageQuery.queryPage(1, loadData);
						if ($("#cialDetailTb").is(":hidden")) {
							$("#cialDetailTb").show();
							$("#cialDetailTb").parent().find(".notSearchContent").hide();
						}
						var cashMethods = data.cashMethodList;
						var bills = data.billingDetailsVos;
						var titel = '<li style="width:100px;">单据号码</li>'
								+ '<li style="width:100px;">订单类型</li>'
								+ '<li style="width:80px;">收银员名称</li>'
								+ '<li style="width:200px;">交易时间</li>'
								+ '<li style="width:80px;">来源</li>'
								+ '<li style="width:100px;">总金额</li>';
						for (var i = 0; i < cashMethods.length; i++) {
							titel += '<li style="width:100px;">' + cashMethods[i] + '</li>';
						}
						var bill = '';
						var total=0;
						var everyTotal=new Array();
						for(var i=0;i<cashMethods.length;i++){
							everyTotal[i]=0;
						}

							for (var i = 0; i < bills.length; i++) {
								var orderType = '堂食';
								if (bills[i].orderType == 1) {
									orderType = '外卖';
								}
								var source = orderSource(bills[i].orderSource);
								total+=bills[i].cashPrice;
								bill += '<ul><li style="width:100px;"><a href="javascript:dish(\''
										+ bills[i].synFlag + '\',' + bills[i].orderType
										+ ')" class="orderNumber">' + bills[i].orderNo
										+ '</a></li>' + '<li style="width:100px;">' + orderType + '</li>'
										+ '<li style="width:80px;">' + bills[i].operator + '</li>' + '<li style="width:200px;">'
										+ bills[i].cashTime + '</li>' + '<li style="width:80px;">' + source
										+ '</li>' + '<li style="width:100px;">' + bills[i].cashPrice + '</li>';
								for (var j = 0; j < bills[i].priceList.length; j++) {
									bill += '<li style="width:100px;">' + bills[i].priceList[j] + '</li>';
									everyTotal[j]+=bills[i].priceList[j];
								}
								bill += '</ul>';
							}
							bill+='<ul><li style="width:100px;"></li><li style="width:100px;"></li><li style="width:80px;"></li><li style="width:200px;"></li><li style="width:80px;">合计</li><li style="width:100px;">'+total.toFixed(2)+'</li>';
							for(var i=0;i<everyTotal.length;i++){
								bill+='<li style="width:100px;">'+ everyTotal[i].toFixed(2) + '</li>'
							}
							bill+="</ul>";
//						pageQuery.afterQuery();
						$("#cialDetailTb .transverse-thead").empty();
						$("#cialDetailTb .transverse-tbody").empty();
						$("#cialDetailTb .transverse-thead").append(titel);
						$("#cialDetailTb .transverse-tbody").append(bill);
						cialDetailTb.base();
					} else {
						var notData = bkeruyun
								.notQueryData("没有查到数据，试试其他查询条件吧！");
						if ($("#cialDetailTb").parent().find(
								".notSearchContent").length > 0) {
							$("#cialDetailTb").hide();
							$("#cialDetailTb").parent().find(
									".notSearchContent").show();
						} else {
							$("#cialDetailTb").hide();
							$("#cialDetailTb").parent().append(notData);
						}
					}
				}
			})
}
/**
function loadData() {
	//隐藏弹层
	orderDetailPopover.hide();
	var date = startObj.val();
	if (date == null || date == '') {
		startObj.val(today);
		date = startObj.val();
	}
	var commercialId = $("#indicatorsSelect1 option:selected").val();
	var parm='';
	if (commercialId!=undefined) {
		parm = "date=" + date + "&commercialId=" + commercialId;
	}else {
		 parm="date=" + date;
	}
	$.ajax({
		type : "POST",
		url : "report/getBillInfos",
		data : parm + "&random=" + Math.random(),
		dataType : "json",
		beforeSend : bkeruyun.showLoading,
		success : function(data) {
			bkeruyun.hideLoading();
			pageQuery.lastPage = (pageQuery.lastPage == null ? 1
					: pageQuery.currentPage);
			if ($("#cialDetailTb").is(":hidden")) {
				$("#cialDetailTb").show();
				$("#cialDetailTb").parent().find(".notSearchContent").hide();
			}
			var t = data.cashMethodList;
			var b = data.billingDetailsVos;
			var titel = '<li style="width:100px;">单据号码</li>'
					+ '<li style="width:100px;">订单类型</li>'
					+ '<li style="width:80px;">收银员名称</li>'
					+ '<li style="width:200px;">交易时间</li>'
					+ '<li style="width:80px;">来源</li>'
					+ '<li style="width:100px;">总金额</li>';
			for (var i = 0; i < t.length; i++) {
				titel += '<li style="width:100px;">' + t[i] + '</li>';
			}
			var bill = '';
			var x=y=0;
			//判断是不是最后一页
			if (pageQuery.currentPage != Math.ceil(b.length
					/ pageQuery.pageSize)) {
				x= (pageQuery.currentPage - 1) * pageQuery.pageSize;
				y=pageQuery.currentPage* pageQuery.pageSize;
			}else {
				x=(pageQuery.currentPage - 1) * pageQuery.pageSize;
				y=b.length;
			}
				for (var i = x; i < y; i++) {
					var orderType = '堂食';
					if (b[i].orderType == 1) {
						orderType = '外卖';
					}
					var source = orderSource(b[i].orderSource);
			
					bill += '<ul><li><a href="javascript:dish(\''
							+ b[i].synFlag + '\',' + b[i].orderType
							+ ')" class="orderNumber">' + b[i].orderNo
							+ '</a></li>' + '<li>' + orderType + '</li>'
							+ '<li>' + b[i].operator + '</li>' + '<li>'
							+ b[i].cashTime + '</li>' + '<li>' + source
							+ '</li>' + '<li>' + b[i].orderPrice + '</li>';
					for (var j = 0; j < b[i].priceList.length; j++) {
						bill += '<li>' + b[i].priceList[j] + '</li>';
					}
					bill += '</ul>';
				}
			
			pageQuery.afterQuery();
			$("#cialDetailTb .transverse-thead").empty();
			$("#cialDetailTb .transverse-tbody").empty();
			$("#cialDetailTb .transverse-thead").append(titel);
			$("#cialDetailTb .transverse-tbody").append(bill);
			var cialDetailTb = new TableStyle("cialDetailTb");
			cialDetailTb.fixedThead();
		}
	});

}
 */
/** 点击查询触发事件 end */

/** 点击账单触发事件 start */
function dish(synFlag, orderType) {
//	bkeruyun.showLoading();
	var parm = "synFlag=" + synFlag + "&orderType=" + orderType;
	$
			.ajax({
				type : "POST",
				url : "report/getDishInfos",
				data : parm + "&random=" + Math.random(),
				dataType : "json",
				success : function(data) {
//					bkeruyun.hideLoading();
					var d = data.dishInfos;
					var dish = '';
					if (d.length > 0) {
						for (var i = 0; i < d.length; i++) {
							dish += '<li>' + d[i].dishId + '/' + d[i].dishName
									+ '*' + d[i].dishNumber;
							if (d[i].dishMemo != null && d[i].dishMemo != '') {
								dish += "|" + d[i].dishMemo;
							}
							if (d[i].dishRecipeName != null) {
								dish += '|' + d[i].dishRecipeName + ':￥'
										+ d[i].drChangePrice;
							}
							if (d[i].dishTasteName != null) {
								dish += '|' + d[i].dishTasteName + ':￥'
										+ d[i].dtChangePrice;
							}
							if (d[i].subDishAddition != 0) {
								dish += '|子菜加的价格:￥' + d[i].subDishAddition;
							}
							var x = d[i].dishNumber
									* (d[i].dishPrice + d[i].drChangePrice + d[i].dtChangePrice)
									+ d[i].subDishAddition;
							dish += '|￥' + x.toFixed(2) + '</li>';
						}
						if (data.orderType == 1 && data.sendPrice != 0) {
							dish += '<li>送餐费：￥' + data.sendPrice + '</li><li>总折扣金额：￥'
							+ (data.orderPrice + data.sendPrice - data.cashPrice).toFixed(2) + '</li>';
							
						}else {
							
							dish += '<li>总折扣金额：￥'
								+ (data.orderPrice - data.cashPrice).toFixed(2) + '</li>';
						}
						$(".popover-content .orderList").empty();
						$(".popover-content .orderList").append(dish);
					}

				}
			})
}
/** 点击账单触发事件 end */
