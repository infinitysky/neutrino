import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {Subscription} from 'rxjs/Subscription';

import {Activityclass}from '../../okr-shared/classes/activitie-class';
import {OkrActivitiesService}from '../../okr-shared/services/okr-activities.service';
import {UserInfoContainerService} from '../../../../shared/services/user-info-container.service';
@Component({
  selector: 'app-okr-users-activity',
  templateUrl: './okr-users-activity.component.html',
  providers:[OkrActivitiesService],
  styleUrls: ['./okr-users-activity.component.css']
})
export class OkrUsersActivityComponent implements OnInit {

  public content :any;
  public activities: Activityclass[];

  private errorMessage : any;
  private viewUserId:any;
  private tempData:any;
  private subscribeUserActivity:any;



  public sortingActivities:Activityclass[];

  private buttonIO:boolean;

  private viewTeamId:any;

  private subscribeTeamActivity:any;
  private selfUserInforData:any;

  private selfInfoSubscription:Subscription;


  constructor(private _okrActivitiesService:OkrActivitiesService,
              private _userInfoContainerService:UserInfoContainerService,
              private _activatedRoute:ActivatedRoute) {
    this.content='';
    this.viewUserId='';
    this.content='';

    this.activities=[];
    this.buttonIO=false;
    this.selfUserInforData=null;
    this.sortingActivities=[];

  }

  ngOnInit() {



    this.subscribeUserActivity = this._activatedRoute.params.subscribe(params => {
      this.viewUserId = +params['userid']; // (+) converts string 'id' to a number
      this.getUserActivities();
      console.log("Current User ID activity"+this.viewUserId);

    });
    this.getCurrentUserInfo();
  }
  ngOnDestroy() {
    this.selfInfoSubscription.unsubscribe();
    this.subscribeUserActivity.unsubscribe();

  }

  getUserActivities(){
    console.log("Current User activities activity");
    this._okrActivitiesService.getByUserId(this.viewUserId).subscribe(
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
    this.selfInfoSubscription=this._userInfoContainerService.userInfo$.subscribe(userInfo=>this.selfUserInforData=userInfo);
    console.log("self Info"+ JSON.stringify(this.selfUserInforData.user_id));


  }

  submitNoteButton(inputString:any){
    this.buttonIO=true;
    this.content=inputString
    console.log(this.content);
    var i=0;

    let activityType='Note';

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
