import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormControl, FormGroup } from '@angular/forms';
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


import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';



declare var swal: any;


import { SettingTeamService } from '../../okr-shared/services/okr-team.service';
import { UserDetailsService } from '../../../shared/services/user-details.service';
import { Teamclass } from '../../okr-shared/classes/team-class';
import { Userclass } from '../../../shared/classes/user-class';


@Component({
  selector: 'app-okr-setting-team',
  templateUrl: './okr-setting-team.component.html',
  providers: [SettingTeamService, UserDetailsService],

  styleUrls: ['./okr-setting-team.component.css']
})
export class OkrSettingTeamComponent implements OnInit {
  form: FormGroup;
  public pageTitle = "OKRs Setting";
  public subPageTitle = "Team Setting";

  public teams: Teamclass[];
  public users: Userclass[];



  public TeamsData: any;
  public errorMessage: any;

  public isLoaded: boolean = true;
  selectedTeam: Teamclass;

  public tempData: any;

  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;



  public editTeam: any;

  editModeIO: number = 0;//this is for check edit Mode on or off.
  teamNameInputBoxValue: string = "";
  teamDescriptionInputBoxValue: string = "";




  private membersDropdownListOptions: IMultiSelectOption[];
  private teamLeadersDropdownOptions: Array<any>;
  private teamDropdownListOptions: Array<any>;


  private memberSelectedOptions: any[]; // Default selection
  private teamLeaderSelectedOptions: any[];
  private parentTeamSelectedOptions: any[];


  private originalMembers: any[];





