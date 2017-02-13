import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrUsersOverviewRoutingModule } from './okr-users-overview-routing.module';
import { OkrUsersOverviewComponent } from './okr-users-overview.component';

@NgModule({
  imports: [
    CommonModule,
    OkrUsersOverviewRoutingModule
  ],
  declarations: [OkrUsersOverviewComponent]
})
export class OkrUsersOverviewModule { }
