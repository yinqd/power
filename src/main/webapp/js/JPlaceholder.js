/*
 * jQuery placeholder, fix for IE6,7,8,9
 * @author JENA
 * @since 20131115.1504
 * @website ishere.cn
 */
var JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        $(':input[placeholder]').each(function(index, element) {
            var self = $(this),txt = self.attr('placeholder'),parent = self.parent();
            
//            /*
//            self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none',display:'inline-block'}));
//            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
//            var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left+5, top:pos.top+5, height:h, lienHeight:h, paddingLeft:paddingleft, color:'#aaa'}).appendTo(self.parent());
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left'),paddingtop = self.css('padding-top');
            if(!self.parent().is(".placeholderBox")){
            	self.wrap($('<div class="placeholderBox"></div>'));
                var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left'),paddingtop = self.css('padding-top');
                var holder = $('<span class="holder"></span>').text(txt).css({position:'absolute',display:'inline-block', left:pos.left+paddingleft, top:pos.top+6, height:h,paddingLeft:paddingleft, color:'#aaa'}).appendTo(self.parent());
                
            }else{
//            	self.wrap($('<div class="placeholderBox"></div>'));
                var holder = self.parent(".placeholderBox").find(".holder");
            }
            if(self.val()){
            	holder.hide();
            }
            self.focusin(function(e) {
                holder.hide();
            }).focusout(function(e) {
                if(!self.val()){
                    holder.show();
                }
            }).change(function(){
            	if(!self.val()){
                    holder.show();
                }else{
                	holder.hide();
                }
            });
            holder.click(function(e) {
                holder.hide();
                self.focus();
            });
            if(!!self.parents(".search-box")){
            	var closeBtn = self.parents(".search-box").find(".close").eq(0);
            	closeBtn.click(function(){
            		self.val("");
            		holder.show();
            	});
            }
//            */
        });
    }
};
//执行
jQuery(function(){
    JPlaceHolder.init();
});