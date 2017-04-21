import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';





//3rd party library module
import {ToastyModule} from 'ng2-toasty';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { MultiselectDropdownModule} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { SelectModule} from 'ng2-select';





import { OkrCompanyRoutingModule } from './okr-company-routing.module';

import { CompanyOkrsComponent } from './company-okrs/company-okrs.component';
import { OkrCompanyComponent } from './okr-company.component';
import { CompanyActivityComponent } from './company-activity/company-activity.component';
import { CompanyTeamsComponent } from './company-teams/company-teams.component';

import {ShareCompanyOkrinfoService} from './share-company-okrinfo.service';


@NgModule({
  imports: [


    ToastyModule.forRoot(),
    Ng2Bs3ModalModule,
    MyDatePickerModule,
    MyDateRangePickerModule,
    MultiselectDropdownModule,
    SelectModule,
    FormsModule,
    HttpModule,
    CommonModule,

    CommonModule,
    OkrCompanyRoutingModule
  ],
  providers:[ShareCompanyOkrinfoService],
  declarations: [OkrCompanyComponent, CompanyActivityComponent, CompanyTeamsComponent, CompanyOkrsComponent]
})
export class OkrCompanyModule { }
