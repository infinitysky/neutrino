import { Component, OnInit } from '@angular/core';
import { UsersinfoService } from '../services/usersinfo.service';
//import { userClass} from"../interfaces/user.interface";


//TODO: Set these two class and services and class as top level shard service and class
import {Userclass} from '../okr/okr-shared/classes/user-class';
import {UserInfoContainerService}from '../okr/okr-shared/services/user-info-container.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  providers: [UsersinfoService],
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  userInfoData: any;
  userDatas:Userclass;

  selfUserId:string;


  constructor(private _usersinfoService:UsersinfoService,private _userInfoContainerService:UserInfoContainerService) {
    this.selfUserId='';
  }

  ngOnInit() {
    this.userDatas=new Userclass();
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
        this._userInfoContainerService.setUserInfo(this.userDatas);
        this.selfUserId=this.userDatas.user_id.toString();

        //console.log(this.selfUserId);
      }
    );


  }

}
