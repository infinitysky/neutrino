import { Injectable } from '@angular/core';

import {Observer} from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import 'rxjs/add/operator/share';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


import {Userclass} from '../../okr/okr-shared/classes/user-class';
import {Timeframeclass} from '../../okr/okr-shared/classes/time-frame-class';

@Injectable()
export class UserInfoContainerService {



  public userInfo:Userclass;
  public currentTimeFrame:Timeframeclass;

  public readUserInfoNumber:number;
  public setUserInfoNumber:number;



  // Observable navItem source
  //this is using BehaviorSubjects to solve the global variable
  private _userInfo = new BehaviorSubject<Userclass>(new Userclass());
  // Observable userInfo stream
  userInfo$ = this._userInfo.asObservable();
  // service command
  setUserInfoSubject(userInfo:Userclass) {
    this._userInfo.next(userInfo);
  }

  private _timeFrame = new BehaviorSubject<Timeframeclass>(new Timeframeclass());
  // Observable userInfo stream
  timeFrame$ = this._timeFrame.asObservable();
  // service command
  setTimeFrameSubject(timeFrame:Timeframeclass) {
    this._timeFrame.next(timeFrame);
  }




//old way
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
