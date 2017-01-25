// import { Injectable,Component, OpaqueToken, Inject  } from '@angular/core';
// import { Headers, Http } from '@angular/http';
// import 'rxjs/Rx';

import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
//import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
// Import the config-related things
import { MY_CONFIG, ApplicationConfig } from './myConfig';

@Injectable()
export class GraphDataService {
  private barCharAPi=  MY_CONFIG.apiEndpoint + MY_CONFIG.getBarChart;
  public barChartData : any;
  result:Array<Object>;
  myDatas: any;
  loading: boolean;

  private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) {
      this.http = http;

    }
  // getBarChar() {
  //   console.log(this.barCharAPi);
  //
  //   return this.http.get(this.barCharAPi)
  //     .toPromise()
  //     .then(response => response.json().data)
  //     .catch(this.handleError);
  // }
  // getBarChar() {
  //   this.http.get(this.barCharAPi)
  //     .map(response => response.json())
  //     .subscribe(
  //       data => this.barChartData = data,
  //       err => this.logError(err),
  //       () => console.log('get Data Complete')
  //     );
  // }
  getBarCharData(){
    this.http.get(this.barCharAPi)
      .subscribe(res=>{
        this.myDatas = res.json();
        console.log(this.myDatas);
      },error=>{
        console.log(error);
      });
  }
  getBarChar():any {
    return this.http.get(this.barCharAPi)
      .map((res:Response) => res.json());
  }


  logError(err) {
    console.error('There was an error: ' + err);
  }

  //this.http.get('./friends.json').toPromise() .then((res: Response) => { this.friendsAsPromise.friends = res.json().friends; });

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private myHandleError (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    //return Observable.throw(error.json().error || 'Server error');
  }


}
