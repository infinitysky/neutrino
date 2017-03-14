import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';



import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';



//import swal from 'sweetalert2'
declare var swal: any;


// services here
import { SettingGoalService } from '../../okr-shared/services/okr-goal.service';//goal data service
import { SettingTimeFrameService } from '../../okr-shared/services/okr-time-frame.service';//time frame data service
import { SettingTeamService } from '../../okr-shared/services/okr-team.service';//team data service
import { SettingObjectiveService } from '../../okr-shared/services/okr-objective.service';//objective data service
import { SettingKeyResultService } from '../../okr-shared/services/okr-key-result.service';//key result data service
import {OkrActivitiesService}from '../../okr-shared/services/okr-activities.service'; // activity data service. submit 'create' and 'update'


//sharing info services
import { ShareUserOkrinfoService } from '../share-user-okrinfo.service';//in module global services... this service must set as provider in module, but not set in any component
import {UserInfoContainerService} from '../../../shared/services/user-info-container.service'; //Global information sharing services. It contained users personal information.


//classes here
import { Timeframeclass } from '../../okr-shared/classes/time-frame-class';
import { Teamclass } from '../../okr-shared/classes/team-class';
import { Goalclass } from '../../okr-shared/classes/goal-class';
import { Objectiveclass } from '../../okr-shared/classes/objective-class';
import {Keyresultclass}from '../../okr-shared/classes/key-restult-class';
import {Activityclass}from '../../okr-shared/classes/activitie-class';
import {Userclass}from '../../../shared/classes/user-class';




@Component({
  selector: 'app-okrs-users-okrs',
  templateUrl: './okrs-users-okrs.component.html',
  providers:[SettingGoalService,SettingTimeFrameService,SettingTeamService,SettingObjectiveService,SettingKeyResultService,OkrActivitiesService],
  styleUrls: ['./okrs-users-okrs.component.css']
})
export class OkrsUsersOkrsComponent implements OnInit {


//TODO:redesign this component : This component included about 3 different "sub-component" inside. There are Objective, Key result and Review !


  public objectiveModalTitle: string;
  public keyresultModalTitle: string;
  public reviewModalTitle: string;

  public goals: Goalclass[];
  public timeFrames: Timeframeclass[];
  public teams: Teamclass[];
  public objectives: Objectiveclass[];
  public keyresults: Keyresultclass[];


  public newSubmitActivity: Activityclass;



  //modal parameter

  public errorMessage: any;

  public isLoaded: boolean = true;


  public tempData: any;


  //modal action control
  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = "static";


  //current model
  editModeIO: number;


  //edit mode parameter
  public editObjective: any;
  public editKeyResult: any;
  public editReview: any;


  objectiveNameInputBoxValue: string;
  objectiveDescriptionInputBoxValue: string;

  keyresultNameInputBoxValue: string;
  keyresultDescriptionInputBoxValue: string;


  //Dropdownlist;
  private timeFrameDropDownListOptions: any;
  private selectedTimeFrame: any;

  private goalDropDownListOptions: any;
  private selectedGoal: any;



//TODO: DO we have to set the tag on key-result?
  private tagDropdownListOptions: any;
  private selectedTag: any;




  //For sharing service
  public totalObjectivesNumber: any;

  public overallProgressNumber: any;

  private overallProgressNumberSubscription: Subscription;
  private overallObjectivesNumberSubscription: Subscription;

  private selfUserInfoData: Userclass;
  private selfInfoSubscription: Subscription;
  private targetUserInfoData: Userclass;
  private targetInfoSubscription: Subscription;

  private routerParamsSubscription:any;
  private viewUserID:any;





  constructor(private _settingGoalService: SettingGoalService,
              private _settingTimeFrameService: SettingTimeFrameService,
              private _settingTeamService: SettingTeamService,
              private _settingObjectiveService: SettingObjectiveService,
              private _settingKeyResultService: SettingKeyResultService,
              private _shareUserOkrinfoService:ShareUserOkrinfoService,
              private _userInfoContainerService: UserInfoContainerService,
              private _okrActivitiesService: OkrActivitiesService,
              private _activatedRoute : ActivatedRoute) {


    this.viewUserID="";

    this.objectiveModalTitle="";
    this.keyresultModalTitle="";

    this.goals = [];
    this.timeFrames = [];


    this.teams = [];
    this.objectives = [];
    this.keyresults = [];



    this.editModeIO = 0;
    this.editObjective = new Objectiveclass();

    this.objectiveNameInputBoxValue = '';
    this.objectiveDescriptionInputBoxValue = '';

    this.editKeyResult = new Keyresultclass();
    this.keyresultNameInputBoxValue = '';
    this.keyresultDescriptionInputBoxValue = '';



    this.timeFrameDropDownListOptions = [];
    this.selectedTimeFrame = [];

    this.totalObjectivesNumber = ' - ';
    this.newSubmitActivity = new Activityclass();
    this.selfUserInfoData = new Userclass();





    this.tagDropdownListOptions = [{ id: "None", text: "None" }, { id: "Warning", text: "Warning" }, { id: "Risk", text: "Risk" }, { id: "Complete", text: "Complete" }];
    this.selectedTag = [{ id: "None", text: "None" }];


  }


  ngOnInit() {
    this.getCurrentUserInfo();
    this.routerSubscription();
    this.getOverallProgressNumber();
    this.getTotalObjectivesNumber();
    this.targetSubscription()

  }
  ngOnDestroy() {
    this.overallObjectivesNumberSubscription.unsubscribe();
    this.overallProgressNumberSubscription.unsubscribe();
    this.routerParamsSubscription.unsubscribe();
    this.targetInfoSubscription.unsubscribe();
  }


  routerSubscription(){
    console.log("Router params userID:"+ this._activatedRoute.snapshot.params['userid']);
    this.routerParamsSubscription = this._activatedRoute.params.subscribe(params => {
      this.viewUserID = ''+params['userid']; // (+) converts string 'id' to a number
      console.log("User OKRs this.viewUserID"+this.viewUserID);
      // In a real app: dispatch action to load the details here.
      this.viewUserID=Number(this._activatedRoute.snapshot.params['userid']);
      this.getTargetUserOKRs(this.viewUserID);

    });
  }





  addObjectiveButton() {

    this.objectiveModalTitle="Create A Goal";


    this.editModeIO = 0;

    this.getAllTimeFrames();
    this.getAllGoals();
    this.selectedTag = [{ id: "None", text:"None"}];

    //this.goals = [];
    this.objectiveNameInputBoxValue = "";
    this.objectiveDescriptionInputBoxValue = "";

    this.modal.open();

  }

  deleteGoalButton(Goal) {
    //this.showAlert();
    this._settingGoalService
      .delete(Goal)
      .subscribe(
        data => { this.tempData = data },
        error => { this.errorMessage = <any>error },
        () => {

          if (this.tempData.data.affectRows > 0) {
            swal("Deleted!", "Your goal has been deleted.", "success");
            this.goals = this.goals.filter(currentGoals => currentGoals !== Goal);

            this.updateOverallNumbers();

          } else {
            swal("Error!", "Your goal did not been deleted successfully.", "error");
          }
        }
      );
  }


  modalSaveChangeButton(objectiveNameInput: string, objectiveDescription: string) {


    if (0 == this.editModeIO) {
      this.createNewObjective(objectiveNameInput, objectiveDescription);
    } else {
      this.updateObjective(this.editObjective, objectiveNameInput, objectiveDescription);
    }
  }


  editObjectiveButton(objective:Objectiveclass) {
    this.objectiveModalTitle="Update A Goal";

    this.editModeIO = 1;
    this.editObjective = objective;
    this.objectiveNameInputBoxValue = objective.objective_name;
    this.objectiveDescriptionInputBoxValue = objective.objective_description;


    //
    // var timeFrameName = Goal.time_frame_description
    //   + "    --- (" + Goal.time_frame_start +
    //   " To " + Goal.time_frame_end + ")";
    //
    // this.selectedTimeFrame = [{ id: Goal.time_frame_id, text: timeFrameName }];
    //

    this.selectedTag = [{ id: objective.objective_status, text: objective.objective_status }];

    this.getAllTimeFrames();

    this.objectiveModalOpen();

  }



  targetSubscription(){
    this.targetInfoSubscription=this._shareUserOkrinfoService._targetUserInfo$.subscribe(targetInfo=>this.targetUserInfoData=targetInfo);
  }


  getCurrentUserInfo(){
    this.selfInfoSubscription=this._userInfoContainerService.userInfo$.subscribe(userInfo=>this.selfUserInfoData=userInfo);
    console.log("self Info"+ JSON.stringify(this.selfUserInfoData.user_id));

  }



  getTargetUserOKRs(targetUserId:any){

    this._settingObjectiveService.getByUserId(targetUserId).subscribe(
      data=>this.tempData=data,
      error=>this.errorMessage=<any>error,
      ()=>{

      }
    );


  }


