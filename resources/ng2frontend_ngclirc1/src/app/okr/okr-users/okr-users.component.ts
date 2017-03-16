import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';


import { Subscription } from 'rxjs/Subscription';

import {UsersInfoService} from '../../shared/services/users-info.service';
import {UserDetailsService} from '../../shared/services/user-details.service';

import {ShareUserOkrinfoService} from './share-user-okrinfo.service';//provide has been set in okr-users.module

import {UserInfoContainerService} from '../../shared/services/user-info-container.service';
import {Userclass} from '../../shared/classes/user-class';




@Component({

  selector: 'app-okr-users',
  templateUrl: './okr-users.component.html',
  providers:[UsersInfoService,UserDetailsService],
  styleUrls: ['./okr-users.component.css']
})
export class OkrUsersComponent implements OnInit {
  pageTitle = 'User Info'


  public displayUserInfoData:Userclass;

  public selfUserId:number;
  public viewUserID:any;
  public tempData:any;
  public errorMessage:any;
  public routerParamsSubscription:any;

  public overallProgressNumber:any;
  public objectivesNumber:any;
  public lastUpdate:any;



  public currentTimeFrame:any;


  private selfUserInfoData:Userclass;
  private selfInfoSubscription:Subscription;

  private targetUserInfoData:Userclass;
  private targetUserInfoSubscription:Subscription;


  constructor(private _usersInfoService:UsersInfoService,
              private _userInfoContainerService:UserInfoContainerService,
              private _userDetailsService:UserDetailsService,
              private _shareUserOkrinfoService:ShareUserOkrinfoService,
              private _activatedRoute:ActivatedRoute) {

    this.selfUserInfoData = new Userclass();
    this.displayUserInfoData=new Userclass();

    this.selfUserId=0;
    this.viewUserID=0;

    this.overallProgressNumber=' - ';
    this.objectivesNumber=' - ';
    this.lastUpdate=' - ';

  }


  ngOnInit() {

    this.getSelfInfo();
    this.routerSubscription();

  }


  ngOnDestroy() {
    this.selfInfoSubscription.unsubscribe();
    this.routerParamsSubscription.unsubscribe();
  }

  routerSubscription(){
    console.log("Router params userID:"+ this._activatedRoute.snapshot.params['userid']);

    this.routerParamsSubscription = this._activatedRoute.params.subscribe(params => {
      this.viewUserID = ''+params['userid']; // (+) converts string 'id' to a number
      console.log("this.viewUserID"+this.viewUserID);
      // In a real app: dispatch action to load the details here.
      this.viewUserID=Number(this._activatedRoute.snapshot.params['userid']);
      if(this.selfUserInfoData.user_id !=this.viewUserID ){
        console.log('different');
        this.getTargetUserInfo();
      }else{

        this.displayUserInfoData=this.selfUserInfoData;

        this._shareUserOkrinfoService.setTargetUserInfoSubject(this.selfUserInfoData);
      }
    });
  }



  getSelfInfo(){
    this.selfInfoSubscription=this._userInfoContainerService.userInfo$.subscribe(selfInformation=>this.selfUserInfoData=selfInformation);

  }

  getTargetUserInfo(){
    this._userDetailsService.getById(this.viewUserID).subscribe(
      data=>this.tempData = data,
      error =>  this.errorMessage = <any>error,
      ()=>{
        this.displayUserInfoData=<Userclass>this.tempData.data;
        this._shareUserOkrinfoService.setTargetUserInfoSubject(this.displayUserInfoData);
        console.log("Set Target userinfo"+this.displayUserInfoData);
      }
    );
  }


  setTargetUserInfo(){

  }





}
