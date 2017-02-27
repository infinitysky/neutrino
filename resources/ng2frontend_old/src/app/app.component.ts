import { Component,Input,Output,EventEmitter } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {Timeframeclass}from './okr/okr-shared/classes/time-frame-class';
import {UserInfoContainerService}from './shared/services/user-info-container.service';
import {SettingTimeFrameService} from './okr/okr-shared/services/okr-time-frame.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[SettingTimeFrameService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public timFrames:Timeframeclass[];
  public currentTimeFrame:Timeframeclass;
  public errorMessage:any;
  public tempData:any;

  constructor(private _userInfoContainerService:UserInfoContainerService,
              private _settingTimeFrameService:SettingTimeFrameService) {

    this.currentTimeFrame =new Timeframeclass();

    this.timFrames=[];
    this.getCurrentTimeFrame();

  }



  ngOnInit() {

   // this.getAllTimeFrames();

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
    if(!this.currentTimeFrame.time_frame_id){
      console.log("get Time Frame from Database");

      this._settingTimeFrameService.getNearestTimeFrame().subscribe(
        data=>this.tempData=data,
        error=>this.errorMessage=<any>error,
        ()=>{
          this.currentTimeFrame=this.tempData.data[0];
          console.log("this.tempData[0].data"+this.tempData.data[0]);
          this._userInfoContainerService.setCurrentTimeFrame(this.tempData.data[0]);
          console.log("start"+JSON.stringify(this._userInfoContainerService.getCurrentTimeFrame()));
        }
      );

    }

    console.log("start 2"+JSON.stringify(this._userInfoContainerService.getCurrentTimeFrame()));
  }


}
