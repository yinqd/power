var FormUtil = {

	stashOriginalValueByForm : function($form) {
		var values = $form.serializeArray();
		var index = 0;
		for (; index < values.length; ++index) {
			$form.find("#" + values[index].name).attr('original_value', values[index].value);
		}
	},

	processIfFormChanged : function(args) {
		var $form = args.formObj,
			clickYesCallback = args.clickYesCallback,
			clickNoCallback = args.clickNoCallback,
			values = $form.serializeArray();
		var index = 0, isChanged = false;
		for (; index < values.length; ++index) {
			var _v = $form.find("#" + values[index].name).attr('original_value');
			if (typeof (_v) == 'undefined') {
				_v = '';
			}
			if (_v != values[index].value) {
				isChanged = true;
			}
		}
		if(isChanged){
			Message.confirm(
				{
				title:'提示',
				describe:'当前资料已变动,是否保存当前信息？'},
				function(){
	                if ($.isFunction(clickYesCallback.toFunction())) {
	                	clickYesCallback.toDo(args);
	                }
				},
				function(){
	                if ($.isFunction(clickNoCallback.toFunction())) {
	                	clickNoCallback.toDo(args);
	                }
				}
			);
		}else {
            if ($.isFunction(clickNoCallback.toFunction())) {
            	clickNoCallback.toDo(args);
            }
		}
	},
	
	checkValidBeforeSubmit: function($form) {
		var valid = $form.valid();
		if (!valid) {
			bkeruyun.promptMessage("部分资料错误或必填栏位为空，请检核！");
		}
		return valid;
	}
};