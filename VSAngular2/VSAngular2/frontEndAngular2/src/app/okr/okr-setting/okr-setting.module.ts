import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrSettingRoutingModule } from './okr-setting-routing.module';
import { OkrSettingComponent } from './okr-setting.component';

import { OkrSettingTimeFrameModule }from './okr-setting-time-frame/okr-setting-time-frame.module';
@NgModule({
  imports: [
    CommonModule,
    OkrSettingRoutingModule,
    OkrSettingTimeFrameModule
  ],
  declarations: [OkrSettingComponent]
})
export class OkrSettingModule { }
