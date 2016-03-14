$(function () {
    $(".js-save").on("click", function () {
        args = new Object();
        args.url = saveOrUpdateUrl;
        args.checkUrl = checkUrl;
        args.nextUrl = listUrl;
        args.btn = $(this);
        args.btn.addClass('btn-disabled');
        args.postData = getFormData();
        if(!validateFormData(args)){
            return;
        }
        submitFormData(args);
    });
    $(".js-go-on").on("click", function () {
        args = new Object();
        args.url = saveOrUpdateUrl;
        args.checkUrl = checkUrl;
        args.btn = $(this);
        args.btn.addClass('btn-disabled');
        args.postData = getFormData();
        if(!validateFormData(args)){
            return;
        }
        submitFormData(args);
    });
    $(".js-back").on("click", function () {
        args = new Object();
        args.formObj = $("#" + formId);
        args.clickYesCallback = "$.clickYesCallback";
        args.clickNoCallback = "$.clickNoCallback";
        ifFormChanged(args);
    });
    $.clickYesCallback = function (args) {
        $(".js-save").click();
    };

    $.clickNoCallback = function (args) {
        location.href = listUrl;
    };

});

function validateFormData(args){
    var validName=true;
    if(""==args.postData.name){
        validate.showErrors({
            "name": "此字段为必填"
        });
        args.btn.removeClass("btn-disabled");
        return false;
    }
    if(!checkPaymentModeName(args.postData.name)){
        validate.showErrors({
            "name": "名称不可重复，不能包含@#!等特殊字符"
        });
        args.btn.removeClass("btn-disabled");
        return false;
    }
    if(!checkMoney() || !checkSort()){
        args.btn.removeClass("btn-disabled");
        return false;
    }
    var posturl = encodeURI(encodeURI(args.checkUrl +"?id="+args.postData.id+"&name=" + args.postData.name + "&random=" + Math.random()));
    $.ajax({
        type: "POST",
        url: posturl,
        data: {},
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        success: function (data) {
            if(!data){
                validate.showErrors({
                    "name": "支付方式已存在，请检核！"
                });
                args.btn.removeClass("btn-disabled");
            }
            validName = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            setTimeout(function () {
                args.btn.removeClass("btn-disabled");
            }, 500);
            bkeruyun.promptMessage("网络异常，请检查网络连接状态！");
        }
    });
    return validName;
}

function submitFormData(args) {
    $.ajax({
        type: "POST",
        url: args.url,
        data: $.toJSON(args.postData) + "&random=" + Math.random(),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        success: function (data) {
            bkeruyun.promptMessage(data.message);
            if (data.success) {
                if (!args.nextUrl) {
                    $("#" + formId)[0].reset();
                    $(".checkbox-check").each(function(){
                        if("defaultChecked" != $(this).attr("mark")) {
                            $(this).removeClass("checkbox-check");
                        }
                    });
                } else {
                    setTimeout(function () {
                        location.href = args.nextUrl;
                    }, 500);
                }
            } else {
                location.reload();
            }
            setTimeout(function () {
                args.btn.removeClass("btn-disabled");
            }, 500);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            canSaveSubmit = true;
            setTimeout(function () {
                args.btn.removeClass("btn-disabled");
            }, 500);
            bkeruyun.promptMessage("网络异常，请检查网络连接状态！");
        }
    });
}

function getFormData(){
    var paymentModeVo={};
    paymentModeVo.id=$("#paymentModeId").val();
    paymentModeVo.name=$("#name").val();
    paymentModeVo.aliasName=$.trim($("#aliasName").val());
    paymentModeVo.sort=$.trim($("#sort").val());
    paymentModeVo.faceValue=$.trim($("#faceValue").val());
    $(":checkbox[name='chenckBoxNmae']:checked").each(function(){
        if("isChange"==$(this).attr("id")){
            paymentModeVo.isChange=1;
        }else if("isDiscount"==$(this).attr("id")){
            paymentModeVo.isDiscount=1;
        }else if("isInvoice"==$(this).attr("id")){
            paymentModeVo.isInvoice=1;
        }else if("isRefund"==$(this).attr("id")){
            paymentModeVo.isRefund=1;
        }
    });
    if(1!=paymentModeVo.isChange){
        paymentModeVo.isChange=2;
    }
    if(1!=paymentModeVo.isDiscount){
        paymentModeVo.isDiscount=2;
    }
    if(1!=paymentModeVo.isInvoice){
        paymentModeVo.isInvoice=2;
    }
    if(1!=paymentModeVo.isRefund){
        paymentModeVo.isRefund=2;
    }
    paymentModeVo.enabledFlag=1;
    paymentModeVo.statusFlag=1;
    var templetPaymentModeList = new Array();
    $(":checkbox[name='sample']:checked").each(function(){
        var TempletPaymentMode = {};
        TempletPaymentMode.templetId=$(this).val();
        TempletPaymentMode.statusFlag=1;
        templetPaymentModeList.push(TempletPaymentMode);
    });
    paymentModeVo.templetPaymentModeList=templetPaymentModeList;
    return paymentModeVo;
}

function ifFormChanged(args) {
        var clickYesCallback = args.clickYesCallback,
        clickNoCallback = args.clickNoCallback,
        isChanged = false;
    var data = getFormData();
    if(data.name != $("#nameOld").val() || data.aliasName != $("#aliasNameOld").val() || data.sort != $("#sortOld").val() || data.faceValue != $("#faceValueOld").val()
        || data.isChange != $("#isChangeOld").val() || data.isDiscount != $("#isDiscountOld").val() || data.isInvoice != $("#isInvoiceOld").val() || data.isRefund != $("#isRefundOld").val()){
        isChanged = true;
    }
    if(data.templetPaymentModeList.length != $("input[name='templetList']").length){ //$("input[name='templetList']").length
        isChanged = true;
    }
    var idList = new Array();
    if(data.templetPaymentModeList.length>0){
        for(var i=0;i<data.templetPaymentModeList.length;i++){
            idList.push(data.templetPaymentModeList[i].templetId);
        }
    }
    $("input[name='templetList']").each(function(){
        var checkedVal = $(this).val();
        if(idList.indexOf(checkedVal)<0){
            isChanged = true;
        }
    });
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
}