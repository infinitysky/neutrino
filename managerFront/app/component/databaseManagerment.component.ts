import {Component,OnInit} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {Http, Response} from 'angular2/http';


import {DatabasesService} from '../service/database.services';
import {DatabasesClass} from '../interface/database'

@Component({
	selector: 'data-content',
	providers: [DatabasesService,HTTP_PROVIDERS],

	templateUrl: './app/view/databaseManagerment.view.html'
})

export class DatabaseManagerment implements OnInit {

	title: string = 'Database Managerment';
	errorMessage: string;
	databases:DatabasesClass[];
	public type1 : string;
	filteredOrders: any[] = [];
	public mydata:any ;

	public pushData:any;
	public displayMessage: string;
	
	public databaselists : any;

	constructor(private http: Http, private _databaseService: DatabasesService) {
	}
	ngOnInit() { this.getStores(); }


	getStores() {
		this._databaseService.getStores()
			.subscribe(
				data => { this.mydata = data },
				err => console.error(err),
				() => {console.log('done'), this.databases=this.mydata.Data}

			);


	}


	addNewStore (store_code: string, db_name: string, validate_code: string) {
		if (!store_code || !db_name ||!validate_code ) {
			alert("Do not leave any empty!");
			return;
		}
		this._databaseService.addNewStore(store_code, db_name, validate_code)
			.subscribe(
				//database  => this.databases.push(database),
				data  => {this.pushData = data, this.databases.push(data.data)},
				//pushData  => this.databases.push(this.pushData.data),
				err => console.error(err),
				() => {
					this.displayMessage=this.pushData.message
					//	alert(this.displayMessage),
					//	database=>this.databases.push(this.pushData.data)
					//	database => this.databases.push(database)
						//console.log(this.databases)


						});
			//.do(pushData=>console.log());

		//alert( this.pushData.message);
		//console.log(this.pushData);
	}



	showAddNewStore(){
		console.log("showAddNewStore");


	}

	editCurrentStore(){
		console.log("editCurrentStore");


	}

	// addNewStore() : Observable<DatabasesClass>  {
	// 	console.log("addNewStore");
    //
    //
	// }




	
}

// export class HeroListComponent implements OnInit {
//
// 	constructor (private _heroService: HeroService) {}
//
// 	errorMessage: string;
// 	databases:DatabasesClass[];
//
//
// 	heroes:Hero[];
//
// 	ngOnInit() { this.getHeroes(); }
//
// 	getHeroes() {
// 		this._heroService.getHeroes()
// 			.subscribe(
// 				heroes => this.heroes = heroes,
// 				error =>  this.errorMessage = <any>error);
// 	}
//
// 	addHero (name: string) {
// 		if (!name) {return;}
// 		this._heroService.addHero(name)
// 			.subscribe(
// 				hero  => this.heroes.push(hero),
// 				error =>  this.errorMessage = <any>error);
// 	}
// }
//



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/