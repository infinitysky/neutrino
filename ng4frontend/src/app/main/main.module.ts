import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderpageComponent } from './headerpage/headerpage.component';
import { FooterpageComponent } from './footerpage/footerpage.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        MainRoutingModule
    ],
    declarations: [
        MainComponent,
        HeaderpageComponent,
        FooterpageComponent,
        NavigationComponent
    ]
})
export class MainModule { }
