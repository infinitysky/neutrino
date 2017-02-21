import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import {ToastyModule} from 'ng2-toasty';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
//import {SelectModule} from 'ng2-select';



import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
//import {SelectModule} from 'angular2-select';


import {SelectModule} from 'ng2-select';



import { OkrSettingTeamRoutingModule } from './okr-setting-team-routing.module';
import { OkrSettingTeamComponent } from './okr-setting-team.component';




@NgModule({
  imports: [

    ToastyModule.forRoot(),
    Ng2Bs3ModalModule,
    MyDatePickerModule,
    MyDateRangePickerModule,
    SelectModule,

    MultiselectDropdownModule,




    FormsModule,
    HttpModule,
    CommonModule,



    OkrSettingTeamRoutingModule,

  ],
  declarations: [OkrSettingTeamComponent]
})
export class OkrSettingTeamModule { }
