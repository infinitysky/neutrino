import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrSettingGoalRoutingModule } from './okr-setting-goal-routing.module';
import { OkrSettingGoalComponent } from './okr-setting-goal.component';

@NgModule({
  imports: [
    CommonModule,
    OkrSettingGoalRoutingModule
  ],
  declarations: [OkrSettingGoalComponent]
})
export class OkrSettingGoalModule { }
