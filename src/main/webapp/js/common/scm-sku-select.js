var gridTableId = '#skuSelectGrid';
var skuSelectModalId = '#skuSelectModal';
var skuTypesInitialized = false;
var outterGridId, $gridObj;

$(function () {
    outterGridId = $('#outterGridId').val();
    $gridObj = $('#' + outterGridId);

    //添加商品绑定
    $(document).delegate('#btnSelectSku', 'click', function () {
        $(skuSelectModalId).modal({
            backdrop: 'static'
        });
        clearConditions(); // 清空查询条件
        $(gridTableId).jqGrid('setGridParam', {datatype: 'local'}).trigger('reloadGrid');
        getSkuInfo();
    });
    //删除商品绑定
    $(document).delegate('#btnDeleteSku', 'click', function () {
        var ids = $gridObj.jqGrid("getGridParam", "selarrrow");
        if (ids == undefined || ids.length == 0) {
            bkeruyun.promptMessage('请选择商品');
            return false;
        }
        var len = ids.length;
        Message.confirm({title: "提示", describe: "是否删除商品?"}, function () {
            for (var i = 0; i < len; i++) {
                $gridObj.jqGrid('delRowData', ids[0]);
            }
            $('#cb_' + outterGridId).attr('checked', false); // 重置checkbox为未选中
        });

    });

});

function clearConditions() {
    initSkuTypes();
    $('#skuTypeId').parent().find('ul li:first').click();
    $('input[name=skuCodeOrName]').val('');
}

function initSkuTypes() {
    if (skuTypesInitialized) {
        return false;
    }

    var $skuTypes = $('#skuTypeId');
    //获取商品中类
    $.ajax({
        url: ctxPath + "/common/getSkuTypes",
        type: "post",
        async: false,
        dataType: "json",
        success: function (data) {
            var option = '';
            var li = '';
            jQuery.each(data, function (index, sku) {
                option += '<option value="' + sku.skuTypeId + '">' + sku.skuTypeName + '</option>';
                li += '<li>' + sku.skuTypeName + '</li>';
            });
            $skuTypes.append(option);
            $skuTypes.parent().find('ul').append(li);
            skuTypesInitialized = true;
        }
    });
}


function refreshSkuInfo() {
    $(gridTableId).refresh(); // 第二次及之后的查询
}

//加载商品信息
function getSkuInfo() {
    var $gridObj = $(gridTableId);
    $gridObj.dataGrid({
        formId: "skuselectConditions",
        url: ctxPath + '/common/getSkuJqGridData',
        datatype: 'local',
        showEmptyGrid: true,
        rownumbers: true,
        shrinkToFit: false,
        autoScroll: true,
        multiselect: true,
        multiselectWidth: 49,
        height: 350,
        colNames: ['id', '所属分类', '商品编码', '商品名称（规格）', '单位', '价格'],
        colModel: [
            {name: 'id', index: 'id', hidden: true},
            {name: 'skuTypeName', index: 'skuTypeName', align: "center", width: 200},
            {name: 'skuCode', index: 'skuCode', align: "center", width: 200},
            {name: 'skuName', index: 'skuName', align: "center", width: 250},
            {name: 'uom', index: 'uom', align: "center", width: 100},
            {name: 'price', index: 'price', align: "center", width: 150}
        ],
        sortname: 'skuCode',
        pager: "",
        rowNum: "0"
    });
}

//增加商品到外部表格
function addSku() {
    if (outterGridId == undefined || outterGridId == '') {
        alert('表格id不能为空');
        return false;
    }

    var skuIdColName = $('#skuIdColName').val(); // default : skuId
    var skuIds = $gridObj.getCol(skuIdColName);

    var selectedRowIds = $(gridTableId).jqGrid("getGridParam", "selarrrow");
    if (selectedRowIds == undefined || selectedRowIds == null || selectedRowIds.length == 0) {
        layer.alert("未选择任何商品，请勾选商品后点击添加！", {offset: '30%'}, function (index) {
            layer.close(index);
        });
        return false;
    }
    //表格数据有变动后再重载表格
    for (var i = 0; i < selectedRowIds.length; i++) {
        var rowIdToInsert = selectedRowIds[i];
        if (skuIds.indexOf(rowIdToInsert) == -1) {
            $gridObj.jqGrid("addRowData", rowIdToInsert, $(gridTableId).getRowData(rowIdToInsert));
        }
    }
}
