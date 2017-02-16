import { Injectable } from '@angular/core';

import {Observer} from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import 'rxjs/add/operator/share';

import {Userclass} from '../../okr/okr-shared/classes/user-class';
import {Timeframeclass} from '../../okr/okr-shared/classes/time-frame-class';

@Injectable()
export class UserInfoContainerService {
  public userInfo:Userclass;
  public currentTimeFrame:Timeframeclass;


  constructor() {
    this.userInfo= new Userclass();
    this.currentTimeFrame = new Timeframeclass();

  }

  getUserInfo(){
    return this.userInfo;
  }
  setUserInfo(inputUserInfo:Userclass){
    this.userInfo=inputUserInfo;
  }

  getCurrentTimeFram(){
    return this.currentTimeFrame;
  }
  setCurrentTimeFram(inputTimeFrame:Timeframeclass){
    this.currentTimeFrame=inputTimeFrame;
  }









}
