import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OkrUsersComponent} from './okr-users.component'
const routes: Routes = [
  {path:'',component:OkrUsersComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrUsersRoutingModule { }
