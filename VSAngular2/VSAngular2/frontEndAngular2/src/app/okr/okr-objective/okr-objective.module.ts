import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrObjectiveRoutingModule } from './okr-objective-routing.module';
import { OkrObjectiveComponent } from './okr-objective.component';

@NgModule({
  imports: [
    CommonModule,
    OkrObjectiveRoutingModule
  ],
  declarations: [OkrObjectiveComponent]
})
export class OkrObjectiveModule { }
