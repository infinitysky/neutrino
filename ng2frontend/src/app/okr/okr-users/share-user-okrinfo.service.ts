import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs/add/operator/share';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
@Injectable()
export class ShareUserOkrinfoService {



  private _shareObjectivesNumber = new BehaviorSubject<any>(0);
  _shareObjectivesNumber$ = this._shareObjectivesNumber.asObservable();
  setObjectivesSubjectNumber(setSubject:any) {
    console.log("Set Objectives Number Subject: "+ JSON.stringify(setSubject));
    this._shareObjectivesNumber.next(setSubject);
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
    this._shareObjectives.next(setSubject);
  }


  private _shareObjectives = new BehaviorSubject<any>("");
  _shareObjectives$ = this._shareObjectives.asObservable();
  setObjectiveSubject(setSubject:any) {
    console.log("Set Goals Subject: "+ JSON.stringify( setSubject));
    this._shareObjectives.next(setSubject);
  }

  private _shareUsers = new BehaviorSubject<any>("");
  _shareUsers$ = this._shareUsers.asObservable();
  setUsersSubject(setSubject:any) {
    console.log("Set Users Subject: "+ JSON.stringify( setSubject));
    this._shareObjectives.next(setSubject);
  }




  constructor() { }

}
