import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { ChartsModule } from 'ng2-charts/ng2-charts';

//developed module import here
import { HomeModule } from './home/home.module'
import { AboutModule } from './about/about.module'

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
    ChartsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,


    //Developed Module regist here
      HomeModule,
      AboutModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
