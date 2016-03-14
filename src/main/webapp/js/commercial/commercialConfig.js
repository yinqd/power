
//页面初始化
$(function(){

	//tab切换
	$('.store-tabs-box li').on('click',function(){
		$('.store-tabs-box li').removeClass('active');
		$(this).addClass('active');
		var tabIndex=$(this).attr('data-tab');
		$('.store-tab-content>div').removeClass('active');
		$('.store-tab-content>div[data-tab="'+tabIndex+'"]').addClass('active');
	});

	//设置操作
	$(".set-time > em").on("click",function(){
		setingPeriodTime(this,$('#setingTime'));
	});
	//设置操作
	$("#set-time-closing").find(".set-time span").on("click",function(){
		setingPeriodTimeClosing(this,$('#setingTimeClosing'));
		return false;
	});
	//保存设置
	$("#saveTime").click(function(e){
		e.preventDefault();
		savePeriodTime();
	});
	//保存设置
	$("#saveClosingTime").click(function(e){
		e.preventDefault();
		savePeriodClosingTime();
	});
	//移除此项
	$(".set-time > .close-1").on("click",function(e){
		e.preventDefault();
		$(this).parent().find("em").removeAttr("data-time-start data-time-end").text("未设置");
		$(this).parent().removeClass("has-time");
	});
	//外部订单操作
	$(":checkbox[name='switch-checkbox-orders']").on("change",function(){
		var promptTxt = $(this).parents("dd").find(".promptTxt").eq(0);
		if(this.checked){
			promptTxt.text("接受订单");
		}else{
			promptTxt.text("拒绝订单");
		}
		
	});
	
	//外部订单操作
	$(":checkbox[name='switch-checkbox-open']").on("change",function(){
		var promptTxt = $(this).parents("dd").find(".promptTxt").eq(0);
		if(this.checked){
			promptTxt.text("跨天营业");
		}else{
			promptTxt.text("当天营业");
		}
		
	});

	//歇业时间是否接受外卖订单
	$(":checkbox[name='switch-checkbox-takeaway']").on("change",function(){
		var promptTxt = $(this).parents("dd").find(".promptTxt").eq(0);
		if(this.checked){
			promptTxt.text("歇业后接受外卖订单");
		}else{

			promptTxt.text("歇业后不接受外卖订单");
		}
		
	});

	//歇业时间是否重置
	$(":checkbox[name='switch-checkbox-isreset']").on("change",function(){
		var promptTxt = $(this).parents("dd").find(".promptTxt").eq(0);
		if(this.checked){
			promptTxt.text("系统自动在歇业时间点将菜品的状态变更为“在售”，并重置每日售卖总量");
		}else{
			promptTxt.text("开启后，系统会自动在歇业时间点将菜品的状态变更为“在售”，并重置每日售卖总量");
		}

	});

	//外卖自动接单设置
	$(":checkbox[name='switch-checkbox-orders-autoget']").on("change",function(){
		var promptTxt = $(this).parents("dd").find(".promptTxt").eq(0);
		if(this.checked){
			$("#orderAutoGetTime").css("display","block");
			promptTxt.text("系统在自动接单时间段内自动接收订单");
		}else{
			promptTxt.text("系统不会自动接收订单");
			$("#orderAutoGetTime").css("display","none");
		}

	});

	//外卖自动拒绝订单设置
	$(":checkbox[name='switch-checkbox-orders-autoreject']").on("change",function(){
		var promptTxt = $(this).parents("dd").find(".promptTxt").eq(0);
		if(this.checked){
			$("#orders-autoreject-times").css("display","block");
			promptTxt.text("系统在超过订单等待时间后自动拒绝订单");
		}else{
			$("#orders-autoreject-times").css("display","none");
			promptTxt.text("系统不会自动拒绝订单");
		}

	});

	//外卖短信发送设置
	$(":checkbox[name='switch-checkbox-shortMsg']").on("change",function(){
		var promptTxt = $(this).parents("dd").find(".promptTxt").eq(0);
		if(this.checked){
			promptTxt.text("系统在接受或拒绝订单时发送短信通知商户");
		}else{
			promptTxt.text("系统不发送短信通知商户");
		}

	});

	//正餐设置已上餐设置
	$(":checkbox[name='switch-checkbox-orders-onTheTableSetting']").on("change",function(){
		var promptTxt = $(this).parents("dd").find(".promptTxt").eq(0);
		if(this.checked){
			promptTxt.text("打开此功能");
		}else{
			promptTxt.text("关闭此功能");
		}

	});

	//正餐设置自动清台设置
	$(":checkbox[name='switch-checkbox-orders-autoClear']").on("change",function(){
		var promptTxt = $(this).parents("dd").find(".promptTxt").eq(0);
		if(this.checked){
			promptTxt.text("打开此功能");
		}else{
			promptTxt.text("关闭此功能");
		}

	});
	
	//初始化营业时间
	var modelValue = $("#business-model").find("option:selected").attr("data-value");
	$("#business-config .model").hide();
	$("#model-"+modelValue).show();
	
	//营业时间设置
	$("#business-model").on("change",function(){
		var modelValue = $(this).find("option:selected").attr("data-value");
		$("#business-config .model").hide();
		$("#model-"+modelValue).show();
	});
	
	//初始化送餐时间
	var mealValue = $("#sendmeal-model").find("option:selected").attr("data-value");
	$("#sendmeal-config .model").hide();
	$("#meal-"+mealValue).show();
	
	//送餐时间设置
	$("#sendmeal-model").on("change",function(){
		var mealValue = $(this).find("option:selected").attr("data-value");
		$("#sendmeal-config .model").hide();
		$("#meal-"+mealValue).show();
	});

	/*
	* 歇业时间单选按钮
	*/
	$(".td-to-holder>span").off().on("click",function(){
		// 选中的时候按钮(span)的属性(data-order-source)为1，其他对应的其他按钮(span)为空
		$(this).addClass("radio-on").siblings('span').removeClass('radio-on').attr('data-order-source', '1').siblings('span').attr('data-order-source', '');
	});
	/*
	*自动接单时间段
	*/
	timeCheck(".start-time",".end-time");
	timeNoCrossNoRepetition ();
	// 添加自动接单时间段
	$("#order-time-content").children(".order-time-list").last().children("a").removeClass("del-time-quantum").addClass("add-time-quantum");

	//外卖自动接单
	orderAutoGetTime();
});
//外卖自动接单
function orderAutoGetTime(){
	var $container = $('#orderAutoGetTime');
	var templateLi =$('#templateOrderTime').clone(true).html();
	if($container.find('.order-time-list').length<1){
		$container.find('dd.period-item').append($(templateLi));
	}
	//设置删除按钮
	$container.on('click','a.close-1',function(){
		var $item = $(this).closest('.order-time-list');
		$item.remove();
	});
	//设置添加按钮
	$container.on('click','a.btn-add-row',function(){
		var $itemSet = $container.find('.order-time-list');
		if($itemSet.length>=5){
			promptMessage('自动接单时间段最多为5组');
			return;
		}
		$container.find('.btn-add-row').hide();
		$container.find('.close-1').show();
		$container.find('dd.period-item').append(templateLi);
		$(".set-time > em").on("click",function(){
			setingPeriodTime(this,$('#setingTime'));
		});
	});
	$container.on('hover','a.btn-add-row',function(){
		$(this).closest('a.close-1').show();
	},function(){
		$(this).closest('a.close-1').hide();
	});
	//初始化
	$(".set-time > em").on("click",function(){
		setingPeriodTime(this,$('#setingTime'));
	});
}
function changeTimePeriod(obj){
	var j = $("input[name='autoGetOrderStartTime']").length;
	if("add-time-quantum"==$(obj).attr("class")) {
		if(j>=5){
			promptMessage("外卖自动接单时间最多为5组");
			return;
		}
		$("#order-time-content").children(".order-time-list").last().children("a").removeClass("add-time-quantum").addClass("del-time-quantum");
		var templ = "<div class=\"order-time-list\">" +
			"<input type=\"text\" name=\"autoGetOrderStartTime\" class=\"start-time\" placeholder=\"开始时间\" data-date=\"\" data-date-format=\"hh:ii\" onchange=\"checkAutoGetOrderTime(this,1);\">~" +
			"<input type=\"text\" name=\"autoGetOrderEndTime\" class=\"end-time\" placeholder=\"结束时间\" data-date=\"\" data-date-format=\"hh:ii\"  onchange=\"checkAutoGetOrderTime(this,2);\">" +
			"<input type=\"text\" name=\"maxSingle\" class=\"max-single\" placeholder=\"单数上限\" onblur=\"checkMaxSingle(this);\">" +
			"<a href=\"javascript:;\" name=\"delTimeQuantum\" class=\"del-time-quantum\"  onclick=\"changeTimePeriod(this)\"></a></div>";
		$("#order-time-content").append(templ);
	}else{
		if(j==1){
			promptMessage("外卖自动接单时间至少有一组");
			return;
		}
		$(obj).parent().remove();
	}
	$("#order-time-content").children(".order-time-list").last().children("a").removeClass("del-time-quantum").addClass("add-time-quantum");
	timeCheck(".start-time",".end-time");
}

