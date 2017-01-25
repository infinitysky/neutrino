System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', 'rxjs/Rx', '../config'], function(exports_1, context_1) {
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
    var core_1, http_1, http_2, Observable_1, config_1;
    var DatabasesService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            DatabasesService = (function () {
                function DatabasesService(http) {
                    this.http = http;
                    // public baseUrl: string = 'http://127.0.0.1/NanLi_Dev/reportsystembeautify'+'/magerConfig/index.php/StoreManger/';
                    this.baseUrl = config_1._settings.baseUrl;
                    /*
                     private _heroesUrl = 'app/heroes.json'; // URL to JSON file
                     */
                    this._heroesUrl = 'app/heroes'; // URL to web api
                }
                DatabasesService.prototype.getStores = function () {
                    this.getUrl = this.baseUrl + '/StoreManger/getstores';
                    return this.http.get(this.getUrl)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                DatabasesService.prototype.getAll = function () {
                    return this.http.get(this.baseUrl + '/StoreManger/getstores')
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                DatabasesService.prototype.addNewStore = function (store_code, db_name, validate_code) {
                    this.postUrl = this.baseUrl + '/StoreManger/addNewStore';
                    var body = JSON.stringify({ store_code: store_code, db_name: db_name, validate_code: validate_code });
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this.http.post(this.postUrl, body, options)
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                // addHeros(name: string) : Observable<DatabasesClass>  {
                //
                //     let body = JSON.stringify({ name });
                //     let headers = new Headers({ 'Content-Type': 'application/json' });
                //     let options = new RequestOptions({ headers: headers });
                //
                //     return this.http.post(this.baseUrl, body, options)
                //         .map(res =>  <DatabasesClass> res.json().data)
                //         .catch(this.handleError)
                // }
                DatabasesService.prototype.handleError = function (error) {
                    // in a real world app, we may send the error to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                DatabasesService.prototype.addNewStore = function (store_code, db_name, validate_code) {
                    this.postUrl = this.baseUrl + '/StoreManger/addNewStore';
                    var body = JSON.stringify({ store_code: store_code, db_name: db_name, validate_code: validate_code });
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this.http.post(this.postUrl, body, options)
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                DatabasesService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
                ], DatabasesService);
                return DatabasesService;
                var _a;
            }());
            exports_1("DatabasesService", DatabasesService);
        }
    }
});
/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */ 
