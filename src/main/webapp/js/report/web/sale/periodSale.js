/**
 * 时间段销售分析表js
 */
var start = $("#date-start");
var end = $("#date-end");
var today = new Date().Format("yyyy-MM-dd")
var x = new Array();// x周数组
var takePriceY = new Array();// 外卖金额数组
var orderPriceY = new Array();// 堂食金额数组
var totalPriceY = new Array();// 总金额数组
var takeNoY = new Array();// 外卖账单数数组
var orderNoY = new Array();// 堂食账单数数组
var totalNoY = new Array();// 总账单数数组
var priceArr;//[总金额，堂食总金额，外卖总金额]
var countArr;//[总单数，堂食总单数，外卖总单数]
$(function() {
	$("#date-start,#date-end").attr("data-date-endDate", today);
	/**设置开始结束时间间隔最大为1年*/
	start.change(function(){
		var startValue = $.trim(start.val());
		if (startValue < (parseInt(today.substring(0, 4)) - 1)
				+ today.substring(4)) {
			endValue = (parseInt(startValue.substring(0, 4)) + 1)
					+ startValue.substring(4);
		} else {
			endValue = today;
		}
		end.attr("data-date-endDate",endValue);
	});
	end.focus(function(){
		var startValue = $.trim(start.val());
		if (startValue < (parseInt(today.substring(0, 4)) - 1)
				+ today.substring(4)) {
			endValue = (parseInt(startValue.substring(0, 4)) + 1)
					+ startValue.substring(4);
		} else {
			endValue = today;
		}
		end.attr("data-date-endDate",endValue);
	});
	/**设置开始结束时间间隔最大为1年*/
	// 标签切换
	$("#reportTab > li").on("click", function() {
		$(this).addClass("current").siblings().removeClass("current");
		change();
	});

	/** 设置默认时间 start */
	if (start.val() == null || start.val() == "") {
		start.val(today);
		if (end.val() == null || end.val() == "") {
			end.val(today);
		}
	}
	if (end.val() == null || end.val() == "") {
		end.val(today);
	}
	start.attr("data-date-endDate", today);
	/** 设置默认时间 end */
	/** 查询 */
	newquery()
})

