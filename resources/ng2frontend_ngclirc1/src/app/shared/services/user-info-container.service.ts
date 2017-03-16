import { Injectable } from '@angular/core';

import {Observer} from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import 'rxjs/add/operator/share';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


import {Userclass} from '../classes/user-class';
import {Timeframeclass} from '../../okr/okr-shared/classes/time-frame-class';



// Note This is a global service for store some global information
@Injectable()
export class UserInfoContainerService {





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


  private _defaultTimeFrame = new BehaviorSubject<Timeframeclass>(new Timeframeclass());
  defaultTimeFrame$ = this._defaultTimeFrame.asObservable();

  setDefaultTimeFrameSubject(timeFrame:Timeframeclass) {
    this._defaultTimeFrame.next(timeFrame);
  }



//old way
  constructor() {

  }










}
