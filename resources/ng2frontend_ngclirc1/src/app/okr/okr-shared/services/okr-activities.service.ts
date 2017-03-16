import {Injectable} from '@angular/core';


import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


import {MY_CONFIG} from '../../../app-config';

import {Activityclass} from '../classes/activitie-class';

@Injectable()
export class OkrActivitiesService {

  private getallAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.activityGetAllUrl;
  private basicAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.activityGetAllUrl;
  private creatAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.activityCreateUrl;
  private operateAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.activityOperateUrl;


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



  getAll(): Observable<Activityclass[]> {
    return this.http.get(this.getallAPI)
    // .map(res => <DatabasesClass[]> res.json().data)
      .map(res => res.json())
      // .do(data => console.log(data)) // eyeball results in the console
      .catch(this.handleErrorObservable);
  }

  get(activity: Activityclass): Observable<Activityclass> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.operateAPI}/${activity.activity_id}`;

    return this.http.get(url, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  getByActivityId(activityId: number): Observable<Activityclass> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.operateAPI}/${activityId}`;

    return this.http.get(url, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  getByTeamId(teamId: number): Observable<Activityclass[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    const url = `${this.basicAPI}/get_by_team_id/${teamId}`;

    return this.http.get(url, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  getByUserId(userId: number): Observable<Activityclass[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.basicAPI}/get_by_user_id/${userId}`;

    return this.http.get(url, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }


  delete(activity: Activityclass): Observable<Activityclass> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    const url = `${this.operateAPI}/${activity.activity_id}`;

    return this.http.delete(url, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  update(activity: Activityclass): Observable<Activityclass> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let httpBody = JSON.stringify(activity)

    const url = `${this.operateAPI}/${activity.activity_id}`;
    return this.http
      .put(url,httpBody , options)
      .map(res => res.json())
      .catch(this.handleErrorObservable)
  }



  addNew(activity_detail:any,activity_type:any, submit_user_id:any ) : Observable<Activityclass>  {

    let httpBody = { activity_detail : activity_detail, activity_type:activity_type, user_id : submit_user_id};
    let jsonBody = JSON.stringify(httpBody);

    console.log(jsonBody);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.creatAPI,jsonBody, {headers: this.headers})
      .map(res => res.json())
      .catch(this.handleErrorObservable)
  }

  addNewByClass( newInfo:Activityclass) : Observable<Activityclass>  {
    //activity_detail:any,activity_type:any, submit_user_id:any
    let httpBody = { activity_detail : newInfo.activity_detail, activity_type:newInfo.activity_type, user_id : newInfo.user_id};
    let jsonBody = JSON.stringify(httpBody);

    console.log(jsonBody);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.creatAPI,jsonBody, {headers: this.headers})
      .map(res => res.json())
      .catch(this.handleErrorObservable)
  }



}
