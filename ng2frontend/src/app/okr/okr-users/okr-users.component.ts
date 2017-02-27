import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';




import {UsersInfoService} from '../okr-shared/services/users-info.service';
import {UserDetailsService} from '../okr-shared/services/user-details.service';
import {UserInfoContainerService} from '../../shared/services/user-info-container.service';
import {Userclass} from '../okr-shared/classes/user-class';




@Component({

  selector: 'app-okr-users',
  templateUrl: './okr-users.component.html',
  providers:[UsersInfoService,UserDetailsService],
  styleUrls: ['./okr-users.component.css']
})
export class OkrUsersComponent implements OnInit {
  pageTitle = 'User Info'
  public selfUserInforData:Userclass;

  public randerUserInforData:Userclass;

  public selfUserId:number;
  public viewUserID:any;
  public tempData:any;
  public errorMessage:any;
  public subs:any;


  public currentTimeFrame:any;


  constructor(private _usersInfoService:UsersInfoService,
              private _userInfoContainerService:UserInfoContainerService,
              private _userDetailsService:UserDetailsService,
              private _activatedRoute:ActivatedRoute) {

    this.selfUserInforData = new Userclass();
    this.randerUserInforData=new Userclass();

    this.selfUserId=0;
    this.viewUserID=0;

  }


  ngOnInit() {
    console.log("Router params userID:"+ this._activatedRoute.snapshot.params['userid']);
   // console.log("Router params timeFrame:"+ this._activatedRoute.snapshot.params['timeframeid']);

  //  this.currentTimeFrame=this._userInfoContainerService.getCurrentTimeFrame();
   // console.log("from Shard time Frame:"+ this.currentTimeFrame.time_frame_id);

    this.subs = this._activatedRoute.params.subscribe(params => {
      this.viewUserID = ''+params['userid']; // (+) converts string 'id' to a number
      console.log("this.viewUserID"+this.viewUserID);
      // In a real app: dispatch action to load the details here.
      this.getCurrentUserInfo();
      this.selfUserId=this.selfUserInforData.user_id;
      this.viewUserID=Number(this._activatedRoute.snapshot.params['userid']);
      if(this.selfUserId !=this.viewUserID ){
        console.log('different');
        this.getTargetUserInfo();
      }else{
        this.randerUserInforData=this.selfUserInforData;
      }

    });

  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }



  getCurrentUserInfo(){
    this.selfUserInforData=this._userInfoContainerService.getUserInfo();
  }

  getTargetUserInfo(){
    this._userDetailsService.getById(this.viewUserID).subscribe(
      data=>this.tempData = data,
      error =>  this.errorMessage = <any>error,
      ()=>{
        this.randerUserInforData=<Userclass>this.tempData.data;
        console.log(this.randerUserInforData);
      }
    );
  }
  getUserGroups(){

  }
  getUserOkrs(){

  }
  getUserActivies(){

  }




}
