//生成tablle的id索引
var indexFlag = 0;
var initGroupTableId = 0;
//当前操作的表格
var outterGridId;
//动态保存tableid
var tableIds = new Array();
var dataArray = [];
$(document).ready(function(){ 
	
});
$(function(){
    //初始化 树结构
    $("#tree").tree({
            'folding': true,
            'foldingType': 'single',
            'foldingSwitch':'.icon-folding',
            'marquee':true,
            'marqueeType':'radio'

        });
  //初始化 关联设置 做法 多标签滚动
  $("#category-tab").tabScroll({
        'wrapObj': $('#category-tab'),
        'innerObj': $('#category-tab > ul'),
        'innerObjLeft':20,
        'item':$('#category-tab > ul > li'),
        'itemN': 8,
        'itemMarginL':0,
        'itemMarginR':10,
        'itemPaddingL':10,
        'itemPaddingR':10,
        'moveItemN':8,
        'speed':1000
    });
  
    //套餐明细 添加分组
    $("#set-add").delegate(".icon-add","click",function(){
    	if($(".packageDetail-tab > li").length < 8){
    		 $("#popover-addGoodsGroup").show();
    	     bkeruyun.showLayer();
    	}else{
    		Message.alert({'title':'提示','describe':'您最多能够添加8个分组 '});
    	}
       
    });
    //套餐明细 编辑分组
    $("#set-add").delegate(".editor:not('.disabled')","click",function(){
        $("#popover-addGoodsGroup").show().attr("data-editor","editor");
        bkeruyun.showLayer();
        
        //分组编辑时候 设置对应的值
        var firstNameId = $("#firstNameId_"+initGroupTableId).val();
        var numStart = $("#numStart_"+initGroupTableId).val();
        var numEnd = $("#numEnd_"+initGroupTableId).val();
        var secondName = $("#secondName_"+initGroupTableId).val();
       
        //addGoodsFirstName addGoodsSecondName addStartPeople addEndPeople
        $("#addGoodsFirstName").val(firstNameId);
        $("#addGoodsSecondName").val(secondName);
        $("#addStartPeople").val(numStart);
        $("#addEndPeople").val(numEnd);
        
    });
    //套餐明细 删除分组
    $("#set-add").delegate(".delete:not('.disabled')","click",function(){
        var currentLi = $(".packageDetail-tab > li.current");
        var currentDiv = $("#"+currentLi.attr("data-show"));
        var currentLiTxt = currentLi.attr("data-name");

        
        Message.confirm({'title':'删除提示','describe':'确认删除 '+currentLiTxt+' 分组'},function(){
//            //显示下一分组
//            currentLi.next().click();
            //移除当前分分组
            currentLi.remove();
            currentDiv.remove();
            //当只有一个分组时 删除按钮致灰 不让操作
            if($(".packageDetail-tab > li").length == 1){
                $("#set-add .delete").addClass("disabled");
            }
          //当没有分组时 编辑按钮致灰 不让操作（起保险作用）
            if($(".packageDetail-tab > li").length == 0){
            	$("#set-add .delete").addClass("disabled");
                $("#set-add .editor").addClass("disabled");
            }
           

    	    var idIndex = "gridType_"+initGroupTableId;
    	    for(var i=0;i<tableIds.length;i++){
    	    	var id = tableIds[i];
    	    	if(id==idIndex){
    	    		tableIds.remove(i);
    	    		$("#"+id).remove();
    	    		break;
    	    	}
    	    }
    	   
    	    $("#firstNameId_"+initGroupTableId).remove();
    	    $("#numStart_"+initGroupTableId).remove();
    	    $("#numEnd_"+initGroupTableId).remove();
    	    $("#secondName_"+initGroupTableId).remove();
    	    outterGridId = tableIds[0];
    	    //默认第一个为当前页签
    	    $("#category-tab .packageDetail-tab > li").eq(0).click();
        });
    });
    //保存 分组
    $("#addGroupBtnSave").on("click",function(){
        // $("#form-addGoodsGroup").submit();
    	var minNum = $("#addStartPeople").val();
		var maxNum = $("#addEndPeople").val();
		if(!isEmpty(minNum) && !isEmpty(maxNum)&&parseFloat(maxNum)<parseFloat(minNum)){
			Message.alert({title:"提示",describe:"开始可选数必须小于等于结束可选数"},Message.display);
			return;
		}
        var flag = $("#form-addGoodsGroup").valid();
        var group = {'name':$.trim($("#addGoodsFirstName").val()),'numStart':$.trim($("#addStartPeople").val()),'numEnd':$.trim($("#addEndPeople").val()),'addGoodsSecondName':$.trim($("#addGoodsSecondName").val())};
//        var id = new Date()*1;

  	  /*  if (!$("#form-addGoodsGroup").valid()) {
  			return;
  		}*/
        if(flag){
        	if($("#popover-addGoodsGroup").attr("data-editor")){
        		//编辑
        		var rows = $("#"+outterGridId).jqGrid("getRowData");
        		jQuery(rows).each(function(){
        			var mustSelect=this.isReplace;
        			 var defualtSelect=this.isDefault;
        	         var leastCellNum =this.leastCellNum;
        	         if(mustSelect==1 || defualtSelect==1){
        	        	 startSellCount = startSellCount + leastCellNum*1;
        	         }
        	         
        	    });
        		var startSellCount=0;
        		var rows = $("#"+outterGridId).jqGrid("getRowData");
        		jQuery(rows).each(function(){
        			var mustSelect=this.isReplace;
        			 var defualtSelect=this.isDefault;
        	         var leastCellNum =this.leastCellNum;
        	         if(mustSelect==1 || defualtSelect==1){
        	        	 startSellCount = startSellCount + leastCellNum*1;
        	         }
        	         
        	    });
        		if(maxNum<startSellCount){
        			Message.alert({'title':'提示','describe':'最大值必须大于已勾选“默认”于“必选”起卖数之和'});
        			return;
        		}
        		saveEditGroup(group);
        	}else{
        		//新建
        		saveGroups(group);
        	}
        }
       
    });
    //显示编辑 删除
    bkeruyun.showMenu($("#set-add > li"),$("#set-add > li > ul"));
    //添加分组验证 初始化

    $("#form-addGoodsGroup").validate({
    	rules: {
            addGoodsFirstName: {required: true, isIllegalCharacter: true, maxlength: 48},
            addGoodsSecondName: {isIllegalCharacter: true, maxlength: 48},
			addEndPeople:{required: true, number: true, min: 0.01}
        },
        submitHandler: function () {
        }
    });

    //套餐明细页签切换
    bkeruyun.tab(".packageDetail-tab > li","click",'.packageDetail-con',"data-show","current");
    //点击选择商品按钮
    $("#chooseGoodsBtn").on("click",function(){
    	if(tableIds.length<=0){
    		Message.alert({'title':'提示','describe':'请先创建 套餐分组'});
    		return;
    	}
    	//清空jgrid表格
    	$("#gridType").jqGrid("clearGridData");
    	//清空已经选择的数据
    	$("#addGoodsCodeName").val("");
//    	$("#typeId").val("");
    	
        $("#popover-addGoods").show();
        bkeruyun.showLayer();
    });
    //选择商品 添加
    $("#addGroupBtn").on("click",function(){
        var selectedItemCheckboxs = $(":checkbox[name='goodsSelect']:checked");
        var len = len = selectedItemCheckboxs.length;
        var curDiv = $("#"+$("#category-tab .packageDetail-tab > li.current").attr("data-show"));

        if(len < 1){return;}

        if(curDiv.find("tbody").length < 1){
            var tableHtml = '<table cellpadding="0" cellspacing="0" class="table table-fixed table-hover text-center">';
                tableHtml += '<thead>';
                tableHtml += '<tr><th width="100">商品类别</th><th width="100">商品编号</th><th width="150">商品名称</th><th width="90">单位</th><th width="90">定价</th><th width="90">状态</th>';
                tableHtml += '<th width="100">变价</th><th width="100">起卖数</th><th width="70">必选</th><th width="70">默认</th><th width="70">可复选</th><th>操作</th>';
                tableHtml += '</tr></thead>';
                tableHtml += '<tbody>';
                tableHtml += '</tbody></table>';
                curDiv.append(tableHtml);
        }
        var curTbody = curDiv.find("tbody");
        var str=''; 
        
        for (var i = 0; i < len; i++) {
            var tdObjs = selectedItemCheckboxs.eq(i).parents("tr").find("td");
                str += '<tr><td>'+tdObjs.eq(1).text()+'</td>';
                str += '<td>'+tdObjs.eq(2).text()+'</td>';
                str += '<td>'+tdObjs.eq(3).text()+'</td>';
                str += '<td>'+tdObjs.eq(4).text()+'</td>';
                str += '<td>'+tdObjs.eq(5).text()+'</td>';
                str += '<td>启用</td>';
                str += '<td><input type="text" value="-1" class="w50 text-center"></td>';
                str += '<td><input type="text" value="1" class="w50 text-center"></td>';
                str += '<td><label class="checkbox"><span></span><input type="checkbox" name="goodsWillChoose" id="goodsWillChoose-1"></label></td>';
                str += '<td><label class="checkbox"><span></span><input type="checkbox" name="goodsDefault" id="goodsDefault-1"></label></td>';
                str += '<td><label class="checkbox"><span></span><input type="checkbox" name="goodsCopied" id="goodsCopied-1"></label></td>';
                str += '<td><a href="#" title="删除" class="icon-delete">删除</a></td>';
                str += '</tr>';
        };
        curTbody.empty();
        curTbody.append(str);

    });
});


