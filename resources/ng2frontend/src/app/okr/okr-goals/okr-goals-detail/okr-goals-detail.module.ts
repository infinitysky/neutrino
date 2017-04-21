import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrGoalsDetailRoutingModule } from './okr-goals-detail-routing.module';
import { OkrGoalsDetailComponent } from './okr-goals-detail.component';

@NgModule({
  imports: [
    CommonModule,
    OkrGoalsDetailRoutingModule
  ],
  declarations: [OkrGoalsDetailComponent]
})
export class OkrGoalsDetailModule { }
