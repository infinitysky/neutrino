import { Component, OnInit,ViewChild, Input } from '@angular/core';

import { Http,Response, Headers,RequestOptions } from '@angular/http';

import { Router } from '@angular/router';

import 'rxjs';

import { Observable }  from 'rxjs/Observable';
import { Subject }  from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';



import {SelectModule} from 'ng2-select';

//import swal from 'sweetalert2'
declare var swal: any;



import { SettingGoalService } from '../../okr-shared/services/okr-goal.service';
import {Goalclass} from '../../okr-shared/classes/goal-class';
import { SettingTimeFrameService } from '../../okr-shared/services/okr-time-frame.service';
import { Timeframeclass } from '../../okr-shared/classes/time-frame-class';



@Component({
  selector: 'app-company-okrs',
  providers: [SettingGoalService,SettingTimeFrameService],
  templateUrl: './company-okrs.component.html',
  styleUrls: ['./company-okrs.component.css']
})
export class CompanyOkrsComponent implements OnInit {

  public pageTitle="OKRs Setting";
  public subPageTitle="Goals Setting";

  public goals : Goalclass[];
  public timeframes:Timeframeclass[];



  //modal parameter
  public goalsData:any;
  public errorMessage:any;

  public isLoaded:boolean=true;
  public selectedGoal: Goalclass;
  public selectedValue:any;
  public tempData:any;

  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;
  editModeIO:number;


  //edit mode parameter
  editGoal:any;
  goalNameInputBoxValue:string;
  goalDescriptionInputBoxValue:string;


  //Dropdownlist;
  private timeFrameDropdownListOptions:any;
  private selectedTimeFrame:any;





  constructor(private _settingGoalService: SettingGoalService,private _settingTimeFrameService:SettingTimeFrameService){

    this.goals=[];

    this.timeframes=[];
    this.editModeIO=0;
    this.editGoal=new Goalclass();
    this.goalNameInputBoxValue='';
    this.goalDescriptionInputBoxValue='';
    this.timeFrameDropdownListOptions=[];
    this.selectedTimeFrame=[];

  }



  editButton(){
    this.isLoaded=!this.isLoaded;
  }
  refreshButton(){
    this.getGoals();
  }
  addGoalButton(){


    this.editModeIO=0;

    this.getAllTimeFrames();

    this.selectedTimeFrame=[];
    this.goalNameInputBoxValue="";
    this.goalDescriptionInputBoxValue="";

    this.modal.open();

  }

  deleteGoalButton(Goal) {
    //this.showAlert();
    this._settingGoalService
      .delete(Goal)
      .subscribe(
        data =>{this.tempData=data},
        error => {this.errorMessage = <any>error},
        ()=>{

          if(this.tempData.data.affectRows>0){
            swal("Deleted!", "Your goal has been deleted.", "success");
            this.goals = this.goals.filter(currentGoals => currentGoals !== Goal);

          }else{
            swal("Error!", "Your goal did not been deleted successfully.", "error");
          }
        }
      );
  }


  modalSaveChangeButton(goalNameInput:string,goalDescription:string){
    if(0==this.editModeIO){
      this.createNewGoal(goalNameInput,goalDescription);
    }else {
      this.updateGoal( this.editGoal,goalNameInput,goalDescription);
    }
  }


  editGoalsButton(Goal){
    this.editModeIO=1;
    this.editGoal=Goal;
    this.goalNameInputBoxValue=Goal.goal_name;
    this.goalDescriptionInputBoxValue=Goal.goal_description;

    var timeFrameName=Goal.time_frame_description
      +"    --- ("+Goal.time_frame_start+
      " To "+Goal.time_frame_end+")";

    // var tempInfo={id:teams[i].team_id, name:teams[i].team_name};
    //var tempInfo1={id:timeframes[i].time_frame_id, text:timeFrameName};
    this.selectedTimeFrame=[{id:Goal.time_frame_id,text:timeFrameName}];

    this.getAllTimeFrames();



    this.modal.open();

  }

//TODO: Fix the date format handling issue.
  updateGoal(editGoal,goalNameInput:string,goalDescription:string) {

    if (!goalNameInput  ) {
      //alert("Do not leave any empty!");
      // swal("Warning", "you did not change any time!", "warning");\
      return;
    }else{
      editGoal.goal_description=goalDescription;
      editGoal.goal_name=goalNameInput;
      var timeFrameId=this.selectedTimeFrame[0].id;
      console.log(this.selectedTimeFrame[0]);
      editGoal.time_frame_id=timeFrameId;



      this._settingGoalService.update(editGoal)
        .subscribe(
          data  => {this.tempData = data},
          error =>  this.errorMessage = <any>error,
          ()=>{
            console.log( "update Members this.tempData + "+JSON.stringify(this.tempData));
            console.log(this.tempData.data);

            if(this.tempData.status!="success"||!this.tempData.data){
              //swal("Warning", this.tempData.errorMassage, "warning");
              swal("Error!", this.tempData.errorMassage, "error");
            }else{
              swal("Success!", "Your goal has been updated. <br> affectRows: "+this.tempData.data.affectRows, "success");
              // this.updateTeamMembers(editTeam,this.memberSelectedOptions);
              this.goalNameInputBoxValue="";
              this.goalDescriptionInputBoxValue="";

            }

          }
        );


    }

    this.modal.close();

  }




  getGoals() {
    this._settingGoalService.getAll()
      .subscribe(
        data => this.goalsData = data,
        error =>  this.errorMessage = <any>error,
        ()=>{


          this.goals=this.goalsData.data;
        }
      );

  }


  createNewGoal (goalNameInput:string,goalDescription:string) {



    console.log(this.selectedTimeFrame[0]);

    if (!goalNameInput || !this.selectedTimeFrame[0]) {
      //alert("Do not leave any empty!");
      swal("Warning", "Do not leave any empty!", "warning");
      return;
    }
    else {

      var timeFrameId=this.selectedTimeFrame[0].id;
      console.log(this.selectedTimeFrame[0]);

      this._settingGoalService.addNew(goalNameInput, goalDescription,timeFrameId).subscribe(
        data=>this.tempData=data,
        error=>this.errorMessage=<any>error,
        ()=>{

          if(this.tempData.status!="success"||!this.tempData.data){
            swal("Error", this.tempData.errorMassage, "error");

          }else{

            var tempInfo=<Goalclass>this.tempData.data;
            var searchedTimeFrame =this.timeframes.find(x =>x.time_frame_id==tempInfo.time_frame_id);


            tempInfo.time_frame_description=searchedTimeFrame.time_frame_description;
            tempInfo.time_frame_start=searchedTimeFrame.time_frame_start;
            tempInfo.time_frame_end=searchedTimeFrame.time_frame_end;
            this.goals.push(tempInfo);


            this.goalNameInputBoxValue="";
            this.goalDescriptionInputBoxValue="";
            swal("Success!", "Your goal has been created.", "success");

          }

        }
      );
    }





    this.modal.close();
  }






  //ng2 liftcycle functions

  onSelect(Goal: Goalclass ): void {
    this.selectedGoal = Goal;
  }

  //component functions
  ngOnInit() {
    this.getGoals();
    this.getAllTimeFrames();

  }







  setTimeFrameDropdownList(timeframes:Timeframeclass[]){
    var i=0;
    var tempArray=[];

    //var NonInfo={id:"0", text:"None"};
    for(i=timeframes.length-1;i>0;i--){
      var timeFrameName=timeframes[i].time_frame_description
        +"   --- ("+timeframes[i].time_frame_start+
        " To "+timeframes[i].time_frame_end+")";

      // var tempInfo={id:teams[i].team_id, name:teams[i].team_name};
      var tempInfo1={id:timeframes[i].time_frame_id, text:timeFrameName};
      tempArray.push(tempInfo1);

    }
    // This way is working...
    this.timeFrameDropdownListOptions=tempArray;

  }












  //modal setting and control


  //Modal actions
  @ViewChild('modal')
  modal: ModalComponent;


  closed() {
    this.goalDescriptionInputBoxValue= "";
    this.goalNameInputBoxValue= "";


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
  submitInfo(){

  }

  cleanData(){

  }

  closeModal(){

  }




  getAllTimeFrames() {
    this._settingTimeFrameService.getAllTimeFrames()
      .subscribe(
        data => this.tempData = data,
        error =>  this.errorMessage = <any>error,
        ()=>{
          this.timeframes=this.tempData.data;

          this.setTimeFrameDropdownList(this.timeframes);

        }
      );

  }






}
