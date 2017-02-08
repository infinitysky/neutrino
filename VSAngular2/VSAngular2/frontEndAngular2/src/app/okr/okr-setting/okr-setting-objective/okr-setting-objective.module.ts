import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import {ToastyModule} from 'ng2-toasty';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';

import { OkrSettingObjectiveRoutingModule } from './okr-setting-objective-routing.module';
import { OkrSettingObjectiveComponent } from './okr-setting-objective.component';

@NgModule({
  imports: [

    ToastyModule.forRoot(),
    Ng2Bs3ModalModule,
    MyDatePickerModule,
    MyDateRangePickerModule,
    FormsModule,
    HttpModule,
    CommonModule,
    OkrSettingObjectiveRoutingModule
  ],
  declarations: [OkrSettingObjectiveComponent]
})
export class OkrSettingObjectiveModule { }
