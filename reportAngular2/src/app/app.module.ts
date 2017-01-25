import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [

    AppComponent,
    ReportComponent
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
