/**
 * 在光标位置插入文本内容
 */
(function($) {
	$.fn.extend({
		insertAtCaret : function(insertValue) {
			var $obj = $(this)[0];
			// ie下的处理
			if (document.selection) {
				this.focus();
				sel = document.selection.createRange();
				sel.text = insertValue;
				this.focus();
			// firefox下的处理
			} else if ($obj.selectionStart || $obj.selectionStart == '0') {
				var startPos = $obj.selectionStart;
				var endPos = $obj.selectionEnd;
				var scrollTop = $obj.scrollTop;
				$obj.value = $obj.value.substring(0, startPos) + insertValue
						+ $obj.value.substring(endPos, $obj.value.length);
				this.focus();
				$obj.selectionStart = startPos + insertValue.length;
				$obj.selectionEnd = startPos + insertValue.length;
				$obj.scrollTop = scrollTop;
			} else {
				this.value += insertValue;
				this.focus();
			}
		}
	});
})(jQuery);