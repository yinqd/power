/**
 *
 */
var startObj = $("#date-start"), endObj = $('#date-end');
var datenow = new Date().Format("yyyy-MM-dd");
var mrStart = startDate = datenow;
var mrEnd = endDate = datenow;// 结束时间
var commercialId = "";// 商户编号
var cialDetailTb = new TableStyle("cialDetailTb");
cialDetailTb.base();
cialDetailTb.fixedThead();

//页面初始化
$(function () {

    var orderDetailPopover = new OrderDetail("orderDetailPopover");
    orderDetailPopover.hide();
    $(document).delegate("#cialDetailTb .orderNumber", "click", function (e) {
        var target = $(e.target);
        orderDetailPopover.position(target);
    });

    //初始化日期控件
    initDatePicker();

    searchReport();
    $(document).delegate("#undo-all", "click", function () {
        setDefaultDate();
    });
});

// 默认时间设置
function setDefaultDate() {
    startObj.val(mrStart);
    endObj.val(mrEnd);
    if (!bkeruyun.isPlaceholder()) {
        startObj.next("span").hide();
        endObj.next("span").hide();
    }
}
// 设置开始与结束时间限制
function setStartEndTime() {
    var value = $.trim(startObj.val());
    if (value) {
        var year = value.substring(0, 4), month = value.substring(5, 7), date = value
            .substring(8, 10), setmrEnd = '';
        month = (month.substring(0, 1) == 0) ? parseInt(month.substring(1))
            : parseInt(month);
        if ((month + 3) > 12) {
            year = year * 1 + 1;
            month = '0' + (month + 3) % 12;
        } else if ((month + 3) < 10) {
            month = '0' + (month + 3);
        } else {
            month = month + 3;
        }
        setmrEnd = year + '-' + month + '-' + date;
        setmrEnd = (new Date(setmrEnd) * 1 < new Date() * 1) ? setmrEnd
            : datenow;
        endObj.attr("data-date-endDate", setmrEnd);
    }
}

function searchReport() {
    bkeruyun.showLoading();
    commercialId = $("#commercial").find("option:selected").val();
    query();
}

function query() {
    // 清空表格
    $("#table_head").empty();
    $("#table_content").empty();
    //缓存日期
    setDatePicker();

    var startDate = $('#date-start').val();
    var endDate = $('#date-end').val();
    var commercialID = $("#commercial").val();
    if (commercialID) {

        queryParameter = "startDate=" + startDate + "&endDate=" + endDate
        + "&commercialId=" + commercialID;
    } else {
        queryParameter = "startDate=" + startDate + "&endDate=" + endDate;
    }
    $.ajax({
            type: "POST",
            url: "report/collection/query",
            data: queryParameter,
            dataType: "json",
            beforeSend: bkeruyun.showLoading,
            success: function (data) {
                bkeruyun.hideLoading();
                if (getJsonLength(data) > 0) {
                    var allsize = data.all, svsize = data.storedValue, dsize = data.deposit, head = data.header, body = data.body, totalcount = 0;
                    var total = new Array();
                    total.length = head.length;
                    for (var int = 0; int < total.length; int++) {
                        total[int] = 0;
                    }
                    var header = '<tr id="first_header"><th rowspan="2" width="100">日期</th><th rowspan="2" width="200">总金额</th><th colspan="' + (allsize + 2) + '" width="'
                        + (allsize + 2) * 100 + '">收银总额</th>';
                    if (svsize > 0) {
                        header += '<th colspan="' + svsize + '" width="' + (svsize)
                        * 100 + '">储值详情</th>';
                    }
                    if (dsize > 0) {
                        header += '<th colspan="' + dsize + '" width="' + (dsize) * 100
                        + '">预定金详情</th>';
                    }
                    $("#table_head").html(header);
                    // 生成动态表头
                    $("#table_head").append();
                    var thHtml = '<tr>';
                    for (var cashType in head) {
                        thHtml += '<th width="100">' + head[cashType]
                        + '</th>';
                    }
                    thHtml += '</tr>';
                    $("#table_head").append(thHtml);
                    // 填充统计数据
                    var dataHtml = "";
                    for (var i = 0; i < body.length; i++) {
                        var cs = body[i];
                        dataHtml += '<tr><td>' + cs['bizDate'] + '</td><td>' + cs['total'].toFixed(2) + '</td>';
                        for (var int = 0; int < allsize + 2; int++) {
                            dataHtml += '<td>' + cs[head[int]].toFixed(2) + '</td>'
                            total[int] += cs[head[int]];
                        }
                        for (var int = allsize + 2; int < allsize + 2 + svsize; int++) {
                            dataHtml += '<td>' + cs['cz_' + head[int]].toFixed(2) + '</td>'
                            total[int] += cs['cz_' + head[int]];
                        }
                        for (var int = head.length - dsize; int < head.length; int++) {
                            dataHtml += '<td>' + cs['yf_' + head[int]].toFixed(2) + '</td>'
                            total[int] += cs['yf_' + head[int]];
                        }
                        totalcount += cs['total'];
                        /*							for ( var a in cs) {
                         if (a == 'total') {
                         totalcount += cs[a];
                         }
                         for (var int = 0; int < allsize + 2; int++) {
                         if (a == head[int]) {
                         total[int] += cs[a];
                         }
                         }
                         for (var int = allsize + 2; int < allsize + 2
                         + svsize; int++) {
                         if (a == 'cz_' + head[int]) {
                         total[int] += cs[a];
                         }
                         }
                         for (var int = head.length - dsize; int < head.length; int++) {
                         if (a == 'yf_' + head[int]) {
                         total[int] += cs[a];
                         }
                         }
                         if (a=='bizDate') {
                         dataHtml += '<td>' + cs[a] + '</td>';
                         }else {
                         dataHtml += '<td>' + cs[a].toFixed(2) + '</td>';
                         }
                         }*/
                        dataHtml += '</tr>';
                    }
                    dataHtml += '<tr><td>合计</td><td>' + totalcount.toFixed(2) + '</td>';
                    for (var i = 0; i < total.length; i++) {
                        dataHtml += '<td>' + total[i].toFixed(2) + '</td>';
                    }
                    dataHtml += '</tr>';
                    $("#table_content").append(dataHtml);
                    // 填充合计行数据
                } else {
                    var message = bkeruyun.notQueryData("没有查到数据");
                    $("#table_content").append(message);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                bkeruyun.hideLoading();
                alert("网络异常，请检查网络连接状态！");
            }
        });
}
// 获取json长度
function getJsonLength(jsonData) {

    var jsonLength = 0;

    for (var item in jsonData) {

        jsonLength++;

    }

    return jsonLength;
}
