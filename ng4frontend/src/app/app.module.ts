import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

// 3rd-party library
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DoorgetsTruncateModule } from 'doorgets-ng-truncate';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';

import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {SelectModule} from 'ng2-select';


// import { Ng2LetterAvatar } from "node_modules/ng2letteravatar/ng2letteravatar.js";

// developed module import here

import { MainModule } from './main/main.module';
import { LoginModule } from './login/login.module';



// developed component import here
import { AppComponent } from './app.component';

// developed services here
import {UserInfoContainerService} from './shared/services/user-info-container.service'; // global var services
import { CookieService } from './shared/services/cookie.service';

import { AuthGuard } from './shared/guards/auth.guard';
import {AuthenticationService} from './shared/services/authentication.service';
// enableProdMode();


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [


        MyDatePickerModule,
        MyDateRangePickerModule,
        MultiselectDropdownModule,
        SelectModule,



        Ng2Bs3ModalModule,


        ChartsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,

        DoorgetsTruncateModule,

        // Developed Module regist here
        LoginModule,
        MainModule,

    ],
    // sign the UserInfoContainerService as a global data store service.
    providers: [UserInfoContainerService, CookieService, AuthGuard,AuthenticationService],

    bootstrap: [AppComponent]
})

export class AppModule { }
