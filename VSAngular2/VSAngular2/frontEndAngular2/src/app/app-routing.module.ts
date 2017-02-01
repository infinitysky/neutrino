
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import {HomeRoutingModule} from './home/index'
import {HomeComponent} from './home/index';
import {AboutComponent} from './about/about.component';



//import {AboutModule}from './about/about.module';

//import { OkrModule } from './okr/okr.module';

// import { OkrOverviewModule } from  './okr/okr-overview/okr-overview.module';
// import { OkrModule } from './okr/okr.module';

const routes: Routes = [



    { path: '', redirectTo: 'home', pathMatch: 'full'},


    { path: 'home', component: HomeComponent },
    { path: 'aboutus', component: AboutComponent  },
    { path: 'okr',loadChildren:'./okr/okr.module#OkrModule'},
    // { path: 'okr-setting', component: OkrSettingComponent  },
    //{path:'okr-setting',loadChildren:'./okr/okr-setting/okr-setting.module#OkrSettingModule'},
    //{path:'okr-overview',loadChildren:'./okr/okr-overview/okr-overview.module#OkrOverviewModule'},



    //{ path: '**', component: HomeComponent },
/*
*
* const routes: Routes = [
 { path: '', redirectTo: 'eager', pathMatch: 'full' },
 { path: 'eager', component: EagerComponent },
 { path: 'lazy', loadChildren: 'app/lazy/lazy.module#LazyModule' }
 ];

 *
* */

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
