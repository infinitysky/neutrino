import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';



import {SettingTeamService} from '../../okr-shared/services/okr-team.service';
import {Teamclass} from '../../okr-shared/classes/team-class';

@Component({
  selector: 'app-okr-users-teams',
  templateUrl: './okr-users-teams.component.html',
  providers:[SettingTeamService],
  styleUrls: ['./okr-users-teams.component.css']
})
export class OkrUsersTeamsComponent implements OnInit {
  private errorMessage : any;
  private teams:Teamclass[];
  private currentUserId:any;
  private tempData:any;


  id: number;
  private sub: any;


  constructor(private _settingTeamService:SettingTeamService,
  private _activatedRoute:ActivatedRoute) {
    this.tempData=null;
    this.teams=[];
    this.errorMessage='';





  }

  ngOnInit() {
    console.log("Router params userID:"+ this._activatedRoute.snapshot.params['userid']);
    this.currentUserId= this._activatedRoute.snapshot.params['userid'];
    this.getUsersAllTeams();

    this.sub = this._activatedRoute.params.subscribe(params => {
      this.id = +params['userid']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  getUsersAllTeams(){
    this._settingTeamService.getAllTeamsByUserId(this.currentUserId).subscribe(
      data=>this.tempData=data,
      error=>this.errorMessage=<any>error,
      ()=>{
        if(this.tempData.data){
          this.teams=<Teamclass[]>this.tempData.data;
          console.log(this.teams);
        }


      }
    );
  }

}
