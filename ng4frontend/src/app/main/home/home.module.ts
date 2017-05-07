import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


// 3rd-party library
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { ChartsModule } from 'ng2-charts';
@NgModule({
  imports: [


    ProgressbarModule.forRoot(),
    ChartsModule,
    CommonModule,
    FormsModule,
    HttpModule,

    HomeRoutingModule,


  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
