$(function(){
	
	$(".js-dishShopSort-search").on("click", function(){
		//缓存查询日期
		setDatePicker();
		$.handleQuery();
	});
	
	function floatMul(arg1,arg2) {   
		var m=0,s1=arg1.toString(),s2=arg2.toString();   
		try{m+=s1.split(".")[1].length;}catch(e){}
		try{m+=s2.split(".")[1].length;}catch(e){}
		return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
	}  
	
	$.handleQuery = function() {
		var args = new Object();
		if($("[name='amountOrQuantity']:checked").val()==1){
			args.url = queryUrlForAmount;
		}else{
			args.url = queryUrl;
		}
		args.postData = serializeArrayFormById("dishShopSortReprotSearchForm");
		args.callback = "$.queryCallback";
		$.submitWithAjax(args);
	};

	$.queryCallback = function(args) {
		var result = args.result;
		if (!result) {
			var notData = bkeruyun.notQueryData('没有查询到数据，换个条件试试吧！');
			$(".panel-body").html(notData);
			return;
		}
		var top10Report = result.top10Report,
			bottom10Report = result.bottom10Report,
			sortReport = result.sortReport;
		if (sortReport.length < 1) {
			var notData = bkeruyun.notQueryData('没有查询到数据，换个条件试试吧！');
			$(".panel-body").html(notData);
			return;
		}
		$(".panel-body").html(initPanelBody);
	    $("#rankingTab").delegate("li","click",function(i){
	    	var showObj = $("#"+$(this).attr("data-show"));
	        $(this).addClass("current").siblings().removeClass("current");
	        showObj.css("z-index",2).siblings(".ranking-col").css("z-index",1);
	        var currentTab = $("#rankingTab > li.current");
			var titObj = $("#rankingTab").parent().find("h2 > em");
			var txt = currentTab.text().toUpperCase();
			titObj.text(txt);
	    });
		$.loadEcharts('rankingTopInner', top10Report);
		$.loadEcharts('rankingBottomInner', bottom10Report);
		$.loadGrid(sortReport);
	};

	$.loadEcharts = function(echartId, data) {
		var amountOrQuantity=$('input:radio[name=amountOrQuantity]:checked').val();
		data.sort(
            function(a, b) {
    			if (amountOrQuantity==1) {
                	return (a.currAmount - b.currAmount);
    			}
            	return (a.currQuantity - b.currQuantity);
            }
        );
		
		var yAxisData = [],
			seriesData = [];
		$.each(data, function(i, p) {
			var shopName = p['shopName'];
			if (amountOrQuantity==1) {
				seriesData[i] = {
					'shopName' : shopName,
					'value' : p['currAmount'],
					'preAmount' : p['preAmount'],
					'preSortNum' : p['preSortNum'],
					'amountPercent' : p['amountPercent']
				};
			} else {
				seriesData[i] = {
					'shopName' : shopName,
					'value' : p['currQuantity'],
					'preQuantity' : p['preQuantity'],
					'preSortNum' : p['preSortNum'],
					'quantityPercent' : p['quantityPercent']
				};
			}
			if (shopName.length > 5) {
				shopName = shopName.substr(0, 5) + "...";
			}
			yAxisData[i] = shopName;
		}); 
		require(
			['echarts','echarts/chart/bar'],
			function (ec) {
				var myChart = ec.init(document.getElementById(echartId));
				var option = {
					tooltip : {
				        trigger: 'axis'
				    },
					xAxis : [{
						splitLine: {
							show: true,
							onGap:null,
							lineStyle:{
								color: ['#F2F2F2'],
							    width: 1,
							    type: 'solid'
							}
						},
						type : 'value', 
						boundaryGap : [0, 0.01]
					}],
					yAxis : [{
						splitLine: {
							show: true,
							onGap:null,
							lineStyle:{
								color: ['#F2F2F2'],
							    width: 1,
							    type: 'solid'
							}
						},
						type : 'category', 
						data : yAxisData
					}],
					series : [
						{
							type : 'bar',
							tooltip : {
								trigger : 'axis',
								formatter : function(params, ticket, callback) {
									var res = params[0].data.shopName;
									for (var i = 0, l = params.length; i < l; i++) {
										if (amountOrQuantity==1) {
											res += '<br/>本期金额 : ';
										} else {
											res += '<br/>本期销量 : ';
										}
										res += params[i].value;
										if (amountOrQuantity==1) {
											res += '<br/>上期金额 : ';
											if (params[i].data.preAmount == '0') {
												res += '-';
											} else {
												res += params[i].data.preAmount;
											}
										} else {
											res += '<br/>上期销量 : ';
											if (params[i].data.preQuantity == '0') {
												res += '-';
											} else {
												res += params[i].data.preQuantity;
											}
										}
										res += '<br/>上期排行 : ';
										if (params[i].data.preSortNum == '0') {
											res += '-';
										} else {
											res += params[i].data.preSortNum;
										}
										res += '<br/>增幅 ：';
										if (amountOrQuantity==1) {
											if (params[i].data.amountPercent == '0') {
												res += '-';
											} else {
												res += (floatMul(params[i].data.amountPercent, 100) + '%');
												//res += (params[i].data.amountPercent + '%');
											}
										} else {
											if (params[i].data.quantityPercent == '0') {
												res += '-';
											} else {
												res += (floatMul(params[i].data.quantityPercent, 100) + '%');
												//res += (params[i].data.quantityPercent + '%');
											}
										}
									}
									return res;
								}
							},
							data : seriesData
						}
					]
				};
				myChart.setOption(option); 
			}
		);
	};

	$.loadGrid = function(data) {
		var amountOrQuantity=$('input:radio[name=amountOrQuantity]:checked').val(),
			colNames, colModel;
		colNames = ['门店编号', '门店名称'];
		colModel = [
			{name: 'shopIdenty', index: 'shopIdenty', width: 160, align: 'center', sortable : false},
			{name: 'shopName', index: 'shopName', width: 220, align: 'center', sortable : false}
		];
		if (amountOrQuantity == 1) {
			colNames.push('销售金额');
			colNames.push('增幅');
			colModel.push({name: 'currAmount', index: 'currAmount', width: 120, align: 'center', sortable : false});
			colModel.push({name: 'amountPercent', index: 'amountPercent', width: 120, align: 'center', sortable : false,
				formatter:function(cellvalue, options, rowObject){
					if ((cellvalue + '') === '0') {
						return '-';
					}
					return floatMul(cellvalue, 100) + '%';
					//return cellvalue+ '%';
				}});
		} else {
			colNames.push('销售数量');
			colNames.push('增幅');
			colModel.push({name: 'currQuantity', index: 'currQuantity', width: 120, align: 'center', sortable : false});
			colModel.push({name: 'quantityPercent', index: 'quantityPercent', width: 120, align: 'center', sortable : false,
				formatter:function(cellvalue, options, rowObject){
					if ((cellvalue + '') === '0') {
						return '-';
					}
					return floatMul(cellvalue, 100) + '%';
					//return cellvalue+ '%';
				}});
		}
		colNames.push('排行');
		colModel.push(
			{name: 'sortDiff', index: 'sortDiff', width: 120, align: 'center', sortable : false,
				formatter:function(cellvalue, options, rowObject){
					if ((cellvalue + '') === '0') {
						return '<span class="ranking ranking-top">'+0+'</span>';
					}
					if ((cellvalue + "").split("")[0] === "-") {
						return '<span class="ranking ranking-down">'+cellvalue+'</span>';
					}
					return '<span class="ranking ranking-top">'+cellvalue+'</span>';
				}
			}
		);
		$('#girdDiv').html('<table id="gird"></table>');
		$("#gird").jqGrid({
			colNames : colNames,
			colModel : colModel,
			datatype : 'local',
			rowNum : 10000,
			data : data
		});
	};
});
