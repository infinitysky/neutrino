/**
 * Created by ismart on 6/9/15.
 */




function format_bug_date_timeReport(date){
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



function search_date_time_new()
{
    var date_start = $("input[name=search_date_start_time]").val().trim();
    var date_end = $("input[name=search_date_end_time]").val().trim();

/*    if (!checkDate(date_start, '<?php echo $startday;?>'))
    {
        $.messager.alert('提示','超过查询的日期范围','question');
        $('#timeReport').datagrid('load');
        return;
    }*/

    var var_day = document.getElementById("dayHour_timeReport").getAttribute("class");
    var var_week = document.getElementById("weekHour_timeReport").getAttribute("class");
    var var_month = document.getElementById("monthHour_timeReport").getAttribute("class");

    if (var_day == 'a_style a_checked')
        url = 'mysql.php?act=listReport&way=dayHour';
    else if (var_week == 'a_style a_checked')
        url = 'mysql.php?act=listReport&way=weekHour';
    else if (var_month == 'a_style a_checked')
        url = 'mysql.php?act=listReport&way=monthHour';



    /* check_bug_date **************************************************************************/

    if (date_start == '' || date_end == '')
    {
        if (date_start != '' && date_end == ''){

            if(last_date['timeReport_end']!=''){
                date_end = last_date['timeReport_end'];
                last_date['timeReport_start']=date_start;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }


        if (date_end != '' && date_start == ''){

            if(last_date['timeReport_start']!=''){
                date_start =  last_date['timeReport_start'];
                last_date['timeReport_end']=date_end;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }



        if (date_end == '' && date_start == ''){

            if(last_date['timeReport_start']!=''&&last_date['timeReport_end']!=''){
                date_start =  last_date['timeReport_start'];
                date_end = last_date['timeReport_end'];
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');
            }
        }

        if (date_start > date_end){
            $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
        }

    }else{

        last_date['timeReport_start']= date_start;
        last_date['timeReport_end']=date_end;
    }


    /***************************************************************************/


    $('#timeReport').datagrid({
        url: url+'&start='+date_start+'&end='+date_end,
        striped:true,
        singleSelect:true,
        nowrap:true,
        loadMsg:'Loading...',
        pagePosition:'top bottom',
        pagination:true,
        pageSize:30,
        pageList:[20,25,30,40,50],

        columns:[[
            {field:'date',title:cn_au_menus[language_id]['Date'],width:100,align:'center'},

            {field:'08',title:'08-09',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'09',title:'09-10',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'10',title:'10-11',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'11',title:'11-12',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'12',title:'12-13',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'13',title:'13-14',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'14',title:'14-15',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'15',title:'15-16',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'16',title:'16-17',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'17',title:'17-18',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'18',title:'18-19',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'19',title:'19-20',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'20',title:'20-21',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'21',title:'21-22',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'22',title:'22-23',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'23',title:'23-24',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }}
        ]]
    });

    $('#timeReport').datagrid('load');
}




function click_time_change(obj, way)
{
    $(obj).addClass('a_checked')
        .siblings('a').removeClass('a_checked');

    var date_start = $("input[name=search_date_start_time]").val().trim();
    var date_end = $("input[name=search_date_end_time]").val().trim();

/*    if (!checkDate(date_start, '<?php echo $startday;?>'))
    {
        $.messager.alert('提示','超过查询的日期范围','question');
        $('#timeReport').datagrid('load');
        return;
    }*/


    /* check_bug_date **************************************************************************/

    if (date_start == '' || date_end == '')
    {
        if (date_start != '' && date_end == ''){

            if(last_date['timeReport_end']!=''){
                date_end = last_date['timeReport_end'];
                last_date['timeReport_start']=date_start;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }


        if (date_end != '' && date_start == ''){

            if(last_date['timeReport_start']!=''){
                date_start =  last_date['timeReport_start'];
                last_date['timeReport_end']=date_end;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }



        if (date_end == '' && date_start == ''){

            if(last_date['timeReport_start']!=''&&last_date['timeReport_end']!=''){
                date_start =  last_date['timeReport_start'];
                date_end = last_date['timeReport_end'];
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');
            }
        }

        if (date_start > date_end){
            $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
        }

    }else{

        last_date['timeReport_start']= date_start;
        last_date['timeReport_end']=date_end;
    }


    /***************************************************************************/

    $('#timeReport').datagrid({
        url:'mysql.php?act=listReport&way='+way+'&start='+date_start+'&end='+date_end,
        striped:true,
        singleSelect:true,
        nowrap:true,
        loadMsg:'Loading...',
        pagePosition:'top bottom',
        pagination:true,
        pageSize:30,
        pageList:[20,25,30,40,50],

        columns:[[
            {field:'date',title:cn_au_menus[language_id]['Date'],width:100,align:'center'},
            {field:'08',title:'08-09',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'09',title:'09-10',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'10',title:'10-11',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'11',title:'11-12',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'12',title:'12-13',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'13',title:'13-14',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'14',title:'14-15',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'15',title:'15-16',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'16',title:'16-17',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'17',title:'17-18',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'18',title:'18-19',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'19',title:'19-20',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'20',title:'20-21',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'21',title:'21-22',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'22',title:'22-23',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'23',title:'23-24',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }}
        ]]
    });

    $('#timeReport').datagrid('load');
}

function reset_time_new()
{
    $('#date_start_time').datebox('setValue', '<?php echo $date;?>');
    $('#date_end_time').datebox('setValue', '<?php echo $date;?>');

    document.getElementById("dayHour_timeReport").setAttribute("class", "a_style a_checked");
    document.getElementById("weekHour_timeReport").setAttribute("class", "a_style");
    document.getElementById("monthHour_timeReport").setAttribute("class", "a_style");

    $('#timeReport').datagrid({
        url:'mysql.php?act=listReport&way=dayHour&start=<?php echo $date;?>&end=<?php echo $date;?>',
        striped:true,
        //rownumbers:true,
        singleSelect:true,
        nowrap:true,
        loadMsg:'Loading...',
        pagePosition:'top bottom',
        pagination:true,
        pageSize:30,
        pageList:[20,25,30,40,50],

        columns:[[
            {field:'date',title:cn_au_menus[language_id]['Date'],width:100,align:'center'},
            {field:'09',title:'09:00',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},

            {field:'10',title:'10:00',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'11',title:'11:00',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'12',title:'12:00',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'13',title:'13:00',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'14',title:'14:00',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'15',title:'15:00',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'16',title:'16:00',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'17',title:'17:00',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'18',title:'18:00',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'19',title:'19:00',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'20',title:'20:00',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'21',title:'21:00',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'22',title:'22:00',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }},
            {field:'23',title:'23:00',width:70,align:'center',formatter:function(value){
                if (value == undefined)
                {
                    return '-';
                }else
                {
                    return value;
                }
            }}
        ]]
    });

    $('#timeReport').datagrid('load');
}