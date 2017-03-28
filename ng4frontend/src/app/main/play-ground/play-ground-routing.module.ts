import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayGroundComponent } from './play-ground.component';
const routes: Routes = [
    {path: '', component: PlayGroundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayGroundRoutingModule { }
