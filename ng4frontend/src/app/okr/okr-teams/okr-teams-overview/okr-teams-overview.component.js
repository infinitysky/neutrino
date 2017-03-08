"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var okr_team_service_1 = require('../../okr-shared/services/okr-team.service');
var user_details_service_1 = require('../../okr-shared/services/user-details.service');
var OkrTeamsOverviewComponent = (function () {
    function OkrTeamsOverviewComponent(_settingTeamService) {
        this._settingTeamService = _settingTeamService;
        this.teams = [];
        this.users = [];
    }
    OkrTeamsOverviewComponent.prototype.ngOnInit = function () {
        this.getTeams();
    };
    OkrTeamsOverviewComponent.prototype.getTeams = function () {
        var _this = this;
        console.log("get All teams");
        this._settingTeamService.getAll()
            .subscribe(function (data) { return _this.tempData = data; }, function (error) { return _this.errorMessage = error; }, function () {
            // console.log( "this.TeamsData + "+JSON.stringify(this.TeamsData.data));
            _this.teams = _this.tempData.data;
        });
    };
    OkrTeamsOverviewComponent = __decorate([
        core_1.Component({
            selector: 'app-okr-teams-overview',
            templateUrl: './okr-teams-overview.component.html',
            providers: [okr_team_service_1.SettingTeamService, user_details_service_1.UserDetailsService],
            styleUrls: ['./okr-teams-overview.component.css']
        })
    ], OkrTeamsOverviewComponent);
    return OkrTeamsOverviewComponent;
}());
exports.OkrTeamsOverviewComponent = OkrTeamsOverviewComponent;
