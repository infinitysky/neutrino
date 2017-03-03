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
      ()=>{ this.toalMemberNumber=this.tempData.data.membersNumber;


      }
    );

  }

  getCompanyInfo(){
    this._okrCompanyService.getAll().subscribe(
      data => this.tempData = data,
      error =>  this.errorMessage = <any>error,
      ()=>{
        if(this.tempData.data&& this.tempData.status=="success"){
          this.companyinfo=this.tempData.data[0];
        }




      }
    );


  }
  changeName(){
    this.companyinfo.company_name='lololo';
  }


}
