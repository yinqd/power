$(function(){
	getQueueVoice();
	//初始化
	noQueue();
	//多标签滚动
	tabSwitchWrap($("#queue-details .switching-tab"));
	$("#queueDtlCon > .switching-con").eq(0).addClass("current");
	$("#queue-details .switching-tab > li").eq(0).addClass("current");
	if($("#queue-details .switching-tab > li").length > 1){
		isQueueMax();//加载判断当前的队列是否是最大值 显示与隐藏 修改或者删除 操作
	}
	
	//标签切换
	$(document).delegate(".switching-tab > li","click",function(){
//		tabChange(this,$(this).parents(".switching-item").find(".switching-con"),"current");
		isQueueMax();
	});
	$(".queue-operation > a.addQueue").on("click",function(e){//新增
		e.preventDefault();
		createQueueView();//展示创建队列的弹出页面
	});
	$(".queue-operation > a.editQueue").on("click",function(e){//编辑
		e.preventDefault();
//		resetQueueNum();//重置队列号
		editQueue();
	});
	$(".queue-operation > a.delQueue").on("click",function(e){//删除
		e.preventDefault();
//		Message.confirm({title:"删除队列",describe:"是否确认删除？"},deleteQueue);
		deleteQueue();
	});
	//取消 关闭
	$("#queue-new-con .btn-cancel,#queue-new-con .close").on("click",function(){
		resetQueueCon();
	});
	//点击选择桌台
	$("#selectTables").on("click",function(){
		if(!$(this).hasClass("btn-disable")){
			var minNum = $("#minimum").val()*1,
				largestNum = $("#largest").val()*1;
			if(minNum  && largestNum  && minNum > largestNum){
				promptMessage("最大人数不能小于最小人数",{left:'50%',marginLeft:'-50px',top:'70%',marginTop:'-30px'});
				return;
			}
			getTableList(null,null);
			if($(":checkbox[name='tableIds']").length == 0){
				promptMessage("已经没有桌台可添加",{left:'50%',marginLeft:'-50px',top:'70%',marginTop:'-30px'});
				$("#showTables").hide();
			}else{
				$("#showTables").show();
			}
		}
	});
	//填写人数 选择桌台按钮可点
//	$(document).delegate("#minimum","keyup change",function(){
//		enabledBtn($(this));
//	});
//	$(document).delegate("#largest","keyup change",function(){
//		enabledBtn($(this));
//	});
	//预计排队时长 开关 打开与关闭切换提示文字
	$(document).delegate("#expectTime","change",function(){
		if(this.checked){
			$("#expectTimeTip").html("开关打开，将在打印排队号码时显示预计排队时长");
		}else{
			$("#expectTimeTip").html("开关关闭，打印排队号码时将不显示预计排队时长");
		}
		expectQueueTimeSave();
	});
	$("#preOrder").on("change",function(){
		var preOrderTag= $("#preOrder").parents(".panel-item").find("p");
		if(this.checked){
			
			preOrderTag.text("您已\"打开\"预点菜功能");
		}else{
		
			preOrderTag.text("您已\"关闭\"预点菜功能");
		}
	});
	/*********************华丽丽的分割线   排队语音广播   start********************************************/
	//添加 排队广播语音设置
	showMenu(".additem",".close-1");//绑定鼠标移除事件
	$(document).delegate("#speechSet .close-1","click",function(){
		var len = $("#speechSet input[name='speechFile']").length;
		var itemObj = $(this).parent();
//		console.log("len=="+len);
		var textObj = itemObj.find(":text");

		function removeItem(){
			if (len == 5) {
				$("#speechSet .icon-plus").show();//显示加号
				$("#plusPrompt").text("");
			};
			itemObj.remove();
		}
	
		if(textObj.val() != null && textObj.val()!=""){
			Message.confirm({title:"提示",describe:"确定移除该文件吗？"},removeItem);
		}else{
			removeItem();
		}
		
	});


	$(document).delegate("#speechSet .clearfile","click",function(){
		if($(this).is(".btn-disable")){return}
		var clearObj = $(this);
//		var parentObj = $(this).parent(".input-group-inset");
		var textObj = clearObj.siblings(":text");
		var fileObj = clearObj.siblings(":file");
		var hiddenObj = clearObj.siblings(":hidden");
		
		function clearFile(){
			textObj.val("");
			fileObj.val("");
			hiddenObj.val("");
			clearObj.addClass("btn-disable").removeClass("btn-blue");
		}
		Message.confirm({title:"提示",describe:"确认清空该文件吗？"},clearFile);
	});
	//文件上传
	$(document).delegate(":text[id^='trigger'],button[id^='trigger']","click",function(){
		var textId = $(this).attr("id");
		var index = textId.indexOf("-");
		var lastIndex = textId.lastIndexOf("-");
		var fileId = '';

		if(index === lastIndex){
			fileId = textId.substring(index+1);
		}else{
			fileId = textId.substring(index+1,lastIndex);
		}
		$("#"+fileId).click();
	});
	$(document).delegate(".hidden-file","change",function(){
		var fileId = $(this).attr("id");
		var textId = 'trigger-'+fileId;
		var urlId = textId + "-url";
		var value = $(this).val();//获取文件名称
		var wrongObj = $(this).parent(".input-group-inset").next(".wrong");
		if(value != null && value != "" && value.indexOf("\\")!= -1){
			value = value.substr(value.lastIndexOf("\\")+1)
		}
		var objPreview = document.getElementById(fileId);	
		if(objPreview.value != null && objPreview.value != ''){
			if (!objPreview.value.match(/.mp3/i)) {		
//				alert('请上传.mp3|.png类型的图片');	
				wrongObj.text('格式有误，请核对是否为MP3格式').show();
				return false;		
			}else{
				var fileSize = 0; 
				var isIE = /msie/i.test(navigator.userAgent) && !window.opera;  
			    if (isIE && !objPreview.files) {      
			      var filePath = objPreview.value;      
			      var fileSystem = new ActiveXObject("Scripting.FileSystemObject");         
			      var file = fileSystem.GetFile (filePath);      
			      fileSize = file.Size;     
			    } else {     
			    	fileSize = objPreview.files[0].size;      
			     }    
			     var size = fileSize / 1024 /1024;     
			     if(size>10){   
			    	 wrongObj.text('文件过大，请核对后重新上传').show();
			    	 return false;	
			     }   
			}
		
		
			//查看文件名称是否存在
			var flag=true;
			var obj = $("input[name='speechFile']");
			$.each(obj,function(n,v){
				var fileurlvalue=v.value;
				if(obj.eq(n).attr("id") != textId && fileurlvalue == value){
					wrongObj.text('文件名重复，请尝试修改文件名称后重新上传').show();
			    	 flag=false;
			    	 return false;
				};
			});
			
			if(!flag){
				return false;
			}
		
			$("#"+textId).val(value);
			 $("#"+urlId).val(value);
			 wrongObj.text("").hide();
			 
			 if($(this).parent(".input-group-inset").find(".clearfile").length > 0){
				 var clearObj = $(this).parent(".input-group-inset").find(".clearfile");
				 clearObj.addClass("btn-blue").removeClass("btn-disable");
			 }
		}
	});
	
});

