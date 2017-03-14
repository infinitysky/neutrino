import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';



import {Teamclass} from '../../okr-shared/classes/team-class';
import {SettingTeamService} from '../../okr-shared/services/okr-team.service';
import {UserDetailsService} from '../../../shared/services/user-details.service';
@Component({
  selector: 'app-okr-teams-detail',
  templateUrl: './okr-teams-detail.component.html',
  providers:[SettingTeamService,UserDetailsService],
  styleUrls: ['./okr-teams-detail.component.css']
})
export class OkrTeamsDetailComponent implements OnInit {
  private teamInfo:Teamclass;
  private errorMessage:any;
  private tempData:any;
  public randerTeamInforData:Teamclass;
  public viewTeamId:any;

  public subsTeam:any;

  public overallProgressNumber:any;
  public objectivesNumber:any;
  public lastUpdate:any;

  constructor(private _activatedRoute:ActivatedRoute,
            private _settingTeamService:SettingTeamService,
              private _userDetailsService:UserDetailsService
  ) {

    this.teamInfo=new Teamclass();
    this.randerTeamInforData=new Teamclass();
    this.viewTeamId='';
    this.overallProgressNumber=' - ';
    this.objectivesNumber=' - ';
    this.lastUpdate=' - ';

  }


  ngOnInit() {

    // console.log(this._activatedRoute.snapshot.params['teamid']);
    // this.viewTeamId=this._activatedRoute.snapshot.params['teamid'];
    // this.getTargetTeamInfo();
    //
    // console.log("Router params userID: "+ this._activatedRoute.snapshot.params['teamid']);


    this.subsTeam = this._activatedRoute.params.subscribe(params => {
      this.viewTeamId = ''+params['teamid']; // (+) converts string 'id' to a number
      console.log("this.viewUserID"+this.viewTeamId);
      this.getTargetTeamInfo();
    });

  }


  ngOnDestroy() {
    this.subsTeam.unsubscribe();
  }


  getTargetTeamInfo(){
    this._settingTeamService.getByTeamId(this.viewTeamId).subscribe(
      data=>this.tempData = data,
      error =>  this.errorMessage = <any>error,
      ()=>{
        if(this.tempData.data&&<Teamclass[]>this.tempData.data){
          this.randerTeamInforData=<Teamclass>this.tempData.data;
        }
        console.log(this.randerTeamInforData);
      }
    );
  }

}
