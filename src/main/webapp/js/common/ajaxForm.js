var AsyncForm = (function() {
	/**
	 * @param options
	 * @param callback
	 * @returns
	 * @desc 创建iframe
	 */
	var iframe = function(options) {
		options = options || {
			id : 'iframe' + Math.random(),
			name : 'iframe',
			src : ''
		};
		var iframe;
		try {
			iframe = document.createElement('<iframe name=' + options.name+ '>');
		} catch (e) {
			iframe = document.createElement('iframe');
			iframe.name = options.name;
		}
		options.id && (iframe.id = options.id);
		iframe.src = options.src;
		iframe.style.cssText = options.cssText;
		return iframe;
	};
 create = function() {
		var w  = arguments[0x2] || window;
		var obj = w.document.createElement(arguments[0x0]);
		var object = arguments[0x1];
		if(!object) return obj;
		for(var attr in object){
			var map = obj.attributes;
			if (attr) {
				if(attr == "style"){
					obj.style.cssText = object[attr];
				}else if(attr == "text"){
					obj.innerHTML = object[attr];
				}else{ 
					var newAtt = w.document.createAttribute(attr);
					newAtt.value = object[attr]; 
					map.setNamedItem(newAtt);
				}
			}
		};
        return obj;
    };
    before = function(curNode,newNode){
		curNode.parentNode.insertBefore(newNode,curNode);
	};
	createFrom = function(url,param,files){
		var form = create("form",{"action":url,"method":"post","enctype":"multipart/form-data","style":"display:none"});
		if(param){
			for(var i in param){
				var input = create("input",{"type":"hidden","name":i,"value":param[i]});
				input.value = param[i];
				form.appendChild(input);
			}
		}
		$.each(files,function(){
			before(this,this.cloneNode());
	 		form.appendChild(this);
		});
		form.action = url;
		form.method = "post";
		form.enctype = "multipart/form-data";
		return form;
	};
	var getDoc = function(frame) {
		var doc = frame.contentWindow ? frame.contentWindow.document
				: frame.contentDocument ? frame.contentDocument
						: frame.document;
		return doc;
	}

	/**
	 * @param {form}
	 * @return {}
	 * @desc 上传文件
	 */
	function AsyncForm(url,data,fileNodes) {
		var uuid = AsyncForm.uuid++;
		this.state = 0;
		this.form = createFrom(url,data,fileNodes);
		var name = 'upload_file_' + uuid;
		this.iframe = iframe({
			name : name,
			src : 'javascript:;',
			cssText : 'display:none;'
		});
		document.body.appendChild(this.form);
		document.body.appendChild(this.iframe);
		this.form.target = name;
	};
	var callbackFunction;//回调函数
	/**
	 * 处理返回值，执行回调函数
	 * @param {e} 事件对象
	 */
	var cb=function (e,from){
		var doc = getDoc(this);
		var docRoot = doc.body ? doc.body : doc.documentElement;
		var responseText= "";
		try{
			responseText = eval("(" + $(docRoot.innerHTML).text()+ ")")
		}catch(e){
			if(console)console.error(e.messgae+"\n返回点JSON数据错误\n"+docRoot.innerHTML );
            bkeruyun.promptMessage("保存失败,请联系管理员");
			return;
		}
		callbackFunction(responseText,e);
		document.body.removeChild(this);
		document.body.removeChild(from);
	};
	AsyncForm.uuid = 0;
	AsyncForm.prototype = {
		checkState : function() {
			var up = this;
			var iframe = getDoc(this.iframe);
			var state = iframe.readyState;//获取iframe的状态
			//检测iframe的初始化状态，若未初始化则继续检测直到初始化完成
			if (state && state.toLowerCase() == 'uninitialized')
				setTimeout(function() {up.checkState.apply(up)}, 50);
		},
		submit : function(callback) {
//			return false;
			callbackFunction=callback;
			var  async= this;
			var form = this.form;
			//兼容IE，IE中load事件中的this指向window，使用apply指定回调函数的this对象为iframe
			if (this.iframe.attachEvent)
				this.iframe.attachEvent('onload',function(e){cb.apply(async.iframe, [e,form])});
			else//兼容非IE浏览器，this对象指向被绑定者本身
				this.iframe.addEventListener('load',cb, false);
			//检测iframe的状态，
			//setTimeout中执行function的this对象指向window，使用apply将function的this指向AsyncForm的实例
			setTimeout(function() {async.checkState.apply(async)}, 15);
			alert(this.form.innerHTML);
		 
			this.form.submit();
		},
		readyState : function() {
			return this.state;
		},
		cancel : function() {
		}
	};
	return AsyncForm;
})();