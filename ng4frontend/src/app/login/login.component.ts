import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
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
  public form: FormGroup;


  private passwordEncryption: string;
    private loginInfo: LoginInfo = new LoginInfo();



    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private _formBuilder: FormBuilder
      ) {
        this.loginInfo = new LoginInfo();


    }

    ngOnInit() {
        this.passwordEncryption='';
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.setupForm();
    }

    setupForm() {
      this.form = this._formBuilder.group({
        email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      });
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
