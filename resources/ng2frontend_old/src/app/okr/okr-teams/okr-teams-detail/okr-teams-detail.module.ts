import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrTeamsDetailRoutingModule } from './okr-teams-detail-routing.module';
import { OkrTeamsDetailComponent } from './okr-teams-detail.component';


import {OkrTeamsMembersModule} from '../okr-teams-members/okr-teams-members.module';

import {OkrTeamsMembersComponent} from '../okr-teams-members/okr-teams-members.component';

@NgModule({
  imports: [
    OkrTeamsMembersModule,
    CommonModule,
    OkrTeamsDetailRoutingModule
  ],
  declarations: [OkrTeamsDetailComponent,OkrTeamsMembersComponent ]
})
export class OkrTeamsDetailModule { }
