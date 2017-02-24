import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';



import {Teamclass} from '../../okr-shared/classes/team-class';
import {SettingTeamService} from '../../okr-shared/services/okr-team.service';
@Component({
  selector: 'app-okr-teams-detail',
  templateUrl: './okr-teams-detail.component.html',
  providers:[SettingTeamService],
  styleUrls: ['./okr-teams-detail.component.css']
})
export class OkrTeamsDetailComponent implements OnInit {
  private teamInfo:Teamclass;
  private errorMessage:any;
  private tempData:any;
  public randerTeamInforData:Teamclass;
  public viewTeamId:any;

  constructor(private _activatedRoute:ActivatedRoute,
            private _settingTeamService:SettingTeamService
  ) {

    this.teamInfo=new Teamclass();
    this.randerTeamInforData=new Teamclass();
  }

  ngOnInit() {
    console.log(this._activatedRoute.snapshot.params['teamid']);
    this.viewTeamId=this._activatedRoute.snapshot.params['teamid'];
    this.getTargetTeamInfo();


  }


  getTargetTeamInfo(){
    this._settingTeamService.getById(this.viewTeamId).subscribe(
      data=>this.tempData = data,
      error =>  this.errorMessage = <any>error,
      ()=>{
        this.randerTeamInforData=<Teamclass>this.tempData.data;
        console.log(this.randerTeamInforData);
      }
    );
  }

}
