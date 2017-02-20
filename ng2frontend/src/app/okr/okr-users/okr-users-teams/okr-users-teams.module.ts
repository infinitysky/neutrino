import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrUsersTeamsRoutingModule } from './okr-users-teams-routing.module';
import { OkrUsersTeamsComponent } from './okr-users-teams.component';

@NgModule({
  imports: [
    CommonModule,
    OkrUsersTeamsRoutingModule
  ],
  declarations: [OkrUsersTeamsComponent]
})
export class OkrUsersTeamsModule { }