var savesubmit=true;

//广播语音表单提交
function subimtBtn() {  
	
	if(savesubmit){
		savesubmit = false;
		showLoading();
		 var options  = {    
	        url:'commercial/queueConfig/saveQueueVoice',    
	        type:'post',    
	        success:function(data)    
	        {    
	        	promptMessage(data.msg);
	        	$("#speechSet .wrong").hide();
	        	hideLoading();
	            savesubmit=true;
	            getQueueVoice();
	        }    
	    };    
	    $("#queueVoiceForm").ajaxSubmit(options);
	    submitOrderStatu();
	}else{
		promptMessage("请不要重复提交");
	}
   
}  
function submitOrderStatu(){
	var isOrderMenu=$(':checked[name="switch-checkbox-preOrder"]').size()>0;
	var data={
		orderDishStatu:isOrderMenu
	};
	$.ajax({
		type: "POST",
		url: ctxPath+ "/commercial/queueConfig/saveOrderStatu",
		data: data,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		cache: false,
		success: function(data){
		//promptMessage(data.msg);
		}
	});

}

function getQueueVoice(){
	$.ajax({
		type:"POST",
		url:"commercial/queueConfig/getQueueVoice",
		data:"&random=" + Math.random(),
		dataType:"json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8", 
		async:false,
		cache:false,
		success:function(data){
			var item = data.voiceList;
			$("#speechSet").empty();
			var html="";
			if(data.voiceList.length > 0){
				for(var i  =0 ;i< data.voiceList.length  ;i ++){
					if(i == 0 ){
						html+='<span class="icon-plus">添加</span>';
						html+=' <div class="input-group-inset">';
						html+=' <input type="text" class="form-control" name="speechFile" value="'+ item[i].sysFile.fileName+'" id="trigger-fileUpLoad" placeholder="支持mp3格式，大小10M以内/请设置语音文件名称后再上传，多个文件名称不能相同">';
						html+=' <button class="btn btn-default" type="button" id="trigger-fileUpLoad-btn">浏览</button>';
						html+=' <a href="#" class="btn-blue clearfile">清空</a>';
						html+=' <input type="file" id="fileUpLoad" class="hidden-file" name="multiFile">';
						html+=' <input type="hidden"  name="fileUrl" value="'+ item[i].sysFile.fileUrl +'" id="trigger-fileUpLoad-url">';
						html+=' <input type="hidden"  name="fileIds" value="'+ item[i].fileId +'" id="trigger-fileUpLoad-id">';
						html+=' </div> '; 
						html+=' <div class="wrong" style="display:none;">wrong</div> '; 
					}else{
						html+='<div class="additem"><div class="input-group-inset">';
						html+='<input type="text" class="form-control" name="speechFile" value="'+ item[i].sysFile.fileName +'" id="trigger-fileUpLoad'+i +'" placeholder="支持mp3格式，大小10M以内/请设置语音文件名称后再上传，多个文件名称不能相同">';
						html+='<button class="btn btn-default" type="button" id="trigger-fileUpLoad'+i+'-btn">浏览</button>';
						html+='<input type="file" id="fileUpLoad'+i+'" class="hidden-file" name="multiFile">';
						html+='<input type="hidden"  name="fileUrl" value="'+ item[i].sysFile.fileUrl +'" id="trigger-fileUpLoad'+i+'-url">';
						html+=' <input type="hidden"  name="fileIds" value="'+ item[i].fileId +'" id="trigger-fileUpLoad-id">';
						html+='</div>';
						html+='	<div class="wrong" style="display:none;">wrong</div>';
						html+='<a href="#" class="close-1 ml10" style="display:none;">移除此项</a>';
						html += '</div>';
					}
				}
				
			}else{
				html+='<span class="icon-plus">添加</span>'; 
				html+=' <div class="input-group-inset">'; 
				html+=' <input type="text" class="form-control" name="speechFile" id="trigger-fileUpLoad" placeholder="支持mp3格式，大小10M以内/请设置语音文件名称后再上传，多个文件名称不能相同">'; 
				html+=' <button class="btn btn-default" type="button" id="trigger-fileUpLoad-btn">浏览</button>'; 
				html+=' <a href="#" class="btn-disable clearfile">清空</a>'; 
				html+=' <input type="file" id="fileUpLoad" class="hidden-file" name="multiFile">'; 
				html+=' <input type="hidden"  name="fileUrl"  id="trigger-fileUpLoad-url">'; 
				html+='  <input type="hidden"  name="fileIds" value="0" id="trigger-fileUpLoad-id">'; 
				html+=' </div>'; 
				html+=' <div class="wrong" style="display:none;">wrong</div>'; 
			}
			
			$("#speechSet").append(html);
			showMenu(".additem",".close-1");//绑定鼠标移除事件
			

			$(".additem-wrap .icon-plus").on("click",function(){
				var addWrapObj = $(this).parent();
				
				var html;
				var idNum = new Date()*1;
				// if(addWrapObj.attr("id") == "invoice"){
					html = '<div class="additem"><div class="input-group-inset">';
					html += '<input type="text" class="form-control" name="speechFile" id="trigger-fileUpLoad'+ idNum +'" placeholder="支持mp3格式，大小10M以内/请设置语音文件名称后再上传，多个文件名称不能相同">';
					html += '<button class="btn btn-default" type="button" id="trigger-fileUpLoad'+ idNum +'-btn">浏览</button>';
					html += '<input type="file" id="fileUpLoad'+ idNum +'" class="hidden-file" name="multiFile"><input type="hidden"  name="fileUrl" id="trigger-fileUpLoad'+ idNum +'-url" >  <input type="hidden"  name="fileIds" value="0" id="trigger-fileUpLoad-id"></div>';
					html += '<div class="wrong" style="display:none;">wrong</div>';
					html += '<a href="#" class="close-1 ml10" style="display:none;">移除此项</a>';
					html += '</div>';
					if(addWrapObj.find("input[name='speechFile']").length < 5){
						if(addWrapObj.find("input[name='speechFile']").length == 4){
							$(this).hide();//隐藏加号
							$("#plusPrompt").text("您上传的文件数量已达到上限");
						}
						addWrapObj.append(html);
						
					}
				
				showMenu(".additem",".close-1");//绑定鼠标移除事件
			});
			
			
			//$(".additem-wrap .icon-plus").bind("click");
			if($("#speechSet input[name='speechFile']").length >= 5){
				$("#speechSet .icon-plus").hide();
			}
		}
	});
}

