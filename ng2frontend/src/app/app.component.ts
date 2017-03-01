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

  }

  ngOnInit() {


  }





}
