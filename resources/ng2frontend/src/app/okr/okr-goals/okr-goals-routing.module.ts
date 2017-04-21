import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {OkrGoalsComponent} from './okr-goals.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OkrGoalsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrGoalsRoutingModule { }
