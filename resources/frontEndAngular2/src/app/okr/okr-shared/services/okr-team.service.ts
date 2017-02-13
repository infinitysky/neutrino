import { Injectable } from '@angular/core';

import { Http,Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


import { MY_CONFIG, ApplicationConfig } from '../../../app-config';

import {Teamclass} from '../classes/team-class'


@Injectable()
export class SettingTeamService {

  private getallAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.teamGetAllUrl;
  private creatAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.teamCreateUrl;
  private operateAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.teamOperateUrl;


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



  getAllTeams(): Observable<Teamclass[]> {
    return this.http.get(this.getallAPI)
    // .map(res => <DatabasesClass[]> res.json().data)
      .map(res => res.json())
      // .do(data => console.log(data)) // eyeball results in the console
      .catch(this.handleErrorObservable);
  }

   getTheTeam(team: Teamclass): Observable<Teamclass> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.operateAPI}/${team.team_id}`;

    return this.http.get(url, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }



  delete(team: Teamclass): Observable<Teamclass> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    const url = `${this.operateAPI}/${team.team_id}`;

    return this.http.delete(url, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  update(team: Teamclass): Observable<Teamclass> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let httpBody = JSON.stringify(team)

    const url = `${this.operateAPI}/${team.team_id}`;
    return this.http
      .put(url,httpBody , options)
      .map(res => res.json())
      .catch(this.handleErrorObservable)
  }



  addNew(team_description: string, team_name: string,parent_team_id:number,team_leader_id:number,) : Observable<Teamclass>  {

    let httpBody = JSON.stringify({ team_description : team_description,team_name:team_name,parent_team_id :parent_team_id,team_leader_id: team_leader_id});
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
