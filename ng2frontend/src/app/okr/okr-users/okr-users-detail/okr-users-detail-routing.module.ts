import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {OkrUsersDetailComponent} from './okr-users-detail.component'
const routes: Routes = [
  { path:'detail/:id',component:OkrUsersDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrUsersDetailRoutingModule { }
