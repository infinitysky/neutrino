import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router } from '@angular/router';

import {Subscription} from 'rxjs/Subscription';

//TODO: Set these two class and services and class as top level shard service and class
import {Userclass} from '../../shared/classes/user-class';
import {Timeframeclass} from '../okr/okr-shared/classes/time-frame-class';
import {UserInfoContainerService} from '../../shared/services/user-info-container.service';
import { UsersLoginInfoService } from '../../shared/services/users-login-info.service';
import { CookieService } from '../../shared/services/cookie.service';




import {SettingTimeFrameService} from '../okr/okr-shared/services/okr-time-frame.service';

import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
    selector: 'app-navigation',
    templateUrl: 'navigation.component.html',
    providers: [UsersLoginInfoService, SettingTimeFrameService],
    styleUrls: ['navigation.component.css']
})
export class NavigationComponent implements OnInit {

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

    constructor( private _cookieService: CookieService,
                 private _authenticationService: AuthenticationService,
                 private _settingTimeFrameService: SettingTimeFrameService,
                 private _router: Router,
                 private _activeRoute: ActivatedRoute,
                 private _usersinfoService: UsersLoginInfoService,
                 private _userInfoContainerService: UserInfoContainerService) {



        this.timeFrames = [];
        this.selectedTimeFrame = new Timeframeclass();
        this.selfInfo = new Userclass();
        this.notManager = true;




        this.currentTimeFrame = new Timeframeclass();
        this.selfInfo= new Userclass();
        this.showOkrsSubMenu= false;

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

//TODO: restructure the "get" logic
    getUserInfo() {
        this.selfInfoSubscription = this._userInfoContainerService.userInfo$.subscribe(selfInfo => this.selfInfo=selfInfo);
    }

    getCurrentTimeFrame(){
        this.timeFrameDataSubscription = this._userInfoContainerService.timeFrame$.subscribe(timeFrame => this.subscribeTimeFrameData = <Timeframeclass>timeFrame);
        this.getDefaultTimeFrameFromCookie();
    }

    public showOkrsSubMenu : boolean;
// Menu management :
    extendOkrsSubMenu(){
        this.showOkrsSubMenu = !this.showOkrsSubMenu;
        // if (this.showOkrsSubMenu.length = 0 ){
        //   this.showOkrsSubMenu.push('in');
        // }else{
        //   this.showOkrsSubMenu.pop('in');
        // }
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
            // console.log("Not Find");
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

                        //  console.log("set default time frame frame" + JSON.stringify(this.defaultTimeFrame));
                        //  console.log("selfTimeFrameSubscription" + JSON.stringify(this.currentTimeFrame));
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

    /*
    getDefaultTimeFrame(){
        this.selfTimeFrameSubscription = this._userInfoContainerService.timeFrame$.subscribe(timeFrame => this.defaultTimeFrame = timeFrame);
        this.checkDefaultTimeFrameExisting();
    }
*/
    // set selected time Frame on display, RAM and URL
    setCurrentTimeFrame(currentTimeFrame: Timeframeclass){
        this._userInfoContainerService.setTimeFrameSubject(currentTimeFrame);
        this.selectedTimeFrame = currentTimeFrame;

        // ------------ Time Frame url Control ---------
        this._router.navigate([],{queryParams: { timeFrameId: currentTimeFrame.time_frame_id }});
    }

    logout(){
        this._authenticationService.logout(); // clear all login data
        this._router.navigate(['/login']); // jump to login page

    }










}
