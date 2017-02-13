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

declare var swal: any;


import {SettingTeamService} from '../../okr-shared/services/okr-team.service'

import {Teamclass} from '../../okr-shared/classes/team-class';


@Component({
  selector: 'app-okr-setting-team',
  templateUrl: './okr-setting-team.component.html',
  providers: [SettingTeamService],
  styleUrls: ['./okr-setting-team.component.css']
})
export class OkrSettingTeamComponent implements OnInit {

  public pageTitle="OKRs Setting";
  public subPageTitle="Team Setting";

  public teams : Teamclass[];

  public TeamsData:any;
  public errorMessage:any;

  public isLoaded:boolean=true;
  selectedTeam: Teamclass;

  public tempData:any;

  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;



  public editTeam:any;

  editModeIO:number=0;//this is for check edit Mode on or off.
  teamNameInputBoxValue:string="Please enter the team name";
  teamDescriptionInputBoxValue:string="Please enter the team description";




  constructor(private _settingTeamService: SettingTeamService){

    console.log('constructor(): SampleDateRangePickerNormal');
    this.teams=[];
    this.editModeIO=0;
    this.editTeam=null;



    }

  editButton(){
    this.isLoaded=!this.isLoaded;
  }
  refreshButton(){
    this.getTeams();
  }
  addTeamButton(){

    this.teamNameInputBoxValue="Please enter the team name";
    this.teamDescriptionInputBoxValue="Please enter the team description";

    this.editModeIO=0;
    this.modal.open();
  }

  deleteTeamButton(Team) {
    //this.showAlert();
    this._settingTeamService
      .delete(Team)
      .subscribe(
        data =>{this.tempData=data},
        error => {this.errorMessage = <any>error},
        ()=>{
          console.log(this.tempData);
          if(this.tempData.affectRows>0){
            swal("Deleted!", "Your time frame has been deleted.", "success");
            this.teams = this.teams.filter(currentTeams => currentTeams !== Team);

          }else{
            swal("Error!", "Your time frame did not been deleted successfully.", "error");
          }
        }
      );
  }


  modalSaveChangeButton(TeamNameInput:string,teamDescription:string){
    if(0==this.editModeIO){
      this.createNewTeam(TeamNameInput);
    }else {
      this.updateTeam( this.editTeam,TeamNameInput);
    }
  }


  editTeamsButton(Team){
    this.editModeIO=1;
    this.editTeam=Team;
    this.teamNameInputBoxValue=Team.team_name;
    this.teamDescriptionInputBoxValue=Team.team_description;

    this.modal.open();

  }


//TODO: Fix the date format handling issue.
  updateTeam(editTeam,TeamNameInput:string) {
    console.log(editTeam);

    if (!TeamNameInput  ) {
      //alert("Do not leave any empty!");
     // swal("Warning", "you did not change any time!", "warning");

      return;
    }

    console.log("editTeam: "+ JSON.stringify(editTeam));
    this._settingTeamService.update(editTeam)
      .subscribe(
        data  => {this.tempData = data},
        error =>  this.errorMessage = <any>error,
        ()=>{
          console.log( "this.tempData + "+JSON.stringify(this.tempData));
          console.log(this.tempData);
          if(this.tempData.affectRows>0){
            swal("Success!", "Your time frame has been updated.", "success");

          }else{
            swal("Error!", "Your time frame did not been deleted successfully.", "error");
          }

        }
      );
    this.modal.close();





  }




  getTeams() {
    console.log("get All teams");
    this._settingTeamService.getAllTeams()
      .subscribe(
        data => this.TeamsData = data,
        error =>  this.errorMessage = <any>error,
        ()=>{
          console.log( "this.TeamsData + "+JSON.stringify(this.TeamsData));
          this.teams=this.TeamsData;
        }
      );

  }





  createNewTeam (TeamNameInput:string) {
    if (!TeamNameInput  ) {
      //alert("Do not leave any empty!");
      swal("Warning", "Do not leave any empty!", "warning");
      return;
    }

    this.modal.close();
  }


 //warning functions
//this function is not a native angular 2 function, it was implemented by third-party javascript library!









  //ng2 liftcycle functions

  onSelect(Team: Teamclass ): void {
    this.selectedTeam = Team;
  }

  //component functions
  ngOnInit() {


    this.getTeams();


  }






  //modal setting and control


  //Modal actions
  @ViewChild('modal')
  modal: ModalComponent;


  closed() {
    this.teamNameInputBoxValue= "";
    this.teamDescriptionInputBoxValue= "";


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


}
