import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OkrOverviewComponent} from './okr-overview.component'
const routes: Routes = [
  {path:'',component:OkrOverviewComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrOverviewRoutingModule { }
