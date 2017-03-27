import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


@NgModule({
    imports: [

        FormsModule,
        HttpModule,
        CommonModule,
        LoginRoutingModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
