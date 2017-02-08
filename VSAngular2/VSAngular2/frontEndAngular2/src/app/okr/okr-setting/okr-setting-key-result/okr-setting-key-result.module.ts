import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrSettingKeyResultRoutingModule } from './okr-setting-key-result-routing.module';
import { OkrSettingKeyResultComponent } from './okr-setting-key-result.component';

@NgModule({
  imports: [
    CommonModule,
    OkrSettingKeyResultRoutingModule
  ],
  declarations: [OkrSettingKeyResultComponent]
})
export class OkrSettingKeyResultModule { }
