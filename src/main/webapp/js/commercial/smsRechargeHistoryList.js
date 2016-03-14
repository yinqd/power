var pageQuery = new PageQuery("pageQuery"); //构建分页查询对象
$(function(){
	var startObj = $("#disheTimeStart"),
    endObj = $('#disheTimeEnd');
	var today = new Date().Format("yyyy-MM-dd");
	startObj.attr("data-date-endDate",today);
	endObj.attr("data-date-endDate",today);
		
	query();
});

pageQuery.pageQueryToolId = "pageToolDiv"; //设置分页工具栏的id
pageQuery.showTotalPage = true;
pageQuery.showTotalRows= true;

var formData = "";
function query() {
	formData = buildParams(formData);
	pageQuery.queryPage(1, loadData);
}

// 数据来源未处理，待定
function buildParams(formData) {
	formData = serializeFormById("queryForm");
	return formData;
}

function loadData() {
	var params = formData + "&" + pageQuery.getPageParameter(true);
	$.ajax({
		type:"POST",
		url:"smsReHistory/listData",
		data:params + "&random=" + Math.random(),
		dataType:"json",
		cache: false,
//		async: false,
		beforeSend:bkeruyun.showLoading,
		success:function(data) {
			bkeruyun.hideLoading();
//			console.debug(data);
			pageQuery.totalRows = data.totalRows;
			pageQuery.lastPage = (pageQuery.lastPage == null ? 1 : pageQuery.currentPage);
			var items = data.items;
			var trHtml = "<tr>";
			for (var i = 0; i < items.length; i++) {
				trHtml +=
						"<td>" + (items[i].rechargetype == 0 ? "短信" : "IVR语音") + "</td>" +
						"<td>" + (items[i].transactionno==null? "-":items[i].transactionno)+"</td>" +
						"<td>" + (items[i].creatdatetime==null? "-":items[i].creatdatetime)+"</td>" +
						"<td>" + (items[i].amountpayable==null? "-":items[i].amountpayable)+"</td>" +
						"<td>" + (items[i].rechargecount==null? "-":items[i].rechargecount)+"</td>" +
						"<td>" + (items[i].surpluscount==null? "-":items[i].surpluscount)+"</td>" +
						"<td>" + (items[i].operator==null? "-":items[i].operator)+"</td>" +
						"</tr>";
			} 
			
			$("#today").empty();
			$("#today").append(trHtml);
			pageQuery.afterQuery();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			bkeruyun.hideLoading();
	        alert("网络异常，请检查网络连接状态！");
	    }
		
	});
}
function save(){
	var rechargeCount = $("#topupNum").val();//充值条数
	//如果有未填项返回
	if(rechargeCount==null||rechargeCount==""){
		$("#rechargeCountLabel").addClass("wrong");
		return;
	}
	var rechargeType;//类型
	var rechargeCount = $("#topupNum").val();//充值条数
	var topupTypeTrue = $("#topupTypeTrue").val();
	var amountPayable =$("#total").text();//充值金额
	if(topupTypeTrue=="2"){//ivr
		rechargeType=1;
	}else{
		rechargeType=0;
	}
	//encodeURIComponent(memoValue)
	//开始执行保存动作
	$("#smsidValue").val($("#smsid").val());
	$("#rechargetypeValue").val(rechargeType);
	$("#rechargecountValue").val(rechargeCount);
	$("#amountpayableValue").val(amountPayable);
//	var data = { 
//				smsid:$("#smsid").val(),
//				rechargetype : rechargeType,
//			    rechargecount: rechargeCount, 
//				amountpayable: amountPayable
//			   };
	Message.confirm({title:"提示",describe:"是否跳转到支付宝界面支付?<br/>当支付完成时,请勿关闭页面!"}, function() {
		$("#topupForm").submit();
	});

//	$.ajax({
//		type:"POST",
//		//url:"smsReHistory/save",
//		url:"aliapi/deposit",
//		data:$.toJSON(data)+ "&random=" + Math.random(),
//		dataType:"json",
//		contentType: "application/json; charset=utf-8", 
//		async:false,
//		cache:false,
//		success:function(data){
//				promptMessage("保存成功！");
//				$("#smsRecharge_surpluscount").html(data.surpluscount);
//				$("#smsRecharge_surplusivrcount").html(data.surplusivrcount);
//				$("#btn-cancel").click();
//				$("#topupTypeTrue").val("1");
//				query();
//		},
//		error: function(XMLHttpRequest, textStatus, errorThrown) {
//			promptMessage("网络异常，请检查网络连接状态！");
//	    },
//	});	
}

