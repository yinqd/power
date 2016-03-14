var sumitCheck = true; //防止重复提交保存，当该值为 true 时可以提交，否则不可提交
$(function(){
//	JPlaceHolder.init(); 
	$(document).ajaxStart(function(){sumitCheck=false ;});
	$(document).ajaxStop(function(){sumitCheck=true ;});
	
	$("#orderConfigSaveBtn").on("click",function(){
		if(!sumitCheck){
			return;
		}
		save();
	});
	
	
	showMenu(".additem",".close-1");//绑定鼠标移除事件
	$(".additem-wrap .icon-plus").on("click",function(){
		var addWrapObj = $(this).parent();
		var html="";
		if(addWrapObj.attr("id") == "invalidReason"){//作废
			html += '<div class="additem"><input type="text" class="form-control w620" value="" name="rejectReasons" maxlength="30" placeholder="最多可以输入30个字">';
			html += '&nbsp;<input type="text" data-type="/[^\\d]/g" maxlength="1" class="form-control w50 text-center" value="" name="orders"/>';
			html += '<input type="hidden" name="type" value="4"/>';
			html += '<input type="hidden" name="id" value=""/>';
			html += '<a href="#" class="close-1 ml10" style="display:none;" onclick="removeElement($(this).parent(),event)">移除此项</a></div>';
			if(addWrapObj.find("input[name='rejectReasons']").length < 5){
				addItem(addWrapObj,html);
			}else{
				promptMessage("最多添加五条记录！");
			}
		}else if(addWrapObj.attr("id") == "freeReason"){//免单
			html += '<div class="additem"><input type="text" class="form-control w620" value="" name="rejectReasons" maxlength="30" placeholder="最多可以输入30个字">';
			html += '&nbsp;<input type="text" data-type="/[^\\d]/g" maxlength="1" class="form-control w50 text-center" value="" name="orders"/>';
			html += '<input type="hidden" name="type" value="7"/>';
			html += '<input type="hidden" name="id" value=""/>';
			html += '<a href="#" class="close-1 ml10" style="display:none;" onclick="removeElement($(this).parent(),event)">移除此项</a></div>';
			if(addWrapObj.find("input[name='rejectReasons']").length < 5){
				addItem(addWrapObj,html);
			}else{
				promptMessage("最多添加五条记录！");
			}
		}else if(addWrapObj.attr("id") == "dishFreeReason"){//单菜品免单
			html += '<div class="additem"><input type="text" class="form-control w620" value="" name="rejectReasons" maxlength="30" placeholder="最多可以输入30个字">';
			html += '&nbsp;<input type="text" data-type="/[^\\d]/g" maxlength="1" class="form-control w50 text-center" value="" name="orders"/>';
			html += '<input type="hidden" name="type" value="6"/>';
			html += '<input type="hidden" name="id" value=""/>';
			html += '<a href="#" class="close-1 ml10" style="display:none;" onclick="removeElement($(this).parent(),event)">移除此项</a></div>';
			if(addWrapObj.find("input[name='rejectReasons']").length < 5){
				addItem(addWrapObj,html);
			}else{
				promptMessage("最多添加五条记录！");
			}
		}else if(addWrapObj.attr("id") == "returnReason"){//退菜
			html += '<div class="additem"><input type="text" class="form-control w620" value="" name="rejectReasons" maxlength="30" placeholder="最多可以输入30个字">';
			html += ' <input type="text" data-type="/[^\\d]/g" maxlength="1" class="form-control w50 text-center" value="" name="orders"/>';
			html += '<input type="hidden" name="type" value="3"/>';
			html += '<input type="hidden" name="id" value=""/>';
			html += '<a href="#" class="close-1 ml10" style="display:none;" onclick="removeElement($(this).parent(),event)">移除此项</a></div>';
			if(addWrapObj.find("input[name='rejectReasons']").length < 5){
				addItem(addWrapObj,html);
			}else{
				promptMessage("最多添加五条记录！");
			}
		}
		showMenu(".additem",".close-1");//绑定鼠标移除事件
		//JPlaceHolder.init(); 
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


/**
 * 保存堂食设置
 * */
function save(){
	var data={};
	var reasons=[];
	$("input[name='rejectReasons']").each(function(i){
		var value = $(this).val();
		if(value.length > 0){
			value = value.trim();
		}
		var placeholder = $(this).attr("placeholder");
		if(value != "" && value != placeholder){
			var idVal = $(this).nextAll("input[name='id']").val();
			var typeVal = $(this).nextAll("input[name='type']").val();
			var ordersVal = $(this).nextAll("input[name='orders']").val();
			if(ordersVal == undefined || ordersVal.length == 0){
				ordersVal ="";
			}
			reasons.push({
				id:idVal,
				rejectReasons: value,
				type: typeVal,
				orders: ordersVal
			});
		}
	});
	data.reasons=reasons;
	$.ajax({
		type: "POST",
		url: ctxPath+ "/commercial/orderConfig/save",
		data: data,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		cache: false,
		success: function(data){
			if(data.success){
				promptMessage("保存成功！");
 				location.reload(true);
			}else{
				Message.alert({title: "提示",describe: data.errorMessage||"操作失败"});
			}
		}
	});
}






