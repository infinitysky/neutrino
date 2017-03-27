import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { OkrTeamsDetailRoutingModule } from './okr-teams-detail-routing.module';
import { OkrTeamsDetailComponent } from './okr-teams-detail.component';



//3rd party library module

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NouisliderModule } from 'ng2-nouislider';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { MultiselectDropdownModule} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { SelectModule} from 'ng2-select';
import { DoorgetsTruncateModule } from 'doorgets-ng-truncate';



import {OkrTeamsMembersComponent} from '../okr-teams-members/okr-teams-members.component';
import {OkrTeamsActivityComponent} from './okr-teams-activity/okr-teams-activity.component';
import {OkrTeamsOkrComponent} from './okr-teams-okr/okr-teams-okr.component';
import { ShareTeamsOkrinfoService } from '../share-teams-okrinfo.service';

@NgModule({
    imports: [
        Ng2Bs3ModalModule,
        NouisliderModule,
        MyDatePickerModule,
        MyDateRangePickerModule,
        MultiselectDropdownModule,
        SelectModule,

        DoorgetsTruncateModule,
        FormsModule,
        HttpModule,
        CommonModule,
        OkrTeamsDetailRoutingModule
    ],
    providers:[ShareTeamsOkrinfoService],
    declarations: [OkrTeamsDetailComponent, OkrTeamsMembersComponent, OkrTeamsActivityComponent, OkrTeamsOkrComponent ]
})
export class OkrTeamsDetailModule { }
