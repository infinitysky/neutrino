import { Component, OnInit } from '@angular/core';


import {UserInfoContainerService} from '../shared/services/user-info-container.service';
import {SettingTimeFrameService} from '../okr/okr-shared/services/okr-time-frame.service';
import {Timeframeclass} from '../okr/okr-shared/classes/time-frame-class';

//import {Subscription} from'rxjs';
import {Subscription} from 'rxjs/Subscription';

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


  private selfTimeFrameSubscription:Subscription;


  constructor(private _userInfoContainerService:UserInfoContainerService,
              private _settingTimeFrameService:SettingTimeFrameService) {

    this.currentTimeFrame = this._userInfoContainerService.getCurrentTimeFrame();
    this.timFrames=[];

  }

  ngOnInit() {
    this.getAllTimeFrames();

    this.getCurrentTimeFrame();


  }

  ngOnDestroy() {
    this.selfTimeFrameSubscription.unsubscribe();

  }


  getAllTimeFrames(){

    this._settingTimeFrameService.getAllTimeFrames().subscribe(
      data=>this.tempData=data,
      error=>this.errorMessage=<any>error,
      ()=>{
        this.timFrames=this.tempData.data;
       // console.log( this.timFrames);
      }
    );
  }


  checkTimeFrameExist(){
    if(!this.currentTimeFrame.time_frame_id){
      console.log("Not Find");
      this._settingTimeFrameService.getNearestTimeFrame().subscribe(
        data=>this.tempData=data,
        error=>this.errorMessage=<any>error,
        ()=>{
          let tempTF=<Timeframeclass> this.tempData.data[0];

          this._userInfoContainerService.setTimeFrameSubject(tempTF);
          console.log("set default time frame frame" + JSON.stringify(this.currentTimeFrame));
        //  console.log("selfTimeFrameSubscription" + JSON.stringify(this.currentTimeFrame));
        }
      );
    }
  }

  getCurrentTimeFrame(){


    this.selfTimeFrameSubscription=this._userInfoContainerService.timeFrame$.subscribe(timeFrame=>this.currentTimeFrame=timeFrame);
    this.checkTimeFrameExist();


    console.log(JSON.stringify("After 5s Current time Frame "+ JSON.stringify(this.currentTimeFrame)));


  }


}
