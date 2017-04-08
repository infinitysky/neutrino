import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        LoginRoutingModule,
      ReactiveFormsModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
