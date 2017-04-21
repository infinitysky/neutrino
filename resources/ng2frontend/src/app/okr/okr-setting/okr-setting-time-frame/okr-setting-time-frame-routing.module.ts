import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OkrSettingTimeFrameComponent } from './okr-setting-time-frame.component'


const routes: Routes = [
  {path:'', component:OkrSettingTimeFrameComponent}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrSettingTimeFrameRoutingModule { }
