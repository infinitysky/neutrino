/**
 * Created by ismart on 6/11/15.
 */
var newdt = new Date();

var newdt_3 = new Date(newdt.getFullYear(),newdt.getMonth(),newdt.getDate()-3);
var newdt_7 = new Date(newdt.getFullYear(),newdt.getMonth(),newdt.getDate()-7);
var newdt_30 = new Date(newdt.getFullYear(),newdt.getMonth(),newdt.getDate()-30);

// repnewdt = newdt.getFullYear() + "-" +   (newdt.getMonth()+1) + "-" + newdt.getDate();
var date_today = newdt.getFullYear() + "-" +   ((newdt.getMonth()+1)  < 10 ? '0' : '')+(newdt.getMonth()+1) + "-" + (newdt.getDate() < 10 ? '0' : '')+newdt.getDate();
var date_three_before = newdt_3.getFullYear() + "-" +   ((newdt_3.getMonth()+1)  < 10 ? '0' : '')+(newdt_3.getMonth()+1) + "-" + (newdt_3.getDate() < 10 ? '0' : '')+newdt_3.getDate();
var date_seven_before = newdt_7.getFullYear() + "-" +   ((newdt_7.getMonth()+1)  < 10 ? '0' : '')+(newdt_7.getMonth()+1) + "-" + (newdt_7.getDate() < 10 ? '0' : '')+newdt_7.getDate();
var date_thirty_before = newdt_30.getFullYear() + "-" +   ((newdt_30.getMonth()+1)  < 10 ? '0' : '')+(newdt_30.getMonth()+1) + "-" + (newdt_30.getDate() < 10 ? '0' : '')+newdt_30.getDate();
