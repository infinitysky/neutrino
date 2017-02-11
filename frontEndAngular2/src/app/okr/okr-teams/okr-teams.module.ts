import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrTeamsRoutingModule } from './okr-teams-routing.module';
import { OkrTeamsComponent } from './okr-teams.component';

@NgModule({
  imports: [
    CommonModule,
    OkrTeamsRoutingModule
  ],
  declarations: [OkrTeamsComponent]
})
export class OkrTeamsModule { }
