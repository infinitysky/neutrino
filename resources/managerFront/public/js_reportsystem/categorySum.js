/**
 * Created by ismart on 6/9/15.
 */


function format_bug_date_categorySum(date){
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

function export_to_csv(){



}

function show_sum_static()
{
    var date_start = $("input[name=search_date_start_category]").val().trim();
    var date_end = $("input[name=search_date_end_category]").val().trim();

    $('#report_content').panel('close');
    $('#report_chart').panel('open');

    d3.select("#report_chart_svg").remove();

    var margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = 1100 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%Y%m%d").parse;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.temperature); });

    var svg = d3.select("#report_category_static").append("svg")
        .attr("name", "report_chart_svg")
        .attr("id", "report_chart_svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("mysql.php?act=category_static&start="+date_start+"&end="+date_end, function(error, data) {
        color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

        data.forEach(function(d) {
            d.date = parseDate(d.date);
        });

        var cities = color.domain().map(function(name) {
            return {
                name: name,
                values: data.map(function(d) {
                    return {date: d.date, temperature: +d[name]};
                })
            };
        });

        x.domain(d3.extent(data, function(d) { return d.date; }));

        y.domain([
            d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
            d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
        ]);

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
            .text("Amount");

        var city = svg.selectAll(".city")
            .data(cities)
            .enter().append("g")
            .attr("class", "city");

        city.append("path")
            .attr("class", "line")
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) { return color(d.name); });

        city.append("text")
            .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
            .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
            .attr("x", 3)
            .attr("dy", ".35em")
            .text(function(d) { return d.name; });
    });

}

function search_date_sum_category(export_to_csv)

