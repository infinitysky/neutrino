/**
 * Created by ismart on 6/9/15.
 */


function format_bug_date_orderList(date){
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


function onDblClickRow_Show(orderno)
{

    // var row = $("#orderList").datagrid('getSelections');
    //var orderno = row[0].orderno;




    $('#orderDetail_orderList').datagrid({
        title:'',
        nowrap:true,
        rownumbers:true,
        singleSelect: true,
        idField:'id',
        url:'mysql.php?act=getOrderDetail&orderno='+orderno,

        columns:[[
            {field:'name', title:cn_au_menus[language_id]['Item_Name'],align:'center',width:150},
            {field:'qty', title:cn_au_menus[language_id]['Quantity'],align:'center',width:100,formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'price', title:cn_au_menus[language_id]['Price'],align:'center',width:100,formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'discount', title:cn_au_menus[language_id]['Item_Discount'],align:'center',width:100,formatter:function(value){
                if (value == undefined || value == 0.000)
                    return '-';
                else
                    return value+'% off';
            }},
            {field:'voidflag', title:cn_au_menus[language_id]['Item_Refunded'],align:'center', width:100,formatter:function(value){
                if (parseInt(value) < 0)
                    return 'Item Refunded';
                if (value == '0')
                    return '-';
            }},
            {field:'waived_1_flag', title:cn_au_menus[language_id]['Item_Voided'],align:'center', width:100,formatter:function(value){
                if (value == '1')
                    return 'Item Voided';
                if (value == '0')
                    return '-';
            }}
        ]]

    });

    $("#getOrder_orderList").window('open');
    $("#getOrder_orderList").bind('clickoutside', function(event){
        $(this).window('close');
    });
}


function passed_orders(days)
{
    $('#orderList').datagrid('unselectAll');

    var end = date_today;
    var start = end;

    if (days == 1)
        var start = end;
    else if (days == 3)
        var start = date_three_before;
    else if (days == 7)
        var start = date_seven_before;
    else if (days == 30)
        var start =date_thirty_before;

    $('#date_start_order').datebox('setValue', start);
    $('#date_end_order').datebox('setValue', end);
    //$('#invoice_filter').combobox('select', 'both');
   // $('#cash_filter').combobox('select', 'both');
    $("input[name=amount_filter_from]").val('0');
    $("input[name=amount_filter_to]").val('MAX');

    // 检测查询范围
/*    if (!checkDate(start, '<?php echo $startday;?>'))
    {
        $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
        $('#orderList').datagrid('load');
        return;
    }*/

    var date_start=start;
    var date_end=end;

    /* check_bug_date **************************************************************************/

    if (date_start == '' || date_end == '')
    {
        if (date_start != '' && date_end == ''){

            if(last_date['orderList_end']!=''){
                date_end = last_date['orderList_end'];
                last_date['orderList_start']=date_start;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }


        if (date_end != '' && date_start == ''){

            if(last_date['orderList_start']!=''){
                date_start =  last_date['orderList_start'];
                last_date['orderList_end']=date_end;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }



        if (date_end == '' && date_start == ''){

            if(last_date['orderList_start']!=''&&last_date['orderList_end']!=''){
                date_start =  last_date['orderList_start'];
                date_end = last_date['orderList_end'];
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');
            }
        }

        if (date_start > date_end){
            $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
        }

    }else{

        last_date['orderList_start']= date_start;
        last_date['orderList_end']=date_end;
    }


    /***************************************************************************/


    start= date_start;
    end= date_end;

    $('#orderList').datagrid({
        url:'mysql.php?act=listOrder&start='+start+'&end='+end+"&order_by=dm_order.order_id",
        striped:true,
        singleSelect:false,
        idField:'orderno',
        nowrap:true,
        frozenColumns:[[{field:'ck',checkbox:true}]],
        rownumbers:true,
        loadMsg:'Loading...',
        remoteSort:false,
        //checkOnSelect:false,
        //selectOnCheck:false,
        pagePosition:'top bottom',

        onDblClickRow:function(rowIndex, rowData){

            onDblClickRow_Show(rowData.orderno);

        },
        pagination:true,
        //onClickRow:onDblClickRow_Show,
        pageSize:30,
        pageList:[20,25,30,40,50,100],

        columns:[[
            {field:'orderno',title: cn_au_menus[language_id]['order_id'],width:100,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
       /*     {field:'serial_no',title: cn_au_menus[language_id]['order_id'],width:100,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},*/
            {field:'date',title:cn_au_menus[language_id]['Order_Time'],width:160,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'invoiceno',title:cn_au_menus[language_id]['Invoice_Number'],width:120,align:'center',formatter:function(value){
                if (value == undefined || value == 0)
                    return '-';
                else
                    return  value;
            }},
            {field:'payby',title:cn_au_menus[language_id]['Payment_Method'],width:120,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'amount',title:cn_au_menus[language_id]['Amount'],width:120,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'gst_free',title:'GST Free',width:120,editor:'text',align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }}
            // {field:'gst',title:'GST',width:120,align:'center',formatter:function(value){
            // 	if (value == undefined)
            // 		return '-';
            // 	else
            // 		return value;
            // }}
        ]],
        toolbar:[
            {text:'delete',iconCls:'icon-cut',handler:function(data){

                var rows = $('#orderList').datagrid('getSelections');
                var ids = [];
                for (var i = 0; i < rows.length; i++)
                {
                    ids.push(rows[i].orderno);
                }

                if (rows.length == 0)
                {
                    $.messager.confirm('Confirm', 'Please select an item','question');
                }
                else
                {
                    $.messager.confirm('Confirm', 'Confirm to delete', function (r) {
                        if (r)
                        {
                            $.post('mysql.php?act=deleteOrder&start=<?php echo $date;?>&end=<?php echo $date;?>&data='+ids, function(result) {
                                if (result == 'success') {
                                    $('#orderList').datagrid('reload');
                                }
                                if (result == 'fail') {
                                    $.messager.show({
                                        title:'Error',
                                        msg:'Delete data fail'
                                    });
                                }
                            });
                        }
                    })
                }
            }}
        ],
        onLoadSuccess:function(data){
            if(data.total == 0){
                //alert("No Records founds");
                $.messager.show({
                    title:'提示',
                    msg:'No Records founds'
                });
            }

            else{
                console.log(data['total_sales']);
                $("#total_sales").text(data['total_sales']);
            }

        }
    });

    $('#orderList').datagrid('load');
    $('#orderList').datagrid('hideColumn', 'orderno');
}


function search_date_order(order_by)
{
    var date_start = $("input[name=search_date_start_order]").val();
    var date_end = $("input[name=search_date_end_order]").val();

    // 检测查询的范围
/*    if (!checkDate(date_start, '<?php echo $startday;?>'))
    {
        $.messager.alert('提示',cn_au_menus[language_id]['out_of_date_range'],'question');
        $('#orderList').datagrid('load');
        return;
    }*/

    var invoice_filter = $("input[name=invoice_filter]").val();
    var cash_filter = $("input[name=cash_filter]").val();

    var amount_filter_from = parseInt(($("input[name=amount_filter_from]").val()).trim());

    var amount_filter_to = $("input[name=amount_filter_to]").val().trim();
    if (amount_filter_to == 'MAX')
        amount_filter_to = 1000000000000;	// 默认最大值
    else
        amount_filter_to = parseInt(amount_filter_to);


    var url = 'mysql.php?act=listOrder&invoice_filter=' + invoice_filter + '&cash_filter=' + cash_filter;

    // 过滤时间
    /* check_bug_date **************************************************************************/

    if (date_start == '' || date_end == '')
    {
        if (date_start != '' && date_end == ''){

            if(last_date['orderList_end']!=''){
                date_end = last_date['orderList_end'];
                last_date['orderList_start']=date_start;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }


        if (date_end != '' && date_start == ''){

            if(last_date['orderList_start']!=''){
                date_start =  last_date['orderList_start'];
                last_date['orderList_end']=date_end;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }



        if (date_end == '' && date_start == ''){

            if(last_date['orderList_start']!=''&&last_date['orderList_end']!=''){
                date_start =  last_date['orderList_start'];
                date_end = last_date['orderList_end'];
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');
            }
        }

        if (date_start > date_end){
            $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
        }

    }else{

        last_date['orderList_start']= date_start;
        last_date['orderList_end']=date_end;
    }


    /***************************************************************************/

    if(order_by=="amount"){
        url += ('&start=' + date_start + '&end=' + date_end+ '&order_by=' + order_by);
    }else{
        url += ('&start=' + date_start + '&end=' + date_end+ '&order_by=dm_order.order_id');
    }




    if (amount_filter_from != '' || amount_filter_to != '')
    {
        if (!isNaN(amount_filter_from) && !isNaN(amount_filter_to))
        {
            if(amount_filter_from > amount_filter_to)
            {
                $.messager.alert('提示','请输入正确的范围','question');
            }
            url += ('&amount_filter_from=' + amount_filter_from + '&amount_filter_to=' + amount_filter_to);
        }
        else
        {
            url += '&amount_filter_from=0&amount_filter_to=1000000000000';
            $.messager.alert('提示','请输入正确的数字','question');
        }
    }
    else
        url += '&amount_filter_from=0&amount_filter_to=1000000000000';

    $('#orderList').datagrid({
        url:url,
        striped:true,
        singleSelect:false,
        nowrap:true,
        frozenColumns:[[{field:'ck',checkbox:true}]],
        idField:'orderno',
        rownumbers:true,
        loadMsg:'Loading...',
        remoteSort:false,
        pagePosition:'top bottom',
        //checkOnSelect:false,
        // selectOnCheck:false,

        pagination:true,
        onDblClickRow:function(rowIndex, rowData){

            onDblClickRow_Show(rowData.orderno);
            // alert(rowData.orderno);

            //  $('#orderList').datagrid('clearSelections');
        },
        pageSize:30,
        pageList:[20,25,30,40,50,100],


        columns:[[
            {field:'orderno',title: cn_au_menus[language_id]['order_id'],width:100,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
 /*           {field:'serial_no',title: cn_au_menus[language_id]['order_id'],width:100,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},*/
            {field:'date',title:cn_au_menus[language_id]['Order_Time'],width:160,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'invoiceno',title:cn_au_menus[language_id]['Invoice_Number'],width:120,editor:'text',align:'center',formatter:function(value){
                if (value == undefined || value == 0)
                    return '-';
                else
                    return  value;
            }},
            {field:'payby',title:cn_au_menus[language_id]['Payment_Method'],width:120,editor:'text',align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'amount',title:cn_au_menus[language_id]['Amount'],width:120,editor:'text',align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'gst_free',title:'GST Free',width:120,editor:'text',align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }}/*,
             {field:'detail',title:cn_au_menus[language_id]['Order_Details'],width:120,editor:'text',align:'center',formatter:function(value, row, index){
             if (value == undefined)
             return '-';
             else
             return value;

             //  return '<a onclick=onDblClickRow_Show('+row.orderno+')>'+value+'</a>';
             }}*/
            // {field:'gst',title:'GST',width:120,editor:'text',align:'center',formatter:function(value){
            // 	if (value == undefined)
            // 		return '-';
            // 	else
            // 		return value;
            // }}
        ]],
        toolbar:[
            {text:'Delete',iconCls:'icon-cut',handler:function(data){

                var rows = $('#orderList').datagrid('getSelections');
                console.info(rows);
                var ids = [];
                for (var i = 0; i < rows.length; i++)
                {
                    ids.push(rows[i].orderno);
                }

                if (rows.length == 0)
                {
                    $.messager.confirm('Confirm', 'Please select an item','question');
                }
                else
                {
                    $.messager.confirm('Confirm', 'confirm to delete ?', function (r) {
                        if (r)
                        {
                            $.post('mysql.php?act=deleteOrder&start=<?php echo $date;?>&end=<?php echo $date;?>&data='+ids, function(result) {
                                if (result == 'success') {
                                    $('#orderList').datagrid('reload');
                                }

                                if (result == 'fail') {
                                    $.messager.show({
                                        title:'Error',
                                        msg:'Delete data fail'
                                    });
                                }
                            });
                        }
                    })
                }
            }}
        ],
        onLoadSuccess:function(data){
            if(data.total == 0){
                //alert("No Records founds");
                $.messager.show({
                    title:'提示',
                    msg:'No Records founds'
                });
            }

            else{
                console.log(data['total_sales']);
                $("#total_sales").text(data['total_sales']);
            }
        }
    });

    $('#orderList').datagrid('load');
    $('#orderList').datagrid('hideColumn', 'orderno');
}