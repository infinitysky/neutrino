import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OkrGoalsRoutingModule } from './okr-goals-routing.module';
import { OkrGoalsComponent } from './okr-goals.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  imports: [
    PopoverModule.forRoot(),
    AccordionModule.forRoot(),
    CommonModule,
    OkrGoalsRoutingModule
  ],
  declarations: [OkrGoalsComponent]
})
export class OkrGoalsModule { }
