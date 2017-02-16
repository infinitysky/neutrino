import { Component, OnInit } from '@angular/core';


import {UserInfoContainerService} from '../shared/services/user-info-container.service';
import {SettingTimeFrameService} from '../okr/okr-shared/services/okr-time-frame.service';
import {Timeframeclass} from '../okr/okr-shared/classes/time-frame-class';
import {isEmpty} from "rxjs/operator/isEmpty";
import formatErrorMsg = jasmine.formatErrorMsg;


@Component({
  selector: 'app-headerpage',
  templateUrl: './headerpage.component.html',
  providers:[SettingTimeFrameService],
  styleUrls: ['./headerpage.component.css']
})
export class HeaderpageComponent implements OnInit {
  public timFrames:Timeframeclass[];
  public currentTimeFrame:Timeframeclass;
  public errorMessage:any;
  public tempData:any;
  constructor(private _userInfoContainerService:UserInfoContainerService,
              private _settingTimeFrameService:SettingTimeFrameService) {

    this.currentTimeFrame = this._userInfoContainerService.getCurrentTimeFram();
    this.timFrames=[];

  }

  ngOnInit() {
    this.getCurrentTimeFrame();
    this.getAllTimeFrames();

  }
  getAllTimeFrames(){
    this._settingTimeFrameService.getAllTimeFrames().subscribe(
      data=>this.tempData=data,
      error=>this.errorMessage=<any>error,
      ()=>{
        this.timFrames=this.tempData;
        console.log( this.timFrames);
      }
    );
  }

  getCurrentTimeFrame(){
    //console.log(JSON.stringify(this.currentTimeFrame));
    if(!this.currentTimeFrame.time_freame_id){
      this._settingTimeFrameService.getNearestTimeFrame().subscribe(
        data=>this.tempData=data,
        error=>this.errorMessage=<any>error,
        ()=>{
          this.currentTimeFrame=this.tempData[0];
          this._userInfoContainerService.setCurrentTimeFram(this.currentTimeFrame);
          // console.log(JSON.stringify(this._userInfoContainerService.getCurrentTimeFram()));
        }
      );

    }
  }




}
