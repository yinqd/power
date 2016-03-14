/**
 * 
 */
var pageQuery = new PageQuery("pageQuery"); //构建分页查询对象
pageQuery.pageQueryDataId = "tbody-1"; //设置数据表格的id
pageQuery.pageQueryToolId = "pageToolDiv"; //设置分页工具栏的id
pageQuery.showTotalPage = true;
pageQuery.showTotalRows= true;
var formParameters = "";
function doQuery() {
	loadImage();
	formParameters = serializeFormById("formA");
	pageQuery.queryPage(1, loadData);
}

function loadData() {
//	$(".loading").ajaxStart(function() {
//		$(this).show();
//	});
	window.scroll(0, 0);
	var params = formParameters + "&" + pageQuery.getPageParameter(true);
	$.ajax({
		type : "POST",
		url : "faq/question/querryList?t=" + new Date().getTime(),
		//data : queryParameter+"&selfquestion=1",
		data: params,
		dataType : "json",
		async : false,
		cache : false,
		beforeSend:showLoading,
		success : function(data) {
			hideLoading();
			pageQuery.totalRows = data.totalRows;
			pageQuery.lastPage = (pageQuery.lastPage == null ? 1 : pageQuery.currentPage);
			var html = [];
			totalPage = data.totalPage;
			var items = data.items;
			var obj;
			for (var i = 0; i < items.length; i++) {
				obj = items[i];
				html[html.length] = '<tr>';
				html[html.length] = '<td class="text-left">' + obj.typeName + '</td>';
				html[html.length] = '<td class="text-left">' + obj.questionName + '</td>';
				html[html.length] = '<td>' + (obj.viewCount||'0') + '</td>';
				html[html.length] = '<td><a href="" title="查看" class="icon-view" onclick="viewQuestion(this,' + obj.id
				+ ')">查看</a></td>';
				html[html.length] = '</tr>';
			}
			$("#tbody-1").html(html.join(""));
			pageQuery.afterQuery();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			hideLoading();
	        alert("网络异常，请检查网络连接状态！");
	    }
	});
	var loadCss = $("#load_img").css("display");
	if (loadCss == "block") {
		$("#load_img").css("display","none");
	}
	
	$("#load_img").hide();
	
//	showpanel();
	
}

//Ajax 查询问题数据 ,如果需要查询自己的，加上一个selfquestion参数，值任意
//function queryList(isClearOldData) {
//	$(".loading").ajaxStart(function() {
//		$(this).show();
//	});
//	$.ajax({
//		type : "POST",
//		url : "faq/question/querryList?t=" + new Date().getTime(),
//		//data : queryParameter+"&selfquestion=1",
//		data: queryParameter,
//		dataType : "json",
//		async : false,
//		cache : false,
//		success : function(data) {
//			var html = [];
//			totalPage = data.totalPage;
//			var items = data.items;
//			var obj;
//			for (var i = 0; i < items.length; i++) {
//				obj = items[i];
//				html[html.length] = '<tr>';
//				html[html.length] = '<td class="text-left">' + obj.typeName + '</td>';
//				html[html.length] = '<td class="text-left">' + obj.questionName + '</td>';
//				html[html.length] = '<td>' + (obj.viewCount||'0') + '</td>';
//				html[html.length] = '<td><a href="" title="查看" class="icon-view" onclick="viewQuestion(this,' + obj.id
//				+ ')">查看</a></td>';
//				html[html.length] = '</tr>';
//			}
//			if (isClearOldData) {
//				$("#tbody-1").empty().append(html.join(""));
//			} else {
//				$("#tbody-1").append(html.join(""));
//			}
//
//			if (currentPage >= totalPage) {
//				//$("#loading-more").hide();
//				$(".loading").hide();
//			} else {
//				// ajax请求结束
//				//$("#loading-more").show();
//				$(".loading").hide();
//			}
//		}
//	});
//	
//	var loadCss = $("#load_img").css("display");
////	alert(loadCss);
//	if (loadCss == "block") {
//		$("#load_img").css("display","none");
//	}
//	
//	$("#load_img").hide();
//	
//	showpanel();
//}

/**
 * Ajax查看单个问题
 * @param obj this,用来刷新浏览量
 * @param questionId 问题ID
 */
function viewQuestion(obj,questionId){
	$.ajax({
		type:"POST",
		url: "faq/question/showQuestion",
		data:"questionId=" + questionId + "&random=" + Math.random(),
		dataType:"json",
		async:false,
		cache:false,
		success:function(data){
			
			//动态刷新浏览量
			$(obj).parent().prev().html(data.viewCount);
			var typeHtml = "";
			if (data.parentTypeName != null && data.parentTypeName != '') {
				typeHtml = "问题分类：" + data.parentTypeName + "&gt;" + data.typeName;
			} else {
				typeHtml = "问题分类：" + data.typeName;
			}
			$("#question-type-time").empty();
			$("#question-type-time").html(typeHtml);
			$("#question-type-time").append("<span>上传时间：" + data.updateTime + "</span>");
			$("#question-title").html("<em>问：</em>"+data.questionName);
			$("#question-answer").html("<em>答：</em><textarea readonly=\"readonly\" style=\"border: 0;width:100%;height:300px\" >"+data.problemAns+"</textarea>");
			
			
//			if (currentPage >= totalPage) {
//				//$("#loading-more").hide();
//				$(".loading").hide();
//			} else {
//				// ajax请求结束
//				//$("#loading-more").show();
//				$(".loading").hide();
//			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
	       // alert(XMLHttpRequest.status);
	    },
	});	
	//doQuery(currentPage);
}

function loadImage() {
	var loadCss = $("#load_img").css("display");
	if (loadCss == "none") {
		$("#load_img").css("display","block");
	}
	
	$("#load_img").show();
}