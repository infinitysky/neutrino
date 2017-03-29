import { Component, OnInit } from '@angular/core';


//import { userClass} from"../interfaces/user.interface";
import {Subscription} from 'rxjs/Subscription';

//TODO: Set these two class and services and class as top level shard service and class
import {Userclass} from '../../shared/classes/user-class';
import {Timeframeclass} from '../okr/okr-shared/classes/time-frame-class';
import {UserInfoContainerService} from '../../shared/services/user-info-container.service';
import { UsersLoginInfoService } from '../../shared/services/users-login-info.service';


@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  providers: [UsersLoginInfoService],

  styleUrls: ['navigation.component.css']
})
export class NavigationComponent implements OnInit {


  public currentTimeFrame:Timeframeclass;

  private subscribeTimeFrameData:any;
  private timeFrameDataSubscription:Subscription;
  private selfInfo:Userclass;
  private selfInfoSubscription:Subscription;




  constructor(private _usersinfoService:UsersLoginInfoService,
              private _userInfoContainerService:UserInfoContainerService) {


    this.currentTimeFrame = new Timeframeclass();
    this.selfInfo=new Userclass();

  }

  ngOnInit() {

    this.getUserInfo();
    this.getCurrentTimeFrame();

  }
  ngOnDestroy() {
    this.selfInfoSubscription.unsubscribe();
    this.timeFrameDataSubscription.unsubscribe();
  }

  //TODO: restructure the "get" logic
  getUserInfo() {
    this.selfInfoSubscription = this._userInfoContainerService.userInfo$.subscribe(selfInfo => this.selfInfo=selfInfo);
  }

  getCurrentTimeFrame(){
    this.timeFrameDataSubscription = this._userInfoContainerService.timeFrame$.subscribe(timeFrame => this.subscribeTimeFrameData = <Timeframeclass>timeFrame);
    console.log('self Info'+ JSON.stringify(this.subscribeTimeFrameData));
  }







}
