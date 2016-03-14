<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <base href="${ctxPath}">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
    <!-- css begin -->
    <link rel="stylesheet" href="${ctxPath}/themes/style/css/inventory.css">
    <!-- css end -->
    <title>移库单</title>
</head>

<body>
<div class="article-header">
    <div class="center-block w1200">
        <h1>移库单</h1>

        <div class="btn-wrap pull-right tar">
            <a href="${ctxPath}/transferorder/add" target="_self" class="btn-link ml10" id="btn-create">创建</a>
        </div>
    </div>
</div>
<div class="center-block panel-group mt20">
    <!-- 左栏 start -->
    <div class="aside">
        <form id="queryConditions" action="#" method="post">
            <!-- 模糊查询 start -->
            <div class="aside-column panel-search">
                <h2>模糊查询</h2>

                <div class="search-box">
                    <input type="text" name="transferOrderNo" id="orderNo" class="form-control" placeholder="请输入单据号"
                           data-type="word" maxlength="14">
                    <button type="button" class="close" aria-hidden="true">&times;</button>
                </div>
            </div>
            <!-- 模糊查询 end -->
            <!-- 移出仓库 start -->
            <div class="aside-column">
                <h2>移出仓库</h2>

                <div>
                    <select class="form-control" name="fromWmId" id="fromWmId">
                        <option value="">请选择移出仓库</option>
                        <c:forEach items="${warehouseList}" var="item">
                            <c:choose>
                                <c:when test="${item.isDisable}">
                                    <option value="${item.id}">${item.warehouseName}(已停用)</option>
                                </c:when>
                                <c:otherwise>
                                    <option value="${item.id}">${item.warehouseName}</option>
                                </c:otherwise>
                            </c:choose>
                        </c:forEach>
                    </select>
                </div>
            </div>
            <!-- 移出仓库 end -->
            <!-- 移入仓库 start -->
            <div class="aside-column">
                <h2>移入仓库</h2>

                <div>
                    <select class="form-control" name="toWmId" id="toWmId">
                        <option value="">请选择移入仓库</option>
                        <c:forEach items="${warehouseList}" var="item">
                            <c:choose>
                                <c:when test="${item.isDisable}">
                                    <option value="${item.id}">${item.warehouseName}(已停用)</option>
                                </c:when>
                                <c:otherwise>
                                    <option value="${item.id}">${item.warehouseName}</option>
                                </c:otherwise>
                            </c:choose>
                        </c:forEach>
                    </select>
                </div>
            </div>
            <!-- 移入仓库 end -->
            <!-- 确认/保存日期 start -->
            <div class="aside-column">
                <h2>确认/保存日期</h2>

                <div class="search-box">
                    <input type="text" name="createTime" id="saveDate" class="form-control datepicker-start"
                           placeholder="请选择单据保存/确认日期" readonly>
                    <button type="button" class="close" aria-hidden="true">&times;</button>
                </div>
            </div>
            <!-- 确认/保存日期 end -->

            <!-- 状态 start -->
            <div class="aside-column">
                <h2>状态</h2>
                <ul class="panel-list-type">
                    <li><label class="checkbox checkbox-check" for="status-0"><span></span>
                        <input type="checkbox" name="status" id="status-0" checked value="0">已保存</label>
                    </li>
                    <li><label class="checkbox" for="status-1"><span></span>
                        <input type="checkbox" name="status" id="status-1" value="1">已确认</label></li>
                </ul>
            </div>
            <!-- 状态 end -->
        </form>

        <a class="link undo-all" id="undo-all">全部撤销</a>
        <a class="btn-blue btn-search" role="button"
           function="$.doSearch" args="{formId:queryConditions,dataGridId:grid}">查 询</a>
    </div>
    <!-- 左栏 end -->
    <!-- 右栏 start -->
    <div class="panel main">
        <div class="panel-body">
            <!-- grid start -->
            <table id="grid"></table>
            <div id="gridPager"></div>
            <!-- grid end -->
        </div>
        <!-- 右栏 end -->
    </div>
</div>
<script>
    var urlRoot = "${ctxPath}/transferorder/";
    var queryUrl = urlRoot + "query";
    var editUrl = urlRoot + "edit";
    var deleteUrl = urlRoot + "delete";
    var viewUrl = urlRoot + "view";
    var confirmUrl = urlRoot + "doconfirm";

    $(function () {
        //移除仓库不能和移入库相同
        warehouseInOff("toWmId", "fromWmId");
        warehouseInOff("fromWmId", "toWmId");

        $.beforeSend = function (formData) {
            if (typeof formData.status == "object" || formData.status == undefined) {
                formData["status"] = "-1";
            }
            return formData;
        };

        $.show = function (rowData) {
            return rowData.status == 0;
        };

        $.showConfirm = function (rowData) {
            return rowData.status == 1;
        };

        var $gridObj = $("#grid");
        $gridObj.dataGrid({
            fromId: "queryConditions",
            beforeSend: $.beforeSend,
            url: queryUrl,
            colNames: ['id', '单据号', '保存 / 确认日期', '移出仓库', '移入仓库', '移库金额', '状态', '状态'],
            colModel: [
                {name: 'id', index: 'id', width: 50, hidden: true},
                {name: 'transferOrderNo', index: 'transferOrderNo', width: 200},
                {name: 'createTime', index: 'createTime', width: 250},
                {name: 'fromWmName', index: 'fromWmName', width: 150},
                {name: 'toWmName', index: 'toWmName', width: 150},
                {
                    name: 'amount',
                    index: 'amount',
                    width: 150,
                    align: "right",
                    formatter: 'currency',
                    formatoptions: {decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 5, prefix: "￥ "}
                },
                {name: 'statusName', index: 'status', width: 150},
                {name: 'status', index: 'status', width: 150, hidden: true}
            ],
            sortname: 'transferOrderNo',
            pager: "#gridPager",
            actionParam: {
                editor: {
                    url: editUrl,
                    showExpression: $.show
                },
                view: {
                    url: viewUrl,
                    showExpression: $.showConfirm
                },
                confirm: {
                    render: "disabled",
                    url: confirmUrl,
                    showExpression: $.show
                },
                delete: {
                    render: "disabled",
                    url: deleteUrl,
                    showExpression: $.show
                }
            }
        });
    });

    //移入/移出仓库，移出仓库被选中项不在移入仓库显示
    function warehouseInOff(inObjId, offObjId) {
        var inOptions = $("#" + inObjId + ' option');
        var inLis = $("#" + inObjId).parents(".select-group").find("ul").find("li");
        $('#' + offObjId).change(function () {
            var value = $.trim($(this).val());
            //console.log(value);
            inOptions.each(function (i) {
                var inLi = inLis.eq(i);
                if (value === $(this).val()) {
                    inLi.hide();
                } else {
                    inLi.show();
                }
            });
        });
    }

</script>
</body>
</html>