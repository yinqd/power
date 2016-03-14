/**
 * 
 */
//(function() {
	var pageQuery = new PageQuery("pageQuery"); //构建分页查询对象
	pageQuery.pageQueryDataId = "video-items"; //设置数据表格的id
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
		var params = formParameters + "&" + pageQuery.getPageParameter(true);
		$.ajax({
			type: "POST",
			url: "faq/video/querryList?t="+new Date().getTime(),
			data: params,
			dataType: "json",
//			async: false,
			cache: false,
			beforeSend:showLoading,
			success: function(data){
				hideLoading();
				pageQuery.totalRows = data.totalRows;
				pageQuery.lastPage = (pageQuery.lastPage == null ? 1 : pageQuery.currentPage);
				var html=[];
				totalPage=data.totalPage;
				var items=data.items;
				var obj;
				for(var i=0;i<items.length;i++){
	                obj=items[i];
	                html[html.length]='<li>';
	                html[html.length]='<a href="faq/video/play?id='+obj.id+'">';
	                html[html.length]='<div class="item-main">';
	                html[html.length]='<img src="'+obj.imgUrl+'"/>';
	                html[html.length]= '<h3>'+obj.videoName+'</h3>';
	                html[html.length]='<div class="item-layer-1"></div>';
	                html[html.length]='<div class="item-layer"></div>';
	                html[html.length]='</div>';
	                html[html.length]='<p class="video-introduction">'+obj.introduction+'</p>';
	                html[html.length]='<p class="video-time"><span>时长：</span>'+obj.videoLen+'</p>';
	                html[html.length]='</a>';
	                html[html.length]='</li>';
				}

				$("#video-items").empty();

				$("#video-items").append(html.join(""));

//				if (currentPage >= totalPage) {
//					//$("#loading-more").hide();
//					$(".loading").hide();
//				} else {
//					// ajax请求结束
//					//$("#loading-more").show();
//					$(".loading").hide();
//				}
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
	}
//});

function loadImage() {
	var loadCss = $("#load_img").css("display");
	if (loadCss == "none") {
		$("#load_img").css("display","block");
	}
	
	$("#load_img").show();
}
//Ajax查询视频信息数据 
//function queryList(isClearOldData){
//	$(".loading").ajaxStart(function(){
//		   $(this).show();
//	});
//	
//	$.ajax({
//		type: "POST",
//		url: "faq/video/querryList?t="+new Date().getTime(),
//		data: queryParameter,
//		dataType: "json",
//		async: false,
//		cache: false,
//		success: function(data){
//			var html=[];
//			totalPage=data.totalPage;
//			var items=data.items;
//			var obj;
//			for(var i=0;i<items.length;i++){
//                obj=items[i];
//                html[html.length]='<li>';
//                html[html.length]='<a href="faq/video/play?id='+obj.id+'">';
//                html[html.length]='<div class="item-main">';
//                html[html.length]='<img src="'+obj.imgUrl+'"/>';
//                html[html.length]= '<h3>'+obj.videoName+'</h3>';
//                html[html.length]='<div class="item-layer-1"></div>';
//                html[html.length]='<div class="item-layer"></div>';
//                html[html.length]='</div>';
//                html[html.length]='<p class="video-introduction">'+obj.introduction+'</p>';
//                html[html.length]='<p class="video-time"><span>时长：</span>'+obj.videoLen+'</p>';
//                html[html.length]='</a>';
//                html[html.length]='</li>';
//			}
//			if(isClearOldData){
//				$("#video-items").empty().append(html.join(""));
//			}else{
//				$("#video-items").append(html.join(""));
//			}
//			
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
