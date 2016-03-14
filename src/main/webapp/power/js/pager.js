;
(function ($, window, document, undefined) {
    var methods = {
        init: function (obj, option) {
            return (function () {
                methods.fillHtml(obj, option);
                methods.bindEvent(obj,option);
            })();//立即执行
        },

        bindEvent: function (obj, option) {
            //给每个页码设置点击事件.
            return (function(){
               obj.on('click','li>a',function(e){
                   e.preventDefault();
                   var pageCurrent=parseInt($(this).attr("data"));
                   debugger;
                   if(pageCurrent<1||pageCurrent>option.pageTotal){
                       return false;
                   }
                   option.pageCurrent=pageCurrent;
                   methods.fillHtml(obj,option);
                   if(typeof(option.callback)=="function" ){
                       option.callback();//执行回调函数
                   }
               });
            })();
        },
        fillHtml: function (obj, option) {
            obj.empty();
            //设置链接
            var pageCurrent =option.pageCurrent;
            var prevPage = pageCurrent - 1;
            var nextPage = pageCurrent + 1;
            var pageSize = option.pageSize;
            var total = option.total;

            var pageTotal = parseInt(total / pageSize);
            if (pageTotal < 1) {
                pageTotal = 1;
            } else if (total % pageSize > 0) {
                pageTotal = pageTotal + 1;
            }
            option.pageTotal=pageTotal;
            //各个页码的生成
            var lis = [];
            lis.push(methods.createPrevElement(prevPage));
            if (pageTotal <= 1) {

            } else if (pageTotal > 1 && pageTotal <= 10) {//总条数最多10条: 直接显示所有页码
                for (var pageNo = 1; pageNo <= pageTotal; pageNo++) {
                    var pageLi = methods.createPageNo(pageNo, pageCurrent);
                    lis.push(pageLi);
                }
            } else { //总条数超过10条,再根据当前页码来设置要显示的页码
                if (pageCurrent < 7) {
                    for (var pageNo = 1; pageNo <= 7; pageNo++) {
                        var pageLi = methods.createPageNo(pageNo, pageCurrent);
                        lis.push(pageLi);
                    }
                    //设置最后三页
                    lis.push(methods.lastThreePageNo(pageTotal));
                } else if (pageCurrent >= 7 && pageCurrent < pageTotal - 3) {
                    //设置前三页
                    lis.push(methods.firstThreePageNo());

                    //设置中间页码 中间显示5个页码
                    for (var pageNo = pageCurrent - 2; pageNo <= pageCurrent + 2; pageNo++) {
                        var pageLi = methods.createPageNo(pageNo, pageCurrent);
                        lis.push(pageLi);
                    }

                    //设置最后三页
                    lis.push(methods.lastThreePageNo(pageTotal));
                } else {
                    //设置前三页
                    lis.push(methods.firstThreePageNo());

                    //设置后面页码
                    for (var pageNo = pageTotal - 6; pageNo <= pageTotal; pageNo++) {
                        var pageLi = methods.createPageNo(pageNo, pageCurrent);
                        lis.push(pageLi);
                    }
                }
            }
            lis.push(methods.createNextElement(nextPage, pageTotal));
            var ul = '<ul class="pagination">' + lis.join("") + '</ul>';
            obj.append(ul);
        },

        //创建页码
        createPageNo: function (pageNo, pageCurrent) {
            var pageLi = '<li>';
            if (pageNo == pageCurrent) {
                pageLi = '<li class="active">';
            }
            pageLi += '<a href="#" data="' + pageNo + '">' + pageNo + '</a></li>';
            return pageLi;
        },

        //创建前三页
        firstThreePageNo: function () {
            var lis = [];
            for (var pageNo = 1; pageNo <= 3; pageNo++) {
                lis.push(methods.createPageNo(pageNo));
            }
            lis.push("<li><a>...</a></li>");
            return lis.join("");
        },

        //创建后三页
        lastThreePageNo: function (pageTotal) {
            var lis = [];
            lis.push('<li><a>...</a></li>');
            for (var pageNo = pageTotal - 2; pageNo <= pageTotal; pageNo++) {
                lis.push(methods.createPageNo(pageNo));
            }
            return lis.join("");
        },

        //创建上一页
        createPrevElement: function (prevPage) {
            var prevLi = '<li class="prev"><a href="#" data="' + prevPage + '">&laquo;上一页</a></li>';
            if (prevPage < 1) {
                prevLi = '<li class="prev disabled"><a data="' + prevPage + '">&laquo;上一页</a></li>';
            }
            return prevLi;
        },

        //创建下一页
        createNextElement: function (nextPage, pageTotal) {
            var nextLi = '<li class="next"><a href="#" data="' + nextPage + '">下一页&raquo;</a></li>';
            if (nextPage > pageTotal) {
                nextLi = '<li class="next disabled"><a data="' + nextPage + '">下一页&raquo;</a></li>';
            }
            return nextLi;
        }
    };


    //暴露接口
    $.fn.Pager = function (option) {
        var option = $.extend({
            total:0,//总页数
            pageSize: 20,//每页大小
            pageCurrent: 1, //当前页码
            callback:function(){}
        }, option);
        methods.init(this, option);
    };
})(jQuery, window, document);