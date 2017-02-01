import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrOverviewRoutingModule } from './okr-overview-routing.module';
import { OkrOverviewComponent } from './okr-overview.component';

@NgModule({
  imports: [
    CommonModule,
    OkrOverviewRoutingModule
  ],
  declarations: [OkrOverviewComponent]
})
export class OkrOverviewModule { }
