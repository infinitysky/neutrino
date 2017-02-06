/**
 * Created by cliff on 1/24/2017.
 */
import { OpaqueToken } from "@angular/core";

// Although the ApplicationConfig interface plays no role in dependency injection,
// it supports typing of the configuration object within the class.
export interface ApplicationConfig {
  appName: string;
  apiEndpoint: string;
  getBarChartUrl:string;
  getUserInfoUrl:string;



  getAllTimeFrameUrl:string;
  createTimeFrameUrl:string;


}

// Configuration values for our app
export const MY_CONFIG: ApplicationConfig = {
  appName: 'My new App',
  apiEndpoint: 'http://127.0.0.1:8080',
  getBarChartUrl: '/uniBackEnd/index.php/BarChart',
  //getUserInfoUrl:'/neutrino/backEndAPI/index.php/Login'
  getUserInfoUrl:'/assets/mockUserInfo.json',


  //time frame Urls:
  getAllTimeFrameUrl:'/neutrino/backEndAPI/index.php/Time_frames/getall',
  createTimeFrameUrl:'/neutrino/backEndAPI/index.php/Time_frames/getall',



};

// Create a config token to avoid naming conflicts
export const MY_CONFIG_TOKEN = new OpaqueToken('config');
