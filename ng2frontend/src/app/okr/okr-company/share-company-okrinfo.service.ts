import { Injectable } from '@angular/core';
import {Observer} from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs/add/operator/share';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ShareCompanyOkrinfoService {

  private _shareGoals = new BehaviorSubject<any>("");

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


  private _shareTeams = new BehaviorSubject<any>("");

  _shareTeams$ = this._shareTeams.asObservable();

  setTeamsSubject(setSubject:any) {
    console.log("Set Teams Subject: "+ JSON.stringify( setSubject));
    this._shareGoals.next(setSubject);
  }


  private _shareUsers = new BehaviorSubject<any>("");

  _shareUsers$ = this._shareUsers.asObservable();

  setUsersSubject(setSubject:any) {
    console.log("Set Users Subject: "+ JSON.stringify( setSubject));
    this._shareGoals.next(setSubject);
  }




  constructor() { }

}
