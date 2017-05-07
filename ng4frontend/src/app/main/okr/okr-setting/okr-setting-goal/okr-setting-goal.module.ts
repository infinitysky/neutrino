import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';

import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {SelectModule} from 'ng2-select';



import { OkrSettingGoalRoutingModule } from './okr-setting-goal-routing.module';
import { OkrSettingGoalComponent } from './okr-setting-goal.component';

@NgModule({
  imports: [




    Ng2Bs3ModalModule,
    MyDatePickerModule,
    MyDateRangePickerModule,
    MultiselectDropdownModule,
    SelectModule,
    FormsModule,
    HttpModule,
    CommonModule,


    OkrSettingGoalRoutingModule
  ],
  declarations: [OkrSettingGoalComponent]
})
export class OkrSettingGoalModule { }
