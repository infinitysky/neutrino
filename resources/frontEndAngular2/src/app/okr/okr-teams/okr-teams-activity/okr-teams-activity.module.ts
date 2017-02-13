import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrTeamsActivityRoutingModule } from './okr-teams-activity-routing.module';
import { OkrTeamsActivityComponent } from './okr-teams-activity.component';

@NgModule({
  imports: [
    CommonModule,
    OkrTeamsActivityRoutingModule
  ],
  declarations: [OkrTeamsActivityComponent]
})
export class OkrTeamsActivityModule { }
