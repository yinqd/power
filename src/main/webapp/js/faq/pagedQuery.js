/**
 *   分页相关JS
 */
//当前页
var currentPage = 1; 

//查询参数
var queryParameter = "";

//总页数，查询时候会更新
var totalPage = 1;// 总页数

//初始页数，当前页-初始页判断鼠标下滑加载了多少页，
var initialisePage =1;

//鼠标下滑事件最多加载多少页
var preLoadingPageSize = 5;

//分页条显示多少页
var showPageSize = 8; 

//查询第pageid页
function doQuery(pageid) {
	
	if(pageid<1||pageid>totalPage)
		return;
	
	loadImage();
	
	currentPage = pageid;
	initialisePage = currentPage;
	
	//参数
	queryParameter = $("#formA").serialize() + "&currentPage="
			+ currentPage;
	
	
	//刷新式查询
	queryList(true);
	
	/*var childs = $(".paging").find("a");
	$.each(childs, function(i,item){
		var text = $(item).text();
		alert(text);
		var cssClass = $(item).attr("class");
		if (cssClass == "current") {
			//var pageIndex = $(item).html();
			$(item).removeClass();
		}
		if (text == pageid) {
			$(item).addClass("current");
		}
	});*/
	
	//右边滚动条回到顶部
//	scroll(0,0);
	
}

//滚动加载
//function flow(){//alert(0);
//		function scroll(){
//			var scrollTop = $(document).scrollTop();
//			var wH = $(window).height();
//			var dH = $(document).height() - 50;
//			//当滚动条快到底部的时候加载
//			if(scrollTop + wH > dH ){
//				//加载数据
//				doLoadMore();
//				
//			}
//			window.onscroll =scroll; 
//		}
//		window.onscroll =scroll; 
//}
////加载数据，如果已经加载足够了则不再加载
//function doLoadMore(){
//	if(currentPage<totalPage && currentPage - initialisePage < 5){
//		loadImage();
//		currentPage=currentPage+1;
//		queryParameter = $("#formA").serialize() + "&currentPage="+currentPage;
//		//追加式查询
//		queryList(false);
//	}
//	
//}
//上一页
function prePage(){
	if(currentPage>1){
		loadImage();
		
		currentPage = currentPage -1;
		initialisePage = currentPage;
		queryParameter = $("#formA").serialize() + "&currentPage="+currentPage;
		queryList(true);
//		scroll(0,0);
	}
}
//下一页
function nextPage(){
	if(currentPage<totalPage){
		loadImage();
		
		currentPage = currentPage +1;
		initialisePage = currentPage;
		queryParameter = $("#formA").serialize() + "&currentPage="+currentPage;
		queryList(true);
//		scroll(0,0);
	}
}

//刷新显示分页条
function showpanel(){
	//只有一页不显示分页条
	if(totalPage<=1) {
		$(".paging").empty();
		return ;
	}
	var html = [];
	//总页数小于设置显示条数
	if(totalPage<=showPageSize){
		if(currentPage != 1){
			html[html.length] = '<a href="javascript:void(0);" class="prev" onclick="prePage()">&lt;</a>';
		}
		for(var i=1;i<=totalPage;i++){
			if(i==currentPage){
				html[html.length] = '<a href="javascript:void(0);" class="current" >'+i+'</a>';
			}else{
				html[html.length] = '<a href="javascript:void(0);" onclick="doQuery('+i+')">'+i+'</a>';
			}
		}
		if(currentPage < totalPage){
			html[html.length] = '<a href="javascript:void(0);" class="next" onclick="nextPage()">&gt;</a>'
		}
	}
	else{
		if(currentPage <= showPageSize){
			if(currentPage != 1){
				html[html.length] = '<a href="javascript:void(0);" class="prev" onclick="prePage()">&lt;</a>';
			}
			for(var i=1;i<=showPageSize;i++){
				if(i==currentPage){
					html[html.length] = '<a href="javascript:void(0);" class="current" >'+i+'</a>';
				}else{
					html[html.length] = '<a href="javascript:void(0);" onclick="doQuery('+i+')">'+i+'</a>';
				}
			}
			if(currentPage < totalPage){
				html[html.length] = '<span>....</span>';
				html[html.length] = '<a href="javascript:void(0);" class="next" onclick="nextPage()">&gt;</a>'
			}
		}else{
			html[html.length] = '<a href="javascript:void(0);" class="prev" onclick="prePage()">&lt;</a>';
			html[html.length] = '<a href="javascript:void(0);" class="prev" onclick="doQuery(1)">1</a>';
			html[html.length] = '<a href="javascript:void(0);" class="prev" onclick="doQuery(2)">2</a>';
			html[html.length] = '<span>....</span>';
			
			for(var i=currentPage-1;i<=currentPage+1&&i<=totalPage;i++){
				if(i==currentPage){
					html[html.length] = '<a href="javascript:void(0);" class="current" >'+i+'</a>';
				}else{
					html[html.length] = '<a href="javascript:void(0);" onclick="doQuery('+i+')">'+i+'</a>';
				}
			}
			if(currentPage < totalPage){
				html[html.length] = '<span>....</span>';
				html[html.length] = '<a href="javascript:void(0);" class="next" onclick="nextPage()">&gt;</a>'
			}
			
		}
	}
	$(".paging").empty().append(html.join(""));
}

function loadImage() {
	var loadCss = $("#load_img").css("display");
	if (loadCss == "none") {
		$("#load_img").css("display","block");
	}
	
	$("#load_img").show();
}
