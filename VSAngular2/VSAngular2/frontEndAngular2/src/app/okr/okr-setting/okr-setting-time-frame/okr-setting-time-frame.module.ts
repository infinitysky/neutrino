import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { OkrSettingTimeFrameRoutingModule } from './okr-setting-time-frame-routing.module';
import { OkrSettingTimeFrameComponent } from './okr-setting-time-frame.component';
import { TimeFrameSettingModalComponent } from './time-frame-setting-modal/time-frame-setting-modal.component';


@NgModule({
  imports: [
    NKDatetimeModule,
    NgbModule,
    CommonModule,
    OkrSettingTimeFrameRoutingModule
  ],
  declarations: [OkrSettingTimeFrameComponent,TimeFrameSettingModalComponent]
})
export class OkrSettingTimeFrameModule { }
