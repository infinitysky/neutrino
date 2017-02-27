import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrUsersTeamsRoutingModule } from './okr-users-teams-routing.module';
import { OkrUsersTeamsComponent } from './okr-users-teams.component';

import { TruncateModule } from 'ng2-truncate';

@NgModule({
  imports: [
    TruncateModule,
    CommonModule,
    OkrUsersTeamsRoutingModule
  ],
  declarations: [OkrUsersTeamsComponent]
})
export class OkrUsersTeamsModule { }
