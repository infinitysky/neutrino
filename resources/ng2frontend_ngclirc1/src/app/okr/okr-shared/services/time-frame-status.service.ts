import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';

import 'rxjs/Rx';


import { Timeframeclass } from '../classes/time-frame-class';


@Injectable()
export class TimeFrameStatusService {
  public currentTimeFrame : Timeframeclass;
  public timeFrameId:number;


  constructor() {
    this.currentTimeFrame=null;
    this.timeFrameId=0;
  }

  setCurrentTimeFrame(timeFrame:Timeframeclass) {
    this.currentTimeFrame=timeFrame;
  }
  getCurrentTimeFrame() {
    return this.currentTimeFrame;
  }


}
