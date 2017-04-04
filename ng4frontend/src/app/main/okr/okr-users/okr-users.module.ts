import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



import { OkrUsersRoutingModule } from './okr-users-routing.module';
import { OkrUsersComponent } from './okr-users.component';
import {OkrUsersActivityComponent} from './okr-users-activity/okr-users-activity.component';
import {OkrUsersTeamsComponent} from './okr-users-teams/okr-users-teams.component';
import { OkrsUsersOkrsComponent } from './okrs-users-okrs/okrs-users-okrs.component';
import { OkrUserOkrTeamComponent } from './okr-user-okr-team/okr-user-okr-team.component';

import {ShareUserOkrinfoService} from './share-user-okrinfo.service';



//3rd party library module
import {ToastyModule} from 'ng2-toasty';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { MultiselectDropdownModule} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { SelectModule} from 'ng2-select';

//import { Ng2LetterAvatar } from "ng2LAjs/ng2letteravatar";

import { Ng2LetterAvatar } from "ng2letteravatar/ng2letteravatar";



@NgModule({
  imports: [
    ToastyModule.forRoot(),
    Ng2Bs3ModalModule,
    MyDatePickerModule,
    MyDateRangePickerModule,
    MultiselectDropdownModule,
    SelectModule,


    HttpModule,
    FormsModule,
    CommonModule,
    OkrUsersRoutingModule
  ],
  providers:[ShareUserOkrinfoService],
  declarations: [OkrUsersComponent,OkrUsersActivityComponent,OkrUsersTeamsComponent, OkrsUsersOkrsComponent,Ng2LetterAvatar, OkrUserOkrTeamComponent]
})
export class OkrUsersModule { }
