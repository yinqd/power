var queryParameter="";
var pageQuery = new PageQuery("pageQuery"); //构建分页查询对象
pageQuery.pageQueryDataId = "tbody-1"; //设置数据表格的id
pageQuery.pageQueryToolId = "pageToolDiv"; //设置分页工具栏的id
pageQuery.showTotalPage = true;
pageQuery.showTotalRows=true;
$(function(){
	pageQuery.queryPage(1, loadData);
	//定义页面滚动瀑布式执行动作
	var canLoadSubmit2 = true; //防止重复提交查询，当该值为 true 时可以提交，否则不可提交
});

//查询数据
function loadData(){
	console.debug(queryParameter);
	queryParameter ={startTime:$(".data_bean").attr("startTime")
					,endTime:$(".data_bean").attr("endtime")
					,dishId:$(".data_bean").attr("dishId")
					//,dishId:'289b193ae0c811e3a12224f973555197'
					//,commercialId:'810000307'
					,commercialId:$(".data_bean").attr("commercialId")
					,currentPage:pageQuery.currentPage 
					,pageSize:pageQuery.pageSize};
	$.ajax({
		type: "POST",
		url: ctxPath+"/report/foodback/queryDetail",
		data: queryParameter,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		//async: false,
		cache: false,
		beforeSend:bkeruyun.showLoading,
		success : function(data) {
			bkeruyun.hideLoading();
			$("table tbody").empty();
			var html=[];
			//totalPage=data.totalPage;
			pageQuery.totalRows = data.totalRows;
			pageQuery.lastPage = (pageQuery.lastPage == null ? 1 : pageQuery.currentPage);
			var items=data.items;
			if(items== null ||items.length==0){
				$("tbody").append(html.join(""));
			}
			for(var i=0;i<items.length;i++){
					html[html.length]='<tr><td>'+(items[i].backTime==null?'-':items[i].backTime)+'</td>'
	                +'<td>￥'+(items[i].dishPrice==null?'-':items[i].dishPrice)+'</td>'
	                +'<td>'+(items[i].dishCount==null?'-':items[i].dishCount)+'</td>'
	                +'<td>'+(items[i].orderCode==null?'-':items[i].orderCode)+'</td>'
	                +'<td>'+(items[i].orderType==1?'堂食':'外卖')+'</td>'
	                +'<td>'+(items[i].orderTime==null?'-':items[i].orderTime)+'</td>'
	                +'<td>'+((items[i].customerName==null||items[i].customerName=='')?'-':items[i].customerName)+'</td>'
	                +'<td>'+((items[i].customerMobile==null||items[i].customerMobile=='')?'-':items[i].customerMobile)+'</td>'
	                +'<td>'+(items[i].tableName==null?'-':items[i].tableName)+'</td>'
	                +'<td>'+(items[i].operatorName==null?'-':items[i].operatorName)+'</td></tr>';
			}
			$("tbody").append(html.join(""));
			pageQuery.afterQuery();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			bkeruyun.hideLoading();
	        alert("网络异常，请检查网络连接状态！");
	    }
	});
}
