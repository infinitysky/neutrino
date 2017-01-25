import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';

//Grab everything with import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DatabaseService {

    baseUrl: string = 'http://127.0.0.1/NanLi_Dev/reportsystembeautify'+'/magerConfig/index.php/StoreManger/';

    constructor(private http: Http) { }

    getStores() {
        return this.http.get(this.baseUrl + 'getstores')
            .map((res: Response) => res.json())
            .catch(this.handleError);

    }

    // getOrders(){
    //     return this.http.get(this.baseUrl + 'orders.json')
    //         .map((res: Response) => res.json())
    //         .catch(this.handleError);
    // }

    handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
