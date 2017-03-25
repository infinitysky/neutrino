import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {OkrTeamsComponent} from './okr-teams.component';



const routes: Routes = [
  { path: '', pathMatch: 'full',    component: OkrTeamsComponent },
  {path:'team-detail',loadChildren:'./okr-teams-detail/okr-teams-detail.module#OkrTeamsDetailModule'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrTeamsRoutingModule { }
