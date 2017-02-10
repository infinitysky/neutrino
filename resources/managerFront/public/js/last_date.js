/**
 * Created by ismart on 5/8/15.
 */

var last_date={

    errorList_start:'',
    errorList_end:'',

    categorySum_start:'',
    categorySum_end:'',

    timeReport_start:'',
    timeReport_end:'',

    dishSaleReport_start:'',
    dishSaleReport_end:'',

    saleReport_start:'',
    saleReport_end:'',

    orderList_start:'',
    orderList_end:'',
    global_date_today:''
    };






/* 20150604
function check_bug_date(start_bug,end_bug,date_start,date_end){


    if (date_start == '' || date_end == '')
    {
        if (date_start != '' && date_end == ''){

            if(last_date[end_bug]!=''){
                date_end = last_date[end_bug];
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }


        if (date_end != '' && date_start == ''){

            if(last_date[start_bug]!=''){
                date_start =  last_date[start_bug];
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');

            }
        }



        if (date_end == '' && date_start == ''){

            if(last_date[start_bug]!=''&&last_date[end_bug]!=''){
                date_start =  last_date[start_bug];
                date_end = last_date[end_bug];
            }else{
                $.messager.alert('Tip',cn_au_menus[language_id]['please_select_a_date'],'question');
            }
        }

        if (date_start > date_end){
            $.messager.alert('Tip',cn_au_menus[language_id]['out_of_date_range'],'question');
        }

    }else{

        last_date[start_bug]= date_start;
        last_date[end_bug]=date_end;
    }

}

*/