/*********************华丽丽的分割线   排队语音广播   end********************************************/

/**
 * 新增队列的时校验、弹出view页面
 */
function createQueueView (){
	$.ajax({
		type:"POST",
		url:"commercial/queueConfig/checkIncludeEndless",
		data: "&random=" + Math.random(),
		dataType:"json",
		contentType: "application/json; charset=utf-8", 
		async:false,
		cache:false,
		success:function(data){
			canSaveSubmit = true;
			if(data.success){//
				//设置最小人数初始值
				$("#minimum").val(data.nexMinPerson);
				if(resetQueueNum()){
					$("#queueLineId").val("");
					$("#queue-new-con").show();
					showLayer();
				}
			}else{
				promptMessage("当前队列已覆盖所有人数，不可以继续添加了哦！");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			canSaveSubmit = true;
			promptMessage("网络异常，请检查网络连接状态！");
	    },	
	});	
}



function save(e){
	//保存后台操作
	checkQueue(e);
}
function getTableList(obj,obj2){
	if(obj!=null){
		obj="queueLineId="+obj;
	}else{
		obj=$("#form").serialize();
	}
	$.ajax({
		type:"POST",
		url:"commercial/queueConfig/list",
		data:obj+ "&random=" + Math.random(),
		dataType:"json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8", 
		async:false,
		cache:false,
		success:function(data){
			if(data != null){
				//加载队列信息
				if(data.queueLine!=null && obj2=="edit"){
					$("#queueName").val(data.queueLine.queueName);
					$("#minimum").val(data.queueLine.minPersonCount);
					$("#largest").val(data.queueLine.maxPersonCount);
					$("#queueLineId").val(data.queueLine.id);
					$("#queueNote").val(data.queueLine.memo);
				}
				//加载队列的桌台列表信息
				if(data.map!=null){
					var div="";
					$.each(data.map,function(key,values){
						var areaId="";
						var areaNum="";
						var areaName="未知区域";
						if(key!=null){
							if(key.split("_")[0]!=null && key.split("_")[0]!="null"){
								areaId=key.split("_")[0];
							}
							if(key.split("_")[2]!=null && key.split("_")[2]!="null"){
								areaNum=key.split("_")[2];
							}
							if(key.split("_")[1]!=null && key.split("_")[1]!="null"){
								areaName=key.split("_")[1];
							}
						}
						div+="<dl><dt>"+areaNum+areaName+"</dt><dd><ul class=\"tables-items\">";
						$(values).each(function(){
							var checked="";
							var checkedLabel = "";
							if(this.queueLineId!=null && this.queueLineId!=""){
								checked="checked";
								checkedLabel = "checkbox-check";
							}
							var tableNumem=this.tableNum;
							if(tableNumem!=null && tableNumem!="" && tableNumem!="null"){
								tableNumem="<em class=\"mr10\">"+tableNumem+"</em> " ;
							}else{
								tableNumem="";
							}
							div+=" <li><label class=\"checkbox "+checkedLabel+"\"><span></span>" +
									"<input type=\"checkbox\" data-name=\"tables\" id=\""+this.id+"\" name=\"tableIds\" data-checked-all=\"tables-all\"  "  +checked + "  value=\""+this.id+"\">"+
									tableNumem+" <i>"+this.tableName+"（"+this.tablePersonCount+"人桌）</i></label></li>";
						})
						div+=" </ul></dd></dl>";
					})
					$("#queue-tables").html(div);
				}
			
			//	alert("保存成功！");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			promptMessage("网络异常，请检查网络连接状态！");
	    },
});	
}
//重置队列代号
function resetQueueNum(){
	var curQueues = $("#queue-details .switching-tab > li"),
		curQlen = curQueues.length,
		queueCode = $("#queueCodeNumber"),
		queueList = $("#queueCodeNumber").parent().find("ul"),
		selectControl = $("#queueCodeNumber").parent().find(".select-control"),
		queues = ["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z"],
		qLen = queues.length,
		optionHtml = '',
		liHtml = '',
		flag = true;
	
	if(curQlen > 0){
		for(var i=0;i<qLen;i++){
			var have = true;
			for(var j=0;j<curQlen;j++){
				if(queues[i] == curQueues.eq(j).attr("data-value")){
					have = false;
					break;
				}
			}
			if(have){
				optionHtml += '<option value="' + queues[i] + '">' + queues[i] + '</option>';
				liHtml += '<li>' + queues[i] + '</li>';
			}
			
		}
		queueCode.empty();
		queueList.empty();
		queueCode.append(optionHtml);
		queueList.append(liHtml);
		selectControl.find("em").text(queueCode.val());	
	}else if(curQlen == qLen){
		flag = false;
		promptMessage("已经没有队列可添加");
	}else{
		for(var i=0;i<qLen;i++){
			var have = true;
			for(var j=0;j<curQlen;j++){
				if(queues[i] == curQueues.eq(j).attr("data-value")){
					have = false;
					break;
				}
			}
			if(have){
				optionHtml += '<option value="' + queues[i] + '">' + queues[i] + '</option>';
				liHtml += '<li>' + queues[i] + '</li>';
			}
			
		}
		queueCode.empty();
		queueList.empty();
		queueCode.append(optionHtml);
		queueList.append(liHtml);
		selectControl.find("em").text(queueCode.val());	
	}

	return flag;
}
function checkQueue(e){
	//所有被选中的桌台 
	var tables = $(":checkbox[data-name='tables']:checked"),
		//桌台代号 
	    queueCode = $("#queueCodeNumber option:selected"),
	    queueCodeNumber = queueCode.val(),
	    queueCodeTxt = queueCode.text(),
	    //队列名称
	    queueName = $("#queueName"),
	    queueNameTxt = queueName.val(),
	    //最小人数
	    minimumNum = $("#minimum").val(),
	    //最大人数
	    largestNum = $("#largest").val();
	//如果没有选择桌台提示并返回 
	if(!queueNameTxt){
		promptMessage("请选填写队列名称",{left:'50%',marginLeft:'-50px',top:'70%',marginTop:'-30px'});
		return;
	}
//	else if(minimumNum>largestNum){
//		promptMessage("最大人数必须大于等于最小人数",{left:'50%',marginLeft:'-50px',top:'70%',marginTop:'-30px'});
//		return;
//	}
	else if(tables.length < 1){
		promptMessage("请选择桌台",{left:'50%',marginLeft:'-50px',top:'70%',marginTop:'-30px'});
		return;
	}
	saveData(e);
}


//添加队列
function addQueue(e,obj){
		//桌台代号 
   var  queueCode = $("#queueCodeNumber option:selected"),
	    queueCodeNumber = queueCode.val(),
	    queueCodeTxt = queueCode.text(),
	    //队列名称
	    queueName = $("#queueName"),
	    queueNameTxt = queueName.val(),
	    //最小人数
	    minimumNum = $("#minimum").val(),
	    //最大人数
	    largestNum = $("#largest").val(),
	    //备注
	    queueNoteTxt = (!!$("#queueNote").val()) ? $("#queueNote").val(): '暂无';
	    queueCons = $("#queue-new-con .tables-items"),
	    queueTabs = $("#queue-new-con .switching-tab > li"),
	    queueConsWrap = $("#queueDtlCon"),
	    selectControl = $("#queueCodeNumber").parent().find(".select-control"),
	    selectControlList = $("#queueCodeNumber").parent().find("ul"),
	    tabHtml = '',conHtml = '',index = 0;
	//要插入的tab
	tabHtml += '<li class="current" data-id="'+ obj +'" data-value="'+ queueCodeNumber +'">' + queueCodeTxt + ' ' + queueNameTxt + '</li>';
//	alert(tabHtml);
	//要插入的con 
	conHtml += '<div class="switching-con current hta">';
	conHtml += '<dl class="panel-item"><dt>队列名称</dt><dd class="pt7">' + queueNameTxt + '</dd></dl>';
	conHtml += '<dl class="panel-item"><dt>人&#12288;&#12288;数</dt><dd class="pt7">';
	if(!!minimumNum && !!largestNum){
		conHtml += minimumNum + '~' + largestNum + '人</dd></dl>';
	}else if(!largestNum){
		conHtml += minimumNum + '人以上</dd></dl>';
	}else if(!minimumNum){
		conHtml += largestNum + '人以下</dd></dl>';
	}
	conHtml += '<dl class="panel-item"><dt>备&#12288;&#12288;注</dt><dd class="pt7">' + queueNoteTxt + '</dd></dl>';
	conHtml += '<dl class="panel-item"><dt>桌&#12288;&#12288;台</dt><dd class="pt7">';
	for(var i=0,len=queueCons.length;i<len;i++){
		var checkboxs = queueCons.eq(i).find(":checkbox:checked");
		if(checkboxs.length > 0){
			var areaName = queueCons.eq(i).parent().prev("dt").text();
			conHtml += '<h3 class="queue-title">' + areaName + '</h3>';
			conHtml += '<ul class="queue-items">';
			for(var j=0,len1=checkboxs.length;j<len1;j++){
				conHtml += '<li data-id="'+ checkboxs.eq(j).attr("id") +'">' + checkboxs.eq(j).parent().find("em").text() + '&#12288;' + checkboxs.eq(j).parent().find("i").text() + '</li>';
			}
			conHtml += '</ul>';
		}
	}
	conHtml += '</dd></dl></div>';
	
	//saveData(e);后台操作
	
	//保存编辑
	if($("#queue-new-con").attr("data-status") && $("#queue-new-con").attr("data-status")== "edit"){
		var currentQueueLi = $("#queue-details .switching-tab").find(".current");
		currentQueueLi.text(queueCodeTxt + ' ' + queueNameTxt);
		$("#queueCodeNumber").parent().find(".select-control").removeClass("disabled");
		$("#queue-new-con").removeAttr("data-status");
		queueConsWrap.find("div.current").replaceWith(conHtml); 
	}else{//保存添加
		
		//按字符顺序插入 
		index = ($("#queue-details .switching-tab > li").length > 0) ? sortingLetter("#queue-details .switching-tab > li","data-value",queueCodeNumber) : 0;
		$("#queue-details .switching-tab > li").removeClass("current");
		queueConsWrap.find(".switching-con").removeClass("current");
		if(index == 0){
			$("#queue-details .switching-tab").prepend(tabHtml);
			queueConsWrap.prepend(conHtml);
		}else{
			$("#queue-details .switching-tab > li").eq(index-1).after(tabHtml);
			queueConsWrap.find(".switching-con").eq(index-1).after(conHtml);
		}
		if($(".queue-operation > a").eq(1).is(":hidden")){
			$(".queue-operation > a:gt(0)").show();
		}
		//每次添加都更新多滚动标签
		tabSwitchWrap($("#queue-details .switching-tab"));
	}
	noQueue();
	resetQueueCon();
	$("#queue-new-con").hide();
	hideLayer();
//	clearData($("#queue-new-con"));
	selectControl.find("em").text(selectControlList.find("li").eq(0).text());
}




/**
 * 保存桌台排队队列
 */
var canSaveSubmit = true; //防止重复提交保存，当该值为 true 时可以提交，否则不可提交
function saveData(e){
	var queueLineId = $("#queueLineId").val();
	var minimum = $("#minimum").val();//正在操作的队列最小人数
	var largest = $("#largest").val();//正在操作的队列最大人数
	if(queueLineId.length == 0){//新增
		submitData(e);
	}else{//修改
		var commercialTableVo = {};
		commercialTableVo.minPersonCount = minimum;
		commercialTableVo.maxPersonCount = largest;
		commercialTableVo.queueLineId = queueLineId;
		$.ajax({
			type:"POST",
			url:"commercial/queueConfig/checkUpdate",
			data:$.toJSON(commercialTableVo)+ "&random=" + Math.random(),
			dataType:"json",
			contentType: "application/json; charset=utf-8", 
			async:false,
			cache:false,
			success:function(data){
				canSaveSubmit = true;
				if(data.success){//操作数据正常
					submitData(e);
				}else if(data.warn){//操作数据正常，但是有断区间，须提示
					Message.confirm({title: "提示",describe:data.message+"你确定还要提交么？"},function(){
						submitData(e);
					});
				}else{
					promptMessage("与其他队列人数有冲突！");
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				canSaveSubmit = true;
				promptMessage("网络异常，请检查网络连接状态！");
		    },	
		});	
	}
}
/**
 * 向后台提交数据
 */
function submitData(e){
	if ( e && e.preventDefault ){
		//阻止默认浏览器动作(W3C) 
		e.preventDefault();
	}else{
		//IE中阻止函数器默认动作的方式 
		window.event.returnValue = false; 
	}
	if(canSaveSubmit != true){
		return;
	}
	canSaveSubmit = false;
	$.ajax({
			type:"POST",
			url:"commercial/queueConfig/save",
			data:$("#form").serialize()+ "&random=" + Math.random(),
			dataType:"json",
			contentType: "application/x-www-form-urlencoded;charset=UTF-8", 
			async:false,
			cache:false,
			success:function(data){
				canSaveSubmit = true;
				if(data.success != null){
					promptMessage("保存成功！");
					addQueue(e,data.queueLineId);//页面增加
//					location.reload();
				}else{
					promptMessage(data.error);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				canSaveSubmit = true;
				promptMessage("网络异常，请检查网络连接状态！");
		    },
	});	
}


/**
 * 校验排队队列数据的合法性
 */
function verificateDataInfo(){
	var queueLineId = $("#queueLineId").val();
	var minimum = $("#minimum").val();//正在操作的队列最小人数
	var largest = $("#largest").val();//正在操作的队列最大人数
	if(queueLineId.length == 0){//新增
		if(largest.length != 0 && parseInt(largest) < minimum ){
			promptMessage("最大人数不能小于最小人数或者最大人数不填写！");
			return false;
		}else{
			return true;
		}
	}else{//更新
		var minPersons = new Array();//存放比当前更新的队列 值（最小人数）大的队列 的最小人数值
		var minJianJu = new Array();//存放当前队列与后面队列值 的断区值，第一位为 实际断区的差，如1-6,7-8,9-10,将1-6改为1-4 那么断区实际值为第一位：7-4 = 3  
		$("input[name='minPersons']").each(function(i){
			var minPerson = $(this).val();
			if(parseInt(minPerson) > parseInt(minimum) ){
				minPersons.push(minPerson);
			}
		});
		/*判断最大人数不能小于最小人数*/
		if(largest.length != 0 && parseInt(largest) < minimum ){
			promptMessage("最大人数不能小于最小人数或者最大人数不填写！");
			return false;
		}
		/*判断最大人数与其他队列产生交集或断区间*/
		if(largest.length == 0){//最大人数为空
			promptMessage("最大人数不能为无限制，与其他队列人数有冲突！");
			return false;
		}else{//最大人数不为空
			for(var i=0;i<minPersons.length;i++){
				if(parseInt(minPersons[i]) <= parseInt(largest) ){
					promptMessage("最大人数与其他队列人数有冲突！");
					return false;
				}else{//计算断了的区间的值
					minJianJu.push(parseInt(minPersons[i])-parseInt(largest) );
				}
			}
			if(minJianJu.length != 0){//存在断区
				Message.confirm({title: "提示",describe: "存在断区数据:"},function(){
					submitData();
				});
				return true;
			}
		}
	}
}




//编辑队列
function editQueue(){

	//桌台代号 
	var queueCode = $("#queue-details .switching-tab li.current"),
	    queueCodeNumber = queueCode.attr("data-value");
	
	//获取队列编号
	var queueLineId=queueCode.attr("data-id");
	//先查看该队列是否在使用
	var queueCount=getQueueCount(queueLineId);
	//全选按钮
	var checkAllBtn = $("#tables-all").get(0);
	var checkboxName = $("#tables-all").attr("data-all");
	if(queueCount > 0 ){
		Message.confirm({title: "提示",describe:"该队列正在排队中，此时编辑会将队列下所有排队号清零。确认要继续编辑吗？"},function(){
//			console.log("重置前:" + $("#queueCodeNumber").html());
			//重置队列代号
			resetQueueNum();
			var index = sortingLetter($("#queueCodeNumber option"),"value",queueCodeNumber);
//			console.log($("#queueCodeNumber").html());
//			console.log("index ==" + index);
			if(index == 0){
				$("#queueCodeNumber").prepend("<option value='"+ queueCodeNumber+"' selected>" + queueCodeNumber + "</option>");
				$("#queueCodeNumber").prev("ul").prepend("<li>" + queueCodeNumber + "</li>");
			}else{
				$("#queueCodeNumber option").eq(index-1).after("<option value='"+ queueCodeNumber+"' selected>" + queueCodeNumber + "</option>");
				$("#queueCodeNumber").parent().find("ul > li").eq(index-1).after("<li>" + queueCodeNumber + "</li>");
//				console.log($("#queueCodeNumber").html());
//				console.log($("#queueCodeNumber").val() + ";;" + queueCodeNumber);
			}
			
//			$("#queueCodeNumber option[value='"+ queueCodeNumber + "']").attr("selected",true);
//			console.log($("#queueCodeNumber").val() + ";;" + queueCodeNumber);
			//队列代号不可选
			$("#queueCodeNumber").parent().find(".select-control").addClass("disabled");
			$("#queueCodeNumber").parent().find(".select-control > em").text(queueCodeNumber);
//			$("#queueCodeNumber").find("option[value='" + queueCodeNumber + "']").attr("selected","selected");
			
			//获取单个队列信息
			getTableList(queueLineId,"edit");
			isCheckAll(checkAllBtn,checkboxName);
			if($("#selectTables").hasClass("btn-disable")){
				$("#selectTables").removeClass("btn-disable");
			}
			if($("#showTables").is(":hidden")){
				$("#showTables").show();
			}
			$("#queue-new-con").show().attr("data-status","edit");
		});
	}else{
//		console.log("重置前:" + $("#queueCodeNumber").html());
		//重置队列代号
		resetQueueNum();
		var index = sortingLetter($("#queueCodeNumber option"),"value",queueCodeNumber);
//		console.log($("#queueCodeNumber").html());
//		console.log("index ==" + index);
		if(index == 0){
			$("#queueCodeNumber").prepend("<option value='"+ queueCodeNumber+"' selected>" + queueCodeNumber + "</option>");
			$("#queueCodeNumber").prev("ul").prepend("<li>" + queueCodeNumber + "</li>");
		}else{
			$("#queueCodeNumber option").eq(index-1).after("<option value='"+ queueCodeNumber+"' selected>" + queueCodeNumber + "</option>");
			$("#queueCodeNumber").parent().find("ul > li").eq(index-1).after("<li>" + queueCodeNumber + "</li>");
//			console.log($("#queueCodeNumber").html());
//			console.log($("#queueCodeNumber").val() + ";;" + queueCodeNumber);
		}
		
//		$("#queueCodeNumber option[value='"+ queueCodeNumber + "']").attr("selected",true);
//		console.log($("#queueCodeNumber").val() + ";;" + queueCodeNumber);
		//队列代号不可选
		$("#queueCodeNumber").parent().find(".select-control").addClass("disabled");
		$("#queueCodeNumber").parent().find(".select-control > em").text(queueCodeNumber);
//		$("#queueCodeNumber").find("option[value='" + queueCodeNumber + "']").attr("selected","selected");
		
		//获取单个队列信息
		getTableList(queueLineId,"edit");
		isCheckAll(checkAllBtn,checkboxName);
		if($("#selectTables").hasClass("btn-disable")){
			$("#selectTables").removeClass("btn-disable");
		}
		if($("#showTables").is(":hidden")){
			$("#showTables").show();
		}
		$("#queue-new-con").show().attr("data-status","edit");
	}

	
	
}


function getQueueCount(obj){
	var queueCount=0;
	$.ajax({
			type:"POST",
			url:"commercial/queueConfig/queue",
			data:"queueLineId="+ obj + "&random=" + Math.random(),
			dataType:"json",
			contentType: "application/x-www-form-urlencoded;charset=UTF-8", 
			async:false,
			cache:false,
			success:function(data){
				if(data.count>0){
					queueCount= data.count;
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				promptMessage("网络异常，请检查网络连接状态！");
		    },
	});
	return queueCount;
}


//删除队列
function deleteQueue(){

	//桌台代号 
	var queueCode = $("#queue-details .switching-tab li.current"),
	    queueCodeNumber = queueCode.attr("data-value"),
	    queueLineId = queueCode.attr("data-id"),
	    queueCodeTxt = queueCode.text(),
	    current = queueCode.index();
	//查看该队列是否有人在使用
	var queueCount=getQueueCount(queueLineId);
	if(queueCount > 0){
		Message.confirm({title: "提示",describe:"该队列正在排队中，此时删除会将队列下所有排队号清零。确认要继续删除吗？"},function(){
			//当前显示的div
			var queueCon = $("#queueDtlCon > div.current");
			//按字符顺序插入 
			if($("#queue-details .switching-tab li").length > 1){
				current = (current > 0) ? current-1 : current+1;
				
				$("#queue-details .switching-tab li").eq(current).addClass("current");
				$("#queueDtlCon > div").eq(current).addClass("current");
			}
			queueCode.remove();
			queueCon.remove();
			if($("#queue-details .switching-tab > li").length == 0){
				$(".queue-operation > a:gt(0)").hide();
			}
			//删除队列
			delQueue(queueLineId);
			noQueue();
			//删除后更新
			tabSwitchWrap($("#queue-details .switching-tab"));
			resetQueueNum();
			isQueueMax();
		});
	}else{
		Message.confirm({title:"删除队列",describe:"是否确认删除？"},function(){
			//当前显示的div
			var queueCon = $("#queueDtlCon > div.current");
			//按字符顺序插入 
			if($("#queue-details .switching-tab li").length > 1){
				current = (current > 0) ? current-1 : current+1;
				$("#queue-details .switching-tab li").eq(current).addClass("current");
				$("#queueDtlCon > div").eq(current).addClass("current");
			}
			queueCode.remove();
			queueCon.remove();
			if($("#queue-details .switching-tab > li").length == 0){
				$(".queue-operation > a:gt(0)").hide();
			}
			//删除队列
			delQueue(queueLineId);
			noQueue();
			//删除后更新
			tabSwitchWrap($("#queue-details .switching-tab"));
			resetQueueNum();
			isQueueMax();
		});
	}
}


function delQueue(obj){
		if(canSaveSubmit != true){
			return;
		}
		canSaveSubmit = false;
		$.ajax({
				type:"POST",
				url:"commercial/queueConfig/del",
				data:"queueLineId="+ obj + "&random=" + Math.random(),
				dataType:"json",
				contentType: "application/x-www-form-urlencoded;charset=UTF-8", 
				async:false,
				cache:false,
				success:function(data){
					canSaveSubmit = true;
					if(data == 'yes'){
						promptMessage("操作成功！");
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					canSaveSubmit = true;
					promptMessage("网络异常，请检查网络连接状态！");
			    },
		});	
}
//检查是否创建队列
function noQueue(){
	if($("#queue-details .switching-tab > li").length == 0){
		//隐藏编辑和删除
		$(".queue-operation > a:gt(0)").hide();
		$("#discontinuous").hide();
		//显示未创建
		$("#noQueue").show();
	}else{
		//显示编辑和删除
		$(".queue-operation > a:gt(0)").show();
		//隐藏未创建
		$("#noQueue").hide();
	}
}
//字母排序  返回应该插入的位置索引 @param items 要遍历的元素组 @param a 属性 @param num 当前的值
function sortingLetter(items,a,num){
	var arr = [],index;
	for(var i=0,len=$(items).length;i<len;i++){
		arr.push($(items).eq(i).attr(a));
	}
	arr.push(num);
	arr.sort();
	for(var j=0,len1=arr.length;j<len1;j++){
		if(arr[j] == num){
			index = j;
			break;
		}
	}
	return index;
	
}
//选择桌台按钮是否可用 
function enabledBtn($this){
	var value = ($this.val() == "") ? 0 : $this.val()*1,
		otherObj = ($this.attr("id") == "minimum") ? $("#largest"): $("#minimum"),
		otherValue = (otherObj.val() == "") ? 0 : otherObj.val()*1,
		selectBtn = $("#selectTables");
	//console.log("value == " + $("#minimum").val() + "\n otherValue == " + $("#largest").val());
	if($("#showTables").is(":visible")){
		$("#showTables").hide();
		//清空已选操作
		$("#showTables :checkbox").each(function(){
			if(this.checked){
				this.checked = false;
				$(this).parent().removeClass("checkbox-check");
			}
		});
	}
	if(value > 0 && selectBtn.hasClass("btn-disable")){
		selectBtn.removeClass("btn-disable");
	}else if(otherValue > 0 && selectBtn.hasClass("btn-disable")){
		selectBtn.removeClass("btn-disable");
	}else if(value <= 0 && otherValue <= 0 && !selectBtn.hasClass("btn-disable")){
		selectBtn.addClass("btn-disable");
	}
}
//重置队列弹框
function resetQueueCon(){
	clearData("#queue-new-con");
	$("#queueCodeNumber").parent().find(".select-control").removeClass("disabled");
	$("#queue-new-con").removeAttr("data-status");
//	$("#selectTables").addClass("btn-disable");
	$("#showTables").hide();
}


/**
 * 保存预计排队时长开关
 */
//canSaveSubmit
function expectQueueTimeSave(){
	var expectQueueOpenSpan = $("#expectQueueOpenSpan").css("display");//预计排队时长 状态
	var commercialExpectQueueTime = {};
	if(expectQueueOpenSpan != "none"){//表示预计排队时长不支持开启  也就是不能保存      也可以用expectTime这个来判断
		return;
	}else{//支持打开
		if($("#expectTime").attr("checked")){
			commercialExpectQueueTime.openStatus = 0;
		}else{//close
			commercialExpectQueueTime.openStatus = 1;
		}
		if(canSaveSubmit != true){
			return;
		}
		canSaveSubmit = false;
		$.ajax({
				type:"POST",
				url:"commercial/queueConfig/saveExpectQueue",
				data:$.toJSON(commercialExpectQueueTime) + "&random=" + Math.random(),
				dataType:"json",
				contentType: "application/json; charset=utf-8", 
				async:false,
				cache:false,
				success:function(data){
					canSaveSubmit = true;
					if(data.success){
						promptMessage("操作成功！");
					}else if (!data.success && data.failed){
						promptMessage("操作失败！数据非法！");
					}else{
						promptMessage("网络异常，请检查网络连接状态！");
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					canSaveSubmit = true;
					promptMessage("网络异常，请检查网络连接状态！");
			    },
		});	
	}
}
/**
 * 判断当前队列是否是最大队列
 */
function isQueueMax(){
	var queueCode = $("#queue-details .switching-tab li.current"),
    queueLineId = queueCode.attr("data-id");
	$.ajax({
	type:"POST",
	url:"commercial/queueConfig/checkIsMaxQueueLine",
	data:"queueLineId="+ queueLineId + "&random=" + Math.random(),
	dataType:"json",
	contentType: "application/x-www-form-urlencoded;charset=UTF-8", 
	async:false,
	cache:false,
	success:function(data){
		canSaveSubmit = true;
		if(data.success){
			$("#queueUpdate_a").show();
			$("#queueDel_a").show();
		}else{
			$("#queueUpdate_a").hide();
			$("#queueDel_a").hide();
		}
	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
		canSaveSubmit = true;
		promptMessage("网络异常，请检查网络连接状态！");
    },
});	
}



