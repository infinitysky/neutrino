import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';



import 'rxjs';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';



import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';



import { SelectModule } from 'ng2-select';

//import swal from 'sweetalert2'
declare var swal: any;



import { SettingGoalService } from '../okr-shared/services/okr-goal.service';
import { SettingTimeFrameService } from '../okr-shared/services/okr-time-frame.service';


import { SettingTeamService } from '../okr-shared/services/okr-team.service';
import {OkrActivitiesService} from '../okr-shared/services/okr-activities.service';
import {UserInfoContainerService} from '../../../shared/services/user-info-container.service';

import { Timeframeclass } from '../okr-shared/classes/time-frame-class';
import { Teamclass } from '../okr-shared/classes/team-class';
import { Goalclass } from '../okr-shared/classes/goal-class';

@Component({
    selector: 'app-okr-goals',
    templateUrl: './okr-goals.component.html',
    providers: [SettingGoalService, SettingTimeFrameService, SettingTeamService],
    styleUrls: ['./okr-goals.component.css']
})
export class OkrGoalsComponent implements OnInit {
    public goals: Goalclass[];

    private tempData: any;
    private errorMessage: any;

    private currentTimeFrameId: any;
    private timeFrameIdSubscription: any;



    constructor(private _userInfoContainerService: UserInfoContainerService,
        private _activatedRoute: ActivatedRoute,
                private _router: Router,
                private _settingGoalService: SettingGoalService) {
      this.goals = new Array<Goalclass>();
    }

    //component functions
    ngOnInit() {
        this.timeFrameIdParameterSubscribe();

    }

    ngOnDestroy() {
        this.timeFrameIdSubscription.unsubscribe();

    }



    timeFrameIdParameterSubscribe(){

        this.timeFrameIdSubscription = this._activatedRoute.queryParams.subscribe(params => {
            this.currentTimeFrameId =  +params['timeFrameId'] || 0;

//            console.log('current time frame : ' + this.currentTimeFrameId);

            if (this.currentTimeFrameId==0){
                this.getGoals();
            }else {
                this.getGoalsByTimeFrameId(this.currentTimeFrameId);
            }

        });

    }



    getGoalsByTimeFrameId(timeFrameId) {
        // this._settingGoalService.getAll()
      this.goals = new Array<Goalclass>();
        this._settingGoalService.getByTimeFrameId(timeFrameId)
            .subscribe(
                data => this.tempData = data,
                error => this.errorMessage = <any>error,
                () => {
                    if (this.tempData.status.toLowerCase() == 'success' && this.tempData.data) {
                        this.goals = this.tempData.data;
                        this.goals.sort();

                    }else{
                        this.goals = [];
                        console.log('empty');

                    }

                }
            );

    }



    getGoals() {
        // this._settingGoalService.getAll()
      this.goals = new Array<Goalclass>();
        this._settingGoalService.getAllDetailed()
            .subscribe(
                data => this.tempData = data,
                error => this.errorMessage = <any>error,
                () => {
                    if (this.tempData.status.toLowerCase() == "success" && this.tempData.data) {
                        this.goals = this.tempData.data;

                    }

                }
            );

    }






}
