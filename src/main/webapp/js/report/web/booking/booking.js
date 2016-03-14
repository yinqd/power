var pageQuery = new PageQuery("pageQuery"); // 构建分页查询对象


// 品牌、城市之间切换
$(":radio[name='queryType']").change(
		function() {
			var va = $(":radio[name='queryType']:checked").val();
			if (va == "city") {
				$("#brand").hide();
				$("#city").show();
				$("#city select option:eq(0)").attr("checked", "checked");
				$("#city .select-control").find("em").text(
						$("#city select option:eq(0)").text());
			} else {
				$("#city").hide();
				$("#brand").show();
				$("#brand select option:eq(0)").attr("checked", "checked");
				$("#brand .select-control").find("em").text(
						$("#city select option:eq(0)").text());
			}
		})
// 品牌选择改变
$("#brand-value")
		.change(
				function() {
					var queryType = 'brand';
					var brandId = $("#brand-value option:selected").val();
					$
							.post(
									'report/booking/change',
									{
										'brandId' : brandId,
										'queryType' : queryType
									},
									function(data) {
										var commercialList = data.commercialList;
										$("#commercial").empty();
										$("#commercial").parent().find("ul")
												.empty();
										var html = '<option value="">全部</option>';
										var lis = '<li>全部</li>';
										if (commercialList.length > 0) {
											for (var int = 0; int < commercialList.length; int++) {
												html += '<option value="'
														+ commercialList[int].commercialid
														+ '">'
														+ commercialList[int].commercialname
														+ '</option>';
												lis += '<li>'
														+ commercialList[int].commercialname
														+ '</li>';
											}
										}
										$("#commercial").append(html);
										$("#commercial").parent().find("ul")
												.append(lis);
										$("#commercial").parent().find(
												".select-control em")
												.text("全部");
									});
				})
// 城市改变
$("#city-value")
		.change(
				function() {
					var queryType = 'city';
					var cityId = $("#city-value option:selected").val();
					$
							.post(
									'report/booking/change',
									{
										'cityId' : cityId,
										'queryType' : queryType
									},
									function(data) {
										var commercialList = data.commercialList;
										$("#commercial").empty();
										$("#commercial").parent().find("ul")
												.empty();
										var html = '<option value="">全部</option>';
										var lis = '<li>全部</li>';
										if (commercialList.length > 0) {
											for (var int = 0; int < commercialList.length; int++) {
												html += '<option value="'
														+ commercialList[int].commercialid
														+ '">'
														+ commercialList[int].commercialname
														+ '</option>';
												lis += '<li>'
														+ commercialList[int].commercialname
														+ '</li>';
											}
										}
										$("#commercial").append(html);
										$("#commercial").parent().find("ul")
												.append(lis);
										$("#commercial").parent().find(
												".select-control em")
												.text("全部");
									});
				})
