import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {OkrDashboardComponent} from './okr-dashboard.component';
const routes: Routes = [
  {path:'',component:OkrDashboardComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrDashboardRoutingModule { }
