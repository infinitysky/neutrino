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


import {IMultiSelectOption,IMultiSelectSettings,IMultiSelectTexts} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


import {SelectItem} from 'primeng/primeng';

declare var swal: any;


import {SettingTeamService} from '../../okr-shared/services/okr-team.service';
import {UserDetailsService} from '../../okr-shared/services/user-details.service';
import {Teamclass} from '../../okr-shared/classes/team-class';
import {Userclass} from '../../okr-shared/classes/user-class';


@Component({
  selector: 'app-okr-setting-team',
  templateUrl: './okr-setting-team.component.html',
  providers: [SettingTeamService,UserDetailsService],

  styleUrls: ['./okr-setting-team.component.css']
})
export class OkrSettingTeamComponent implements OnInit {

  public pageTitle="OKRs Setting";
  public subPageTitle="Team Setting";

  public teams : Teamclass[];
  public users : Userclass[];

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


  //private selectedOptions: any[]=[{"id":"26","name":"Catherine Sexton"},{"id":"25","name":"Giselle Boyer"}];

//  private usersDropdownListOptions: IMultiSelectOption[];
  private usersDropdownListOptions: SelectItem[];
  private usersDropdownListOptions1: IMultiSelectOption[];

  // private mySettings: IMultiSelectSettings = {
  //   pullRight: false,
  //   enableSearch: true,
  //   checkedStyle: 'fontawsome',
  //   buttonClasses: 'btn btn-default',
  //   selectionLimit: 0,
  //   closeOnSelect: false,
  //   showCheckAll: false,
  //   showUncheckAll: true,
  //   dynamicTitleMaxItems: 7,
  //   maxHeight: '350px',
  // };
  //
  // private myTexts: IMultiSelectTexts = {
  //   checkAll: 'Check all',
  //   uncheckAll: 'Uncheck all',
  //   checked: 'checked',
  //   checkedPlural: 'checked',
  //   searchPlaceholder: 'Search...',
  //   defaultTitle: 'Select',
  // };

  private selectedOptions: string[]=[]; // Default selection



  private mySettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: false,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: false,
    showUncheckAll: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  };

  private myTexts: IMultiSelectTexts = {
    checkAll: 'Check all',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Search...',
    defaultTitle: 'Select',
  };


  constructor(private _settingTeamService: SettingTeamService,
              private _router:Router,
              private _userDetailsService:UserDetailsService){

    console.log('constructor(): SampleDateRangePickerNormal');
    this.teams=[];
    this.editModeIO=0;
    this.editTeam=null;
    this.users=[];
    this.usersDropdownListOptions=[];
    this.usersDropdownListOptions1=[];
    this.selectedOptions=["100","97"];



    }

  editButton(){
    this.isLoaded=!this.isLoaded;
  }
  refreshButton(){
    this._router.navigate(['/okr/okr-setting/setting-team']);

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
          if(this.tempData.data.affectRows>0){
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


    this._settingTeamService.update(editTeam)
      .subscribe(
        data  => {this.tempData = data},
        error =>  this.errorMessage = <any>error,
        ()=>{
          console.log( "this.tempData + "+JSON.stringify(this.tempData));
          console.log(this.tempData.data);
          if(this.tempData.data.affectRows>0){
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
    this._settingTeamService.getAll()
      .subscribe(
        data => this.TeamsData = data,
        error =>  this.errorMessage = <any>error,
        ()=>{
          // console.log( "this.TeamsData + "+JSON.stringify(this.TeamsData.data));
          this.teams=<Teamclass[]>this.TeamsData.data;
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

  getAllUsersInfo(){
    console.log("get All users");
    this._userDetailsService.getAll().subscribe(
      data=>this.tempData=data,
      error=>this.errorMessage=<any>error,
      ()=>{
        this.users=<Userclass[]>this.tempData.data;
         // console.log(this.users);
         this.setUsersDropdownList(this.users);
      },
    );

  }
  setUsersDropdownList(usersInfoList:Userclass[]){

    var i=0;
   // console.log(usersInfoList[2].user_id);
    for(i=0;i<usersInfoList.length;i++){
      var fullName=usersInfoList[i].first_name+" "+usersInfoList[i].last_name;

      var tempInfo={value:usersInfoList[i].user_id,label:fullName};
      var tempInfo1={id:usersInfoList[i].user_id,name:fullName};
      this.usersDropdownListOptions.push(tempInfo);
      this.usersDropdownListOptions1.push(tempInfo1);

    }


   // console.log(JSON.stringify(this.usersDropdownListOptions));


  }





 //warning functions
//this function is not a native angular 2 function, it was implemented by third-party javascript library!


    final(){
      console.log(this.selectedOptions);

    }






  //ng2 liftcycle functions
  //
  // onSelect(Team: Teamclass ): void {
  //   this.selectedTeam = Team;
  // }

  //component functions
  ngOnInit() {


    this.getTeams()

    this.getAllUsersInfo();



  }
  onChanges($event){

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
