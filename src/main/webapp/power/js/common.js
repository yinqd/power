/**
 * Created by reny on 2015/5/26.
 */

//获取客户端当前时间
function formatDate(time){
    return "20"+(time.year-100)+"-"+(time.month+1)+"-"+time.day+"  "+time.hours+":"+time.minutes+":"+time.seconds;
};

function formatDate2(time){
    var year=time.getFullYear();
    var month=time.getMonth();
    var day=time.getDate();
    var hours=time.getHours();
    var minutes=time.getMinutes();
    var seconds=time.getSeconds();
    return ""+year+"-"+month+"-"+day+"  "+hours+":"+minutes+":"+seconds+"";
};

function substring30(str){
    if(str&&str.length>30){
        return str.substring(0,30)+"...";
    }else{
        return str;
    }
};

//设置分页控件
function setPager(condition,callback) {
    var option=condition;
    var page=pager(option);
    $("#listPager").empty();
    $("#listPager").append(page);

    $("#listPager li a").on('click', function (e) {
        e.preventDefault();
        $(this).parent().addClass("active").siblings().removeClass('active');
        callback();
    });
};


/*initPage begin */
$(function(){
    Metronic.init(); // init metronic core components
    Layout.init(); // init current layout
    QuickSidebar.init(); // init quick sidebar
    Demo.init(); // init demo features
    
    //终端管理添加,修改
    $('.updateEnd').on('click', function () {
        $('#endModal').modal('show');
    });

});
/*initPage end */

$(function(){
	buildUnitSelect();
	buildOperSelect();
});
function buildOperSelect(){
	if($("#operatorId") == null){
		return;
	}
	$("#operatorId").empty();
			//获取权限商户
		    $.ajax({
		        type: "post",
		        async:false,
		        url: ctxPath + "/common/queryOperator.action",
		        success: function (cmJson) {
					var data=eval("(" + cmJson + ")");
					if(data.operator.length!=0){
						cmTypeItem = "<option value=''>全部</option>";;
			    		$(data.operator).each(function (i, v) {
			    			cmTypeItem += "<option value='" + v.operNo + "'>" + v.operName + "</option>";
			    		});
			    		$('#operatorId').html(cmTypeItem);
					}
		        }
		    });

    	}

function buildUnitSelect(){
	if($("#nodeNo") == null){
		return;
	}
	$("#nodeNo").empty();
	//获取权限商户
    $.ajax({
        type: "post",
        async:false,
        url: ctxPath + "/common/queryUnit.action",
        success: function (cmJson) {
			var data=eval("(" + cmJson + ")");
			if(data.unit.length==1){
				
			}else{
				cmTypeItem = "";
	    		$(data.unit).each(function (i, v) {
	    			
	    			if(i == 0){
	    				cmTypeItem += "<option value='" + v.nodeNo + "'>" + v.nodeName + "</option>";
	    			}else{
	    				cmTypeItem += "<option value='" + v.nodeNo + "'>" + v.nodeName + "</option>";
	    			}
	    		});
	    		$('#nodeNo').html(cmTypeItem);
			}
        }
    });

}

