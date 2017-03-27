
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [




    { path: '',  loadChildren: './main/main.module#MainModule'},

    { path: '404', loadChildren: './not-found/not-found.module#NotFoundModule'},
    { path: 'login', loadChildren: './login/login.module#LoginModule'},
    { path: 'register', loadChildren: './login/login.module#LoginModule'},
    // { path: '**', redirectTo: '404', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
