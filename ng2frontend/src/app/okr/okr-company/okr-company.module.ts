import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrCompanyRoutingModule } from './okr-company-routing.module';
import { OkrCompanyComponent } from './okr-company.component';

@NgModule({
  imports: [
    CommonModule,
    OkrCompanyRoutingModule
  ],
  declarations: [OkrCompanyComponent]
})
export class OkrCompanyModule { }