  getAllTimeFrames() {
    this._settingTimeFrameService.getAllTimeFrames()
      .subscribe(
        data => this.tempData = data,
        error => this.errorMessage = <any>error,
        () => {


          if (this.tempData.status == "success" && this.tempData.data) {
            this.timeFrames =<Timeframeclass[]> this.tempData.data;
            this.setTimeFrameDropDownList(this.timeFrames);
          }
        }
      );

  }






  //TODO: Fix the date format handling issue.
  updateObjective(editGoal, goalNameInput: string, goalDescription: string) {

    if (!goalNameInput) {
      //alert("Do not leave any empty!");
      // swal("Warning", "you did not change any time!", "warning");\
      return;
    } else {

      let originalGoal=editGoal;


      editGoal.goal_description = goalDescription;
      editGoal.goal_name = goalNameInput;
      var timeFrameId = this.selectedTimeFrame[0].id;
      var goalStatusTag =this.selectedTag[0].id;

      editGoal.time_frame_id = timeFrameId;

      editGoal.goal_status=goalStatusTag;

      this._settingGoalService.update(editGoal)
        .subscribe(
          data => { this.tempData = data },
          error => this.errorMessage = <any>error,
          () => {
            console.log("update Members this.tempData + " + JSON.stringify(this.tempData));
            console.log(this.tempData.data);

            if(this.tempData.status == "success" && this.tempData.data)  {
              swal("Success!", "Your goal has been updated. <br> affectRows: " + this.tempData.data.affectRows, "success");
              // this.updateTeamMembers(editTeam,this.memberSelectedOptions);
              this.objectiveNameInputBoxValue = "";
              this.objectiveDescriptionInputBoxValue = "";
              this.updateOverallNumbers();

              var submitANewActivity= new Activityclass();

              var modifyLog = "";
              if (originalGoal.goal_description!=editGoal.goal_description){
                modifyLog=modifyLog+" Change Goal description  to"+ editGoal.goal_description+"; ";
              }
              if (originalGoal.goal_name!=editGoal.goal_name){
                modifyLog=modifyLog+"Change goal name to"+ editGoal.goal_name+"; ";
              }
              if (originalGoal.goal_status!=editGoal.goal_status){
                modifyLog=modifyLog+"Change goal tag to"+ editGoal.goal_status+"; ";
              }

              submitANewActivity.user_id=this.selfUserInfoData.user_id;
              submitANewActivity.activity_detail = "Updated goal : "
                + editGoal.goal_name+ " update log : "+modifyLog ;
              submitANewActivity.activity_type="Update";
              this.submitActivity(submitANewActivity);




            }else {
              //swal("Warning", this.tempData.errorMassage, "warning");
              swal("Error!", this.tempData.errorMassage, "error");
            }

          }
        );


    }

    this.modal.close();

  }



  getAllGoals() {
    this._settingGoalService.getAll()
      .subscribe(
        data => this.tempData = data,
        error => this.errorMessage = <any>error,
        () => {
          if (this.tempData.status == "success" && this.tempData.data) {
            this.goals = this.tempData.data;
            //this.goals.sort();
          }
        }
      );

  }









  //createNewObjective(goalNameInput: string, goalDescription: string) {
  createNewObjective(goalNameInput: string, goalDescription: string) { // now I start use 2-way binding to process this



    if (!goalNameInput || !this.selectedTimeFrame[0]) {
      //alert("Do not leave any empty!");
      swal("Warning", "Do not leave any empty!", "warning");
      return;
    }
    else {


      console.log(this.selectedTag);
      var timeFrameId = this.selectedTimeFrame[0].id;
      console.log(this.selectedTimeFrame[0]);
      var goalStatusTag = this.selectedTag[0].id;
      console.log(this.selectedTag[0].id);

      this._settingGoalService.addNew(goalNameInput, goalDescription, timeFrameId, goalStatusTag ).subscribe(
        data => this.tempData = data,
        error => this.errorMessage = <any>error,
        () => {
          if (this.tempData.status == "success" && this.tempData.data) {
            var tempInfo = <Goalclass>this.tempData.data;
            //TODO :  change the time frame provide by backend for save time and system resources.
            // var searchedTimeFrame = this.timeFrames.find(x => x.time_frame_id == tempInfo.time_frame_id);
            // tempInfo.time_frame_description = searchedTimeFrame.time_frame_description;
            // tempInfo.time_frame_start = searchedTimeFrame.time_frame_start;
            // tempInfo.time_frame_end = searchedTimeFrame.time_frame_end;
            var tempArray=[];
            tempArray.push(tempInfo);
            var i=0;
            for (i=0;i<this.goals.length;i++){
              tempArray.push(this.goals[i]);
            }
            this.goals=tempArray;
            this.updateOverallNumbers();
            this.objectiveNameInputBoxValue = "";
            this.objectiveDescriptionInputBoxValue = "";
            var submitANewActivity= new Activityclass();
            submitANewActivity.user_id=this.selfUserInfoData.user_id;
            submitANewActivity.activity_detail = " Created a new goal : " + tempInfo.goal_name;
            submitANewActivity.activity_type="Create";
            this.submitActivity(submitANewActivity);

          } else {
            swal("Error", this.tempData.errorMassage, "error");

          }

        }
      );
    }





    this.modal.close();
  }



//Start a subscription
  getTotalObjectivesNumber(){
    this.overallObjectivesNumberSubscription = this._shareUserOkrinfoService._shareObjectivesNumber$.subscribe(data => this.totalObjectivesNumber = data);
    if (!this.totalObjectivesNumber) {
      this.totalObjectivesNumber = ' - ';
    }
  }

