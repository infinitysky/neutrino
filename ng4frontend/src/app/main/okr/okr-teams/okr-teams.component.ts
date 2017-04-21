import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import {SettingTeamService} from '../okr-shared/services/okr-team.service';

import {Teamclass} from '../okr-shared/classes/team-class';


import {UserDetailsService} from '../../../shared/services/user-details.service';

import {Userclass} from '../../../shared/classes/user-class';


@Component({
    selector: 'app-okr-teams',
    templateUrl: './okr-teams.component.html',
    providers:[SettingTeamService,UserDetailsService],
    styleUrls: ['./okr-teams.component.css']
})
export class OkrTeamsComponent implements OnInit {


    public teams: Teamclass[];
    public users: Userclass[];

    private tempData: any;
    private errorMessage: any;

    public teamLength: number;
    private currentTimeFrameId: any;
    private timeFrameIdSubscription: any;



    constructor(private _activatedRoute: ActivatedRoute,
                private _router: Router,
                private _settingTeamService: SettingTeamService,
    ){
        this.teams = [];
        this.users = [];
        this.teamLength = 0;

    }
    ngOnInit(){
        this.timeFrameIdParameterSubscribe();



    }
    ngOnDestroy(){
        this.timeFrameIdSubscription.unsubscribe();
    }


    timeFrameIdParameterSubscribe(){

        this.timeFrameIdSubscription = this._activatedRoute.queryParams.subscribe(params => {
            this.currentTimeFrameId =  +params['timeFrameId'] || 0;
            console.log('Query param currentTimeFrame: ', this.currentTimeFrameId);
            this.getTeamsByTimeFrame(this.currentTimeFrameId );
        });

    }



    getTeamsByTimeFrame(timeFrameId){


        this._settingTeamService.getCurrentTeamProgressAndMember(timeFrameId)
            .subscribe(
                data => this.tempData = data,
                error =>  this.errorMessage = <any>error,
                () => {
                    // console.log( "this.TeamsData + "+JSON.stringify(this.TeamsData.data));
                    if(this.tempData && this.tempData.data ){

                        this.teams = <Teamclass[]>this.tempData.data;
                        this.teamLength = this.teams.length;
                    }

                }
            );

    }


    getTeams() {
        console.log("get All teams");
        this._settingTeamService.getAllTeamProgressAndMember()
            .subscribe(
                data => this.tempData = data,
                error =>  this.errorMessage = <any>error,
                () => {
                    // console.log( "this.TeamsData + "+JSON.stringify(this.TeamsData.data));
                    if(this.tempData && this.tempData.data ){

                        this.teams = <Teamclass[]>this.tempData.data;
                        this.teamLength = this.teams.length;
                    }

                }
            );

    }


}
