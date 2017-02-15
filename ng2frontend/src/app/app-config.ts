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


  timeFrameOperateUrl:string;
  timeFrameGetAllUrl:string;
  timeFrameCreateUrl:string;


  teamGetAllUrl:string;
  teamCreateUrl:string;
  teamOperateUrl:string;

  goalGetAllUrl:string;
  goalCreateUrl:string;
  goalOperateUrl:string;


  objectiveGetAllUrl:string;
  objectiveCreateUrl:string;
  objectiveOperateUrl:string;

  keyResultGetAllUrl:string;
  keyResultCreateUrl:string;
  keyResultOperateUrl:string;


  activityGetAllUrl:string;
  activityCreateUrl:string;
  activityOperateUrl:string;



  companyGetAllUrl:string;
  companyCreateUrl:string;
  companyOperateUrl:string;



  userGetAllUrl:string;
  userCreateUrl:string;
  userOperateUrl:string;


  //User-detail Urls:
  userDetailGetAllUrl:string;
  userDetailCreateUrl:string;
  userDetailOperateUrl:string;
  userDetailFullInfo:string;


}

// Configuration values for our app
export const MY_CONFIG: ApplicationConfig = {
  appName: 'My new App',
  apiEndpoint: 'http://127.0.0.1:8080',

  getBarChartUrl: '/uniBackEnd/index.php/BarChart',

  //getUserInfoUrl:'/neutrino/backEndAPI/index.php/Login'
  getUserInfoUrl:'/assets/mockUserInfo.json',


  //time frame Urls:
  timeFrameGetAllUrl:'/neutrino/backEndAPI/index.php/Time_frames',
  timeFrameCreateUrl:'/neutrino/backEndAPI/index.php/Time_frames/create',
  timeFrameOperateUrl:'/neutrino/backEndAPI/index.php/Time_frames/items',


    //team Urls:
  teamGetAllUrl:'/neutrino/backEndAPI/index.php/Teams',
  teamCreateUrl:'/neutrino/backEndAPI/index.php/Teams/create',
  teamOperateUrl:'/neutrino/backEndAPI/index.php/Teams/items',


    //goal Urls:
  goalGetAllUrl:'/neutrino/backEndAPI/index.php/Goals',
  goalCreateUrl:'/neutrino/backEndAPI/index.php/Goals/create',
  goalOperateUrl:'/neutrino/backEndAPI/index.php/Goals/items',


    //objective Urls:
  objectiveGetAllUrl:'/neutrino/backEndAPI/index.php/Objectives',
  objectiveCreateUrl:'/neutrino/backEndAPI/index.php/Objectives/create',
  objectiveOperateUrl:'/neutrino/backEndAPI/index.php/Objectives/items',


  //key result Urls:
  keyResultGetAllUrl:'/neutrino/backEndAPI/index.php/Key_results',
  keyResultCreateUrl:'/neutrino/backEndAPI/index.php/Key_results/create',
  keyResultOperateUrl:'/neutrino/backEndAPI/index.php/Key_results/items',


   //activity Urls:
  activityGetAllUrl:'/neutrino/backEndAPI/index.php/Activities',
  activityCreateUrl:'/neutrino/backEndAPI/index.php/Activities/create',
  activityOperateUrl:'/neutrino/backEndAPI/index.php/Activities/items',


    //company Urls:
  companyGetAllUrl:'/neutrino/backEndAPI/index.php/Company_info',
  companyCreateUrl:'/neutrino/backEndAPI/index.php/Company_info/create',
  companyOperateUrl:'/neutrino/backEndAPI/index.php/Company_info/items',


    //User Urls:
  userGetAllUrl:'/neutrino/backEndAPI/index.php/Users',
  userCreateUrl:'/neutrino/backEndAPI/index.php/Users/create',
  userOperateUrl:'/neutrino/backEndAPI/index.php/Users/items',

  //User-detail Urls:
  userDetailGetAllUrl:'/neutrino/backEndAPI/index.php/Users_details',
  userDetailFullInfo:'/neutrino/backEndAPI/index.php/Users_details/items_full_info',
  userDetailCreateUrl:'/neutrino/backEndAPI/index.php/Users_details/create',
  userDetailOperateUrl:'/neutrino/backEndAPI/index.php/Users_details/items',



};

// Create a config token to avoid naming conflicts
export const MY_CONFIG_TOKEN = new OpaqueToken('config');
