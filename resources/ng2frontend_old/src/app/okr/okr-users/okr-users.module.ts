import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrUsersRoutingModule } from './okr-users-routing.module';
import { OkrUsersComponent } from './okr-users.component';


import {OkrUsersActivityComponent} from './okr-users-activity/okr-users-activity.component';
import {OkrUsersTeamsComponent} from './okr-users-teams/okr-users-teams.component';
import {UserInfoContainerService} from '../../shared/services/user-info-container.service';


import {TruncatePipe} from '../../shared/services/truncate-pipe';


@NgModule({
  imports: [
    CommonModule,
    OkrUsersRoutingModule
  ],
  declarations: [OkrUsersComponent,OkrUsersActivityComponent,OkrUsersTeamsComponent]
})
export class OkrUsersModule { }
