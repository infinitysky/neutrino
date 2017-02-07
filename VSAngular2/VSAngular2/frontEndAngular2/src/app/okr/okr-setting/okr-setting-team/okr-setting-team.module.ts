import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrSettingTeamRoutingModule } from './okr-setting-team-routing.module';
import { OkrSettingTeamComponent } from './okr-setting-team.component';

@NgModule({
  imports: [
    CommonModule,
    OkrSettingTeamRoutingModule
  ],
  declarations: [OkrSettingTeamComponent]
})
export class OkrSettingTeamModule { }
