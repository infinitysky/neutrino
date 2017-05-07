import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import {Teamclass} from '../../../okr-shared/classes/team-class';
import {Goalclass} from '../../../okr-shared/classes/goal-class';

import {SettingGoalService} from '../../../okr-shared/services/okr-goal.service';
import {UserDetailsService} from '../../../../../shared/services/user-details.service';
import {ShareGoalDetailsService} from '../share-goal-details.service';

@Component({
  selector: 'app-goal-okrs',
  templateUrl: './goal-okrs.component.html',
  providers:[SettingGoalService, UserDetailsService],
  styleUrls: ['./goal-okrs.component.css']
})
export class GoalOkrsComponent implements OnInit {

  public goalInfo: Goalclass;



  private goalId: string;
  private goalIdSubscription: Subscription;
  private tempData: any;
  public errorMessage: any;



  constructor(
    private _shareGoalDetailsService:ShareGoalDetailsService,
    private _activatedRoute: ActivatedRoute,
    private _settingGoalService:SettingGoalService,
    private _userDetailsService: UserDetailsService
  ) {

    this.goalInfo =  new Goalclass();

  }

  ngOnInit() {
    this.subsTargetGoalId();
  }

  ngOnDestroy() {
    this.goalIdSubscription.unsubscribe();

  }


  subsTargetGoalId(){
    this.goalIdSubscription = this._activatedRoute.params.subscribe(params => {
      this.goalId = '' + params['goalId']; // (+) converts string 'id' to a number
      this.getGoalsInfo( this.goalId);
    });

  }


  getGoalsInfo(goalId: any){

    this._settingGoalService.getDetailedById(goalId).subscribe(
      data => this.tempData = data,
      error => this.errorMessage = <any>error,
      ()=>{
        if(this.tempData){
          if(this.tempData.status.toLowerCase() == 'success'&& this.tempData.data){
           this.goalInfo = <Goalclass> this.tempData.data[0]; //  the backend API will return the data as array
            this.updateOverallNumbers();

          }
        }

    }
    );

  }





  updateOverallNumbers() {

    var overAllProgressNumber=this.calculateOverallProgress();

    console.log(overAllProgressNumber);

    this._shareGoalDetailsService.setOverAllProgressSubject(overAllProgressNumber);


    this._shareGoalDetailsService.setGoalsSubject(this.goalInfo);
  }




  calculateOverallProgress():number{
    var totalNumber =0;
    var OverallProgress = 0;
    var i=0;
    if(this.goalInfo.objective_array.length!=0){
      for (i = 0; i < this.goalInfo.objective_array.length; i++) {
        totalNumber = totalNumber + Number(this.goalInfo.objective_array[i].objective_progress_status);
      }
      OverallProgress = totalNumber / this.goalInfo.objective_array.length;
    }else {

      OverallProgress = 0;
    }

    return OverallProgress;

  }









}