  private teamMemberSelectorSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: true,
    showUncheckAll: true,
    dynamicTitleMaxItems: 0,
    maxHeight: '350px',
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
    private _router: Router,
    private _userDetailsService: UserDetailsService) {

    console.log('constructor(): team');
    this.teams = [];
    this.editModeIO = 0;
    this.editTeam = null;
    this.users = [];

    this.membersDropdownListOptions = [];
    this.teamLeadersDropdownOptions = [];
    this.parentTeamSelectedOptions = [{ id: "0", text: "None" }];
    this.originalMembers = [];
    this.teamNameInputBoxValue = "";
    this.teamDescriptionInputBoxValue = "";




  }


  closeButton() {



    this.teamNameInputBoxValue = "";
    this.teamDescriptionInputBoxValue = "";

    this.memberSelectedOptions = [];
    this.teamLeaderSelectedOptions = [];
    this.parentTeamSelectedOptions = [{ id: "0", text: "None" }];
    this.originalMembers = [];
    this.modal.close();
  }

  editButton() {
    this.isLoaded = !this.isLoaded;
  }
  refreshButton() {
    this._router.navigate(['/okr/okr-setting/setting-team']);

  }
  addTeamButton() {
     this.setTeamDropdownList(this.teams);
    this.editModeIO = 0;
    this.memberSelectedOptions = [];
    this.originalMembers = [];

    this.teamLeaderSelectedOptions = [];
    this.parentTeamSelectedOptions = [{ id: "0", text: "None" }];

    this.teamNameInputBoxValue = "";
    this.teamDescriptionInputBoxValue = "";



    this.modal.open();
  }


  cleanData() {

    this.originalMembers = [];
    this.teamLeaderSelectedOptions = [];
    this.parentTeamSelectedOptions = [{ id: "0", text: "None" }];


    this.teamNameInputBoxValue = "";
    this.teamDescriptionInputBoxValue = "";

    console.log("Data Cleaned");
  }


  deleteTeamButton(Team) {
    //this.showAlert();
    this._settingTeamService
      .delete(Team)
      .subscribe(
      data => { this.tempData = data },
      error => { this.errorMessage = <any>error },
      () => {
        console.log(this.tempData);
        if (this.tempData.data.affectRows > 0) {
          swal("Deleted!", "Your team has been deleted.", "success");
          this.teams = this.teams.filter(currentTeams => currentTeams !== Team);

        } else {
          swal("Error!", "Your team did not been deleted successfully.", "error");
        }
      }
      );
  }


  modalSaveChangeButton(teamNameInput: string, teamDescription: string) {

    if (0 == this.editModeIO) {
      this.createNewTeam(teamNameInput, teamDescription);
      this.cleanData();
    } else {
      this.updateTeam(this.editTeam, teamNameInput, teamDescription);
      this.cleanData();
      //console.log("before updateTeam"+JSON.stringify(this.editTeam));
    }

  }


  editTeamsButton(team) {
    this.editModeIO = 1;
    this.editTeam = team;
    this.teamNameInputBoxValue = team.team_name;
    this.teamDescriptionInputBoxValue = team.team_description;



    //set team Leader selector


    this.final();
    // this.teamLeaderSelectedOptions=[{id:team.team_leader_user_id,text:leader_Name}];
    console.log("Current Edit Team: " + JSON.stringify(team));
    //set team parent selector





    this.getTeamCurrentLeader(team);
    this.getParentTeam(team);
    this.getTeamMembers(team);

    this.setTeamDropdownList(this.teams);



    this.modal.open();

  }


  //TODO: Fix the date format handling issue.
  updateTeam(editTeam, TeamNameInput: string, teamDescription: string) {
    console.log("update" + editTeam);

    if (!TeamNameInput) {
      //alert("Do not leave any empty!");
      swal("Warning", "you did not change any time!", "warning");


    }

    let leaderId = this.teamLeaderSelectedOptions[0].id;

    let LeaderInfo = this.users.find(x => x.user_id == leaderId);
    editTeam.team_leader_user_id = leaderId;

    editTeam.first_name = LeaderInfo.first_name;
    editTeam.last_name = LeaderInfo.last_name;

    editTeam.team_name = TeamNameInput;
    editTeam.team_description = teamDescription;

    this._settingTeamService.update(editTeam)
      .subscribe(
      data => { this.tempData = data },
      error => { swal("Error!", this.tempData.errorMassage, "error") },
      () => {
        console.log("this.tempData + " + JSON.stringify(this.tempData));
        console.log(this.tempData.data);
        console.log(this.tempData.status);
        if (this.tempData.status = "success" && this.tempData.data) {

          // swal("Success!", "Your team has been updated.", "success");
          this.updateTeamMembers(editTeam, this.memberSelectedOptions);
        }
        else {

          swal("Warning!", this.tempData.errorMassage, "Warning");

        }

      }
      );
    this.modal.close();


  }
  updateTeamMembers(team: Teamclass, selectedMember) {

    console.log("update Members");
    this._settingTeamService.updateTeamMember(team, selectedMember).subscribe(
      data => this.tempData = data,
      error => this.errorMessage = <any>error,
      () => {

        console.log("update Members this.tempData + " + JSON.stringify(this.tempData));
        console.log(this.tempData.data);


        if (this.tempData.status = "success" && this.tempData.data) {
          swal("Success!", "Your team has been updated.", "success");
          // this.updateTeamMembers(editTeam,this.memberSelectedOptions);

          this.teamNameInputBoxValue = "";
          this.teamDescriptionInputBoxValue = "";


        } else {

          //swal("Warning", this.tempData.errorMassage, "warning");
          swal("Error!", this.tempData.errorMassage, "error");

        }



      }

    );

  }




  getTeams() {
    console.log("get All teams");
    this._settingTeamService.getAll()
      .subscribe(
      data => this.TeamsData = data,
      error => this.errorMessage = <any>error,
      () => {
        // console.log( "this.TeamsData + "+JSON.stringify(this.TeamsData.data));
        if (this.TeamsData.data && this.TeamsData.status == "success") {
          this.teams = <Teamclass[]>this.TeamsData.data;
        }


      }
      );

  }





  createNewTeam(TeamNameInput: string, teamDescription: string) {

    if (!TeamNameInput || !this.teamLeaderSelectedOptions[0]) {
      //alert("Do not leave any empty!");
      swal("Warning", "Do not leave Team Name or Team Leader empty!", "warning");
      return;
    } else {

      var leaderid = 0;
      var parentTeamID = 0;
      leaderid = this.teamLeaderSelectedOptions[0].id;

      if (this.parentTeamSelectedOptions[0] == []) {
        parentTeamID = 0;

      } else {
        parentTeamID = this.parentTeamSelectedOptions[0].id;

        this._settingTeamService.addNew(teamDescription, TeamNameInput, parentTeamID, leaderid).subscribe(
          data => this.tempData = data,
          error => this.errorMessage = <any>error,
          () => {

            if (this.tempData.status = "success" && this.tempData.data) {
              var tempTeamInfo = <Teamclass>this.tempData.data;
              var tempTeamLeaderInfo = this.users.find(xuser => xuser.user_id == tempTeamInfo.team_leader_user_id);
              tempTeamInfo.first_name = tempTeamLeaderInfo.first_name;
              tempTeamInfo.last_name = tempTeamLeaderInfo.last_name;

              this.teams.push(<Teamclass>tempTeamInfo);
              this.setTeamMembers(<Teamclass>this.tempData.data);

              this.teamNameInputBoxValue = "";
              this.teamDescriptionInputBoxValue = "";



            } else {

              swal("Warning", this.tempData.errorMassage, "warning");

            }

          }
        );

      }


      this.modal.close();
    }


  }

  getAllUsersInfo() {
    console.log("get All users");
    this._userDetailsService.getAll().subscribe(
      data => this.tempData = data,
      error => this.errorMessage = <any>error,
      () => {
        if (this.tempData.data && this.tempData.status == "success") {

          this.users = <Userclass[]>this.tempData.data;
        }


        // console.log(this.users);
        this.setUserAndMembersDropdownList(this.users);
      },
    );

  }

  setTeamDropdownList(teams: Teamclass[]) {
    var i = 0;
    var tempArray = [];

    var NonInfo = { id: "0", text: "None" };
    tempArray.push(NonInfo);
    for (i = 0; i < teams.length; i++) {

      // var tempInfo={id:teams[i].team_id, name:teams[i].team_name};
      var tempInfo1 = { id: teams[i].team_id, text: teams[i].team_name };
      tempArray.push(tempInfo1);

    }
    // This way is working...
    this.teamDropdownListOptions = tempArray;

  }
  setUserAndMembersDropdownList(usersInfoList: Userclass[]) {

    var i = 0;
    var tempLeaderArray = [];
    for (i = 0; i < usersInfoList.length; i++) {
      var fullName = usersInfoList[i].first_name + " - " + usersInfoList[i].last_name;

      //for multi select dropdown list
      var tempInfo = { id: usersInfoList[i].user_id, name: fullName };

      //for single select list
      var leaderInfo = { id: usersInfoList[i].user_id, text: fullName };

      tempLeaderArray.push(leaderInfo);
      this.membersDropdownListOptions.push(tempInfo);

      //this way is not working.... It has values in the array for sure!

      //this.teamLeadersDropdownOptions.push(tempInfo);
    }
    // This way is working...
    this.teamLeadersDropdownOptions = tempLeaderArray;


  }




  getTeamCurrentLeader(team: Teamclass) {



    if (!team.team_leader_user_id || team.team_leader_user_id == null || team.team_leader_user_id == 0) {
      this.teamLeaderSelectedOptions = [];
    } else {
      var userInfo = this.users.find(x => x.user_id == team.team_leader_user_id);
      var fullName = userInfo.first_name + "" + userInfo.last_name;
      var leaderInfo = { id: team.team_leader_user_id, text: fullName };
      var tempArray = [];
      tempArray.push(leaderInfo);
      this.teamLeaderSelectedOptions = tempArray;


    }

  }


  getParentTeam(team: Teamclass) {

    if (team.parent_team_id == 0 || team.parent_team_id == null) {

      this.parentTeamSelectedOptions = [{ id: 0, text: "None" }];
    } else {
      var parentTeam = this.teams.find(x => x.team_id == team.parent_team_id);
      console.log("parentTeam: " + parentTeam);
      this.parentTeamSelectedOptions = [{ id: parentTeam.team_id, text: parentTeam.team_name }];

    }


  }

  getTeamMembers(team: Teamclass) {

    this._settingTeamService.getTeamMembersByTeamId(team.team_id).subscribe(
      data => this.tempData = data,
      error => this.errorMessage = <any>error,
      () => {

        if (this.tempData.status != "success" || !this.tempData.data) {
          // swal("Warning", this.tempData.errorMassage, "warning");

        } else {
          var membersDetails = this.tempData.data;
          var i = 0;
          var tempselectedMemberArray = [];
          for (i = 0; i < membersDetails.length; i++) {

            var fullName = membersDetails[i].first_name + "" + membersDetails[i].last_name;
            //for multi select dropdown list
            var tempInfo = membersDetails[i].user_id;

            tempselectedMemberArray.push(tempInfo);

          }
          this.memberSelectedOptions = tempselectedMemberArray;


          //for check delete and insert users
          this.originalMembers = tempselectedMemberArray;



        }


      }
    );





  }




  setTeamMembers(team: Teamclass) {
    let members = this.memberSelectedOptions;
    this._settingTeamService.setTeamMembers(team, members).subscribe(
      data => this.tempData = data,
      error => this.errorMessage = <any>error,
      () => {

        if (this.tempData.status != "success" || !this.tempData.data) {
          swal("Warning", this.tempData.errorMassage, "warning");

        } else {
          swal("Success!", "Your team has been created.", "success");
        }

      }
    );
  }





  //warning functions
  //this function is not a native angular 2 function, it was implemented by third-party javascript library!


  final() {
    console.log("Original Members : " + this.originalMembers);
    console.log("Current members : " + this.memberSelectedOptions);
    console.log("Leader : " + JSON.stringify(this.teamLeaderSelectedOptions));

  }









  //ng2 liftcycle functions
  //

  ngOnInit() {

    this.getTeams();
    this.getAllUsersInfo();


  }



  //modal setting and control


  //Modal actions
  @ViewChild('modal')
  modal: ModalComponent;


  closed() {
    this.teamNameInputBoxValue = "";
    this.teamDescriptionInputBoxValue = "";


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





  closeModal() {
    this.modal.close();

  }



  // select
  private value: any = {};


  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }






}
