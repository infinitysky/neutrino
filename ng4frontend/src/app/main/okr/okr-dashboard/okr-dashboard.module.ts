import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrDashboardRoutingModule } from './okr-dashboard-routing.module';
import { OkrDashboardComponent } from './okr-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    OkrDashboardRoutingModule
  ],
  declarations: [OkrDashboardComponent]
})
export class OkrDashboardModule { }
