import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OkrSettingObjectiveComponent} from './okr-setting-objective.component';

const routes: Routes = [
  {path:'', component:OkrSettingObjectiveComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrSettingObjectiveRoutingModule { }
