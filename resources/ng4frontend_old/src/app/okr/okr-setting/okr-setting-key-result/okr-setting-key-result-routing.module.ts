import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OkrSettingKeyResultComponent}from './okr-setting-key-result.component';


const routes: Routes = [
  {path:'',component:OkrSettingKeyResultComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrSettingKeyResultRoutingModule { }
