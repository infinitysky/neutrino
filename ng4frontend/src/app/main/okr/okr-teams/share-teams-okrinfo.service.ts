import { Injectable } from '@angular/core';
import {Observer} from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs/add/operator/share';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
@Injectable()
export class ShareTeamsOkrinfoService {



  private _shareObjectivesNumber = new BehaviorSubject<any>(0);
  _shareObjectivesNumber$ = this._shareObjectivesNumber.asObservable();
  setObjectivesSubjectNumber(setSubject:any) {
    console.log("Set Objectives Number Subject: "+ JSON.stringify(setSubject));
    this._shareObjectivesNumber.next(setSubject);
  }

  private _shareOverallProgressNumber = new BehaviorSubject<any>('');
  _shareOverallProgressNumber$ = this._shareOverallProgressNumber.asObservable();
  setOverAllProgressSubject(setSubject:any) {
    console.log("Set Overall ProgressNumber Subject: "+ JSON.stringify( setSubject));
    this._shareOverallProgressNumber.next(setSubject);
  }


  private _shareTeams = new BehaviorSubject<any>('');
  _shareTeams$ = this._shareTeams.asObservable();
  setTeamsSubject(setSubject:any) {
    console.log("Set Teams Subject: "+ JSON.stringify( setSubject));
    this._shareTeams.next(setSubject);
  }



  private _shareObjectives = new BehaviorSubject<any>('');
  _shareObjectives$ = this._shareObjectives.asObservable();
  setObjectiveSubject(setSubject:any) {
    console.log('Set Goals Subject: '+ JSON.stringify( setSubject));
    this._shareObjectives.next(setSubject);
  }

  private _shareUsers = new BehaviorSubject<any>('');
  _shareUsers$ = this._shareUsers.asObservable();
  setUsersSubject(setSubject:any) {
    console.log("Set Users Subject: "+ JSON.stringify( setSubject));
    this._shareUsers.next(setSubject);
  }


  private _targetUserInfo = new BehaviorSubject<any>('');
  _targetUserInfo$ = this._targetUserInfo.asObservable();
  setTargetUserInfoSubject(setSubject:any) {
    console.log("Set Users Subject: "+ JSON.stringify( setSubject));
    this._targetUserInfo.next(setSubject);
  }

    private _targetTeamInfo = new BehaviorSubject<any>('');
    _targetTeamInfo$ = this._targetTeamInfo.asObservable();
    setTargetTeamInfo(setSubject:any) {
        console.log('Set target Subject: '+ JSON.stringify( setSubject));
        this._targetTeamInfo.next(setSubject);
    }




  constructor() { }

}
