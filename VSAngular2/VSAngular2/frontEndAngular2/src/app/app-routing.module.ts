
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import {HomeRoutingModule} from './home/index'
import {HomeComponent} from './home/index'
import {AboutComponent} from './about/about.component'

//import {AboutModule}from './about/about.module'



const routes: Routes = [
    //{ path: '', pathMatch: 'full', redirectTo: 'HomeComponent' },


    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },

    { path: 'aboutus', component: AboutComponent  },

    { path: '**', component: HomeComponent },




 // {
 //   path: '',
 //   children: []
 // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
