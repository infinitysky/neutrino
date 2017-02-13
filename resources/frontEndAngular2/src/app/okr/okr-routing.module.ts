import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { OkrComponent } from './okr.component';

// import { OkrSettingModule } from './okr-setting/okr-setting.module';
// import {OkrOverviewModule} from './okr-overview/okr-overview.module';
// import {OkrDashboardModule} from './okr-dashboard/okr-dashboard.module';



const routes: Routes = [
  { path: '', redirectTo: 'okr-setting', pathMatch: 'full'},
  { path:'okr-setting', loadChildren:'./okr-setting/okr-setting.module#OkrSettingModule' },
  { path:'okr-overview', loadChildren:'./okr-overview/okr-overview.module#OkrOverviewModule' },
  { path:'okr-dashboard', loadChildren:'./okr-dashboard/okr-dashboard.module#OkrDashboardModule' },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrRoutingModule { }
