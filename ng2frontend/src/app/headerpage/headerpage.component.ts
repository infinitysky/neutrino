import { Component, OnInit } from '@angular/core';

//import {Subscription} from'rxjs';
import {Subscription} from 'rxjs/Subscription';

import {UserInfoContainerService} from '../shared/services/user-info-container.service';
import {SettingTimeFrameService} from '../okr/okr-shared/services/okr-time-frame.service';

import {Timeframeclass} from '../okr/okr-shared/classes/time-frame-class';
import {Userclass} from '../shared/classes/user-class';


@Component({
  selector: 'app-headerpage',
  templateUrl: './headerpage.component.html',
  providers:[SettingTimeFrameService],
  styleUrls: ['./headerpage.component.css']
})
export class HeaderpageComponent implements OnInit {
  public timeFrames:Timeframeclass[];
  public defaultTimeFrame:Timeframeclass;
  public errorMessage:any;
  public tempData:any;
  public selectedTimeFrame:Timeframeclass;

  private selfInfo:Userclass;
  private selfTimeFrameSubscription:Subscription;
  private selfInfoSubscription:Subscription;

  private notManager:boolean;

  constructor(private _userInfoContainerService:UserInfoContainerService,
              private _settingTimeFrameService:SettingTimeFrameService) {


    this.timeFrames=[];
    this.selectedTimeFrame=new Timeframeclass();
    this.selfInfo=new Userclass();
    this.notManager=true;

  }

  ngOnInit() {
    this.getSelfInformation();
    this.getDefaultTimeFrame();
    this.getAllTimeFrames();


  }

  ngOnDestroy() {
    this.selfTimeFrameSubscription.unsubscribe();
    this.selfInfoSubscription.unsubscribe();

  }


  getAllTimeFrames(){
    this._settingTimeFrameService.getAllTimeFrames().subscribe(
      data=>this.tempData=data,
      error=>this.errorMessage=<any>error,
      ()=>{
        if(this.tempData.data&& this.tempData.status=="success"){
          this.timeFrames=<Timeframeclass[]>this.tempData.data;
          // console.log("get All Time Frames"+JSON.stringify(this.timeFrames));
        }


      }
    );
  }

  onSelectedTimeFrame(timeFrame:Timeframeclass){
    this.selectedTimeFrame=timeFrame;
    this.setCurrentTimeFrame(timeFrame);

  }


  checkDefaultTimeFrameExisting(){
    if(!this.defaultTimeFrame.time_frame_id){
      console.log("Not Find");
      this._settingTimeFrameService.getNearestTimeFrame().subscribe(
        data=>this.tempData=data,
        error=>this.errorMessage=<any>error,
        ()=>{
          let tempTF=<Timeframeclass> this.tempData.data[0];

          this._userInfoContainerService.setDefaultTimeFrameSubject(tempTF);
          this.setCurrentTimeFrame(tempTF);
          //  console.log("set default time frame frame" + JSON.stringify(this.defaultTimeFrame));
          //  console.log("selfTimeFrameSubscription" + JSON.stringify(this.currentTimeFrame));
        }
      );
    }
  }
  getSelfInformation(){
    this.selfInfoSubscription=this._userInfoContainerService.userInfo$.subscribe(userinfo=>this.selfInfo=userinfo);

  }

  getDefaultTimeFrame(){
    this.selfTimeFrameSubscription=this._userInfoContainerService.timeFrame$.subscribe(timeFrame=>this.defaultTimeFrame=timeFrame);
    this.checkDefaultTimeFrameExisting();
    //console.log(JSON.stringify("After 5s Current time Frame "+ JSON.stringify(this.defaultTimeFrame)));
  }

  setCurrentTimeFrame(currentTimeFrame:Timeframeclass){
    this._userInfoContainerService.setTimeFrameSubject(currentTimeFrame);
    this.selectedTimeFrame=currentTimeFrame;
  }




}
