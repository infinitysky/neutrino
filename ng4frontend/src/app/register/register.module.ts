import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ControlMessagesComponent } from './control-messages/control-messages.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        CommonModule,
        RegisterRoutingModule
    ],
    declarations: [RegisterComponent, ControlMessagesComponent]
})
export class RegisterModule { }
