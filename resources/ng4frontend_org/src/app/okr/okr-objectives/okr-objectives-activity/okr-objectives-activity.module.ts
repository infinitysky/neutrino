import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrObjectivesActivityRoutingModule } from './okr-objectives-activity-routing.module';
import { OkrObjectivesActivityComponent } from './okr-objectives-activity.component';

@NgModule({
  imports: [
    CommonModule,
    OkrObjectivesActivityRoutingModule
  ],
  declarations: [OkrObjectivesActivityComponent]
})
export class OkrObjectivesActivityModule { }
