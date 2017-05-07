import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// 3rd-party library
import { ProgressbarModule } from 'ngx-bootstrap/progressbar'

import { OkrGoalsDetailRoutingModule } from './okr-goals-detail-routing.module';
import { OkrGoalsDetailComponent } from './okr-goals-detail.component';
import { GoalOkrsComponent } from './goal-okrs/goal-okrs.component';
import { GoalActivitiesComponent } from './goal-activities/goal-activities.component';
import { GoalTeamsComponent } from './goal-teams/goal-teams.component';

import {ShareGoalDetailsService} from './share-goal-details.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,

    ProgressbarModule.forRoot(),

    OkrGoalsDetailRoutingModule
  ],
  providers:[ShareGoalDetailsService],
  declarations: [OkrGoalsDetailComponent, GoalOkrsComponent, GoalActivitiesComponent, GoalTeamsComponent]
})
export class OkrGoalsDetailModule { }
