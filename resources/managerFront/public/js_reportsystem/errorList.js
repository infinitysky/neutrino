/**
 * Created by ismart on 6/9/15.
 */



function format_bug_date_errorList(date){
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



function onDblClickRow_Show_errorList(orderno)
{

    // var row = $("#orderList").datagrid('getSelections');
    //var orderno = row[0].orderno;

    $('#orderDetail_errorList').datagrid({
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

    $("#getOrder_errorList").window('open');
    $("#getOrder_errorList").bind('clickoutside', function(event){
        $(this).window('close');
    });
}




function passed_error_orders(days)
	{
        $('#voidTag').removeAttr("checked");
        $('#discountTag').removeAttr("checked");
        //$('#discountTag').attr("checked","checked");


        var end = date_today;
        var start = end;

        if (days == 1)
        var start = end;
        else if (days == 3)
        var start = date_three_before;

        else if (days == 7)
        var start = date_seven_before;

        else if (days == 30)
        var start = date_thirty_before;


        $('#date_start_error').datebox('setValue', start);
        $('#date_end_error').datebox('setValue', end);

        var date_start=start;
        var date_end=end;

        /* check_bug_date **************************************************************************/

        if (date_start == '' || date_end == '')
        {
        if (date_start != '' && date_end == ''){

        if(last_date['errorList_end']!=''){
        date_end = last_date['errorList_end'];
        last_date['errorList_start']=date_start;
        }else{
    $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

    }
}


if (date_end != '' && date_start == ''){

    if(last_date['errorList_start']!=''){
    date_start =  last_date['errorList_start'];
    last_date['errorList_end']=date_end;
    }else{
    $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

    }
}



if (date_end == '' && date_start == ''){

    if(last_date['errorList_start']!=''&&last_date['errorList_end']!=''){
    date_start =  last_date['errorList_start'];
    date_end = last_date['errorList_end'];
    }else{
    $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');
    }
}

if (date_start > date_end){
    $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
    }

}else{

    last_date['errorList_start']= date_start;
    last_date['errorList_end']=date_end;
    }


/***************************************************************************/
start= date_start;
end= date_end;


$('#errorList').datagrid({
    url:'mysql.php?act=listErrorOrder&start='+start+'&end='+end,
    striped:true,
    singleSelect:true,
    nowrap:true,
    frozenColumns:[[{field:'ck',checkbox:true}]],
    onDblClickRow:function(rowIndex, rowData){

        onDblClickRow_Show_errorList(rowData.orderno);

    },
loadMsg:'Loading...',
pagePosition:'top bottom',
pagination:true,
pageSize:30,
pageList:[20,25,30,40,50],

columns:[[
				/*	{field:'orderno',title: cn_au_menus[language_id]['order_id'],width:100,align:'center',formatter:function(value){
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
					{field:'amount',title:cn_au_menus[language_id]['Amount'],width:100,align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }},
					{field:'discount',title:cn_au_menus[language_id]['Discount'],width:120,align:'center',formatter:function(value){
                        if (value == undefined || value == 0.00)
                        return '-';
                        else
                        return value;
                        }}
]],
onLoadSuccess:function(data){
    if(data.total == 0){
    //alert("No Records founds");
    $.messager.show({
    title:'Tip',
    msg:'No Records founds'
    });
}}
});

$('#errorList').datagrid('load');

}











function reset_error()
	{
        var start = $("input[name=search_date_start_error]").val();
        var end = $("input[name=search_date_end_error]").val();

        $('#voidTag').removeAttr("checked");
        $('#discountTag').removeAttr("checked");
        //$('#discountTag').attr("checked","checked");

        $('#errorList').datagrid({
        url:'mysql.php?act=listErrorOrder&start='+start+'&end='+end,
        striped:true,
        singleSelect:true,
        nowrap:true,
        frozenColumns:[[{field:'ck',checkbox:true}]],
            onDblClickRow:function(rowIndex, rowData){

                onDblClickRow_Show_errorList(rowData.orderno);

            },
loadMsg:'Loading...',
pagePosition:'top bottom',
pagination:true,
pageSize:30,
pageList:[20,25,30,40,50],

columns:[[
				{field:'orderno',title: cn_au_menus[language_id]['order_id'],width:100,align:'center',formatter:function(value){
                    if (value == undefined)
                    return '-';
                    else
                    return value;
                    }},
				{field:'date',title:cn_au_menus[language_id]['Order_Time'],width:160,align:'center',formatter:function(value){
                    if (value == undefined)
                    return '-';
                    else
                    return value;
                    }},
				{field:'amount',title:cn_au_menus[language_id]['Amount'],width:100,align:'center',formatter:function(value){
                    if (value == undefined)
                    return '-';
                    else
                    return value;
                    }},
				{field:'discount',title:cn_au_menus[language_id]['Discount'],width:120,align:'center',formatter:function(value){
                    if (value == undefined || value == 0.00)
                    return '-';
                    else
                    return value;
                    }}
]],
onLoadSuccess:function(data){
    if(data.total == 0){
    //alert("No Records founds");
    $.messager.show({
    title:'Tip',
    msg:'No Records founds'
    });
}}
});

$('#errorList').datagrid('load');
}

function search_date_error()
	{

        var checkValue=$("#error_order").val();

        var date_start = $("input[name=search_date_start_error]").val();
        var date_end = $("input[name=search_date_end_error]").val();



        /* check_bug_date **************************************************************************/

        if (date_start == '' || date_end == '')
        {
        if (date_start != '' && date_end == ''){

        if(last_date['errorList_end']!=''){
        date_end = last_date['errorList_end'];
        last_date['errorList_start']=date_start;
        }else{
    $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

    }
}


if (date_end != '' && date_start == ''){

    if(last_date['errorList_start']!=''){
    date_start =  last_date['errorList_start'];
    last_date['errorList_end']=date_end;
    }else{
    $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

    }
}



if (date_end == '' && date_start == ''){

    if(last_date['errorList_start']!=''&&last_date['errorList_end']!=''){
    date_start =  last_date['errorList_start'];
    date_end = last_date['errorList_end'];
    }else{
    $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');
    }
}

if (date_start > date_end){
    $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
    }

}else{

    last_date['errorList_start']= date_start;
    last_date['errorList_end']=date_end;
    }


/***************************************************************************/




console.log(date_start);
console.log(date_end);


// 检测查询的范围
/*if (!checkDate(date_start,date_today))
		{
            $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
            $('#errorList').datagrid('load');
            return;
            }*/

var url = 'mysql.php?act=listErrorOrder';

/*
if ($('#discountTag').is(":checked") && $('#voidTag').is(":checked"))
		{
            $.messager.alert('Tip','过滤条件只能为其中之一','question');
            url += '&discountTag=1';

            if (date_start != '' && date_end != '')
            url += ('&start=' + date_start + '&end=' + date_end);
            else if (date_start == '' && date_end == '')
            url += ('&start=<?php echo $date;?>&end=<?php echo $date;?>');
            else
            $.messager.alert('Tip','请选择日期','question');

            $('#errorList').datagrid({
            url:url,
            striped:true,
            singleSelect:true,
            nowrap:true,
            frozenColumns:[[{field:'ck',checkbox:true}]],
onClickRow:onDblClickRow_Show,
loadMsg:'Loading...',
pagePosition:'top bottom  bottom',
pagination:true,
pageSize:30,
pageList:[20,25,30,40,50],

columns:[[
					{field:'orderno',title: cn_au_menus[language_id]['order_id'],width:100,align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }},
					{field:'date',title:cn_au_menus[language_id]['Order_Time'],width:160,align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }},
					{field:'amount',title:cn_au_menus[language_id]['Amount'],width:100,editor:'text',align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }},
					{field:'discount',title:cn_au_menus[language_id]['Discount'],width:120,align:'center',formatter:function(value){
                        if (value == undefined || value == 0.00)
                        return '-';
                        else
                        return value;
                        }}
]],
onLoadSuccess:function(data){
    if(data.total == 0){
    //alert("No Records founds");
    $.messager.show({
    title:'提示',
    msg:'No Records founds'
    });
}}
});

$('#errorList').datagrid('load');

return;
}
*/

// 不过滤 任何特殊订单
if (checkValue=='default')
		{
            if (date_start != '' && date_end != '')
            url += ('&start=' + date_start + '&end=' + date_end);
            else if (date_start == '' && date_end == '')
            url += ('&start=' + date_start + '&end=' + date_end);
            else
            $.messager.alert('Tip','请选择日期','question');

            $('#errorList').datagrid({
            url:url,
            striped:true,
            singleSelect:true,
            nowrap:true,
            frozenColumns:[[{field:'ck',checkbox:true}]],
                onDblClickRow:function(rowIndex, rowData){

                    onDblClickRow_Show_errorList(rowData.orderno);

                },
loadMsg:'Loading...',
pagePosition:'top  bottom',
pagination:true,
pageSize:30,
pageList:[20,25,30,40,50],

columns:[[
					/*{field:'orderno',title: cn_au_menus[language_id]['order_id'],width:100,align:'center',formatter:function(value){
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
					{field:'amount',title:cn_au_menus[language_id]['Amount'],width:100,editor:'text',align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }},
					{field:'discount',title:cn_au_menus[language_id]['Discount'],width:120,align:'center',formatter:function(value){
                        if (value == undefined || value == 0.00)
                        return '-';
                        else
                        return value;
                        }}
]],
onLoadSuccess:function(data){
    if(data.total == 0){
    //alert("No Records founds");
    $.messager.show({
    title:'Tip',
    msg:'No Records founds'
    });
}}
});

$('#errorList').datagrid('load');

return;
}


// 概览 overview
if (checkValue=='overview')
        {
            url += '&overview=1';

            if (date_start != '' && date_end != '')
            url += ('&start=' + date_start + '&end=' + date_end);
            else if (date_start == '' && date_end == '')
            url += ('&start=' + date_start + '&end=' + date_end);
            else
            $.messager.alert('Tip','请选择日期','question');

            $('#errorList').datagrid({
            url:url,
            striped:true,
            singleSelect:true,
            nowrap:true,
            frozenColumns:[[{field:'ck',checkbox:true}]],
                onDblClickRow:function(rowIndex, rowData){

                    onDblClickRow_Show_errorList(rowData.orderno);

                },
loadMsg:'Loading...',
pagePosition:'top  bottom',
pagination:true,
pageSize:30,
pageList:[20,25,30,40,50],

columns:[[
                   /* {field:'orderno',title:cn_au_menus[language_id]['order_id'],width:100,align:'center',formatter:function(value){
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
                    {field:'amount',title:cn_au_menus[language_id]['Amount'],width:100,editor:'text',align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }},
                    {field:'adjust_type',title:cn_au_menus[language_id]['Adjustment_Type'],width:120,align:'center',formatter:function(value){
                        if (value == undefined || value == 0.00)
                        return '-';
                        else
                        return value;
                        }},
                    {field:'adjust_amount',title:cn_au_menus[language_id]['Adjustment_Amount'],width:120,align:'center',formatter:function(value){
                        if (value == undefined || value == 0.00)
                        return '-';
                        else
                        return value;
                        }}
]],
onLoadSuccess:function(data){
    if(data.total == 0){
    //alert("No Records founds");
    $.messager.show({
    title:'Tip',
    msg:'No Records founds'
    });
}}
});

$('#errorList').datagrid('load');

return;
}



// 过滤打折
if (checkValue=='discountTag')
		{
            url += '&discountTag=1';

            // 过滤时间
            if (date_start != '' && date_end != '')
            url += ('&start=' + date_start + '&end=' + date_end);
            else if (date_start == '' && date_end == '')
            url += ('&start=' + date_start + '&end=' + date_end);
            else
            $.messager.alert('Tip','请选择日期','question');

            $('#errorList').datagrid({
            url:url,
            striped:true,
            singleSelect:true,
            nowrap:true,
            frozenColumns:[[{field:'ck',checkbox:true}]],
                onDblClickRow:function(rowIndex, rowData){

                    onDblClickRow_Show_errorList(rowData.orderno);

                },
loadMsg:'Loading...',
pagePosition:'top   bottom',
pagination:true,
pageSize:30,
pageList:[20,25,30,40,50],

columns:[[
					/*{field:'orderno',title: cn_au_menus[language_id]['order_id'],width:100,align:'center',formatter:function(value){
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
					{field:'amount',title:cn_au_menus[language_id]['Amount'],width:100,editor:'text',align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }},
					{field:'discount',title:cn_au_menus[language_id]['Item_Discount_Amount'],width:120,align:'center',formatter:function(value){
                        if (value == undefined || value == 0.00)
                        return '-';
                        else
                        return value;
                        }}
]],
onLoadSuccess:function(data){
    if(data.total == 0){
    //alert("No Records founds");
    $.messager.show({
    title:'Tip',
    msg:'No Records founds'
    });
}}
});

$('#errorList').datagrid('load');

return;
}

// 过滤免单
if (checkValue=='voidTag')
		{
            url += '&voidTag=1';

            // 过滤时间
            if (date_start != '' && date_end != '')
            url += ('&start=' + date_start + '&end=' + date_end);
            else if (date_start == '' && date_end == '')
            url = url;
            else
            $.messager.alert('Tip','请选择日期','question');

            $('#errorList').datagrid({
            url:url,
            striped:true,
            singleSelect:true,
            nowrap:true,
            frozenColumns:[[{field:'ck',checkbox:true}]],
                onDblClickRow:function(rowIndex, rowData){

                    onDblClickRow_Show_errorList(rowData.orderno);

                },
loadMsg:'Loading...',
pagePosition:'top bottom',
pagination:true,
pageSize:30,
pageList:[20,25,30,40,50],

columns:[[
				/*	{field:'orderno',title: cn_au_menus[language_id]['order_id'],width:100,align:'center',formatter:function(value){
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
					{field:'amount',title:cn_au_menus[language_id]['Amount'],width:100,editor:'text',align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }},
					{field:'voidnum',title:cn_au_menus[language_id]['Item_Voided_Num'],width:120,align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }},
					{field:'voidamount',title:cn_au_menus[language_id]['Item_Voided_Amount'],width:120,align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }}
]],
onLoadSuccess:function(data){
    if(data.total == 0){
    //alert("No Records founds");
    $.messager.show({
    title:'Tip',
    msg:'No Records founds'
    });
}}
});

$('#errorList').datagrid('load');

return;
}

//过滤退菜
if (checkValue=='sql_void')
        {
            url += '&sql_void=1';



            // 过滤时间
            if (date_start != '' && date_end != '')
            url += ('&start=' + date_start + '&end=' + date_end);
            else if (date_start == '' && date_end == '')
            url = url;
            else
            $.messager.alert('Tip','请选择日期','question');

            $('#errorList').datagrid({
            url:url,
            striped:true,
            singleSelect:true,
            nowrap:true,
            frozenColumns:[[{field:'ck',checkbox:true}]],
                onDblClickRow:function(rowIndex, rowData){

                    onDblClickRow_Show_errorList(rowData.orderno);

                },
loadMsg:'Loading...',
pagePosition:'top  bottom',
pagination:true,
pageSize:30,
pageList:[20,25,30,40,50],

columns:[[
              /*     {field:'orderno',title: cn_au_menus[language_id]['order_id'],width:100,align:'center',formatter:function(value){
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
                    {field:'amount',title:cn_au_menus[language_id]['Amount'],width:100,editor:'text',align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }},
                    {field:'voidnum',title:cn_au_menus[language_id]['Item_Refunded_Num'],width:120,align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }},
                    {field:'voidamount',title:cn_au_menus[language_id]['Item_Refunded_Amount'],width:120,align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }}
]],
onLoadSuccess:function(data){
    if(data.total == 0){
    //alert("No Records founds");
    $.messager.show({
    title:'Tip',
    msg:'No Records founds'
    });
}}
});

$('#errorList').datagrid('load');

return;
}



//过滤金额调整
if (checkValue=='sql_adjust_amount')
        {
            url += '&sql_adjust_amount=1';



            // 过滤时间
            if (date_start != '' && date_end != '')
            url += ('&start=' + date_start + '&end=' + date_end);
            else if (date_start == '' && date_end == '')
            url = url;
            else
            $.messager.alert('Tip','请选择日期','question');

            $('#errorList').datagrid({
            url:url,
            striped:true,
            singleSelect:true,
            nowrap:true,
            frozenColumns:[[{field:'ck',checkbox:true}]],
                onDblClickRow:function(rowIndex, rowData){

                    onDblClickRow_Show_errorList(rowData.orderno);

                },
loadMsg:'Loading...',
pagePosition:'top bottom',
pagination:true,
pageSize:30,
pageList:[20,25,30,40,50],

columns:[[
                /*   {field:'orderno',title: cn_au_menus[language_id]['order_id'],width:100,align:'center',formatter:function(value){
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
                    {field:'amount',title:cn_au_menus[language_id]['Amount'],width:100,editor:'text',align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }},
                    {field:'qty',title:cn_au_menus[language_id]['Number_Of_Adjustment'],width:120,align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }},
                    {field:'total_adjust_amount',title:cn_au_menus[language_id]['Adjustment_Value'],width:120,align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }}
]],
onLoadSuccess:function(data){
    if(data.total == 0){
    //alert("No Records founds");
    $.messager.show({
    title:'Tip',
    msg:'No Records founds'
    });
}}
});

$('#errorList').datagrid('load');

return;
}

//过滤 账单总折扣
if (checkValue=='sql_bill_overall_discount')
        {
            url += '&sql_bill_overall_discount=1';



            // 过滤时间
            if (date_start != '' && date_end != '')
            url += ('&start=' + date_start + '&end=' + date_end);
            else if (date_start == '' && date_end == '')
            url = url;
            else
            $.messager.alert('Tip','请选择日期','question');

            $('#errorList').datagrid({
            url:url,
            striped:true,
            singleSelect:true,
            nowrap:true,
            frozenColumns:[[{field:'ck',checkbox:true}]],
                onDblClickRow:function(rowIndex, rowData){

                    onDblClickRow_Show_errorList(rowData.orderno);

                },
loadMsg:'Loading...',
pagePosition:'top  bottom',
pagination:true,
pageSize:30,
pageList:[20,25,30,40,50],

columns:[[
                 /*   {field:'orderno',title: cn_au_menus[language_id]['order_id'],width:100,align:'center',formatter:function(value){
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
                    {field:'amount',title:cn_au_menus[language_id]['Amount'],width:100,editor:'text',align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }},
                    {field:'qty',title:cn_au_menus[language_id]['Number_Of_Bill_Discount'],width:120,align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }},
                    {field:'total_discount',title:cn_au_menus[language_id]['Value_Of_Bill_Discount'],width:120,align:'center',formatter:function(value){
                        if (value == undefined)
                        return '-';
                        else
                        return value;
                        }}
]],
onLoadSuccess:function(data){
    if(data.total == 0){
    //alert("No Records founds");
    $.messager.show({
    title:'Tip',
    msg:'No Records founds'
    });
}}
});

$('#errorList').datagrid('load');

return;
}


}

// $(":checkbox").click(function(){
    // 	$(":checkbox").removeAttr("checked");
    // 	$(this).attr("checked","checked");
    // })

