var candoFlag=true;
$(function(){
	$(document).ajaxStart(function(){candoFlag=false ;});
	$(document).ajaxStop(function(){candoFlag=true ;});
	$("input[name='id'][source]").each(function(){
		$(":checkbox[name='source'][value='"+$(this).attr("source")+"']").click();
	});
	
	$("#scheduledTime").on("change",function(){
		if(this.checked){
			$("#scheduledTimeSet").show();
		}else{
			$("#scheduledTimeSet").hide();
		}
	});
	$("#preOrder").on("change",function(){
		var preOrderTag= $("#preOrder").parents(".panel-item").find("p");
		if(this.checked){
			preOrderTag.text("您已\"打开\"预点菜功能");
		}else{
			preOrderTag.text("您已\"关闭\"预点菜功能");
		}
	});
	$("#dinnerTime").on("change",function(){
		if(this.checked){
			$("#dinnerTimeSet").show();
		}else{
			$("#dinnerTimeSet").hide();
		}
	});
	showMenu(".additem",".close-1");//绑定鼠标移除事件
	$(".additem-wrap .icon-plus").on("click",function(){
		var addWrapObj = $(this).parent();
		
		var html="";
		if(addWrapObj.attr("id") == "cancelReason"){
			html += '<div class="additem"><input type="text" class="form-control w620" value="" name="rejectReasons" maxlength="30" placeholder="最多可以输入30个字">';
			html += '<input type="hidden" name="type" value="2"/>';
			html += '<input type="hidden" name="id" value=""/>';
			html += '<a href="#" class="close-1 ml10" style="display:none;" onclick="removeElement($(this).parent(),event)">移除此项</a></div>';
			if(addWrapObj.find("input[name='rejectReasons']").length < 10){
				addItem(addWrapObj,html);
			}
		}else if(addWrapObj.attr("id") == "refuseReason"){
			html += '<div class="additem"><input type="text" class="form-control w620" value="" name="rejectReasons" maxlength="30" placeholder="最多可以输入30个字">';
			html += '<input type="hidden" name="type" value="1"/>';
			html += '<input type="hidden" name="id" value=""/>';
			html += '<a href="#" class="close-1 ml10" style="display:none;" onclick="removeElement($(this).parent(),event)">移除此项</a></div>';
			if(addWrapObj.find("input[name='rejectReasons']").length < 10){
				addItem(addWrapObj,html);
			}
		}
		showMenu(".additem",".close-1");//绑定鼠标移除事件
	});
	tabSwitchWrap("#switchBooking .switching-tab");
});
/**
 * 条件选择
 * @param $wrapObj          jquery object           被添加的元素
 * @param data              string                  要添加的数据
 */
function addItem($wrapObj,data){
	$wrapObj.append(data);
}

function save(){
	if(candoFlag==false){ return; }
	if(checkBeforeSave()){return;}
	var data={};
	var tableIds=[];
	$(":checked[name='tableId']").each(function(i,e){
		tableIds[tableIds.length]=this.value;
	});
	data.tableIds=tableIds;
	
	var reasons=[];
	$("input[name='rejectReasons']").each(function(i,e){
		var value=this.value;
		if(value != "" && value != $(this).attr("placeholder")){
			reasons.push({
				id:$(this).nextAll("input[name='id']").val(),
				rejectReasons: value,
				type: $(this).nextAll("input[name='type']").val()
			});
		}
	});
	data.reasons=reasons;

	var isLimitBookingNumber=$(":checked[name='switch-checkbox-scheduledTime']").size()>0;
	var isLimitServiceTime=$(':checked[name="switch-checkbox-dinnerTime"]').size()>0;
	var isOrderMenu=$(':checked[name="switch-checkbox-preOrder"]').size()>0;
	data.bookingSetting={
			id: $("input[name='bookingSettingId']").val(),
			limitBookingNumber: isLimitBookingNumber ? $("input[name='limitBookingNumber']").val() : null ,
		    limitBookingUnit: isLimitBookingNumber ? $("select[name='limitBookingUnit']").val() : null ,
		    keepTime: $("#keepTimeHours").val()+":"+$("#keepTimeMinuts").val(),
		    limitServiceTime: isLimitServiceTime ?  $("#dinnerTimeSetHours").val()+":"+$("#dinnerTimeSetminutes").val() : null,
		    commercialId: $("input[name=commercialId]").val(),
		    orderMenuEnum: (isOrderMenu?0:1)
	};
	
	data.orderSource=[];
	$(":checked[name='source']").each(function(){
		var id=$("input[name='id'][source='"+this.value+"']").val();
		data.orderSource.push({
			id: id==null? null : id,
			source: this.value
		});
	});
	
	$.ajax({
		type: "POST",
		url: ctxPath+ "/commercial/bookingConfig/save",
		data: data,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		cache: false,
		success: function(data){
			if(data.success){
 				location.reload(true);
			}else{
				Message.alert({title: "提示",describe: data.errorMessage||"操作失败"});
			}
		}
	});
}

function checkBeforeSave(){
	var flag = false;
	var scheduledTime = $("#scheduledTime");
	var dinnerTime = $("#dinnerTime");
	//可预订天数 开关打开 验证 输入不能为空或0
	if(scheduledTime.get(0).checked){
		var scheduledTimeLab = scheduledTime.parents(".panel-item").find("dt > label");
		var scheduledTimeInput = $("#scheduledTimeInput");
		var wrong = $("#scheduledTimeSet").next(".wrong");
		if(scheduledTimeInput.val() == "" || scheduledTimeInput.val() == 0){
			wrong.show();
			emptyPrompt(true,scheduledTimeLab,"wrong");
			flag = true;
		}else{
			wrong.hide();
			emptyPrompt(false,scheduledTimeLab,"wrong");
		}
	}
	
	//平均就餐时长 开关打开 验证 不能是0小时0分
	if(dinnerTime.get(0).checked){
		var dinnerTimeLab = dinnerTime.parents(".panel-item").find("dt > label");
		var hours = $("#dinnerTimeSetHours").val();
		var minutes = $("#dinnerTimeSetminutes").val();
		var wrong = $("#dinnerTimeSet").next(".wrong");
		if(hours == "00" && minutes == "00"){
			wrong.show();
			emptyPrompt(true,dinnerTimeLab,"wrong");
			flag = true;
		}else{
			wrong.hide();
			emptyPrompt(false,dinnerTimeLab,"wrong");
		}
	}
	return flag;
}