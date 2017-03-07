import {Injectable} from '@angular/core';


import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


import {MY_CONFIG, ApplicationConfig} from '../../../app-config';

import {Goalclass} from '../classes/goal-class'


@Injectable()
export class SettingGoalService {

  private getallAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.goalGetAllUrl;
  private creatAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.goalCreateUrl;
  private operateAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.goalOperateUrl;


  private headers = new Headers({'Content-Type': 'application/json'});



  constructor(private http: Http) {
  }


  private extractDataObservable(res: Response) {
    let body = null;
    console.log(res.status);
    if (res.status < 200 || res.status >= 300) {
      body = res;
      throw new Error('This request has failed ' + res.status);
    }
    else {
      body = res.json();
    }
    return body;
  }

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


  getAll(): Observable<Goalclass[]> {
    return this.http.get(this.getallAPI)

      .map(res => res.json())

      .catch(this.handleErrorObservable);
  }


  get(goal: Goalclass): Observable<Goalclass> {
    const url = `${this.operateAPI}/${goal.goal_id}`;
    return this.http.get(url)

      .map(res => res.json())

      .catch(this.handleErrorObservable);

  }
  getById(goal_id: number): Observable<Goalclass> {
    const url = `${this.operateAPI}/${goal_id}`;
    return this.http.get(url)
      .map(res => res.json())
      .catch(this.handleErrorObservable);

  }



  delete(goal: Goalclass): Observable<Goalclass> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});


    const url = `${this.operateAPI}/${goal.goal_id}`;

    return this.http.delete(url, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  update(goal: Goalclass): Observable<Goalclass> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    let httpBody = JSON.stringify(goal)

    const url = `${this.operateAPI}/${goal.goal_id}`;
    return this.http
      .put(url, httpBody, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable)
  }


  addNew(goal_name: string,goal_description: string,  time_frame_id: number, goalStatusTag:string): Observable<Goalclass> {

    let httpBody = JSON.stringify({
      goal_name: goal_name,
      goal_description: goal_description,
      time_frame_id: time_frame_id,
      goal_status:goalStatusTag

    });


    console.log(httpBody);

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});


    return this.http.post(this.creatAPI, httpBody, {headers: this.headers})

      .map(res => res.json())
      .catch(this.handleErrorObservable)

  }


}
