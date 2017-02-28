import { Component, OnInit, Output } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import {Activityclass}from '../../okr-shared/classes/activitie-class';
import {OkrActivitiesService}from '../../okr-shared/services/okr-activities.service';
import {UserInfoContainerService} from '../../../shared/services/user-info-container.service';

@Component({
  selector: 'app-okr-teams-activity',
  templateUrl: './okr-teams-activity.component.html',
  providers:[OkrActivitiesService],
  styleUrls: ['./okr-teams-activity.component.css']
})
export class OkrTeamsActivityComponent implements OnInit {
  public content :any;
  public activities: Activityclass[];

  public sortingActivities:Activityclass[];
  public retryTimes : number;
  public waitingTime=300;

  private buttonIO:boolean;
  private errorMessage : any;
  private viewTeamId:any;
  private tempData:any;
  private subscribeTeamActivity:any;
  private selfUserInforData:any;



  constructor(private _okrActivitiesService:OkrActivitiesService,
              private _userInfoContainerService:UserInfoContainerService,
              private _activatedRoute:ActivatedRoute) {
    this.content='';
    this.viewTeamId='';
    this.activities=[];
    this.buttonIO=true;
    this.selfUserInforData='';
    this.sortingActivities=[];
    this.retryTimes=5;

  }

  ngOnInit() {


    this.subscribeTeamActivity = this._activatedRoute.params.subscribe(params => {
      this.viewTeamId = +params['teamid']; // (+) converts string 'id' to a number
      this.getUserActivities();
      console.log("Current team ID activity"+this.viewTeamId);

    });

    this.getCurrentUserInfo();
  }
  ngOnDestroy() {
    this.subscribeTeamActivity.unsubscribe();
  }

  getUserActivities(){
    console.log("Current User activities activity");
    this._okrActivitiesService.getByTeamId(this.viewTeamId).subscribe(
      data=>this.tempData=data,
      error=>this.errorMessage=<any>error,
      ()=>{
        if(this.tempData && this.tempData.data){

          this.activities=this.tempData.data;

        }

      }

    );
  }


  getCurrentUserInfo(){
    var retry=0;
    setTimeout(()=> {
      console.log("time out load" + retry);
      this.selfUserInforData=this._userInfoContainerService.getUserInfo()},1
    );

    while(retry<this.retryTimes){

      setTimeout(()=> {
        console.log("time out load " + retry);
        this.selfUserInforData=this._userInfoContainerService.getUserInfo()},1
      );
      if(this.selfUserInforData){

        retry=this.retryTimes;
        console.log(this.selfUserInforData.user_id);
      }else{
        retry++;
      }

    }


  }



  submitNoteButton(inputString:any){
    this.buttonIO=true;
    this.content=inputString
    console.log(this.content);
    var i=0;

    let activityType='note';

    let myID=this.selfUserInforData.user_id;
    console.log("myID" + myID);
    if(true==this.buttonIO){
      this._okrActivitiesService.addNew(this.content,activityType,myID).subscribe(
        data=>this.tempData=data,
        error=>this.errorMessage=<any>error,
        ()=>{
          if(this.tempData.data && this.tempData&& <Activityclass>this.tempData.data){
            var tempSortingArray=[];

            let newActivity=<Activityclass>this.tempData.data;
            for(i=0;i<this.activities.length;i++){
              if(newActivity.activity_timestamp > this.activities[i].activity_timestamp){
                tempSortingArray.push(newActivity);
              }else{
                tempSortingArray.push(this.activities[i]);
              }
            }
            this.activities=tempSortingArray;
            this.content='';
            this.buttonIO=false;
          }
        }
      );
    }
  }

}
