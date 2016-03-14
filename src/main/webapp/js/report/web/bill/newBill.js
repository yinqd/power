/**
 * 账单明细表js
 */

var startObj = $("#date-start");
var today = new Date().Format("yyyy-MM-dd");
var orderDetailPopover = new OrderDetail("orderDetailPopover","cialDetailTb");
var cialDetailTb = new TableStyle("cialDetailTb");
cialDetailTb.base();
cialDetailTb.fixedThead();
$(function() {
	$("#cialDetailTb").hide();
	bkeruyun.showLoading();
	// 设置时间控件默认时间
	setDefaultDate();
	startObj.attr("data-date-endDate", today);
	// 全部撤销设置默认时间
	$("#undo-all").click(function() {
		setDefaultDate();
	})
	orderDetailPopover.hide();
	$(document).delegate("#cialDetailTb .orderNumber", "click", function(e) {
		$(".popover-content .orderList").empty();
		var target = $(e.target);
		orderDetailPopover.position(target);
	});
	query();
	//更多查询
    $("#searchMore").on("click",function(){
        bkeruyun.searchMore(this,$("#salesCol,#orderCol,#sourceCol"),"更多条件","隐藏更多");
    });
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
				url : "report/newbill/getBills",
				data : parm + "&random=" + Math.random(),
				dataType : "json",
				beforeSend : bkeruyun.showLoading,
				success : function(data) {
					bkeruyun.hideLoading();
					if (data!=null) {
						if ($("#cialDetailTb").is(":hidden")) {
							$("#cialDetailTb").show();
							$("#cialDetailTb").parent().find(".notSearchContent").hide();
						}
						var everyTotal=new Array();
						var bills = data.orders;
						var cashMethods=data.cashMethods;
						var titel = '<li style="width:80px;">销售类型</li>'
								+'<li style="width:150px;">单据号码</li>'
								+'<li style="width:150px;">原单据号</li>'
								+ '<li style="width:100px;">订单类型</li>'
								+ '<li style="width:80px;">收银员名称</li>'
								+ '<li style="width:200px;">交易时间</li>'
								+ '<li style="width:100px;">来源</li>'
								+ '<li style="width:100px;">总金额</li>';
						if (cashMethods) {
							for (var i = 0; i <cashMethods.length ; i++) {
								titel += '<li style="width:100px;">' + cashMethods[i] + '</li>';
								everyTotal[i]=0;
							}
						}
						titel+='<li style="width:100px;">溢收</li><li style="width:100px;">抹零</li>';
						var bill = '';
						var maling=0;
						var overflow=0;
						var total=0;
							for (var i = 0; i < bills.length; i++) {
								var orderType = deliverytype(bills[i].delivery_type);//交付方式
								var saleType=tradetype(bills[i].trade_type);//交易类型
								var source = orderSource(bills[i].source);//订单来源
								overflow+=bills[i].actual_amount+bills[i].exempt_amount-bills[i].receivable_amount;
								maling+=bills[i].exempt_amount;
								total+=bills[i].actual_amount;
								bill += '<ul><li style="width:80px;">'+saleType+'</li>'
									  	+'<li style="width:150px;"><a href="javascript:dish(\''
										+ bills[i].id + '\')" class="orderNumber">' + bills[i].trade_no
										+ '</a></li><li style="width:150px;">'+bills[i].oldNo+'</li>'
										+ '<li style="width:100px;">' + orderType + '</li>'
										+ '<li style="width:80px;">' + bills[i].name + '</li>' + '<li style="width:200px;">'
										+ bills[i].payment_time + '</li>' + '<li style="width:100px;">' + source
										+ '</li>' + '<li style="width:100px;">' + bills[i].actual_amount.toFixed(2) + '</li>';
								for (var j = 0; j < cashMethods.length; j++) {
									var method=cashMethods[j];
									bill += '<li style="width:100px;">' + bills[i][method].toFixed(2)+ '</li>';
									everyTotal[j]+=bills[i][method];
								}
								bill += '<li style="width:100px;">'+(bills[i].actual_amount+bills[i].exempt_amount-bills[i].receivable_amount).toFixed(2)+'</li><li style="width:100px;">'+bills[i].exempt_amount.toFixed(2)+'</li></ul>';
							}
							bill+='<ul><li style="width:80px;"></li><li style="width:150px;"></li><li style="width:150px;"></li><li style="width:100px;"></li><li style="width:80px;"></li><li style="width:200px;"></li><li style="width:100px;">合计</li><li style="width:100px;">'+total.toFixed(2)+'</li>';
							for(var i=0;i<everyTotal.length;i++){
								bill+='<li style="width:100px;">'+ everyTotal[i].toFixed(2) + '</li>'
							}
							bill+='<li style="width:100px;">'+overflow.toFixed(2)+'</li><li style="width:100px;">'+maling.toFixed(2)+'</li></ul>';
//						pageQuery.afterQuery();
						$("#cialDetailTb .transverse-thead").empty();
						$("#cialDetailTb .transverse-tbody").empty();
						$("#cialDetailTb .transverse-thead").append(titel);
						$("#cialDetailTb .transverse-tbody").append(bill);
						cialDetailTb.base();
						$("#cialDetailTb").scrollTop(0).scrollLeft(0);
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

/** 点击账单触发事件 start */
function dish(id) {
	bkeruyun.showLoading();
	var parm = "id=" + id ;
	$
			.ajax({
				type : "POST",
				url : "report/newbill/getDishs",
				data : parm + "&random=" + Math.random(),
				dataType : "json",
				success : function(data) {
					bkeruyun.hideLoading();
					var dish = '';
					if (data) {
						var d = data.dishs;
						if (d.length > 0) {
							var dishprivilegeAmount=0;//菜品总优惠金额
							for (var i = 0; i < d.length; i++) {
								dishprivilegeAmount+=d[i].privilegeAmount;
								dish += '<li>' + d[i].dishId + '/' + d[i].dishName;
//								if (d[i].unit!=null&&d[i].unit!='') {
//									dish+="("+d[i].unit+")";
//								}
								dish+='*' + d[i].dishNo;
								if (d[i].memo != null && d[i].memo != '') {
									dish += "|" + d[i].memo;
								}
								if (d[i].taste.length>0) {
									for(var j=0;j<d[i].taste.length;j++){
										if (j==0) {
											dish += '|' + d[i].taste[j];
										}else {
											dish += ',' + d[i].taste[j];
										}
										
									}
								}
								if (d[i].recipe.length>0) {
									for(var j=0;j<d[i].recipe.length;j++){
										if (j==0) {
											dish += '|' + d[i].recipe[j];
										}else {
											dish += ',' + d[i].recipe[j];
										}
										
									}
								}
								dish += '|￥' + d[i].amount.toFixed(2) + '</li>';
							}
							if (data.sendPrice != 0) {
								dish += '<li>送餐费：￥' + data.sendPrice.toFixed(2) + '</li>'
							}
							dish += '<li>总折扣金额：￥'+ data.total.toFixed(2) + '</li>';
						}else {
							dish+='<li>无查询账单菜品信息！！</li>'
						}
					}else {
						dish+='<li>无查询账单菜品信息！！</li>'
					}
					$(".popover-content .orderList").empty();
					$(".popover-content .orderList").append(dish);

				}
			})
}
/** 点击账单触发事件 end */
