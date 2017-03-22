
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

    { path: 'aboutus', loadChildren: './about/about.module#AboutModule'  },

    { path: 'aboutus/:timeFrame', component: AboutComponent  },
    { path: 'okr',loadChildren:'./okr/okr.module#OkrModule'},
    { path: '404',loadChildren: './not-found/not-found.module#NotFoundModule'},
    { path: 'login',loadChildren:'./login/login.module#LoginModule'},
    // { path: '**', redirectTo: '404', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
