$(function(){
	buildCmSelect();
});
function buildCmSelect(){
			//获取权限商户
		    $.ajax({
		        type: "post",
		        async:false,
		        url: ctxPath + "/common/queryUnit.action",
		        success: function (cmJson) {
					var data=eval("(" + cmJson + ")");
					if(data.unit.length==1){
						/** 一次添加一个商户 **/
			    		$(data.unit).each(function (i, v) {
			    			var cmTypeItem =
			    				'<div>' +
			    				//'<input type="hidden" name="cmIds" id="cmId-0" value="' + v.commercialid + '" data-text="' + v.commercialname + '" >' + v.commercialname +
			    				'</div>';
			    			$('#cmId-all-em').html(cmTypeItem);
							$('#cmId-all-ul').parents(".multi-select-con").next(":hidden").val(v.commercialid);
			    		});
					}else{
			    		var cmIdAllLi =
			    			'<li>' +
			    			'<label class="checkbox checkbox-check" for="cmId-all">' +
			    			'<span></span>' +
			    			'<input type="checkbox" checked="true" id="cmId-all">全部' +
			    			'</label>' +
			    			'</li>';
	
			    		$('#cmId-all-ul').html(cmIdAllLi); // 默认一开始添加“全部”
	
			    		var count = 0; // 一共添加的商户的数量
	
			    		/** 一次添加一个商户 **/
			    		$(data.unit).each(function (i, v) {
			    			var cmTypeItem =
	
			    				'<li>' +
			    				'<label class="checkbox" for="cmId-' + count + '">' +
			    				'<span></span>' +
			    				'<input type="radio" name="cmIds" id="cmId-' + count + '" value="' + v.nodeNo + '" data-text="' + v.nodeName + '" >' + v.nodeName +
			    				'</label>' +
			    				'</li>';
			    			$('#cmId-all-ul').append(cmTypeItem);
			    			count++;
			    		});
			    		if(count == 0){
			    			$('#cmId-all-ul').html(''); // 如果没有商户，应把“全部”删除
			    		}else{
			    			var nameGroup='cmIds';
			    			$("[name='"+ nameGroup+"']:checkbox").not(":disabled").each(function(){
			         			this.checked = true;
			         			checkboxChange(this,'checkbox-check');
			         		});
				     		filterConditions('cmIds',$('#cmId-all-ul').parents(".multi-select-con").prev(".select-control").find("em"),$('#cmId-all-ul').parents(".multi-select-con").next(":hidden"));
			    		}

			    	     // 交互
			    	 	$(".multi-select > .select-control").on("click",function(e){
			    	 		e.stopPropagation();
			    	 		var showList = $(this).next(".multi-select-con");
			    	 		if(showList.is(":hidden")){
			    	 			$(".multi-select-con").hide();
			    	 			$(".select-control").removeClass("select-control-arrowtop");
			    	 			showList.show();
			    	 			$(this).addClass("select-control-arrowtop");
			    	 		}else{
			    	 			showList.hide();
			    	 			$(this).removeClass("select-control-arrowtop");
			    	 		}
			    	 	});
			    	 	//任意点击隐藏下拉层
			    		$(document).bind("click",function(e){
			    			var target = $(e.target);
			    			//当target不在popover/coupons-set 内是 隐藏
			    			if(target.closest(".multi-select-con").length == 0 && target.closest(".multi-select").length == 0){
			    				$(".multi-select-con").hide();
			    				$(".multi-select > .select-control").removeClass("select-control-arrowtop");
			    			}
			    		});
					}
		        }
		    });

    		delegateCmCheckbox('cmIds', '#cmId-all');  // 开始监听商户的checkbox
    	}
     /**
      * 监听下拉选框
      * @param name
      * @param id
      */
     function delegateCmCheckbox(name, id){
     	//业务类型 条件选择
     	$(document).delegate(":checkbox[name='"+ name + "']","change",function(){
     		associatedCheckAll(this,$(id));
     		filterConditions(name,$(this).parents(".multi-select-con").prev(".select-control").find("em"),$(this).parents(".multi-select-con").next(":hidden"));
     	});
     	//业务类型 条件选择 全选
     	$(document).delegate(id,"change",function(){
     		checkAll(this,name);
     		filterConditions(name,$(this).parents(".multi-select-con").prev(".select-control").find("em"),$(this).parents(".multi-select-con").next(":hidden"));
     	});
     }
     /**
      *    associatedCheckAll     //关联全选
      *    @param  object         e           需要操作对象
      *    @param  jqueryObj      $obj        全选对象
      **/
     function associatedCheckAll(e,$obj){
     	var flag = true;
     	var $name = $(e).attr("name");
     	checkboxChange(e,'checkbox-check');
     	$("[name='"+ $name +"']:checkbox").not(":disabled").each(function(){
     		if(!this.checked){
     			flag = false;
     		}
     	});
     	$obj.get(0).checked = flag;
     	checkboxChange($obj.get(0),'checkbox-check');
     }
     /**
      *    checkbox               //模拟checkbox功能
      *    @param  object         element     需要操作对象
      *    @param  className      class       切换的样式
      **/
     function checkboxChange(element,className){
     	if(element.readOnly){return false;}
     	if(element.checked){
     		$(element).parent().addClass(className);
     	}else{
     		$(element).parent().removeClass(className);
     	}
     }
     /**
      *    checked all            //全选
      *    @param  object         e           需要操作对象
      *    @param  nameGroup      string      checkbox name
      **/
     function checkAll(e,nameGroup){
     	if(e.checked){
     		//alert($("[name='"+ nameGroup+"']:checkbox"));
     		$("[name='"+ nameGroup+"']:checkbox").not(":disabled").each(function(){
     			this.checked = true;
     			checkboxChange(this,'checkbox-check');
     		});
     	}else{
     		$("[name='"+ nameGroup+"']:checkbox").not(":disabled").each(function(){
     			this.checked = false;
     			checkboxChange(this,'checkbox-check');
     		});
     	}
     	checkboxChange(e,'checkbox-check');
     }
     /**
      * 条件选择
      * @param checkboxName      string                  checkbox name
      * @param $textObj          jquery object           要改变字符串的元素
      * @param $hiddenObj        jquery object           要改变的隐藏域
      */
     function filterConditions(checkboxName,$textObj,$hiddenObj){
     	var checkboxs = $(":checkbox[name='" + checkboxName + "']");
     	var checkboxsChecked = $(":checkbox[name='" + checkboxName + "']:checked");
     	var len = checkboxs.length;
     	var lenChecked = checkboxsChecked.length;
     	var str = '';
     	var value1 = '';

     	for(var i=0;i<lenChecked;i++){
     		if(i==0){
     			str += checkboxsChecked.eq(i).attr("data-text");
     			value1 += checkboxsChecked.eq(i).attr("value");
     		}else{
     			str += ',' + checkboxsChecked.eq(i).attr("data-text");
     			value1 += "," + checkboxsChecked.eq(i).attr("value");
     		}
     	}
     	$textObj.text(str);
     	$hiddenObj.val(value1);

     	if(lenChecked == len){
     		$textObj.text("全部");
     	}
     }