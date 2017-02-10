function format_bug_date_dishSaleReport(date){
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    var h = date.getHours();
    var M = date.getMinutes();
    var s = date.getSeconds();
    function formatNumber(value){
        return (value < 10 ? '0' : '') + value;
    }
    //  alert(formatNumber(h));
    return y+'-'+formatNumber(m)+'-'+formatNumber(d);
}


function search_date_from_to()
{

    var date_start = $("input[name=search_date_start_periodReport]").val();
    var date_end = $("input[name=search_date_end_periodReport]").val();


    /* check_bug_date **************************************************************************/

    if (date_start == '' || date_end == '')
    {
        if (date_start != '' && date_end == ''){

            if(last_date['dishSaleReport_end']!=''){
                date_end = last_date['dishSaleReport_end'];
                last_date['dishSaleReport_start']=date_start;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }


        if (date_end != '' && date_start == ''){

            if(last_date['dishSaleReport_start']!=''){
                date_start =  last_date['dishSaleReport_start'];
                last_date['dishSaleReport_end']=date_end;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }



        if (date_end == '' && date_start == ''){

            if(last_date['dishSaleReport_start']!=''&&last_date['dishSaleReport_end']!=''){
                date_start =  last_date['dishSaleReport_start'];
                date_end = last_date['dishSaleReport_end'];
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');
            }
        }

        if (date_start > date_end){
            $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
        }

    }else{

        last_date['dishSaleReport_start']= date_start;
        last_date['dishSaleReport_end']=date_end;
    }


    /***************************************************************************/


    var date_today = $("input[name=search_date_today]").val();
    last_date['global_date_today']=date_today;

    var start_period=date_start;
    var end_period=date_end;

        $('#report_period').propertygrid({
            url:'mysql.php?act=listReport&way=period&start_period='+start_period+'&end_period='+end_period,
            columns: mycolumns,
            width:250,

            onLoadSuccess: function (data) {
                var arr=$('#report_period').datagrid('getData').rows;

                $("#cmd_print_periodReport").click(function(){

                    var   form = $("<form method='post' action='../docs/cmd_generate_html2.php'></form>");
                    //var   str = $(".datagrid-btable:eq(1)").html();
                    var  input = $("<input>").val(JSON.stringify(arr)).attr('name','bar');
                    form.append(input);


                    form.submit();

                });

            }
        });



    $('#saleListTable').datagrid('load');


}