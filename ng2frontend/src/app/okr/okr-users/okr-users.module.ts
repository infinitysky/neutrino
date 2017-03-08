import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrUsersRoutingModule } from './okr-users-routing.module';
import { OkrUsersComponent } from './okr-users.component';
import { FormsModule } from '@angular/forms';

import {OkrUsersActivityComponent} from './okr-users-activity/okr-users-activity.component';
import {OkrUsersTeamsComponent} from './okr-users-teams/okr-users-teams.component';
import {UserInfoContainerService} from '../../shared/services/user-info-container.service';



//3rd party library module
import {ToastyModule} from 'ng2-toasty';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { MultiselectDropdownModule} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { SelectModule} from 'ng2-select';
import { OkrsUsersOkrsComponent } from './okrs-users-okrs/okrs-users-okrs.component';





@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    OkrUsersRoutingModule
  ],
  declarations: [OkrUsersComponent,OkrUsersActivityComponent,OkrUsersTeamsComponent, OkrsUsersOkrsComponent]
})
export class OkrUsersModule { }
