import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrTeamsDetailRoutingModule } from './okr-teams-detail-routing.module';
import { OkrTeamsDetailComponent } from './okr-teams-detail.component';


import { TruncateModule } from 'ng2-truncate';

import {OkrTeamsMembersComponent} from '../okr-teams-members/okr-teams-members.component';
import {OkrTeamsActivityComponent} from '../okr-teams-activity/okr-teams-activity.component';

@NgModule({
  imports: [
    TruncateModule,
    CommonModule,
    OkrTeamsDetailRoutingModule
  ],
  declarations: [OkrTeamsDetailComponent,OkrTeamsMembersComponent,OkrTeamsActivityComponent ]
})
export class OkrTeamsDetailModule { }
