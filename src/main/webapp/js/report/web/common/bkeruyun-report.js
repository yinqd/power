/**
 * base
 * 依赖 echarts.js
 * 为 template.js 提供便利方法
 */
(function(root, undefined){
    // template
    var root = root||{};
    var templateUtil = {
        //格式化百分分数 
        // 如: 0.5 --> 50%
        formatRate: function (value) {
            var num = value * 100;
            num = num.toFixed(2);
            return num + '%';
        },
        //四舍五入格式化整数
        formatInt: function (value) {
            var num = value.toFixed(0);
            return parseInt(num)
        },
        //四舍五入小数点两位格式化
        formatDecimalLength2: function (num) {
            return templateUtil.formatDecimalLength(num, 2)
        }

    }
    /**
     四舍五入格式化小数
     @param num 传入的数字
     @param len 格式化的长度
     */
    templateUtil.formatDecimalLength = function (num, len) {
        var jishu = 1;
        var numStr = num.toString();
        if (numStr.indexOf('.') > -1) {
            //小数位数
            var decimalLength = numStr.substr(numStr.indexOf('.') + 1).length;
            if (decimalLength > len) {
                num = num.toFixed(len);
                num = parseFloat(num);
            }
        }
        return num;
    }
    ///end templateUtil
    root.templateUtil = templateUtil;
    //若 charts路径不正确,可以覆盖 echartsLibPath 变量
    //例如: bkeruyun.charts.echartsLibPath = './report_files/echarts'
    var charts = {
        echartsLibPath:ctxPath+'/js/echarts'
    };
    /**
     * 加载echarts类库
     * @param callback
     * @param requireSet {Array} (非必须) 若 line bar pie都不满足, 单独传入 requireSet 进行扩展
     */
    charts.loadEchartsLib = function (callback,requireSet) {
        //TODO arguments重构
        require.config({
            paths: {
                echarts: charts.echartsLibPath
            }
        });
        if(typeof requireSet === 'undefined'){
            requireSet = ['echarts', 'echarts/chart/line', 'echarts/chart/bar','echarts/chart/pie']
        }
        // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
        require(requireSet, function (ec) {
            callback(ec);
        });
    };
    //默认配置
    charts.defualtOption = {
        'defualt':{
            toolbox: {
                show: false,
                feature: {
                    restore: {show: true},
                    dataView: {
                        readOnly: true
                    }
                }

            }
        },
        'line':{
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                orient : 'vertical',x : 'left',data:[]
            },
            series:[],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ]
        },//end line
        'bar':{
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                orient : 'vertical',x : 'left',data:[]
            },
            series:[],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ]
        }// end bar
        ,'pie':{
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',x : 'left',data:[]
            },
            series:[]
        }// end pie
    };
    /**
     * 主题键值对
     */
    charts.themeMap = {
        //默认主题参照  infographic主题
        'defualt' :{
            // 默认色板
            color: [
                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
            ],

            // 图表标题
            title: {
                textStyle: {
                    fontWeight: 'normal',
                    color: '#27727B'          // 主标题文字颜色
                }
            },

            // 值域
            dataRange: {
                x:'right',
                y:'center',
                itemWidth: 5,
                itemHeight:25,
                color:['#C1232B','#FCCE10']
            },

            toolbox: {
                color : [
                    '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                    '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD'
                ],
                effectiveColor : '#ff4500'
            },

            // 提示框
            tooltip: {
                backgroundColor: 'rgba(50,50,50,0.5)',     // 提示背景颜色，默认为透明度为0.7的黑色
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
                    lineStyle : {          // 直线指示器样式设置
                        color: '#27727B',
                        type: 'dashed'
                    },
                    crossStyle: {
                        color: '#27727B'
                    },
                    shadowStyle : {                     // 阴影指示器样式设置
                        color: 'rgba(200,200,200,0.3)'
                    }
                }
            },

            // 区域缩放控制器
            dataZoom: {
                dataBackgroundColor: 'rgba(181,195,52,0.3)',            // 数据背景颜色
                fillerColor: 'rgba(181,195,52,0.2)',   // 填充颜色
                handleColor: '#27727B'    // 手柄颜色
            },

            // 网格
            grid: {
                borderWidth:0
            },

            // 类目轴
            categoryAxis: {
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: '#27727B'
                    }
                },
                splitLine: {           // 分隔线
                    show: false
                }
            },

            // 数值型坐标轴默认参数
            valueAxis: {
                axisLine: {            // 坐标轴线
                    show: false
                },
                splitArea : {
                    show: false
                },
                splitLine: {           // 分隔线
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: ['#ccc'],
                        type: 'dashed'
                    }
                }
            },

            polar : {
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: '#ddd'
                    }
                },
                splitArea : {
                    show : true,
                    areaStyle : {
                        color: ['rgba(250,250,250,0.2)','rgba(200,200,200,0.2)']
                    }
                },
                splitLine : {
                    lineStyle : {
                        color : '#ddd'
                    }
                }
            },

            timeline : {
                lineStyle : {
                    color : '#27727B'
                },
                controlStyle : {
                    normal : { color : '#27727B'},
                    emphasis : { color : '#27727B'}
                },
                symbol : 'emptyCircle',
                symbolSize : 3
            },

            // 折线图默认参数
            line: {
                itemStyle: {
                    normal: {
                        borderWidth:2,
                        borderColor:'#fff',
                        lineStyle: {
                            width: 3
                        }
                    },
                    emphasis: {
                        borderWidth:0
                    }
                },
                symbol: 'circle',  // 拐点图形类型
                symbolSize: 3.5           // 拐点图形大小
            },

            // K线图默认参数
            k: {
                itemStyle: {
                    normal: {
                        color: '#C1232B',       // 阳线填充颜色
                        color0: '#B5C334',      // 阴线填充颜色
                        lineStyle: {
                            width: 1,
                            color: '#C1232B',   // 阳线边框颜色
                            color0: '#B5C334'   // 阴线边框颜色
                        }
                    }
                }
            },

            // 散点图默认参数
            scatter: {
                itemStyle: {
                    normal: {
                        borderWidth:1,
                        borderColor:'rgba(200,200,200,0.5)'
                    },
                    emphasis: {
                        borderWidth:0
                    }
                },
                symbol: 'star4',    // 图形类型
                symbolSize: 4        // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
            },

            // 雷达图默认参数
            radar : {
                symbol: 'emptyCircle',    // 图形类型
                symbolSize:3
                //symbol: null,         // 拐点图形类型
                //symbolRotate : null,  // 图形旋转控制
            },

            map: {
                itemStyle: {
                    normal: {
                        areaStyle: {
                            color: '#ddd'
                        },
                        label: {
                            textStyle: {
                                color: '#C1232B'
                            }
                        }
                    },
                    emphasis: {                 // 也是选中样式
                        areaStyle: {
                            color: '#fe994e'
                        },
                        label: {
                            textStyle: {
                                color: 'rgb(100,0,0)'
                            }
                        }
                    }
                }
            },

            force : {
                itemStyle: {
                    normal: {
                        linkStyle : {
                            color : '#27727B'
                        }
                    }
                }
            },

            chord : {
                itemStyle : {
                    normal : {
                        borderWidth: 1,
                        borderColor: 'rgba(128, 128, 128, 0.5)',
                        chordStyle : {
                            lineStyle : {
                                color : 'rgba(128, 128, 128, 0.5)'
                            }
                        }
                    },
                    emphasis : {
                        borderWidth: 1,
                        borderColor: 'rgba(128, 128, 128, 0.5)',
                        chordStyle : {
                            lineStyle : {
                                color : 'rgba(128, 128, 128, 0.5)'
                            }
                        }
                    }
                }
            },

            gauge : {
                center:['50%','80%'],
                radius:'100%',
                startAngle: 180,
                endAngle : 0,
                axisLine: {            // 坐标轴线
                    show: true,        // 默认显示，属性show控制显示与否
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.2, '#B5C334'],[0.8, '#27727B'],[1, '#C1232B']],
                        width: '40%'
                    }
                },
                axisTick: {            // 坐标轴小标记
                    splitNumber: 2,   // 每份split细分多少段
                    length: 5,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: '#fff'
                    }
                },
                axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#fff',
                        fontWeight:'bolder'
                    }
                },
                splitLine: {           // 分隔线
                    length: '5%',         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: '#fff'
                    }
                },
                pointer : {
                    width : '40%',
                    length: '80%',
                    color: '#fff'
                },
                title : {
                    offsetCenter: [0, -20],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: 'auto',
                        fontSize: 20
                    }
                },
                detail : {
                    offsetCenter: [0, 0],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: 'auto',
                        fontSize: 40
                    }
                }
            },

            textStyle: {
                fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
            }
        }
    }
    charts.getDefualtOption = function(type){
        var defalut = this.defualtOption['defualt'];
        var defualtOption = this.defualtOption[type]||{};
        var option = $.extend(true,{},defualtOption,defalut);
        return option;
    }

    /**
     * class new Echart(charDom)
     * @param chartDom {DOM}
     * @param type {String}
     * @param option {Object}
     * @param theme {String}
     * @constructor
     */
    charts.Echart = function (chartDom,type,option,theme){
        var defalut = charts.getDefualtOption(type);

        //设置属性
        this.chartDom = chartDom;
        this.theme = theme;
        this.setOption($.extend(true,{},defalut,option));
    };
    charts.Echart.prototype = {
        init : function(){
            var _this = this;
            //加载echarts类库
            charts.loadEchartsLib(function(ec){
                _this.myChart = ec.init(_this.chartDom);
                var option = _this.getOption();
                //触发接口
                _this.onBeforeRendChart();
                //设置主题
                if(_this.theme && (_this.theme in charts.themeMap)){
                    _this.myChart.setTheme(_this.theme);
                }else{
                    //默认设置
                    _this.myChart.setTheme(charts.themeMap.defualt);
                }
                // 为echarts对象加载数据
                _this.myChart.setOption(option);
                //触发接口
                _this.onRendedChart();
            });
        },
        /**
         * 获取真正的 echarts对象
         * @returns {echarts}
         */
        getMyChart :function(){
            return this.myChart;
        },
        /**
         * 接口:在渲染图表之前
         */
        onBeforeRendChart: function(){
        },
        /**
         * 接口:在渲染图表之后
         */
        onRendedChart: function(){
        },
        setOption: function(option){
            this._option = option;
        },
        getOption: function(){
            return  this._option;
        }

    }

    /**
     * @param chartDom
     * @param seriesItemName such as '单店收款统计'
     * @seriesItemData such as [{value:335, name:'储值收入'}]
     * @returns Echart
     */
    charts.newSimplePieChart = function(chartDom,seriesItemName,seriesItemData,option){
        var option = option ||{};
        var config = {
        };

        config.series = [{
            type:'pie',
            name:seriesItemName,
            radius : '55%',
            center: ['50%', '60%'],
            data : seriesItemData,
            selectedMode: 'single'
        }];

        config = $.extend(true,{},config,option);
        var myChart = new bkeruyun.charts.Echart(chartDom,'pie',config);
        myChart.init();
        return myChart;
    }
    /**
     * @param chartDom
     * @param seriesItemName such as '单店收款统计'
     * @param seriesItemData such as [10,20,30,20,25,20]
     * @param xAxisData such as ['周一','周二','周三','周四','周五','周六']
     * @param option (非必须)
     * @returns Echart
     */
    charts.newSimpleBarChart = function(chartDom,seriesItemName,seriesItemData,xAxisData,option){
        var option = option ||{};
        var config = {
        };
        config.yAxis = {show:false};
        config.xAxis= {show:false};
        config.xAxis.data = xAxisData;
        config.series = [{
            name:seriesItemName,
            type:'bar',
            data:seriesItemData
        }];
        if(option._chartColor){
            var tempColor = '#ddd';
            if('white' === option._chartColor){
                tempColor = '#FFF'
            }else if('gray' === option._chartColor){
                tempColor = '#ddd'
            }else{
                tempColor = option._chartColor;
            }
            config.series[0].itemStyle = {
                normal:{
                    color: tempColor,
                    barBorderColor: tempColor
                }
            }
        }
        config = $.extend(true,{},config,option);

        var myChart = new bkeruyun.charts.Echart(chartDom,'bar',config);
        myChart.init();
        return myChart;
    }

    /**
     * @param chartDom
     * @param seriesItemName such as '单店收款统计'
     * @param seriesItemData such as [10,20,30,20,25,20]
     * @param xAxisData such as ['周一','周二','周三','周四','周五','周六']
     * @param option (非必须)
     * @returns Echart
     */
    charts.newSimpleLineChart = function(chartDom,seriesItemName,seriesItemData, xAxisData ,option){
        var option = option ||{};
        var config = {
        };
        config.yAxis = {show:false};
        config.xAxis= {show:false};
        config.xAxis.data = xAxisData;
        config.series = [{
            name:seriesItemName,
            type:'line',
            data:seriesItemData
        }];
        if(option._chartColor){
            var tempColor = '#ddd';
            if('white' === option._chartColor){
                tempColor = '#FFF'
            }else if('gray' === option._chartColor){
                tempColor = '#ddd'
            }else{
                tempColor = option._chartColor;
            }
            config.series[0].itemStyle = {
                normal:{
                    color: tempColor
                }
            }
        }
        config = $.extend(true,{},config,option);

        var myChart = new bkeruyun.charts.Echart(chartDom,'line',config);
        myChart.init();
        return myChart;
    }
    root.charts = charts;
    //end echarts
})(bkeruyun);