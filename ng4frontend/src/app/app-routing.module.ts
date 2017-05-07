
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from './shared/guards/auth.guard';

const routes: Routes = [



  /* login status check */
  { path: '',  loadChildren: './main/main.module#MainModule', canActivate:[AuthGuard]},

  { path: '404', loadChildren: './not-found/not-found.module#NotFoundModule'},
  { path: 'login', loadChildren: './login/login.module#LoginModule'},
  { path: 'register', loadChildren: './register/register.module#RegisterModule'},
  { path: '**', redirectTo: '404', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
