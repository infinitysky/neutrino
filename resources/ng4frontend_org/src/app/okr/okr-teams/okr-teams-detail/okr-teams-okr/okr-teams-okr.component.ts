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



import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NouisliderModule } from 'ng2-nouislider';


//import swal from 'sweetalert2'
declare var swal: any;

// services here
import { SettingGoalService } from '../../../okr-shared/services/okr-goal.service';//goal data service
import { SettingTimeFrameService } from '../../../okr-shared/services/okr-time-frame.service';//time frame data service
import { SettingTeamService } from '../../../okr-shared/services/okr-team.service';//team data service
import { SettingObjectiveService } from '../../../okr-shared/services/okr-objective.service';//objective data service
import { SettingKeyResultService } from '../../../okr-shared/services/okr-key-result.service';//key result data service
import {OkrActivitiesService}from '../../../okr-shared/services/okr-activities.service'; // activity data service. submit 'create' and 'update'


//sharing info services
import { ShareTeamsOkrinfoService } from '../../share-teams-okrinfo.service';//in module global services... this service must set as provider in module, but not set in any component
import {UserInfoContainerService} from '../../../../shared/services/user-info-container.service'; //Global information sharing services. It contained users personal information.


//classes here
import { Timeframeclass } from '../../../okr-shared/classes/time-frame-class';

import { Teamclass } from '../../../okr-shared/classes/team-class';
import { Goalclass } from '../../../okr-shared/classes/goal-class';
import { Objectiveclass } from '../../../okr-shared/classes/objective-class';
import {Keyresultclass}from '../../../okr-shared/classes/key-restult-class';
import {Activityclass}from '../../../okr-shared/classes/activitie-class';
import {Userclass}from '../../../../shared/classes/user-class';


@Component({
  selector: 'app-okr-teams-okr',
  templateUrl: './okr-teams-okr.component.html',
  providers:[
    SettingGoalService,SettingTimeFrameService,
    SettingTeamService,SettingObjectiveService,
    SettingKeyResultService,
    OkrActivitiesService,
    ShareTeamsOkrinfoService],
  styleUrls: ['./okr-teams-okr.component.css']
})
export class OkrTeamsOkrComponent implements OnInit {

  public modalTitle: string;


  public goals: Goalclass[];
  public timeFrames: Timeframeclass[];
  public teams: Teamclass[];

  public teamObjectives: Objectiveclass[];

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
  public modalType:string=""; //objective | keyresult


  //current model
  public editModeIO: number;


  //edit mode parameter
  public editObjective: any;
  public editKeyResult: any;
  public editReview: any;


  public objectiveNameInputBoxValue: string;
  public objectiveDescriptionInputBoxValue: string;

  public keyresultNameInputBoxValue: string;
  public keyresultDescriptionInputBoxValue: string;
  public keyresultProgressValue: any;
  public someRange3: number[] = [2, 8];

  //Dropdownlist;
  private timeFrameDropDownListOptions: any;
  private selectedTimeFrame: any;

  private goalsDropDownListOptions: any;
  private selectedGoal: any;



//TODO: DO we have to set the tag on key-result?
  private tagDropDownListOptions: any;
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
  private viewTeamID:any;

//Multi Selection for Goals
  private goalsSelectorSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: true,
    showUncheckAll: true,
    dynamicTitleMaxItems: 2,
    maxHeight: '300px',
  };

  private goalsSelectorTexts: IMultiSelectTexts = {
    checkAll: 'Check all',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Search...',
    defaultTitle: 'Select Goals',
  };






  constructor(private _settingGoalService: SettingGoalService,
              private _settingTimeFrameService: SettingTimeFrameService,
              private _settingTeamService: SettingTeamService,
              private _settingObjectiveService: SettingObjectiveService,
              private _settingKeyResultService: SettingKeyResultService,
              private _shareTeamsOkrinfoService:ShareTeamsOkrinfoService,
              private _userInfoContainerService: UserInfoContainerService,
              private _okrActivitiesService: OkrActivitiesService,
              private _activatedRoute : ActivatedRoute) {


    this.viewTeamID="";
    this.modalTitle="";

    this.goals = [];
    this.timeFrames = [];


    this.teams = [];

    this.teamObjectives = [];
    this.keyresults = [];



    this.editModeIO = 0;
    this.editObjective = new Objectiveclass();

    this.objectiveNameInputBoxValue = '';
    this.objectiveDescriptionInputBoxValue = '';

    this.editKeyResult = new Keyresultclass();
    this.keyresultNameInputBoxValue = '';
    this.keyresultDescriptionInputBoxValue = '';


    //Drop Down List
    this.timeFrameDropDownListOptions = [];
    this.selectedTimeFrame = [];


    this.goalsDropDownListOptions = [];
    this.selectedGoal = []; // multi selector is using different plugin

    this.totalObjectivesNumber = ' - ';
    this.newSubmitActivity = new Activityclass();
    this.selfUserInfoData = new Userclass();


    this.keyresultProgressValue=70;


    this.tagDropDownListOptions = [{ id: "None", text: "None" }, { id: "Warning", text: "Warning" }, { id: "Risk", text: "Risk" }, { id: "Complete", text: "Complete" }];
    this.selectedTag = [{ id: "None", text: "None" }];


  }


  ngOnInit() {


    this.routerSubscription();
    this.getCurrentTeamInfo();
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
    console.log("Router params userID:"+ this._activatedRoute.snapshot.params['teamid']);
    this.routerParamsSubscription = this._activatedRoute.params.subscribe(params => {
      this.viewTeamID = ''+params['teamid']; // (+) converts string 'id' to a number
      console.log("User OKRs this.viewUserID"+this.viewTeamID);
      // In a real app: dispatch action to load the details here.
      this.viewTeamID=Number(this._activatedRoute.snapshot.params['teamid']);
      // this.getTargetTeamOKRs(this.viewTeamID);
      this.getTeamObjective(this.viewTeamID);
    });
  }





  addObjectiveButton() {
    this.getAllGoals();
    this.modalType="objective";
    this.modalTitle="Create A Objective";
    this.editModeIO = 0;
    this.selectedTag = [{ id: "None", text:"None"}];
    this.selectedGoal = [];
    this.objectiveNameInputBoxValue = "";
    this.objectiveDescriptionInputBoxValue = "";

    this.modal.open();

  }

  addKeyResultButton() {
    this.modalType="keyresult";
    this.modalTitle="Create A keyresult";
    this.editModeIO = 0;
    this.keyresultNameInputBoxValue = "";
    this.objectiveDescriptionInputBoxValue = "";
    this.keyresultProgressValue=0;
    this.modal.open();

  }

  closeObjectiveButton() {
    this.modalType="";
    this.modalTitle="";
    this.editModeIO = 0;
    this.objectiveNameInputBoxValue = "";
    this.objectiveDescriptionInputBoxValue = "";
    this.modal.close();
  }
  closeKeyResultButton() {
    this.modalType="";
    this.modalTitle="";
    this.editModeIO = 0;
    this.keyresultNameInputBoxValue = "";
    this.keyresultNameInputBoxValue = "";
    this.keyresultProgressValue=0;
    this.modal.close();
  }

  deleteGoalButton(Goal) {
    this._settingGoalService
      .delete(Goal)
      .subscribe(
        data => { this.tempData = data },
        error => { this.errorMessage = <any>error },
        () => {
          if (this.tempData.data.affectRows > 0) {
            this.displaySuccessMessage("Your Objective has been deleted.");
            this.goals = this.goals.filter(currentGoals => currentGoals !== Goal);
            this.updateOverallNumbers();
          } else {
            this.displayErrorMessage("Your goal did not been deleted successfully.");
          }
        }
      );
  }

  deleteObjectiveButton(Objective) {
    this._settingGoalService
      .delete(Objective)
      .subscribe(
        data => { this.tempData = data },
        error => { this.errorMessage = <any>error },
        () => {
          if (this.tempData.data.affectRows > 0) {
            this.displaySuccessMessage("Your Objective has been deleted.");
            this.teamObjectives = this.teamObjectives.filter(currentObjectives => currentObjectives !== Objective);
            this.updateOverallNumbers();
          } else {
            this.displayErrorMessage("Your Objective did not deleted successfully.");
          }
        }
      );
  }

  deleteKeyResultButton(deletekeyResult) {
    this._settingGoalService
      .delete(deletekeyResult)
      .subscribe(
        data => { this.tempData = data },
        error => { this.errorMessage = <any>error },
        () => {
          if (this.tempData.data.affectRows > 0) {
            this.displaySuccessMessage("Your Key Result has been deleted.");
            this.goals = this.goals.filter(currentKeyResult => currentKeyResult !== deletekeyResult);
            this.updateOverallNumbers();
          } else {
            this.displayErrorMessage("Your Key Result did not deleted successfully.");
          }
        }
      );
  }


  modalSaveObjectiveChangeButton() {
    // read the 2 way binding;
    var objectiveNameInput=this.objectiveNameInputBoxValue;
    var objectiveDescription=this.objectiveDescriptionInputBoxValue;


    console.log("objectiveNameInput : "+ objectiveNameInput);
    console.log("objectiveDescription : "+ objectiveDescription);


    if (0 == this.editModeIO) {
      this.createNewObjective(objectiveNameInput, objectiveDescription);
    } else {
      this.updateObjective(this.editObjective, objectiveNameInput, objectiveDescription);
    }
  }


  modalSaveKeyResultChangeButton() {
    // read the 2 way binding;
    var keyResultNameInput=this.keyresultNameInputBoxValue;
    var keyResultDescription=this.keyresultDescriptionInputBoxValue;
    var currentProgressValue=this.keyresultProgressValue;


    console.log("keyResultNameInput : "+ keyResultNameInput);
    console.log("keyResultDescription : "+ keyResultDescription);


    if (0 == this.editModeIO) {
      this.createNewKeyResult(keyResultNameInput, keyResultDescription);
    } else {
      this.updateKeyResult(this.editKeyResult, keyResultNameInput, keyResultDescription);
    }
  }


  editObjectiveButton(objective:Objectiveclass) {
    this.modalType="objective"
    this.modalTitle="Update A Objective";
    this.editModeIO = 1;
    this.editObjective = objective;
    this.objectiveNameInputBoxValue = objective.objective_name;
    this.objectiveDescriptionInputBoxValue = objective.objective_description;
    this.selectedTag = [{ id: objective.objective_status, text: objective.objective_status }];
  }

  editKeyResultButton(keyresult:Keyresultclass) {
    this.modalType="keyresult"
    this.modalTitle="Update A Key Result";
    this.editModeIO = 1;
    this.editObjective = keyresult;
    this.objectiveNameInputBoxValue = keyresult.result_name;
    this.objectiveDescriptionInputBoxValue = keyresult.result_description;
    this.keyresultProgressValue=keyresult.result_progress_status


    this.modal.open();

  }






  targetSubscription(){
    this.targetInfoSubscription=this._shareTeamsOkrinfoService._targetUserInfo$.subscribe(targetInfo=>this.targetUserInfoData=targetInfo);
  }



  getCurrentTeamInfo(){


  }




  getTargetTeamOKRs(targetTeamId:any){

    this._settingObjectiveService.getByTeamId(targetTeamId).subscribe(
      data=>this.tempData=data,
      error=>this.errorMessage=<any>error,
      ()=>{
        console.log(this.tempData);

      }
    );


  }






  createNewObjective(objectiveNameInput: string, objectiveDescription: string) { // now I start use 2-way binding to process this

    if(!this.viewTeamID){
      this.errorMessage("Internal error! Please refresh your page!");
    }


    if (!objectiveNameInput || !objectiveDescription||!this.selectedGoal) {
      //alert("Do not leave any empty!");

      this.displayWarningMessage("Objective Name, Objective Description or Goal selector empty!");
      return;
    }
    else {
      var goalIds = this.selectedGoal;
      var objectiveStatusTag = this.selectedTag[0].name;
      var newObjective = new Objectiveclass();
      newObjective.objective_name=objectiveNameInput;
      newObjective.objective_description=objectiveDescription;
      newObjective.objective_progress_status="0";
      newObjective.objective_status=objectiveStatusTag;

      this._settingObjectiveService.addNewByObjective(newObjective ).subscribe(
        data => this.tempData = data,
        error => this.errorMessage = <any>error,
        () => {
          if (this.tempData.status == "success" && this.tempData.data) {
            var newObjective = <Objectiveclass>this.tempData.data;
            var tempArray=[];
            tempArray.push(newObjective);
            var i=0;
            for (i=0;i<this.teamObjectives.length;i++){
              tempArray.push(this.teamObjectives[i]);
            }

            this.teamObjectives=tempArray;
            var checkStatus=0;
            checkStatus=checkStatus+this.createGoalObjectiveRelationship(newObjective,goalIds);
            checkStatus=checkStatus+this.createTeamObjectiveRelationship(newObjective, this.viewTeamID);
            if(checkStatus<2){
             this.errorMessage("Your Team Objective did not create successfully");
            }else {
              this.updateOverallNumbers();
              var submitANewActivity = new Activityclass();
              submitANewActivity.user_id = this.selfUserInfoData.user_id;
              submitANewActivity.activity_detail = " Created a new Objective : " + newObjective.objective_name;
              submitANewActivity.activity_type = "Create";
              this.submitActivity(submitANewActivity);
              this.objectiveNameInputBoxValue = "";
              this.objectiveDescriptionInputBoxValue = "";
            }


          } else {

            this.displayErrorMessage(this.tempData.errorMassage);

          }

        }
      );
    }

    this.modal.close();
  }

  updateObjective(editObjective, objectiveNameInput: string, objectiveDescription: string) {
    if (!objectiveNameInput||!objectiveDescription||!this.selectedGoal) {
      this.displayWarningMessage("Objective Name or Objective Description empty!");
      return;
    } else {
      let originalObjective=editObjective;
      editObjective.objective_description = objectiveDescription;
      editObjective.objective_name = objectiveNameInput;
      var goalIds = this.selectedGoal;
      var goalStatusTag =this.selectedTag[0].id;

      // editObjective.object = timeFrameId;
      editObjective.goal_status=goalStatusTag;
      this._settingObjectiveService.update(editObjective)
        .subscribe(
          data => { this.tempData = data },
          error => this.errorMessage = <any>error,
          () => {
            console.log("update Members this.tempData + " + JSON.stringify(this.tempData));
            console.log(this.tempData.data);

            if(this.tempData.status == "success" && this.tempData.data)  {


              this.displaySuccessMessage("Your goal has been updated. <br> affectRows: " + this.tempData.data.affectRows);
              // this.updateTeamMembers(editTeam,this.memberSelectedOptions);
              this.objectiveNameInputBoxValue = "";
              this.objectiveDescriptionInputBoxValue = "";
              this.updateOverallNumbers();

              var submitANewActivity= new Activityclass();

              var modifyLog = " ";
              if (originalObjective.objective_description !=editObjective.objective_description){
                modifyLog=modifyLog+" Change Objective description  to"+ editObjective.objective_description+"; ";
              }
              if (originalObjective.objective_name!=editObjective.objective_name){
                modifyLog=modifyLog+"Change Objective name to"+ editObjective.objective_name+"; ";
              }
              if (originalObjective.objective_status!=editObjective.objective_status){
                modifyLog=modifyLog+"Change Objective tag to"+ editObjective.objective_status+"; ";
              }

              submitANewActivity.user_id=this.selfUserInfoData.user_id;
              submitANewActivity.activity_detail = "Updated goal : "
                + editObjective.goal_name+ " update log : "+modifyLog ;
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




  createTeamObjectiveRelationship(objective: Objectiveclass, teamId:any ):any{
    this._settingObjectiveService.setTeamObjectives(objective,teamId).subscribe(
      data => { this.tempData = data },
      error => this.errorMessage = <any>error,
      ()=>{

        if (this.tempData.status == "success" && this.tempData.data) {
          return 1;

        } else {
        this.displayWarningMessage(this.tempData.errorMassage);
        return 0
        }

      }
    );
  }

  createGoalObjectiveRelationship(objective: Objectiveclass, golasArray:any ):any{
    this._settingObjectiveService.setGoalsObjectives(objective,golasArray).subscribe(
      data => { this.tempData = data },
      error => this.errorMessage = <any>error,
      ()=>{


        if (this.tempData.status == "success" && this.tempData.data) {
          return 1;


        } else {
          return 0;

        }

      }
    );
  }








  createNewKeyResult(objectiveNameInput: string, objectiveDescription: string) { // now I start use 2-way binding to process this



    if (!objectiveNameInput || !objectiveDescription) {
      //alert("Do not leave any empty!");

      this.displayWarningMessage("Objective Name or Objective Description empty!");
      return;
    }
    else {


      console.log(this.selectedTag);
      var goalIds = this.selectedGoal;
      console.log(goalIds);
      var objectiveStatusTag = this.selectedTag[0].name;
      console.log(this.selectedTag[0].id);

      var newObjective = new Objectiveclass();

      newObjective.objective_name=objectiveNameInput;
      newObjective.objective_description=objectiveDescription;
      newObjective.objective_progress_status="0";

      newObjective.objective_status=objectiveStatusTag;


      this._settingObjectiveService.addNewByObjective(newObjective ).subscribe(
        data => this.tempData = data,
        error => this.errorMessage = <any>error,
        () => {
          if (this.tempData.status == "success" && this.tempData.data) {
            var tempInfo = <Objectiveclass>this.tempData.data;
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
            submitANewActivity.activity_detail = " Created a new Objective : " + tempInfo.objective_name;
            submitANewActivity.activity_type="Create";
            this.submitActivity(submitANewActivity);






          } else {

            this.displayErrorMessage(this.tempData.errorMassage);


          }

        }
      );
    }

    this.modal.close();
  }


  //TODO: Fix the date format handling issue.
  updateKeyResult(editObjective, objectiveNameInput: string, objectiveDescription: string) {

    if (!objectiveNameInput||!objectiveDescription) {

      this.displayWarningMessage("Objective Name or Objective Description empty!");

      return;
    } else {

      let originalObjective=editObjective;


      editObjective.objective_description = objectiveDescription;
      editObjective.objective_name = objectiveNameInput;
      var goalIds = this.selectedGoal;
      var goalStatusTag =this.selectedTag[0].id;

      // editObjective.object = timeFrameId;

      editObjective.goal_status=goalStatusTag;

      this._settingObjectiveService.update(editObjective)
        .subscribe(
          data => { this.tempData = data },
          error => this.errorMessage = <any>error,
          () => {
            console.log("update Members this.tempData + " + JSON.stringify(this.tempData));
            console.log(this.tempData.data);

            if(this.tempData.status == "success" && this.tempData.data)  {


              this.displaySuccessMessage("Your goal has been updated. <br> affectRows: " + this.tempData.data.affectRows);
              // this.updateTeamMembers(editTeam,this.memberSelectedOptions);
              this.objectiveNameInputBoxValue = "";
              this.objectiveDescriptionInputBoxValue = "";
              this.updateOverallNumbers();

              var submitANewActivity= new Activityclass();

              var modifyLog = " ";
              if (originalObjective.objective_description !=editObjective.objective_description){
                modifyLog=modifyLog+" Change Objective description  to"+ editObjective.objective_description+"; ";
              }
              if (originalObjective.objective_name!=editObjective.objective_name){
                modifyLog=modifyLog+"Change Objective name to"+ editObjective.objective_name+"; ";
              }
              if (originalObjective.objective_status!=editObjective.objective_status){
                modifyLog=modifyLog+"Change Objective tag to"+ editObjective.objective_status+"; ";
              }

              submitANewActivity.user_id=this.selfUserInfoData.user_id;
              submitANewActivity.activity_detail = "Updated goal : "
                + editObjective.goal_name+ " update log : "+modifyLog ;
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
            this.goals = <Goalclass[]> this.tempData.data;
            this.setGoalsDropDownList(this.goals);
            //this.goals.sort();
          }
        }
      );
  }



  getTeamObjective(viewTeamId:any) {
    this._settingObjectiveService.getByTeamId(viewTeamId)
      .subscribe(
        data => this.tempData = data,
        error => this.errorMessage = <any>error,
        () => {
          if (this.tempData.status == "success" && this.tempData.data) {
            this.teamObjectives = <Objectiveclass[]> this.tempData.data;

            console.log(JSON.stringify(this.teamObjectives));
            //  this.setGoalsDropDownList(this.goals);
            //this.goals.sort();
          }
        }
      );
  }

  setGoalsDropDownList(goals: Goalclass[]){
    var tempArray=[];
    var i=0;
    for (i=0;i<goals.length;i++){
      if(goals[i].goal_status!='Complete'){
        var info={id: goals[i].goal_id.toString(), name:goals[i].goal_name};
        tempArray.push(info);
      }
    }
    this.goalsDropDownListOptions=tempArray;
  }



//Start a subscription
  getTotalObjectivesNumber(){
    this.overallObjectivesNumberSubscription = this._shareTeamsOkrinfoService._shareObjectivesNumber$.subscribe(data => this.totalObjectivesNumber = data);
    if (!this.totalObjectivesNumber) {
      this.totalObjectivesNumber = ' - ';
    }
  }

  getOverallProgressNumber(){
    this.overallProgressNumberSubscription = this._shareTeamsOkrinfoService._shareOverallProgressNumber$.subscribe(data => this.overallProgressNumber = data);
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
    this.goalsDropDownListOptions = tempArray;

  }




//--------- After objective and key result process -------------------------
  calculateOverallProgress():number{
    var totalNumber =0;
    var i=0;

    for(i=0;i<this.teamObjectives.length;i++){
      totalNumber=totalNumber+ Number(this.teamObjectives[i].objective_progress_status);
    }
    var overallProgress=totalNumber/(this.teamObjectives.length);
    return overallProgress;
  }



  updateOverallNumbers() {
    var overAllProgressNumber=this.calculateOverallProgress();
    console.log(overAllProgressNumber);
    this._shareTeamsOkrinfoService.setOverAllProgressSubject(overAllProgressNumber);

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


  displayWarningMessage(warningMessage:string){
    swal("Warning", warningMessage, "warning");
  }
  displayErrorMessage(errorMessage:string){
    swal("Error!", errorMessage , "error");
  }

  displaySuccessMessage(successMessage:string){
    swal("Success!", successMessage, "success");
  }



//slider

  keyResultOnChange(value: any){
    this.modalType="keyresult";
    // console.log('Value changed to', value);
    this.modal.open();
  }


  changeSomeRange(index: number, value: number) {
    // let newRange = [this.someRange[0], this.someRange[1]];
    // newRange[index] = newRange[index] + value;
    // this.someRange = newRange;
  }

  onChange(value: any) {
    console.log('Value changed to', value);
  }







  //modal setting and control

  //Modal actions
  @ViewChild('modal')
  modal: ModalComponent;

  open() {
    this.modal.open();
  }


  settbutton(){


    this.modal.close();

  }


}
