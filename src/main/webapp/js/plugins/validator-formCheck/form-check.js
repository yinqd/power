/**
 * Created by luofg on 2015/7/22.
 * validator 验证扩展
 */
//整数部分六位小数部分两位可以为负数
jQuery.validator.addMethod("numberSixDecimalTwo", function(value,element) {
    var reg = /(^((?:-?\d{1,6})(?:\.\d{1,2})?)$)/;
    return this.optional(element) || (reg.test(value));
}, "整数部分6位，保留两位小数");
//时间比较
jQuery.validator.addMethod("endDateTime",
    function(value, element,param) {
        var startDateTime;
        var endDateTime = new Date(Date.parse("1900/1/1 "+value));
        if($(param.min).val())
        {
            startDateTime = new Date(Date.parse("1900/1/1 "+$(param.min).val()));
            return startDateTime <= endDateTime;
        }
        else{
            startDateTime = new Date(Date.parse("1900/1/1 "+$(param.max).val()));
            return startDateTime >= endDateTime;
        }

    }, "开始时间必须小于于结束时间");
// ZIP Code    
jQuery.validator.addMethod("isZipCode", function(value, element) {   
    var tel = /^[0-9]{6}$/;
    return this.optional(element) || (tel.test(value));
}, "请正确填写您的邮政编码");
//Mobile phone number
jQuery.validator.addMethod("mobile", function(value, element) {   
    var reg=/^(((13[0-9]{1})|15[0-9]{1}|18[0-9]{1})+\d{8})$/i;
    return this.optional(element) || (reg.test(value));
}, "请正确填写您的手机号码");
//Disable the illegal character
jQuery.validator.addMethod("isIllegalCharacter", function(value, element) {   
    var reg=/[`~!@^_=<>?"{}']/im;///[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
    return !(reg.test(value));
}, "包含非法字符，请核检");
//字母数字
jQuery.validator.addMethod("alnum", function(value, element) {
	return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
}, "只能包括英文字母和数字");

//只能包括英文字母和数字+-*/@#$%[];,.  特殊字符
jQuery.validator.addMethod("dishCodeRule", function(value, element) {
	return this.optional(element) || /^[A-Za-z0-9\(\)\+\-\/\*\&\#\%\[\]\;\,\.\（\）\／\＊\＆\＃\％\［\］\；\，\．\【\】]+$/.test(value);
}, "只能包括英文字母和数字以及()+-/*&#$%[];,.");