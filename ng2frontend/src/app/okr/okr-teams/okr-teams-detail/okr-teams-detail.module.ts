import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrTeamsDetailRoutingModule } from './okr-teams-detail-routing.module';
import { OkrTeamsDetailComponent } from './okr-teams-detail.component';

@NgModule({
  imports: [
    CommonModule,
    OkrTeamsDetailRoutingModule
  ],
  declarations: [OkrTeamsDetailComponent]
})
export class OkrTeamsDetailModule { }
