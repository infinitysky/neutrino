import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayGroundRoutingModule } from './play-ground-routing.module';
import { PlayGroundComponent } from './play-ground.component';

@NgModule({
  imports: [
    CommonModule,
    PlayGroundRoutingModule
  ],
  declarations: [PlayGroundComponent]
})
export class PlayGroundModule { }
