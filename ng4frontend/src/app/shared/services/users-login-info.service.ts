
import {Injectable} from '@angular/core';
import { Http,Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
// Import the config-related things
import { MY_CONFIG, ApplicationConfig } from '../../app-config';
@Injectable()
export class UsersLoginInfoService {
    private userInfoAPi = MY_CONFIG.apiEndpoint + MY_CONFIG.apiPath +  MY_CONFIG.getUserInfoUrl;
    private loginAPi = MY_CONFIG.apiEndpoint + MY_CONFIG.apiPath +  MY_CONFIG.loginUrl;

    private headers = new Headers({ 'Content-Type': 'application/json' });

    public myDatas: any;

    constructor(public http: Http) {
        this.http = http;

    }

    getUserInfo(): any {
        const url = '/assets/mockUserInfo.json';
        return this.http.get(url)
            .map((res: Response) => res.json());
    }

    login(loginInfo){

        const url = this.loginAPi;
        const httpBody = JSON.stringify({email: loginInfo.email, password: loginInfo.password });
        return this.http.post(url, httpBody, {headers: this.headers})
            .map(res => res.json())
            .catch(this.handleErrorObservable);
    }

    logout(){
       localStorage.removeItem('currentUser');
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
