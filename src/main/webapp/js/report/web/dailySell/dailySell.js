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
   iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数 
   return iDays ;
}

//查询数据
function loadData(){
	var start = $("#date-end");
	if(!start.val()){
		$("#date-end").val($("#date-start").val());
	}
	
	var days = getDays($("#date-end").val(),$("#date-start").val());
	if(days>30){
		Message.alert({title:'提示',describe:'开始时间和结束时间不能跨度31天'});
		return ;
	}
	
	var queryParameter=$("#queryForm").serialize()+"&queryType="+queryType;
	//alert(queryParameter);
	$.ajax({
		type: "POST",
		url: "report/dailySell/dailySellList",
		data: queryParameter,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
//		async: false,
		cache: false,
		beforeSend:bkeruyun.showLoading,
		success: function(data){
			bkeruyun.hideLoading();
			var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧！");
			if(data==null){
				if ($("#cialDetailTb").parent().find(".notSearchContent").length > 0) {
					$("#cialDetailTb").hide();
					$("#cialDetailTb").parent().find(".notSearchContent").show();
				} else {
					$("#cialDetailTb").hide();
					$("#cialDetailTb").parent().append(notData);
				}
				return ;
			}
			$("#cialDetailTb").html("");
			$("#cialDetailTb").show();
			$("#cialDetailTb").parent().find(".notSearchContent").hide();
			var tableSub = '<thead>'+
            '<tr id="firstTitle">'+
	            '</tr>'+
	            '<tr id="secondTitle">'+
	            '</tr>'+
	        '</thead>'+
	        '<tbody id="body_data">'+
	        '</tbody>'+
	        '<tfoot>'+
	            '<tr id="countData">'+
	            '</tr>'+
	            '<tr id="priveligeData">'+
	            '</tr>'+
	        '</tfoot>';
			$("#cialDetailTb").append(tableSub);
			var countArr=new Array();
			var privilegeArr =new Array();
			//totalPage=data.totalPage;
			var changeCode = "";
			var changeName = "";
			if(queryType==1){
				changeCode = "商品编码";
				changeName= "商品名称";
			}else{
				changeCode="类别编码";
				changeName = "类别名称";
			}
			
			//获取标题数据
			var titleList = data.titleList;
			
			var firstTitle = $("#firstTitle");
			var secondTitle = $("#secondTitle");
			
			//生成标题
			for(var i=0;i<titleList.length;i++){
				if(i==0){
					 var basicTitle = '<th rowspan="2" width="100" id="changeCode">'+changeCode+'</th>'+
	                    '<th rowspan="2" width="120" id="changeName">'+changeName+'</th>'+
	                    '<th colspan="3" width="150">小计</th>';
					 firstTitle.append(basicTitle);
				}
				var titleDate = '<th colspan="3" width="150">'+titleList[i]+'</th>';
				firstTitle.append(titleDate);
				var precentTitle = '<th width="50">数量</th>'+
                '<th width="50">金额</th>'+
                '<th width="50">占比</th>';
				secondTitle.append(precentTitle);
				if(i==0){
					secondTitle.append(precentTitle);
				}
			}

			//生成表格数据 静态表头的数据 小计 部分
			var basicList = data.basicList;
			
			var body_data = $("#body_data");
			for(var i=0;i<basicList.length;i++){
				var obj = basicList[i];
				if(i==(basicList.length-2)){
					countArr.push(obj);
					continue;
				}
				if(i==(basicList.length-1)){
					privilegeArr.push(obj.actualAmount);
					continue;
				}
				
				var basicRow = '<tr id='+obj.skuUuid+'>'+
			                 '<td >'+obj.dishId+'</td>'+
			                 '<td>'+obj.skuName+'</td>'+
			                 '<td>'+obj.quantity+'</td>'+
			                 '<td>'+obj.actualAmount+'</td>'+
			                 '<td>'+obj.precent+'</td>'+
		                 '</tr>';
				body_data.append(basicRow);
				 
			}
			
			//生成表格动态数据 按日期
			var dailyData = data.dailyData;
			for(var j=0;j<dailyData.length;j++){
				var everyData = dailyData[j];
				//每日的一行数据
				var dailyList = everyData.dailyList;
				for(var i=0;i<dailyList.length;i++){
					var daily = dailyList[i];
					if(i==(dailyList.length-2)){
						
						countArr.push(daily);
						continue;
					}
					if(i==(dailyList.length-1)){
						privilegeArr.push(daily.actualAmount);
						continue;
					}
					var uuid = daily.skuUuid;
					var tr = $("#"+uuid);
					var dataRow =  '<td>'+daily.quantity+'</td>'+
					                 '<td>'+daily.actualAmount+'</td>'+
					                 '<td>'+daily.precent+'</td>';
					
					tr.append(dataRow);
				}
				//如果没有数据项目的进行表格td填充
				var tdCount = (j+1)*3+5;
				var dailyBody = $("#body_data").find("tr");
				for(var k=0;k<dailyBody.length;k++){
					var trObj = dailyBody[k];
					var tds = $(trObj).find("td");
					if(tds.length<tdCount){
						var tdFill = '<td>0.00</td>'+
		                 '<td>0.00</td>'+
		                 '<td>0.00%</td>';
						$(trObj).append(tdFill);
					}
				}
			}
			
			//合计
			var td = "<td>&nbsp;</td><td>合计</td>";
			for(var i=0;i<countArr.length;i++){
				var countObj = countArr[i];
				td +=  '<td>'+countObj.quantity+'</td>'+
                '<td>'+countObj.actualAmount+'</td>'+
                '<td>'+countObj.precent+'</td>';
			}
			$("#countData").append(td);
			//总折扣额 
			var privihtml="<td>&nbsp;</td><td>总折扣额</td>";
			for(var i=0;i<privilegeArr.length;i++){
				var privilege = privilegeArr[i];
				privihtml+='<td colspan="3">'+privilege+'</td>'
			}
			$("#priveligeData").append(privihtml);
//			fillTdIsEmpty(titleList.length)
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			bkeruyun.hideLoading();
	        alert("网络异常，请检查网络连接状态！");
	    }
		
	});
}

function fillTdIsEmpty(titleLength){
	
}

function changeType(typeQuery){
	queryType = typeQuery;
}


