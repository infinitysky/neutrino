import { Component, OnInit } from '@angular/core';
import {Http}from '@angular/http';


import {SettingTeamService} from '../okr-shared/services/okr-team.service';

import {Teamclass} from '../okr-shared/classes/team-class';


import {UserDetailsService} from '../okr-shared/services/user-details.service';

import {Userclass} from '../okr-shared/classes/user-class';


@Component({
  selector: 'app-okr-teams',
  templateUrl: './okr-teams.component.html',
  providers:[SettingTeamService,UserDetailsService],
  styleUrls: ['./okr-teams.component.css']
})
export class OkrTeamsComponent implements OnInit {


  public teams:Teamclass[];
  public users:Userclass[];

  private tempData:any;
  private errorMessage:any;




  ngOnInit(){
    this.getTeams();

  }
  constructor(private _settingTeamService:SettingTeamService){
    this.teams=[];
    this.users=[];
  }


  getTeams() {
    console.log("get All teams");
    this._settingTeamService.getAll()
      .subscribe(
        data => this.tempData = data,
        error =>  this.errorMessage = <any>error,
        ()=>{
          // console.log( "this.TeamsData + "+JSON.stringify(this.TeamsData.data));
          this.teams=<Teamclass[]>this.tempData.data;

        }
      );

  }


}
