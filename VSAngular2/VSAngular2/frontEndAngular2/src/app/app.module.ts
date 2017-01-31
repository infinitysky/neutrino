import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderpageComponent } from './headerpage/headerpage.component';
import { OkrOverviewComponent } from './okr-overview/okr-overview.component';
import { FooterpageComponent } from './footerpage/footerpage.component';
import { OkrDashboardComponent } from './okr-dashboard/okr-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderpageComponent,
    OkrOverviewComponent,
    FooterpageComponent,
    OkrDashboardComponent,
    
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
