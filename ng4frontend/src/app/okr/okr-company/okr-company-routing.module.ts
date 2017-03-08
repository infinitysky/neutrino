import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {OkrCompanyComponent} from './okr-company.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OkrCompanyComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrCompanyRoutingModule { }
