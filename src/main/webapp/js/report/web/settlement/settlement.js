var today = new Date().Format("yyyy-MM-dd");

var startTimeObj = $("#date-start"),
    endTimeObj = $("#date-end");

$(function () {
    //初始化日期控件
    initDatePicker();
    pageInit();
    /**
     开始时间与结束时间的间隔时间不能大于一年
     **/
    startTimeObj.attr("data-date-endDate", today);
    startTimeObj.on("change", function () {
        var _value = $.trim($(this).val()),
            _maxDate = (_value.substring(0, 4) * 1 + 1) + _value.substring(4),
            _endTimeValue = (new Date(_maxDate) * 1 > new Date() * 1) ? today : _maxDate;
        endTimeObj.attr("data-date-endDate", _endTimeValue);
    });
});

function query() {
    //缓存查询日期
    setDatePicker();
    bkeruyun.showLoading(); //加载页面
    var $gridObj = $("#list2");
    $gridObj.refresh();
    bkeruyun.hideLoading();
//    window.location.reload();//刷新当前页面.
};


function pageInit() {
    var $gridObj = $("#list2");
    $gridObj.dataGrid({
        formId: "queryConditions",//form表单id
        serializeGridDataCallback: function (formData) {
            if (typeof formData.settlementstatus == "object" || formData.settlementstatus == undefined) {
                formData["settlementstatus"] = "";
            }
            return formData;
        },
        beforeRequestCallback : function(){
        	
        },
        rowNum: 10,
        url: "report/settlementController/list",//请求地址
        colNames: ['订单号', '来源', '单据类型', '交易时间', '支付方式', '支付金额', '结算状态', '结算时间'],//列显示名称
        //列显示属性，具体查看jqGrid api
        colModel: [
            {name: 'orderid', index: 'orderid', width: 100},
            {name: 'source', index: 'source', width: 90, formatter: sourceformat},
            {name: 'ordertype', index: 'ordertype', width: 90, formatter: ordertypeformat},
            {
                name: 'createTime',
                index: 'createTime',
                width: 150,
                formatter: "date",
                formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d H:i:s'}
            },
            {
                name: 'payPlatform', index: 'payPlatform', width: 100,
                formatter: payPlatformFormat
            },
            {name: 'price', index: 'price', width: 100},
            {
                name: 'settlementstatus',
                index: 'settlementstatus',
                width: 80,
                formatter: function (value) {
                    if (value == 1) {
                        return "已结算";
                    } else {
                        return "未结算";
                    }
                }
            },
            {name: 'settlementtime', index: 'settlementtime', width: 150}
        ],
        // sortname: 'transferOrderNo',//默认排序字段，如果不需要不设置
        pager: "#pager2"//分页栏，如果不分页不设置
    });
};

function ordertypeformat(cellvalue, options, rowObject) {
    return TradeBusinessTypeEnum.getViewValue(cellvalue);
};

function payPlatformFormat(cellvalue, options, rowObject) {
    if (rowObject.ordertype == "SM") {
        if (cellvalue == "2") {
            return "微信";
        } else if (cellvalue == "1") {
            return "支付宝";
        } else if (cellvalue == "3") {
            return "百度钱包";
        }
    } else if (rowObject.ordertype == "CZ" || rowObject.ordertype == "SP") {
        if (cellvalue == "0") {
            return "微信";
        } else if (cellvalue == "1") {
            return "支付宝";
        } else if (cellvalue == "2") {
            return "百度钱包";
        }
    } else {
        return PaymentModeEnum.getViewValue(cellvalue);
    }
};

function sourceformat(cellvalue, options, rowObject) {
    if (rowObject.ordertype == "SP") {
        return "微信";
    } else if (rowObject.ordertype == "SM") {
        return cellvalue;
    } else if (rowObject.ordertype == "CZ") {
        return CustomerSourceEnum.getViewValue(cellvalue);
    } else {
        return TradeSourceEnum.getViewValue(cellvalue);
    }
};

var ajax_flag = true;
$("#header .article-header .sqjs").show();
$("#header .article-header .sqjs").click(function(){
    if (ajax_flag) {
    	if($("#gbox_list2").css("display")=="block"){
    		ajax_flag = false;
    		 $.post("report/settlementController/toSettlement",function (result) {
                    if (result.msg != 'sorry,你没有要结算的订单哦！！！！') {
                        $("#list2").jqGrid('setGridParam', {
                            page: $("#list2").jqGrid('getGridParam', 'page'),
                            datatype: 'json'
                        }).trigger('reloadGrid');
                    }
                    alert(result.msg);
                    ajax_flag = true;
                });
    	}
    } else {
        alert("请不要频繁操作!!!");
    }
})