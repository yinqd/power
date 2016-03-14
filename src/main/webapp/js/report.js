$(function () {
    $(".report-items-level2").each(function () {
        if ($(this).next().is(".report-items-level2")) {
            $(this).css({"border-bottom": "0 none"});
        }
    });
});

//初始化日期控件
function initDatePicker() {
    var now = new Date().Format("yyyy-MM-dd");
    var $dateStart = $('#date-start');
    var $dateEnd = $('#date-end');
    if ($dateStart) {
        $dateStart.val(now);
    }
    if ($dateEnd) {
        $dateEnd.val(now);
    }
};

//缓存查询日期
function setDatePicker() {
    var now = new Date().Format("yyyy-MM-dd");
    var $dateStart = $('#date-start');
    var $dateEnd = $('#date-end');
    if ($dateStart) {
        var dateStart = $dateStart.val();
        if (!dateStart) {
            dateStart = now;
            $dateStart.val(now);
        }
    }

    if ($dateEnd) {
        var dateEnd = $dateEnd.val();
        if (!dateEnd) {
            $dateEnd.val($dateStart.val() > now ? $dateStart.val() : now);
            dateEnd = $dateEnd.val();
        }
    }
};

var report = {
    //点击展开 查看详情
    folding: (function () {
        $(document).delegate(".report-table > .report-table-row", "click", function () {
            var nextObj = $(this).next(".report-table-details");
            if (nextObj.is(":hidden")) {
                nextObj.show();
                $(this).addClass("report-table-down");
            } else {
                nextObj.hide();
                $(this).removeClass("report-table-down");
            }
        });
    })(),
    ////报表二级列表重新分配宽度
    resetItemsLevel2: function (obj) {
        var itemsParent = $(obj),
            items = itemsParent.find("li"),
            len = items.length,
            w = itemsParent.innerWidth();
        //小于6个宽度平均分配
        if (len < 6) {
            var newLiW = Math.floor(w / len) - 1 + 'px';
            items.width(newLiW);
            if (!itemsParent.next().is(".report-items-level2")) {
                itemsParent.css({"border-bottom": "1px solid #c8c8c8"});
            }
            //等于6 什么都不做
        } else if (len % 6 == 0) {
            itemsParent.css({"border-bottom": "0 none"});
            itemsParent.find("li").css({"border-bottom": "1px solid #c8c8c8"});
            return;
            //大于6换行 添加补白
        } else if (len > 6 && len % 6 != 0) {
            var spaceLi = '',
                spaceLiLen = 6 - len % 6;
            for (var i = 0; i < spaceLiLen; i++) {
                spaceLi += '<li></li>';
            }
            itemsParent.append(spaceLi);
            itemsParent.css({"border-bottom": "0 none"});
            itemsParent.find("li").css({"border-bottom": "1px solid #c8c8c8"});
        }
    },
    //计算公式
    formulaTip: (function () {
        $(".formula-tip > span").hover(function () {
            $(".formula-tip > p").show();
        }, function () {
            $(".formula-tip > p").hide();

        });
    })()
};
/**
 table style
 **/
function TableStyle(id) {
    this.id = id;
    this.tbObj = $("#" + this.id);
    this.theadObj = this.tbObj.find(".transverse-thead");
    this.tbodyObj = this.tbObj.find(".transverse-tbody");
    this.tfootObj = this.tbObj.find(".transverse-tfoot");
    this.theadHeight = parseInt(this.theadObj.height());
};
TableStyle.prototype = {
    base: function () {
        var that = this;
        var theadObjLists = that.theadObj.find("li");
        var tbodyObjLists = that.tbodyObj.find("ul");
        var tfootObjLists = that.tfootObj.find("li");
        var iw = 0;
        for (var i = 0, len = theadObjLists.length; i < len; i++) {
            var itemW = parseInt(theadObjLists.eq(i).outerWidth());
            iw += itemW;
        }
        that.theadObj.width(iw + "px");
        that.tbodyObj.width(iw + "px");
        that.tfootObj.width(iw + "px");
    },
    setTbleHeight: function () {
        var height = parseInt($(window).height()) - parseInt($("#header").outerHeight()) - parseInt($("#footer").outerHeight()) - 40;
        this.tbObj.height(height + 'px');
    },
    fixedThead: function () {
        var that = this;
        that.setTbleHeight();
        that.tbObj.css({"position": "relative", "padding-top": that.theadHeight + 'px', "z-index": 1});
        that.theadObj.css({"position": "absolute", "left": "0px", "top": "0px", "z-index": 1000});
        that.tbObj.scroll(function () {
            var top = parseInt(that.tbObj.scrollTop());
            that.theadObj.css("top", top + "px");
        });
    },
    fixedLeft: function (n) {
        var that = this;
        var pleft = 0;
        var fixedSide = $('<div></div>');
        var fixedSideThead = $('<ul class="transverse-thead"></ul>');
        var fixedSideTbody = $('<div class="transverse-tbody"></div>');
        that.setTbleHeight();
        for (var i = 0; i < n; i++) {
            var itemW = parseInt(that.theadObjLists.eq(i).outerWidth());
            var theadItemClone = that.theadObjLists.eq(i).clone(true);
            fixedSideThead.append(theadItemClone);
            pleft += itemW;
        }
        that.tbObj.css({"position": "relative", "padding-left": pleft + 'px'});
        that.theadObj.css({"position": "absolute", "left": pleft + 'px', "top": "0px"});
        fixedSide.append(fixedThead).css({"position": "absolute", "left": '0px', "top": "0px"});
    }
};
/**
 * 账单明细 点击单据号查看明细
 * @param id {string} 弹框id
 * @param positionedObjId {string} 定位元素Id
 */
function OrderDetail(id, positionedObjId) {
    this.id = id;
    this.positionedObj = $("#" + positionedObjId);
    this.popover = $('#' + this.id);
    this.closeBtn = this.popover.find(".close");
    this.close();
};

OrderDetail.prototype = {
    show: function () {
        if (this.popover.is(":hidden")) {
            this.popover.show();
        }
    },
    hide: function () {
        if (this.popover.is(":visible")) {
            this.popover.hide();
        }
    },
    position: function (target) {
        var target = $(target),
            offset = target.offset(),
            wOffset = this.positionedObj.offset(),
            posObjScrollTop = this.positionedObj.scrollTop(),
            oW = target.width(),
            oH = target.height(),
            popH = this.popover.height(),
            posX = (offset.left - wOffset.left) + oW,
            posY = (offset.top + posObjScrollTop - wOffset.top) - 10;
        this.popover.css({"left": posX + 'px', "top": posY + 'px'});
        this.show();
    },
    data: function (string) {},
    close: function () {
        var that = this;
        that.closeBtn.click(function () {
            that.hide();
        });
    }
};
