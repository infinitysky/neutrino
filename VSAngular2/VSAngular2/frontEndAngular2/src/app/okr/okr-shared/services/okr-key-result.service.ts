import {Injectable} from '@angular/core';


import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


import {MY_CONFIG, ApplicationConfig} from '../../../app-config';

import {Keyresultclass} from '../classes/key-restult-class'


@Injectable()
export class SettingKeyResultService {

  private getallAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.keyResultGetAllUrl;
  private creatAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.keyResultCreateUrl;
  private operateAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.keyResultOperateUrl;


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


  getAll(): Observable<Keyresultclass[]> {
    return this.http.get(this.getallAPI)

      .map(res => res.json())

      .catch(this.handleErrorObservable);
  }


  get(keyResult: Keyresultclass): Observable<Keyresultclass> {
    const url = `${this.operateAPI}/${keyResult.result_id}`;
    return this.http.get(this.getallAPI)

      .map(res => res.json())

      .catch(this.handleErrorObservable);

  }


  delete(keyResult: Keyresultclass): Observable<Keyresultclass> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});


    const url = `${this.operateAPI}/${keyResult.result_id}`;

    return this.http.delete(url, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  update(keyResult: Keyresultclass): Observable<Keyresultclass> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let httpBody = JSON.stringify(keyResult)

    const url = `${this.operateAPI}/${keyResult.result_id}`;
    return this.http
      .put(url, httpBody, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable)
  }


  addNew(team_description: string, team_name: string, parent_team_id: number, team_leader_id: number,): Observable<Keyresultclass> {

    let httpBody = JSON.stringify({
      team_description: team_description,
      team_name: team_name,
      parent_team_id: parent_team_id,
      team_leader_id: team_leader_id
    });

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});


    return this.http.post(this.creatAPI, httpBody, {headers: this.headers})

      .map(res => res.json())
      .catch(this.handleErrorObservable)

  }


}
