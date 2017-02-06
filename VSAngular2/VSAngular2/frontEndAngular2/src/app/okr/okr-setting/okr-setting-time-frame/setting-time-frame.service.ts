import { Injectable } from '@angular/core';

import { Http,Response, Headers,RequestOptions } from '@angular/http';


import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';


import {Timeframeclass} from './timeframeclass'

import { MY_CONFIG, ApplicationConfig } from '../../../app-config';

@Injectable()
export class SettingTimeFrameService {

  private getAllTimeFrameAPi = MY_CONFIG.apiEndpoint + MY_CONFIG.getAllTimeFrameUrl;
  private createTimeFrameAPi = MY_CONFIG.apiEndpoint + MY_CONFIG.createTimeFrameUrl;

  private readTimeFrameAPi = MY_CONFIG.apiEndpoint + MY_CONFIG.getUserInfoUrl;
  private deleteTimeFrameAPi = MY_CONFIG.apiEndpoint + MY_CONFIG.getUserInfoUrl;
  private updateTimeFrameAPi = MY_CONFIG.apiEndpoint + MY_CONFIG.getUserInfoUrl;

  private headers = new Headers({ 'Content-Type': 'application/json' });


  constructor(private http: Http) { }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }


  private handleError (error: Response | any) {
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



  getAllTimeFrames(): Observable<Timeframeclass[]> {

    return this.http.get(this.getAllTimeFrameAPi)
    // .map(res => <DatabasesClass[]> res.json().data)
      .map(res => res.json() as Timeframeclass[])
      // .do(data => console.log(data)) // eyeball results in the console
      .catch(this.handleErrorObservable);
  }


  private handleErrorObservable(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }



  addNewTimeFrame(timeframe_description: string, timeframe_start: number,time_frame_end:number) : Observable<Timeframeclass>  {

    let body = JSON.stringify({ time_frame_description:timeframe_description,time_frame_start:timeframe_start,timeframe_end:time_frame_end });

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    //console.log('messagebody: '+body);

    return this.http.post(this.createTimeFrameAPi, body, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable)

  }


  addHero (name: string): Observable<Timeframeclass> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.createTimeFrameAPi, { name }, options)
      .map(this.extractData)
      .catch(this.handleError);
  }




}
