import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';

const routes: Routes = [
    {
        path: 'about',
        component: AboutComponent
    },

    {
        path: 'about/:userId',
        component: AboutComponent
    },
    {
        path: '/:userId/:timFrameId',
        component: AboutComponent
    },
    {
        path: '/:userId',
        component: AboutComponent
    },


    {
        path: '',
        component: AboutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AboutRoutingModule { }
