import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { OkrSettingRoutingModule } from './okr-setting-routing.module';
import { OkrSettingComponent } from './okr-setting.component';





import { OkrSettingTimeFrameModule }from './okr-setting-time-frame/okr-setting-time-frame.module';
import {OkrSettingTeamModule} from './okr-setting-team/okr-setting-team.module';
import {OkrSettingGoalModule} from './okr-setting-goal/okr-setting-goal.module';
import {OkrSettingObjectiveModule} from './okr-setting-objective/okr-setting-objective.module';
import {OkrSettingKeyResultModule} from './okr-setting-key-result/okr-setting-key-result.module';

import {OkrSettingNavigationComponent}from './okr-setting-shared/okr-setting-navigation/okr-setting-navigation.component';

@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    CommonModule,

    OkrSettingRoutingModule,
    OkrSettingTimeFrameModule,
    OkrSettingTeamModule,
    OkrSettingGoalModule,
    OkrSettingObjectiveModule,
    OkrSettingKeyResultModule



  ],
  declarations: [OkrSettingComponent,OkrSettingNavigationComponent]
})
export class OkrSettingModule { }
