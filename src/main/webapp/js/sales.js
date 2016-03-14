$(function(){
	
	Array.prototype.contains = function (element) {  // 利用Array的原型prototype点出一个我想要封装的方法名contains
        for (var i = 0; i < this.length; i++) {
            if (this[i] == element) {                                     // 如果数组中某个元素和你想要测试的元素对象element相等，则证明数组中包含这个元素，返回true
                return true;
            }
        }
    }
    // 初始化树结构
    $("#tree").tree({
            'folding': true,
            'foldingType': 'single',
            'foldingSwitch':'.icon-folding',
            'marquee':true,
            'marqueeType':'checkbox'

        });
    
    $("#goodsTypeSearch").bind("keydown",function(e){
        // 兼容FF和IE和Opera    
    var theEvent = e || window.event;    
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;    
    if (code == 13) {    
    	var key =  $("#goodsTypeSearch").find(":text").val();
        $.ajax({
			type: "POST",
			url: ctxPath+"/dish/saletemplet/searchDish",
			data:  {
				keyWord : key},
			cache: true,
			dataType: "json",
			beforeSend:bkeruyun.showLoading,
			success: function(data){
				var html='';
				for(var i=0;i<data.length;i++){
					if(data[i].statusFlag==1){
						html +="<li class='shutDown'><label class='checkbox'><span></span>" +
						"<input type='checkbox' data-value='"+data[i].typeName+"' ><em title='"+data[i].typeName+"'>"+data[i].typeName+"</em></label>";
					}else{
						html +="<li class='shutDown'><label class='checkbox,checkbox-disable'><span></span>" +
					 	"<input type='checkbox' data-value='"+data[i].typeName+"' disabled><em title='"+data[i].typeName+"'>"+data[i].typeName+"</em></label> <span class='red'>（已停用）</span>";
					}

					 html +="<ul class='highlighted-list'>";
					 var dishVOList=data[i].dishVOs;
					for(var j=0;j<dishVOList.length;j++){
						if(dishVOList[j].enabledFlag==1){
							html +="<li><label class='checkbox' for='goods-"+dishVOList[j].code+"'>";
						}else{
							html +="<li><label class='checkbox checkbox-disable' for='goods-"+dishVOList[j].code+"'>";
						}
						html +="<span></span><input"+
								" type='checkbox' name='goods' id='goods-"+dishVOList[j].code+"'data-id='"+dishVOList[j].id+"' data-" +
										"class='"+dishVOList[j].typeName+"' data-name='"+dishVOList[j].name+"' data-code='"+dishVOList[j].code+"' data-" +
												"unit='"+dishVOList[j].unitName+"' data-price='"+dishVOList[j].sellPrice+"'";
						if(dishVOList[j].enabledFlag==1){
							if(dishVOList[j].standard==null){
								html+="><em title='"+dishVOList[j].name+"/"+dishVOList[j].code+"'>"+dishVOList[j].name+"/"+dishVOList[j].code+"</em></label></li>";	
							}else{
								html+="><em title='"+dishVOList[j].name+"/"+dishVOList[j].code+"("+dishVOList[j].standard+")'>"+dishVOList[j].name+"/"+dishVOList[j].code+"("+dishVOList[j].standard+")</em></label></li>";	
							}
							
						}else{
							if(dishVOList[j].standard==null){
							    html+=" disabled><em title='"+dishVOList[j].name+"/"+dishVOList[j].code+"'>"+dishVOList[j].name+"/"+dishVOList[j].code+"</em></label><span class='red'>（已停用）</span></li>";
							}else{
								html+=" disabled><em title='"+dishVOList[j].name+"/"+dishVOList[j].code+"("+dishVOList[j].standard+")'>"+dishVOList[j].name+"/"+dishVOList[j].code+"("+dishVOList[j].standard+")</em></label><span class='red'>（已停用）</span></li>";
							}
							
						}
						
					}
					
					html +="</ul> <span class='icon-folding'></span></li>";
				}
				$("#content").empty();
				 $("#content").append(html);
				$("#allbox").removeClass("checkbox-check");

				bkeruyun.hideLoading();
				
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				bkeruyun.hideLoading();
		        alert("网络异常，请检查网络连接状态！");
		    }
		});
        }    
});

    // 分类搜索
    
    $("#goodsTypeSearch").delegate(".icon-search","click",function(){
    	var key =  $("#goodsTypeSearch").find(":text").val();
        $.ajax({
			type: "POST",
			url: ctxPath+"/dish/saletemplet/searchDish",
			data:  {
				keyWord : key},
			cache: true,
			dataType: "json",
			beforeSend:bkeruyun.showLoading,
			success: function(data){
				var html='';
				for(var i=0;i<data.length;i++){

					if(data[i].statusFlag==1){
						html +="<li class='shutDown'><label class='checkbox'><span></span>" +
						"<input type='checkbox' data-value='"+data[i].typeName+"' ><em title='"+data[i].typeName+"'>"+data[i].typeName+"</em></label>";
					}else{
						html +="<li class='shutDown'><label class='checkbox,checkbox-disable'><span></span>" +
						"<input type='checkbox' data-value='"+data[i].typeName+"' disabled><em title='"+data[i].typeName+"'>"+data[i].typeName+"</em></label> <span class='red'>（已停用）</span>";
					}
					html +="<ul class='highlighted-list'>";
					 var dishVOList=data[i].dishVOs;
					for(var j=0;j<dishVOList.length;j++){
						if(dishVOList[j].enabledFlag==1){
							html +="<li><label class='checkbox' for='goods-"+dishVOList[j].code+"'>";
						}else{
							html +="<li><label class='checkbox checkbox-disable' for='goods-"+dishVOList[j].code+"'>";
						}
						html +="<span></span><input"+
								" type='checkbox' name='goods' id='goods-"+dishVOList[j].code+"'data-id='"+dishVOList[j].id+"' data-" +
										"class='"+dishVOList[j].typeName+"' data-name='"+dishVOList[j].name+"' data-code='"+dishVOList[j].code+"' data-" +
												"unit='"+dishVOList[j].unitName+"' data-price='"+dishVOList[j].sellPrice+"'";
						if(dishVOList[j].enabledFlag==1){
							if(dishVOList[j].standard==null){
								html+="><em title='"+dishVOList[j].name+"/"+dishVOList[j].code+"'>"+dishVOList[j].name+"/"+dishVOList[j].code+"</em></label></li>";	
							}else{
								html+="><em title='"+dishVOList[j].name+"/"+dishVOList[j].code+"("+dishVOList[j].standard+")'>"+dishVOList[j].name+"/"+dishVOList[j].code+"("+dishVOList[j].standard+")</em></label></li>";	
							}
							
						}else{
							if(dishVOList[j].standard==null){
							    html+=" disabled><em title='"+dishVOList[j].name+"/"+dishVOList[j].code+"'>"+dishVOList[j].name+"/"+dishVOList[j].code+"</em></label><span class='red'>（已停用）</span></li>";
							}else{
								html+=" disabled><em title='"+dishVOList[j].name+"/"+dishVOList[j].code+"("+dishVOList[j].standard+")'>"+dishVOList[j].name+"/"+dishVOList[j].code+"("+dishVOList[j].standard+")</em></label><span class='red'>（已停用）</span></li>";
							}
							
						}
						
					}
					
					html +="</ul> <span class='icon-folding'></span></li>";
				}
				$("#content").empty();
				 $("#content").append(html);
				$("#allbox").removeClass("checkbox-check");
				bkeruyun.hideLoading();
				
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				bkeruyun.hideLoading();
		        alert("网络异常，请检查网络连接状态！");
		    }
		});
    });
    // 添加商品
    
    $("#addGoodsBtn").on("click",function(){
        var checkboxs = $(':checkbox[name="goods"]:checked');
        if(checkboxs.length < 1){
        	Message.alert({title:"提示信息",describe:"请选择商品！"})
        }else{
        	var dish=$("input[name='dishId']");
        	var dishIds = new Array();
        	for(var i=0;i<dish.length;i++){
        		dishIds.push(dish.eq(i).val());
        	}

          var html='';
          for (var i=0,len=checkboxs.length;i<len;i++) {
            var checkObj = checkboxs.eq(i);
            if(dishIds.contains(checkObj.attr("data-id"))){
            	continue;
            }
            html += '<tr id="'+checkObj.attr("data-id")+'"><td width="150">'+checkObj.attr("data-class")+'</td>';
            html += '<td width="150">'+checkObj.attr("data-code")+'</td>';
            html += '<td width="150">'+checkObj.attr("data-name")+'</td>';
            html += '<td width="130">'+checkObj.attr("data-unit")+'</td>';
            html += '<td width="130">'+checkObj.attr("data-price")+'</td>';
            html += '<td width="100"><a href="#" onclick="deleteTr('+checkObj.attr("data-id")+')" title="" class="icon-delete">删除</a></td><input type="hidden" name="dishId" value="'+checkObj.attr("data-id")+'"/></tr>';
          };
          $("#tbody-1").append(html);
			//取消选中
			$("#tree :checkbox:checked").each(function(){
				this.checked = false;
				bkeruyun.checkboxChange(this, 'checkbox-check');
			});
        }

    });
  // //初始化 关联设置 做法 多标签滚动
  // $("#category-tab").tabScroll({
  // 'wrapObj': $('#category-tab'),
  // 'innerObj': $('#category-tab > ul'),
  // 'innerObjLeft':20,
  // 'item':$('#category-tab > ul > li'),
  // 'itemN': 8,
  // 'itemMarginL':0,
  // 'itemMarginR':10,
  // 'itemPaddingL':10,
  // 'itemPaddingR':10,
  // 'moveItemN':8,
  // 'speed':1000
  // });
  
  // //套餐明细 添加分组
  // $("#set-add").delegate(".icon-add","click",function(){
  // $("#popover-addGoodsGroup").show();
  // bkeruyun.showLayer();
  // });
  // //套餐明细 编辑分组
  // $("#set-add").delegate(".editor","click",function(){
  // $("#popover-addGoodsGroup").show();
  // bkeruyun.showLayer();
  // });
  // //套餐明细 删除分组
  // $("#set-add").delegate(".delete:not('.disabled')","click",function(){
  // var currentLi = $(".packageDetail-tab > li.current");
  // var currentDiv = $("#"+currentLi.attr("data-show"));
  // var currentLiTxt = currentLi.attr("data-name");

        
  // Message.confirm({'title':'删除提示','describe':'确认删除 '+currentLiTxt+'
	// 分组'},function(){
  // //显示下一分组
  // currentLi.next().click();
  // //移除当前分分组
  // currentLi.remove();
  // currentDiv.remove();
  // //当只有一个分组时 删除按钮致灰 不让操作
  // if($(".packageDetail-tab > li").length == 1){
  // $("#set-add .delete").addClass("disabled");
  // }
            

  // });
  // });
  // //保存 分组
  // $("#addGroupBtnSave").on("click",function(){
  // // $("#form-addGoodsGroup").submit();
  // var flag = $("#form-addGoodsGroup").valid();
  // var group =
	// {'name':$.trim($("#addGoodsFirstName").val()),'numStart':$.trim($("#addStartPeople").val()),'numEnd':$.trim($("#addEndPeople").val())};
//
// // var id = new Date()*1;
// // if(flag){
// // // alert("To do");
// // saveGroup(group,id);
// // //当只有多个分组时 删除按钮可以操作
// // if($(".packageDetail-tab > li").length > 1){
// // $("#set-add .delete").removeClass("disabled");
// // }
// // $("#popover-addGoodsGroup").hide();
// // bkeruyun.hideLayer();
// // }
// // });
  // //显示编辑 删除
  // bkeruyun.showMenu($("#set-add > li"),$("#set-add > li > ul"));
  // //添加分组验证 初始化

  // $("#form-addGoodsGroup").validate();

  // //套餐明细页签切换
  // bkeruyun.tab(".packageDetail-tab >
	// li","click",'.packageDetail-con',"data-show","current");
  // //点击选择商品按钮
  // $("#chooseGoodsBtn").on("click",function(){
  // $("#popover-addGoods").show();
  // bkeruyun.showLayer();
  // });
  // //选择商品 添加
  // $("#addGroupBtn").on("click",function(){
  // var selectedItemCheckboxs = $(":checkbox[name='goodsSelect']:checked");
  // var len = len = selectedItemCheckboxs.length;
  // var curDiv = $("#"+$("#category-tab .packageDetail-tab >
	// li.current").attr("data-show"));

  // if(len < 1){return;}

  // if(curDiv.find("tbody").length < 1){
  // var tableHtml = '<table cellpadding="0" cellspacing="0" class="table
	// table-fixed table-hover text-center">';
  // tableHtml += '<thead>';
  // tableHtml += '<tr><th width="100">商品类别</th><th width="100">商品编号</th><th
	// width="150">商品名称</th><th width="90">单位</th><th width="90">定价</th><th
	// width="90">状态</th>';
  // tableHtml += '<th width="100">变价</th><th width="100">起卖数</th><th
	// width="70">必选</th><th width="70">默认</th><th
	// width="70">可复选</th><th>操作</th>';
  // tableHtml += '</tr></thead>';
  // tableHtml += '<tbody>';
  // tableHtml += '</tbody></table>';
  // curDiv.append(tableHtml);
  // }
  // var curTbody = curDiv.find("tbody");
  // var str='';
        
  // for (var i = 0; i < len; i++) {
  // var tdObjs = selectedItemCheckboxs.eq(i).parents("tr").find("td");
  // str += '<tr><td>'+tdObjs.eq(1).text()+'</td>';
  // str += '<td>'+tdObjs.eq(2).text()+'</td>';
  // str += '<td>'+tdObjs.eq(3).text()+'</td>';
  // str += '<td>'+tdObjs.eq(4).text()+'</td>';
  // str += '<td>'+tdObjs.eq(5).text()+'</td>';
  // str += '<td>启用</td>';
  // str += '<td><input type="text" value="-1" class="w50 text-center"></td>';
  // str += '<td><input type="text" value="1" class="w50 text-center"></td>';
  // str += '<td><label class="checkbox"><span></span><input type="checkbox"
	// name="goodsWillChoose" id="goodsWillChoose-1"></label></td>';
  // str += '<td><label class="checkbox"><span></span><input type="checkbox"
	// name="goodsDefault" id="goodsDefault-1"></label></td>';
  // str += '<td><label class="checkbox"><span></span><input type="checkbox"
	// name="goodsCopied" id="goodsCopied-1"></label></td>';
  // str += '<td><a href="#" title="删除" class="icon-delete">删除</a></td>';
  // str += '</tr>';
  // };
  // curTbody.empty();
  // curTbody.append(str);

  // });
    
   
});
// 保存分组
/**
 * @group {object} 包含分组信息的对象 {'name':'分组名称','numStart':0,'numEnd':1}
 * @id {sting} 生成分组id
 */