/** 查询start */
function newquery() {
	priceArr=[0,0,0],countArr=[0,0,0];
	x.length=0;
	takePriceY.length=0,orderPriceY.length=0,totalPriceY.length=0,takeNoY.length=0,totalNoY.length=0,orderNoY.length=0;
	var commercialId = $("#indicatorsSelect1 option:selected").val();
	if (start.val() == null || start.val() == "") {
		start.val(today);
		end.val(today);
	}else {
		if (end.val() == null || end.val() == "") {
			end.val(start.val());
		}
	}
	var startDate = start.val();
	var endDate = end.val();
	var parm = "startDate=" + startDate + "&endDate=" + endDate;
	if(commercialId!=undefined){
		parm+= "&commercialId=" + commercialId;
	}
	$.ajax({
				type : "POST",
				url : "report/getInfos",
				data : parm + "&random=" + Math.random(),
				dateType : "json",
				contentType : "application/x-www-form-urlencoded;charset=UTF-8",
				cache : false,
				beforeSend : bkeruyun.showLoading,
				success : function(data) {
					bkeruyun.hideLoading();
					var orders = data.order;
					var takeaways = data.takeaway;
					if (orders!=null&&orders!='') {
						var html = "";
						var person=0;
						if ($("#cialDetailTb").is(":hidden")) {
							$("#cialDetailTb").show();
							$("#cialDetailTb").parent().find(
									".notSearchContent").hide();
						}

						for (var i = 0; i < orders.length; i++) {
							var totalPrice = (takeaways[i].totalPrice + orders[i].totalPrice)
									.toFixed(2);
							var totalCount = orders[i].totalCount
									+ takeaways[i].totalCount;
							var totalPerson = orders[i].personCount
									+ takeaways[i].personCount;
							var count_ave = person_ave = (0).toFixed(2);
							if (totalPerson != 0) {
								person_ave = (totalPrice / totalPerson)
										.toFixed(2);
							}
							if (totalCount != 0) {
								count_ave = (totalPrice / totalCount)
										.toFixed(2);
							}
							priceArr[0] += Number(totalPrice);//总金额
							priceArr[1]+=orders[i].totalPrice;//堂食总金额
							priceArr[2]+=takeaways[i].totalPrice;//外卖总金额
							countArr[0] += totalCount;//总单数
							countArr[1]+=orders[i].totalCount;//堂食总单数
							countArr[2]+=takeaways[i].totalCount;//外卖总单数
							person += totalPerson;//总人数 
							x.push((orders[i].period+1)+ ":00");
							takeNoY.push(takeaways[i].totalCount);
							orderNoY.push(orders[i].totalCount);
							totalNoY.push(totalCount);
							takePriceY.push(takeaways[i].totalPrice);
							orderPriceY.push(orders[i].totalPrice);
							totalPriceY.push(totalPrice);
							var period = orders[i].period + ":00~"
									+ (orders[i].period + 1) + ":00";
							html += '<tr><td>' + period + '</td>' + '<td>'
									+ totalPrice + '</td><td>' + totalCount
									+ '</td>' + '<td>' + count_ave
									+ '</td><td>' + totalPerson + '</td>'
									+ '<td>' + person_ave + '</td></tr>';
						}
						html += '<tr><td>合计</td>' + '<td>' + priceArr[0].toFixed(2)
								+ '</td><td>' + countArr[0] + '</td>' + '<td>'
								+ (priceArr[0] / countArr[0]).toFixed(2) + '</td><td>'
								+ person + '</td>' + '<td>'
								+ (priceArr[0] / person).toFixed(2) + '</td></tr>';
						change();
						$("#list tbody").html(html);
					} else {
						var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧！");
						if ($("#cialDetailTb").parent().find(".notSearchContent").length > 0) {
							$("#cialDetailTb").hide();
							$("#cialDetailTb").parent().find(".notSearchContent").show();
						} else {
							$("#cialDetailTb").hide();
							$("#cialDetailTb").parent().append(notData);
						}
					}
				}
			})
}
/** 查询end */
function change() {
	if ($("#reportTab > li.current").index() == 0) {
		var obj=["总金额", "堂食", "外卖"];
		var obj2=[ {
				name : '总金额',
				type : 'line',
				data : totalPriceY
			}, {
				name : '堂食',
				type : 'line',
				data : orderPriceY
			}, {
				name : '外卖',
				type : 'line',
				data : takePriceY
			}];
		var chose='{';
		for(var i=0;i<priceArr.length;i++){
			if (i==priceArr.length-1) {
				if (priceArr[i]==0) {
					chose+='"'+obj[i]+'":'+false+"}";
				}else {
					chose+='"'+obj[i]+'":'+true+"}";
				}
			}else {
				if (priceArr[i]==0) {
					chose+='"'+obj[i]+'":'+false+',';
				}else {
					chose+='"'+obj[i]+'":'+true+',';
				}
			}
		}
		chose=eval("(" + chose + ")");
		echarts(obj, x, obj2,priceArr,chose);
	}
	if ($("#reportTab > li.current").index() ==1) {
		var obj=["总单数", "堂食", "外卖"];
		var obj2=[ {
				name : '总单数',
				type : 'line',
				data : totalNoY
			}, {
				name : '堂食',
				type : 'line',
				data : orderNoY
			}, {
				name : '外卖',
				type : 'line',
				data : takeNoY
			}];
		var chose='{';
		for(var i=0;i<countArr.length;i++){
			if (i==countArr.length-1) {
				if (countArr[i]==0) {
					chose+='"'+obj[i]+'":'+false+"}";
				}else {
					chose+='"'+obj[i]+'":'+true+"}";
				}
			}else {
				if (countArr[i]==0) {
					chose+='"'+obj[i]+'":'+false+',';
				}else {
					chose+='"'+obj[i]+'":'+true+',';
				}
			}
		}
		chose=eval("(" + chose + ")");
		echarts(obj, x, obj2,countArr,chose);
	}
}
/**echarts 图表start*/
function echarts(one, two, three,four,five) {
	require.config({
		paths : {
			echarts : 'js/echarts'
		}
	});
	require([ 'echarts', 'echarts/chart/line' // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
	], function(ec) {
		var myChart = ec.init(document.getElementById('echarts'));
		var option = {
			tooltip : {
				zlevel:1,
				trigger : 'item',
				formatter:function(params){
//					console.log(params.seriesIndex);
					var s='';
					if (four[params.seriesIndex]==0) {
						s+=params.seriesName+'：'+params.value+'<br/>占比：'+0+'%<br/>';
					}else {
						s+=params.seriesName+'：'+params.value+'<br/>占比：'+(params.value/four[params.seriesIndex]*100).toFixed(2)+'%<br/>';
					}
					return  s;
				}
			},
			legend : {
				y : 'bottom',
				selected:five,
				data : one
			},
			calculable : false,
			xAxis : [ {
				boundaryGap : false,
				type : 'category',
				data : two

			} ],
			yAxis : [ {
				type : 'value'
			} ],
			series : three
		}

		myChart.setOption(option);
	})
}
/**echarts 图表end*/
