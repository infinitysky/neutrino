import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrGoalsOverviewRoutingModule } from './okr-goals-overview-routing.module';
import { OkrGoalsOverviewComponent } from './okr-goals-overview.component';

@NgModule({
  imports: [
    CommonModule,
    OkrGoalsOverviewRoutingModule
  ],
  declarations: [OkrGoalsOverviewComponent]
})
export class OkrGoalsOverviewModule { }
