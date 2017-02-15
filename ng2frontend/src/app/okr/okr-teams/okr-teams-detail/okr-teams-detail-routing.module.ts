import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OkrTeamsDetailComponent} from './okr-teams-detail.component';
const routes: Routes = [
  {path:'team/:id',component:OkrTeamsDetailComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrTeamsDetailRoutingModule { }
