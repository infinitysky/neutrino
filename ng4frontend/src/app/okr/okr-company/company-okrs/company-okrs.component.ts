import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Router } from '@angular/router';

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

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';



import { SelectModule } from 'ng2-select';

//import swal from 'sweetalert2'
declare var swal: any;



import { SettingGoalService } from '../../okr-shared/services/okr-goal.service';
import { Goalclass } from '../../okr-shared/classes/goal-class';
import { SettingTimeFrameService } from '../../okr-shared/services/okr-time-frame.service';
import { SettingTeamService } from '../../okr-shared/services/okr-team.service';
import { Timeframeclass } from '../../okr-shared/classes/time-frame-class';
import { Teamclass } from '../../okr-shared/classes/team-class';


import { ShareCompanyOkrinfoService } from '../share-company-okrinfo.service';
@Component({
  selector: 'app-company-okrs',
  providers: [SettingGoalService, SettingTimeFrameService,SettingTeamService],
  templateUrl: './company-okrs.component.html',
  styleUrls: ['./company-okrs.component.css']
})
export class CompanyOkrsComponent implements OnInit {





  public modaltitle :string;
  public subPageTitle = "Goals Setting";

  public goals: Goalclass[];
  public displayGoals:Goalclass[];
  public timeframes: Timeframeclass[];
  public teams:Teamclass[];



  //modal parameter
  public goalsData: any;
  public errorMessage: any;

  public isLoaded: boolean = true;
  public selectedGoal: Goalclass;
  public selectedValue: any;
  public tempData: any;

  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;
  editModeIO: number;


  //edit mode parameter
  editGoal: any;
  goalNameInputBoxValue: string;
  goalDescriptionInputBoxValue: string;


  //Dropdownlist;
  private timeFrameDropdownListOptions: any;
  private selectedTimeFrame: any;


  private tagDropdownListOptions :any;
  private selectedTag: any;




  //For sharing service
  public toalGoalsNumber: any;

  public overallProgressNumber: any;

  private overallProgressNumberSubscription: Subscription;
  private overallGoalNumberSubscription: Subscription;





  constructor(private _settingGoalService: SettingGoalService,
              private _settingTimeFrameService: SettingTimeFrameService,
              private _shareCompanyOkrinfoService: ShareCompanyOkrinfoService,
              private _settingTeamService:SettingTeamService) {
    this.modaltitle="";
    this.goals = [];

    this.timeframes = [];
    this.editModeIO = 0;
    this.editGoal = new Goalclass();
    this.goalNameInputBoxValue = '';
    this.goalDescriptionInputBoxValue = '';
    this.timeFrameDropdownListOptions = [];
    this.selectedTimeFrame = [];
    this.toalGoalsNumber = ' - ';





    this.tagDropdownListOptions=[{ id: "None", text: "None" },{ id: "Warning", text: "Warning" },{ id: "Risk", text: "Risk" },{ id: "Complete", text: "Complete" }];
    this.selectedTag=[{ id: "None", text: "None" }];


  }



  //component functions
  ngOnInit() {
    this.getGoals();
    this.getAllTimeFrames();
    this.getOverallPragressNumber();
    this.getTotalGoalNumber();



  }

  ngOnDestroy() {
    this.overallGoalNumberSubscription.unsubscribe();
    this.overallProgressNumberSubscription.unsubscribe();

  }









