/**
 * Created by ismart on 6/9/15.
 */

//$(document).ready(function(){






function reset_sum()
	{

        var hours_from=$('#hours_from').val();
        var hours_to=$('#hours_to').val();


        $('#date_today').datebox('setValue', date_today);

        $('#report').propertygrid({
        url:'mysql.php?act=listReport&way=default&today='+date_today+'&hours_from='+hours_from+'&hours_to='+hours_to,
        columns: mycolumns,
        width:250
        });
}

function next_day(date_today_param)
     {



         $('#date_today').val(last_date['global_date_today']);

         if($('#date_today').val()==""){
             var global_date_today_init=date_today_param;

             $('#date_today').val(global_date_today_init);

         }else{
            // $('#date_today').datebox('setValue',last_date['global_date_today']);
            // $('#date_today').datebox('setValue',$('#date_today').datebox('getValue'));
         }

         var now_day=$('#date_today').val();
         var hours_from=$('#hours_from').val();
         var hours_to=$('#hours_to').val();

         var arr = now_day.split("-");
         var newdt = new Date(Number(arr[0]),Number(arr[1])-1,Number(arr[2])+1);
         // repnewdt = newdt.getFullYear() + "-" +   (newdt.getMonth()+1) + "-" + newdt.getDate();
         repnewdt = newdt.getFullYear() + "-" +   ((newdt.getMonth()+1)  < 10 ? '0' : '')+(newdt.getMonth()+1) + "-" + (newdt.getDate() < 10 ? '0' : '')+newdt.getDate();

        // console.log(repnewdt);


         $('#date_today').datebox('setValue', repnewdt);
         last_date['global_date_today']=repnewdt;

         $('#report').propertygrid({
         url:'mysql.php?act=listReport&way=default&today='+repnewdt+'&hours_from='+hours_from+'&hours_to='+hours_to,
         columns: mycolumns,
         width:250
         });
}

function prev_day(date_today_param)
 {

     $('#date_today').val(last_date['global_date_today']);

     if($('#date_today').val()==""){
         var global_date_today_init=date_today_param;

         $('#date_today').val(global_date_today_init);

     }else{
         // $('#date_today').datebox('setValue',last_date['global_date_today']);
         // $('#date_today').datebox('setValue',$('#date_today').datebox('getValue'));
     }

     var now_day=$('#date_today').val();


     var hours_from=$('#hours_from').val();
     var hours_to=$('#hours_to').val();

     var arr = now_day.split("-");
     var newdt = new Date(Number(arr[0]),Number(arr[1])-1,Number(arr[2])-1);
     // repnewdt = newdt.getFullYear() + "-" +   (newdt.getMonth()+1) + "-" + newdt.getDate();
     repnewdt = newdt.getFullYear() + "-" +   ((newdt.getMonth()+1)  < 10 ? '0' : '')+(newdt.getMonth()+1) + "-" + (newdt.getDate() < 10 ? '0' : '')+newdt.getDate();

    // console.log(repnewdt);


     $('#date_today').datebox('setValue', repnewdt);
     last_date['global_date_today']=repnewdt;

     $('#report').propertygrid({
     url:'mysql.php?act=listReport&way=default&today='+repnewdt+'&hours_from='+hours_from+'&hours_to='+hours_to,
     columns: mycolumns,
     width:250
     });
}


function hours_from_to(){

    var now_day=$('#date_today').datebox('getValue');

    var hours_from=$('#hours_from').val();
    var hours_to=$('#hours_to').val();

    $('#report').propertygrid({
        url:'mysql.php?act=listReport&way=default&today='+now_day+'&hours_from='+hours_from+'&hours_to='+hours_to,
        columns: mycolumns,
        width:250,

        onLoadSuccess: function (data) {
            var arr=$('#report').datagrid('getData').rows;

            $("#print_sumReport").click(function(){

                var   form = $("<form method='post' action='../docs/generate_html.php'></form>");
                //var   str = $(".datagrid-btable:eq(1)").html();
                var  input = $("<input>").val(JSON.stringify(arr)).attr('name','bar');
                form.append(input);


                form.submit();

            });


            $("#cmd_print_sumReport").click(function(){

                var   form = $("<form method='post' action='../docs/cmd_generate_html.php'></form>");
                //var   str = $(".datagrid-btable:eq(1)").html();
                var  input = $("<input>").val(JSON.stringify(arr)).attr('name','bar');
                form.append(input);


                form.submit();

            });

        }





    });


}






//});