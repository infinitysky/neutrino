import { Injectable } from '@angular/core';

import { Http,Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


import { MY_CONFIG, ApplicationConfig } from '../../../app-config';

import { Userclass } from '../classes/user-class';


@Injectable()
export class UserFullInfoService {


  private getallAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.userDetailGetAllUrl;
  private creatAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.userDetailCreateUrl;
  private operateAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.userDetailOperateUrl;
  private readFullAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.userDetailFullInfo;


  private headers = new Headers({ 'Content-Type': 'application/json' });

  public tempdata:any;

  constructor(private http: Http) { }



  private extractDataObservable(res: Response) {
    let body=null;
    console.log(res.status);
    if(res.status < 200 || res.status >= 300) {
      body=res;
      throw new Error('This request has failed ' + res.status);
    }
    // If everything went fine, return the response
    else {
      body = res.json()  ;
    }
    return body;
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



  get(user: Userclass): Observable<Userclass> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.operateAPI}/${user.user_id}`;

    return this.http.get(url, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  getById(userId: number): Observable<Userclass> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.readFullAPI}/${userId}`;

    return this.http.get(url, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }











}
