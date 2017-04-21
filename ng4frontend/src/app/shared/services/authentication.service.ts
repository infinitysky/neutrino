import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { MY_CONFIG, ApplicationConfig } from '../../app-config';

import { CookieService } from './cookie.service';

@Injectable()
export class AuthenticationService {



    private userInfoAPi = MY_CONFIG.apiEndpoint + MY_CONFIG.apiPath +  MY_CONFIG.getUserInfoUrl;
    private loginAPi = MY_CONFIG.apiEndpoint + MY_CONFIG.apiPath +  MY_CONFIG.loginUrl;

    private headers = new Headers({ 'Content-Type': 'application/json' });

    public myDatas: any;


    constructor(public http: Http,
    private _cookieService: CookieService
    ) {
        this.http = http;
    }


    getUserInfo(): any {
        const url = '/assets/mockUserInfo.json';
        return this.http.get(url)
            .map((res: Response) => res.json());
    }


    isLoggedIn(): boolean{

        let status = false;
        if (this._cookieService.getCookie('currentUser')&&  this._cookieService.getCookie('currentTimeFrame') && this._cookieService.getCookie('currentLoginTime')){
            status = true;
        }

        return status;
    }

    login(loginInfo){
      //  username: string, password: string
        const url = this.loginAPi;
        const httpBody = JSON.stringify({email: loginInfo.email, password: loginInfo.password });
        return this.http.post(url, httpBody, {headers: this.headers})
            .map(res => res.json())
            .timeout(1000)
            .catch(this.handleErrorObservable)
    }

    logout(){

        // remove user from local storage to log user out

       // localStorage.removeItem('currentUser');
        this._cookieService.removeAll();

        localStorage.clear();

    }

    private handleErrorObservable (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }










}
