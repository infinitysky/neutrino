import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UsersInfoService } from '../../../shared/services/users-info.service';
import { OkrCompanyService } from '../okr-shared/services/okr-company.service';
import { ShareCompanyOkrinfoService } from './share-company-okrinfo.service';
import { CompanyDetailClass } from '../okr-shared/classes/company-detail-class';





@Component({
    selector: 'app-okr-company',
    templateUrl: './okr-company.component.html',
    providers: [OkrCompanyService, UsersInfoService],
    styleUrls: ['./okr-company.component.css']
})
export class OkrCompanyComponent implements OnInit {

    public companyinfo: CompanyDetailClass;

    public tempData: any;
    public goals: any;


    public errorMessage: string;
    public totalMemberNumber: any;
    public totalGoalsNumber: any;

    public overallProgressNumber: any;
    private overallProgressNumberSubscription: Subscription;
    private overallGoalNumberSubscription: Subscription;

    private currentTimeFrameId: any;
    private timeFrameIdSubscription: any;


    constructor(private _activatedRoute: ActivatedRoute,
                private _router: Router,
                private _okrCompanyService: OkrCompanyService,
                private _usersInfoService: UsersInfoService,
                private _shareCompanyOkrinfoService: ShareCompanyOkrinfoService) {
        this.companyinfo = new CompanyDetailClass;
        this.totalMemberNumber = ' - ';
        this.totalGoalsNumber = ' - ';
        this.overallProgressNumber = ' - ';
        this.goals = "";

    }

    ngOnInit() {
        this.getCompanyInfo();
        this.getTotalNumber();
        this.getTotalGoalNumber();
        this.getOverallPragressNumber();
        this.timeFrameIdParameterSubscribe();


    }

    ngOnDestroy() {
        this.timeFrameIdSubscription.unsubscribe();
        this.overallGoalNumberSubscription.unsubscribe();
        this.overallProgressNumberSubscription.unsubscribe();

    }

    timeFrameIdParameterSubscribe(){

        this.timeFrameIdSubscription = this._activatedRoute.queryParams.subscribe(params => {
            this.currentTimeFrameId =  +params['timeFrameId'] || 0;

        });

    }

    getTotalGoalNumber() {

        this.overallGoalNumberSubscription = this._shareCompanyOkrinfoService._shareGoals$.subscribe(data => this.totalGoalsNumber = data);

        if (!this.totalGoalsNumber) {
            this.totalGoalsNumber = ' - ';
        }
    }

    getOverallPragressNumber() {

        this.overallProgressNumberSubscription = this._shareCompanyOkrinfoService._shareOverallProgressNumber$.subscribe(data => this.overallProgressNumber = data);

        if (!this.overallProgressNumber) {
            this.overallProgressNumber = '0';
        }
    }





    getTotalNumber() {
        this._usersInfoService.getTotalNumber().subscribe(
            data => this.tempData = data,
            error => this.errorMessage = <any>error,
            () => {
                if (this.tempData.data) {
                    this.totalMemberNumber = this.tempData.data.membersNumber;
                }

            }
        );

    }

    getCompanyInfo() {
        this._okrCompanyService.getAll().subscribe(
            data => this.tempData = data,
            error => this.errorMessage = <any>error,
            () => {
                if (this.tempData.data && this.tempData.status == "success") {
                    this.companyinfo = this.tempData.data[0];
                }



            }
        );


    }



    /*
    changeName() {
        this.companyinfo.company_name = 'lololo';

        console.log(this.toalGoalsNumber);
    }

    updateOverallNumber(event) {
        this.toalGoalsNumber = event;
    }
*/

}
