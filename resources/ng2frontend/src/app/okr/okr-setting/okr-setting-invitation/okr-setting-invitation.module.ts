import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrSettingInvitationRoutingModule } from './okr-setting-invitation-routing.module';
import { OkrSettingInvitationComponent } from './okr-setting-invitation.component';

@NgModule({
  imports: [
    CommonModule,
    OkrSettingInvitationRoutingModule
  ],
  declarations: [OkrSettingInvitationComponent]
})
export class OkrSettingInvitationModule { }
