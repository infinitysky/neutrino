import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OkrSettingComponent } from './okr-setting.component'


// import { OkrSettingTimeFrameModule } from './okr-setting-time-frame/okr-setting-time-frame.module'
// import {OkrSettingTeamModule} from './okr-setting-team/okr-setting-team.module';
// import {OkrSettingGoalModule} from './okr-setting-goal/okr-setting-goal.module';
// import {OkrSettingObjectiveModule} from './okr-setting-objective/okr-setting-objective.module';
// import {OkrSettingKeyResultModule} from './okr-setting-key-result/okr-setting-key-result.module';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OkrSettingComponent
  },
  {
    path: 'setting-team',
    loadChildren: './okr-setting-team/okr-setting-team.module#OkrSettingTeamModule'
  },
  {
    path: 'setting-time-frame',
    loadChildren: './okr-setting-time-frame/okr-setting-time-frame.module#OkrSettingTimeFrameModule'
  },
  {
    path: 'setting-goal',
    loadChildren: './okr-setting-goal/okr-setting-goal.module#OkrSettingGoalModule'
  },
  {
    path: 'setting-objective',
    loadChildren: './okr-setting-objective/okr-setting-objective.module#OkrSettingObjectiveModule'
  },
  {
    path: 'setting-key-result',
    loadChildren: './okr-setting-key-result/okr-setting-key-result.module#OkrSettingKeyResultModule'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrSettingRoutingModule { }
