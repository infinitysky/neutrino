System.register(['angular2/router', './component/dashboard.component', './component/dailyBusinessReport.component', './component/orderDatails.component', './component/salesStatistics.component', './component/hourlySalesStatistics.component', './component/menuItemBySales.component', './component/menuTypesBySales', './component/manageOrders.component', './component/updataData.component', './component/backupData.component', './component/export.component', './component/importData.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, dashboard_component_1, dailyBusinessReport_component_1, orderDatails_component_1, salesStatistics_component_1, hourlySalesStatistics_component_1, menuItemBySales_component_1, menuTypesBySales_1, manageOrders_component_1, updataData_component_1, backupData_component_1, export_component_1, importData_component_1;
    var Routes, APP_ROUTES;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (dailyBusinessReport_component_1_1) {
                dailyBusinessReport_component_1 = dailyBusinessReport_component_1_1;
            },
            function (orderDatails_component_1_1) {
                orderDatails_component_1 = orderDatails_component_1_1;
            },
            function (salesStatistics_component_1_1) {
                salesStatistics_component_1 = salesStatistics_component_1_1;
            },
            function (hourlySalesStatistics_component_1_1) {
                hourlySalesStatistics_component_1 = hourlySalesStatistics_component_1_1;
            },
            function (menuItemBySales_component_1_1) {
                menuItemBySales_component_1 = menuItemBySales_component_1_1;
            },
            function (menuTypesBySales_1_1) {
                menuTypesBySales_1 = menuTypesBySales_1_1;
            },
            function (manageOrders_component_1_1) {
                manageOrders_component_1 = manageOrders_component_1_1;
            },
            function (updataData_component_1_1) {
                updataData_component_1 = updataData_component_1_1;
            },
            function (backupData_component_1_1) {
                backupData_component_1 = backupData_component_1_1;
            },
            function (export_component_1_1) {
                export_component_1 = export_component_1_1;
            },
            function (importData_component_1_1) {
                importData_component_1 = importData_component_1_1;
            }],
        execute: function() {
            exports_1("Routes", Routes = {
                //home: new Route({ path: '/', component: dashboard, name: 'Home',useAsDefault: true }),
                dashboard: new router_1.Route({ path: '/dashboard', component: dashboard_component_1.dashboard, name: 'dashboard', useAsDefault: true }),
                dailyBusinessReport: new router_1.Route({ path: '/dailyBusinessReport', component: dailyBusinessReport_component_1.dailyBusinessReport, name: 'dailyBusinessReport', data: { title: 'Daily Business Report' } }),
                periodBusinessReport: new router_1.Route({ path: '/periodBusinessReport', component: dailyBusinessReport_component_1.dailyBusinessReport, name: 'periodBusinessReport', data: { title: 'Period Business Report' } }),
                orderDatails: new router_1.Route({ path: '/orderDatails', component: orderDatails_component_1.orderDatails, name: 'orderDatails', data: { title: 'Rrder Datails' } }),
                salesStatistics: new router_1.Route({ path: '/salesStatistics', component: salesStatistics_component_1.salesStatistics, name: 'salesStatistics', data: { title: 'Sales Statistics' } }),
                hourlySalesStatistics: new router_1.Route({ path: '/hourlySalesStatistics', component: hourlySalesStatistics_component_1.hourlySalesStatistics, name: 'hourlySalesStatistics', data: { title: 'Hourly SalesStatistics' } }),
                menuItemBySales: new router_1.Route({ path: '/menuItemBySales', component: menuItemBySales_component_1.menuItemBySales, name: 'menuItemBySales', data: { title: 'Menu Item BySales' } }),
                menuTypesBySales: new router_1.Route({ path: '/menuTypesBySales', component: menuTypesBySales_1.menuTypesBySales, name: 'menuTypesBySales', data: { title: 'Menu Types BySales' } }),
                manageOrders: new router_1.Route({ path: '/manageOrders', component: manageOrders_component_1.manageOrders, name: 'manageOrders', data: { title: 'Manage Orders' } }),
                updataData: new router_1.Route({ path: '/updataData', component: updataData_component_1.updataData, name: 'updataData', data: { title: 'Updata Data' } }),
                backupData: new router_1.Route({ path: '/backupData', component: backupData_component_1.backupData, name: 'backupData', data: { title: 'Backup Data' } }),
                exportData: new router_1.Route({ path: '/exportData', component: export_component_1.exportData, name: 'exportData', data: { title: 'ExportData' } }),
                importData: new router_1.Route({ path: '/importData', component: importData_component_1.importData, name: 'importData', data: { title: 'ImportData' } })
            });
            exports_1("APP_ROUTES", APP_ROUTES = Object.keys(Routes).map(function (r) { return Routes[r]; }));
        }
    }
});