function saveGroup(group,id){
    var liHtml = '',
        divHtml ='',
        ul = $("#category-tab .packageDetail-tab");

// alert(group.name);
        liHtml += '<li data-show="packageDetail-con-'+ id + '" data-name="'+group.name+'"><em>'+group.name+'</em>&nbsp;<span>(0)</span><p>'+group.numStart+'~'+group.numEnd+'</p></li>';
        divHtml += '<div class="packageDetail-con" id="packageDetail-con-'+ id + '" style="display:none;"></div>';

        ul.append(liHtml);
        $("#packageDetail").append(divHtml);
        // alert(ul.html());
}

function saveData(e){
	
	if ( e && e.preventDefault ){
		// 阻止默认浏览器动作(W3C)
		e.preventDefault();
	}else{
		// IE中阻止函数器默认动作的方式
		window.event.returnValue = false; 
	}
	
	var templetVo = {}; // 菜品销售模板信息
	var dish=$("input[name='dishId']");
	var dishIds = new Array();
	for(var i=0;i<dish.length;i++){
		dishIds.push(dish.eq(i).val());
	}
	templetVo.dishIdsList=dishIds;
	var shopIds = new Array();
	var shop=$("#goodsList").find(".checkbox-check");
	for(var i=0;i<shop.length;i++){
		shopIds.push($(shop[i]).data("id"));
	}
	templetVo.shopIdentyList=shopIds;
	templetVo.id=$("#templetId").val();
	templetVo.templetCode=$("#templetCode").val();
	templetVo.saleModelName=$("#saleModelName").val();
	
	$.ajax({
		type: "POST",
		url:ctxPath+"/dish/saletemplet/save",
		data: $.toJSON(templetVo)+ "&random=" + Math.random(),
		dataType: "json",
		contentType: "application/json; charset=utf-8", 
		cache: false,
		beforeSend:bkeruyun.showLoading,
		success: function(data){
			if(data=='YES'){
 				location.href = $("base").attr("href") + "/dish/saletemplet/list";
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			
	        alert("网络异常，请检查网络连接状态！");
	    }
	});
}
function deleteTr(id){
	$("tr").remove("#"+id);
}