import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OkrSettingComponent } from './okr-setting.component'
//import { OkrSettingTimeFrameModule } from './okr-setting-time-frame/okr-setting-time-frame.module'
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OkrSettingComponent
  },
  {
    path: 'setting-time-frame',
    loadChildren: './okr-setting-time-frame/okr-setting-time-frame.module#OkrSettingTimeFrameModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrSettingRoutingModule { }
