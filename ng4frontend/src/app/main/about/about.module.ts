import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';




import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
    imports: [
        ModalModule.forRoot(),

        FormsModule,
        HttpModule,

        CommonModule,
        AboutRoutingModule
    ],
    providers: [],
    declarations: [AboutComponent]
})
export class AboutModule { }
