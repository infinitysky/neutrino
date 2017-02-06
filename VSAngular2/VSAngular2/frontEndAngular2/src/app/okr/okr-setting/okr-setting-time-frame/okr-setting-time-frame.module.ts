import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';




import {ToastyModule} from 'ng2-toasty';



import { OkrSettingTimeFrameRoutingModule } from './okr-setting-time-frame-routing.module';
import { OkrSettingTimeFrameComponent } from './okr-setting-time-frame.component';
import { TimeFrameSettingModalComponent } from './time-frame-setting-modal/time-frame-setting-modal.component';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';

@NgModule({
  imports: [
    ToastyModule.forRoot(),

    Ng2Bs3ModalModule,
    MyDatePickerModule,
    MyDateRangePickerModule,

    FormsModule,
    HttpModule,


    CommonModule,
    OkrSettingTimeFrameRoutingModule
  ],
  declarations: [OkrSettingTimeFrameComponent,TimeFrameSettingModalComponent]
})
export class OkrSettingTimeFrameModule { }
