import { Injectable } from '@angular/core';

import { Http,Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { MY_CONFIG } from '../../../../app-config';

@Injectable()
export class HomepageService {



  private operateAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.apiPath +  MY_CONFIG.homepageUrl;


  // private readFullAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.apiPath +  MY_CONFIG.userDetailFullInfo;


  private headers = new Headers({ 'Content-Type': 'application/json' });

  public tempdata: any;

  constructor(private http: Http) { }


  private handleErrorObservable(error: Response | any) {
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



  getHomeInfo(user_id, timeFrameId) {

    const httpBody = {user_id: user_id , timeFrameId : timeFrameId };
    //   const url = `${this.operateAPI}/${user.user_id}`;

    return this.http.post(this.operateAPI, httpBody, this.headers)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }


}
