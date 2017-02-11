import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrUsersRoutingModule } from './okr-users-routing.module';
import { OkrUsersComponent } from './okr-users.component';

@NgModule({
  imports: [
    CommonModule,
    OkrUsersRoutingModule
  ],
  declarations: [OkrUsersComponent]
})
export class OkrUsersModule { }
