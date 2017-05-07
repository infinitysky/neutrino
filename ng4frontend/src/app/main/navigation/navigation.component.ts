import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router } from '@angular/router';

import {Subscription} from 'rxjs/Subscription';
import 'jquery-slimscroll';

declare var jQuery:any;


//TODO: Set these two class and services and class as top level shard service and class
import {Userclass} from '../../shared/classes/user-class';
import {Timeframeclass} from '../okr/okr-shared/classes/time-frame-class';
import {UserInfoContainerService} from '../../shared/services/user-info-container.service';
import { UsersLoginInfoService } from '../../shared/services/users-login-info.service';
import { MyCookieService } from '../../shared/services/my-cookie.service';


import {MY_CONFIG} from '../../app-config';
import {SettingTimeFrameService} from '../okr/okr-shared/services/okr-time-frame.service';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  providers: [UsersLoginInfoService, SettingTimeFrameService],
  styleUrls: ['navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public companyName: string;

  public timeFrames: Timeframeclass[];
  public defaultTimeFrame: Timeframeclass;
  public errorMessage: any;
  public tempData: any;
  public selectedTimeFrame: Timeframeclass;

  public selfInfo: Userclass;
  private selfTimeFrameSubscription: Subscription;
  private selfInfoSubscription: Subscription;



  private notManager: boolean;

  public currentTimeFrame: Timeframeclass;

  private subscribeTimeFrameData: any;
  private timeFrameDataSubscription: Subscription;


  /*
   private currentUrlSubscription : any; // Currnet Url Subscription
   private returnUrl: any;
   */

  constructor( private _cookieService: MyCookieService,
               private _authenticationService: AuthenticationService,
               private _settingTimeFrameService: SettingTimeFrameService,
               private _router: Router,
               private _activeRoute: ActivatedRoute,
               private _usersinfoService: UsersLoginInfoService,
               private _userInfoContainerService: UserInfoContainerService) {


    this.companyName = MY_CONFIG.companyName;
    this.timeFrames = [];
    this.selectedTimeFrame = new Timeframeclass();
    this.selfInfo = new Userclass();
    this.notManager = true;




    this.currentTimeFrame = new Timeframeclass();
    this.selfInfo= new Userclass();


  }

  ngOnInit() {
    // this.checkDefaultTimeFrameExisting();

    this.getCurrentTimeFrame();
    this.getSelfInformation();

    this.getAllTimeFrames();// dropdown list
    // this.getUserInfo();


  }
  ngOnDestroy() {

    this.selfInfoSubscription.unsubscribe();
    this.timeFrameDataSubscription.unsubscribe();
  }

  // - --------------------- Left menu -------------------

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();

    if (jQuery("body").hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      });
    }
  }

  activeRoute(routename: string): boolean{

    return this._router.url.indexOf(routename) > -1;
  }





//TODO: restructure the "get" logic
  getUserInfo() {
    this.selfInfoSubscription = this._userInfoContainerService.userInfo$.subscribe(selfInfo => this.selfInfo=selfInfo);
  }

  getCurrentTimeFrame(){
    this.timeFrameDataSubscription = this._userInfoContainerService.timeFrame$.subscribe(timeFrame => this.subscribeTimeFrameData = <Timeframeclass>timeFrame);
    this.getDefaultTimeFrameFromCookie();
  }



  /*
   * ------------------------------------------ header ------------------------------------------------------------------
   * */
  getAllTimeFrames(){
    this._settingTimeFrameService.getAllTimeFrames().subscribe(
      data => this.tempData = data,
      error => this.errorMessage = <any>error,
      () =>{
        if(this.tempData.data && this.tempData.status  == 'success'){
          this.timeFrames = <Timeframeclass[]>this.tempData.data;

        }


      }
    );
  }

  onSelectedTimeFrame(timeFrame: Timeframeclass){
    this.selectedTimeFrame = timeFrame;
    this.setCurrentTimeFrame(timeFrame);


  }


  getDefaultTimeFrameFromCookie(){
    this.defaultTimeFrame = <Timeframeclass> this._cookieService.getCookieCurrentTimeFrame();
    this.currentTimeFrame = this.defaultTimeFrame;
    this._userInfoContainerService.setDefaultTimeFrameSubject(this.defaultTimeFrame);
    this.setCurrentTimeFrame(this.defaultTimeFrame);
    this.checkDefaultTimeFrameExisting();

  }


  checkDefaultTimeFrameExisting(){

    if(!this.defaultTimeFrame){

      this._settingTimeFrameService.getNearestTimeFrame().subscribe(
        data => this.tempData = data,
        error => this.errorMessage = <any>error,
        () => {
          if ( this.tempData.status == 'success' && this.tempData.data){
            let tempTF = <Timeframeclass> this.tempData.data[0];
            this.selectedTimeFrame = tempTF;
            this.defaultTimeFrame = tempTF;
            this._userInfoContainerService.setDefaultTimeFrameSubject(tempTF);
            this._cookieService.setCookieCurrentTimeFrame(JSON.stringify(tempTF));
            this.setCurrentTimeFrame(tempTF);

          }
        }
      );
    }else {
      console.log('exist');
    }
  }

  getSelfInformation(){
    this.selfInfoSubscription = this._userInfoContainerService.userInfo$.subscribe(userinfo => this.selfInfo = userinfo);

  }


  // set selected time Frame on display, RAM and URL
  setCurrentTimeFrame(currentTimeFrame: Timeframeclass){
    this._userInfoContainerService.setTimeFrameSubject(currentTimeFrame);
    this.selectedTimeFrame = currentTimeFrame;

    // ------------ Time Frame url Control ---------
    this._router.navigate([],{queryParams: { timeFrameId: currentTimeFrame.time_frame_id }}); // add the time frame parameter in the page.
  }

  logout(){
    this._authenticationService.logout(); // clear all login data

    this._router.navigate(['/login']); // jump to login page

  }










}
