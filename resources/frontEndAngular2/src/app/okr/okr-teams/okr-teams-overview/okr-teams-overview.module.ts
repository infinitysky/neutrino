import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrTeamsOverviewRoutingModule } from './okr-teams-overview-routing.module';
import { OkrTeamsOverviewComponent } from './okr-teams-overview.component';

@NgModule({
  imports: [
    CommonModule,
    OkrTeamsOverviewRoutingModule
  ],
  declarations: [OkrTeamsOverviewComponent]
})
export class OkrTeamsOverviewModule { }
