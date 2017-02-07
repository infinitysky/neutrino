import { Injectable } from '@angular/core';

import { Http,Response, Headers,RequestOptions } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import 'rxjs/Rx';


import {Timeframeclass} from './timeframeclass'

import { MY_CONFIG, ApplicationConfig } from '../../../app-config';

@Injectable()
export class SettingTimeFrameService {

  private getAllTimeFrameAPi = MY_CONFIG.apiEndpoint + MY_CONFIG.getAllTimeFrameUrl;
  private createTimeFrameAPi = MY_CONFIG.apiEndpoint + MY_CONFIG.createTimeFrameUrl;
  private OperationAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.timeFrameOperationUrl;


  private headers = new Headers({ 'Content-Type': 'application/json' });

  public tempdata:any;

  constructor(private http: Http) { }




  /*need to clean
  getAllTimeFrames(): Observable<Timeframeclass[]> {
    return this.http.get(this.getAllTimeFrameAPi)
    // .map(res => <DatabasesClass[]> res.json().data)
      .map(res => res.json() as Timeframeclass[])
      // .do(data => console.log(data)) // eyeball results in the console
      .catch(this.handleErrorObservable);
  }


  getAllTimeFrames_not_working (): Observable<Timeframeclass[]> {
    return this.http.get(this.getAllTimeFrameAPi)
      .map(this.extractData)
      .catch(this.handleError);
  }

*/




  private extractDataObservable(res: Response) {
    let body = res.json()  ;
    return body.data || { };
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



  getAllTimeFrames(): Observable<Timeframeclass[]> {
    return this.http.get(this.getAllTimeFrameAPi)
    // .map(res => <DatabasesClass[]> res.json().data)
      .map(res => res.json())
      // .do(data => console.log(data)) // eyeball results in the console
      .catch(this.handleErrorObservable);
  }



  createTimeFrame (timeframe_description: string, timeframe_start: number,timeframe_end:number): Observable<Timeframeclass> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({ time_frame_description:timeframe_description,time_frame_start:timeframe_start,time_frame_end :timeframe_end });

    return this.http.post(this.createTimeFrameAPi, body, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  deleteTheTimeFrame(timeFrame_id): Observable<Timeframeclass> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    const url = `${this.OperationAPI}/${timeFrame_id}`;

    return this.http.delete(url, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }



  addNewTimeFrame(timeframe_description: string, timeframe_start: number,timeframe_end:number) : Observable<Timeframeclass>  {

    let body = JSON.stringify({ time_frame_description:timeframe_description,time_frame_start:timeframe_start,time_frame_end :timeframe_end });
    let body2 = "{time_frame_description:timeframe_description,time_frame_start:timeframe_start,time_frame_end :timeframe_end}";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log('Post message body: '+body);

    return this.http.post(this.createTimeFrameAPi, {headers: this.headers})
      //.map(this.extractDataObservable)
      .map(res => res.json())
      .catch(this.handleErrorObservable)

  }

//observable esample

  /*
  getHeroes (): Observable<Hero[]> {
    return this.http.get(this.heroesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  addHero (name: string): Observable<Hero> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.heroesUrl, { name }, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
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

  */




  //Promise example
/*
  getHero(id: number): Promise<Timeframeclass> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Timeframeclass)
      .catch(this.handleError);
  }
  create(name: string): Promise<Timeframeclass> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }



  update(hero: Timeframeclass): Promise<Timeframeclass> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }*/





}
