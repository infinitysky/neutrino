/**
 * Created by ismart on 6/9/15.
 */



function format_bug_date_saleReport(date){
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


function show_saleReport_static()
{
    var date_start = $("input[name=search_date_start_sale]").val();
    var date_end = $("input[name=search_date_end_sale]").val();


    /* check_bug_date **************************************************************************/

    if (date_start == '' || date_end == '')
    {
        if (date_start != '' && date_end == ''){

            if(last_date['saleReport_end']!=''){
                date_end = last_date['saleReport_end'];
                last_date['saleReport_start']=date_start;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }


        if (date_end != '' && date_start == ''){

            if(last_date['saleReport_start']!=''){
                date_start =  last_date['saleReport_start'];
                last_date['saleReport_end']=date_end;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }



        if (date_end == '' && date_start == ''){

            if(last_date['saleReport_start']!=''&&last_date['saleReport_end']!=''){
                date_start =  last_date['saleReport_start'];
                date_end = last_date['saleReport_end'];
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');
            }
        }

        if (date_start > date_end){
            $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
        }

    }else{

        last_date['saleReport_start']= date_start;
        last_date['saleReport_end']=date_end;
    }


    /***************************************************************************/



    $('#saleReport_content').panel('close');
    $('#saleReport_chart').panel('open');

    d3.select("#saleReport_static_svg").remove();

    var margin = {top: 20, right: 20, bottom: 30, left: 100},
        width = 1100 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .3);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(20);

    var svg = d3.select("#saleReport_static").append("svg")
        .attr("name", "saleReport_static_svg")
        .attr("id", "saleReport_static_svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("mysql.php?act=saleReport_static&start=" + date_start + '&end=' + date_end, type, function(error, data) {
        x.domain(data.map(function(d) { return d.name; }));
        y.domain([0, d3.max(data, function(d) { return d.sum; })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Sales");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.name); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.sum); })
            .attr("height", function(d) { return height - y(d.sum); });

    });
}

function type(d) {
    d.sum = +d.sum;
    return d;
}

function reset_sale()
{
    $('#saleReport_content').panel('open');
    $('#saleReport_chart').panel('close');

    $('#search_date_start_sale').datebox('setValue', '<?php echo $date;?>');
    $('#search_date_end_sale').datebox('setValue', '<?php echo $date;?>');
    $("#EditWindow").window('close');

    $('#saleTable').datagrid({
        url:'mysql.php?act=listCategory&start=<?php echo $date;?>&end=<?php echo $date;?>',
        striped:true,
        singleSelect:true,
        nowrap:true,
        rownumbers:true,
        loadMsg:'Loading...',
        onClickRow:onClickRow_Show,
        pagePosition:'top bottom',
        pagination:true,
        pageSize:30,
        pageList:[20,25,30,40,50],

        columns:[[
            {field:'category',title:'类别',width:150,align:'center'},
            {field:'sum',title:'总数',width:150,align:'center',formatter:function(value){
                if(value == undefined)
                    return '-';
                else
                    return value;
            }}
        ]]
    });

    $('#saleTable').datagrid('load');
}

function search_date_sale()
{
    $('#saleReport_content').panel('open');
    $('#saleReport_chart').panel('close');

    var date_start = $("input[name=search_date_start_sale]").val();
    var date_end = $("input[name=search_date_end_sale]").val();

/*    if (!checkDate(date_start, '<?php echo $startday;?>'))
    {
        $.messager.alert('提示','超过查询的日期范围','question');
        $('#saleTable').datagrid('load');
        return;
    }*/


    /* check_bug_date **************************************************************************/

    if (date_start == '' || date_end == '')
    {
        if (date_start != '' && date_end == ''){

            if(last_date['saleReport_end']!=''){
                date_end = last_date['saleReport_end'];
                last_date['saleReport_start']=date_start;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }


        if (date_end != '' && date_start == ''){

            if(last_date['saleReport_start']!=''){
                date_start =  last_date['saleReport_start'];
                last_date['saleReport_end']=date_end;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }



        if (date_end == '' && date_start == ''){

            if(last_date['saleReport_start']!=''&&last_date['saleReport_end']!=''){
                date_start =  last_date['saleReport_start'];
                date_end = last_date['saleReport_end'];
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');
            }
        }

        if (date_start > date_end){
            $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
        }

    }else{

        last_date['saleReport_start']= date_start;
        last_date['saleReport_end']=date_end;
    }


    /***************************************************************************/

    $('#saleTable').datagrid({
        url:'mysql.php?act=listCategory&start='+date_start+'&end='+date_end,
        striped:true,
        singleSelect:true,
        nowrap:true,
        rownumbers:true,
        loadMsg:'Loading...',
        onClickRow:onClickRow_Show,
        pagePosition:'top',
        pagination:true,
        pageSize:30,
        pageList:[20,25,30,40,50],

        columns:[[
            {field:'category',title:cn_au_menus[language_id]['Category'],width:150,align:'center'},
            {field:'sum',title:cn_au_menus[language_id]['Units_Sold'],width:150,align:'center',formatter:function(value){
                if(value == undefined)
                    return '-';
                else
                    return value;
            }}
        ]]
    });

    $('#saleTable').datagrid('load');

}

function onClickRow_Show()
{
    var date_start = $("input[name=search_date_start_sale]").val();
    var date_end = $("input[name=search_date_end_sale]").val();

    var row = $("#saleTable").datagrid('getSelections');
    var category = row[0].category;


    /* check_bug_date **************************************************************************/

    if (date_start == '' || date_end == '')
    {
        if (date_start != '' && date_end == ''){

            if(last_date['saleReport_end']!=''){
                date_end = last_date['saleReport_end'];
                last_date['saleReport_start']=date_start;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }


        if (date_end != '' && date_start == ''){

            if(last_date['saleReport_start']!=''){
                date_start =  last_date['saleReport_start'];
                last_date['saleReport_end']=date_end;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }



        if (date_end == '' && date_start == ''){

            if(last_date['saleReport_start']!=''&&last_date['saleReport_end']!=''){
                date_start =  last_date['saleReport_start'];
                date_end = last_date['saleReport_end'];
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');
            }
        }

        if (date_start > date_end){
            $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
        }

    }else{

        last_date['saleReport_start']= date_start;
        last_date['saleReport_end']=date_end;
    }


    /***************************************************************************/

    $('#Edit_list').datagrid({
        title:'',
        nowrap:true,
        rownumbers:true,
        singleSelect: true,
        idField:'id',
        url:'mysql.php?act=getCategoryDetail&start='+date_start+'&end='+date_end+'&category='+category,

        columns:[[
            {field:'name', title:cn_au_menus[language_id]['Item_Name'],align:'center',width:150},
            {field:'sum',title:cn_au_menus[language_id]['Units_Sold'],align:'center',width:150,formatter:function(value){
                if(value == undefined)
                    return '-';
                else
                    return value;
            }}
        ]]

    });

    $("#EditWindow").window('open');
    $("#EditWindow").bind('clickoutside', function(event){
        $(this).window('close');
    });
}
