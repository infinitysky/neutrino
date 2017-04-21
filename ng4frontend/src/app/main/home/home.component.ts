import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


// services
import { HomepageService } from '../okr/okr-shared/services/home-page.service';
import { CookieService } from '../../shared/services/cookie.service';

// Classes
import { Goalclass } from '../okr/okr-shared/classes/goal-class';
import { Objectiveclass } from '../okr/okr-shared/classes/objective-class';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [ HomepageService ],
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    public currentTimeFrame: any;
    public currentUser: any;


    public tempData :any;
    public errorMessage: any;

    public homePageInfo: any;
    public objectivesNumber: number;
    public keyResultNumber: number;
    public totalProgressNumber: number;

    public currentTimeFrameId: any;
    public timeFrameIdSubscription: any;

    public objectivesInfo: Objectiveclass[];
    public goalsInfo: Goalclass[];
    public goalsNumber: number;
    public goalsTotalProgress: number;



    constructor(  private _activatedRoute: ActivatedRoute,
                  private _router: Router,
                  private _cookieService: CookieService,
                  private _homepageService: HomepageService
    ) {
        this.tempData = '';
        this.errorMessage =  '';
        this.homePageInfo = '';
        this.objectivesNumber = 0;
        this.keyResultNumber = 0;
        this.totalProgressNumber = 0;
        this.objectivesInfo = [];
        this.goalsInfo = [];

    }

    ngOnInit() {

        this.timeFrameIdSubscribe();
    }



    timeFrameIdSubscribe(){

        this.timeFrameIdSubscription = this._activatedRoute.queryParams.subscribe(params => {
            // Defaults to 0 if no query param provided.
            this.currentTimeFrameId = +params['timeFrameId'] || 0;

            console.log('Query param currentTimeFrame: ', this.currentTimeFrameId);
            this.getCurrentInfo(this.currentTimeFrameId );
        });

    }


    getCurrentInfo(currentTimeFrameId){
        this.currentUser = this._cookieService.getCookieCurrentUser();
        //this.currentTimeFrame = this._cookieService.getCookieCurrentTimeFrame();
        this._homepageService.getHomeInfo(this.currentUser.user_id, currentTimeFrameId).subscribe(
            data => this.tempData = data,
            error => this.errorMessage = <any>error,
            () => {
                if (this.tempData.status == 'success'){
                    if(this.tempData.objectives){
                        this.objectivesInfo = <Objectiveclass[]> this.tempData.objectives;
                        this.objectivesCalculation( this.objectivesInfo );

                    }
                    if(this.tempData.goals){
                        this.goalsInfo = <Goalclass[]> this.tempData.goals;
                        this.goalsCalculation(this.goalsInfo);
                    }

                }else {
                    console.log('error');
                }

            }

        );

    }

    objectivesCalculation(ObjectivesInfo: Objectiveclass[]){
        //console.log(ObjectivesInfo);
        var x = 0;
        var y = 0;
        var z = 0;
        this.objectivesNumber = 0;
        this.keyResultNumber = 0;

        if (ObjectivesInfo){
            this.objectivesNumber = ObjectivesInfo.length;
            for (y = 0 ;y < ObjectivesInfo.length;y++){
                this.keyResultNumber = this.keyResultNumber + ObjectivesInfo[y].keyResult_array.length;
            }
        }
    }

    goalsCalculation(GoalsInfo: Goalclass[]){

        var i = 0;
        let goalsProgress = 0;
        if (GoalsInfo){
            this.goalsNumber = GoalsInfo.length;
            for (i = 0; i < GoalsInfo.length; i++ ){
                goalsProgress = goalsProgress + Number(GoalsInfo[i].goal_progress_status);
            }
            this.goalsTotalProgress = goalsProgress / (GoalsInfo.length);
        }

    }






}