var currTimeObj;
//点击未设置 弹出设置弹框
function setingPeriodTime(element,$obj){
	currTimeObj = element;
	var offset = $(element).offset();
	var left = offset.left - 60;
	var top = offset.top + 20;
	$(".popover").hide();
	$obj.css({"top":top+'px',"left":left+'px'}).show().find(".wrong").hide();
	
	$(document).bind("click",function(e){ 
		var target = $(e.target); 
		//当target不在popover/coupons-set 内是 隐藏
		if(target.closest(".popover").length == 0 && target.closest(".set-time > em").length == 0){
			$(".popover").hide();
			clearData($('#setingTime'));
		} 
	}); 
	
}
//点击未设置 弹出设置弹框
function setingPeriodTimeClosing(element,$obj){
	currTimeObj = element;
	var offset = $(element).offset();
	var left = offset.left - 60;
	var top = offset.top + 20;
	$(".popover").hide();
	$obj.css({"top":top+'px',"left":left+'px'}).show().find(".wrong").hide();
	
	$(document).bind("click",function(e){ 
		var target = $(e.target); 
		//当target不在popover/coupons-set 内是 隐藏
		if(target.closest(".popover").length == 0 && target.closest(".set-time > em").length == 0){
			$(".popover").hide();
			clearData($('#setingTimeClosing'));
		} 
	}); 
	
}
//保存时段设置
function savePeriodTime(){
	var startHours = $("#startHours").val(),
	    startMinutes = $("#startMinutes").val(),
	    endHours = $("#endHours").val(),
	    endMinutes = $("#endMinutes").val(),
	    startTime = startHours + ":" + startMinutes,
	    endTime = endHours + ":" + endMinutes;
	$("#setingTime").hide();
	clearData($('#setingTime'));
	$(currTimeObj).attr({"data-time-start":startTime,"data-time-end":endTime}).text(startTime + " - " + endTime);
	$(currTimeObj).parent().addClass("has-time");
}

