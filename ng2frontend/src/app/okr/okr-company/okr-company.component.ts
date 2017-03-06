import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { OkrCompanyService } from '../okr-shared/services/okr-company.service';
import { UsersInfoService } from '../okr-shared/services/users-info.service';
import { CompanyDetailClass } from '../okr-shared/classes/company-detail-class';

import { ShareCompanyOkrinfoService } from './share-company-okrinfo.service';



@Component({
  selector: 'app-okr-company',
  templateUrl: './okr-company.component.html',
  providers: [OkrCompanyService, UsersInfoService],
  styleUrls: ['./okr-company.component.css']
})
export class OkrCompanyComponent implements OnInit {

  public companyinfo: CompanyDetailClass;

  public tempData: any;
  public goals:any;


  public errorMessage: string;
  public toalMembersNumber: any;
  public toalGoalsNumber: any;
  private overallGoallNumberSubscription: Subscription;

  constructor(private _okrCompanyService: OkrCompanyService, private _usersInfoService: UsersInfoService, private _shareCompanyOkrinfoService: ShareCompanyOkrinfoService) {
    this.companyinfo = new CompanyDetailClass;
    this.toalMembersNumber = ' - ';
    this.toalGoalsNumber = ' - ';
    this.goals="";

  }

  ngOnInit() {
    this.getCompanyInfo();
    this.getTotalNumber();
    this.getTotalGoalNumber();

   
  }

  ngOnDestroy() {
    this.overallGoallNumberSubscription.unsubscribe();

  }


  getTotalGoalNumber(){

    this.overallGoallNumberSubscription = this._shareCompanyOkrinfoService._shareGoals$.subscribe(data => this.toalGoalsNumber = data);
    
    if (!this.toalGoalsNumber) {
      this.toalGoalsNumber = ' - ';
    }
    

    
  }





  getTotalNumber() {
    this._usersInfoService.getTotalNumber().subscribe(
      data => this.tempData = data,
      error => this.errorMessage = <any>error,
      () => {
         if (this.tempData.data ) {
           this.toalMembersNumber = this.tempData.data.membersNumber;
        }

      


      }
    );

  }

  getCompanyInfo() {
    this._okrCompanyService.getAll().subscribe(
      data => this.tempData = data,
      error => this.errorMessage = <any>error,
      () => {
        if (this.tempData.data && this.tempData.status == "success") {
          this.companyinfo = this.tempData.data[0];
        }



      }
    );


  }
  changeName() {
    this.companyinfo.company_name = 'lololo';

    console.log(this.toalGoalsNumber);
  }

  updateOverallNumber(event) {
    this.toalGoalsNumber = event;
  }


}
