import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';


import { OkrSettingRoutingModule } from './okr-setting-routing.module';
import {OkrSettingNavigationModule} from './okr-setting-navigation/okr-setting-navigation.module'

import { OkrSettingComponent } from './okr-setting.component';
import {OkrSettingNavigationComponent} from './okr-setting-navigation/okr-setting-navigation.component'




import { OkrSettingTimeFrameModule }from './okr-setting-time-frame/okr-setting-time-frame.module';
@NgModule({
  imports: [
    HttpModule,
    CommonModule,

    OkrSettingRoutingModule,
    OkrSettingTimeFrameModule,



  ],
  declarations: [OkrSettingComponent,OkrSettingNavigationComponent]
})
export class OkrSettingModule { }