//保存时段设置
function savePeriodClosingTime(){
	var startHours = $("#startClosingHours").val();
	startMinutes = $("#startClosingMinutes").val();
	startTime = startHours + ":" + startMinutes;
	$("#setingTimeClosing").hide();
	clearData($('#setingTimeClosing'));
	$(currTimeObj).attr({"data-time-start":startTime}).text(startTime);
	$(currTimeObj).parent().addClass("has-time");
}


/**
 * 保存门店基本信息设置
 */
var baseInfoSubmit = true; //防止重复提交保存，当该值为 true 时可以提交，否则不可提交
function saveBaseSettingData(e){
	if ( e && e.preventDefault ){
		//阻止默认浏览器动作(W3C) 
		e.preventDefault();
	}else{
		//IE中阻止函数器默认动作的方式 
		window.event.returnValue = false; 
	}
	if(baseInfoSubmit!= true){
		return;
	}
	//定义门店设置信息对象，参照CommercialConfigVo
	var commercialConfigVo = {}; //门店设置信息

	//营业时间
	var CommercialOpenTime = new Array();
	var modelValue = $("#business-model").find("option:selected").attr("data-value");
	var startClosingTime = $("#set-time-closing").find("span[name='closingTimeSave']").attr("data-time-start");
	var isNextDay = 1;
	var isAcceptTakeAway=1;
	var isReset=0;
	isNextDay = $(".radio-on").attr("data-value");
	$(":checkbox[name='switch-checkbox-takeaway']:checked").each(function(){
		isAcceptTakeAway = $(this).attr("data-order-source");
	});
	$(":checkbox[name='switch-checkbox-isreset']:checked").each(function(){
		isReset = $(this).attr("data-order-source");
	});
	if(modelValue == 1){//整周（1-7）全天
		var startTime = $("#model-1").find("em[name='peroid_value']").attr("data-time-start");
		var endTime = $("#model-1").find("em[name='peroid_value']").attr("data-time-end");
		var commercialOpenTime = {}; //营业时间对象
		commercialOpenTime.closingTimeSave = startClosingTime;
		commercialOpenTime.isNextDay = isNextDay;
		commercialOpenTime.businessTimeType=0;
		commercialOpenTime.isAcceptTakeAway=isAcceptTakeAway;
		commercialOpenTime.isReset=isReset;
		if(startTime != null && startTime != ""){
			commercialOpenTime.startTime = startTime;
			commercialOpenTime.endTime = endTime;
			commercialOpenTime.week = 7;
			commercialOpenTime.type = 0;
			commercialOpenTime.closingTimeSave = startClosingTime;
			CommercialOpenTime.push(commercialOpenTime);
		}else{
			CommercialOpenTime.push(commercialOpenTime);
		}
	}else if(modelValue == 2){//整周（1-7）分餐
		$("#model-2").find("em[name='peroid_value']").each(function(){
			var startTime = $.trim($(this).attr("data-time-start"));
			var endTime =  $.trim($(this).attr("data-time-end"));
			if(startTime && endTime){
				var commercialOpenTime = {}; //营业时间对象
				commercialOpenTime.closingTimeSave = startClosingTime;
				commercialOpenTime.isNextDay = isNextDay;
				commercialOpenTime.businessTimeType=0;
				commercialOpenTime.isAcceptTakeAway=isAcceptTakeAway;
				commercialOpenTime.isReset=isReset;
				if(startTime != null && startTime != "" ){
					commercialOpenTime.startTime = startTime;
					commercialOpenTime.endTime = endTime;
					commercialOpenTime.week = 7;
					commercialOpenTime.type = 3;
					commercialOpenTime.closingTimeSave = startClosingTime;
					CommercialOpenTime.push(commercialOpenTime);
				}else{
					CommercialOpenTime.push(commercialOpenTime);
				}
			}
		});
	}else if(modelValue == 3){//工作日/周末全天
		$("#model-3").find("em[name='peroid_value']").each(function(i){
			var commercialOpenTime = {}; //营业时间对象
			var startTime = $.trim($(this).attr("data-time-start"));
			var endTime =  $.trim($(this).attr("data-time-end"));
			commercialOpenTime.closingTimeSave = startClosingTime;
			commercialOpenTime.isNextDay = isNextDay;
			commercialOpenTime.businessTimeType=0;
			commercialOpenTime.isAcceptTakeAway=isAcceptTakeAway;
			commercialOpenTime.isReset=isReset;
			if(startTime != null && startTime != "" ){
				if(i == 0){//工作日
					commercialOpenTime.week = 0;
				}else{
					commercialOpenTime.week = 1;
				}
				commercialOpenTime.type = 1;
				commercialOpenTime.startTime = startTime;
				commercialOpenTime.endTime = endTime;
				CommercialOpenTime.push(commercialOpenTime);
			}else{
				CommercialOpenTime.push(commercialOpenTime);
			}
		});
	}else{//工作日/周末分餐
		$("#model-4").find("em[name='peroid_value']").each(function(i){
			var startTime = $.trim($(this).attr("data-time-start"));
			var endTime =  $.trim($(this).attr("data-time-end"));

			if(startTime && endTime){
				var commercialOpenTime = {}; //营业时间对象
				commercialOpenTime.closingTimeSave = startClosingTime;
				commercialOpenTime.isNextDay = isNextDay;
				commercialOpenTime.businessTimeType=0;
				commercialOpenTime.isAcceptTakeAway=isAcceptTakeAway;
				commercialOpenTime.isReset=isReset;
				if(startTime != null && startTime != "" ){
					if(i < 2){//工作日
						commercialOpenTime.week = 0;
					}else{//周末
						commercialOpenTime.week = 1;
					}
					commercialOpenTime.type = 2;
					commercialOpenTime.startTime = startTime;
					commercialOpenTime.endTime = endTime;
					CommercialOpenTime.push(commercialOpenTime);
				}else{
					CommercialOpenTime.push(commercialOpenTime);
				}
			}
		});
	}
	//营业时间信息合法性验证
	var openTimeVal = validateOpenTimeInfo(CommercialOpenTime,modelValue);
	if(!openTimeVal){
		return;
	}
	//送餐时间
	var CommercialmealTime = new Array();
	var mealValue = $("#sendmeal-model").find("option:selected").attr("data-value");
	var startClosingTime = $("#set-time-closing").find("em[name='closingTimeSave']").attr("data-time-start");

	if(mealValue == 1){//整周（1-7）全天
		var startTime = $("#meal-1").find("em[name='peroid_value']").attr("data-time-start");
		var endTime = $("#meal-1").find("em[name='peroid_value']").attr("data-time-end");
		var commercialOpenTime = {}; //营业时间对象
		commercialOpenTime.closingTimeSave = startClosingTime;
		commercialOpenTime.isNextDay = isNextDay;
		commercialOpenTime.businessTimeType=1;
		commercialOpenTime.isAcceptTakeAway=isAcceptTakeAway;
		commercialOpenTime.isReset=isReset;
		if(startTime != null && startTime != ""){
			commercialOpenTime.startTime = startTime;
			commercialOpenTime.endTime = endTime;
			commercialOpenTime.week = 7;
			commercialOpenTime.type = 0;
			commercialOpenTime.closingTimeSave = startClosingTime;
			CommercialmealTime.push(commercialOpenTime);
		}else{
			CommercialmealTime.push(commercialOpenTime);
		}
	}else if(mealValue == 2){//整周（1-7）分餐
		$("#meal-2").find("em[name='peroid_value']").each(function(){
			var startTime = $.trim($(this).attr("data-time-start"));
			var endTime =  $.trim($(this).attr("data-time-end"));
			if(startTime && endTime){
				var commercialOpenTime = {}; //营业时间对象
				commercialOpenTime.closingTimeSave = startClosingTime;
				commercialOpenTime.isNextDay = isNextDay;
				commercialOpenTime.businessTimeType=1;
				commercialOpenTime.isAcceptTakeAway=isAcceptTakeAway;
				commercialOpenTime.isReset=isReset;
				if(startTime != null && startTime != "" ){
					commercialOpenTime.startTime = startTime;
					commercialOpenTime.endTime = endTime;
					commercialOpenTime.week = 7;
					commercialOpenTime.type = 3;
					commercialOpenTime.closingTimeSave = startClosingTime;
					CommercialmealTime.push(commercialOpenTime);
				}else{
					CommercialmealTime.push(commercialOpenTime);
				}
			}
		});
	}else if(mealValue == 3){//工作日/周末全天
		$("#meal-3").find("em[name='peroid_value']").each(function(i){
			var commercialOpenTime = {}; //营业时间对象
			var startTime = $.trim($(this).attr("data-time-start"));
			var endTime =  $.trim($(this).attr("data-time-end"));
			commercialOpenTime.closingTimeSave = startClosingTime;
			commercialOpenTime.isNextDay = isNextDay;
			commercialOpenTime.businessTimeType=1;
			commercialOpenTime.isAcceptTakeAway=isAcceptTakeAway;
			commercialOpenTime.isReset=isReset;
			if(startTime != null && startTime != "" ){
				if(i == 0){//工作日
					commercialOpenTime.week = 0;
				}else{
					commercialOpenTime.week = 1;
				}
				commercialOpenTime.type = 1;
				commercialOpenTime.startTime = startTime;
				commercialOpenTime.endTime = endTime;
				CommercialmealTime.push(commercialOpenTime);
			}else{
				CommercialmealTime.push(commercialOpenTime);
			}
		});
	}else{//工作日/周末分餐
		$("#meal-4").find("em[name='peroid_value']").each(function(i){
			var startTime = $.trim($(this).attr("data-time-start"));
			var endTime =  $.trim($(this).attr("data-time-end"));
			if(startTime && endTime){
				var commercialOpenTime = {}; //营业时间对象
				commercialOpenTime.closingTimeSave = startClosingTime;
				commercialOpenTime.isNextDay = isNextDay;
				commercialOpenTime.businessTimeType=1;
				commercialOpenTime.isAcceptTakeAway=isAcceptTakeAway;
				commercialOpenTime.isReset=isReset;
				if(startTime != null && startTime != "" ){
					if(i < 2){//工作日
						commercialOpenTime.week = 0;
					}else{//周末
						commercialOpenTime.week = 1;
					}
					commercialOpenTime.type = 2;
					commercialOpenTime.startTime = startTime;
					commercialOpenTime.endTime = endTime;
					CommercialmealTime.push(commercialOpenTime);
				}else{
					CommercialmealTime.push(commercialOpenTime);
				}
			}

		});
	}
	//送餐时间信息合法性验证
	var mealTimeVal = validateOpenTimeInfo(CommercialmealTime,mealValue);
	if(!mealTimeVal){
		return;
	}
	CommercialOpenTime=CommercialOpenTime.concat(CommercialmealTime);
	commercialConfigVo.commercialOpenTime = CommercialOpenTime;

	//设置门店时段信息
	var CommercialPeriodTimes = new Array(); //门店所有时段信息
	$("#time-config").find("em[name='peroid_value']").each(function(){
//		alert($(this).attr("data-peroid-type") + "--" + $(this).attr("data-time-start"));
		var periodType = $.trim($(this).attr("data-peroid-type")); //时段类型
		var startTime = $.trim($(this).attr("data-time-start")); //时段起始时间
		var endTime = $.trim($(this).attr("data-time-end")); //时段截至时间
		var commercialPeriodTime = {};  //时段对象
		if(startTime != null && startTime != ""){
			commercialPeriodTime.periodType = periodType;  //设置时段类型
			commercialPeriodTime.startTime = startTime;   //设置时段起始时间
			commercialPeriodTime.endTime = endTime;    //设置时段截至时间
			CommercialPeriodTimes.push(commercialPeriodTime);
		}
	});
	commercialConfigVo.commercialPeriodTimes = CommercialPeriodTimes;

	baseInfoSubmit = false;
	showLoading();
	$.ajax({
			type:"POST",
			url:"commercial/commercialConfig/saveBaseSetting",
			data:$.toJSON(commercialConfigVo)+ "&random=" + Math.random(),
			dataType:"json",
			contentType: "application/json; charset=utf-8",
			async:false,
			cache:false,
			success:function(data){
				baseInfoSubmit = true;
				if(data == 'yes'){
					promptMessage("保存成功！");
					location.reload();
				}else{
					hideLoading();
					promptMessage("保存失败，请检查设置！");
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				baseInfoSubmit = true;
				hideLoading();
				promptMessage("网络异常，请检查网络连接状态！");
		    }
	});
}

/**
 * 第三方订单
 */
var thirdPartSubmit = true; //防止重复提交保存，当该值为 true 时可以提交，否则不可提交
function saveThirdPartData(e){
	if ( e && e.preventDefault ){
		//阻止默认浏览器动作(W3C)
		e.preventDefault();
	}else{
		//IE中阻止函数器默认动作的方式
		window.event.returnValue = false;
	}
	if(!thirdPartSubmit){
		return;
	}
	//定义门店设置信息对象，参照CommercialConfigVo
	var commercialConfigVo = {}; //门店设置信息

	//第三方外部订单来源设置
	var CommercialOrderSettings = new Array();
	$(":checkbox[name='switch-checkbox-orders']:checked").each(function(){
		var commercialOrderSetting = {};
		commercialOrderSetting.orderSource = $(this).attr("data-order-source");
		CommercialOrderSettings.push(commercialOrderSetting);
	});
	commercialConfigVo.commercialOrderSettings = CommercialOrderSettings;
	thirdPartSubmit = false;
	//bkeruyun.showLoading();
	showLoading();
	$.ajax({
		type:"POST",
		url:"commercial/commercialConfig/saveThirdPartSetting",
		data:$.toJSON(commercialConfigVo)+ "&random=" + Math.random(),
		dataType:"json",
		contentType: "application/json; charset=utf-8",
		async:false,
		cache:false,
		success:function(data){
			thirdPartSubmit = true;
			if(data == 'yes'){
				promptMessage("保存成功！");
				location.reload();
			}else{
				//bkeruyun.hideLoading();
				hideLoading();
				promptMessage("保存失败，请检查设置！");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			thirdPartSubmit = true;
			//bkeruyun.hideLoading();
			hideLoading();
			promptMessage("网络异常，请检查网络连接状态！");
		}
	});
}

/**
 * 外卖订单设置保存
 */
var takeAwayOrderSubmit = true; //防止重复提交保存，当该值为 true 时可以提交，否则不可提交
function saveTakeAwayOrderData(e){
	if ( e && e.preventDefault ){
		//阻止默认浏览器动作(W3C)
		e.preventDefault();
	}else{
		//IE中阻止函数器默认动作的方式
		window.event.returnValue = false;
	}

	if(takeAwayOrderSubmit!= true){
		return;
	}
	//定义门店设置信息对象，参照CommercialConfigVo
	var commercialConfigVo = {}; //门店设置信息

	//外卖订单自动接单设置
	var TimePeriodList = new Array();
	var AutoGetOrderSetting = {}; //自动接单对象
	var AutoRefuseOrderSetting = {}; //自动拒单对象
	var ShortMsgSetting = {}; //自动拒单对象
	if("checked"==$("#switch-checkbox-orders-autoget").attr("checked")){
		AutoGetOrderSetting.isEnabled=1;
		var inputFlag = false;
		$("input[name='autoGetOrderName']").each(function(){
			var tradeDealSettingItem = {}; //自动接单时间时间段
			tradeDealSettingItem.id = $.trim($(this).attr("mark"));
			var startTime = $(this).parent().find("em[name='peroid_value']").attr("data-time-start");
			var endTime = $(this).parent().find("em[name='peroid_value']").attr("data-time-end");
			var orderNum =  $.trim($(this).val());
			if (orderNum!="" && (startTime== "" || endTime== "" || startTime== undefined || endTime== undefined)){
				promptMessage("外卖自动接单设置中有时间段没有输入");
				inputFlag = true;
			}
			if (orderNum=="" && startTime!= "" && endTime!= "" && startTime!= undefined && endTime!= undefined){
				promptMessage("外卖自动接单数量没有输入");
				inputFlag = true;
			}
			if (orderNum!="" && startTime!= "" && endTime!= "" && startTime!= undefined && endTime!= undefined){
				tradeDealSettingItem.startTime = startTime;
				tradeDealSettingItem.endTime = endTime;
				tradeDealSettingItem.orderNum = orderNum;
				TimePeriodList.push(tradeDealSettingItem);
			}
		});
		if (inputFlag){
			return;
		}
		if (TimePeriodList.length<=0){
			promptMessage("请设置外卖自动接单时间");
			return;
		}
	} else {
		AutoGetOrderSetting.isEnabled=0;
	}
	AutoGetOrderSetting.id=$("#autoGetOrderSettingId").val();
	AutoGetOrderSetting.operateType=1;
	//外卖订单自动拒单设置
	if("checked"==$("#switch-checkbox-orders-autoreject").attr("checked")){
		AutoRefuseOrderSetting.isEnabled=1;
		AutoRefuseOrderSetting.waitTime=$("#waitTime").val();
		if(!maxSingleInfo(AutoRefuseOrderSetting.waitTime,9999)){
			promptMessage("系统自动拒单等待时间应该大于等于0，小于等于9999分钟");
			return;
		}
	} else {
		AutoRefuseOrderSetting.isEnabled=0;
	}
	//验证外卖接单时间
	if (TimePeriodList.length>5){
		promptMessage("外卖自动接单时间最多为5组");
		return;
	}
	for(var i=0;i<TimePeriodList.length;i++){
		// 验证接单上限的合法性
		if(!maxSingleInfo(TimePeriodList[i].orderNum,1000)){
			promptMessage("接单上限必须为大于等于0,小于等于1000的数字");
			return;
		}
		var st = Date.parse("1990-01-01 "+TimePeriodList[i].startTime);
		var et = Date.parse("1990-01-01 "+TimePeriodList[i].endTime);
		if(et<st){
			promptMessage("自动接单开始时间必须为小于结束时间");
			return;
		}
		for(var j=0;j<i;j++){
			var m = Date.parse("1990-01-01 "+TimePeriodList[j].startTime);
			var n = Date.parse("1990-01-01 "+TimePeriodList[j].endTime);
			if((m>et && n<et) || (n>st && m<st) || (m>st && m<et) || (n>st && n<et)){
				promptMessage("自动接单时间段不能交叉");
				return;
			}
		}
	}
	AutoRefuseOrderSetting.operateType=2;
	AutoRefuseOrderSetting.id=$("#autoRefuseOrderSettingId").val();
	commercialConfigVo.timePeriodList=TimePeriodList;
	//短信发送设置
	if("checked"==$("#switch-checkbox-shortMsg").attr("checked")){
		ShortMsgSetting.isEnabled=1;
	} else {
		ShortMsgSetting.isEnabled=0;
	}
	ShortMsgSetting.operateType=3;
	ShortMsgSetting.id=$("#shortMsgSettingId").val();
	commercialConfigVo.autoGetOrderSetting=AutoGetOrderSetting;
	commercialConfigVo.autoRefuseOrderSetting=AutoRefuseOrderSetting;
	commercialConfigVo.shortMsgSetting=ShortMsgSetting;
	takeAwayOrderSubmit = false;
	showLoading();
	$.ajax({
		type:"POST",
		url:"commercial/commercialConfig/saveTakeAwaySetting",
		data:$.toJSON(commercialConfigVo)+ "&random=" + Math.random(),
		dataType:"json",
		contentType: "application/json; charset=utf-8",
		async:false,
		cache:false,
		success:function(data){
			takeAwayOrderSubmit = true;
			if(data == 'yes'){
				promptMessage("保存成功！");
				location.reload();
			}else{
				//bkeruyun.hideLoading();
				hideLoading();
				promptMessage("保存失败，请检查设置！");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			takeAwayOrderSubmit = true;
			//bkeruyun.hideLoading();
			hideLoading();
			promptMessage("网络异常，请检查网络连接状态！");
		}
	});
}

/**
 * 保存门店设置信息
 */
var dinnerSubmit = true; //防止重复提交保存，当该值为 true 时可以提交，否则不可提交
function saveDinerData(e){
	if ( e && e.preventDefault ){
		//阻止默认浏览器动作(W3C)
		e.preventDefault();
	}else{
		//IE中阻止函数器默认动作的方式
		window.event.returnValue = false;
	}
	if(!dinnerSubmit){
		return;
	}
	//定义门店设置信息对象，参照CommercialConfigVo
	var commercialConfigVo = {}; //门店设置信息
	var onTheTableSetting = {}; //已上餐设置
	var autoClearTableSetting = {}; //自动清台
	//正餐设置的已上餐设置
	if("checked"==$("#switch-checkbox-orders-onTheTableSetting").attr("checked")){
		onTheTableSetting.isEnabled=1;
	} else {
		onTheTableSetting.isEnabled=0;
	}
	onTheTableSetting.operateType=1;
	onTheTableSetting.id=$("#onTheTableSettingId").val();
	commercialConfigVo.onTheTableSetting=onTheTableSetting;
	//正餐设置的自动清台
	if("checked"==$("#switch-checkbox-orders-autoClear").attr("checked")){
		autoClearTableSetting.isEnabled=1;
	} else {
		autoClearTableSetting.isEnabled=0;
	}
	autoClearTableSetting.operateType=2;
	autoClearTableSetting.id=$("#autoClearTableSettingId").val();
	commercialConfigVo.autoClearTableSetting=autoClearTableSetting;
	dinnerSubmit = false;
	showLoading();
	$.ajax({
		type:"POST",
		url:"commercial/commercialConfig/saveDinnerSetting",
		data:$.toJSON(commercialConfigVo)+ "&random=" + Math.random(),
		dataType:"json",
		contentType: "application/json; charset=utf-8",
		async:false,
		cache:false,
		success:function(data){
			dinnerSubmit = true;
			if(data == 'yes'){
				promptMessage("保存成功！");
				location.reload();
			}else{
				hideLoading();
				promptMessage("保存失败，请检查设置！");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			dinnerSubmit = true;
			hideLoading();
			promptMessage("网络异常，请检查网络连接状态！");
		}
	});
}

/**
 * 验证营业时间的信息合法性
 *
 */
function validateOpenTimeInfo(openTime,openTimeViewType){
	if(openTimeViewType == 1){
		if(openTime.length != 1){
			promptMessage("开始时间或结束时间都不能为空！");
			return false;
		}else{
			if(openTime[0].startTime == null || openTime[0].endTime == null  ){
				promptMessage("开始时间或结束时间都不能为空！");
				return false;
			}
		}
	}else if(openTimeViewType == 2){
		if(openTime.length != 2){
			promptMessage("开始时间或结束时间都不能为空！");
			return false;
		}else{
			for(var i =0;i<1;i++){
				if(openTime[i].startTime == null || openTime[i].endTime  == null ){
					promptMessage("开始时间或结束时间都不能为空！");
					return false;
				}
			}
		}
	}else if(openTimeViewType == 3){
		if(openTime.length != 2){
			promptMessage("开始时间或结束时间都不能为空！");
			return false;
		}else{
			for(var i =0;i<1;i++){
				if(openTime[i].startTime == null || openTime[i].endTime  == null ){
					promptMessage("开始时间或结束时间都不能为空！");
					return false;
				}
			}
		}
	}else if(openTimeViewType == 4){
		if(openTime.length != 4){
			promptMessage("开始时间或结束时间都不能为空！");
			return false;
		}else{
			for(var i =0;i<3;i++){
				if(openTime[i].startTime == null || openTime[i].endTime  == null ){
					promptMessage("开始时间或结束时间都不能为空！");
					return false;
				}
			}
		}
	}
	return true;
}

//接单上限失去焦点验证
function checkMaxSingle(obj){
	var aimVal = $(obj).val();
	if(!maxSingleInfo(aimVal,1000)){
		promptMessage("接单上限必须为大于等于0,小于等于1000的数字");
		$(obj).focus();
		return;
	}
}
//外卖自动拒单等待时间失去焦点验证
function checkWaitTime(obj){
	var aimVal = $(obj).val();
	if(!maxSingleInfo(aimVal,9999)){
		promptMessage("接单上限必须为大于等于0,小于等于9999的数字");
		$(obj).focus();
		return;
	}
}

/*
*接单上限验证，
 */
function maxSingleInfo(obj,compareV) {
	var reg = /^\d+$/;
	if(reg.test(obj)  && obj<=compareV){
		return true;
	} else {
		return false;
	}
}
// 时间选择 依赖bootstrap-datetimepicker
function timeCheck(obj1,obj2) {
	$(obj1).add(obj2).datetimepicker({
		startView:0,
		format: "hh:ii",
		autoclose:true,
		viewSelect:"hour"
	});
	var now = new Date().Format("yyyy-MM-dd");
	$(obj1).datetimepicker('setStartDate',now);
	$(obj2).datetimepicker('setEndDate',now);
}
// 时间段不能交叉和重复
function timeNoCrossNoRepetition () {
	 var prevStartTimeVal = $("#order-time-content").children('.order-time-list').last().children('.start-time').eq(0).val();
	 var prevEndTimeVal = $("#order-time-content").children('.order-time-list').last().children('.end-time').eq(0).val();
	 var startEnd = [prevStartTimeVal,prevEndTimeVal];
	 return startEnd;
}

//检查自动接单时间
function checkAutoGetOrderTime(obj,type){
	var stValue="";
	var etValue="";
	if(type==1){
		stValue=$(obj).val();
		etValue=$(obj).next().val();

	}else if (type==2){
		etValue=$(obj).val();
		stValue=$(obj).prev().val();
	}
	if("" != stValue && "" != etValue){
		var st = Date.parse("1990-01-01 "+stValue);
		var et = Date.parse("1990-01-01 "+etValue);
		if(et<st){
			promptMessage("自动接单开始时间必须为小于结束时间");
			$(obj).focus();
			return;
		}
	}
	console.log(stValue,etValue);
}
