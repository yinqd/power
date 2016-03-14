//今日统计js
var brandId = null, commercialId = null;
var startTime = null, endTime = null;
$(function() {
	updateDate();
	// 单独高亮显示 一级菜单到页面去执行
	mobileReport
			.separateHighlighted('.filter-conditions a', 'click', 'current');
	info();
	getInfo();
});
// 点击确定触发事件
$(document).delegate(".btn-confirm", "touchstart", function() {
	updateDate();
	info();
	getInfo();
});
// 点击上一天触发事件
reportLayer.btnPrev.bind("click", function() {
	prev();
	getInfo();
	updateDate(startTime);
});
// 点击下一天触发事件
reportLayer.btnNext.bind("click", function() {
	next();
	getInfo();
	updateDate(startTime);
});
// 获取所需信息
function info() {
	startTime=endTime=null;
	reportLayer.curDate.text(new Date().Format("yyyy-MM-dd"));
	startTime = endTime = $(".current-date").text();
	$("#commercialId").val($(".filter-conditions  a.current").attr("id"));
	var info = $("#commercialId").val();
	brandId = null, commercialId = null;
	if (info == $(".filter-conditions a:first-child").attr("id")) {
		brandId = info;
	} else {
		commercialId = info;
	}
}
// 获取日统计信息
function getInfo() {
	$.post('report/weixin/info', {
		'startTime' : startTime,
		'endTime' : endTime,
		'brandId' : brandId,
		'commercialId' : commercialId
	},
			function(map) {
				var line0 = "";
				var line1 = "";
				var line2 = "";
				var line3 = "";
				var line4 = "";
				var line5 = "";
				var line6 = "";
				var line7 = "";
				var line8 = "";
				var line9 = "";
				var line10 = "";
				var line11 = "";
				var t_orderAllTurnover = map.current.orderAllTurnover;
				var t_orderAllCount = map.current.orderAllCount;
				var t_takeawayTurnover = map.current.takeawayTurnover;
				var t_takeawayCount = map.current.takeawayCount;
				var total = t_orderAllTurnover + t_takeawayTurnover;
				t_orderAllTurnover = (t_orderAllTurnover).toFixed(2);
				t_takeawayTurnover = (t_takeawayTurnover).toFixed(2);
				total = total.toFixed(2);
				var t_memberCardPayed = (-map.current.memberCardPayed)
						.toFixed(2);
				var t_memberCardValue = (map.current.memberCardValue)
						.toFixed(2);
				var t_bookingCount = map.current.bookingCount;
				var t_queuecount = map.current.queuecount;
				var t_newCustomerCount = map.current.newCustomerCount;
				var t_newMemberCount = map.current.newMemberCount;
				var t_phoneCallCount = map.current.phoneCallCount;
				var y_orderAllTurnover = (map.yesterday.orderAllTurnover)
						.toFixed(2);
				var y_orderAllCount = map.yesterday.orderAllCount;
				var y_takeawayTurnover = (map.yesterday.takeawayTurnover)
						.toFixed(2);
				var y_takeawayCount = map.yesterday.takeawayCount;
				var y_memberCardPayed = (-map.yesterday.memberCardPayed)
						.toFixed(2);
				var y_memberCardValue = (map.yesterday.memberCardValue)
						.toFixed(2);
				var y_bookingCount = map.yesterday.bookingCount;
				var y_queuecount = map.yesterday.queuecount;
				var y_newCustomerCount = map.yesterday.newCustomerCount;
				var y_newMemberCount = map.yesterday.newMemberCount;
				var y_phoneCallCount = map.yesterday.phoneCallCount;
				var c1 = (t_orderAllTurnover - y_orderAllTurnover).toFixed(2);
				var c2 = t_orderAllCount - y_orderAllCount;
				var c3 = (t_takeawayTurnover - y_takeawayTurnover).toFixed(2);
				var c4 = t_takeawayCount - y_takeawayCount;
				var c5 = (t_memberCardPayed - y_memberCardPayed).toFixed(2);
				var c6 = (t_memberCardValue - y_memberCardValue).toFixed(2);
				var c7 = t_bookingCount - y_bookingCount;
				var c8 = t_queuecount - y_queuecount;
				var c9 = t_newCustomerCount - y_newCustomerCount;
				var c10 = t_newMemberCount - y_newMemberCount;
				var c11 = t_phoneCallCount - y_phoneCallCount;
				line0 += '<span>日营业收入</span><em>￥' + total + '</em>';
				$(".total").html(line0);
				// 堂食流水
				line1 += '<li>堂食流水</li>';
				line1 += '<li>￥<span class="number">' + t_orderAllTurnover
						+ '</span></li>';
				if (c1 > 0) {
					line1 += '<li>￥<span class="icon-arrow-up">' + c1
							+ '</span></li>';
				} else if (c1 < 0) {
					line1 += '<li>￥<span class="icon-arrow-down">'
							+ (-c1).toFixed(2) + '</span></li>';
				} else {
					line1 += '<li>￥<span>' + c1 + '</span></li>';
				}
				$("#line1").html(line1);
				// 堂食订单数
				line2 += '<li>堂食订单数</li>';
				line2 += '<li><span class="number">' + t_orderAllCount
						+ '</span></li>';
				if (c2 > 0) {
					line2 += '<li><span class="icon-arrow-up">' + c2
							+ '</span></li>';
				} else if (c2 < 0) {
					line2 += '<li><span class="icon-arrow-down">' + (-c2)
							+ '</span></li>';
				} else {
					line2 += '<li><span>' + c2 + '</span></li>';
				}
				$("#line2").html(line2);
				// 外卖流水
				line3 += '<li>外卖流水</li>';
				line3 += '<li>￥<span class="number">' + t_takeawayTurnover
						+ '</span></li>';
				if (c3 > 0) {
					line3 += '<li>￥<span class="icon-arrow-up">' + c3
							+ '</span></li>';
				} else if (c3 < 0) {
					line3 += '<li>￥<span class="icon-arrow-down">'
							+ (-c3).toFixed(2) + '</span></li>';
				} else {
					line3 += '<li>￥<span>' + c3 + '</span></li>';
				}
				$("#line3").html(line3);
				// 外卖订单数
				line4 += '<li>外卖订单数</li>';
				line4 += '<li><span class="number">' + t_takeawayCount
						+ '</span></li>';
				if (c4 > 0) {
					line4 += '<li><span class="icon-arrow-up">' + c4
							+ '</span></li>';
				} else if (c4 < 0) {
					line4 += '<li><span class="icon-arrow-down">' + (-c4)
							+ '</span></li>';
				} else {
					line4 += '<li><span>' + c4 + '</span></li>';
				}
				$("#line4").html(line4);
				// 会员卡消费
				line5 += '<li>会员卡消费</li>';
				line5 += '<li>￥<span class="number">' + t_memberCardPayed
						+ '</span></li>';
				if (c5 > 0) {
					line5 += '<li>￥<span class="icon-arrow-up">' + c5
							+ '</span></li>';
				} else if (c5 < 0) {
					line5 += '<li>￥<span class="icon-arrow-down">'
							+ (-c5).toFixed(2) + '</span></li>';
				} else {
					line5 += '<li>￥<span>' + c5 + '</span></li>';
				}
				$("#line5").html(line5);
				// 新增储值
				line6 += '<li>新增储值</li>';
				line6 += '<li>￥<span class="number">' + t_memberCardValue
						+ '</span></li>';
				if (c6 > 0) {
					line6 += '<li>￥<span class="icon-arrow-up">' + c6
							+ '</span></li>';
				} else if (c6 < 0) {
					line6 += '<li>￥<span class="icon-arrow-down">'
							+ (-c6).toFixed(2) + '</span></li>';
				} else {
					line6 += '<li>￥<span>' + c6 + '</span></li>';
				}
				$("#line6").html(line6);
				// 预订
				line7 += '<li>预订</li>';
				line7 += '<li><span class="number">' + t_bookingCount
						+ '</span></li>';
				if (c7 > 0) {
					line7 += '<li><span class="icon-arrow-up">' + c7
							+ '</span></li>';
				} else if (c7 < 0) {
					line7 += '<li><span class="icon-arrow-down">' + (-c7)
							+ '</span></li>';
				} else {
					line7 += '<li><span>' + c7 + '</span></li>';
				}
				$("#line7").html(line7);
				// 排队
				line8 += '<li>排队</li>';
				line8 += '<li><span class="number">' + t_queuecount
						+ '</span></li>';
				if (c8 > 0) {
					line8 += '<li><span class="icon-arrow-up">' + c8
							+ '</span></li>';
				} else if (c8 < 0) {
					line8 += '<li><span class="icon-arrow-down">' + (-c8)
							+ '</span></li>';
				} else {
					line8 += '<li><span>' + c8 + '</span></li>';
				}
				$("#line8").html(line8);
				// 新增客户
				line9 += '<li>新增客户</li>';
				line9 += '<li><span class="number">' + t_newCustomerCount
						+ '</span></li>';
				if (c9 > 0) {
					line9 += '<li><span class="icon-arrow-up">' + c9
							+ '</span></li>';
				} else if (c9 < 0) {
					line9 += '<li><span class="icon-arrow-down">' + (-c9)
							+ '</span></li>';
				} else {
					line9 += '<li><span>' + c9 + '</span></li>';
				}
				$("#line9").html(line9);
				// 新增会员
				line10 += '<li>新增会员</li>';
				line10 += '<li><span class="number">' + t_newMemberCount
						+ '</span></li>';
				if (c10 > 0) {
					line10 += '<li><span class="icon-arrow-up">' + c10
							+ '</span></li>';
				} else if (c10 < 0) {
					line10 += '<li><span class="icon-arrow-down">' + (-c10)
							+ '</span></li>';
				} else {
					line10 += '<li><span>' + c10 + '</span></li>';
				}
				$("#line10").html(line10);
				// 电话呼入
				line11 += '<li>电话呼入</li>';
				line11 += '<li><span class="number">' + t_phoneCallCount
						+ '</span></li>';
				if (c11 > 0) {
					line11 += '<li><span class="icon-arrow-up">' + c11
							+ '</span></li>';
				} else if (c11 < 0) {
					line11 += '<li><span class="icon-arrow-down">' + (-c11)
							+ '</span></li>';
				} else {
					line11 += '<li><span>' + c11 + '</span></li>';
				}
				$("#line11").html(line11);
			})

}

// 获取点击上一*后的开始、结束日期
function prev() {
	var ms = 1000 * 60 * 60 * 24;// 一天之中毫秒数
	startTime = endTime = new Date(parseInt(new Date(startTime).getTime() - ms))
			.Format("yyyy-MM-dd");
}
// 获取点击下一*后的开始、结束日期
function next() {
	var ms = 1000 * 60 * 60 * 24;// 一天之中毫秒数
	startTime = endTime = new Date(parseInt(new Date(startTime).getTime() + ms))
			.Format("yyyy-MM-dd");
}
// 更新日期
function updateDate(date) {
	var d = (date) ? new Date(date) : new Date(), year = d.getFullYear(), month = d
			.getMonth() + 1, date = d.getDate(), weekday = mobileReport
			.getWeekday(), str = '';

	str += '<span>' + year + '年' + month + '月</span>';
	str += '<em>' + date + '</em>';
	str += '<span>' + weekday + '</span>';

	$("#date").html(str);
}