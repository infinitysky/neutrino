
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
//import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
// Import the config-related things

import { MY_CONFIG, ApplicationConfig } from '../../app-config';

@Injectable()
export class UsersinfoService {
    private userInfoAPi = MY_CONFIG.apiEndpoint + MY_CONFIG.getUserInfoUrl;

    private headers = new Headers({ 'Content-Type': 'application/json' });

    public myDatas: any;

    constructor(public http: Http) {
        this.http = http;

    }

    getUserInfo(): any {
      const usr = '/assets/mockUserInfo.json';
        return this.http.get(usr)
           .map((res: Response) => res.json());
    }



    logError(err) {
        console.error('There was an error: ' + err);
    }

    //this.http.get('./friends.json').toPromise() .then((res: Response) => { this.friendsAsPromise.friends = res.json().friends; });



    private myHandleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        //return Observable.throw(error.json().error || 'Server error');
    }



}
