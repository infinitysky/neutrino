/**
 * Created by cliff on 1/24/2017.
 */
import {OpaqueToken} from '@angular/core';

// Although the ApplicationConfig interface plays no role in dependency injection,
// it supports typing of the configuration object within the class.
export interface ApplicationConfig {
  companyName: string; // Menu company name
  appName:  string; // app name
  apiEndpoint:  string; // app backend domain
  apiPath: string; // backend path.


  getBarChartUrl: string;
  getUserInfoUrl: string;
  loginUrl: string;


  timeFrameOperateUrl: string;
  timeFrameGetAllUrl: string;
  timeFrameCreateUrl: string;


  teamGetAllUrl: string;
  teamCreateUrl: string;
  teamOperateUrl: string;

  goalGetAllUrl: string;
  goalCreateUrl: string;
  goalOperateUrl: string;


  objectiveGetAllUrl: string;
  objectiveCreateUrl: string;
  objectiveOperateUrl: string;


  userObjectiveOperateUrl: string;
  goalObjectiveOperateUrl: string;





  keyResultGetAllUrl: string;
  keyResultCreateUrl: string;
  keyResultOperateUrl: string;


  activityGetAllUrl: string;
  activityCreateUrl: string;
  activityOperateUrl: string;



  companyGetAllUrl: string;
  companyCreateUrl: string;
  companyOperateUrl: string;



  userGetAllUrl: string;
  userCreateUrl: string;
  userOperateUrl: string;


  //User-detail Urls:
  userDetailGetAllUrl: string;
  userDetailCreateUrl: string;
  userDetailOperateUrl: string;
  userDetailFullInfo: string;
  userTeamsObjectivesUrl: string;


  teamsUsersOperateUrl: string;
  teamsObjectiveOperateUrl: string;

  homepageUrl: string;


}

// Configuration values for our app
export const MY_CONFIG:  ApplicationConfig = {
  companyName: 'Rock IT Cloud',
  appName:  'My new App',
  apiEndpoint:  'http://127.0.0.1:8080',
  apiPath : '/neutrino/backEndAPI/index.php',

  getBarChartUrl: '/uniBackEnd/index.php/BarChart',

  loginUrl: '/Login',
  getUserInfoUrl: '/assets/mockUserInfo.json',


  // time frame Urls:
  timeFrameGetAllUrl: '/Time_frames',
  timeFrameCreateUrl: '/Time_frames/create',
  timeFrameOperateUrl: '/Time_frames/items',


  // team Urls:
  teamGetAllUrl: '/Teams',
  teamCreateUrl: '/Teams/create',
  teamOperateUrl: '/Teams/items',

  teamsObjectiveOperateUrl: '/Teams_objectives',
  teamsUsersOperateUrl: '/Teams_users',


  // goal Urls:
  goalGetAllUrl: '/Goals',
  goalCreateUrl: '/Goals/create',
  goalOperateUrl: '/Goals/items',


  // objective Urls:
  objectiveGetAllUrl: '/Objectives',
  objectiveCreateUrl: '/Objectives/create',
  objectiveOperateUrl: '/Objectives/items',


  // key result Urls:
  keyResultGetAllUrl: '/Key_results',
  keyResultCreateUrl: '/Key_results/create',
  keyResultOperateUrl: '/Key_results/items',


  // activity Urls:
  activityGetAllUrl: '/Activities',
  activityCreateUrl: '/Activities/create',
  activityOperateUrl: '/Activities/items',


  // company Urls:
  companyGetAllUrl: '/Company_info',
  companyCreateUrl: '/Company_info/create',
  companyOperateUrl: '/Company_info/items',


  // User Urls:
  userGetAllUrl: '/Users',
  userCreateUrl: '/Users/create',
  userOperateUrl: '/Users/items',

  // User-detail Urls:
  userDetailGetAllUrl: '/Users_details',
  userDetailFullInfo: '/Users_details/items_full_info',
  userDetailCreateUrl: '/Users_details/create',
  userDetailOperateUrl: '/Users_details/items',
  userTeamsObjectivesUrl: '/User_teams_objectives',


  userObjectiveOperateUrl: '/Users_objectives/',

  goalObjectiveOperateUrl: '/Goals_objectives/',


  homepageUrl: '/Home_page',



};

// Create a config token to avoid naming conflicts
export const MY_CONFIG_TOKEN = new OpaqueToken('config');
