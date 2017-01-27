/**
 * Created by cliff on 1/24/2017.
 */
import { OpaqueToken } from "@angular/core";

// Although the ApplicationConfig interface plays no role in dependency injection,
// it supports typing of the configuration object within the class.
export interface ApplicationConfig {
  appName: string;
  apiEndpoint: string;
  getBarChart:string;

}

// Configuration values for our app
export const MY_CONFIG: ApplicationConfig = {
  appName: 'My new App',
  apiEndpoint: 'http://127.0.0.1',
  getBarChart: '/uniBackEnd/index.php/BarChart'

};

// Create a config token to avoid naming conflicts
export const MY_CONFIG_TOKEN = new OpaqueToken('config');
