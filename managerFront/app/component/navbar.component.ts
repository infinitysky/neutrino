import {Component,Input} from 'angular2/core';
import {RouterOutlet, RouteConfig, RouteDefinition} from 'angular2/router';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {APP_ROUTES} from '../../app/route.config';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouterLink} from 'angular2/router';




import { DatabaseManagerment } from './databaseManagerment.component';


//declare var in the javascript

declare var version_config : any;
declare var cn_au_menus: any;
declare var language_id :any;



@Component({
	selector: 'nav-bar',
	templateUrl: './app/view/navbar.view.html',
	styleUrls: [],
	directives: [DatabaseManagerment]
	

})


/* example*/





export class Navbar {



	versionConfigs : any;
	menus : any;
	languageId : string;
	menusOption:any;


	constructor() {
	


		this.versionConfigs=version_config;
		this.menusOption=cn_au_menus;
		this.languageId=language_id;



		this.languageId='au';


		if('au'==this.languageId){
			this.menus=this.menusOption.au;
		}
		if('cn'==this.languageId){
			this.menus=this.menusOption.cn;
		}


		console.log(this.menus);


		// console.log(this.versionConfigs);
		// console.log(this.menus);
		// console.log(this.languageId);

	}




/*

way 2

	public versionConfigs = version_config;
	public menus = cn_au_menus;
	public languageId= language_id;

	constructor() {
	//	this.languageId=language_id;
		console.log(this.menus);
		console.log(this.languageId);

	}


*/


}



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/