(function ($) {
	
	
    $.fn.dataGrid = function (opts) {
        return new dataGrid(this, opts);
    };

    //刷新表格
    $.fn.refresh = function (toPage) {
        //如果datatype为local修改为默认的json
        if (toPage == undefined || toPage == '') {
            toPage = -1;
        }
        this.jqGrid('setGridParam', {page: toPage, datatype: 'json'}).trigger('reloadGrid');
    };

    function dataGrid(element, opts) {
        return this._init(element, opts);
    }

    dataGrid.prototype = {
        _init: function (element, opts) {
            var _this = this;

            this.opts = $.extend(true, {}, this.defaultOpts, opts || {});
            if (this.opts.showOperate) {
                this.getActionOrder(opts);
                _this.setOperateColumns(element);
            }

            /* this.opts.gridComplete = function () {
             _this.gridComplete(_this.opts, this);
             };*/


            /*            this.opts.beforeRequest = function () {
             _this.beforeRequest(_this.opts, this);
             };
             this.opts.beforeProcessing = function () {
             _this.beforeProcessing(_this.opts, this);
             };*/
            return $(element).jqGrid(this.opts).navGrid(this.opts.pager, this.opts.navGrid);
        },
        defaultOpts: {
            // 基础设置 begin
            width: 900,

            height: 570,
            autowidth: true,
            gridview: true,
            altRows: true,
            rownumbers: false,
            showEmptyGrid: false,
            // 基础设置 end

            // 数据加载 begin
            formId: '',
            datatype: 'json',
            mtype: 'post',
            jsonReader: {
                root: 'dataList',
                repeatitems: false,
                id: 'id'
            },
            localReader: {
                repeatitems: false,
                id: 'id'
            },
            // 数据加载 end

            // 列设置 begin
            colNames: [],
            colModel: [],
            showOperate: false,
            operateColumns: {
                cloName: '',
                model: {
                    name: 'ACTION',
                    width: 130,
                    title: false,
                    align: "center",
                    sortable: false,
                    formatter: null,
                    actionParam: null
                }
            },
            //默认的操作状态,根据定义的顺序显示
            actionParam: {
                delete: {
                    url: '', title: '删除', extraRender: function(rowData){return 'normal';}, showExpression: function(rowData){return true;}
                },
                payment: {
                	url: '', title: '添加支付方式',extraRender: function(rowData){return 'normal';}, showExpression: function(rowData){return true;}
                },
                addgoods: {
                	url: '', title: '添加商品',extraRender: function(rowData){return 'normal';}, showExpression: function(rowData){return true;}
                },
                authorization: {
                	url: '', title: '授权门店',extraRender: function(rowData){return 'normal';}, showExpression: function(rowData){return true;}
                },
                updatepassword: {
                    url: '', title: '重置密码',extraRender: function(rowData){return 'normal';}, showExpression: function(rowData){return true;}
                },
                view: {
                    url: '', title: '查看', extraRender: function(rowData){return 'normal';}, showExpression: function(rowData){return true;}
                },
                confirm: {
                    url: '', title: '确认', extraRender: function(rowData){return 'normal';}, showExpression: function(rowData){return true;}
                },
                editor: {
                    url: '', title: '编辑', extraRender: function(rowData){return 'normal';}, showExpression: function(rowData){return true;}
                },
                clock: {
                    url: '', title: '停用', extraRender: function(rowData){return 'normal';}, showExpression: function(rowData){return true;}
                },
                unlock: {
                    url: '', title: '启用', extraRender: function(rowData){return 'normal';}, showExpression: function(rowData){return true;}
                }
            },
            // 列设置 end

            // 分页 begin
            rowNum: 10,
            rowList: [10, 20],
            page: 1,
            pager: '',
            viewrecords: true,
            // 分页 end
            //工具栏
            navGrid: {
                search: false, edit: false, add: false, del: false,refresh:false
            },
            // 排序 begin
            sortname: '',
            sortorder: "desc",
            // 排序 end

            //事件回调 begin
            beforeRequestCallback: '',
            serializeGridDataCallback: '',
            //事件回调 end

            //事件
            beforeRequest: function () {
                var $grid = $(this);
                //执行回调处理表单数据
                var callback = $grid.jqGrid('getGridParam', 'beforeRequestCallback');
                if ($.isFunction(callback)) {
                    return callback();
                }
            },
            serializeGridData: function (postData) {
                var $grid = $(this);
                var formId = $grid.jqGrid('getGridParam', 'formId');
                if (formId != '' && formId != undefined) {
                    //加入表单数据
                    postData = $.extend(true, {}, postData, $("#" + formId).getFormData() || {});
                }
                var callback = $grid.jqGrid('getGridParam', 'serializeGridDataCallback');
                if ($.isFunction(callback)) {
                    postData = callback(postData);
                }
                return $.param(objectToArray(postData));
            },
            loadComplete: function () {
                var $gridObj = $(this);
                //控制是否显示空表头
                if ($gridObj.jqGrid('getGridParam', 'showEmptyGrid')) {
                    return;
                }
                var rowData = $gridObj.getDataIDs();
                var $gridDom = $('#gbox_' + $gridObj.jqGrid('getGridParam', 'id'));
                var $gridDivDom = $gridDom.parent();
                var $notSearch = $gridDom.parent().find(".notSearchContent");
                if (rowData.length > 0) {
                    //表格有数据，显示表格元素，并隐藏无数据提示元素
                    $gridDivDom.show();
                    $gridDom.show();
                    if ($notSearch.length > 0) {
                        $notSearch.hide();
                    }
                } else {
                    //表格无数据，隐藏表格自身元素，显示无数据提示元素
                    $gridDom.hide();
                    $gridDivDom.show();
                    if ($notSearch.length > 0) {
                        $notSearch.show();
                    } else {
                        var notData = bkeruyun.notQueryData("没有查到数据，试试其他查询条件吧！");
                        $gridDivDom.append(notData);
                    }
                }
            }
        },
        getActionOrder: function (opts) {
            var index = [], actionParam = this.opts.actionParam;
            for (var item in opts.actionParam) {
                index.push(item);
            }
            for (var item in actionParam) {
                if (index.indexOf(item) === -1) {
                    index.push(actionParam);
                }
            }
            var tempActionParam = {};
            for (var p = 0; p < index.length; p++) {
                var obj = index[p];
                if (actionParam[obj]) {
                    tempActionParam[obj] = actionParam[obj]
                }
            }
            this.opts.actionParam = tempActionParam;
        },
        actionFormatter: function (cellvalue, options, rowObject, element) {
            var actionCol = this.opts.actionParam, str = '';
            for (var col in actionCol) {
                var colVal = actionCol[col];
	            if (colVal.showExpression(rowObject)) {
	            	var extraRender = colVal.extraRender(rowObject);
	            	if (extraRender === 'disabled') {
	                    str += "<a title='" + colVal.title + "' class='icon-" + col + " icon-" + col + "-disable'>" + colVal.title + "</a>";
	            	} else {
	                    str += "<a href='javascript:void(0);' title='" + colVal.title + "' " +
	                    "function='$.do" + UpperFirstLetter(col) + "' " +
	                    "args='{url:\"" + colVal.url + "\",dataGridId:\"" + element[0].id + "\",postData:{id:\"" + rowObject.id + "\"},callback:\"" + colVal.callback + "\"}' " +
	                    "action='" + col + "' class='icon-" + col + "'>" + colVal.title + "</a>";
	            	}
	            } else if (colVal.render === 'disabled') {
	                    str += "<a title='" + colVal.title + "' class='icon-" + col + " icon-" + col + "-disable'>" + colVal.title + "</a>";
            	}
            }
            return str;
        },
        setOperateColumns: function (element) {
            var _this = this,
            	operateColName = _this.opts.operateColName;
            _this.opts.operateColumns.model.formatter = function (cellvalue, options, rowObject) {
                return _this.actionFormatter(cellvalue, options, rowObject, element);
            };
            this.opts.operateColumns.model.actionParam = _this.opts.actionParam;
            if (!operateColName) {
            	operateColName = this.opts.operateColumns.cloName;
            }
            this.opts.colNames.push(operateColName);
            this.opts.colModel.push(this.opts.operateColumns.model);
        },
        gridComplete: function (opts, gridElement) {

        }

    }
})(jQuery);