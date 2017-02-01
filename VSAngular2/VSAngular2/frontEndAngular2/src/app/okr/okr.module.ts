import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrRoutingModule } from './okr-routing.module';
import { OkrComponent } from './okr.component';

@NgModule({
  imports: [
    CommonModule,
    OkrRoutingModule
  ],
  declarations: [OkrComponent]
})
export class OkrModule { }