/**
 * 保存编辑分组
 * @group {object} 包含分组信息的对象 {'name':'分组名称','numStart':0,'numEnd':1}
 */
function saveEditGroup(group){
	var newHtml = '',
	    curLi = $("#category-tab .packageDetail-tab > li.current");
	
		//alert(group.name);
		newHtml += '<em>'+group.name+'</em>&nbsp;<span>(0)</span><p>'+group.numStart+'~'+group.numEnd+'</p>';
//	alert("group"+group);
		curLi.html(newHtml).attr("data-name",group.name);
		//移除data-editor属性 关闭弹框
		$("#popover-addGoodsGroup").removeAttr("data-editor").hide();
	    bkeruyun.hideLayer();
	    //清空弹框数据
	    bkeruyun.clearData("#popover-addGoodsGroup");
	       
        $("#firstNameId_"+initGroupTableId).val(group.name);
        $("#numStart_"+initGroupTableId).val(group.numStart);
        $("#numEnd_"+initGroupTableId).val(group.numEnd);
        $("#secondName_"+initGroupTableId).val(group.addGoodsSecondName);
}
/**
 * 保存新建分组
 * @group {object} 包含分组信息的对象 {'name':'分组名称','numStart':0,'numEnd':1}
 * @id    {sting}  生成分组id
 */
function saveGroup(group,id){
    var liHtml = '',
        divHtml ='',
        ul = $("#category-tab .packageDetail-tab"),
        lis = ul.find("li"),
        len = lis.length;

// alert(group.name);
    	if(len == 0){
    		liHtml += '<li class="current" onclick="changeTableId(this)" data-show="packageDetail-con-'+ id + '" data-name="'+group.name+'"><em>'+group.name+'</em>&nbsp;<span>(0)</span><p>'+group.numStart+'~'+group.numEnd+'</p></li>';
    		divHtml += '<div class="packageDetail-con" id="packageDetail-con-'+ id + '"></div>';
    	}else{
    		liHtml += '<li onclick="changeTableId(this)" data-show="packageDetail-con-'+ id + '" data-name="'+group.name+'"><em>'+group.name+'</em>&nbsp;<span>(0)</span><p>'+group.numStart+'~'+group.numEnd+'</p></li>';
    		divHtml += '<div class="packageDetail-con" id="packageDetail-con-'+ id + '" style="display:none;"></div>';
    	}
        

        ul.append(liHtml);
        $("#packageDetail").append(divHtml);
        // alert(ul.html());
        //动态创建表格
//        var table = '<table id="gridType_"'+id+'></table>';
//        $("#packageDetail-con-1").append(table);
        
        //设置动态值
        $('#outterGridId').val("gridType_"+id);
        
        
        var id = "gridType_"+initGroupTableId;
		outterGridId = id;
		tableIds.push(id);
		var table = '<table id="'+id+'"></table>';
		
	    $("#packageDetail-con-"+ initGroupTableId).append(table);
	    initSelectDishEdit(id);
	     
	    //创建分组隐藏域
	    var divHidden = $("#groupHidden");
	    //如果存隐的div  先将删除
	    var exitDiv = $("#div_"+initGroupTableId);
	    if(exitDiv){
	    	exitDiv.remove();
	    }
	    var subDiv = $('<div id="div_"'+initGroupTableId+'/>');
	    
	    //创建分组隐藏域
	    subDiv.append('<input type="hidden" name="firstNameId" id="firstNameId_'+initGroupTableId+'" value="'+group.name+'">');
	    subDiv.append('<input type="hidden" name="numStart" id="numStart_'+initGroupTableId+'" value="'+group.numStart+'">');
	    subDiv.append('<input type="hidden" name="numEnd" id="numEnd_'+initGroupTableId+'" value="'+group.numEnd+'">');
	    subDiv.append('<input type="hidden" name="secondName" id="secondName_'+initGroupTableId+'" value="'+group.addGoodsSecondName+'">');
	    subDiv.append('<input type="hidden" name="secondName" id="id_'+initGroupTableId+'" value="'+group.id+'">');
	    divHidden.append(subDiv);
	    //默认第一个为当前页签
	    $("#category-tab .packageDetail-tab > li").eq(0).click();
	    //移除编辑和删除的disabled
	    $("#set-add").find(".editor").removeClass("disabled");
//	    $("#set-add").find(".delete").removeClass("disabled");
	    //清空弹框数据
	    bkeruyun.clearData("#popover-addGoodsGroup");
        
}

/**
 * 创建分组
 */
function  saveGroups(group){
	indexFlag++;
	initGroupTableId = (new Date().getTime())+indexFlag;
    saveGroup(group,initGroupTableId);
    //当只有多个分组时 删除按钮可以操作
    if($(".packageDetail-tab > li").length > 1){
        $("#set-add .delete").removeClass("disabled");
    }
    $("#popover-addGoodsGroup").hide();
    bkeruyun.hideLayer();
    
}

/**
 * 切换标签
 */
function changeTableId(obj){
	var dataShowId = $(obj).attr("data-show");
	var tableIndex = dataShowId.split("-con-")[1];
	outterGridId = "gridType_"+tableIndex;
	initGroupTableId = tableIndex;
	 $('#outterGridId').val("gridType_"+tableIndex);
}

/**
 * 生成表格
 * @param tableId
 */
function initSelectDishEdit(tableId){
	var $gridObj = $("#"+tableId);
	$gridObj.dataGrid({
//	    formId:'form-addGoods',
	    url: '',
	    datatype : "local",
//	    data:dataArray,
	    showEmptyGrid: true,
	    showOperate:false,
//	    postData: postData,
	    colNames: ['id','unitId','type', '商品中类', '商品编号', '商品名称', '单位',  '定价','statusName','状态','变价','起卖数','必选','默认','可复选','操作'],
	    colModel: [
	        {name: 'id', index: 'id', hidden: true},
	        {name: 'unitId', index: 'unitId', hidden: true},
	        {name: 'type', index: 'type', hidden: true},
	        {name: 'typeName', index: 'typeName', width: 130, align: 'center'},
	        {name: 'dishCode', index: 'dishCode', width: 130, align: 'center'},
	        {name: 'dishName', index: 'dishName', width: 130, align: 'center'},
	        {name: 'unitName', index: 'unitName', width: 120, align: 'center'},
	        {name: 'price', index: 'price', width: 70, align: 'center'},
	        {name: 'status', index: 'status', width: 70, align: 'center', hidden: true},
        	{name: 'statusName', index: 'statusName', width: 70, align: 'center',formatter:function(cellvalue, options, rowObject){
	        	// 0 正常，-1 错误
	        	if(rowObject.status==2){
	        		return "<font color='red'>禁用</font>";
	        	}else{
	        		return "启用";
	        	}
        	}},
	        {name: 'changePrice', index: 'changePrice', width: 70, align: 'center',editable:true,
	        	formatter:function(cellvalue, options, rowObject){
		        	if(!cellvalue){
		        		cellvalue = 0;
		        	}
		        	return '<input type="text"  value='+cellvalue+' onchange="changeCheckNum(this,'+cellvalue+','+rowObject.id+')">';
	        	},
	        	unformat:function(cellvalue, options, cell){
	        		
	        		 return $(cell).find('input').val();;
	        	}
	        },
	        {name: 'leastCellNum', index: 'leastCellNum', width: 70, align: 'center',editable:true,
	        	formatter:function(cellvalue, options, rowObject){
	        		if(!cellvalue||cellvalue==0){
		        		cellvalue = 1;
		        	}
		        	return '<input type="text" maxlength="9" value='+cellvalue+' onchange="changeCheckStartSell(this,'+cellvalue+','+rowObject.id+')">';
		        },
		        //onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
	        	unformat:function(cellvalue, options, cell){
	        		
	        		return $(cell).find('input').val();
	        	} },
	        {name: 'isReplace', index: 'isReplace', width: 70, align: 'center',editable:true,
		        	formatter:function(cellvalue, options, rowObject){
		        		
		        		var checkeds = "";
		        		if(!cellvalue){
		        			cellvalue=2;
		        		}else if(cellvalue==1){
		        			checkeds = "";
		        			checkeds = "checked";
		        		}
			        	return '<input type="checkbox" '+checkeds+' value="'+cellvalue+'" id="isReplace_'+rowObject.id+'" onclick="checkIsNenial(this,'+rowObject.id+')">';
			        },
		        	unformat:function(cellvalue, options, cell){
		        		
		        		return $(cell).find('input').val();
		        	} },
	        {name: 'isDefault', index: 'isDefault', width: 70, align: 'center',editable:true,
			        	formatter:function(cellvalue, options, rowObject){
			        		var checkeds = "";
			        		if(typeof(cellvalue) == "undefined" || !cellvalue){
			        			checkeds = "";
			        			cellvalue = 2;
			        		}else if(cellvalue!=2){
			        			cellvalue=1;
			        			checkeds = "checked";
			        		}
				        	return '<input type="checkbox" id="isDefault_'+rowObject.id+'"  '+checkeds+' value="'+cellvalue+'" onclick="checkIsNenial(this,'+rowObject.id+')"/>';
				        },
			        	unformat:function(cellvalue, options, cell){
			        		
			        		return $(cell).find('input').val();
			        	} },
	        {name: 'isMulti', index: 'isMulti', width: 70, align: 'center',editable:true,
				        	formatter:function(cellvalue, options, rowObject){
				        		var checkeds = "";
				        		if(!cellvalue || cellvalue==1){
				        			cellvalue=1;
				        			checkeds = "checked";
				        		}else{
				        			cellvalue = 2;
				        			checkeds = "";
				        		}
					        	return '<input type="checkbox" '+checkeds+' value="'+cellvalue+'" onclick="checkisMulti(this,'+rowObject.id+')"/>';
					        },
				        	unformat:function(cellvalue, options, cell){
				        		
				        		return $(cell).find('input').val();
				        	}  },
	        {name: 'operation', index: 'operation', width: 60, align: 'center',editable:true,
					        	formatter:function(cellvalue, options, rowObject){
						        	return '<a href="javascript:deleteDishRow('+rowObject.id+')" title="删除" class="icon-delete">删除</a>';
						        },unformat:function(cellvalue, options, cell){
					        		
					        		return "";
					        	}  }
	    ],
//	    multiselect: true,
	    shrinkToFit: false,
        autoScroll: true,
	    width: 1100
	});
}

function checkisMulti(obj,id){
	if(obj.value==1){
		$(obj).val(2);
	}else{
		$(obj).val(1);
	}
}

/**
 * 根据起卖检查必选  默认是否能选择
 * @param obj
 * @param rowId
 */
function checkIsNenial(obj,rowId){
	//回写当前操作的checkbox
	if($(obj).attr('checked')){
		$(obj).val(1);
	}else{
		$(obj).val(2);
	}
	var rows = $("#"+outterGridId).jqGrid("getRowData");
	var numEnd = $("#numEnd_"+initGroupTableId).val();
	var startSellCount = 0;
	if($(obj).attr('checked')){
		var idPix = $(obj).attr('id').split("_")[0];
		if(idPix=="isDefault"){
			var checks = $(obj).parent().parent().find(':checkbox');
			for(var i=0;i<checks.length;i++){
				var flagId = $(checks[i]).attr('id')+"";
				flagId = flagId.split("_")[0];
				if("isReplace"==flagId){
					$(checks[i]).removeAttr("checked");
					$(checks[i]).val(2);
					break;
				}
			}
//			$("#isReplace_"+rowId).removeAttr("checked");
//			$("#isReplace_"+rowId).val(2);
		}else{
//			$("#isDefault_"+rowId).removeAttr("checked");
//			$("#isDefault_"+rowId).val(2);
			var checks = $(obj).parent().parent().find(':checkbox');
			for(var i=0;i<checks.length;i++){
				var flagId = $(checks[i]).attr('id')+"";
				flagId = flagId.split("_")[0];
				if("isDefault"==flagId){
					$(checks[i]).removeAttr("checked");
					$(checks[i]).val(2);
					break;
				}
			}
		}
	}
	jQuery(rows).each(function(){
		var mustSelect=this.isReplace;
		 var defualtSelect=this.isDefault;
         var leastCellNum =this.leastCellNum;
         if(mustSelect==1 || defualtSelect==1){
        	 startSellCount = startSellCount + leastCellNum*1;
         }
         
    });
	if(!$(obj).attr('checked')){
		$(obj).attr('checked',false);
		$(obj).val(2);
	}else{
		if(startSellCount<=numEnd){
			$(obj).attr('checked',true);
		}else{
			$(obj).attr('checked',false);
			$(obj).val(2);
		}
	}
	startSellCount = 0;
	
	/*if(!$(obj).attr('checked')){
		//当前操作checked 没有选中
			$(obj).attr('checked',false);
	}else{
		//当前操作checked 选中
		if(startSellCount<=numEnd){
			$(obj).attr('checked',true);
		}else{
			$(obj).attr('checked',false);
		}
	}*/
	
	
}



