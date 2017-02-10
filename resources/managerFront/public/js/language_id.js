/**
 * Created by ismart on 5/8/15.
 */
var language_id='au';

var test="<?php ?>";

var version_config={
    "Daily_Business_Report":1,
    "Period_Business_Report":1,
    "Order_Details" :1,
    "Sales_Statistics" :1,
    "Hourly_Sales_Statistics" :1,
    "Menu_Items_by_Sales" :1,
    "Menu_Types_by_Sales" :1,
    "Manage_Orders" :1,
    "Manage_Users" :1,
    "Update_Data" :1,
    "Backup_Data" :1,
    "Export_Data" :1,
    "Import_Data" :1
};



var cn_au_menus={'cn':{'city':'北京',

    //global  全局设置
    'Exit':'退出系统',
    'Search':'搜索',
    'Reset':'重置',
    'Amount':'消费金额',
    'Discount':'折扣',
    'Date':'日期',
    'Delete':'delete',
    'Add':'添加',
    'confirm_button':'确定',
    'submit':'提交',
    'cancel':'取消',
    'out_of_date_range':'超过查询的日期范围',
    'please_select_a_date':'请选择一个日期',

    //左侧菜单栏   left menus
    'Daily_Business_Report':'日营业简报',
    'Period_Business_Report':'时间段简报',
    'Order_Details':'订单明细表',
    'Sales_Statistics':'营业额统计表',
    'Hourly_Sales_Statistics':'每小时营业额统计',
    'Menu_Items_by_Sales':'菜品销量排行',
    'Menu_Types_by_Sales':'分类销量统计',
    'Manage_Orders':'订单管理',
    'Manage_Users':'用户管理',
    'Update_Data':'数据更新',
    'Backup_Data':'数据备份',
    'Export_Data':'导出数据',
    'Import_Data':'导入数据',



    //订单明细表  Order Details
    'order_id':'订单号',
    'Order_Time':'订单时间',
    'Today':'当天订单',
    'Last_3_days':'过去三天订单',
    'Last_7_days':'过去七天订单',
    'Last_30_days':'过去三十天订单',

    'default':'--全部订单--',
    'overview':'经过调整的订单',
    'discountTag':'菜品折扣',
    'voidTag':'免单菜品',
    'sql_void':'退菜',
    'sql_adjust_amount':'金额调整',
    'sql_bill_overall_discount':'账单折扣',
    'Adjustment_Type':'调整类型',
    'Adjustment_Amount':'调整金额',


    'Item_Name':'菜名',
    'Quantity':'数量',
    'Price':'价格',
    'Item_Discount':'单品折扣',
    'Item_Refunded':'单品退菜',
    'Item_Voided':'单品免单',
    'Item_Discount_Amount':'菜品折扣金额',
    'Item_Voided_Num':'免单数量',
    'Item_Voided_Amount':'免单金额',
    'Item_Refunded_Num':'退菜数量',
    'Item_Refunded_Amount':'退菜金额',

    'Number_Of_Adjustment':'金额调整次数',
    'Adjustment_Value':'金额调整总额',

    'Number_Of_Bill_Discount':'账单折扣总数',
    'Value_Of_Bill_Discount':'账单折扣总数',

    //  Sales Statistics
    'day':'日汇总',
    'week':'周汇总',
    'month':'月汇总',
    'Sale_Amount':'营业总额',

    // 菜品销量排行 Menu Items by Sales
    'Chart':'图表',
    'Amount_Sold':'总金额',

    //Menu Types by Sales
    'Category':'类别',
    'Units_Sold':'总数',

    //订单管理
    'Invoice_Number':'发票号',
    'Payment_Method':'支付方式',


    'both_Invoic':'--按照发票过滤--',
    'hasInvoice':'有发票',
    'noInvoice':'无发票',
    'both_Cash':'--按照支付方式过滤--',
    'paybyCash':'现金支付',
    'paybyOther':'非现金支付',

     // 用户管理
     'user_id':'编号',
     'privileges':'权限',
     'username':'用户名',
     'password':'密码',
     'checkdays':'查看天数',
     'super_user':'超级用户',
     'normal_user':'普通用户',

     

    // 数据更新
    'title_update_data':'从服务器更新数据',
    'content_update_data':'如果勾选此选项，服务器的历史记录将被清除。清除之后，系统将自动"备份服务器数据"到此便携计算机的桌面上的Downloads文件夹，以便于您日后恢复',

    'tab_name_update_data':'更新数据',

    'update_success':'数据更新成功,服务器历史数据亦被清除！！！同时，服务器的数据库文件成功的备份到了',
    'inconsistent':'您登陆时选择的店名与您现在所处的店不一致，请确认后再次尝试',
    'success_not_delete':'数据更新成功！!!',






    //数据备份
    'content_backup_data':'备份本地数据库',

    'tab_name_backup_data':'备份本地数据库',
 'backup_data_success_tip':'恭喜你 !!!  本地的数据库文件成功的备份到了桌面上的 Downloads文件夹下: ',
     

     //导出数据
    'tab_name_export_data':'导出数据',
    'content_export_data':'请选择起始时间和截止时间',
    'export_data_success_tip':'恭喜你 !!!  按照您选择的起止时间,本地的数据库文件成功的备份到了桌面上的 Downloads文件夹下: ',
    //导入数据
    'tab_name_import_data':'导入指定数据库文件'


},



    'au':{'city':'Melbourne',

        //global  全局设置
        'Exit':'Exit',
        'Search':'Search',
        'Reset':'Reset',
        'Amount':'Amount',
        'Discount':'Discount',
        'Date':'Date',
        'Delete':'Delete',
        'Add':'Add',
        'confirm_button':'Confirm',
        'submit':'submit',
        'cancel':'cancel',
        'out_of_date_range':'sorry, out of date range',
        'please_select_a_date':'please select a date',

        //左侧菜单栏   left menus
        'Daily_Business_Report':'Daily Business Report',
        'Period_Business_Report':'Period Business Report',
        'Order_Details':'Order Details',
        'Sales_Statistics':'Sales Statistics',
        'Hourly_Sales_Statistics':'Hourly Sales Statistics',
        'Menu_Items_by_Sales':'Menu Items by Sales',
        'Menu_Types_by_Sales':'Menu Types by Sales',
        'Manage_Orders':'Manage Orders',
        'Manage_Users':'Manage Users',
        'Update_Data':'Update Data',
        'Backup_Data':'Backup Data',
        'Export_Data':'Export Data',
        'Import_Data':'Import Data',


        //订单明细表  Order Details
        'order_id':'order_id',
        'Order_Time':'Order Time',
        'Today':'Today',
        'Last_3_days':'Last 3 days',
        'Last_7_days':'Last 7 days',
        'Last_30_days':'Last 30 days',


        'default':'--Please select an option--',
        'overview':'Overview',
        'discountTag':'Item Discount',
        'voidTag':'Item voided',
        'sql_void':'Item Refunded',
        'sql_adjust_amount':'Manual Adjustment',
        'sql_bill_overall_discount':'Bills Discounted',

        'Item_Name':'Item Name',
        'Quantity':'Quantity',
        'Price':'Price',
        'Item_Discount':'Item Discount',
        'Item_Refunded':'Item Refunded',
        'Item_Voided':'Item Voided',
        'Item_Discount_Amount':'Item Discount Amount',
        'Adjustment_Type':'Adjustment Type',
        'Adjustment_Amount':'Adjustment Amount',

        'Item_Voided_Num':'Item Voided Quantity',
        'Item_Voided_Amount':'Item Voided Amount',

        'Item_Refunded_Num':'Item Refunded Quantity',
        'Item_Refunded_Amount':'Item Refunded Amount',
        'Number_Of_Adjustment':'Number Of Adjustment',
        'Adjustment_Value':'Adjustment Value',

        'Number_Of_Bill_Discount':'Number Of Bill Discount',
        'Value_Of_Bill_Discount':'Value Of Bill Discount',

        //  Sales Statistics
        'day':'Daily',
        'week':'Weekly',
        'month':'Monthly',
        'Sale_Amount':'Sale Amount',

        // 菜品销量排行 Menu Items by Sales
        'Chart':'Chart',
        'Amount_Sold':'Amount Sold',


        //Menu Types by Sales
        'Category':'Category',
        'Units_Sold':'Units Sold',


        //订单管理
        'Invoice_Number':'Invoice Number',
        'Payment_Method':'Payment Method',

        'both_Invoic':'--Filter By Invoice--',
        'hasInvoice':'with Invoice',
        'noInvoice':'without Invoice',
        'both_Cash':'--Filter By Cash--',
        'paybyCash':'Pay by Cash',
        'paybyOther':'Pay by Other',

	 // 用户管理
	     'user_id':'user id',
	     'privileges':'privileges',
	     'username':'username',
	     'password':'password',
 	     'checkdays':'checkdays',
             'super_user':'super_user',
    	     'normal_user':'normal_user',


        // 数据更新
        'title_update_data':'Update Data From Server',
        'content_update_data':'Clear history from server - The data currently stored on the server will be cleared.  The system will automatically backup this data from the server to Downloads directory on the Desktop of the current notebook to be recovered later.',
        'tab_name_update_data':'Update Data',

        'update_success':'You successfully update data from the server and the history of server is cleared. At the same time, database archive is backed up into this local notebook at -',
        'inconsistent':'Your current store that was selected by you when you loggd in is different from the one you are in . Please double check and retry',
        'success_not_delete':'You successfully update data from the server！!!',

        //数据备份
        'content_backup_data':'BackUp Local Database',
        'backup_data_success_tip':'Congratulations !!!  Local database is successfully backed up into the  Downloads folder on the Desktop: ',
        'tab_name_backup_data':'Backup Data',
        //导出数据
        'tab_name_export_data':'Export Data',
        'content_export_data':'Please select a starting date and end date',
        'export_data_success_tip':'Congratulations !!! According to the dates that you selected, local database file is successfully backed up into the  Downloads folder on the Desktop: ',
       //导入数据
        'tab_name_import_data':'Import database file'




    }};

