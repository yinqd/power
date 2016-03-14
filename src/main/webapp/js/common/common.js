$(function(){
	buildUnitSelect();
	buildOperSelect();
});
function buildOperSelect(){
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
