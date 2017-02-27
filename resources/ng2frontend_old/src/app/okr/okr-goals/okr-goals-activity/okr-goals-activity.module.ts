import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrGoalsActivityRoutingModule } from './okr-goals-activity-routing.module';
import { OkrGoalsActivityComponent } from './okr-goals-activity.component';

@NgModule({
  imports: [
    CommonModule,
    OkrGoalsActivityRoutingModule
  ],
  declarations: [OkrGoalsActivityComponent]
})
export class OkrGoalsActivityModule { }
