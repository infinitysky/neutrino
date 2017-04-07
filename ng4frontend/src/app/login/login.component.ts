import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../shared/services/authentication.service';

import {LoginInfo} from './login-info';

import {Md5} from 'ts-md5/dist/md5';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [AuthenticationService],
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    today: number = Date.now();
    model: any = {};
    loading = false;
    returnUrl: string;

    private passwordEncryption: string;
    private loginInfo: LoginInfo = new LoginInfo();



    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
      ) {
        this.loginInfo = new LoginInfo();


    }

    ngOnInit() {
        this.passwordEncryption='';
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.passwordEncryption  =this.model.password;

        this.loginInfo = new LoginInfo();

        this.loginInfo.emailAddress=this.model.email;
        this.loginInfo.password= Md5.hashStr(this.model.password).toString();

        console.log('loginInfo : ' + JSON.stringify(this.loginInfo));

        this.authenticationService.login( this.loginInfo)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    // this.alertService.error(error);
                    this.loading = false;
                });
    }
}