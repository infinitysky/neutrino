import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrUsersDetailRoutingModule } from './okr-users-detail-routing.module';
import { OkrUsersDetailComponent } from './okr-users-detail.component';

@NgModule({
  imports: [
    CommonModule,
    OkrUsersDetailRoutingModule
  ],
  declarations: [OkrUsersDetailComponent]
})
export class OkrUsersDetailModule { }
