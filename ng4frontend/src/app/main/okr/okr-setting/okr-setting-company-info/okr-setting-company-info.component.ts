import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


import { Userclass } from '../../../../shared/classes/user-class';
import { CompanyDetailClass } from '../../okr-shared/classes/company-detail-class';

import { UserInfoContainerService } from '../../../../shared/services/user-info-container.service';
import { OkrCompanyService } from  '../../okr-shared/services/okr-company.service';
import { MyCookieService } from '../../../../shared/services/my-cookie.service';


@Component({
  selector: 'app-okr-setting-company-info',
  templateUrl: './okr-setting-company-info.component.html',
  providers: [MyCookieService, OkrCompanyService],
  styleUrls: ['./okr-setting-company-info.component.css']
})
export class OkrSettingCompanyInfoComponent implements OnInit {

  public isAdmin: boolean;
  public disabled: boolean;
  private selfInfo: Userclass;
  private selfInfoSubscription : Subscription;

  constructor(
    private _userInfoContainerService: UserInfoContainerService,
    private _okrCompanyService: OkrCompanyService,
    private _cookieService: MyCookieService
  ) {
    this.isAdmin = false;
    this.selfInfo = new Userclass;
    this.setEditable();


  }

  ngOnInit() {



  }
  ngOnDestroy() {
    this.selfInfoSubscription.unsubscribe();
  }

  setEditable(){
    this.selfInfoSubscription = this._userInfoContainerService.userInfo$.subscribe(selfInformation=> this.selfInfo = selfInformation);
    console.log( this.selfInfo);

    if ( this.selfInfo){
      if ( this.selfInfo.role == 'admin' ||  this.selfInfo.role == 'manager'){
        this.isAdmin = true;

        console.log('set good ');
        console.log( this.selfInfo.role);
      }else {
        this.isAdmin = false;

      }
    }


  }



}
