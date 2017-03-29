import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import {Teamclass} from '../../okr-shared/classes/team-class';
import {SettingTeamService} from '../../okr-shared/services/okr-team.service';
import {UserDetailsService} from '../../../../shared/services/user-details.service';
import { ShareTeamsOkrinfoService } from '../share-teams-okrinfo.service';
import {Subscribable} from 'rxjs/Observable';
@Component({
    selector: 'app-okr-teams-detail',
    templateUrl: './okr-teams-detail.component.html',
    providers:[SettingTeamService, UserDetailsService],
    styleUrls: ['./okr-teams-detail.component.css']
})
export class OkrTeamsDetailComponent implements OnInit {
    private teamInfo: Teamclass;
    private errorMessage: any;
    private tempData: any;
    public randerTeamInforData: Teamclass;
    public viewTeamId: any;

    private subsTeam: any;


    //For sharing service
    public totalObjectivesNumber: any;
    public overallProgressNumber: any;
    private overallProgressNumberSubscription: Subscription;
    private overallObjectivesNumberSubscription: Subscription;



    public lastUpdate:any;

    constructor(private _activatedRoute: ActivatedRoute,
                private _settingTeamService: SettingTeamService,
                private _userDetailsService: UserDetailsService,
                private _shareTeamsOkrinfoService: ShareTeamsOkrinfoService
    ) {

        this.teamInfo = new Teamclass();
        this.randerTeamInforData = new Teamclass();
        this.viewTeamId = '';
        this.overallProgressNumber = ' - ';
        this.totalObjectivesNumber = ' - ';
        this.lastUpdate = ' - ';

    }


    ngOnInit() {
        this.subsTargetTeamId();
        this.getTotalObjectivesNumber();
        this.getOverallProgressNumber();


    }


    ngOnDestroy() {
        this.subsTeam.unsubscribe();

        this.overallProgressNumberSubscription.unsubscribe();
        this.overallObjectivesNumberSubscription.unsubscribe();

    }

    subsTargetTeamId(){
        this.subsTeam = this._activatedRoute.params.subscribe(params => {
            this.viewTeamId = ''+params['teamid']; // (+) converts string 'id' to a number

            this.getTargetTeamInfo( this.viewTeamId);
        });

    }


    getTargetTeamInfo(teamId:any){
        this._settingTeamService.getByTeamId(teamId).subscribe(
            data => this.tempData = data,
            error =>  this.errorMessage = <any>error,
            () => {

                if(this.tempData.data&&<Teamclass>this.tempData.data){
                    this.randerTeamInforData = <Teamclass> this.tempData.data;
                    this._shareTeamsOkrinfoService.setTargetTeamInfo(this.randerTeamInforData);
                }

            }
        );
    }




    getTotalObjectivesNumber() {

        this.overallObjectivesNumberSubscription = this._shareTeamsOkrinfoService._shareObjectivesNumber$.subscribe(data => this.totalObjectivesNumber = data);
        if (!this.totalObjectivesNumber) {
            this.totalObjectivesNumber = 0;
        }
    }

    getOverallProgressNumber() {

        this.overallProgressNumberSubscription = this._shareTeamsOkrinfoService._shareOverallProgressNumber$.subscribe(data => this.overallProgressNumber = data);

        if (!this.overallProgressNumber) {
            this.overallProgressNumber = 0;
        }
    }





}
