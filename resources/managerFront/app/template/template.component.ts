import {Component} from 'angular2/core';

interface Hero {
	id: number;
	name: string;
}

@Component({
	selector: 'report-system',
	templateUrl: './app/template/template.html'
})
export class template {
	public title = 'Tour of Heroes';
	public hero: Hero = {
		id: 1,
		name: 'Windstorm'
	};
}



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/