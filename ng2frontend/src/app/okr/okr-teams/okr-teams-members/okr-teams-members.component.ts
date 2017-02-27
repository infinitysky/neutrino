import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {SettingTeamService} from '../../okr-shared/services/okr-team.service';
import {Teamclass} from '../../okr-shared/classes/team-class';
import {UserDetailsService} from '../../okr-shared/services/user-details.service';
import {Userclass} from '../../okr-shared/classes/user-class';

@Component({
  selector: 'app-okr-teams-members',
  templateUrl: './okr-teams-members.component.html',
  providers:[SettingTeamService,UserDetailsService],
  styleUrls: ['./okr-teams-members.component.css']
})
export class OkrTeamsMembersComponent implements OnInit {

  public isLoaded = false;

  private teams:Teamclass[];
  private users:Userclass[];
  public  viewTeamId:any;
  public tempData:any
  public errorMessage:any;

  public subscribeTeamInfo:any;

  constructor(private _userDetailsService:UserDetailsService,
              private _settingTeamService:SettingTeamService,
              private _activatedRoute:ActivatedRoute) {
    this.teams=[];
    this.users=[];
    this.viewTeamId=null;
}

  ngOnInit() {

    this.viewTeamId=this._activatedRoute.snapshot.params['teamid'];
    console.log("geted team id:"+ this.viewTeamId);


    this.subscribeTeamInfo=this._activatedRoute.params.subscribe(
      params=>{
        this.viewTeamId = ''+params['teamid']; // (+) converts string 'id' to a number
        console.log("this.viewUserID"+this.viewTeamId);

        this.getTeamMembers();
      });

  }


  ngOnDestroy() {
    this.subscribeTeamInfo.unsubscribe();
  }

  getTeamMembers(){
    this._settingTeamService.getTeamMembersByTeamId(this.viewTeamId).subscribe(
      data=>this.tempData=data,
      error=>this.errorMessage=<any>error,
      ()=>{
        if(this.tempData.data&&<Userclass[]>this.tempData.data){
          this.users=<Userclass[]>this.tempData.data;
        }
    }
    );
  }


}
