doQuery();
function doQuery(){
	$("#tbody-1").html(""); 
	post("../../agent/queryAgentList.action" , {} , loadData );
}
function loadData(data){
    var html="";
    var items = data.agent;
    var obj;
    if(items.length != 0){
    	for(var i=0;i<items.length;i++){
            obj=items[i];
            html+='<tr>';
            html+='<td style="display: none;"></td>';
            html+='<td align="center">'+(i + 1)+'</td>';
            html+='<td>'+obj.agentId+'</td>';
            html+='<td>'+obj.agentName+'</td>';
            html+='<td>'+obj.agentLinkman+'</td>';
            html+='<td>'+obj.agentAddr+'</td>';
            html+='<td>'+obj.nodeNo+'</td>';
            html+='<td>'+obj.operateDate+'</td>';
            html+='<td>'+obj.operateId+'</td>';
            html+='<td>'+obj.remark+'</td>';
            html+='</tr>';

        }
       // dlscztotal = "<tr><td align='center' colspan='4'>总计：</td><td colspan='3' align='center'>" + data.totalCzbzj + "</td></tr>";
      //  html = html + dlscztotal;
        $("#tbody-1").html(html); 
    }else{
    	$("#tbody-1").html(dlscztotal = "<tr><td align='center' colspan='8'>没有符合条件的统计数据</td></tr>"); 
    }
    

}
function post(url , params , callback){
	$.ajax({
        type: "POST",
        url: url,
        data: {},
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        cache: false,
        //beforeSend:bkeruyun.showLoading,
        success: function(data){callback(data)},
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //bkeruyun.hideLoading();
            alert("网络异常，请检查网络连接状态！");
        }

    });
}

$("#btnSaveEnd").on("click" , function(){
	post("../../agent/saveAgent.action",$("#form1").serialize(),suc);
});

function suc(data){
	
}