var formParm = "";
$(function() {
	getCount();
	// 来源 交互
	$(".multi-select > .select-control").on("click", function() {
		var showList = $(this).next(".multi-select-con");
		if (showList.is(":hidden")) {
			$(".multi-select-con").hide();
			showList.show();
		} else {
			showList.hide();
		}
	});
	// 来源 条件选择
	$(document).delegate(
			":checkbox[name='orderSources']",
			"change",
			function() {
				associatedCheckAll(this, $('#orderSources-all'));
				filterConditions('orderSources',
						$(this).parents(".multi-select-con").prev(
								".select-control").find("em"), $(this).parents(
								".multi-select-con").next(":hidden"));
			});
	// 来源 条件选择 全选
	$(document).delegate(
			"#orderSources-all",
			"change",
			function() {
				checkAll(this, 'orderSources');
				if (this.checked) {
					$(this).parents(".multi-select-con")
							.prev(".select-control").find("em").text("全部");
				} else {
					filterConditions('orderSources', $(this).parents(
							".multi-select-con").prev(".select-control").find(
							"em"), $(this).parents(".multi-select-con").next(
							":hidden"));
				}

			});

	$('#orderSources-all').parent().click();
	// 点全部撤销 订单来源默认全部
	$("#undo-all").bind("click", function() {
		//隐藏城市列表、显示品牌列表
		$("#city").hide();
		$("#brand").show();
		$("#brand select option:eq(0)").attr("checked", "checked");
		$("#brand .select-control").find("em").text(
				$("#city select option:eq(0)").text());
		if (dataId==2) {
			$(":checkbox[name='orderStatus']").each(function(i) {
				var statusId = $(this).attr("id");
				if (statusId == "tablesType_-2") {
					this.checked = true;
					$(this).parent().addClass("checkbox-check");
				} else {
					this.checked = false;
					$(this).parent().removeClass("checkbox-check");
				}
			});
		}
		$('#orderSources-all').parent().click();
	});

	// 任意点击隐藏下拉层
	$(document).bind(
			"click",
			function(e) {
				var target = $(e.target);
				// 当target不在popover/coupons-set 内是 隐藏
				if (target.closest(".multi-select-con").length == 0
						&& target.closest(".select-control").length == 0) {
					$(".multi-select-con").hide();
				}
			});

	$(document).delegate(
			"#reservation-tab > li",
			"click",
			function(i) {
				// 如果不在点击的不是当前页
				if (!$(this).is(".current")) {
					//转换tab页重置数量
					$("#allTab").empty();
					$("#totayTab").empty();
					$("#untreatedTab").empty();
					$("#allTab").append("(" + totalCount + ")");
					$("#totayTab").append("(" + todayCount + ")");
					$("#untreatedTab").append("(" + UntreatedCount + ")");
					var index = $(this).index();
					$("#undo-all").click();
					if (index == 0) {
						timeSimple1();
						clearOrderStatus();
					} else if (index == 1) {
						// 点击待处理标签 订单状态选中且只能选择未处理
						$(":checkbox[name='orderStatus']").each(function(i) {
							var statusId = $(this).attr("id");
							if (statusId == "tablesType_-2") {
								this.checked = true;
								$(this).parent().addClass("checkbox-check");
							} else {
								this.checked = false;
								$(this).parent().removeClass("checkbox-check");
							}
							this.disabled = true;
							$(this).parent().addClass("checkbox-disable");
						});
//						如果全部框被选中，取消其选中状态
						if ($("#tablesType-all").get(0).checked) {
							$("#tablesType-all").parent().removeClass("checkbox-check");
						}
						//设置全部不可选
						$("#tablesType-all").attr({"disabled" : "disabled"});

						timeSimple2();
					} else {
						timeSimple2();
						clearOrderStatus();

					}
					$(this).addClass("current").siblings().removeClass(
							"current");
					$("#reservation-con > table").hide();
					$("#reservation-con > table").eq(index).show();
					// 默认选择预订就餐时间
					$(":radio[name='isSendTime']").each(function(i) {
						if (i != 0) {
							if ($(this).parent().hasClass("radio-check")) {
								$(this).parent().removeClass("radio-check");
							}

						}
					});
					$(":radio[name='isSendTime']").eq(0).attr("checked",
							"checked").parent().addClass("radio-check");

					// 点击tab页查询数据
					pageQuery.queryPage(1, loadData);
				}

				function clearOrderStatus() {
					$(":checkbox[name='orderStatus']").each(function(i) {
						if (this.checked) {
							this.checked = false;
							$(this).parent().removeClass("checkbox-check");
						}
						if (this.disabled) {
							this.disabled = false;
							$(this).parent().removeClass("checkbox-disable");
						}
					});
					if ($("#tablesType-all").get(0).checked) {
						$("#tablesType-all").removeAttr("checked").parent()
								.removeClass("checkbox-check");
					}
					if ($("#tablesType-all").get(0).disabled) {
						$("#tablesType-all").removeAttr("disabled").parent()
								.removeClass("checkbox-disable");
					}

				}
			});
	if ($("#tabName").val() != null && $("#tabName").val() != "") {
		var tab = $("#tabName").val();
		$("#reservation-tab li").eq(tab * 1 - 1).click();
	}
	// 全部撤销
//	$("#undo-all").on("click", function() {
//		if ($("#reservation-tab > li.current").index() == 1) {
//			// 点击待处理标签 订单状态选中且只能选择未处理
//			$(":checkbox[name='orderStatus']").each(function(i) {
//				var statusId = $(this).attr("id");
//				if (statusId == "tablesType_-2") {
//					this.checked = true;
//					$(this).parent().addClass("checkbox-check");
//				} else {
//					this.checked = false;
//					$(this).parent().removeClass("checkbox-check");
//				}
//				this.disabled = true;
//				$(this).parent().addClass("checkbox-disable");
//			});
//			if (!$("#tablesType-all").get(0).checked) {
//				$("#tablesType-all").attr({
//					"checked" : "checked",
//					"disabled" : "disabled"
//				}).parent().addClass("checkbox-check checkbox-disable");
//			}
//
//		}
//	});
	// 初始化 预订就餐时间 简单
	timeSimple1();

	// 加载列表数据
	if ($("#currentPageName").val() != null
			&& $("#currentPageName").val() != "") {
		pageQuery.queryPage($("#currentPageName").val(), loadData);
	} else {
		pageQuery.queryPage(1, loadData);
	}
	// loadData();
});

