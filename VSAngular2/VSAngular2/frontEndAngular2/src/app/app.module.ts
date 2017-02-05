import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import {CalendarModule} from 'primeng/primeng';

import { DataTableModule, SharedModule } from 'primeng/primeng';


//developed module import here
import { HomeModule } from './home/home.module'
import { AboutModule } from './about/about.module'
import {OkrModule} from './okr/okr.module'

//developed component import here
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderpageComponent } from './headerpage/headerpage.component';
import { FooterpageComponent } from './footerpage/footerpage.component';


@NgModule({
  declarations: [
    AppComponent,

    //developed component regist here
    NavigationComponent,
    HeaderpageComponent,
    FooterpageComponent,




  ],
  imports: [
    DataTableModule,
    SharedModule,
    CalendarModule,

    ChartsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,



    //Developed Module regist here
    HomeModule,
    AboutModule,
    OkrModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
