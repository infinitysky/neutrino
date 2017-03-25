import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { ChartsModule } from 'ng2-charts/ng2-charts';

import { OkrOverviewRoutingModule } from './okr-overview-routing.module';
import { OkrOverviewComponent } from './okr-overview.component';



@NgModule({
  imports: [

    ChartsModule,

    FormsModule,
    HttpModule,
    CommonModule,
    OkrOverviewRoutingModule
  ],
  declarations: [OkrOverviewComponent]
})
export class OkrOverviewModule { }