var dataId = $("#reservation-tab").find("li.current").attr("data-id");
if (dataId == 1) {
	pageQuery.pageQueryDataId = "today"; // 设置数据表格的id
} else if (dataId == 2) {
	pageQuery.pageQueryDataId = "untreated"; // 设置数据表格的id
} else if (dataId == 3) {
	pageQuery.pageQueryDataId = "all"; // 设置数据表格的id
}

pageQuery.pageQueryToolId = "pageToolDiv"; // 设置分页工具栏的id
pageQuery.showTotalPage = true;
pageQuery.showTotalRows = true;
var timeter;
function queryTimeout() {
	formParm = serializeFormById("queryForm");
	pageQuery.queryPage(1, loadData);

}

function loadData() {
	clearTimeout(timeter);
	dataId = $("#reservation-tab").find("li.current").attr("data-id");
	var startDate = '';
	var endDate = '';
	if (dataId == 1) {// 今日
		// 开始时间不为空
		if ($("#disheStartTimeSimple").val()!=null && trim($("#disheStartTimeSimple").val())!='') {
			// 开始时间
			startDate = new Date().Format("yyyy-MM-dd") + " " + $("#disheStartTimeSimple").val() + ":00";
			// 结束时间
			if ($("#disheEndTimeSimple").val()!=null && trim($("#disheEndTimeSimple").val())!='') {
				endDate = new Date().Format("yyyy-MM-dd") + " " + $("#disheEndTimeSimple").val() + ":59";
			} else {
				// 结束时间为空
				$("#disheEndTimeSimple").val("23:59");
				endDate = new Date().Format("yyyy-MM-dd") + " "+ $("#disheEndTimeSimple").val() + ":59";
			}
		}
	} else {
		if ($("#disheStartTimeSimple").val() != null
				&& $("#disheStartTimeSimple").val() != '') {
			startDate = $("#disheStartTimeSimple").val() + ":00";
		}
		if ($("#disheEndTimeSimple").val() != null
				&& $("#disheEndTimeSimple").val() != '') {
			endDate = $("#disheEndTimeSimple").val() + ":59";
		}
	}
	formParm = serializeFormById("queryForm");
	var params = formParm + "&startDate=" + startDate + "&endDate=" + endDate
			+ "&queryTab=" + dataId + "&currentPage=" + pageQuery.currentPage
			+ "&pageSize=" + pageQuery.pageSize;
	$
			.ajax({
				type : "POST",
				url : "report/booking/queryList",
				data : params + "&random=" + Math.random(),
				dataType : "json",
				cache : false,
//				async : false,
				beforeSend:bkeruyun.showLoading,
				success : function(data) {
					bkeruyun.hideLoading();
					pageQuery.totalRows = data.totalRows;
					pageQuery.lastPage = (pageQuery.lastPage == null ? 1
							: pageQuery.currentPage);
					var totalHtml = "(" + data.totalRows + ")";
					var items = data.items;
					var trHtml = "";
					for (var i = 0; i < items.length; i++) {
						var orderStatus = items[i].orderStatus;
						var status = "";
						var orderSource = "";
						orderSource=SourceEnum.getViewValue(items[i].ordersource);
						var orderTime = $.trim(items[i].ordertime);
						if (dataId == 1) {
							if (orderTime.indexOf(" ") > 0) {
								var dateIndex = orderTime.indexOf(" ");
								orderTime = orderTime.substring(dateIndex + 1,
										dateIndex + 6);
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
						var tableId = null;
						var tableNum = null;
						var status = items[i].isDelete;
						if (status != null) {
							var tempId = "";
							var tableArray = items[i].tableList;
							if (tableArray != null && tableArray != '') {
								for (var j = 0; j < tableArray.length; j++) {
									if (tableArray[j].id != null
											&& tableArray[j].id != '') {
										tempId += tableArray[j].id + ",";
									}
								}
								if ($.trim(tempId) != '') {
									tableId = tempId.substring(0,
											tempId.length - 1);
								} else {
									tableId = null;
								}

							}
						}
						// 未处理
						if (orderStatus == OrderStatusEnum.UNTREATED.backValue) {
							status = OrderStatusEnum.UNTREATED.viewValue;
							// 未到店
						} else if (orderStatus == OrderStatusEnum.UNREACHED.backValue) {
							status = OrderStatusEnum.UNREACHED.viewValue;
							// 已到店
						} else if (orderStatus == OrderStatusEnum.REACHED.backValue) {
							status = OrderStatusEnum.REACHED.viewValue;
							// 已离店
						} else if (orderStatus == OrderStatusEnum.LEAVE.backValue) {
							status = OrderStatusEnum.LEAVE.viewValue;
							// 已拒绝
						} else if (orderStatus == OrderStatusEnum.REJECTED.backValue) {
							status = OrderStatusEnum.REJECTED.viewValue;
							// 已取消
						} else if (orderStatus == OrderStatusEnum.CANCEL.backValue) {
							status = OrderStatusEnum.CANCEL.viewValue;
							// 逾期未到店
						} else if (orderStatus == OrderStatusEnum.OVERDUEUNREACHED.backValue) {
							status = OrderStatusEnum.OVERDUEUNREACHED.viewValue;
						}

						trHtml += "<tr><td>"
								+ orderSource
								+ "</td><td>"
								+ items[i].city
								+ "</td><td>"
								+ items[i].brandName
								+ "</td><td>"
								+ items[i].commercialName
								+ "</td><td>"
								+ orderTime
								+ "</td><td><span>"
								+ items[i].customername
								+ "</span><br /><span>【"
								+ (items[i].customermobile == null ? "-"
										: items[i].customermobile)
								+ "】</span></a>" + "</td><td>" + status
								+ "</td><td>" + "<a href='javascript:view("
								+ items[i].id + ",\"" + tableId + "\","
								+ dataId + "," + pageQuery.currentPage
								+ ")' title='查看' class='icon-view' id='"
								+ items[i].id
								+ (tableId == null ? "" : "_" + tableId)
								+ "'>查看</a></td></tr>";
					}

					if (dataId == 1) {
						$("#totayTab").empty();
						$("#totayTab").append(totalHtml);
						$("#today").empty();
						$("#today").append(trHtml);
					} else if (dataId == 2) {
						$("#untreatedTab").empty();
						$("#untreatedTab").append(totalHtml);
						$("#untreated").empty();
						$("#untreated").append(trHtml);
					} else {
						$("#allTab").empty();
						$("#allTab").append(totalHtml);
						$("#all").empty();
						$("#all").append(trHtml);
					}

					pageQuery.afterQuery();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					bkeruyun.hideLoading();
			        alert("网络异常，请检查网络连接状态！");
			    }

			});
	 timeter = setTimeout("loadData()", 1000 * 10);
}

/**
 * 加载所有总数（今日 待处理 全部）
 */
//总数、今天数量、待处理数量
var totalCount=0,todayCount=0,UntreatedCount=0;
function getCount() {
	var type = $(":radio[name='type']:checked").val();
	$.ajax({
		type : "POST",
		url : "report/booking/queryCount",
		data : "type=" + type + "&random=" + Math.random(),
		dataType : "json",
		cache : false,
		async : false,
		success : function(data) {
			totalCount=data.total;
			todayCount=data.today;
			UntreatedCount=data.untreated;
			$("#allTab").append("(" + totalCount + ")");
			$("#totayTab").append("(" + todayCount + ")");
			$("#untreatedTab").append("(" + UntreatedCount + ")");
		}
	});
}

/**
 * 查看详情
 * 
 * @param orderId
 * @param tableId
 * @param obj
 */
function view(orderId, tableId, obj, obj2) {
	if (!tableId || "null"==tableId) {
		location.href = $("base").attr("href") + "report/booking/view?orderId="
				+ orderId + "&currentPage=" + obj2 + "&queryTab=" + obj;
	} else {
		location.href = $("base").attr("href") + "report/booking/view?orderId="
				+ orderId + "&tableId=" +tableId + "&currentPage=" + obj2
				+ "&queryTab=" + obj;
	}
}

/**
 * 条件选择
 * 
 * @param checkboxName
 *            string checkbox name
 * @param $textObj
 *            jquery object 要改变字符串的元素
 * @param $hiddenObj
 *            jquery object 要改变的隐藏域
 */
function filterConditions(checkboxName, $textObj, $hiddenObj) {
	var checkboxs = $(":checkbox[name='" + checkboxName + "']");
	var checkboxsChecked = $(":checkbox[name='" + checkboxName + "']:checked");
	var len = checkboxs.length;
	var lenChecked = checkboxsChecked.length;
	var str = '';
	var value1 = '';

	if (lenChecked == len) {
		$textObj.text("全部");
	} else {
		for (var i = 0; i < lenChecked; i++) {
			if (i == 0) {
				str += checkboxsChecked.eq(i).attr("data-text");
				value1 += checkboxsChecked.eq(i).attr("value");
			} else {
				str += ',' + checkboxsChecked.eq(i).attr("data-text");
				value1 += "-" + checkboxsChecked.eq(i).attr("value");
			}
		}
		$textObj.text(str);
		$hiddenObj.val(value1);
	}
}

// 预订就餐时间 简单 从时间开始
function timeSimple1() {
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var date = d.getDate();
	var today = returnDate(year, month, date);
	$('#disheStartTimeSimple').datetimepicker("remove");
	$('#disheStartTimeSimple').datetimepicker({
		format : "hh:ii",
		language : 'zh-CN',
		weekStart : 0,
		todayBtn : true,
		// keyboardNavigation: false,
		autoclose : true,
		todayHighlight : true,
		startView : 1,
		// minView: 0,
		maxView : 2,
		startDate : today + ' 00:00',
		endDate : today + ' 23:59',
		forceParse : true
	}).on("changeDate", function(ev) {
		var value = $(this).val();
		var startDate = returnDate(year, month, date + " " + value);
		// 清除上一次操作;
		$('#disheEndTimeSimple').datetimepicker("remove");
		$('#disheEndTimeSimple').val("");

		// 重新初始化结束时间 开始日期之前不可选
		$('#disheEndTimeSimple').datetimepicker({
			format : "hh:ii",
			language : 'zh-CN',
			weekStart : 0,
			todayBtn : "linked",
			keyboardNavigation : false,
			autoclose : true,
			todayHighlight : true,
			startView : 1,
			// minView: 0,
			maxView : 2,
			// startDate: value,
			endDate : today + ' 23:59',
			forceParse : true
		});
		$('#disheEndTimeSimple').datetimepicker('setStartDate', startDate);
	});
	;
	// $('#disheTimeStart').datetimepicker('setStartDate', new Date());
}
// 预订就餐时间 简单 从日期开始
function timeSimple2() {
	$('#disheStartTimeSimple').datetimepicker("remove");
	$('#disheStartTimeSimple').datetimepicker({
		format : "yyyy-mm-dd hh:ii",
		language : 'zh-CN',
		weekStart : 0,
		todayBtn : 1,
		autoclose : true,
		todayHighlight : true,
		startView : 2,
		// minView: 0,
		maxView : 2,
		// setStartDate:"2014-10-1",
		forceParse : true
	}).on("changeDate", function(ev) {
		var value = $(this).val();
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		var date = d.getDate();
		var startDate = returnDate(year, month, date + " " + value);
		// 清除上一次操作;
		$('#disheEndTimeSimple').datetimepicker("remove");
		$('#disheEndTimeSimple').val("");

		// 重新初始化结束时间 开始日期之前不可选
		$('#disheEndTimeSimple').datetimepicker({
			format : "yyyy-mm-dd hh:ii",
			language : 'zh-CN',
			weekStart : 0,
			todayBtn : 1,
			autoclose : true,
			todayHighlight : true,
			startView : 2,
			// minView: 0,
			maxView : 2,
			// startDate: value,
			forceParse : true
		});
		$('#disheEndTimeSimple').datetimepicker('setStartDate', value);
	});
	// $('#disheTimeStart').datetimepicker('setStartDate', new Date());
}

function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}