function download1(url, data, method, url2) {
	// 获取url和data
	if (url && data) {
		// data 是 string 或者 array/object
		data = typeof data == 'string' ? data : jQuery.param(data);
		// 把参数组装成 form的 input
		var inputs = '';
		jQuery.each(data.split('&'), function() {
			var pair = this.split('=');
			inputs += '<input type="hidden" name="' + pair[0] + '" value="'
					+ pair[1] + '" />';
		});
		// request发送请求
		jQuery(
				'<form action="' + url + '" method="' + (method || 'post')
						+ '">' + inputs + '</form>').appendTo('body').submit()
				.remove();

		exportDataCount = 0;
		exportCol = 0;
		if(url2!=null){
			$("#exportDataBtn").attr("disabled", true);
			$('#showJdBtn').show();
			showJd(url2);
		}
		

	}
	;
};

function showJd(url2) {
	var html = "<div style='margin-top:20px'><div style='margin-left:50px;margin-bottom:5px;'>正在生成文件，请稍候......</div><div style='margin-left:50px;margin-bottom:5px;'>已生成<span id='exportDataCount' style='color:red'>"
			+ exportDataCount
			+ "</span>条数据</div><div style='margin-left:50px;margin-bottom:5px;'>总共<span id='exportDataAllCount' style='color:red'>"
			+ exportDataAllCount
			+ "</span>条数据</div><div style='margin-left:50px;overflow:hidden;'><div style='width:150px;height:16px;border:1px solid #bbb;color:#222;float:left;'><div id='exportCol' style='width:"
			+ exportCol
			+ "%;height:16px;background-color:#6CAF00;'></div></div><div id='exportFont' style='height:18px;line-height:18px;padding-left:3px;float:left;'>"
			+ exportCol + "%</div></div></div>"
	TipDialog.create(false, true, '导出数据进度', html, 300, 150, true);
	var sil = setInterval(function() {
		$.ajax({
			type : 'get',
			url : url2,
			dataType : 'json',
			cache : false,
			success : function(msg) {
				exportDataCount = msg.exportDataCount;
				exportStatus = msg.exportStatus;
				exportCol = Math.round(parseInt(exportDataCount, 10) * 100
						/ parseInt(exportDataAllCount, 10));
				exportCol = exportCol > 100 ? 100 : exportCol;
				$('#exportDataCount').html(exportDataCount);
				if (exportCol > 0)
					$('#exportCol').css({
						'width' : exportCol + "%"
					});
				$('#exportFont').html(exportCol + "%");
				if (exportStatus == 1
						|| parseInt(exportDataCount, 10) >= parseInt(
								exportDataAllCount, 10)) {
					clearInterval(sil);
					$("#exportDataBtn").attr("disabled", false);
					$('#showJdBtn').hide();
					TipDialog.remove();

				}
			}
		})
	}, 5000)
}
