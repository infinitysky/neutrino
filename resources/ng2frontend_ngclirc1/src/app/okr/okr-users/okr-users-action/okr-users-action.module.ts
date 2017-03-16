import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrUsersActionRoutingModule } from './okr-users-action-routing.module';
import { OkrUsersActionComponent } from './okr-users-action.component';

@NgModule({
  imports: [
    CommonModule,
    OkrUsersActionRoutingModule
  ],
  declarations: [OkrUsersActionComponent]
})
export class OkrUsersActionModule { }