{
    $('#report_content').panel('open');
    $('#report_chart').panel('close');


    /*    $('#date_start_category').datebox('setValue', '<?php echo $date;?>');
     $('#date_end_category').datebox('setValue', '<?php echo $date;?>');
     */

    var date_start = $('#date_start_category').datebox('getValue');
    var date_end =   $('#date_end_category').datebox('getValue');


/*    if (!checkDate(date_start, '<?php echo $startday;?>'))
    {
        $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
        $('#report_category').datagrid('load');
        return;
    }*/

    var var_day = document.getElementById("day").getAttribute("class");
    var var_week = document.getElementById("week").getAttribute("class");
    var var_month = document.getElementById("month").getAttribute("class");

    var way_csv='';

    if (var_day == 'a_style a_checked')
    {url = 'mysql.php?act=listReport&way=day'; way_csv='day';}
    else if (var_week == 'a_style a_checked')
    { url = 'mysql.php?act=listReport&way=week'; way_csv='week';}

    else if (var_month == 'a_style a_checked')
    { url = 'mysql.php?act=listReport&way=month';way_csv='month';}


    /* check_bug_date **************************************************************************/

    if (date_start == '' || date_end == '')
    {
        if (date_start != '' && date_end == ''){

            if(last_date['categorySum_end']!=''){
                date_end = last_date['categorySum_end'];
                last_date['categorySum_start']=date_start;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }


        if (date_end != '' && date_start == ''){

            if(last_date['categorySum_start']!=''){
                date_start =  last_date['categorySum_start'];
                last_date['categorySum_end']=date_end;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }



        if (date_end == '' && date_start == ''){

            if(last_date['categorySum_start']!=''&&last_date['categorySum_end']!=''){
                date_start =  last_date['categorySum_start'];
                date_end = last_date['categorySum_end'];
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');
            }
        }

        if (date_start > date_end){
            $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
        }

    }else{

        last_date['categorySum_start']= date_start;
        last_date['categorySum_end']=date_end;
    }


 //   console.log(date_start);
   // console.log(date_end);
    /***************************************************************************/



    $('#report_category').datagrid({
        url: url+'&start='+date_start+'&end='+date_end,
        striped:true,
        singleSelect:true,
        nowrap:true,
        loadMsg:'Loading...',
        pagePosition:'top bottom',
        pagination:false,
        pageSize:1000,
        pageList:[20,25,30,40,50],
        onLoadSuccess:function(data){

            if(export_to_csv==''){

            }else if(export_to_csv=='export_to_csv'){


                //var str = "栏位1,栏位2,栏位3\n值1,值2,值3";
                var str = cn_au_menus[language_id]['Date']+","+cn_au_menus[language_id]['Sale_Amount']+",CASH,EFTPOS,Credit,GST Sale,GST FREE,Drinks,Foods,Manual Adjustment,Cash Paid Out\n";           //Rocky's work

                for(var i=0;i<data['rows'].length;i++){

                    console.log(data['rows'][i]);


                    var CASH =data['rows'][i]['-1000'];

                    if (CASH == undefined){
                        CASH='-';

                    }

                    var EFTPOS =data['rows'][i]['-1002'];

                    if (EFTPOS == undefined){
                        EFTPOS='-';

                    }

                    var Credit =data['rows'][i]['-1001'];

                    if (Credit == undefined){
                        Credit='-';

                    }

                    var GST =data['rows'][i]['gst'];

                    if (GST == undefined){
                        GST='-';

                    }

                    var GST_FREE =data['rows'][i]['gst_free'];

                    if (GST_FREE == undefined){
                        GST_FREE='-';

                    }

                    var DRINK =data['rows'][i]['drink'];

                    if (DRINK == undefined){
                        DRINK='-';

                    }

                    var FOODS =data['rows'][i]['food'];

                    if (FOODS == undefined){
                        FOODS='-';

                    }

                    var MANUAL_ADJUSTMENT =data['rows'][i]['-3'];            //Rocky' work

                    if (MANUAL_ADJUSTMENT == undefined){
                        MANUAL_ADJUSTMENT='-';

                    }

                    var Cash_Paid_Out =data['rows'][i]['-5'];

                    if (Cash_Paid_Out == undefined){
                        Cash_Paid_Out='-';

                    }

                    str +=data['rows'][i]['day']+","+data['rows'][i]['amount']+","+CASH+","+EFTPOS+","+Credit+","+GST+","+GST_FREE+","+DRINK+","+FOODS+","+MANUAL_ADJUSTMENT+","+Cash_Paid_Out+"\n";            //Rocky' work

                }


                str =  encodeURIComponent(str);
                var downloadLink = document.createElement("a");
                downloadLink.download = "csv_"+way_csv+"_"+date_start+"_"+date_end+".csv"
                downloadLink.href=href = "data:text/csv;charset=utf-8,\ufeff"+str;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);


            }



        },
        columns:[[
            {field:'day',title:cn_au_menus[language_id]['Date'],width:80,align:'center',formatter:function(value){
                if (value == undefined)
                    return date_today;
                else
                    return value;
            }},
            {field:'amount',title:cn_au_menus[language_id]['Sale_Amount'],width:120,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'-1000',title:'CASH',width:100,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'-1002',title:'EFTPOS',width:80,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'-1001',title:'Credit',width:80,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'gst',title:'GST Sale',width:100,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'gst_free',title:'GST FREE',width:80,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'drink',title:'Drinks',width:100,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'food',title:'Foods',width:100,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'-3',title:'Manual Adjustment',width:100,align:'center',formatter:function(value){            //Rocky' work
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'-5',title:'Cash Paid Out',width:90,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }}
        ]]
    });

 //   $('#report_category').datagrid('load');



}


function click_change(obj, way)
{
    $('#report_content').panel('open');
    $('#report_chart').panel('close');

    $(obj).addClass('a_checked')
        .siblings('a').removeClass('a_checked');

    var date_start = $("input[name=search_date_start_category]").val().trim();
    var date_end = $("input[name=search_date_end_category]").val().trim();

/*    if (!checkDate(date_start, '<?php echo $startday;?>'))
    {
        $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
        $('#report_category').datagrid('load');
        return;
    }*/


    /* check_bug_date **************************************************************************/

    if (date_start == '' || date_end == '')
    {
        if (date_start != '' && date_end == ''){

            if(last_date['categorySum_end']!=''){
                date_end = last_date['categorySum_end'];
                last_date['categorySum_start']=date_start;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }


        if (date_end != '' && date_start == ''){

            if(last_date['categorySum_start']!=''){
                date_start =  last_date['categorySum_start'];
                last_date['categorySum_end']=date_end;
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }



        if (date_end == '' && date_start == ''){

            if(last_date['categorySum_start']!=''&&last_date['categorySum_end']!=''){
                date_start =  last_date['categorySum_start'];
                date_end = last_date['categorySum_end'];
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');
            }
        }

        if (date_start > date_end){
            $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
        }

    }else{

        last_date['categorySum_start']= date_start;
        last_date['categorySum_end']=date_end;
    }


    //console.log(date_start);
    //console.log(date_end);
    /***************************************************************************/

    $('#report_category').datagrid({
        url:'mysql.php?act=listReport&way='+way+'&start='+date_start+'&end='+date_end,
        striped:true,
        //rownumbers:true,
        singleSelect:true,
        nowrap:true,
        loadMsg:'Loading...',
        pagePosition:'top bottom',
        pagination:false,
        pageSize:1000,
        pageList:[20,25,30,40,50],
        onLoadSuccess:function(data){

           // 必须加上这个回调,不然会再次打印数据


        },
        columns:[[
            {field:'day',title:cn_au_menus[language_id]['Date'],width:80,align:'center',formatter:function(value){
                if (value == undefined)
                    return date_today;
                else
                    return value;
            }},
            {field:'amount',title:cn_au_menus[language_id]['Sale_Amount'],width:120,align:'center',formatter:function(value){
                if (value == undefined)
                    return 0;
                else
                    return value;
            }},
            {field:'-1000',title:'CASH',width:100,align:'center',formatter:function(value){
                if (value == undefined)
                    return 0;
                else
                    return value;
            }},
            {field:'-1002',title:'EFTPOS',width:80,align:'center',formatter:function(value){
                if (value == undefined)
                    return 0;
                else
                    return value;
            }},
            {field:'-1001', title:'Credit',width:80,align:'center',formatter:function(value){
                if (value == undefined)
                    return 0;
                else
                    return value;
            }},
            {field:'gst',title:'GST',width:100,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'gst_free',title:'GST FREE',width:80,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'drink',title:'Drinks',width:100,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'food',title:'Foods',width:100,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'-3',title:'Manual Adjustment',width:100,align:'center',formatter:function(value){            //Rocky's work
                if (value == undefined)
                    return '-';
                else
                    return value;
            }},
            {field:'-5',title:'Cash Paid Out',width:90,align:'center',formatter:function(value){
                if (value == undefined)
                    return '-';
                else
                    return value;
            }}
        ]]
    });

   // $('#report_category').datagrid('load');
}

function reset_sum_category()
{
    $('#report_content').panel('open');
    $('#report_chart').panel('close');

    $('#date_start_category').datebox('setValue', date_today);
    $('#date_end_category').datebox('setValue', date_today);

    document.getElementById("day").setAttribute("class", "a_style a_checked");
    document.getElementById("week").setAttribute("class", "a_style");
    document.getElementById("month").setAttribute("class", "a_style");

    $('#report_category').datagrid({
        url:'mysql.php?act=listReport&way=day&start=<?php echo $date;?>&end=<?php echo $date;?>',
        striped:true,
        //rownumbers:true,
        singleSelect:true,
        nowrap:true,
        loadMsg:'Loading...',
        pagePosition:'top  bottom',
        pagination:false,
        pageSize:1000,
        pageList:[20,25,30,40,50],

        columns:[[
            {field:'day',title:cn_au_menus[language_id]['Date'],width:150,align:'center',formatter:function(value){
                if (value == undefined)
                    return date_today;
                else
                    return value;
            }},
            {field:'amount',title:cn_au_menus[language_id]['Sale_Amount'],width:220,align:'center',formatter:function(value){
                if (value == undefined)
                    return 0;
                else
                    return value;
            }},
            {field:'-1000',title:'CASH',width:180,align:'center',formatter:function(value){
                if (value == undefined)
                    return 0;
                else
                    return value;
            }},
            {field:'-1002',title:'EFTPOS',width:180,align:'center',formatter:function(value){
                if (value == undefined)
                    return 0;
                else
                    return value;
            }},
            {field:'-1001',title:'Credit',width:180,align:'center',formatter:function(value){
                if (value == undefined)
                    return 0;
                else
                    return value;
            }}
        ]]
    });

   // $('#report_category').datagrid('load');
}