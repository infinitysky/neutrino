import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { OkrTeamsRoutingModule } from './okr-teams-routing.module';
import { OkrTeamsComponent } from './okr-teams.component';
import {OkrTeamsDetailModule} from './okr-teams-detail/okr-teams-detail.module';

// 3rd party library
import { DoorgetsTruncateModule } from 'doorgets-ng-truncate';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@NgModule({
    imports: [

        ProgressbarModule.forRoot(),
        FormsModule,
        HttpModule,
        CommonModule,

        DoorgetsTruncateModule,
        OkrTeamsDetailModule,
        OkrTeamsRoutingModule
    ],
    declarations: [OkrTeamsComponent ]
})
export class OkrTeamsModule { }
