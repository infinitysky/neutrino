import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { OkrSettingTimeFrameRoutingModule } from './okr-setting-time-frame-routing.module';
import { OkrSettingTimeFrameComponent } from './okr-setting-time-frame.component';
import { TimeFrameSettingModalComponent } from './time-frame-setting-modal/time-frame-setting-modal.component';

import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime'




@NgModule({
  imports: [

    NKDatetimeModule,

    FormsModule,
    HttpModule,


    CommonModule,
    OkrSettingTimeFrameRoutingModule
  ],
  declarations: [OkrSettingTimeFrameComponent,TimeFrameSettingModalComponent]
})
export class OkrSettingTimeFrameModule { }
