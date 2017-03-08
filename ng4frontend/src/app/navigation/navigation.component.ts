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

  timeFrame:Timeframeclass;
  selfUserId:string;
  subscription:Subscription;

  public letterAvatar:string;




  constructor(private _usersinfoService:UsersinfoService,
              private _userInfoContainerService:UserInfoContainerService) {

    this.selfUserId='';
    this.timeFrame = new Timeframeclass();
    this.userDatas=new Userclass();
  }

  ngOnInit() {

    this.getUserInfo();

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

        this.letterAvatar=this.userDatas.first_name.charAt(0)+" "+this.userDatas.last_name.charAt(0);
        //console.log(this.selfUserId);
        this.setObservableUserInfo(<Userclass>this.userDatas);

      }
    );
  }

  setObservableUserInfo(userInfo:Userclass){
    this._userInfoContainerService.setUserInfoSubject(userInfo);
  }



}
