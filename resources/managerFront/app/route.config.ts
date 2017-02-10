import { RouteConfig,Route } from 'angular2/router';

import { dashboard } from './component/dashboard.component';
import { dailyBusinessReport } from './component/dailyBusinessReport.component';
import {  periodBusinessReport } from './component/periodBusinessReport.component';
import { orderDatails  } from './component/orderDatails.component';
import { salesStatistics  } from './component/salesStatistics.component';
import { hourlySalesStatistics  } from './component/hourlySalesStatistics.component';
import { menuItemBySales  } from './component/menuItemBySales.component';
import { menuTypesBySales  } from './component/menuTypesBySales';
import {  manageOrders } from './component/manageOrders.component';
import {  updataData } from './component/updataData.component';
import { backupData  } from './component/backupData.component';
import {  exportData } from './component/export.component';
import { importData  } from './component/importData.component';


export var Routes = {
  //home: new Route({ path: '/', component: dashboard, name: 'Home',useAsDefault: true }),
  dashboard: new Route({ path: '/dashboard', component: dashboard, name: 'dashboard',useAsDefault: true }),

  dailyBusinessReport: new Route({ path: '/dailyBusinessReport', component: dailyBusinessReport, name: 'dailyBusinessReport', data: { title: 'Daily Business Report'} }),

  periodBusinessReport: new Route({ path: '/periodBusinessReport', component: dailyBusinessReport, name: 'periodBusinessReport', data: { title: 'Period Business Report'} }),

  orderDatails: new Route({ path: '/orderDatails', component: orderDatails, name: 'orderDatails', data: { title: 'Rrder Datails'} }),
  salesStatistics: new Route({ path: '/salesStatistics', component: salesStatistics, name: 'salesStatistics', data: { title: 'Sales Statistics'} }),
  hourlySalesStatistics: new Route({ path: '/hourlySalesStatistics', component: hourlySalesStatistics, name: 'hourlySalesStatistics', data: { title: 'Hourly SalesStatistics'} }),
  menuItemBySales: new Route({ path: '/menuItemBySales', component: menuItemBySales, name: 'menuItemBySales', data: { title: 'Menu Item BySales'} }),
  menuTypesBySales: new Route({ path: '/menuTypesBySales', component: menuTypesBySales, name: 'menuTypesBySales', data: { title: 'Menu Types BySales'} }),
  manageOrders: new Route({ path: '/manageOrders', component: manageOrders, name: 'manageOrders', data: { title: 'Manage Orders'} }),
  updataData: new Route({ path: '/updataData', component: updataData, name: 'updataData', data: { title: 'Updata Data'} }),
  backupData: new Route({ path: '/backupData', component: backupData, name: 'backupData', data: { title: 'Backup Data'} }),
  exportData: new Route({ path: '/exportData', component: exportData, name: 'exportData', data: { title: 'ExportData'} }),
  importData: new Route({ path: '/importData', component: importData, name: 'importData', data: { title: 'ImportData'} })


}

export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);



