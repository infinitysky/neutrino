import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { OkrTeamsRoutingModule } from './okr-teams-routing.module';
import { OkrTeamsComponent } from './okr-teams.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    Ng2SmartTableModule,
    FormsModule,
    HttpModule,
    CommonModule,
    OkrTeamsRoutingModule
  ],
  declarations: [OkrTeamsComponent]
})
export class OkrTeamsModule { }
