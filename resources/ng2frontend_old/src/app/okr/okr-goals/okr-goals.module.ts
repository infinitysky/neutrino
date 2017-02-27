import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrGoalsRoutingModule } from './okr-goals-routing.module';
import { OkrGoalsComponent } from './okr-goals.component';

@NgModule({
  imports: [
    CommonModule,
    OkrGoalsRoutingModule
  ],
  declarations: [OkrGoalsComponent]
})
export class OkrGoalsModule { }
