import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrSettingTimeFrameRoutingModule } from './okr-setting-time-frame-routing.module';
import { OkrSettingTimeFrameComponent } from './okr-setting-time-frame.component';

@NgModule({
  imports: [
    CommonModule,
    OkrSettingTimeFrameRoutingModule
  ],
  declarations: [OkrSettingTimeFrameComponent]
})
export class OkrSettingTimeFrameModule { }
