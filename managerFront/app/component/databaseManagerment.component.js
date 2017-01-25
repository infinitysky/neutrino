System.register(['angular2/core', 'angular2/http', '../service/database.services'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, http_2, database_services_1;
    var DatabaseManagerment;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (database_services_1_1) {
                database_services_1 = database_services_1_1;
            }],
        execute: function() {
            DatabaseManagerment = (function () {
                function DatabaseManagerment(http, _databaseService) {
                    this.http = http;
                    this._databaseService = _databaseService;
                    this.title = 'Database Managerment';
                    this.filteredOrders = [];
                }
                DatabaseManagerment.prototype.ngOnInit = function () { this.getStores(); };
                DatabaseManagerment.prototype.getStores = function () {
                    var _this = this;
                    this._databaseService.getStores()
                        .subscribe(function (data) { _this.mydata = data; }, function (err) { return console.error(err); }, function () { console.log('done'), _this.databases = _this.mydata.Data; });
                };
                DatabaseManagerment.prototype.addNewStore = function (store_code, db_name, validate_code) {
                    var _this = this;
                    if (!store_code || !db_name || !validate_code) {
                        alert("Do not leave any empty!");
                        return;
                    }
                    this._databaseService.addNewStore(store_code, db_name, validate_code)
                        .subscribe(
                    //database  => this.databases.push(database),
                    function (data) { _this.pushData = data, _this.databases.push(data.data); }, 
                    //pushData  => this.databases.push(this.pushData.data),
                    function (err) { return console.error(err); }, function () {
                        _this.displayMessage = _this.pushData.message;
                        //	alert(this.displayMessage),
                        //	database=>this.databases.push(this.pushData.data)
                        //	database => this.databases.push(database)
                        //console.log(this.databases)
                    });
                    //.do(pushData=>console.log());
                    //alert( this.pushData.message);
                    //console.log(this.pushData);
                };
                DatabaseManagerment.prototype.showAddNewStore = function () {
                    console.log("showAddNewStore");
                };
                DatabaseManagerment.prototype.editCurrentStore = function () {
                    console.log("editCurrentStore");
                };
                DatabaseManagerment = __decorate([
                    core_1.Component({
                        selector: 'data-content',
                        providers: [database_services_1.DatabasesService, http_1.HTTP_PROVIDERS],
                        templateUrl: './app/view/databaseManagerment.view.html'
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_2.Http !== 'undefined' && http_2.Http) === 'function' && _a) || Object, database_services_1.DatabasesService])
                ], DatabaseManagerment);
                return DatabaseManagerment;
                var _a;
            }());
            exports_1("DatabaseManagerment", DatabaseManagerment);
        }
    }
});
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
