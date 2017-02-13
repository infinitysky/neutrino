import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrUsersActivityRoutingModule } from './okr-users-activity-routing.module';
import { OkrUsersActivityComponent } from './okr-users-activity.component';

@NgModule({
  imports: [
    CommonModule,
    OkrUsersActivityRoutingModule
  ],
  declarations: [OkrUsersActivityComponent]
})
export class OkrUsersActivityModule { }
