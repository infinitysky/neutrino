import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { OkrTeamsRoutingModule } from './okr-teams-routing.module';
import { OkrTeamsComponent } from './okr-teams.component';
import {OkrTeamsDetailModule} from './okr-teams-detail/okr-teams-detail.module';


import { Ng2SmartTableModule } from 'ng2-smart-table';



import {TruncatePipe} from '../../shared/services/truncate-pipe';

@NgModule({
  imports: [
    Ng2SmartTableModule,
    FormsModule,
    HttpModule,
    CommonModule,
    OkrTeamsDetailModule,
    OkrTeamsRoutingModule
  ],
  declarations: [OkrTeamsComponent, TruncatePipe]
})
export class OkrTeamsModule { }
