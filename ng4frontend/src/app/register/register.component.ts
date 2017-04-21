import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


import { UsersInfoService } from '../shared/services/users-info.service';
import {Userclass} from '../shared/classes/user-class';

import {Md5} from 'ts-md5/dist/md5';
//import swal from 'sweetalert2'
declare var swal: any;

import {ValidationService} from '../shared/services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [UsersInfoService],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  today: number = Date.now();
  model: any = {};
  loading = false;
  returnUrl: string;


  public registerForm: FormGroup;
  public tempData: any;
  public errorMessage: any;


  private passwordEncryption: string;
  private registerInfo: Userclass;
  constructor( private _usersInfoService: UsersInfoService,
               private route: ActivatedRoute,
               private router: Router,
               private _formBuilder: FormBuilder) {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  ngOnInit() {
    this.setupForm()
  }

  cancelButton(){
    this.router.navigate([this.returnUrl]);
  }

  setupForm() {

    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      //repeatEmail: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
      //repeatPassword: ['', Validators.required]
    });



  }

  register(){
    this.loading = true;
    this.registerInfo = new Userclass();
    this.registerInfo.first_name = this.registerForm.value.firstName;
    this.registerInfo.last_name = this.registerForm.value.lastName;
    this.registerInfo.email = this.registerForm.value.email;
    this.registerInfo.password = Md5.hashStr(this.registerForm.value.password).toString();

    console.log(JSON.stringify(this.registerInfo));

    this._usersInfoService.addNewUserByClass(this.registerInfo).subscribe(
      data => this.tempData = data,
      error => {
        // this.alertService.error(error);
        this.errorMessage = <any>error;
        this.displayErrorMessage(this.errorMessage);
        this.loading = false;
      },
      () => {
        this.loading = false;
        if (this.tempData.data && this.tempData.status == 'Success'){
          this.displaySuccessMessage('Welcome! Please Login')
          this.router.navigate([this.returnUrl]);
        }else {
          this.displayErrorMessage(this.tempData.errorMessage);
        }
      }
    );



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
