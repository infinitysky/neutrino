import { BrowserModule } from '@angular/platform-browser';
import { NgModule,enableProdMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

//3rd-party library
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {CalendarModule} from 'primeng/primeng';
import { TruncateModule } from 'ng2-truncate';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';


import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';

import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {SelectModule} from 'ng2-select';




//developed module import here
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import {OkrModule} from './okr/okr.module';
import {NotFoundModule} from './not-found/not-found.module';

//developed component import here
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderpageComponent } from './headerpage/headerpage.component';
import { FooterpageComponent } from './footerpage/footerpage.component';

//developed services here
import {UserInfoContainerService}from'./shared/services/user-info-container.service'; //global var services

import {SharedInfoService}from'./shared/services/shared-info.service'; //global var services



//enableProdMode();


@NgModule({
  declarations: [
    AppComponent,

    //developed component regist here
    NavigationComponent,
    HeaderpageComponent,
    FooterpageComponent,





  ],
  imports: [




    MyDatePickerModule,
    MyDateRangePickerModule,
    MultiselectDropdownModule,
    SelectModule,



    Ng2Bs3ModalModule,


    TruncateModule,

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
  //sign the UserInfoContainerService as a global data store service.
  providers: [UserInfoContainerService,SharedInfoService],

  bootstrap: [AppComponent]
})

export class AppModule { }
