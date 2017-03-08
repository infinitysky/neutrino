import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';




import {ToastyModule} from 'ng2-toasty';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';

import { OkrSettingTimeFrameRoutingModule } from './okr-setting-time-frame-routing.module';
import { OkrSettingTimeFrameComponent } from './okr-setting-time-frame.component';

import {OkrSettingNavigationModule} from '../okr-setting-shared/okr-setting-navigation/okr-setting-navigation.module';




@NgModule({
  imports: [
    ToastyModule.forRoot(),

    Ng2Bs3ModalModule,
    MyDatePickerModule,
    MyDateRangePickerModule,

    FormsModule,
    HttpModule,

    OkrSettingNavigationModule,
    CommonModule,
    OkrSettingTimeFrameRoutingModule
  ],
  declarations: [OkrSettingTimeFrameComponent]
})
export class OkrSettingTimeFrameModule { }
