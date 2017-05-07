import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OkrGoalsDetailComponent } from './okr-goals-detail.component';
const routes: Routes = [
  { path: ':goalId', component: OkrGoalsDetailComponent },

  { path: '', component: OkrGoalsDetailComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrGoalsDetailRoutingModule { }
