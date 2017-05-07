import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';

import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {SelectModule} from 'ng2-select';




import { OkrSettingModule } from './okr-setting/okr-setting.module'
import { OkrRoutingModule } from './okr-routing.module';
import { OkrComponent } from './okr.component';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HttpModule,

    Ng2Bs3ModalModule,
    MyDatePickerModule,
    MyDateRangePickerModule,
    MultiselectDropdownModule,
    SelectModule,

    OkrRoutingModule,
    OkrSettingModule
  ],
  declarations: [OkrComponent]
})
export class OkrModule { }
