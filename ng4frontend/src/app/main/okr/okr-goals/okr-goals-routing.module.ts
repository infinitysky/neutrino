import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {OkrGoalsComponent} from './okr-goals.component';
import { OkrGoalsDetailModule } from './okr-goals-detail/okr-goals-detail.module';
const routes: Routes = [
  { path: '',  component: OkrGoalsComponent },
  { path:'goal', loadChildren: './okr-goals-detail/okr-goals-detail.module#OkrGoalsDetailModule'},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrGoalsRoutingModule { }
