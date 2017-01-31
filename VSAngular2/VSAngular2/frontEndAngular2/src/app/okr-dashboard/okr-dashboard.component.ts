
import { Component, OnInit } from '@angular/core';

import { UsersinfoService } from '../services/usersinfo.service'


import { userClass} from"../interfaces/user.interface"

@Component({
  selector: 'app-okr-dashboard',
  templateUrl: './okr-dashboard.component.html',
  providers: [UsersinfoService],
  styleUrls: ['./okr-dashboard.component.css']
})
export class OkrDashboardComponent implements OnInit {

    public pageTitle = 'OKRs Dashboard';
    userInfoData: any;
    userDatas:userClass[];

    constructor(private _usersinfoService:UsersinfoService) {
     this.userDatas=[];
    }

    ngOnInit() {
      this.getUserInfo();
    }
    getUserInfo() {
      this._usersinfoService.getUserInfo().subscribe(
        // the first argument is a function which runs on success
        data => { this.userInfoData = data},
        // the second argument is a function which runs on error
        err => console.error(err),
        // the third argument is a function which runs on completion
        () => {
          this.userDatas=this.userInfoData;
          console.log(this.userDatas);
        }
      );
    }

}
