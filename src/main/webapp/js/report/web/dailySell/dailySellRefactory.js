var queryType = 1;
function getDays(strDateStart,strDateEnd){
   var strSeparator = "-"; //日期分隔符
   var oDate1;
   var oDate2;
   var iDays;
   oDate1= strDateStart.split(strSeparator);
   oDate2= strDateEnd.split(strSeparator);
   var strDateS = new Date(oDate1[0] + "-" + oDate1[1] + "-" + oDate1[2]);
   var strDateE = new Date(oDate2[0] + "-" + oDate2[1] + "-" + oDate2[2]);
   iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24);//把相差的毫秒数转换为天数 
   return iDays ;
}

function getCondition(){
	var start = $("#date-end");
	if(!start.val()){
		$("#date-end").val($("#date-start").val());
	}
	
	var days = getDays($("#date-end").val(),$("#date-start").val());
	if(days>30){
		Message.alert({title:'提示',describe:'开始时间和结束时间不能跨度31天'});
		return 1;
	}
	var trade_type_array=new Array();  
	$("#trade_type").find(".checkbox-check > input").each(function(){  
		trade_type_array.push($(this).val());//向数组中添加元素  
	});  
	var trade_types=trade_type_array.join(',');//将数组元素连接起来以构建一个字符串
	
	var delivery_type_array=new Array();  
	$("#delivery_type").find(".checkbox-check > input").each(function(){  
		delivery_type_array.push($(this).val());//向数组中添加元素  
	});  
	var delivery_types=delivery_type_array.join(',');//将数组元素连接起来以构建一个字符串
	
	var source_array=new Array();  
	$("#source").find(".checkbox-check > input").each(function(){  
		source_array.push($(this).val());//向数组中添加元素  
	});  
	var sources=source_array.join(',');//将数组元素连接起来以构建一个字符串
	
	var queryParameter=$("#queryForm").serialize()+"&queryType="+queryType+"&trade_type="+trade_types+"&delivery_type="+delivery_types+"&source="+sources;

	return queryParameter;
}
//缓存查询日期
function setDatePicker(){
	var now = new Date().Format("yyyy-MM-dd");
	var $dateStart=$('#date-start');
	var $dateEnd=$('#date-end');
	if($dateStart){
		var dateStart=$dateStart.val();
		if(!dateStart){
			dateStart=now;
			$dateStart.val(now);
		}
		sessionStorage.setItem('dateStartMonth',dateStart);
	}

	if($dateEnd){
		var dateEnd=$dateEnd.val();
		if(!dateEnd){
			dateEnd=now;
			$dateEnd.val(now);
		}
		sessionStorage.setItem('dateEndMonth',dateEnd);
	}
};

