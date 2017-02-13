import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrObjectivesOverviewRoutingModule } from './okr-objectives-overview-routing.module';
import { OkrObjectivesOverviewComponent } from './okr-objectives-overview.component';

@NgModule({
  imports: [
    CommonModule,
    OkrObjectivesOverviewRoutingModule
  ],
  declarations: [OkrObjectivesOverviewComponent]
})
export class OkrObjectivesOverviewModule { }
