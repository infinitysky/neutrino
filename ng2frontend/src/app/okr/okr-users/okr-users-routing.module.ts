import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OkrUsersComponent} from './okr-users.component';



const routes: Routes = [
  {path:'overview', loadChildren:'./okr-users-overview/okr-users-overview.module#OkrUsersOverviewModule'},
  {path:'user/:timeframeid/:userid',component:OkrUsersComponent },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrUsersRoutingModule { }
