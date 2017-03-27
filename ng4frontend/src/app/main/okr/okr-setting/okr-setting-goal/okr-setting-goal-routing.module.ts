import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {OkrSettingGoalComponent} from './okr-setting-goal.component';
const routes: Routes = [
  {path:'',component:OkrSettingGoalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrSettingGoalRoutingModule { }
