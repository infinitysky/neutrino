import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { OkrTeamsRoutingModule } from './okr-teams-routing.module';
import { OkrTeamsComponent } from './okr-teams.component';

import { Ng2TableModule } from 'ng2-table/ng2-table';

@NgModule({
  imports: [
    Ng2TableModule,
    FormsModule,
    HttpModule,
    CommonModule,
    OkrTeamsRoutingModule
  ],
  declarations: [OkrTeamsComponent]
})
export class OkrTeamsModule { }