//查询数据
function loadData(){
	var queryParameter=getCondition();
	if(queryParameter==1){
		return;
	}
	//缓存日期
	setDatePicker();
	$.ajax({
		type: "POST",
		url: "report/dailySellReFactory/dailySellList",
		data: queryParameter,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
//		async: false,
		cache: false,
		beforeSend:bkeruyun.showLoading,
		success: function(data){
			bkeruyun.hideLoading();
			
		    var table = $('<table id="gridDaily"></table>');
			jQuery("#tableContainer").html("");
			jQuery("#tableContainer").append(table);
			if(data==null||data.titleList==null){
				$("#gridDaily").hide();
				var notData = bkeruyun.notQueryData('没有查询到数据，换个条件试试吧！');
				$(".panel-body").html(notData);
				return false;
			}
			//获取标题数据
			var titleList = data.titleList;
			
			var titles = new Array();
			var titleFileds = new Array();
			var titleGroups = new Array();
			if(queryType==2){
				titles.push("大类编码");
				titles.push("大类名称");
			} else if (queryType==3){
				titles.push("中类编码");
				titles.push("中类名称");
			} else {
				titles.push("商品编码");
				titles.push("商品名称");
			}
			titles.push("数量");
			titles.push("金额");
			titles.push("占比");
			//var  id = {name: 'id', index: 'invdate', width: 10, align: 'center',hidden:true,frozen:true,sortable:false};
			var  changeCode = {name: "dishCode", index: 'tax', width: 110,  align: 'center',frozen:true,sortable:false};
			var  changeName = {name: "skuName", index: 'tax', width: 110,align: 'center',frozen:true,sortable:false};
			
			
			//titleFileds.push(id);
			titleFileds.push(changeCode);
			titleFileds.push(changeName);
			
			var  quantity = {name: "quantity", index: 'tax', width: 110,  align: 'center',sortable:false};
			var  actualAmount = {name: "actualAmount", index: 'tax', width: 110, align: 'center',sortable:false};
			var  precent = {name: "precent", index: 'tax', width: 110,align: 'center',sortable:false};
			
			titleFileds.push(quantity);
			titleFileds.push(actualAmount);
			titleFileds.push(precent);
			var  megerTitle = 
			{startColumnName: 'quantity', numberOfColumns: 3, titleText: '<em style="padding-left:100px;">小计</em>'};
			titleGroups.push(megerTitle);
			
			//生成标题
			for(var i=0;i<titleList.length;i++){
				
				
				titles.push("数量");
				titles.push("金额");
				titles.push("占比");
				
				var  quantityNext = {name: "quantity"+titleList[i], index: 'tax', width: 110,align: "center",sortable:false};
				var  actualAmountNext = {name: "actualAmount"+titleList[i], index: 'tax', width: 110, align: "center",sortable:false};
				var  precentNext = {name: "precent"+titleList[i], index: 'tax', width: 110, align: "center",sortable:false};
				
				titleFileds.push(quantityNext);
				titleFileds.push(actualAmountNext);
				titleFileds.push(precentNext);
				
				var  megerTitleSig = 
				{startColumnName: 'quantity'+titleList[i], numberOfColumns: 3, titleText: '<em style="padding-left:100px;">'+titleList[i]+'</em>'};
				titleGroups.push(megerTitleSig);
				
				
			}
			//生成表格数据 静态表头的数据 小计 部分
			var basicList = data.basicList;
			//生成grid表格
			createDailyTable(titles,titleFileds,titleGroups );
			
			 

			
			var gridDaily = jQuery("#gridDaily");
			var flag = true;
			for(var i=0;i<basicList.length;i++){
				
				var basic = basicList[i];
				if(basic.spice==2 && flag){
					//var dataSigle = {skuName:"<font color='red'>配料类别</font>"};
					//gridDaily.jqGrid("addRowData",-1,dataSigle);
				}
				gridDaily.jqGrid("addRowData",i,basic);
			}
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			bkeruyun.hideLoading();
	        alert("网络异常，请检查网络连接状态！");
	    }
		
	});
}

/**
 * 创建显示 表格
 * @param titles 显示的标题
 * @param titleFileds 列的字段
 * @param titleGroups 列分组的字段
 */
function createDailyTable(titles,titleFileds,titleGroups,basicList ){
	 jQuery("#gridDaily").jqGrid({
	     url:'',
	     datatype: "json",  
	     colNames: titles,
	     colModel: titleFileds,
	     //rowNum:10,
	     sortname: 'invdate',
	     viewrecords: true,
	     sortorder: "desc",
//	     data:basicList,
	    jsonReader: {
	      repeatitems : false
	    },
	   // caption: "Group Header",
	    width: 800,
	    shrinkToFit:false,
	    height: '600',
	    gridComplete:function(){
	    	bkeruyun.resetFrozenStyle();
	    }
	  });
	  jQuery("#gridDaily").jqGrid('setGroupHeaders', {
	   // useColSpanStyle: false, 
	    groupHeaders:titleGroups  
	  });
	  jQuery("#gridDaily").jqGrid('setFrozenColumns');
}


function changeType(){
	queryType = $("#analysisSelect").val();
	//alert($("#analysisSelect").val());
}

 function excelclick(){
 	var rows = jQuery("#gridDaily").jqGrid("getRowData");
 	
	if(rows!=null&&rows.length>0){
		var url = "report/dailySellReFactory/downDailyReport";
		var url2= null;
		var method = "post";
		var data = getCondition();
		download1(url,data,method,url2);
	}else{
		alert("暂无数据可以导出");
	}
	
}

