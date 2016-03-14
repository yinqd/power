/**
 * @author zhaoc
 */
var startObj = $("#date-start"), endObj = $('#date-end');
$(function() {
	// 设置时间控件默认时间
	startObj.change(function(){
		var startValue = $(this).val(),
			endValue = (parseInt(startValue.substring(0,4))+1) + startValue.substring(4);
		endObj.attr("data-date-endDate",endValue);
	});
	endObj.focus(function(){
		var startValue = startObj.val(),
	    	endValue = (parseInt(startValue.substring(0,4))+1) + startValue.substring(4);
		endObj.attr("data-date-endDate",endValue);
	});
	ready();
})

// 点击查询调用事件
function newquery() {
	ready();
	
}
// 定义ready函数
function ready() {
	var reasonType = $(".reasonType").val();
	if (reasonType == null) {
		reasonType = -3;
	}
	if ($("#date-start").val() == null || $("#date-start").val() == '') {
		$("#date-start").val(new Date().Format("yyyy-MM-dd"));
	}
	if ($("#date-end").val() == null || $("#date-end").val() == '') {
		$("#date-end").val($("#date-start").val());
	}

	var startDate = $("#date-start").val();
	var endDate = $("#date-end").val();
	var commercialId = $("#commercialId option:selected").val();
	bkeruyun.showLoading();
	$.post('report/bookingReport/getReason', {
		'reasonType' : reasonType,
		'startDate' : startDate,
		'endDate' : endDate,
		'commercialId' : commercialId
	}, function(bookingReasonVos) {
		bkeruyun.hideLoading();
		var objx = new Array();
		var objy = new Array();
		if (bookingReasonVos.length > 0) {
			if ($("#main").is(":hidden")) {
				$("#main").show();
				$("#main").parent().find(".notSearchContent").hide();
			}
			for (var i = bookingReasonVos.length; i > 0; i--) {
				var yy = bookingReasonVos[i - 1].name;
				if (yy.length > 15) {
					yy = yy.substr(0, 15) + '\n'
							+ yy.substr(15, (yy.length - 15));
					objy.push(yy);
					bookingReasonVos[i-1].name=yy;
					objx.push(bookingReasonVos[i - 1]);
				} else {
					objy.push(yy);
					objx.push(bookingReasonVos[i - 1]);
				}
			}
			var text = null;
			// 判断是哪个页面调用，根据页面不同返回不同的值
			if (reasonType == '-3') {
				text = '拒绝理由';
			} else if (reasonType == '9') {
				text = '取消理由';
			}
			var myChart = echarts.init(document.getElementById('main'));
			option = {
				    title : {
				    	text : '预订' + text+'占比分析' ,
				        x:'left'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				    	orient:'horizontal',
    	            	y:'bottom',
    	            	x:'center',
				        data:objy
				    },
				    series : [
				        {
				            type:'pie',
				            radius : '55%',
				            center: ['50%', '45%'],
				            data:objx
				        }
				    ]
				};

			// 为echarts对象加载数据
			myChart.setOption(option);
		} else {
			// $("#echarts_pie").html("没有查到数据，试试其他查询条件吧！");
			var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧！");
			if ($("#main").parent().find(".notSearchContent").length > 0) {
				$("#main").hide();
				$("#main").parent().find(".notSearchContent").show();
			} else {
				$("#main").hide();
				$("#main").parent().append(notData);
			}
		}

	})

}
//// 封装时间格式化方法
//Date.prototype.Format = function(fmt) { // author: meizz
//	var o = {
//		"M+" : this.getMonth() + 1, // 月份
//		"d+" : this.getDate(), // 日
//		"h+" : this.getHours(), // 小时
//		"m+" : this.getMinutes(), // 分
//		"s+" : this.getSeconds(), // 秒
//		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
//		"S" : this.getMilliseconds()
//	// 毫秒
//	};
//	if (/(y+)/.test(fmt))
//		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
//				.substr(4 - RegExp.$1.length));
//	for ( var k in o)
//		if (new RegExp("(" + k + ")").test(fmt))
//			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
//					: (("00" + o[k]).substr(("" + o[k]).length)));
//	return fmt;
//}
