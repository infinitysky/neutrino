"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
//import {Observable} from 'rxjs/Rx';
require('rxjs/Rx');
// Import the config-related things
var app_config_1 = require('../app-config');
var UsersinfoService = (function () {
    function UsersinfoService(http) {
        this.http = http;
        this.userInfoAPi = app_config_1.MY_CONFIG.apiEndpoint + app_config_1.MY_CONFIG.getUserInfoUrl;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.http = http;
    }
    UsersinfoService.prototype.getUserInfo = function () {
        return this.http.get(this.userInfoAPi)
            .map(function (res) { return res.json(); });
    };
    UsersinfoService.prototype.logError = function (err) {
        console.error('There was an error: ' + err);
    };
    //this.http.get('./friends.json').toPromise() .then((res: Response) => { this.friendsAsPromise.friends = res.json().friends; });
    UsersinfoService.prototype.myHandleError = function (error) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        //return Observable.throw(error.json().error || 'Server error');
    };
    UsersinfoService = __decorate([
        core_1.Injectable()
    ], UsersinfoService);
    return UsersinfoService;
}());
exports.UsersinfoService = UsersinfoService;