  editButton() {
    this.isLoaded = !this.isLoaded;
  }
  refreshButton() {
    this.getGoals();
  }
  addGoalButton() {

    this.modaltitle="Create A Goal";


    this.editModeIO = 0;

    this.getAllTimeFrames();
    this.selectedTag = [{ id: "None", text:"None"}];

    this.selectedTimeFrame = [];
    this.goalNameInputBoxValue = "";
    this.goalDescriptionInputBoxValue = "";

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


  modalSaveChangeButton(goalNameInput: string, goalDescription: string) {


    if (0 == this.editModeIO) {
      this.createNewGoal(goalNameInput, goalDescription);
    } else {
      this.updateGoal(this.editGoal, goalNameInput, goalDescription);
    }
  }


  editGoalsButton(Goal) {
    this.modaltitle="Update A Goal";

    this.editModeIO = 1;
    this.editGoal = Goal;
    this.goalNameInputBoxValue = Goal.goal_name;
    this.goalDescriptionInputBoxValue = Goal.goal_description;



    var timeFrameName = Goal.time_frame_description
      + "    --- (" + Goal.time_frame_start +
      " To " + Goal.time_frame_end + ")";

    // var tempInfo={id:teams[i].team_id, name:teams[i].team_name};
    //var tempInfo1={id:timeframes[i].time_frame_id, text:timeFrameName};
    this.selectedTimeFrame = [{ id: Goal.time_frame_id, text: timeFrameName }];
    this.selectedTag = [{ id: Goal.goal_status, text: Goal.goal_status }];

    this.getAllTimeFrames();



    this.modal.open();

  }







  getAllTimeFrames() {
    this._settingTimeFrameService.getAllTimeFrames()
      .subscribe(
        data => this.tempData = data,
        error => this.errorMessage = <any>error,
        () => {
          if (this.tempData.status != "success" || !this.tempData.data) {
            this.timeframes = this.tempData.data;

            this.setTimeFrameDropdownList(this.timeframes);
          }
        }
      );

  }






  //TODO: Fix the date format handling issue.
  updateGoal(editGoal, goalNameInput: string, goalDescription: string) {

    if (!goalNameInput) {
      //alert("Do not leave any empty!");
      // swal("Warning", "you did not change any time!", "warning");\
      return;
    } else {
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

            if (this.tempData.status != "success" || !this.tempData.data) {
              //swal("Warning", this.tempData.errorMassage, "warning");
              swal("Error!", this.tempData.errorMassage, "error");
            } else {
              swal("Success!", "Your goal has been updated. <br> affectRows: " + this.tempData.data.affectRows, "success");
              // this.updateTeamMembers(editTeam,this.memberSelectedOptions);
              this.goalNameInputBoxValue = "";
              this.goalDescriptionInputBoxValue = "";
              this.updateOverallNumbers();

            }

          }
        );


    }

    this.modal.close();

  }




  getGoals() {
    this._settingGoalService.getAll()
      .subscribe(
        data => this.tempData = data,
        error => this.errorMessage = <any>error,
        () => {
           if (this.tempData.status == "success" && this.tempData.data) {
            this.goals = this.tempData.data;
            this.goals.sort();
            this.updateOverallNumbers();
          }

        }
      );

  }




  calculateOverallProgress():number{
    var totalNumber =0;
    var i=0;
    for(i=0;i<this.goals.length;i++){
      totalNumber=totalNumber+ Number(this.goals[i].goal_progress_status);
    }
    var OverallProgress=totalNumber/this.goals.length;


    return OverallProgress;

  }





  createNewGoal(goalNameInput: string, goalDescription: string) {



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
            var searchedTimeFrame = this.timeframes.find(x => x.time_frame_id == tempInfo.time_frame_id);

            tempInfo.time_frame_description = searchedTimeFrame.time_frame_description;
            tempInfo.time_frame_start = searchedTimeFrame.time_frame_start;
            tempInfo.time_frame_end = searchedTimeFrame.time_frame_end;
            var tempArray=[];
            tempArray.push(tempInfo);
            var i=0;
            for (i=0;i<this.goals.length;i++){
              tempArray.push(this.goals[i]);
            }
            this.goals=tempArray;
            this.updateOverallNumbers();
            this.goalNameInputBoxValue = "";
            this.goalDescriptionInputBoxValue = "";
            swal("Success!", "Your goal has been created.", "success");

          } else {
            swal("Error", this.tempData.errorMassage, "error");

          }

        }
      );
    }





    this.modal.close();
  }


  getTotalGoalNumber(){


    this.overallGoalNumberSubscription = this._shareCompanyOkrinfoService._shareGoals$.subscribe(data => this.toalGoalsNumber = data);
    if (!this.toalGoalsNumber) {
      this.toalGoalsNumber = ' - ';
    }

  }

  getOverallPragressNumber(){

    this.overallProgressNumberSubscription = this._shareCompanyOkrinfoService._shareOverallProgressNumber$.subscribe(data => this.overallProgressNumber = data);

    if (!this.overallProgressNumber) {
      this.overallProgressNumber = ' - ';
    }
  }






  //ng2 liftcycle functions

  onSelect(Goal: Goalclass): void {
    this.selectedGoal = Goal;
  }







  setTimeFrameDropdownList(timeframes: Timeframeclass[]) {
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
    this.timeFrameDropdownListOptions = tempArray;

  }



  updateOverallNumbers() {

    var overAllProgressNumber=this.calculateOverallProgress();

    console.log(overAllProgressNumber);

    this._shareCompanyOkrinfoService.setOverAllProgressSubject(overAllProgressNumber);


    this._shareCompanyOkrinfoService.setGoalsSubject(this.goals.length);
  }








  //modal setting and control


  //Modal actions
  @ViewChild('modal')
  modal: ModalComponent;


  closed() {
    this.goalDescriptionInputBoxValue = "";
    this.goalNameInputBoxValue = "";


    this.modal.close();
  }

  dismissed() {

  }

  opened() {


  }

  navigate() {

  }

  open() {

    this.modal.open();
  }



  // major functions
  submitInfo() {

  }

  cleanData() {

  }

  closeModal() {

  }





}
