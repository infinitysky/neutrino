import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import {Subscription} from'rxjs';
import {Subscription} from 'rxjs/Subscription';

import {Userclass} from '../shared/classes/user-class';
import { UsersLoginInfoService } from '../shared/services/users-login-info.service';
import {UserInfoContainerService} from '../shared/services/user-info-container.service';
import { CookieService } from '../shared/services/cookie.service';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    providers:[UsersLoginInfoService],
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


    public selfUserInfo:Userclass;
    public errorMessage: any;
    public tempData: any;

    private selfInfoSubscription: Subscription;


    constructor(
        private _cookieService: CookieService,
        private _userInfoContainerService: UserInfoContainerService,
        private _usersLoginInfoService: UsersLoginInfoService) {

        this.selfUserInfo = new Userclass();
    }

    ngOnInit() {
        this.getUserInfo();
        this.selfInfoSubscription = this._userInfoContainerService.userInfo$.subscribe(userInfo => this.selfUserInfo = userInfo);

    }
    ngOnDestroy() {
        this.selfInfoSubscription.unsubscribe();
    }

    getUserInfo() {

        const selfInfo = JSON.parse(this._cookieService.getCookie('currentUser'));
        // const localUserInfo = JSON.parse(localStorage.getItem('currentUser'));

        this._userInfoContainerService.setUserInfoSubject(selfInfo);


    }






}
