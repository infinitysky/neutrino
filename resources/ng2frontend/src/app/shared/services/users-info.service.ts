import { Injectable } from '@angular/core';

import { Http,Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


import { MY_CONFIG, ApplicationConfig } from '../../app-config';

import { Userclass } from '../classes/user-class';


@Injectable()
export class UsersInfoService {

  private getallAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.userGetAllUrl;
  private creatAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.userCreateUrl;
  private operateAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.userOperateUrl;


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



  getAll(): Observable<Userclass[]> {
    return this.http.get(this.getallAPI)
    // .map(res => <DatabasesClass[]> res.json().data)
      .map(res => res.json())
      // .do(data => console.log(data)) // eyeball results in the console
      .catch(this.handleErrorObservable);
  }
  getTotalNumber(){
    const url = `${this.getallAPI}/count_users`;

    return this.http.get(url)
    // .map(res => <DatabasesClass[]> res.json().data)
      .map(res => res.json())
      // .do(data => console.log(data)) // eyeball results in the console
      .catch(this.handleErrorObservable);

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

    const url = `${this.operateAPI}/${userId}`;

    return this.http.get(url, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }


  delete(user: Userclass): Observable<Userclass> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    const url = `${this.operateAPI}/${user.user_id}`;

    return this.http.delete(url, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  update(user: Userclass): Observable<Userclass> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let httpBody = JSON.stringify(user)

    const url = `${this.operateAPI}/${user.user_id}`;
    return this.http
      .put(url,httpBody , options)
      .map(res => res.json())
      .catch(this.handleErrorObservable)
  }



  addNew(user_description: string, user_name: string,parent_user_id:number,user_leader_id:number,) : Observable<Userclass>  {

    let httpBody = JSON.stringify({ user_description : user_description,user_name:user_name,parent_user_id :parent_user_id,user_leader_id: user_leader_id});
    // let body2 = "{time_frame_description:Team_description,time_frame_start:Team_start,time_frame_end :Team_end}";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    //console.log('Post message body: '+httpBody);
    return this.http.post(this.creatAPI,httpBody, {headers: this.headers})
    //.map(this.extractDataObservable)
      .map(res => res.json())
      .catch(this.handleErrorObservable)

  }




}
