import { Injectable } from '@angular/core';
import {Observer} from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import 'rxjs/add/operator/share';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedInfoService {
 
 
  private _shareInfo = new BehaviorSubject<any>("");

  _shareInfo$ = this._shareInfo.asObservable();

  setInfoSubject(setInfo:any) {
    console.log("Set Info Subject: "+ setInfo);
    this._shareInfo.next(setInfo);
  }

 

}
