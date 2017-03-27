import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';







@NgModule({
  imports: [

    FormsModule,
    HttpModule,

    CommonModule,
    AboutRoutingModule
  ],
  providers: [],
  declarations: [AboutComponent]
})
export class AboutModule { }
