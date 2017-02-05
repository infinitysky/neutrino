import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';



import {CalendarModule} from 'primeng/primeng';

@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    CalendarModule,
    CommonModule,
    AboutRoutingModule
  ],
  providers: [],
  declarations: [AboutComponent]
})
export class AboutModule { }
