import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { OkrComponent } from './okr.component';

// import { OkrSettingModule } from './okr-setting/okr-setting.module';
// import {OkrOverviewModule} from './okr-overview/okr-overview.module';
// import {OkrDashboardModule} from './okr-dashboard/okr-dashboard.module';

import {OkrUsersModule} from './okr-users/okr-users.module';
import {OkrTeamsModule} from './okr-teams/okr-teams.module';
import {OkrGoalsModule} from './okr-goals/okr-goals.module';
import {OkrObjectivesModule} from './okr-objectives/okr-objectives.module';
import {OkrCompanyModule} from './okr-company/okr-company.module';


const routes: Routes = [
  { path: '', redirectTo: 'okr-setting', pathMatch: 'full'},
  { path: 'okr-setting', loadChildren: './okr-setting/okr-setting.module#OkrSettingModule' },
  { path: 'okr-overview', loadChildren: './okr-overview/okr-overview.module#OkrOverviewModule' },
  { path: 'okr-dashboard', loadChildren: './okr-dashboard/okr-dashboard.module#OkrDashboardModule' },
  { path: 'okr-users', loadChildren: './okr-users/okr-users.module#OkrUsersModule' },
  { path: 'okr-teams', loadChildren: './okr-teams/okr-teams.module#OkrTeamsModule' },
  { path: 'okr-goals', loadChildren: './okr-goals/okr-goals.module#OkrGoalsModule' },
  { path: 'okr-objectives', loadChildren: './okr-objectives/okr-objectives.module#OkrObjectivesModule' },
  { path: 'okr-company', loadChildren: './okr-company/okr-company.module#OkrCompanyModule' },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OkrRoutingModule { }
