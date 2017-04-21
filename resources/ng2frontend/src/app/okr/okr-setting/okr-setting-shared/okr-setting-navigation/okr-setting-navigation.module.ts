import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrSettingNavigationRoutingModule } from './okr-setting-navigation-routing.module';
import { OkrSettingNavigationComponent } from './okr-setting-navigation.component';

@NgModule({
  imports: [
    CommonModule,
    OkrSettingNavigationRoutingModule
  ],
  declarations: [OkrSettingNavigationComponent]
})
export class OkrSettingNavigationModule { }
