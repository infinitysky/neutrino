import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {OkrObjectivesComponent} from './okr-objectives.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OkrObjectivesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrObjectivesRoutingModule { }
