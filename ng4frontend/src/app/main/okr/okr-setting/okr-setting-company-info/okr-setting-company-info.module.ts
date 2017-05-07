import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OkrSettingCompanyInfoRoutingModule } from './okr-setting-company-info-routing.module';
import { OkrSettingCompanyInfoComponent } from './okr-setting-company-info.component';

@NgModule({
  imports: [
    CommonModule,
    OkrSettingCompanyInfoRoutingModule
  ],
  declarations: [OkrSettingCompanyInfoComponent]
})
export class OkrSettingCompanyInfoModule { }
