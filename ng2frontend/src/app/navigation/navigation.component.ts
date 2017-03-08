import { Component, OnInit } from '@angular/core';



import { UsersinfoService } from '../shared/services/usersinfo.service';
//import { userClass} from"../interfaces/user.interface";
import {Subscription} from 'rxjs/Subscription';

//TODO: Set these two class and services and class as top level shard service and class
import {Userclass} from '../okr/okr-shared/classes/user-class';
import {Timeframeclass}from '../okr/okr-shared/classes/time-frame-class';
import {UserInfoContainerService}from '../shared/services/user-info-container.service';



@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  providers: [UsersinfoService],

  styleUrls: ['navigation.component.css']
})
export class NavigationComponent implements OnInit {

  userInfoData: any;
  userDatas:Userclass;

  public currentTimeFrame:Timeframeclass;
  selfUserId:string;
  subscription:Subscription;

  private subscribeTimeFrameData:any;
  private timeFrameDataSubscription:Subscription;




  constructor(private _usersinfoService:UsersinfoService,
              private _userInfoContainerService:UserInfoContainerService) {

    this.selfUserId='';
    this.currentTimeFrame = new Timeframeclass();
    this.userDatas=new Userclass();
  }

  ngOnInit() {

    this.getUserInfo();
    this.getCurrentTimeFrame();

  }
  ngOnDestroy() {

    this.timeFrameDataSubscription.unsubscribe();
  }

  //TODO: restructure the "get" logic
  getUserInfo() {
    this._usersinfoService.getUserInfo().subscribe(
      // the first argument is a function which runs on success
      data => { this.userInfoData = data},
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => {
        this.userDatas=this.userInfoData;
        console.log("set setUserInfo at navigation");
        this._userInfoContainerService.setUserInfo(this.userDatas);
        this.selfUserId=this.userDatas.user_id.toString();


        //console.log(this.selfUserId);
        this.setObservableUserInfo(<Userclass>this.userDatas);

      }
    );
  }

  setObservableUserInfo(userInfo:Userclass){
    this._userInfoContainerService.setUserInfoSubject(userInfo);
  }

  getCurrentTimeFrame(){
    this.timeFrameDataSubscription=this._userInfoContainerService.timeFrame$.subscribe(timeFrame=>this.subscribeTimeFrameData=<Timeframeclass>timeFrame);
    console.log("self Info"+ JSON.stringify(this.subscribeTimeFrameData));


  }





}
