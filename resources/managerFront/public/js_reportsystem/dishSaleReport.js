/**
 * Created by ismart on 6/9/15.
 */

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

function show_saleList_static()
{
    var date_start = $("input[name=search_date_start_saleList]").val();
    var date_end = $("input[name=search_date_end_saleList]").val();


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



    $('#saleList_content').panel('close');
    $('#saleList_chart').panel('open');

    d3.select("#saleList_static_svg").remove();

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

    var svg = d3.select("#saleList_static").append("svg")
        .attr("name", "saleList_static_svg")
        .attr("id", "saleList_static_svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("mysql.php?act=saleList_static&start=" + date_start + '&end=' + date_end, type, function(error, data) {
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
            .text("AUD");

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

function reset_saleList()
{
    $('#saleList_content').panel('open');
    $('#saleList_chart').panel('close');

    $('#date_start_saleList').datebox('setValue', '<?php echo $date;?>');
    $('#date_end_saleList').datebox('setValue', '<?php echo $date;?>');

    $('#saleListTable').datagrid({
        url:'mysql.php?act=saleList&start=<?php echo $date;?>&end=<?php echo $date;?>',
        striped:true,
        singleSelect:true,
        nowrap:true,
        rownumbers:true,
        loadMsg:'Loading...',
        remoteSort:false,

        columns:[[
            {field:'name',title:cn_au_menus[language_id]['Item_Name'],width:300,align:'center'},
            {field:'sum',title:cn_au_menus[language_id]['Amount_Sold'],width:200,align:'center', sortable:true, formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            },sorter:function(a, b){
                return (a<b?1:-1);
            }},
            {field:'qty',title:cn_au_menus[language_id]['Quantity'],width:200,align:'center', sortable:true, formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            },sorter:function(a, b){
                return (a<b?1:-1);
            }}
        ]]
    });

    $('#saleListTable').datagrid('load');
}

function search_date_saleList()
{
    $('#saleList_content').panel('open');
    $('#saleList_chart').panel('close');

    var date_start = $("input[name=search_date_start_saleList]").val();
    var date_end = $("input[name=search_date_end_saleList]").val();

/*    if (!checkDate(date_start, '<?php echo $startday;?>'))
    {
        $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
        $('#saleListTable').datagrid('load');
        return;
    }*/



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


    $('#saleListTable').datagrid({
        url:'mysql.php?act=saleList&start=' + date_start + '&end=' + date_end,
        striped:true,
        singleSelect:true,
        nowrap:true,
        rownumbers:true,
        loadMsg:'Loading...',
        remoteSort:false,

        columns:[[
            {field:'name',title:cn_au_menus[language_id]['Item_Name'],width:300,align:'center'},
            {field:'sum',title:cn_au_menus[language_id]['Amount_Sold'],width:200,align:'center', sortable:true, formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            },sorter:function(a, b){
                return (a>b?1:-1);
            }},
            {field:'qty',title:cn_au_menus[language_id]['Quantity'],width:200,align:'center', sortable:true, formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            },sorter:function(a, b){
                return (a>b?1:-1);
            }}
        ]]
    });

    $('#saleListTable').datagrid('load');


}