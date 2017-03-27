import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [
    { path: '', component: MainComponent,
        children:[
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'aboutus', loadChildren: './about/about.module#AboutModule'  },
            { path: 'aboutus/:timeFrame', loadChildren: './about/about.module#AboutModule'  },
            { path: 'okr', loadChildren: './okr/okr.module#OkrModule'},
        ]


    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
