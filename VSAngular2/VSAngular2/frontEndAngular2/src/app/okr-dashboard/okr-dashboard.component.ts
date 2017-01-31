
import { Component, OnInit } from '@angular/core';

import { UsersinfoService } from '../services/usersinfo.service'

@Component({
  selector: 'app-okr-dashboard',
  templateUrl: './okr-dashboard.component.html',
  providers: [UsersinfoService],
  styleUrls: ['./okr-dashboard.component.css']
})
export class OkrDashboardComponent implements OnInit {
    public pageTitle = 'OKRs Dashboard';
    public userInfoData: any;

    constructor(private _usersinfoService:UsersinfoService) { }

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
              console.log(this.userInfoData);

          }

        );

      }
}
