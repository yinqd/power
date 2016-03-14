$(function(){
	//关闭弹框
	$("#print-single-seting").delegate(".close","click",function(e){
			$("#print-single-seting").hide().removeAttr("data-set");
			$("#wrongInfo").hide();
			emptyPrompt(false,$("#padCom"),"wrong");
			if(!$("#printChangeDiv").is(":hidden")){
				$("#printChangeDiv").hide();
			}
			resetCheckBox();
	});
	
//	$(document).delegate(".btn-shut-down","click",function(e){
//		var popoverObj = $(e.target).closest(".panel-popover");
//		if(popoverObj){
//			//alert(popoverObj.html());
//			hideLayer();
//			popoverObj.hide();
//		}
//		alert("btn-shut-down");
//	});
	
	
	//编辑打印单
	var printItem;
	$("#print-single-wrap").delegate(".icon-editor","click",function(e){
		e.preventDefault();
		var $item = $(this).parents(".print-single-item");
		//打印类型
		var printType = $item.attr("data-type");
		var printTypeName = (printType == 1) ? '总单' : '档口单';
		//打印单类型
		var subPrintType = $item.find("h2").attr("data-type");
		var subPrintTypeName = $item.find("h2").text();
		//关联pad编号
		var padIds = $(":checkbox[name='pad-number']");
		var padNos = $item.find("span[name='padNo']");
		//alert('padIds' + padIds);
		//关联区域
		var associatedArea = $(":checkbox[name='associated-area']");
		var commercialArea = $item.find("span[name='commercialArea']");
		//alert('associatedArea' + associatedArea);
		//字　　体
		var printFonts = $(":radio[name='print-font']");
		var fontNo = $item.find("span[name='font']").eq(0).attr("data-value");
		//份　　数
		var printNumber = $item.find("span[name='printNumber']").attr("data-value");
		//打印变化内容
		var printChange = $(":radio[name='print-change']");
		var printChangeVal = $item.find("span[name='printChange']").eq(0).attr("data-value");
		//二 维 码
		var erweimas = $(":checkbox[name='erweima']");
		var qrCodeInfos = $item.find("span[name='qrCodeInfos']");
		//打印单内容
		var printCon = $("#print-content");
		var printContentsVal = $item.find("span[name='printContents']").eq(0).attr("data-value");
		var printContentsName = $item.find("span[name='printContents']").eq(0).text();
		//
		var printSetingObj = $("#print-single-seting");
		printItem = $item;
		//重置打印单类型
		//一级分类
		//alert(printType + '\n' + printTypeName);
		$("#documentCategory").val(printType);
		$("#documentCategory").parent().find(".select-control em").text(printTypeName);
		//二级分类
		//alert(subPrintType + '\n' + subPrintTypeName);
		if(printType == 1){
			$("#single-type-select").show();
			$("#dish-type-select").hide();
			$("#single-type").append('<option value="'+ subPrintType + '">' + subPrintTypeName + '</option>');
			$("#single-type").prev("ul").append('<li>' + subPrintTypeName + '</li>');
			$("#single-type").val(subPrintType);
			$("#single-type").parent().find(".select-control em").text(subPrintTypeName);
		}else{
			$("#single-type-select").hide();
			$("#dish-type-select").show();
			$("#dish-type").append('<option value="'+ subPrintType + '">' + subPrintTypeName + '</option>');
			$("#dish-type").prev("ul").append('<li>' + subPrintTypeName + '</li>');
			$("#dish-type").val(subPrintType);
			$("#dish-type").parent().find(".select-control em").text(subPrintTypeName);
		}
		
		//重置关联pad编号
		for(var i=0,len=padNos.length;i<len;i++){
			for(var j=0,len1=padIds.length;j<len1;j++){
				if(padIds.eq(j).val() == padNos.eq(i).attr("data-value")){
					padIds.eq(j).attr("checked","checked");
					padIds.eq(j).parent().addClass("checkbox-check");
				}
			}
		}
		//重置关联区域
		for(var i=0,len=commercialArea.length;i<len;i++){
			for(var j=0,len1=associatedArea.length;j<len1;j++){
				if(associatedArea.eq(j).val() == commercialArea.eq(i).attr("data-value")){
					associatedArea.eq(j).attr("checked","checked");
					associatedArea.eq(j).parent().addClass("checkbox-check");
				}
			}
		}
		//重置字体
		for(var i=0,len=printFonts.length;i<len;i++){
			if(printFonts.eq(i).val() == fontNo ){
				printFonts.eq(i).parent().click();
			}
		}
		//重置份数
		$("#print-number").val(printNumber);
		//重置打印单变化内容 只有为厨打总单和客看总单的时候才显示
		if(subPrintType == 4 || subPrintType == 5){
			//alert("subPrintType");
			if($("#printChangeDiv").is(":hidden")){
				$("#printChangeDiv").show();
			}
			
			for(var i=0,len=printChange.length;i<len;i++){
				if(printChange.eq(i).val() == printChangeVal  ){
					printChange.eq(i).attr("checked","checked");
					printChange.eq(i).parent().addClass("radio-check");
				}else{
					printChange.eq(i).removeAttr("checked");
					printChange.eq(i).parent().removeClass("radio-check");
				}
			}
		}
		if(printType ==2){
			$("#printChangeDiv").show();
			for(var i=0,len=printChange.length;i<len;i++){
				if(printChangeVal == null){
					break;
				}else if(printChange.eq(i).val() == printChangeVal  ){
					printChange.eq(i).attr("checked","checked");
					printChange.eq(i).parent().addClass("radio-check");
				}else{
					printChange.eq(i).removeAttr("checked");
					printChange.eq(i).parent().removeClass("radio-check");
				}
			}
		}
		//重置二维码
		if(qrCodeInfos.length > 0){
			for(var i=0,len=qrCodeInfos.length;i<len;i++){
				for(var j=0,len1=erweimas.length;j<len1;j++){
					if(erweimas.eq(j).val() == qrCodeInfos.eq(i).attr("data-value")){
						erweimas.eq(j).attr("checked","checked");
						erweimas.eq(j).parent().addClass("checkbox-check");
					}
				}
			}
		}
		//打印单内容
		if(printContentsVal && printContentsVal.length > 0){
			printCon.val(printContentsVal).parent().find(".select-control em").text(printContentsName);
		}
		
		//
		printSetingObj.show().attr("data-set","edit");
		showLayer();
		$("#editType .select-control").addClass("disabled");
		
	});
	//如果是编辑 打印单类型不可修改
//	$("#editType").delegate(".select-control","click",function(){
//		if($("#print-single-seting").attr("data-set") == 'edit'){//alert('edit');
//			return false;
//		}
//	});
	//添加打印单
	$("#add-print-single").on("click",function(e){
		$("#print-single-seting").show();
		showLayer();
		$("#editType .select-control").removeClass("disabled");
		//$("#single-type-select ul").find("li").eq(0).css("display","none");
	});
	//保存添加打印单  print-single-save
	$("#print-single-save").on("click",function(e){
		e.preventDefault();
		var flag = false;
		//打印类型
		var printType = $("#documentCategory").val();
		//打印单类型
		//总单
		var singleObj = $("#single-type option:selected");
		var singleType = singleObj.val();
		var singleName = singleObj.text();
		//档口单
		var dishObj = $("#dish-type option:selected");
		var dishType = dishObj.val();
		var dishName = dishObj.text();
		//关联pad编号
		var padIds = $(":checkbox[name='pad-number']:checked");
		//alert('padIds' + padIds);
		//关联区域
		var associatedArea = $(":checkbox[name='associated-area']:checked");
		//alert('associatedArea' + associatedArea);
		//字　　体
		var printFontVal = $(":radio[name='print-font']:checked").val();
		var printFontName = $(":radio[name='print-font']:checked").attr("data-text");
		//alert('printFont' + printFont);
		//份　　数
		var printNumber = $("#print-number").val();
		//alert('printNumber' + printNumber);
		//打印变化内容
		var printChangeVal = $(":radio[name='print-change']:checked").val();
		var printChangeName = $(":radio[name='print-change']:checked").attr("data-text");
		//alert('printChange' + printChange);
		//二 维 码
		var erweimas = $(":checkbox[name='erweima']:checked");
		//alert('erweimas' + erweimas);
		//打印单内容
		var printCon = $("#print-content option:selected");
		//alert('printCon' + printCon);
		var html = '';
		
		if(printType == 1){
//			alert(singleType);
			if(singleType == 'disable'){
				$("#wrongInfo").show();
				flag = (flag || true);
			}else{
				$("#wrongInfo").hide();
			}
		}else if(printType == 2){
//			alert(dishType);
			if(dishType == 'disable'){
				$("#wrongInfo").show();
				flag = (flag || true);
			}else{
				$("#wrongInfo").hide();
			}
		}
		if(flag == true){
			return false;
		}
		if(printType == 1){
			html += '<div class="print-single print-single-item" data-type="' + printType + '">';
			html += '<h2 name="documentType" data-type="' + singleType + '">' + singleName + '</h2>';
		}else if(printType == 2){
			html += '<div class="print-single print-single-item" data-type="' + printType + '">';
			html += '<h2 name="documentType" data-type="' + dishType + '">' + dishName + '</h2>';
		}
		
		
		if(padIds.length > 0){
			html += '<dl><dt>关联pad编号</dt><dd>';
			for(var i=0,len=padIds.length;i<len;i++){
				html += '<span name="padNo" data-value="' + padIds.eq(i).val() + '">' + padIds.eq(i).val() + '</span>';
				if(i < len - 1){
					html += '、';
				}
			}
			html += '</dd></dl>';
		}
		
		if(associatedArea.length > 0){
			html += '<dl><dt>关联区域</dt><dd>';
			for(var i=0,len=associatedArea.length;i<len;i++){
				html += '<span name="commercialArea" data-value="' + associatedArea.eq(i).val() + '">' + associatedArea.eq(i).attr("data-text") + '</span>';
				if(i < len - 1){
					html += '、';
				}
			}
			html += '</dd></dl>';
		}
		html += '<dl><dt>字&#12288;体</dt><dd><span name="font" data-value="' + printFontVal + '">' + printFontName + '</span></dd></dl>';
		html += '<dl><dt>份&#12288;数</dt><dd><span name="printNumber" data-value="' + printNumber + '">' + printNumber + '份</span></dd></dl>';
		if(printType == 1 && (singleType == 4 || singleType == 5)){
			html += '<dl><dt>打印变化内容</dt><dd><span name="printChange" data-value="' + printChangeVal + '">' + printChangeName + '</span></dd></dl>';
		}
		//档口单也需要显示打印变化内容(2015-04-15 鲁虎军提出)
		if(printType == 2){
			html += '<dl><dt>打印变化内容</dt><dd><span name="printChange" data-value="' + printChangeVal + '">' + printChangeName + '</span></dd></dl>';
		}
		
		if(erweimas.length > 0){
			html += '<dl><dt>二 维 码</dt><dd>';
			for(var i=0,len=erweimas.length;i<len;i++){
				html += '<span name="qrCodeInfos" data-value="' + erweimas.eq(i).val() + '">' + erweimas.eq(i).attr("data-text") + '</span>';
				if(i < len - 1){
					html += '、';
				}
			}
			html += '</dd></dl>';
		}
		if(printCon.val().length != ""){
			html += '<dl><dt>打印单内容</dt><dd><span name="printContents" data-value="' + printCon.val() + '">' + printCon.text() + '</span></dd></dl>';
		}
		
		html += '<span class="icon-editor">编辑</span>';
		html += '<span class="icon-delete">删除</span></div>';
//		alert(html);
		//判断是编辑还是新建
		if($("#print-single-seting").attr("data-set") == 'edit'){
//			alert('printItem');
			printItem.after(html);
			printItem.remove();
			//判断总单还是档口单
			if(printType == 1){
				var lists = $("#single-type-select ul").find("li");
				for(var i=0,len=lists.length;i<len;i++){
					if(lists.eq(i).text() == singleName){
						lists.eq(i).remove();
					}
				}
				var txt = $("#single-type-select ul").find("li").eq(0).text();
				$("#single-type-select .select-control").find("em").text(txt);
				singleObj.remove();
			}else if(printType == 2){
				var lists = $("#dish-type-select ul").find("li");
				for(var i=0,len=lists.length;i<len;i++){
					if(lists.eq(i).text() == dishName){
						lists.eq(i).remove();
					}
				}
				var txt = $("#dish-type-select ul").find("li").eq(0).text();
				$("#dish-type-select .select-control").find("em").text(txt);
				dishObj.remove();
			}
			$("#print-single-seting").removeAttr("data-set","edit");
		}else{
			//判断总单还是档口单
			if(printType == 1){
				$("#print-single").append(html);
				var lists = $("#single-type-select ul").find("li");
				for(var i=0,len=lists.length;i<len;i++){
					if(lists.eq(i).text() == singleName){
						lists.eq(i).remove();
					}
				}
				var txt = $("#single-type-select ul").find("li").eq(0).text();
				$("#single-type-select .select-control").find("em").text(txt);
				singleObj.remove();
			}else if(printType == 2){
				$("#print-dish").append(html);
				var lists = $("#dish-type-select ul").find("li");
				for(var i=0,len=lists.length;i<len;i++){
					if(lists.eq(i).text() == dishName){
						lists.eq(i).remove();
					}
				}
				var txt = $("#dish-type-select ul").find("li").eq(0).text();
				$("#dish-type-select .select-control").find("em").text(txt);
				dishObj.remove();
			}
		}
		
		$("#print-single-seting").hide();
		hideLayer();
//		singleObj.removeAttr("checked").css("display","none");
		clearData("#print-single-seting");
		resetCheckBox();
//		$(":radio[name='print-font']").eq(0).attr("checked","checked").parent().addClass("radio-check");
//		$(":radio[name='print-change']").eq(0).attr("checked","checked").parent().addClass("radio-check");
//		$("#print-number").val(1);
//		$("#printChangeDiv").show();
	});

	//删除打印单
	$("#print-single-wrap").delegate(".icon-delete","click",function(){
		var itemObj = $(this).parent();
		//1=总单 2=档口单
		var type = itemObj.attr("data-type");
		//二级选框的value || text
		var subType = itemObj.find("h2");
		var subTypeVal = subType.attr("data-value");
		var subTypeTxt = subType.text();
		var optionHtml = '<option value="' + subTypeVal + '">' + subTypeTxt + '</option>';
		var html = '<li>' + subTypeTxt + '</li>';
		
		if(type == 1){
			$("#single-type").append(optionHtml);
			$("#single-type-select ul").append(html);
		}else if(type == 2){
			$("#dish-type").append(optionHtml);
			$("#dish-type-select ul").append(html);
		}
		itemObj.remove();
	});
	//打印单类型选择
	$("#documentCategory").on("change",function(){
		var $value = $(this).val();
		if($value == 1){
			$("#single-type-select").show();
			$("#dish-type-select").hide();
			$("#single-type").prev("ul").find("li").eq(0).click();
		}else if($value == 2){
			$("#single-type-select").hide();
			$("#dish-type-select").show();
			$("#dish-type").prev("ul").find("li").eq(0).click();
		}
		if(!$("#printChangeDiv").is(":hidden")){
			$("#printChangeDiv").hide();
		}
		
		
	});
    //类型切换
	$(":radio[name='printer-type']").change(function(){
		var $val = $(this).val();
		if(this.checked && $val == 1){
			$("#printer").hide();
		}else{
			$("#printer").show();
		}
		
	});
    
	//IP自动跳转到下一个输入框
    $("input[name='IP']").each(function(i) {
    	var index = 0,len = $("input[name='IP']").length;
        $(this).keyup(function(e) {
            e = window.event || e;
            var k = e.keyCode || e.which;
           
            if (k == 8) {   //8是空格键
                if ($(this).val().length < 1) {
                	index = ((i-1)>0)? i-1 : 0;
                	$("input[name='IP']").eq(index).focus();
                	$("input[name='IP']").eq(index).focus(function() {
                        var obj = e.srcElement ? e.srcElement: e.target;
                        if (obj.createTextRange) { //IE浏览器
                            var range = obj.createTextRange();
                            range.moveStart("character", 4);
                            range.collapse(true);
                            range.select();
                        }
                    });
                }
            } else {
                if ($(this).val().length >= 3) {
                	 index = ((i+1)< len)? i+1 : len-1;
                	 $("input[name='IP']").eq(i+1).focus();
                }
            }
        });
    });
    
  //添加打印总单效果
	$(document).delegate("#single-type","change",function(){
		var singleObj = $("#single-type option:selected");
		var singleType = singleObj.val();
		if(!((singleType == 4) || (singleType == 5))){
			$("#printChangeDiv").hide();
		}else{
			$("#printChangeDiv").show();
		}
	});
	
	//总单/档口单切换，当选择档口单时打印变化内容显示 
	$(document).delegate("#documentCategory","change",function(){
		var type = $("#documentCategory").parent().find(".select-control > em").text();
		if(type == "档口单"){
			$("#printChangeDiv").show();
		}else{
			$("#printChangeDiv").hide();
		}
	});
});



