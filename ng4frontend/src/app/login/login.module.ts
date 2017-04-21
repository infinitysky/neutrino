import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { ControlMessagesComponent } from './control-messages/control-messages.component';
import {ValidationService} from '../shared/services/validation.service';

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule

    ],


    declarations: [LoginComponent, ControlMessagesComponent],
    providers: [ ValidationService ]
})
export class LoginModule { }
