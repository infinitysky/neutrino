import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrObjectivesDetailRoutingModule } from './okr-objectives-detail-routing.module';
import { OkrObjectivesDetailComponent } from './okr-objectives-detail.component';

@NgModule({
  imports: [
    CommonModule,
    OkrObjectivesDetailRoutingModule
  ],
  declarations: [OkrObjectivesDetailComponent]
})
export class OkrObjectivesDetailModule { }
