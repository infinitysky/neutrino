import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

import { AuthGuard } from '../shared/guards/auth.guard';


const routes: Routes = [
    { path: '', component: MainComponent, canActivate: [AuthGuard],

        children:[
            // { path: '', redirectTo: 'home', pathMatch: 'full' },

            { path: '', loadChildren: './home/home.module#HomeModule' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'okr', loadChildren: './okr/okr.module#OkrModule'},
            { path: 'playground', loadChildren: './play-ground/play-ground.module#PlayGroundModule'},
            { path: 'aboutus', loadChildren: './about/about.module#AboutModule'  },
            { path: 'aboutus/:userid', loadChildren: './about/about.module#AboutModule'  },
            { path: 'aboutus/:userid/:timeFrameId', loadChildren: './about/about.module#AboutModule'  },


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
