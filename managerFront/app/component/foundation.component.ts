import {Component} from 'angular2/core';
import { Navbar } from '../component/navbar.component';
import { Dashboard } from '../component/dashboard.component';


import {RouterOutlet, RouteConfig, RouteDefinition} from 'angular2/router';
import {APP_ROUTES} from '../../app/route.config';


@Component({
  selector: 'report-system',
  templateUrl: './app/view/foundation.view.html',
  directives: [Navbar]
})


export class Foundation {

  
}



/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */