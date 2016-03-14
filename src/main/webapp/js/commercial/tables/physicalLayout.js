$(function(){
	//列表创建布局图
	$("#btn-create-new").on("click",function(){
		$("#createLayout").show();
		$("#validTip").hide();
		showLayer();
	});
	//重新上传底图
	$("#btnUploadAgain").on("click",function(e){
		e.preventDefault();
		$("#uploadReproduction").show();
		$("#tips").hide();
		showLayer();
		//alert("#fileUpLoad").val();
	});
	upLoadLayout();
	
	$("#typeSelect").change(function(){
		var layoutType = $("#typeSelect").find("option:selected").val();
		if (layoutType == 1) {
			$("#areaDiv").show();
			$("#floorDiv").hide();
			if($("#areaDiv label").is(".wrong")){
				$("#areaDiv label").removeClass("wrong");
			}
		} else if (layoutType == 2) {
			$("#areaDiv").hide();
			$("#floorDiv").show();
			if($("#floorDiv label").is(".wrong")){
				$("#floorDiv label").removeClass("wrong");
			}
		}
	});
		
		$("#setting").click(function(){
			var canClick = $("#setting").hasClass("btn-disabled");
			if (!canClick) {
				var divObj = $(".form-input-group:visible").eq(1);
				var selectedObj = $(divObj).find("option:selected");
				var optionValue = $(selectedObj).val();
				var optionText = $(selectedObj).html();
				var fileName = $("#trigger-fileUpLoad").val();
				var flag = checkFormData(optionValue,fileName);
				if(!flag){return;}
//				if(checkFormData(optionValue,fileName)){
					var layoutType = $("#typeSelect").find("option:selected").val();
					var layoutName = optionText.replace("-", "") + "物理布局图";
					var data;
					if (layoutType == 1) {
						data = { layoutType: layoutType,
								 areaId: optionValue, 
								 layoutName: encodeURIComponent(layoutName)
							   };
					} else {
						data = { layoutType: layoutType,
								 floor: optionValue,
								 layoutName: encodeURIComponent(layoutName)
							   };
					}
					disableButton();
					$.ajaxFileUpload({
				        type:"POST",
				        url:"commercial/physicallayout/saveOrUpdatePhysicalLayout",  
				        secureuri:false,                           //是否启用安全提交,默认为false   
				        fileElementId:"fileUpLoad",               //文件选择框的id属性  
				        data:data,
						async:false,
						cache:false,
				        dataType:'json',                           //服务器返回的格式,可以是json或xml等  
				        success:function(data, status){            //服务器响应成功时的处理函数
				        	var layoutId = data.id;
				        	var physicalLayoutType = data.layoutType;
				        	location.href = $("base").attr("href") + "commercial/physicallayout/editPhysicalLayout?layoutId=" + layoutId + "&layoutType=" + physicalLayoutType;
				        },  
				        error:function(data, status, e){ //服务器响应失败时的处理函数  
				            alert("文件上传失败，请重新尝试！");
				            enableButton();
				            return;
				        } 
				    });
				}
				//点击完了再设置
//				disableButton();
//				$("#setting").addClass("btn-disabled");
				$("#btn-create-new,#cancelDiv").removeClass("btn-disabled");
//			}
			
		});
	
	$(".icon-delete").click(function(){
		var layoutId = $(this).attr("id");
		disableButton();
    	Message.confirm({title:"提示",describe:"确认删除该布局图?"}, function() {
    		$.ajax({
    			type:"POST",
        		url:"commercial/physicallayout/removePhysicalLayout",
        		data:"layoutId=" + layoutId + "&random=" + Math.random(),
        		dataType:"json",
        		async:false,
    			cache:false,
    			success:function(data){
    				promptMessage("删除成功", null);
    				// 跳转到桌台列表页面
    				location.href = $("base").attr("href") + "commercial/physicallayout/physicalLayoutList";
    				enableButton();
    			},
    			error:function(XMLHttpRequest, textStatus, errorThrown) {
    				enableButton();
    			}
    			
    		});
		});
    	
    	enableButton();
		
	});
	
	$(".icon-view").click(function(){
		var obj = this;
		var dataObj = getLayoutIdAndType(obj);
		var layoutId = dataObj.shift();
		var layoutType = dataObj.pop();
		location.href = $("base").attr("href") + "commercial/physicallayout/viewPhysicalLayout?layoutId=" + layoutId + "&layoutType=" + layoutType;
	});
	
	$(".icon-editor").click(function(){
		var obj = this;
		var dataObj = getLayoutIdAndType(obj);
		var layoutId = dataObj.shift();
		var layoutType = dataObj.pop();
		location.href = $("base").attr("href") + "commercial/physicallayout/editPhysicalLayout?layoutId=" + layoutId + "&layoutType=" + layoutType;
	});
	
});

function getLayoutIdAndType(obj) {
	var id = $(obj).attr("id");
	var index = id.indexOf("_");
	var layoutId = id.substring(0, index);
	var layoutType = id.substring(index + 1);
	var params = [];
	params.push(layoutId);
	params.push(layoutType);
	
	return params;
}

function checkFormData(selectedValue,fileName) {
	var flag = true;
	//布局图类型
	var typevalue = $("#typeSelect").val(),
	//桌台区域
		areaObj = $("#areaDiv select").eq(0),
		areaObjLabel = $("#areaDiv label").eq(0),
	//楼层
		floorObj = $("#floorDiv select").eq(0),
		floorObjLabel = $("#floorDiv label").eq(0);
	
	if(typevalue == 1){
		if (areaObj.val() == "") {
			emptyPrompt(true,areaObjLabel,"wrong");
			flag = false;
		}else{
			emptyPrompt(false,areaObjLabel,"wrong");
		}
	}else if(typevalue == 2){
		if (floorObj.val() == "") {
			emptyPrompt(true,floorObjLabel,"wrong");
			flag = false;
		}else{
			emptyPrompt(false,floorObjLabel,"wrong");
		}
	}
	

/*	if (fileName == "") {
		emptyPrompt(true,$("#fileUpLoad").parent().prev("label"),"wrong");
		flag = false;
	}else{
		emptyPrompt(false,$("#fileUpLoad").parent().prev("label"),"wrong");
		if (!isValidFile(fileName)) {
			$("#validTip").show();
			flag = false;
		}
	}*/
	
	return flag;
}

function upLoadLayout(){
	var btnclean = $("#fileUpLoad").parent().find("span");
	$("#trigger-fileUpLoad,#trigger-fileUpLoad-btn").on("click",function(){
		$("#fileUpLoad").click();
	});
	$(document).delegate("#fileUpLoad","change",function(){
		var value = $(this).val();
//		alert(value);
		$("#trigger-fileUpLoad").val(value);
		btnclean.show();
	});
	btnclean.on("click",function(){
		$("#trigger-fileUpLoad,#fileUpLoad").val("");
		$(this).hide();
	});
	$(".close,.btn-cancel").on("click",function(){
		btnclean.click();
	});
}
function disableButton(){
//	alert("disableButton");
	$("#btn-create-new,#setting,#cancelDiv").addClass("btn-disabled");
}
function enableButton(){
//	alert("enableButton");
	$("#btn-create-new,#setting,#cancelDiv").removeClass("btn-disabled");
}

function isValidFile(fileName) {
	var flag = true;
	var reg = /\.jpg$|\.jpeg$|\.gif$/i;
	if (!reg.test(fileName)) {
		flag = false;
	}
	
	return flag;
}