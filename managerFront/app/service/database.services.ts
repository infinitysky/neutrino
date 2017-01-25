
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import { DatabasesClass } from '../interface/database';
import {Observable}     from 'rxjs/Observable';
import {HTTP_PROVIDERS}    from 'angular2/http';
import 'rxjs/Rx';

import { _settings } from '../config'

@Injectable()
export class DatabasesService {

   // public baseUrl: string = 'http://127.0.0.1/NanLi_Dev/reportsystembeautify'+'/magerConfig/index.php/StoreManger/';
    public baseUrl:string = _settings.baseUrl;
    public getUrl:string;
    public postUrl:string;

    constructor (private http: Http) {}

    /*
     private _heroesUrl = 'app/heroes.json'; // URL to JSON file
     */

    private _heroesUrl = 'app/heroes';  // URL to web api

    getStores() {
        this.getUrl=this.baseUrl+'/StoreManger/getstores';


        return this.http.get(this.getUrl)
           // .map(res => <DatabasesClass[]> res.json().data)
            .map(res => res.json())
           // .do(data => console.log(data)) // eyeball results in the console
            .catch(this.handleError);
    }


    getAll(){
        return this.http.get(this.baseUrl + '/StoreManger/getstores')
            .map((res: Response) => res.json())
            //.do(data => console.log(data))
            .catch(this.handleError);
    }


    addNewStore(store_code: string, db_name: string, validate_code: string) : Observable<DatabasesClass>  {
        this.postUrl=this.baseUrl+'/StoreManger/addNewStore';


        let body = JSON.stringify({ store_code,db_name,validate_code });


        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });



        return this.http.post(this.postUrl, body, options)
            .map(res => res.json())
            //.map(res =>  <DatabasesClass> res.json().data)
            .do(data => console.log(data))
            .catch(this.handleError)

    }

    // addHeros(name: string) : Observable<DatabasesClass>  {
    //
    //     let body = JSON.stringify({ name });
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });
    //
    //     return this.http.post(this.baseUrl, body, options)
    //         .map(res =>  <DatabasesClass> res.json().data)
    //         .catch(this.handleError)
    // }

    private handleError (error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    addNewStore(store_code: string, db_name: string, validate_code: string) : Observable<DatabasesClass>  {
        this.postUrl=this.baseUrl+'/StoreManger/addNewStore';


        let body = JSON.stringify({ store_code,db_name,validate_code });


        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });



        return this.http.post(this.postUrl, body, options)
            .map(res => res.json())
            //.map(res =>  <DatabasesClass> res.json().data)
            .do(data => console.log(data))
            .catch(this.handleError)

    }

}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */