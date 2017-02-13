import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrObjectivesRoutingModule } from './okr-objectives-routing.module';
import { OkrObjectivesComponent } from './okr-objectives.component';

@NgModule({
  imports: [
    CommonModule,
    OkrObjectivesRoutingModule
  ],
  declarations: [OkrObjectivesComponent]
})
export class OkrObjectivesModule { }
