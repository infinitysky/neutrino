import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrRoutingModule } from './okr-routing.module';
import { OkrComponent } from './okr.component';

import { OkrSettingModule } from './okr-setting/okr-setting.module'


@NgModule({
  imports: [
    CommonModule,
    OkrRoutingModule,
    OkrSettingModule
  ],
  declarations: [OkrComponent]
})
export class OkrModule { }
