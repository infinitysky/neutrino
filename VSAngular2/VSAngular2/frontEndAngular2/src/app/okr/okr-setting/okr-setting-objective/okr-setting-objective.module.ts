import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrSettingObjectiveRoutingModule } from './okr-setting-objective-routing.module';
import { OkrSettingObjectiveComponent } from './okr-setting-objective.component';

@NgModule({
  imports: [
    CommonModule,
    OkrSettingObjectiveRoutingModule
  ],
  declarations: [OkrSettingObjectiveComponent]
})
export class OkrSettingObjectiveModule { }
