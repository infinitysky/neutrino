import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrUsersRoutingModule } from './okr-users-routing.module';
import { OkrUsersComponent } from './okr-users.component';

import {UserInfoContainerService} from '../okr-shared/services/user-info-container.service';

@NgModule({
  imports: [
    CommonModule,
    OkrUsersRoutingModule
  ],
  declarations: [OkrUsersComponent]
})
export class OkrUsersModule { }