  getOverallProgressNumber(){
    this.overallProgressNumberSubscription = this._shareUserOkrinfoService._shareOverallProgressNumber$.subscribe(data => this.overallProgressNumber = data);
    if (!this.overallProgressNumber) {
      this.overallProgressNumber = ' - ';
    }
  }







  setTimeFrameDropDownList(timeframes: Timeframeclass[]) {
    var i = 0;
    var tempArray = [];

    //var NonInfo={id:"0", text:"None"};
    for (i = timeframes.length - 1; i > 0; i--) {
      var timeFrameName = timeframes[i].time_frame_description
        + "   --- (" + timeframes[i].time_frame_start +
        " To " + timeframes[i].time_frame_end + ")";

      // var tempInfo={id:teams[i].team_id, name:teams[i].team_name};
      var tempInfo1 = { id: timeframes[i].time_frame_id, text: timeFrameName };
      tempArray.push(tempInfo1);

    }
    // This way is working...
    this.timeFrameDropDownListOptions = tempArray;

  }

  setGoalDropDownList(goals: Goalclass[]) {
    var i = 0;
    var tempArray = [];

    //var NonInfo={id:"0", text:"None"};
    for (i = goals.length - 1; i > 0; i--) {
      var goalName = goals[i].goal_name;
      var goalId = goals[i].goal_id;

      var tempInfo1 = { id: goalId[i].time_frame_id, text: goalName };
      tempArray.push(tempInfo1);

    }
    // This way is working...
    this.goalDropDownListOptions = tempArray;

  }




//--------- After objective and key result process -------------------------
  calculateOverallProgress():number{
    var totalNumber =0;
    var i=0;
    for(i=0;i<this.objectives.length;i++){
      totalNumber=totalNumber+ Number(this.objectives[i].objective_progress_status);
    }
    var overallProgress=totalNumber/this.objectives.length;
    return overallProgress;
  }

  updateOverallNumbers() {
    var overAllProgressNumber=this.calculateOverallProgress();
    console.log(overAllProgressNumber);
    this._shareUserOkrinfoService.setOverAllProgressSubject(overAllProgressNumber);

  }

  submitActivity(activity:any){
    this._okrActivitiesService.addNewByClass(activity).subscribe(
      data=>this.tempData=data,
      error=>this.errorMessage=<any>error,
      ()=>{
        if(this.tempData.data && this.tempData&& <Activityclass>this.tempData.data){
          //swal("Success!", "Your goal has been created.", "success");
          console.log("activity success");
        }
      }
    );
  }















  //modal setting and control

  //Modal actions
  @ViewChild('modal')
  @ViewChild('objectiveModal')
  @ViewChild('keyResultModal')
  @ViewChild('reviewModal')
  modal: ModalComponent;
  objectiveModal: ModalComponent;
  keyResultModal: ModalComponent;
  reviewModal: ModalComponent;

  objectiveModalOpen(){
    this.objectiveModal.open();
  }
  objectiveModalClose(){
    this.objectiveModal.close();
  }

  keyResultModalOpen(){
    this.keyResultModal.open();
  }

  keyResultModalClose(){
  this.keyResultModal.close();

  }
  reviewModalOpen(){
    this.reviewModal.open();

  }
  reviewModalClose(){
    this.reviewModal.close();
  }








}
