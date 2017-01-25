/**
 * Created by ismart on 6/9/15.
 */

$('.easyui-datebox').datebox({
    closeText:'Close',
    formatter:function(date){
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        var h = date.getHours();
        var M = date.getMinutes();
        var s = date.getSeconds();
        function formatNumber(value){
            return (value < 10 ? '0' : '') + value;
        }
//alert(formatNumber(h));
        return y+'-'+formatNumber(m)+'-'+formatNumber(d);
    },
    parser:function(s){
        var t = Date.parse(s);
        if (!isNaN(t)){
            return new Date(t);
        } else {
            return new Date();
        }
    }
});