function changeCheckNum(obj,value,srcid){
	if(!eqZoreTwoPointOrInt(obj)){
		$(obj).val(0);
		Message.alert({'title':'提示','describe':'整数部分不能超过6位数 ,小数点不能超过两位'});
		return;
	}

}

/**
 * 如果改起卖数 计算选中的必选项和默认的选择 起卖数 起卖数和是否大于最大适合人数
 * 
 * @param obj
 * @param value
 * @param srcid
 */
function changeCheckStartSell(obj,value,srcid){
//	var id = "gridType_"+initGroupTableId;
	var rows = $("#"+outterGridId).jqGrid("getRowData");
	var numEnd = $("#numEnd_"+initGroupTableId).val();
	var startSellCount = 0;
	if(!value){
		$(obj).val(1);
	}
	if(!gtZoreTwoPoint(obj)||$(obj).val()==0){
		Message.alert({'title':'提示','describe':'起卖数只能是大于0正数，小数点两位'});
		if(value==0){
			value=1;
		}
		$(obj).val(value);
		return;
	}
	
	/*if(numEnd<$(obj).val()){
		Message.alert({'title':'提示','describe':'起卖数要小于等于最大的可选数'});
		if(value==0){
			value=1;
		}
		$(obj).val(value);
		return;
	}*/
	
	jQuery(rows).each(function(){ 
		var mustSelect=this.isReplace;
		var defualtSelect=this.isDefault;
		 if(mustSelect==1 || defualtSelect==1){
			 if(srcid==this.id){
					startSellCount = startSellCount + parseFloat($(obj).val());
				}else {
					startSellCount = startSellCount + parseFloat(this.leastCellNum);
				}
         }
		
	});
	
	
	if(startSellCount>numEnd){
		Message.alert({'title':'提示','describe':'选择的必选和默认的起卖数要小于最大的可选数'});
		if(value==0){
			value=1;
		}
		$(obj).val(value);
	}
}

/**
 * 
 * @param obj
 */
//function changeTableId(obj){
//	var id = $(obj).attr("data-show").split("-con-")[1];
//	initGroupTableId = id;
//	outterGridId = "gridType_"+id;
//	$("#"+outterGridId).show();
//}

/**
 * 按id删除表格的数据行
 * @param rowId
 */
function deleteDishRow(rowId){
	$("#"+outterGridId).jqGrid("delRowData",rowId);
	  var selectedRowIds = $("#"+outterGridId).jqGrid("getDataIDs");
	  $("#category-tab .current>span").html("("+selectedRowIds.length+")");
}

/**
 * 按数组的下标删除
 */
Array.prototype.remove=function(dx) { 
    if(isNaN(dx)||dx>this.length){return false;} 
    for(var i=0,n=0;i<this.length;i++) 
    { 
        if(this[i]!=this[dx]) 
        { 
            this[n++]=this[i];
        } 
    } 
    this.length-=1 ;
} 
/**
*	 var tables = $("#packageDetail-con-1").find("table");
	 initGroupTableId = tables.length;
	if(initGroupTableId==0){
		initGroupTableId++;
		var id = "gridType_"+initGroupTableId;
		outterGridId = id;
		 var table = '<table id="'+id+'"></table>';
		
	     $("#packageDetail-con-1").append(table);
	     initSelectDishEdit(id);
	     //创建分组标签
	     
	     //创建分组隐藏域
	     var divHidden = $("#groupHidden");
	     $('<div id="div_"'+initGroupTableId+'>');
	}
*/
