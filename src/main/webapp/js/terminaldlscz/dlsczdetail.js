/**
 *add by fut
 * 2015/08/10
 * */
var queryType = 1;
var pageQuery = new PageQuery("pageQuery"); //构建分页查询对象
pageQuery.pageQueryDataId = "tbody-1"; //设置数据表格的id
pageQuery.pageQueryToolId = "pageToolDiv"; //设置分页工具栏的id
pageQuery.showTotalPage = true;
pageQuery.showTotalRows=true;

function doQuery(){
    pageQuery.currentPage = 1;
    pageQuery.queryPage(1, loadData);
}


//查询数据
function loadData(){
    var datestart = $("#date-start").val();
    var commercialId = $("#commercialId").val();
    if(!datestart){
        Message.alert({title:"提示",describe:"开始时间必须选择"},Message.display);
        return;
    }
    var endstart = $("#date-end").val();
    if(!endstart){
        $("#date-end").val(datestart);
        if(window.JPlaceHolder){
            $(endstart).parent(".placeholderBox").find(".holder").hide();
        }

    }
  //如果没选,就加全部
	if($("#commercialIds").val()==""){
		$("#commercialIds").val($("#cacheAll").val());
	}
    $("#checkAll").removeAttr("checked");
    var queryParameter=$("#queryForm").serialize()+"&pageIndex="+pageQuery.currentPage +  "&paeCount=" + pageQuery.pageSize;
    //alert(queryParameter);
    $.ajax({
        type: "POST",
        url: ctxPath + "dlscz/queryDlsczList.action",
        data: queryParameter,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        cache: false,
        //beforeSend:bkeruyun.showLoading,
        success: function(data){
            //bkeruyun.hideLoading();
        	var html="";
            //totalPage=data.totalPage;
            $("#tatalDlscz").html(data.totalCzbzj);
            pageQuery.totalRows = data.recordCount;
            pageQuery.lastPage = (pageQuery.lastPage == null ? 1 : pageQuery.currentPage);
            var items = data.data;
            var obj;
            if(items.length != 0){
            	for(var i=0;i<items.length;i++){
                    obj=items[i];
                    html+='<tr>';
                    html+= '<td align="center">'+(i + 1)+'</td>';
                    html+='<td>'+obj.agentId+'</td>';
                    html+='<td>'+obj.agentName+'</td>';
                    html+='<td>'+obj.operateDate+'</td>';
                    html+='<td>'+obj.czbzj+'</td>';
                    html+='<td>'+obj.nodeNo+'</td>';
                    html+='<td>'+obj.operateId+'</td>';
                    html+='</tr>';

                }
                dlscztotal = "<tr><td align='center' colspan='4'>总计：</td><td colspan='3' align='center'>" + data.totalCzbzj + "</td></tr>";
                html = html + dlscztotal;
                $("#tbody-1").html(html); 
                pageQuery.afterQuery();
            }else{
            	$("#tbody-1").html(dlscztotal = "<tr><td align='center' colspan='7'>没有符合条件的统计数据</td></tr>"); 
            }
            
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //bkeruyun.hideLoading();
            alert("网络异常，请检查网络连接状态！");
        }

    });
}


function changQueueType(){
    $('#queryForm')[0].reset();
    doQuery();
}
