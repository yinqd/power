
/** 
* 获取本周、本季度、本月、上月的开端日期、停止日期 
*/ 
var now = new Date(); //当前日期 
var nowDayOfWeek = now.getDay()-1; //今天本周的第几天 
var nowDay = now.getDate(); //当前日 
var nowMonth = now.getMonth(); //当前月 
var nowYear = now.getYear(); //当前年 
nowYear += (nowYear < 2000) ? 1900 : 0; // 

var lastMonthDate = new Date(); //上月日期 
lastMonthDate.setDate(1); 
lastMonthDate.setMonth(lastMonthDate.getMonth()-1); 
var lastYear = lastMonthDate.getYear(); 
var lastMonth = lastMonthDate.getMonth(); 

//格局化日期：yyyy-MM-dd 
function formatDate(date,space) { 
var myyear = date.getFullYear(); 
var mymonth = date.getMonth()+1; 
var myweekday = date.getDate(); 
var s = (space != null) ? space : '-';

if(mymonth < 10){ 
mymonth = "0" + mymonth; 
} 
if(myweekday < 10){ 
myweekday = "0" + myweekday; 
} 
return (myyear + s + mymonth + s + myweekday); 
} 

//获得某月的天数 
function getMonthDays(myMonth){ 
var monthStartDate = new Date(nowYear, myMonth, 1); 
var monthEndDate = new Date(nowYear, myMonth + 1, 1); 
var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24); 
return days; 
} 

//获得本季度的开端月份 
function getQuarterStartMonth(){ 
var quarterStartMonth = 0; 
if(nowMonth<3){ 
quarterStartMonth = 0; 
} 
if(2<nowMonth && nowMonth<6){ 
quarterStartMonth = 3; 
} 
if(5<nowMonth && nowMonth<9){ 
quarterStartMonth = 6; 
} 
if(nowMonth>8){ 
quarterStartMonth = 9; 
} 
return quarterStartMonth; 
} 

//获得本周的开端日期 
function getWeekStartDate(space) { 
var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek); 
return formatDate(weekStartDate,space); 
} 

//获得本周的停止日期 
function getWeekEndDate(space) { 
var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)); 
return formatDate(weekEndDate,space); 
} 

//获得本月的开端日期 
function getMonthStartDate(space){ 
var monthStartDate = new Date(nowYear, nowMonth, 1); 
return formatDate(monthStartDate,space); 
} 

//获得本月的停止日期 
function getMonthEndDate(space){ 
var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth)); 
return formatDate(monthEndDate,space); 
} 

//获得上月开端时候 
function getLastMonthStartDate(){ 
var lastMonthStartDate = new Date(nowYear, lastMonth, 1); 
return formatDate(lastMonthStartDate); 
} 

//获得上月停止时候 
function getLastMonthEndDate(){ 
var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth)); 
return formatDate(lastMonthEndDate); 
} 

//获得本季度的开端日期 
function getQuarterStartDate(){ 

var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1); 
return formatDate(quarterStartDate); 
} 

//或的本季度的停止日期 
function getQuarterEndDate(){ 
var quarterEndMonth = getQuarterStartMonth() + 2; 
var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth)); 
return formatDate(quarterStartDate); 
} 



////////////////////////////////////////////////////////////////////////////////////////////
//计算两个日期天数差的函数，通用
////////////////////////////////////////////////////////////////////////////////////////////
function DateDiff(sDate1, sDate2) {  //sDate1和sDate2是yyyy-MM-dd格式
	 var date1 = new Date(sDate1);  //开始时间
     var date2 = new Date(sDate2);     //结束时间
     var date3 = date2.getTime() - date1.getTime();   //时间差的毫秒数 
   var  iDays = parseInt(Math.abs(date3) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
  return iDays;  //返回相差天数
}


function addByTransDate(dateParameter, num) {
    var translateDate = "", dateString = "", monthString = "", dayString = "";
    translateDate = dateParameter.replace("-", "/").replace("-", "/");
    var newDate = new Date(translateDate);
    newDate = newDate.valueOf();
    newDate = newDate + num * 24 * 60 * 60 * 1000;
    newDate = new Date(newDate);
    //如果月份长度少于2，则前加 0 补位  
    if ((newDate.getMonth() + 1).toString().length == 1) {
monthString = 0 + "" + (newDate.getMonth() + 1).toString();
    } else {
monthString = (newDate.getMonth() + 1).toString();
    }
    //如果天数长度少于2，则前加 0 补位  
    if (newDate.getDate().toString().length == 1) {
dayString = 0 + "" + newDate.getDate().toString();
    } else {
dayString = newDate.getDate().toString();
    }
    dateString = newDate.getFullYear() + "-" + monthString + "-" + dayString;
    return dateString;
}
 
function reduceByTransDate(dateParameter, num) {
    var translateDate = "", dateString = "", monthString = "", dayString = "";
    translateDate = dateParameter.replace("-", "/").replace("-", "/");
    var newDate = new Date(translateDate);
    newDate = newDate.valueOf();
    newDate = newDate - num * 24 * 60 * 60 * 1000;
    newDate = new Date(newDate);
    //如果月份长度少于2，则前加 0 补位  
    if ((newDate.getMonth() + 1).toString().length == 1) {
monthString = 0 + "" + (newDate.getMonth() + 1).toString();
    } else {
monthString = (newDate.getMonth() + 1).toString();
    }
    //如果天数长度少于2，则前加 0 补位  
    if (newDate.getDate().toString().length == 1) {
dayString = 0 + "" + newDate.getDate().toString();
    } else {
dayString = newDate.getDate().toString();
    }
    dateString = newDate.getFullYear() + "-" + monthString + "-" + dayString;
    return dateString;
}
 


Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}