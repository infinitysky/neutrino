import { Component, OnInit } from '@angular/core';


// 3rd-party library

import {Md5} from 'ts-md5/dist/md5';
//import swal from 'sweetalert2'
declare var swal: any;

// TODO: Add new user and edit current user

// Services
import { UsersInfoService } from '../../../../shared/services/users-info.service';
import { CookieService } from './../../../../shared/services/cookie.service';
// Classes
import { Userclass } from '../../../../shared/classes/user-class';


@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    providers: [UsersInfoService],
    styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {


    public isAdmin: boolean; // Check the user's role and control the edit button
    public editModeIO: boolean; // display the edit button group
    public users: Userclass[]; // ALL users information, it will pass to table

    public tempData: any; // data holder
    public errorMessage: any;

    public selfInfoFromCookie: Userclass; // get current login users information, which is stored in cookie
    public editUser: Userclass; // temp edit user


    constructor( private _usersInfoService: UsersInfoService,
                 private _cookieService: CookieService) {
        // -------------------- init data ------------------------------
        this.tempData = '';
        this.users = [];
        this.isAdmin = false;
        this.editModeIO = true;
        this.selfInfoFromCookie = new Userclass();
        this.editUser = new Userclass();

    }

    ngOnInit() {
        this.loadSelfInfo();
        this.loadUserData();
    }


// ---------- buttons -----------
    addUserButton(){

    }

    editButton(){
        this.editModeIO = !this.editModeIO;

    }

    editUserButton(userInfo: Userclass){
        console.log(JSON.stringify(userInfo));
    }


    loadSelfInfo(){


        this.selfInfoFromCookie = <Userclass> JSON.parse(this._cookieService.getCookieCurrentUser().toString());

        if (this.selfInfoFromCookie.role == 'admin'){
            this.isAdmin = true;
        }else{
            // TODO: Make sure it is changed to false in product model
            this.isAdmin = false;
        }

    }

    // ---------------Logic--------------
    loadUserData(){
        this._usersInfoService.getAll()
            .subscribe(
                data => this.tempData = data,
                error => this.errorMessage = <any> error,
                () =>{
                    if (this.tempData && this.tempData.status.toLowerCase() === 'success'){
                        this.users =  <Userclass[]> this.tempData.data;
                    }
                }
            );
    }

    updateInfo(userInfo: Userclass){
        this._usersInfoService.update(userInfo)
            .subscribe(
                data => this.tempData = data,
                error => this.errorMessage = <any>error,
                () => {
                    if (this.tempData && this.tempData.status === 'success'){
                        this.displaySuccessMessage(this.tempData.data);
                    }
                }
            );

    }




    // ---------------- Display Message -----------------
    displayWarningMessage(warningMessage:string){
        swal( 'Warning!', warningMessage, 'Warning');
    }
    displayErrorMessage(errorMessage:string){
        swal('Error!', errorMessage , 'error');
    }

    displaySuccessMessage(successMessage:string){
        swal('Success!', successMessage, 'success');
    }


}
