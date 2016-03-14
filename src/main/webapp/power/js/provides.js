function getRootPath(){
	var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}
function queryButtons(){
	
	$.ajax({
        type: "POST",
        url: getRootPath() + "/button/queryButtons.action",
        data: {},
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        cache: false,
        //beforeSend:bkeruyun.showLoading,
        success: function(data){
        	if(data != null){
        		$.each(data , function(i , d){
//        			private String buttonTagAttr;
//        			private String buttonNameAttr;
//        			private String buttonValueAttr;
        			$.each($(d.buttonTagAttr + "[name="+d.buttonNameAttr+"]") , function(j , tag){
        				tag.show();
        			})
        		});
        	}
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //bkeruyun.hideLoading();
            alert("网络异常，请检查网络连接状态！");
        }

    });

}

queryButtons();