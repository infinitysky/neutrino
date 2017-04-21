import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OkrGoalsRoutingModule } from './okr-goals-routing.module';
import { OkrGoalsComponent } from './okr-goals.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
    imports: [
        AccordionModule.forRoot(),
        CommonModule,
        OkrGoalsRoutingModule
    ],
    declarations: [OkrGoalsComponent]
})
export class OkrGoalsModule { }
