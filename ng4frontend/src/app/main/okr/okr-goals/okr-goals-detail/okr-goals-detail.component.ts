import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';


// Services
import {SettingGoalService} from '../../okr-shared/services/okr-goal.service';
import {ShareGoalDetailsService} from './share-goal-details.service';
// Classes
import { Goalclass } from '../../okr-shared/classes/goal-class';


@Component({
  selector: 'app-okr-goals-detail',
  templateUrl: './okr-goals-detail.component.html',
  providers: [SettingGoalService],
  styleUrls: ['./okr-goals-detail.component.css']
})
export class OkrGoalsDetailComponent implements OnInit {

  public goalId: any;

  public goalSubscription: Subscription;
  public goalInfo: Goalclass;
  public overallGoalInfo: Goalclass;

  private tempData: any;
  public errorMessage: any;
  public displayStyle:any;
  public labelStyle: any;



  public totalObjectivesNumber: any;
  public overallProgressNumber: any;

  private overallProgressNumberSubscription: Subscription;

  private goalInfoSubscription: Subscription;

  constructor(
    private _shareGoalDetailsService: ShareGoalDetailsService,
    private _settingGoalService: SettingGoalService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) {
    this.goalId = 0;
    this.goalInfo = new Goalclass();
    this.overallGoalInfo = new Goalclass();
    this.tempData = '';
    this.errorMessage = '';
    // this.displayStyle = '';

  }

  ngOnInit() {
    this.subsTargetGoalId();
    this.goalInfoSubscribe();
  }

  ngOnDestroy() {
    this.goalSubscription.unsubscribe();

    this.overallProgressNumberSubscription.unsubscribe();

    this.goalInfoSubscription.unsubscribe();
  }

  subsTargetGoalId(){
    this.goalSubscription = this._activatedRoute.params.subscribe(params => {
      this.goalId = ''+params['goalId'] || 0; // (+) converts string 'id' to a number


      if (!this.goalId || this.goalId == 'undefined'){
        console.log( 'empty' );
      }else{
        this.getTargetGoalInfo(this.goalId);

      }

    });

  }
  getTargetGoalInfo(goalId){

    this._settingGoalService.getDetailedById( Number(goalId) ).subscribe(
      data => this.tempData = data,
      error => this.errorMessage = <any>error,
      () => {
        if (this.tempData.status == 'success'){

          if(this.tempData.data){

            // This data retured as an array type;
            this.goalInfo = <Goalclass> this.tempData.data[0];
            //this.objectivesCalculation( this.goalInfo );
            this.updateStyle(this.goalInfo.goal_status.toString());




          }

        }else {
          console.log('error');
        }

      }
    );

  }

  goalInfoSubscribe(){

    this.overallProgressNumberSubscription = this._shareGoalDetailsService._shareOverallProgressNumber$.subscribe(data => this.overallProgressNumber = data);

    if (!this.overallProgressNumber) {
      this.overallProgressNumber = 0;
    }
    this.totalObjectivesNumber = this._shareGoalDetailsService._shareObjectivesNumber$.subscribe(data => this.totalObjectivesNumber = data);
    if(! this.totalObjectivesNumber){
      this.totalObjectivesNumber = 0;
    }

    this.goalInfoSubscription =  this._shareGoalDetailsService._shareGoals$.subscribe(data => this.overallGoalInfo = data);


  }


  updateStyle(currentStatus: string){
    // {'hred': true, 'hgreen': false, 'hyellow': false, 'hblue': false}
    let status = currentStatus.toLowerCase();
    switch (status){
      case 'warning': {
        this.displayStyle = {'hyellow': true};
        this.labelStyle = {'label-warning ':true};
        break;

      }
      case 'risk':{
        this.displayStyle = {'hred': true};
        this.labelStyle = {'label-danger': true};
        break;
      }
      case 'complete':{
        this.displayStyle = {'hgreen': true};
        this.labelStyle = {'label-success': true};
        break;
      }
      default:{
        this.displayStyle = {'hblue': true};
        this.labelStyle = {'label': true};
        break;

      }


    }


  }


}
