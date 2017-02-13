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
  selector: 'app-okr-setting-goal',
  providers: [SettingGoalService,SettingTimeFrameService],
  templateUrl: './okr-setting-goal.component.html',
  styleUrls: ['./okr-setting-goal.component.css']
})
export class OkrSettingGoalComponent implements OnInit {

public pageTitle="OKRs Setting";
  public subPageTitle="Goals Setting";

  public goals : Goalclass[];
  public timeframes:Timeframeclass[];


  public goalsData:any;
  public errorMessage:any;

  public isLoaded:boolean=true;
  selectedGoal: Goalclass;
  public selectedValue:any;
  public tempData:any;

  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;
  editModeIO:number;

  editGoal:string;
  goalNameInputBoxValue:string;
  goalDescriptionInputBoxValue:string;



   constructor(private _settingGoalService: SettingGoalService,private _settingTimeFrameService:SettingTimeFrameService){

    this.goals=[];

    this.timeframes=[];
    this.editModeIO=0;
    this.editGoal=null;
    this.goalNameInputBoxValue='';
    this.goalDescriptionInputBoxValue='';




    }



  //forms
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;


  editButton(){
    this.isLoaded=!this.isLoaded;
  }
  refreshButton(){
    this.getGoals();
  }
  addGoalButton(){


    this.editModeIO=0;

    this.active = false;
    setTimeout(() => this.active = true, 0);

    this.getAllTimeFrames();
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

          if(this.tempData.affectRows>0){
            swal("Deleted!", "Your goal has been deleted.", "success");
            this.goals = this.goals.filter(currentGoals => currentGoals !== Goal);

          }else{
            swal("Error!", "Your goal did not been deleted successfully.", "error");
          }
        }
      );
  }


  modalSaveChangeButton(GoalNameInput:string,GoalDescription:string){
    if(0==this.editModeIO){
      this.createNewGoal(GoalNameInput);
    }else {
      this.updateGoal( this.editGoal,GoalNameInput);
    }
  }


  editGoalsButton(Goal){
    this.editModeIO=1;
    this.editGoal=Goal;
    this.goalNameInputBoxValue=Goal.Goal_name;
    this.goalDescriptionInputBoxValue=Goal.Goal_description;

    this.getAllTimeFrames();
    this.modal.open();

  }

//TODO: Fix the date format handling issue.
  updateGoal(editGoal,GoalNameInput:string) {



    if (!GoalNameInput  ) {
      //alert("Do not leave any empty!");
     // swal("Warning", "you did not change any time!", "warning");

      return;
    }



    this._settingGoalService.update(editGoal)
      .subscribe(
        data  => {this.tempData = data},
        error =>  this.errorMessage = <any>error,
        ()=>{


          if(this.tempData.affectRows>0){
            swal("Success!", "Your goal has been updated.", "success");

          }else{
            swal("Error!", "Your goal did not been deleted successfully.", "error");
          }

        }
      );
    this.modal.close();





  }




  getGoals() {
    this._settingGoalService.getAll()
      .subscribe(
        data => this.goalsData = data,
        error =>  this.errorMessage = <any>error,
        ()=>{


          this.goals=this.goalsData;
        }
      );

  }


  createNewGoal (GoalNameInput:string) {
    if (!GoalNameInput  ) {
      //alert("Do not leave any empty!");
      swal("Warning", "Do not leave any empty!", "warning");
      return;
    }

    this.modal.close();
  }


 //warning functions
//this function is not a native angular 2 function, it was implemented by third-party javascript library!









  //ng2 liftcycle functions

  onSelect(Goal: Goalclass ): void {
    this.selectedGoal = Goal;
  }

  //component functions
  ngOnInit() {


    this.getGoals();
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
          this.timeframes=this.tempData;
         // this.timeFrameDropDownList=this.tempData;


          //console.log( "this.timeFrameDropDownList + "+JSON.stringify(this.timeFrameDropDownList));
        }
      );

  }






}
