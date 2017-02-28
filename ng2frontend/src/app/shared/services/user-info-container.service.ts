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

  public readUserInfoNumber:number;
  public setUserInfoNumber:number;

  constructor() {
    this.userInfo= new Userclass();
    this.currentTimeFrame = new Timeframeclass();
    this.readUserInfoNumber=0;
    this.setUserInfoNumber=0;

  }

  getUserInfo(){
    this.readUserInfoNumber=this.readUserInfoNumber+1;
    console.log("getUserInfo : current User ID : "+this.userInfo.user_id);
    console.log("read user Info data : "+ this.readUserInfoNumber);
    return this.userInfo;
  }

  setUserInfo(inputUserInfo:Userclass){
    this.setUserInfoNumber=this.setUserInfoNumber+1;
    console.log("set user Info data : "+ this.setUserInfoNumber);
    this.userInfo=inputUserInfo;
  }

  getCurrentTimeFrame(){
    return this.currentTimeFrame;
  }
  setCurrentTimeFrame(inputTimeFrame:Timeframeclass){
    this.currentTimeFrame=inputTimeFrame;
  }









}
