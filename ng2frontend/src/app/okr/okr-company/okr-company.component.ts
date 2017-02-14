import { Component, OnInit } from '@angular/core';


import {OkrCompanyService} from '../okr-shared/services/okr-company.service';
import {UsersInfoService} from '../okr-shared/services/users-info.service';
import {CompanyDetailClass} from '../okr-shared/classes/company-detail-class';

@Component({
  selector: 'app-okr-company',
  templateUrl: './okr-company.component.html',
  providers:[OkrCompanyService,UsersInfoService],
  styleUrls: ['./okr-company.component.css']
})
export class OkrCompanyComponent implements OnInit {

  public companyinfo:CompanyDetailClass;

  public tempData:any;

  public errorMessage:string;
  public toalMemberNumber:any;

  constructor(private _okrCompanyService:OkrCompanyService, private _usersInfoService:UsersInfoService) {
    this.companyinfo=new CompanyDetailClass;
    this.toalMemberNumber=' - ';

  }

  ngOnInit() {
    this.getCompanyInfo();
    this.getTotalNumber();


  }
  getTotalNumber(){
    this._usersInfoService.getTotalNumber().subscribe(
      data=>this.tempData =data,
      error=> this.errorMessage = <any>error,
      ()=>{ this.toalMemberNumber=this.tempData.membersNumber;


      }
    );

  }

  getCompanyInfo(){
    this._okrCompanyService.getAll().subscribe(
      data => this.tempData = data,
      error =>  this.errorMessage = <any>error,
      ()=>{
       // console.log( "this.TeamsData Json:  + "+JSON.stringify(this.tempData));

        this.companyinfo=this.tempData[0];
       // console.log( "this.companyinfo + "+(this.companyinfo.company_name));
      }
    );

    console.log( this.companyinfo);
  }
  changeName(){
    this.companyinfo.company_name='lololo';
  }


}
