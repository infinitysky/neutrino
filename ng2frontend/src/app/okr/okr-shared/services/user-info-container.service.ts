import { Injectable } from '@angular/core';

import {Observer} from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import 'rxjs/add/operator/share';

import {Userclass} from '../classes/user-class';

@Injectable()
export class UserInfoContainerService {
  public userInfo:Userclass;
  globalVar:string;
  globalVarUpdate:Observable<string>;
  globalVarObserver:Observer<any>;

  constructor() {
    this.userInfo= new Userclass();

    this.globalVarUpdate = Observable.create((observer:Observer<any>) => {
      this.globalVarObserver = observer;
    });

  }

  getUserInfo(){
    return this.userInfo;
  }
  setUserInfo(inputUserInfo:Userclass){
    this.userInfo=inputUserInfo;
  }




  updateGlobalVar(newValue:string) {
    this.globalVar = newValue;
    this.globalVarObserver.next(this.globalVar);
  }




}
