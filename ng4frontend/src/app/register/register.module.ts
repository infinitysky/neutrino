import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        RegisterRoutingModule
    ],
    declarations: [RegisterComponent]
})
export class RegisterModule { }
