import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {OkrSettingTeamComponent} from './okr-setting-team.component';
const routes: Routes = [
  {path:'',component:OkrSettingTeamComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrSettingTeamRoutingModule { }
