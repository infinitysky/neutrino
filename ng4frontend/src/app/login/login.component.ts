import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';
import { MyCookieService } from '../shared/services/my-cookie.service';


import {LoginInfo} from './login-info';

import {UserInfoContainerService} from '../shared/services/user-info-container.service';

import { Userclass } from '../shared/classes/user-class';



import { Md5 } from 'ts-md5/dist/md5';
//import swal from 'sweetalert2'
declare var swal: any;

import {ValidationService} from '../shared/services/validation.service';
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
  public loginForm: FormGroup;
  public tempData: any;
  public errorMessage: any;

  public currentUserInfo: Userclass;



  private passwordEncryption: string;
  private loginInfo: LoginInfo = new LoginInfo();



  constructor(
    private  _userInfoContainerService:UserInfoContainerService,
    private  _cookieService : MyCookieService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _formBuilder: FormBuilder
  ) {
    this.loginInfo = new LoginInfo();
    // get return url from route parameters or default to '/'
    this._authenticationService.logout();
    this.returnUrl = this._activatedRoute.snapshot.queryParams['returnUrl'] || '/';

  }

  ngOnInit() {
    this.loginStatusCheck();

    this.passwordEncryption = '';

    // reset login status
    // this._authenticationService.logout();


    this.setupForm();


  }

  setupForm() {

    this.loginForm = this._formBuilder.group({
      //   email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', Validators.required]
    });

  }

  doLogin() {
    this.loading = true;
    let loginInfo =  this.loginForm.value;

    this.passwordEncryption  = loginInfo.password;

    this.loginInfo = new LoginInfo();

    this.loginInfo.email = loginInfo.email;
    this.loginInfo.password = Md5.hashStr(loginInfo.password).toString();




    this.loginProcess(this.loginInfo);


  }



  loginProcess(userLoginInfo: LoginInfo ){
    this._authenticationService.logout();

    this._authenticationService.login( userLoginInfo)
      .subscribe(
        data => {
          this.tempData = data;
        },
        error => {

          this.errorMessage = <any>error;
          this.displayErrorMessage(this.errorMessage);
          this.loading = false;
        },
        () => {
          if (this.tempData && this.tempData.data && this.tempData.status.toLowerCase() == 'success'){

            this.currentUserInfo = <Userclass> this.tempData.data;
            this._cookieService.addCookie('currentUser', JSON.stringify(this.currentUserInfo));
            this._userInfoContainerService.setUserInfoSubject(this.currentUserInfo );


            let timeStamp = Date.now().toString();
            this._cookieService.addCookie('currentLoginTime', JSON.stringify(timeStamp));

            // localStorage.setItem('currentUser', JSON.stringify(this.tempData.data));
            if(this.tempData.time_frame){
              //    localStorage.setItem('currentTimeFrame', JSON.stringify(this.tempData.time_frame[0]));
              this._cookieService.addCookie('currentTimeFrame', JSON.stringify(this.tempData.time_frame[0]));
              // this._cookieService.addCookie('mainBoardTimeFrame', JSON.stringify(this.tempData.time_frame[0]));

            }


            this._router.navigate([this.returnUrl]);
          }else{
            if (this.tempData.errorMassage){
              this.displayErrorMessage(this.tempData.errorMassage);
            }
            this.loading = false;
          }
        });
  }

  loginStatusCheck(){

    this._cookieService.checkCookie();

    //
    // if (this._cookieService.getCookie('currentUser')&&  this._cookieService.getCookie('currentTimeFrame') && this._cookieService.getCookie('currentLoginTime')){
    //   this._router.navigate([this.returnUrl]);
    // }

  }


  displayWarningMessage(warningMessage:string){
    swal("Warning", warningMessage, "warning");
  }
  displayErrorMessage(errorMessage:string){
    swal("Error!", errorMessage , "error");
  }

  displaySuccessMessage(successMessage:string){
    swal("Success!", successMessage, "success");
  }



}
