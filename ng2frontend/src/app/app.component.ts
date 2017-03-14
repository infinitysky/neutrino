import { Component,Input,Output,EventEmitter } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import {Subscription} from'rxjs';
import {Subscription} from 'rxjs/Subscription';

import {Userclass}from './shared/classes/user-class';
import { UsersLoginInfoService } from './shared/services/users-login-info.service';
import {UserInfoContainerService}from './shared/services/user-info-container.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[UsersLoginInfoService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public selfUserInfo:Userclass;
  public errorMessage:any;
  public tempData:any;

  private selfInfoSubscription:Subscription;


  constructor(private _userInfoContainerService:UserInfoContainerService,
              private _usersLoginInfoService:UsersLoginInfoService) {

    this.selfUserInfo=new Userclass();
  }

  ngOnInit() {
    this.getUserInfo();
    this.selfInfoSubscription=this._userInfoContainerService.userInfo$.subscribe(userInfo=>this.selfUserInfo=userInfo);

  }
  ngOnDestroy() {
    this.selfInfoSubscription.unsubscribe();
  }
  getUserInfo() {
    this._usersLoginInfoService.getUserInfo().subscribe(
      // the first argument is a function which runs on success
      data => { this.tempData = data},
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => {
        this.selfUserInfo=this.tempData;
        console.log("set setUserInfo at app");
        this._userInfoContainerService.setUserInfoSubject(this.selfUserInfo);

      }
    );
  }






}