var pageQuery = new PageQuery("pageQuery"); //构建分页查询对象
pageQuery.pageQueryDataId = "tbody-1"; //设置数据表格的id
pageQuery.pageQueryToolId = "pageToolDiv"; //设置分页工具栏的id
//pageQuery.pageSize = 2;
//pageQuery.showtotalPageNum = 3;
function checkboxChange(element,className){
	if(element.readOnly){return false;}
	if(element.checked){
		$(element).attr("checked","checked");
		$(element).parent().addClass(className);
	}else{
		$(element).removeAttr("checked");
		$(element).parent().removeClass(className);
	}
}

function resetCheckBox(){
	var checkboxList = $(":checkbox[name='pad-number']:checked,:checkbox[name='associated-area']:checked,:checkbox[name='erweima']:checked");
	checkboxList .each(function(){
		$(this).removeAttr("checked");
		$(this).parent().removeClass("checkbox-check");
	});
}

/**
 * 保存打印设备信息
 */
var canSaveSubmit = true; //防止重复提交保存，当该值为 true 时可以提交，否则不可提交
function saveData(e){
	if ( e && e.preventDefault ){
		//阻止默认浏览器动作(W3C) 
		e.preventDefault();
	}else{
		//IE中阻止函数器默认动作的方式 
		window.event.returnValue = false; 
	}
	var flag = false;
	if(canSaveSubmit != true){
		return;
	}
	canSaveSubmit = false;
	//定义设备对象,并获取设备基本信息
	var printerDevice = {};
	printerDevice.id = $.trim($("#deviceId").val()); //设备id
	printerDevice.deviceName = $.trim($("#printer-name").val()); //设备名称
	if(isEmpty($('#printer-name'))){
		emptyPrompt(true,$("#printer-name-laber"),"wrong");
		flag = true;
	}else{
		emptyPrompt(false,$("#printer-name-laber"),"wrong");
	}
	printerDevice.printerDeviceType = $('input[name="printer-type"]:checked').val(); //设备类型
//	alert("printerDevice.printerDeviceType===" + printerDevice.printerDeviceType);
	printerDevice.address = "";  //设备地址
	var adressIsNull = false;
	$("#adress > :text").each(function(){
		if(!$(this).val()){
			emptyPrompt(true,$('#address-laber'),"wrong");
			flag = true;
			adressIsNull = true;
		}else{
			printerDevice.address += ($(this).val() + ".");
		}
	  });
//	if(adressIsNull == false){
//		emptyPrompt(false,$('#address-laber'),"wrong");
//	}
	printerDevice.address = (printerDevice.address).substring(0,(printerDevice.address).length-1);
	if(!adressIsNull){
		if(NetUtil.isIP(printerDevice.address) == false){
			canSaveSubmit = true;
			$("#adressWrongInfo").text("IP地址无效！");
			$("#adressWrongInfo").show();
			emptyPrompt(true,$('#address-laber'),"wrong");
			flag = true;
		}else{
			$("#adressWrongInfo").hide();
			emptyPrompt(false,$('#address-laber'),"wrong");
		}
	}
	
	if(flag == true){
		canSaveSubmit = true;
		return false;
	}
	
	//判断当前地址是否重复
	$.ajax({
		type:"POST",
		url:"printer/checkAddress",
		data:"address=" + (printerDevice.address) + "&id=" + (printerDevice.id) + "&printerDeviceType=" + (printerDevice.printerDeviceType) + "&random=" + Math.random(),
		dataType:"json",
		async:false,
		cache:false,
		success:function(data){
			if(data == "yes"){
				$("#adressWrongInfo").text("IP地址已存在！");
				$("#adressWrongInfo").show();
				canSaveSubmit = true;
				return false;
			}else{
				$("#adressWrongInfo").hide();
			}

			var printerDocuments = new Array();
			//获取设备关联订单信息
				//第一步，获取总单信息
				$("#print-single").children().each(function(index){
					var printerDocument = {}; //打印单信息
					printerDocument.documentCategory = 1; //订单种类
					printerDocument.documentType = $(this).children("[name='documentType']").attr("data-type"); //订单类型
//					alert("订单类型==" + $(this).children("[name='documentType']").attr("data-type"));
					var printerCorrelationInfos = new Array(); //关联信息
					$(this).find("[name='padNo']").each(function(padNoIndex){
						var printerCorrelationInfo = {};
						printerCorrelationInfo.correlationType = 1;
						printerCorrelationInfo.correlationValue = $(this).attr("data-value");
						printerCorrelationInfos.push(printerCorrelationInfo);
//						alert("pad编号"+padNoIndex+"==" + $(this).attr("data-value"));
					});
					$(this).find("[name='commercialArea']").each(function(commercialAreaIndex){
						var printerCorrelationInfo = {};
						printerCorrelationInfo.correlationType = 2;
						printerCorrelationInfo.correlationValue = $(this).attr("data-value");
						printerCorrelationInfos.push(printerCorrelationInfo);
//						alert("区域"+commercialAreaIndex+"==" + $(this).attr("data-value"));
					});
					printerDocument.font = $(this).find("[name='font']").attr("data-value");//字体
//					alert("字体==" + $(this).find("[name='font']").attr("data-value"));
					printerDocument.printCount = $(this).find("[name='printNumber']").attr("data-value"); //份数
//					alert("份数==" + $(this).find("[name='printNumber']").attr("data-value"));
					printerDocument.isPrintAll = $(this).find("[name='printChange']").attr("data-value");
//					alert("打印变化内容==" + $(this).find("[name='printChange']").attr("data-value"));
					$(this).find("[name='qrCodeInfos']").each(function(qrCodeInfosIndex){
						var printerCorrelationInfo = {};
						printerCorrelationInfo.correlationType = 3;
						printerCorrelationInfo.correlationValue = $(this).attr("data-value");
						printerCorrelationInfos.push(printerCorrelationInfo);
//						alert("二维码"+qrCodeInfosIndex+"==" + $(this).attr("data-value"));
					});
					printerDocument.printerCorrelationInfos = printerCorrelationInfos;
					printerDocument.contentId =  $(this).find("[name='printContents']").attr("data-value"); //打印内容
//					alert("打印内容==" + $(this).find("[name='printContents']").attr("data-value"));
					printerDocuments.push(printerDocument);
				});
				
				//第二步，获取档口单信息
				$("#print-dish").children().each(function(index){
					var printerDocument = {}; //打印单信息
					printerDocument.documentCategory = 2; //订单种类
					printerDocument.documentType = $(this).children("[name='documentType']").attr("data-type"); //订单类型
//					alert("订单类型==" + $(this).children("[name='documentType']").attr("data-type"));
					var printerCorrelationInfos = new Array(); //关联信息
					$(this).find("[name='padNo']").each(function(padNoIndex){
						var printerCorrelationInfo = {};
						printerCorrelationInfo.correlationType = 1;
						printerCorrelationInfo.correlationValue = $(this).attr("data-value");
						printerCorrelationInfos.push(printerCorrelationInfo);
//						alert("pad编号"+padNoIndex+"==" + $(this).attr("data-value"));
					});
					$(this).find("[name='commercialArea']").each(function(commercialAreaIndex){
						var printerCorrelationInfo = {};
						printerCorrelationInfo.correlationType = 2;
						printerCorrelationInfo.correlationValue = $(this).attr("data-value");
						printerCorrelationInfos.push(printerCorrelationInfo);
//						alert("区域"+commercialAreaIndex+"==" + $(this).attr("data-value"));
					});
					printerDocument.font = $(this).find("[name='font']").attr("data-value");//字体
//					alert("字体==" + $(this).find("[name='font']").attr("data-value"));
					printerDocument.printCount = $(this).find("[name='printNumber']").attr("data-value"); //份数
//					alert("份数==" + $(this).find("[name='printNumber']").attr("data-value"));
					printerDocument.isPrintAll = $(this).find("[name='printChange']").attr("data-value");
//					alert("打印变化内容==" + $(this).find("[name='printChange']").attr("data-value"));
					$(this).find("[name='qrCodeInfos']").each(function(qrCodeInfosIndex){
						var printerCorrelationInfo = {};
						printerCorrelationInfo.correlationType = 3;
						printerCorrelationInfo.correlationValue = $(this).attr("data-value");
						printerCorrelationInfos.push(printerCorrelationInfo);
//						alert("二维码"+qrCodeInfosIndex+"==" + $(this).attr("data-value"));
					});
					printerDocument.printerCorrelationInfos = printerCorrelationInfos;
					if($(this).find("[name='printContents']").attr("data-value") != null){
						printerDocument.contentId =  $(this).find("[name='printContents']").attr("data-value"); //打印内容
					}
					printerDocuments.push(printerDocument);
				});
				printerDevice.printerDocumentVos = printerDocuments;
			$.ajax({
					type:"POST",
					url:"printer/save",
					data:$.toJSON(printerDevice)+ "&random=" + Math.random(),
					dataType:"json",
					contentType: "application/json; charset=utf-8", 
					async:false,
					cache:false,
					success:function(data){
						location.href = $("base").attr("href") + "printer/list";
						canSaveSubmit = true;
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						canSaveSubmit = true;
				        alert("网络异常，请检查网络连接状态！");
				    }
			});	
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			canSaveSubmit = true;
	        alert("网络异常，请检查网络连接状态！");
	        return;
	    }
	});
	
}


