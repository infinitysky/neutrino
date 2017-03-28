import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import {} from './play-ground/play-ground.module';


const routes: Routes = [
    { path: '', component: MainComponent,
        children:[

            { path: '', loadChildren: './home/home.module#HomeModule' },
            { path: 'aboutus', loadChildren: './about/about.module#AboutModule'  },
            { path: 'aboutus/:timeFrame', loadChildren: './about/about.module#AboutModule'  },
            { path: 'okr', loadChildren: './okr/okr.module#OkrModule'},
            { path: 'playground', loadChildren: './play-ground/play-ground.module#PlayGroundModule'},
        ]


    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
