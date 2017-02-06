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


  getAllTimeFrames(): Observable<Timeframeclass[]> {

    return this.http.get(this.getAllTimeFrameAPi)
    // .map(res => <DatabasesClass[]> res.json().data)
      .map(res => res.json() as Timeframeclass[])
      // .do(data => console.log(data)) // eyeball results in the console
      .catch(this.handleErrorObservable);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private handleErrorObservable (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  addNewTimeFrame(time_frame_description: string, time_frame_start: Date,time_frame_end:Date) : Observable<Timeframeclass>  {

    let body = JSON.stringify({ time_frame_description,time_frame_start,time_frame_end });

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log(body);

    return this.http.post(this.createTimeFrameAPi, body, options)
      .map(res => res.json())
      //.map(res =>  <DatabasesClass> res.json().data)
      .do(data => console.log(data))
      .catch(this.handleError)

  }





}
