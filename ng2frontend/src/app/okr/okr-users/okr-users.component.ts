import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';


import {UsersInfoService} from '../okr-shared/services/users-info.service';
import {UserInfoContainerService} from '../../shared/services/user-info-container.service';
import {Userclass} from '../okr-shared/classes/user-class';




@Component({

  selector: 'app-okr-users',
  templateUrl: './okr-users.component.html',
  providers:[UsersInfoService],
  styleUrls: ['./okr-users.component.css']
})
export class OkrUsersComponent implements OnInit {
  pageTitle = 'User Info'
  public selfUserInforData:Userclass;

  public randerUserInforData:Userclass;

  public selfUserId:number;
  public viewUserID:number;
  public tempData:any;
  public errorMessage:any;

  constructor(private _usersInfoService:UsersInfoService,
              private _userInfoContainerService:UserInfoContainerService,
              private _activatedRoute:ActivatedRoute) {

    this.selfUserInforData = new Userclass();
    this.selfUserId=0;
    this.viewUserID=0;

  }


  ngOnInit() {
    console.log("userID:"+ this._activatedRoute.snapshot.params['userid']);
    console.log("timeFrame:"+ this._activatedRoute.snapshot.params['timeframeid']);

    this.getCurrentUserInfo();
    this.selfUserId=this.selfUserInforData.user_id;
    this.viewUserID=Number(this._activatedRoute.snapshot.params['userid']);
    if(this.selfUserId !=this.viewUserID ){
      console.log('different');

      this.getTargetUserInfo();

    }else{
      this.randerUserInforData=this.selfUserInforData;
    }

  }

  getCurrentUserInfo(){
    this.selfUserInforData=this._userInfoContainerService.getUserInfo();
  }
  getTargetUserInfo(){
    this._usersInfoService.getById(this.viewUserID).subscribe(
      data=>this.tempData = data,
      error =>  this.errorMessage = <any>error,
      ()=>{
        this.randerUserInforData=this.tempData;
      }
    );
  }




}
