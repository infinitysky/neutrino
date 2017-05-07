import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs/add/operator/share';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
@Injectable()
export class ShareGoalDetailsService {

  private _shareGoals = new BehaviorSubject<any>('');
  _shareGoals$ = this._shareGoals.asObservable();
  setGoalsSubject(setSubject:any) {
    console.log("Set Goals Subject: "+ JSON.stringify( setSubject));
    this._shareGoals.next(setSubject);
  }


  private _shareOverallProgressNumber = new BehaviorSubject<any>("");
  _shareOverallProgressNumber$ = this._shareOverallProgressNumber.asObservable();
  setOverAllProgressSubject(setSubject:any) {
    console.log("Set Overall ProgressNumber Subject: "+ JSON.stringify( setSubject));
    this._shareOverallProgressNumber.next(setSubject);
  }


  private _shareObjectivesNumber = new BehaviorSubject<any>(0);
  _shareObjectivesNumber$ = this._shareObjectivesNumber.asObservable();
  setObjectivesSubjectNumber(setSubject:any) {

    this._shareObjectivesNumber.next(setSubject);
  }




  constructor() { }





}
